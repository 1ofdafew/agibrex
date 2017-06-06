'use strict'

const UserService = make('App/Services/UserService')
const OBService = make('App/Services/OrderBookService')
const MDService = make('App/Services/MarketDataService')

const USER = {
  username: 'robot',
  email: 'robot@gibrex.com',
  password: 'secret'
}

class RobotTraderService {

  constructor() {
    // check if robot user is already exists
    try {
      const user = UserService.findByOrFail('username', USER.username)
    } catch (e) {
      // user not there
      const robot = UserService.register(
        USER.username, USER.email, USER.password
      )
    }
  }

  * makeOrderBook (assetFrom, assetTo) {
   
    // we have a few scenarios here:
    // 1) no order book yet. ZERO - lowest == highest == null
    // 2) just 1 order. lowest == highest
    // 3) everything in between
    // 
    // scenario (1)
    const user = UserService.findByOrFail('username', USER.username)
    try {
      this.doBid(assetFrom, assetTo, user)
    } catch (e) {
      // exception, since we have none.
      const price = MDService.getSpotPrice(assetTo) / 100
      return yield createBid(assetFrom, assetTo, user, price)
    }
  }

  * doBid(assetFrom, assetTo, user) {
    const lowest = OBService.getLowestBid(assetFrom, assetTo)
    const highest = OBService.getHighestBid(assetFrom, assetTo)

    // should be 20% of the difference
    const should = (highest[0].price - lowest[0].price) * 0.20
    return yield this.createBid(assetFrom, assetTo, user, should)
  }

  * createBid(from, to, user, price) {
    // make a new Bid
    const bid = {
      amount: this.random(1, 1000),
      price: price,
      asset: from,
      to_asset: to,
      type: 'BID'
    }
    return yield OBService(bid, user)
  }

  * random(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min)
  }

}

module.exports = RobotTraderService

