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
    return user
  end

end
