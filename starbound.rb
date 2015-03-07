require 'sinatra'
require 'json'
require 'elasticsearch'
require 'redis'

$elasticsearch = Elasticsearch::Client.new host: ENV['BONSAI_URL']

$redis = Redis.new(url: ENV['REDISCLOUD_URL'])

get '/' do
  erb :index, :format => :html5
end

get '/stats' do
  @total_searches = format_number($redis.get('searches'))
  @stable_item_count = format_number($elasticsearch.indices.stats['_all']['primaries']['docs']['count'])

  @searches = $redis.zrevrange('search_terms', 0,9, with_scores: true).map{|v| {term: v.first, score: sprintf('%.0f', v.last)}}

  erb :stats, :format => :html5
end

get '/all' do
  @items = $elasticsearch.search(index: 'starbound', type: 'item', size: 200, sort: 'itemName')['hits']['hits'].map{|k,v| {itemName: k['_source']['itemName'],
    shortdescription: k['_source']['shortdescription'],
    description: k['_source']['description'],
    inventoryIcon: k['_source']['inventoryIcon'],
    type: k['_source']['type'],
    rarity: k['_source']['rarity']}
  }

  @total_items = $elasticsearch.indices.stats['_all']['primaries']['docs']['count'].to_i

  @current_page = 1
  @next_page = 2
  @prev_page = 0
  @last_page = @total_items / 200

  erb :all, :format => :html5
end

get '/all/:page' do
  if params[:page] == 1
    count = 0
  else
    count = (params[:page].to_i * 200) - 200
  end

  @items = $elasticsearch.search(index: 'starbound', type: 'item', size: 200, from: count, sort: 'itemName')['hits']['hits'].map{|k,v| {itemName: k['_source']['itemName'],
    shortdescription: k['_source']['shortdescription'],
    description: k['_source']['description'],
    inventoryIcon: k['_source']['inventoryIcon'],
    type: k['_source']['type'],
    rarity: k['_source']['rarity']}
  }

  @total_items = $elasticsearch.indices.stats['_all']['primaries']['docs']['count'].to_i - 200

  @current_page = params[:page].to_i
  @next_page = params[:page].to_i + 1
  @prev_page = params[:page].to_i - 1
  @last_page = $elasticsearch.indices.stats['_all']['primaries']['docs']['count'].to_i / 200

  erb :all, :format => :html5
end

get '/api/search/:query' do
  clean_query = params[:query].gsub(/[^0-9a-z ]/i, '')

  search = $elasticsearch.search index: 'starbound', type: 'item', q: "*#{clean_query}*", size:100, sort: 'itemName'

  results = search['hits']['hits'].map{|k,v| {itemName: k['_source']['itemName'],
    shortdescription: k['_source']['shortdescription'],
    description: k['_source']['description'],
    inventoryIcon: k['_source']['inventoryIcon'],
    type: k['_source']['type'],
    rarity: k['_source']['rarity']}
  }

  $redis.zincrby('search_terms', 1, clean_query) unless clean_query.length < 3
  $redis.incr('searches')

  content_type :json
  status 200
  results.to_json
end

get '/api/item/:id' do
  item = $elasticsearch.get index: 'starbound', type: 'item', id: params[:id].to_i

  content_type :json
  status 200
  item['_source'].to_json
end

private

def format_number(num)
  # Is this seriously the only way?
  num.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
end

helpers do
  def rarity(text)
    if text
    text.downcase
    else
    end
  end
end
