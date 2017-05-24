'use strict'

const History = use('App/Model/History')
const Validator = use('App/Services/Validator')
const HistoryService = make('App/Services/HistoryService')

const Database = use('Database');

class HistoryController {

  * index (request, response) {
    const history = yield HistoryService.showAll()
      response.json(history)
    }

  * store(request, response) {
    const data = request.only('location', 'ip_address', 'trace', 'activities')
      yield Validator.validate(data)

    const history = yield HistoryService.store(
      data.location, data.ip_address, data.trace, data.activities)
      
      console.log('HistoryController data....')
      console.log(data)

      response.json(history)
    }

    * show(request, response) {
      const history = yield HistoryService.show()
        response.json(history)
      }
}

module.exports = HistoryController
