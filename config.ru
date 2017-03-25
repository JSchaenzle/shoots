puts "Inside config.ru"

require File.join(File.dirname(__FILE__), 'application')

set :run, false
set :environment, ENV['RACK_ENV'] || 'development'

$stdout.sync = true

puts "Running sinatra application..."
run Sinatra::Application
puts "Finished loading config.ru"
