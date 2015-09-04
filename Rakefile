require 'elasticsearch'
require 'json'

$elasticsearch = Elasticsearch::Client.new

task :seed do
  items = JSON.parse(File.read('public/items.json'))

  $elasticsearch.bulk(body: [].tap do |doc|
    items.each do |item|
      doc << {index: {_index: 'starbound', _type: 'item', _id: item['id'], data: item}}
    end
  end)
end
