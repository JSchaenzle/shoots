class AnnualDataProcessor
  def self.processData(data)
    resp = {}
    data.each do |year, v|
      shoots = []
      expenses = []
      resp[year] = FieldProcessor.processFields(shoots, expenses, v)
    end
    resp
  end
end

class ReportProcessingRegistry

  def setup
    register_data_type("annual-data", AnnualDataProcessor)
  end

  def register_data_type(identifier, processor)
    registry[identifier] = processor
  end

  def process_request(req)
    resp = {}
    req.each do |k, v|
      p = registry[k]
      resp[k] = p.processData(v)
    end
    resp
  end

end
