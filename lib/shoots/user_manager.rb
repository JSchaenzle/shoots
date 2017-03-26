require 'bcrypt'

class UserManager

  def self.create_user(request_data)
    user = User.create({
      name: request_data["name"],
      email: request_data["emailAddress"].downcase,
      auth_token: Digest::SHA1.hexdigest([Time.now, rand].join),
      encrypted_pwd: BCrypt::Password.create(request_data["password"]) 
    });
    raise ValidationError.new(user.errors) unless user.saved?
    return user
  end

  def self.authenticate_user(request_data)
    user = User.first(:email => request_data["emailAddress"])
    raise UnauthorizedError unless user
    valid_pwd = BCrypt::Password.new(user.encrypted_pwd) == request_data["password"]
    raise UnauthorizedError unless valid_pwd
    return user
  end
  
  def self.get_user_for_token(token)
    User.first(:auth_token => token)
  end

end
