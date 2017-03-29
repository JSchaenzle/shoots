
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
    
    convert_request_param_to_big_data(request_data, "price")
    convert_request_param_to_big_data(request_data, "miles_traveled")
    convert_request_param_to_big_data(request_data, "hours_shooting")
    convert_request_param_to_big_data(request_data, "hours_editing")

    shoot.update(request_data)
    raise InternalServerError unless shoot.saved?
    shoot
  end

  def self.add_photoshoot(user, request_data)
    photoshoot = Photoshoot.create(
      :name => request_data["name"],
      :date => request_data["date"],
      :price => json_number_to_big_data(request_data["price"]),
      :completed => request_data["completed"],
      :created_at => Time.now,
      :miles_traveled => json_number_to_big_data(request_data["miles_traveled"]),
      :hours_shooting => json_number_to_big_data(request_data["hours_shooting"]),
      :hours_editing => json_number_to_big_data(request_data["hours_editing"]),
      :description => request_data["description"],
    )
    user.photoshoots << photoshoot
    photoshoot.save

    raise InternalServerError unless photoshoot.saved?
    photoshoot
  end

  def self.json_number_to_big_data(p)
    BigDecimal.new(p.to_s)
  end

  def self.convert_request_param_to_big_data(request_data, param)
    if request_data.key? param
      request_data[param] = json_number_to_big_data(request_data[param])
    end
  end

end
