require "rubygems"
require "bundler/setup"
require "sinatra"
require File.join(File.dirname(__FILE__), "environment")
require 'json'

configure do
  set :root, "#{File.dirname(__FILE__)}/lib/app/"
  set :show_exceptions, :after_handler
  set :protection, false
  set :bind, '0.0.0.0'
  set :server, 'puma'
  set :port, 5000
  enable :logging

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
    @user = UserManager.getUser(token)
    if (@user == nil)
      puts "Use is not authorized. Invalid auth token."
      halt 401
    end
  else
    puts "User is not authorized. No auth token."
    halt 401
  end
end

# root page
get "/" do
  # Content type is set to json for all other requests so we must override here
  content_type 'text/html'
  render :html, :index
end

get "/api/photoshoots" do
  photoshoots = PhotoshootManager.getAllPhotoshoots(@user)
  body photoshoots.to_json
end

post "/api/photoshoots" do
  newItem = JSON.parse(request.body.read)
  photoshoot = PhotoshootManager.addPhotoshoot(@user, newItem)
  body photoshoot.to_json
end

put "/api/photoshoots/:id" do |id|
  requestData = JSON.parse(request.body.read)
  updatedShoot = PhotoshootManager.updatePhotoshoot(@user, id.to_i, requestData)
  body updatedShoot.to_json
end

delete "/api/photoshoots/:id" do |id|
  PhotoshootManager.deletePhotoshoot(@user, id.to_i)
end

get "/api/reports/annual_summary/:year" do |year|
  report = ReportManager.getAnnualReport(@user, year.to_i)
  body report.to_json
end

post "/api/users" do
  requestData = JSON.parse(request.body.read)
  session = {
    user: UserManager.createUser(requestData)
  }
  sleep 1.5
  body session.to_json
end

post "/api/sessions" do
  requestData = JSON.parse(request.body.read)
  session = {
    user: UserManager.findUser(requestData)
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

