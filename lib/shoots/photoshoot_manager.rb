
class PhotoshootManager
  def self.getAllPhotoshoots(user)
    puts "Finding photoshoots for: #{user.name} - #{user.id}"
    shoots = user.photoshoots
    puts "Found #{shoots.count}"
    shoots
  end

  def self.deletePhotoshoot(user, id)
    shoot = user.photoshoots.get(id)
    raise ResourceNotFoundError unless shoot
    shoot.destroy
  end

  def self.updatePhotoshoot(user, id, requestData)
    shoot = user.photoshoots.get(id)
    raise ResourceNotFoundError unless shoot

    if requestData.key? "price"
      requestData["price"] = jsonPriceToBigData(requestData["price"])
    end

    shoot.update(requestData)
    raise InternalServerError unless shoot.saved?
    shoot
  end

  def self.addPhotoshoot(user, requestData)
    photoshoot = Photoshoot.create(
      :name => requestData["name"],
      :date => requestData["date"],
      :price => jsonPriceToBigData(requestData["price"]),
      :completed => requestData["completed"],
      :created_at => Time.now
    )
    user.photoshoots << photoshoot
    photoshoot.save

    raise InternalServerError unless photoshoot.saved?
    photoshoot
  end

  def self.jsonPriceToBigData(p)
    BigDecimal.new(p.to_s)
  end

end
