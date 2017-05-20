'use strict'

const Lucid = use('Lucid')
const uuidV4 = require('uuid/v4');

class Payment extends Lucid {

constructor(data) {
    super()

    console.log(`Profile data: ${data.name}`)
    console.log(JSON.stringify(data))

    this.uuid = uuidV4()
    this. = data.
    this. = data.
    this. = data. 
    this. = data. 
  }  

  static get visible(){
    return ['', '', '', '', '', '']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Payment
