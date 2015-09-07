require 'sinatra'
require 'sinatra/content_for'
require 'json'
require 'elasticsearch'
require 'redis'
require 'rack/ssl-enforcer'
require 'firebase'
use Rack::SslEnforcer, :only_hosts => 'starbounditems.herokuapp.com', :only_environments => 'production'

redis_url = ENV['REDISCLOUD_URL'] || 'redis://localhost'

Redis.current = Redis.new(url: redis_url)

get '/' do
  @title = 'Starbound Items'
  erb :index, format: :html5
end

get '/stats' do
  @total_searches = format_number(redis.get('searches'))
  @stable_item_count = format_number(total_item_count)

  @searches = redis.zrevrange('search_terms', 0, 9, with_scores: true).map do |v|
    {
      term:  v.first,
      score: format('%.0f', v.last)
    }
  end

  @title = 'Stats - Starbound Items'
  erb :stats, format: :html5
end

get '/new' do
  items = redis.smembers 'new_items'
  @items = items.map{|item| JSON.parse(item, symbolize_names: true)}
  @items.sort_by!{|k,v| k[:itemName]}

  @title = 'New Items - Starbound Items'
  erb :new, format: :html5
end

get '/all' do
  items = elasticsearch.search(
    index: 'starbound',
    type: 'item',
    size: 200,
    sort: 'itemName')

  @items = format_results(items)

  @total_items = total_item_count

  @current_page = 1

  @title = 'All Items - Starbound Items'
  erb :all, format: :html5
end

get '/all/:page' do
  @total_items = total_item_count
  @current_page = params[:page].to_i

  if @current_page == 1
    count = 0
  else
    count = (@current_page * 200) - 200
  end

  items = elasticsearch.search(
    index: 'starbound',
    type: 'item',
    size: 200,
    from: count,
    sort: 'itemName')

  @items = format_results(items)

  @title = "All Items - Page #{@current_page} - Starbound Items"
  erb :all, format: :html5
end

get '/api/search/:query' do
  clean_query = params[:query].gsub(/[^0-9a-z ]/i, '')

  search = elasticsearch.search(
    index: 'starbound',
    type:  'item',
    q:     "*#{clean_query}*",
    size:  300,
    sort:  'itemName')

  results = format_results(search)

  firebase.set('current_search', clean_query)

  redis.zincrby('search_terms', 1, clean_query) unless clean_query.length < 3
  search_count = redis.incr('searches')
  firebase.set('total_searches', search_count)

  content_type :json
  status 200
  results.to_json
end

get '/api/tags/:tag' do
  clean_query = params[:tag].gsub(/[^0-9a-z ]/i, '')

  search = elasticsearch.search(
    index: 'starbound',
    type:  'item',
    body: { query:{
              terms:{
                tags: [clean_query]
              }
            }
          },
    size:  300,
    sort:  'itemName')

  results = format_results(search)

  content_type :json
  status 200
  results.to_json
end

get '/api/item/:id' do
  item = elasticsearch.get(
    index: 'starbound',
    type:  'item',
    id:    params[:id].to_i
  )

  content_type :json
  status 200
  item['_source'].to_json
end

get '/tags' do
  @title = 'Colony Tags - Starbound Items'
  erb :tags, format: :html5
end

private

def format_results(results)
  results['hits']['hits'].map do |k, _v|
    {
      itemName:         k['_source']['itemName'],
      shortdescription: k['_source']['shortdescription'],
      description:      k['_source']['description'],
      inventoryIcon:    k['_source']['inventoryIcon'],
      type:             k['_source']['type'],
      rarity:           k['_source']['rarity'],
      tags:             k['_source']['tags'],
      wiki_url:         k['_source']['wiki_url']
    }
  end
end

def format_number(num)
  # Is this seriously the only way?
  num.to_s.reverse.gsub(/...(?=.)/, '\&,').reverse
end

def total_item_count
  elasticsearch.indices.stats['_all']['primaries']['docs']['count'].to_i
end

def redis
  Redis.current
end

def elasticsearch
  elasticsearch_url = ENV['BONSAI_URL'] || 'http://localhost:9200'
  Elasticsearch::Client.new host: elasticsearch_url
end

def firebase
  Firebase::Client.new('https://starbounditems.firebaseio.com/', ENV['FIREBASE_KEY'])
end

helpers do
  def rarity(text)
    text.downcase if text
  end
end
