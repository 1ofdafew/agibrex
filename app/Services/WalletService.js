'use strict'

const Exceptions = use('App/Exceptions')
const CoinFactory = use('App/Services/Coins/CoinFactory')

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

    console.log('=> Creating wallet', type, 'for user', user.username)
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

    console.log('wallet:', resp)
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
    wallet.uuid = resp.data.wallet.uuid
    wallet.type = resp.data.wallet.type
    wallet.username = resp.data.wallet.username
    wallet.address = resp.data.wallet.address
    wallet.pin = resp.data.wallet.pin
    wallet.mnemonics = resp.data.wallet.mnemonics
    yield user.wallet().save(wallet)

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
}

module.exports = WalletService
