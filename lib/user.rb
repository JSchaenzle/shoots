require 'dm-serializer'
require 'dm-timestamps'

class User
  include DataMapper::Resource

  property :id,         Serial

  # identity
  property :name,       String,   :required => true
  property :email,      String,   :required => true, :unique => true

  # auth
  property :auth_token, String

  # timestamps
  property :created_at, DateTime
  property :created_on, Date
  property :updated_at, DateTime
  property :updated_on, Date

  has n, :photoshoots
end
