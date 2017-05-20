'use strict'

const Lucid = use('Lucid')
const uuidV4 = require('uuid/v4');


class History extends Lucid {

  constructor(data) {
    super()

    console.log(`History data: ${data.location}`)
    console.log(JSON.stringify(data))

    this.uuid = uuidV4()
    this.location = data.location
    this.ip_address = data.ip_address
    this.trace = data.trace 
    this.activities = data.activities 
  }  

  static get visible(){
    return ['id', 'uuid', 'location', 'ip_address', 'trace', 'activities']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = History
