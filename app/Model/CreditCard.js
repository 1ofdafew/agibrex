'use strict'

const Lucid = use('Lucid')
const uuid = use('node-uuid')

class CreditCard extends Lucid {

constructor(data) {
    super()

    console.log(`Credit Card data: ${data.name}`)
    console.log(JSON.stringify(data))

    this.uuid = uuid.v1()
    this.name = data.name
    this.card_num = data.card_num
    this.cbb = data.cbb 
  }  

  static get visible(){
    return ['id', 'uuid', 'name', 'card_num', 'cbb']
  }

   user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = CreditCard
