
class PhotoshootManager
  def self.get_all_photoshoots(user)
    puts "Finding photoshoots for: #{user.name} - #{user.id}"
    shoots = user.photoshoots
    puts "Found #{shoots.count}"
    shoots
  end

  def self.delete_photoshoot(user, id)
    shoot = user.photoshoots.get(id)
    raise ResourceNotFoundError unless shoot
    shoot.destroy
  end

  def self.update_photoshoot(user, id, request_data)
    shoot = user.photoshoots.get(id)
    raise ResourceNotFoundError unless shoot

    if request_data.key? "price"
      request_data["price"] = json_price_to_big_data(request_data["price"])
    end

    shoot.update(request_data)
    raise InternalServerError unless shoot.saved?
    shoot
  end

  def self.add_photoshoot(user, request_data)
    photoshoot = Photoshoot.create(
      :name => request_data["name"],
      :date => request_data["date"],
      :price => json_price_to_big_data(request_data["price"]),
      :completed => request_data["completed"],
      :created_at => Time.now
    )
    user.photoshoots << photoshoot
    photoshoot.save

    raise InternalServerError unless photoshoot.saved?
    photoshoot
  end

  def self.json_price_to_big_data(p)
    BigDecimal.new(p.to_s)
  end

end
