class UserManager

  def self.getUser(token)
    User.first(:auth_token => token)
  end

  def self.createUser(requestData)
    puts "Creating user for #{requestData}"
    user = User.create(
      {
        name: requestData["name"],
        email: requestData["emailAddress"],
        auth_token: Digest::SHA1.hexdigest([Time.now, rand].join)
      });
    raise ValidationError.new(user.errors) unless user.saved?
    return user
  end

  def self.findUser(requestData)
    user = User.first(:email => requestData["emailAddress"])
    puts "Found User:" + user.inspect
    raise UnauthorizedError unless user
    return user
  end

end
