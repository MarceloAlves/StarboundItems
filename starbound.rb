require 'sinatra'
require 'json'
require 'elasticsearch'
require 'redis'

$elasticsearch = Elasticsearch::Client.new host: ENV['BONSAI_URL']

Redis.current = Redis.new(url: ENV['REDISCLOUD_URL'])

get '/' do
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

  erb :stats, format: :html5
end

get '/all' do
  @items = $elasticsearch.search(
    index: 'starbound',
    type: 'item',
    size: 200,
    sort: 'itemName')['hits']['hits'].map do |k, _v|
      {
        itemName:         k['_source']['itemName'],
        shortdescription: k['_source']['shortdescription'],
        description:      k['_source']['description'],
        inventoryIcon:    k['_source']['inventoryIcon'],
        type:             k['_source']['type'],
        rarity:           k['_source']['rarity']
      }
    end

  @total_items = total_item_count

  @current_page = 1

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

  @items = $elasticsearch.search(
    index: 'starbound',
    type: 'item',
    size: 200,
    from: count,
    sort: 'itemName')['hits']['hits'].map do |k, _v|
      {
        itemName:         k['_source']['itemName'],
        shortdescription: k['_source']['shortdescription'],
        description:      k['_source']['description'],
        inventoryIcon:    k['_source']['inventoryIcon'],
        type:             k['_source']['type'],
        rarity:           k['_source']['rarity']
      }
    end

  erb :all, format: :html5
end

get '/api/search/:query' do
  clean_query = params[:query].gsub(/[^0-9a-z ]/i, '')

  search = $elasticsearch.search(
    index: 'starbound',
    type:  'item',
    q:     "*#{clean_query}*",
    size:  100,
    sort:  'itemName')

  results = search['hits']['hits'].map do |k, _v|
    {
      itemName:         k['_source']['itemName'],
      shortdescription: k['_source']['shortdescription'],
      description:      k['_source']['description'],
      inventoryIcon:    k['_source']['inventoryIcon'],
      type:             k['_source']['type'],
      rarity:           k['_source']['rarity']
    }
  end

  redis.zincrby('search_terms', 1, clean_query) unless clean_query.length < 3
  redis.incr('searches')

  content_type :json
  status 200
  results.to_json
end

get '/api/item/:id' do
  item = $elasticsearch.get(
    index: 'starbound',
    type:  'item',
    id:    params[:id].to_i
  )

  content_type :json
  status 200
  item['_source'].to_json
end

private

def format_number(num)
  # Is this seriously the only way?
  num.to_s.reverse.gsub(/...(?=.)/, '\&,').reverse
end

def total_item_count
  $elasticsearch.indices.stats['_all']['primaries']['docs']['count'].to_i
end

def redis
  Redis.current
end

helpers do
  def rarity(text)
    text.downcase if text
  end
end
