'use strict'

const Lucid = use('Lucid')
const uuidV4 = require('uuid/v4')

class OrderBook extends Lucid {

constructor(data){
	super()

	// this.id=data.id
	this.uuid = uuidV4()
	this.type = data.type
	this.asset = data.asset
	this.amount = data.amount
	this.price = data.price
	this.status = data.status
	this.created_at = data.created_at
}

	static get visible(){
		return ['id', 'uuid', 'type', 'asset', 'amount', 'price', 'status','created_at']
	}
}

module.exports = OrderBook
