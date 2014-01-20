require 'sinatra'
require 'shotgun'

get '/' do
  erb :index, :format => :html5
end