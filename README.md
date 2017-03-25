#Shoots

An app for managing a photography business


## Startup and Configuration Process
### Production (Heroku)
The production startup process proceeds in the following order:

  - `bundle exce foreman start`
    - Calls 'rackup'
      - config.ru loads application.rb
        - application.rb loads environment.rb
            - environment.rb Config block runs
                - requires all application modules
                - sets up database
        - application.rb Configure block runs
            - sets sinatra root path, etc.
      - config.ru runs Sinatra::Application
          - The server actually starts running

### Development

## Reports
 - Annual Tax Report
   - Total income
   - Total expenses
   - Total mileage
 - Annual Business Review
   - Total income
   - Total expenses
   - Number of photoshoots
   - Graph of photoshoots by month
   - Total hours spent editing, travelling, shooting
   - Average hours per shoot spent editing, travelling, shooting
   - Dollars / Hour
 - All Time Review
   - Same as Annual Business Review
   - Chart of income/expsese over the years
   
## Report Data Acquisition
```
request looks like this:
{
  annual-data: {
    2016: {
      income: null,
      expense: null,
      mileage: null
    }
  }
}

response looks like this:
{
  annual-data: {
    2016: {
      income: 123.4,
      expense: 123.3,
      mileage: 2344.4
    }
  }
}
```
   
   
 
 

