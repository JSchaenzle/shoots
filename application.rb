require "rubygems"
require "bundler/setup"
require "sinatra"
require File.join(File.dirname(__FILE__), "environment")
require 'json'

configure do
  # set :views, "#{File.dirname(__FILE__)}/views"
  set :root, "#{File.dirname(__FILE__)}/lib/app/"
  #set :root, 'lib/app'
  set :show_exceptions, :after_handler
  set :protection, false
  enable :logging
end

configure :production, :development do
  enable :logging
end

helpers do
  # add your helpers here
end

before do
  # sleep 1
end

# root page
get "/" do
  render :html, :index
end

get "/api/photoshoots" do
  content_type 'application/json'
  body Photoshoot.all.to_json
end

post "/api/photoshoots" do
  newItem = JSON.parse(request.body.read)
  photoshoot = Photoshoot.create(
    :name => newItem["name"],
    :date => newItem["date"],
    :price => BigDecimal.new(newItem["price"].to_s),
    :completed => newItem["completed"],
    :created_at => Time.now
  )

  unless photoshoot.saved?
    puts "ERROR: Photoshoot not saved."
    puts photoshoot.errors.inspect
    status 500
  end

  body photoshoot.to_json
end

put "/api/photoshoots/:id" do |id|
  updatedDetails = JSON.parse(request.body.read)
  if updatedDetails.key? "price"
    updatedDetails["price"]= BigDecimal.new(updatedDetails["price"].to_s)
  end

  existingItem = Photoshoot.get id.to_i
  existingItem.update(updatedDetails)

  unless existingItem.saved?
    puts "ERROR: Photoshoot not saved."
    puts existingItem.error.inspect
  end

  body existingItem.to_json
end

delete "/api/photoshoots/:id" do |id|
  existingItem = Photoshoot.get id.to_i
  existingItem.destroy
end

# Sinarta uses the first handler that matches each route. Since react-router is
# being used for routing we need to re-route all non-matching paths to index.
# If a non-matching api is requested we return 404

respond_not_found = proc { status 404 }
get    "/api/*",  &respond_not_found
post   "/api/*",  &respond_not_found
put    "/api/*",  &respond_not_found
patch  "/api/*",  &respond_not_found
delete "/api/*",  &respond_not_found

get "*" do
  puts "Using catch all route handler"
  render :html, :index
end

not_found do
  'The requested page is not found'
end
