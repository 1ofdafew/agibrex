'use strict'

const Payment = use('App/Model/Payment')
const Database = use('Database');

class PaymentController {

* index (request, response) {
      // yield response.sendView('profile')
      // response.ok(profile)
      //const profile = yield Profile.all()
       const payment = yield Database.table('payment')
      response.json(payment)
    }
  

    * store(request, response) {
      const data = request.only(['', '', '', ''])
      console.log('ProfileController data....')
      console.log(data)

          const payment = new Payment(data)
          yield payment.save()
          response.ok(payment)

          // var profileMessage = {
          //     success: 'already save'
          // }

          // yield response.sendView('profile', { profileMessage : profileMessage })
      }

      * show(request, response) {

        const id = request.param("id");

        
        const data = yield Database
        .table('payment')
        .select('', '', '', '')
        .where({id:id})
        // .where({id:id});
        // const profiles = data[0]

        // var request = require('request');
        // request(article.href, function (error, response, body) {
        //   if(!error){
        //     console.log(body)
        //   }
        // })
        // return profiles
        response.json(data)

        }

}

module.exports = PaymentController
