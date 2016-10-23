ruby '2.3.1'
source 'https://rubygems.org'
gem 'sinatra'
gem 'json', '>= 1.8.3'
gem 'dotenv'
gem 'rake'
gem 'data_mapper'
gem 'dm-core'
gem 'dm-timestamps'
gem 'dm-validations'
gem 'dm-aggregates'
gem 'dm-migrations'
gem 'dm-serializer'
gem 'thin'

group :development do
  gem 'foreman'
  gem 'pry'
  gem 'dm-sqlite-adapter'
end

group :production do
  gem 'pg'
  gem 'dm-postgres-adapter'
end

group :test do
  gem 'rspec', :require => 'spec'
  gem 'rack-test'
end
