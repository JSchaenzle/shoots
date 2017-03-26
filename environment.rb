require 'rubygems'
require 'bundler/setup'
require 'dotenv'
require 'dm-core'
require 'dm-timestamps'
require 'dm-validations'
require 'dm-aggregates'
require 'dm-migrations'
require 'ostruct'
require 'sinatra' unless defined?(Sinatra)

puts "Loading environment.rb..."
Dotenv.load
configure do
  puts "Running configure block from environment.rb..."
  SiteConfig = OpenStruct.new(
                 :title => 'Shoots',
                 :author => 'Jordan Schaenzle',
                 :url_base => 'http://localhost:4567/'
               )

  puts "Loading application modules..."
  # load models
  $LOAD_PATH.unshift("#{File.dirname(__FILE__)}/lib")
  Dir.glob("#{File.dirname(__FILE__)}/lib/*.rb") { |lib| require File.basename(lib, '.*') }

  # Load all app modules
  Dir.glob("#{File.dirname(__FILE__)}/lib/shoots/*.rb") do |lib|
    path = "shoots/" + File.basename(lib, '.*')
    # puts "Loading: " + path
    require path
  end

  if settings.environment == :development
    require 'pry'
    require 'pry-byebug' # stepping and continuing
  end

  puts "Setting up database..."
  DataMapper::Logger.new($stdout, :debug)
  DataMapper.setup(:default, (ENV["DATABASE_URL"] || "sqlite3:///#{File.expand_path(File.dirname(__FILE__))}/#{Sinatra::Base.environment}.db"))
  DataMapper.finalize
  DataMapper.auto_upgrade!
  puts "Database setup complete"
  puts "Finished running configure block from environment.rb"

  # CAUTION: The following line drops all tables and wipes all data
  # DataMapper.auto_migrate!
end

puts "Finished loading environment.rb"

