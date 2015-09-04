## Starbound Items
Quick and simple app to search and display items in [Starbound](http://playstarbound.com/).

### Getting Started

Here's a quick getting started guide on OSX using [Homebrew](http://brew.sh/).

#### Prerequisites
Requirements:
* ElasticSearch
* Redis

##### Installing ElasticSearch
1. Run `brew update` then `brew install elasticsearch`.
2. In a separate terminal window run `elasticsearch`.
3. This will set up a default ElasticSearch instance which is good enough for development.

##### Seeding ElasticSearch
Simply run `rake seed` to index the current list of items. Items can be found in `public/items.json`.

##### Installing Redis
1. Run `brew install redis`.
2. In a new terminal window run `redis-server`.
3. This will start a new Redis instance with default settings. This instance will only be available locally.

##### Sinatra
1. Clone the repo using git: `git clone git@github.com:MarceloAlves/StarboundItems.git`
2. Run `bundle install` to install required gems.
3. Run `rackup` to start the server.
4. Start hacking away.

### Contributing

Fork and create a pull request.
