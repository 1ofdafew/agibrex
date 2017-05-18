'use strict'

const Lucid = use('Lucid')

class OrderBook extends Lucid {

constructor(data){
	super()

	this.id=data.id
	this.type=data.type
	this.asset=data.asset
	this.price=data.price
	this.status=data.status
	this.created_at=data.created_at
}

	static get visible(){
		return ['id', 'type', 'asset', 'amount', 'price', 'status','created_at']
	}
}

module.exports = OrderBook
