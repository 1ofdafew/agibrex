'use strict'


const OrderBook = use('App/Model/OrderBook') 

class OrderBookController {

* index (request, response) {
	    // yield response.sendView('profile')
	    // response.ok(profile)
	    const ob = yield OrderBook.all()
	    response.json(ob)
	  }

		* store(request, response) {
	        const ob = new OrderBook()
	        ob.type = request.input('type')
	        ob.asset = request.input('asset')
	     	ob.amount = request.input('amount')
	     	ob.price = request.input('price')
	     	ob.status = request.input('status')

	        yield ob.save()
	        response.ok(ob)

	        // var profileMessage = {
	        //     success: 'already save'
	        // }

	        // yield response.sendView('profile', { profileMessage : profileMessage })
	    }
}

module.exports = OrderBookController
