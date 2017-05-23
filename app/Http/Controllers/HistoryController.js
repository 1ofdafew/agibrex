'use strict'

const History = use('App/Model/History')
const Database = use('Database');

class HistoryController {

	  * index (request, response) {

       const history = yield Database.table('histories')
      response.json(history)
    }

    * store(request, response) {
      const data = request.only(['location', 'ip_address', 'trace', 'activities'])
      console.log('HistoryController data....')
      console.log(data)

          const history = new History(data)
          yield history.save()
          response.ok(history)

      }

      * show(request, response) {

        const id = request.param("id");

        
        const data = yield Database
        .table('histories')
        .select('location', 'ip_address', 'trace', 'activities')
        .where({id:id})

        response.json(data)

        }

}

module.exports = HistoryController
