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
  render :html, :index
end

get "/photoshoots" do
  return photoshoots.to_json
end

post "/photoshoots" do
  newItem = JSON.parse(request.body.read)
  newItem["id"] = photoshoots.length
  photoshoots << newItem
  body newItem.to_json
end

put "/photoshoots/:id" do |id|
  updatedDetails = JSON.parse(request.body.read)
  existingItem = photoshoots.detect { |shoot| shoot["id"] == id.to_i }
  existingItem.merge! updatedDetails
  body existingItem.to_json
end
