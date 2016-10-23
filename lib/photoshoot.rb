require 'dm-serializer'
require 'dm-timestamps'

class Photoshoot
  include DataMapper::Resource

  property :id,         Serial
  property :name,       String,   :required => true
  property :date,       DateTime, :required => true
  property :price,      Decimal,  :required => true, :scale => 2, :precision => 7
  property :completed,  Boolean,  :required => true
  property :miles_travelled, Decimal, default: 0
  property :hours_shooting,  Decimal, default: 0
  property :hours_editing,   Decimal, default: 0

  property :created_at, DateTime
  property :created_on, Date
  property :updated_at, DateTime
  property :updated_on, Date

  belongs_to :user

end
