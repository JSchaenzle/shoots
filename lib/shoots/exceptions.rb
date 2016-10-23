class ResourceNotFoundError < StandardError
end

class InternalServerError < StandardError
end

class UnauthorizedError < StandardError
end

class ValidationError < StandardError
  def initialize(errors)
    super errors.full_messages.join(". ")
  end

  def to_json() return {errorType: self.class.name, message: message}.to_json end
end

