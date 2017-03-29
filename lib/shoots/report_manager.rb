require 'date'

class ReportManager
  def self.get_annual_report(user, year)
    dateRange = (Date.parse("#{year}-01-01") .. Date.parse("#{year}-12-31"))
    photoshoots = user.photoshoots.all(completed: true, date: dateRange)
    totals = {
      income: 0,
      hours_editing: 0,
      hours_shooting: 0,
      miles_traveled: 0
    }
    result = photoshoots.reduce(totals) do |memo, value|
      memo.income += value.price
      memo.hours_editing += value.hours_editing
      memo.hours_shooting += value.hours_shooting
      memo.miles_traveled += value.miles_traveled
    end
    return result
  end
end
