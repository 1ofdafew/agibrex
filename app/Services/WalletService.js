'use strict'

const Exceptions = use('App/Exceptions')
const CoinFactory = use('App/Services/Coins/CoinFactory')
const logger = make('App/Services/LogService')

class WalletService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Wallet']
  }

  /**
   * Constructor
   * @param {Wallet} - The wallet model
   */
  constructor (Wallet) {
    this.Wallet = Wallet
  }

  /**
   * Create wallet for the user
   * @param {type}  - can be {bitcoin|ethereum|tracto}
   * @param {user}  - The user object
   * @param {pin}   - The pin to be used for transaction
   *
   * @return {Object} - The wallet object
   */
  * create(type, user, pin) {

    logger.info('=> Creating wallet', type, 'for user', user.username)
    // => Creating wallet ethereum for user mhishami
    // Creating wallet for mhishami...
    // Coin:ethereum: URL => http://147.135.171.127/api/v1/ethereum, method => post, data =>
    // { username: 'mhishami', pin: '1234' }
    // Coin:ethereum: response => 
    // { status: 'ok',
    //   data: 
    //    { wallet: 
    //       { uuid: '706eb113-12fb-4825-bf0f-1b1a3fc64499',
    //         type: 'ETHEREUM',
    //         username: 'mhishami',
    //         address: '0xcc9270796392b09d8b26209e269fc0156516242d',
    //         pin: 'Ez218jPCS79WYVdie34J4UiWyL33sK7wLZymGYWD9vDG',
    //         mnemonics: 'picture tuna twin usage pill dose usual youth property hawk arm athlete',
    //         created_at: '2017-05-23T05:33:00Z',
    //         updated_at: '2017-05-23T05:33:00Z' } } }
    const factory = new CoinFactory(type)
    const resp = yield factory.createWallet(user.username, pin)

    logger.debug('wallet:', resp)
    // wallet: { status: 'ok',
    //   data: 
    //    { wallet: 
    //       { uuid: '706eb113-12fb-4825-bf0f-1b1a3fc64499',
    //         type: 'ETHEREUM',
    //         username: 'mhishami',
    //         address: '0xcc9270796392b09d8b26209e269fc0156516242d',
    //         pin: 'Ez218jPCS79WYVdie34J4UiWyL33sK7wLZymGYWD9vDG',
    //         mnemonics: 'picture tuna twin usage pill dose usual youth property hawk arm athlete',
    //         created_at: '2017-05-23T05:33:00Z',
    //         updated_at: '2017-05-23T05:33:00Z' } } }
    const wallet = new this.Wallet()
    wallet.user_id = user.id 

    wallet.uuid = resp.data.wallet.uuid
    wallet.type = resp.data.wallet.type
    wallet.username = resp.data.wallet.username
    wallet.address = resp.data.wallet.address
    wallet.pin = resp.data.wallet.pin
    wallet.mnemonics = resp.data.wallet.mnemonics
    yield wallet.save(wallet)
    logger.info('wallet created:', wallet)

    if (wallet.isNew()) {
      throw new Exceptions.ApplicationException('Unable to create your account, please try after some time', 400)
    }
    const freshInstance = yield this.Wallet.find(wallet.id)
    
    // firing email event in a non-blocking fashion
    Event.fire('wallet:created', freshInstance)

    return freshInstance
  }

  /**
   * Get account balance
   *
   * @param {String}  - can be {bitcoin|ethereum|tracto}
   * @param {String}  - The wallet address
   *
   * @return {Object} The balance
   */
  * getBalance(type, address) {
    const factory = new CoinFactory(type)
    return yield factory.getBalance(address)
  }

  /**
   * Get balance for accounts
   * @params {Array} accounts
   */
  * getAccountBalance(accounts) {
    try {
      logger.info('Received accounts:', accounts)
      var resp = []
      for (var i=0; i < accounts.length; i++) {
        const acc = accounts[i]
        logger.info('const acc =', accounts[i])
        const bal = yield this.getBalance(acc.type.toLowerCase(), acc.address)
        logger.info(`Balance for ${acc.address}:`, bal)
        resp.push({type: acc.type, address: acc.address, balance: bal.data.balance})
      }
      return resp 
    } catch(e) {
      logger.error('error:', e.message)
    }
  }

  /**
   * Get wallet for the user
   * @param {username}  The username of the user
   *
   * @return {Object} - The wallet object
   */
  * getWallet(username) {
    return yield this.Wallet.findByOrFail('username', username, function() {
      throw new Exceptions.ApplicationException(`Cannot find user wallet with ${field}`, 404)
    })
  }

  /**
   * transfer the coin to the recipient
   *
   * @param type  the currency type - {bitcoin|eethereum|tracto}
   * @param from  the wallet address from
   * @param to    the wallet address to
   * @param value the value to transfer
   * @param pin   the user PIN
   */
  * transfer(type, from, to, value, pin) {
    logger.info('Transferring data from', type, from, to, value, pin) 
    const cf = new CoinFactory(this.getCoinType(type))
    const data = {
      from: from,
      to: to,
      value: value,
      pin: pin
    }
    return yield cf.transfer(data)
  }

  * getTractoRoot() {
    return 'Tvxs8cXiXizYEkxQjzoNET9n8pn4MEBoYTtebYZoPrtAMguSBG4RGD2NwSQstMiccge54H1Z4oRjaYMWhPdm2pi42tsTuki2b'
  }

  getCoinType(type) {
    switch (type) {
      case 'TRC': 
        return 'tracto'
      case 'ETH':
        return 'ethereum'
      case 'BTC':
        return 'bitcoin'
      default:
        return 'none'
    }
  }

}

module.exports = WalletService
