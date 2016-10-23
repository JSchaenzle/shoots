require 'date'

class ReportManager
  def self.getAnnualReport(user, year)
    dateRange = (Date.parse("#{year}-01-01") .. Date.parse("#{year}-12-31"))
    photoshoots = user.photoshoots.all(completed: true, date: dateRange)
    sum = photoshoots.reduce(0) do |memo, value|
      memo + value.price
    end
    return {
      income: sum
    }
  end
end
