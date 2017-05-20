'use strict'

const CreditCard = use('App/Model/CreditCard')
const Database = use('Database');

class CreditCardController {

 * index (request, response) {
      // yield response.sendView('profile')
      // response.ok(profile)
      const cc = yield Database.table('credit_cards')
      response.json(cc)
    }
  

    * store(request, response) {
      const data = request.only(['name', 'card_num', 'cbb'])
      console.log('CreditCardController data....')
      console.log(data)

          const cc = new CreditCard(data)
          yield cc.save()
          response.ok(cc)

      }

      * show(request, response) {

        const id = request.param("id");

        
        const data = yield Database
        .table('credit_cards')
        .select('name', 'card_num', 'cbb')
        .where({id:id})
        
        response.json(data)

        }

         * update(request, response) {

          const data=request.only(['id','card_num','cbb'])
          console.log('Updating a row....')
          console.log(data)

          const updateRow = yield Database
          .table('credit_cards')
          .where('id', data.id)
          .update('card_num', data.card_num)
          .update('cbb',data.cbb)
          response.ok(updateRow)
          }

}

module.exports = CreditCardController
