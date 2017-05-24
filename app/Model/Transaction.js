'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Transaction extends Lucid {

	// constructor(data) {
 //    super()

 //    console.log(`Transaction data: ${data.action}`)
 //    console.log(JSON.stringify(data))

 //    this.uuid = uuid()
 //    this.action = data.action
 //    this.status = data.status
 //    this.acc_type = data.acc_type 
 //  }  

  static get visible(){
    return ['id', 'uuid', 'action', 'status', 'acc_type']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Transaction
