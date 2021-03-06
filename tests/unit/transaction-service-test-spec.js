'use strict'

const chai = use('chai')
const assert = chai.assert
const expect = require('chai').expect

const Transaction = use('App/Model/Transaction')
const User = use('App/Model/User')
const OrderBook = use('App/Model/OrderBook')

const TransactionService = make('App/Services/TransactionService')
const UserService = make('App/Services/UserService')
const OrderBookService = make('App/Services/OrderBookService')
const MatcherService = make('App/Services/MatcherService')

require('co-mocha')
chai.should()

describe('Transaction Test Cases', () => {

  // Transaction Table
  // -----------------
  // table.increments()
  // table.integer('user_id').unsigned().references('id').inTable('users')
  // // table.integer('orderbook_id').unsigned().references('id').inTable('order_books')      
  // table.string('uuid',80).notNullable().unique()
  // table.integer('orderbook_id').after('uuid').unsigned().references('id').inTable('order_books')
  // // table.enum('asset', ['TRC','BTC','ETH','NONE']).after('orderbook_id').defaultTo('NONE')
  // // table.enum('to_asset', ['TRC','BTC','ETH','NONE']).after('asset').defaultTo('NONE')
  // table.enum('action', ['BUY', 'SELL', 'TRANSFER', 'NONE']).after('orderbook_id').notNullable().defaultTo('NONE')
  // table.enum('status', ['SUCCESS', 'FAILED', 'PENDING']).after('action').defaultTo('PENDING').notNullable()
  // table.string('trace', 10).after('status').defaultTo('START')
  // table.timestamps()

  // OrderBook Table
  // ---------------
  // table.increments('id')
  // table.integer('user_id').unsigned().references('id').inTable('users')
  // table.string('uuid',80).notNullable().unique()
  // table.double('amount')
  // table.double('price')
  // table.enum('status', ['ACTIVE', 'CANCELLED', 'PENDING', 'CLOSED']).after('price').defaultTo('ACTIVE').notNullable()
  // table.enum('asset', ['TRC', 'BTC', 'ETH', 'ANY']).after('uuid').defaultTo('ANY').notNullable()
  // table.enum('to_asset',['TRC', 'BTC', 'ETH', 'ANY']).after('asset').defaultTo('ANY').notNullable()
  // table.enum('type',['ASK', 'BID', 'ANY']).after('to_asset').defaultTo('ANY').notNullable()


  afterEach(function * () {
    const Db = use('Database')

    // can't use truncate due to relations. Delete instead
    yield Db.table('transactions').having('id', '>', 0).delete()
    yield Db.table('order_books').having('id', '>', 0).delete()
    yield Db.table('users').having('id', '>', 0).delete()
    // yield Db.truncate('transactions')
    // yield Db.truncate('order_books')
    // yield Db.truncate('users')
  })

  it ('should create user, and order book for this transaction', function * () {
    const user = yield UserService.register('foo', 'foo@bar.com', 'secret')
    assert.instanceOf(user, User)

    const ob = {
      amount: 10,
      price: 0.85,
      status: 'ACTIVE',
      asset: 'BTC',
      to_asset: 'TRC',
      type: 'BID'
    }
    const ob1 = yield OrderBookService.store(ob, user)
    ob.amount = 50
    const ob2 = yield OrderBookService.store(ob, user)

    assert.instanceOf(ob1, OrderBook)
    assert.instanceOf(ob2, OrderBook)

    // select from DB, should be 2 OrderBooks
    const all = yield OrderBookService.findByUser(user)
    assert.lengthOf(all.toJSON(), 2, 'should have 2 orderbooks')
  })

  it ('should match the orderbooks', function * () {
    const user = yield UserService.register('foo', 'foo@bar.com', 'secret')
    assert.instanceOf(user, User)

    // seller of TRC
    const ob = {
      amount: 10000000,
      price: 0.85,
      status: 'ACTIVE',
      asset: 'TRC',
      type: 'ASK'
    }
    const seller = yield OrderBookService.store(ob, user)
    assert.instanceOf(seller, OrderBook)

    // set buyer, buys from BTC
    ob.amount = 100
    ob.asset = 'BTC'
    ob.to_asset = 'TRC'
    ob.type = 'BID'
    const buyer = yield OrderBookService.store(ob, user)
    assert.instanceOf(buyer, OrderBook)

    yield MatcherService.tryMatch(buyer)

  })

  it ('should store matching orders')
  it ('should execute orders')
  it ('should create transactions')

})