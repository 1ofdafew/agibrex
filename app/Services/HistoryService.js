'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');

class HistoryService{

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
   	return ['App/Model/History']
  }

  /**
   * Constructor
   * @param {History} - The History model
   */
  constructor (History) {
    this.History = History
  }

  //=> show all data histories
  * showAll() {
  	return yield Database.table('histories')
  }

  //=>insert data history
  * store (location, ip_address, trace, activities){
    const history =new this.History()

    history.uuid = uuid()
    history.location = location
    history.ip_address = ip_address
    history.trace = trace 
    history.activities = activities 

    yield history.save()

    const freshInstance = yield this.History.find(history.id)
    
    return freshInstance
  }

  //=>show some data history
  * show(){
  	return yield Database
    .table('histories')
    .select('location', 'ip_address', 'trace', 'activities')
    .where({id:2})
  }
}
module.exports = HistoryService