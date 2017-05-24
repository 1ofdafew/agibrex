'use strict'

const CreditCard = use('App/Model/CreditCard')
const Validator = use('App/Services/Validator')
const CreditCardService = make('App/Services/CreditCardService')

const Database = use('Database');

class CreditCardController {

 * index (request, response) {
      const creditCard = yield CreditCardService.showAll()
      response.json(creditCard)
    }
  

 * store(request, response) {
      const data = request.only('name', 'card_num', 'cbb')
      yield Validator.validate(data)

      const creditCard = yield CreditCardService.store(
        data.name, data.card_num, data.cbb)

      console.log('CreditCardController data....')
      console.log(data)

      // const cc = new CreditCard(data)
      // yield cc.save()
      response.json(creditCard)

    }

 * show(request, response) {

      // const id = request.param("id");
      // const data = yield Database
      // .table('credit_cards')
      // .select('name', 'card_num', 'cbb')
      // .where({id:id})
      const creditCard = yield CreditCardService.show()
      response.json(creditCard)
    }

 * update(request, response) {

    const data=request.only('id','card_num','cbb')
      yield Validator.validate(data)

    console.log('Updating a row....')
    console.log(data)

    const creditCard = yield CreditCardService.update(
          data.card_num, data.cbb)

    //const creditCard = new CreditCard(data)
    response.json(creditCard)

  }

}

module.exports = CreditCardController
