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

  cur = r.table('items2').filter{|doc| doc['itemName'].match("(?i)#{params[:query]}")}.run(@rdb_connection)

  cur.each{ |doc| a << doc }

  content_type :json
  status 200
  a.to_json
end