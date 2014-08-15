require 'sinatra'
require 'json'
require 'rethinkdb'
include RethinkDB::Shortcuts

RDB_CONFIG = {
  :host => ENV['RETHINKURL'], 
  :port => 28015,
  :db   => ENV['RETHINKDB']
}

r = RethinkDB::RQL.new

configure do
  set :db, RDB_CONFIG[:db]
  begin
    connection = r.connect(:host => RDB_CONFIG[:host],
      :port => RDB_CONFIG[:port])
  rescue Exception => err
    puts "Cannot connect to RethinkDB database #{RDB_CONFIG[:host]}:#{RDB_CONFIG[:port]} (#{err.message})"
    Process.exit(1)
  end
end

before do
  begin
    @rdb_connection = r.connect(:host => RDB_CONFIG[:host], :port =>
      RDB_CONFIG[:port], :db => settings.db)
    rescue Exception => err
      logger.error "Cannot connect to RethinkDB database #{RDB_CONFIG[:host]}:#{RDB_CONFIG[:port]} (#{err.message})"
      halt 501, 'This page could look nicer, unfortunately the error is the same: database not available.'
    end
  end

  after do
  begin
    @rdb_connection.close if @rdb_connection
  rescue
    logger.warn "Couldn't close connection"
  end
end

get '/' do
  erb :index, :format => :html5
end

get '/api/search/:query' do
  a = Array.new

  clean_query = params[:query].match(/^[a-zA-Z0-9]+$/)[0]

  cur = r.table('items').filter{|doc| doc['itemName'].match("(?i)#{clean_query}")}.run(@rdb_connection)

  cur.each{ |doc| a << doc }

  s = r.table('stats').get_all(clean_query,{:index=>"term"}).run(@rdb_connection)

  if s.count == 0
    r.table('stats').insert({:term => clean_query, :count => 1}).run(@rdb_connection)
  else
    r.table('stats').get_all(clean_query,{:index=>"term"}).update{|row| {:count => row["count"]+1}}.run(@rdb_connection)
  end

  content_type :json
  status 200
  a.to_json
end

get '/api/search/nightly/:query' do
  a = Array.new

  clean_query = params[:query].match(/^[a-zA-Z0-9]+$/)[0]

  cur = r.table('nightly').filter{|doc| doc['itemName'].match("(?i)#{clean_query}")}.run(@rdb_connection)

  cur.each{ |doc| a << doc }

  s = r.table('stats').get_all(clean_query,{:index=>"term"}).run(@rdb_connection)

  if s.count == 0
    r.table('stats').insert({:term => clean_query, :count => 1}).run(@rdb_connection)
  else
    r.table('stats').get_all(clean_query,{:index=>"term"}).update{|row| {:count => row["count"]+1}}.run(@rdb_connection)
  end

  content_type :json
  status 200
  a.to_json
end
