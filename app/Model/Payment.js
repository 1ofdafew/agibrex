'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Payment extends Lucid {

constructor(data) {
    super()

    console.log(`Profile data: ${data.name}`)
    console.log(JSON.stringify(data))

    this.uuid = uuid()
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
