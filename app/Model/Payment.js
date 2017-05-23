'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Payment extends Lucid {

constructor(data) {
    super()

    console.log(`Profile data: ${data.trans_id}`)
    console.log(JSON.stringify(data))

    this.uuid = uuid()
    this.trans_id = data.trans_id
    this.amount = data.amount
    this.type = data.type

  }  

  static get visible(){
    return ['id', 'uuid', 'trans_id', 'amount', 'type']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Payment
