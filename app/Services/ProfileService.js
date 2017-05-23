'use strict'

const Database = use('Database')

class ProfileService {


  * show() {
    return yield Database.table('profiles')
  }
  
}

module.exports = ProfileService
