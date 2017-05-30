'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4')

class OrderBook extends Lucid {

constructor(data){
	super()

	// this.id=data.id
	this.uuid = uuid()
	// this.type = data.type
	// this.asset = data.asset
	// this.to_asset = data.to_asset
	// this.amount = data.amount
	// this.price = data.price
	// this.status = data.status
	// this.created_at = data.created_at
}

	static get visible(){
		return ['id', 'uuid', 'type', 'asset', 'to_asset', 'amount', 'price', 'status','created_at']
	}
}

module.exports = OrderBook
