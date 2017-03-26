require 'dm-serializer'
require 'dm-timestamps'
require 'dm-validations'

class User
  include DataMapper::Resource

  property :id,         Serial

  # identity
  property :name,          String, :required => true
  property :email,         String, :required => true, :unique => true
  property :encrypted_pwd, String, :required => true, :length => 60, :default => ""
  validates_length_of :encrypted_pwd, :min => 6


  # auth
  property :auth_token,    String

  # timestamps
  property :created_at, DateTime
  property :created_on, Date
  property :updated_at, DateTime
  property :updated_on, Date

  has n, :photoshoots
end
