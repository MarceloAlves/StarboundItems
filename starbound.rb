require 'sinatra'

get '/' do
  erb :index, :format => :html5
end