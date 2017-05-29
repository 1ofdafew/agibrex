'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');


class CreditCardService{

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/CreditCard']
  }

  /**
   * Constructor
   * @param {CreditCard} - The CreditCard model
   */
  constructor (CreditCard) {
    this.CreditCard = CreditCard
  }

  //=>show all data
  * showAll() {
    return yield Database.table('credit_cards')
  }

  //=>insert data credit card
  * store (name, card_num, cvv){
  	const creditCard = new this.CreditCard()

  	creditCard.uuid = uuid()
  	creditCard.name = name
  	creditCard.card_num = card_num
  	creditCard.cvv = cvv

  	yield creditCard.save()

    const freshInstance = yield this.CreditCard.find(creditCard.id)

    return freshInstance
  }

  //=>show some data credit card
  * show(){
  	return yield Database
    .table('credit_cards')
    .select('name', 'card_num', 'cbb')
    .where({id:id})
  }

  //=>update some data credit card
  * update (card_num, cbb){
    const updateRow = yield Database
    .table('credit_cards')
    .where({ id: id})
    .update('card_num', card_num)
    .update('cbb', cbb)
  }
}

module.exports = CreditCardService