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

photoshoots = []

before do
  # sleep 1
end

# root page
get "/" do
  @profiles = Profile.all
  @photoshoots = Photoshoot.all
  render :html, :index
end

get "/photoshoots" do
  content_type 'application/json'
  puts Photoshoot.all.to_json
  body Photoshoot.all.to_json
end

post "/photoshoots" do
  newItem = JSON.parse(request.body.read)
  photoshoot = Photoshoot.create(
    :name => newItem["name"],
    :date => newItem["date"],
    :price => BigDecimal.new(newItem["price"].to_s),
    :created_at => Time.now
  )

  unless photoshoot.saved?
    puts "ERROR: Photoshoot not saved."
    puts photoshoot.error.inspect
  end

  body photoshoot.to_json
end

put "/photoshoots/:id" do |id|
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
