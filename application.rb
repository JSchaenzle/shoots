puts "Loading application.rb..."
require "rubygems"
require "bundler/setup"
require "sinatra"
require File.join(File.dirname(__FILE__), "environment")
require 'json'

configure do
  puts "In configure block in application.rb"
  puts "Configuring sinatra..."
  set :root, "#{File.dirname(__FILE__)}/lib/app/"
  set :show_exceptions, :after_handler
  set :protection, false
  set :server, 'thin'
end

configure :development do
  set :port, 9292
  # set :bind, '0.0.0.0' This doesn't seem to work when using rackup
end

configure :production, :development do
  # Enable React logging
  enable :logging
end

helpers do
  # add your helpers here
end

before do
  # sleep 1
end

before "/api/*" do
  # All routes should return json and at least an empty json object.
  content_type 'application/json'
  empty = {}
  body empty.to_json

  # Don't proceed if the route is one of users or sessions becuase those are used to create account or log in
  pass if request.path_info == "/api/users" || request.path_info == "/api/sessions"

  # Check for properly authorized request
  puts "Checking auth..."
  token = request.env["HTTP_SHOOTS_AUTH_TOKEN"]
  if (token)
    @user = UserManager.get_user_for_token(token)
    if (@user == nil)
      puts "Use is not authorized. Invalid auth token."
      halt 401
    end
  else
    puts "User is not authorized. No auth token."
    halt 401
  end
end

get "/api/photoshoots" do
  photoshoots = PhotoshootManager.get_all_photoshoots(@user)
  body photoshoots.to_json
end

post "/api/photoshoots" do
  new_item = JSON.parse(request.body.read)
  photoshoot = PhotoshootManager.add_photoshoot(@user, new_item)
  body photoshoot.to_json
end

put "/api/photoshoots/:id" do |id|
  request_data = JSON.parse(request.body.read)
  updated_shoot = PhotoshootManager.update_photoshoot(@user, id.to_i, request_data)
  body updated_shoot.to_json
end

delete "/api/photoshoots/:id" do |id|
  PhotoshootManager.delete_photoshoot(@user, id.to_i)
end

get "/api/reports/annual_summary/:year" do |year|
  report = ReportManager.get_annual_report(@user, year.to_i)
  body report.to_json
end

post "/api/users" do
  request_data = JSON.parse(request.body.read)
  session = {
    user: UserManager.create_user(request_data)
  }
  sleep 1.5
  body session.to_json
end

post "/api/sessions" do
  request_data = JSON.parse(request.body.read)
  session = {
    user: UserManager.authenticate_user(request_data)
  }
  sleep 1.5
  body session.to_json
end


# Sinarta uses the first handler that matches each route. Since react-router is
# being used for routing we need to re-route all non-matching paths to index.

# If a non-matching api is requested we return 404
respond_not_found = proc { raise ResourceNotFoundError }
get    "/api/*",  &respond_not_found
post   "/api/*",  &respond_not_found
put    "/api/*",  &respond_not_found
patch  "/api/*",  &respond_not_found
delete "/api/*",  &respond_not_found

# Re-route all other requests to index
get "*" do
  puts "Using catch all route handler"
  render :html, :index
end

# Catch and handle exceptions thrown while processing requests
error ResourceNotFoundError do
  body "Resource not found"
  status 404
end

error InternalServerError do
  body "Internal Server Error"
  status 500
end

error ValidationError do
  body env['sinatra.error'].to_json
  status 422 # UnprocessableEntity
end

error UnauthorizedError do
  b = {errorTitle: "Unauthorized", message: "Invalid Email or Password"}.to_json
  body b
  status 401
end

puts "Finished loading application.rb"

