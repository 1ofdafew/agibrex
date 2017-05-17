'use strict'

const Command = use('Command')
const CoinFactory = use('App/Repositories/CoinFactory')
const TractoCoin = use('App/Repositories/TractoCoin')

class CryptoCoin extends Command {

  /**
   * signature defines the requirements and name
   * of command.
   *
   * @return {String}
   */
  get signature () {
    return 'cryptocoin {type} {username} {pin}'
  }  

  /**
   * description is the little helpful information displayed
   * on the console.
   *
   * @return {String}
   */
  get description () {
    return 'Create wallet for user'
  }  

  /**
   * handle method is invoked automatically by ace, once your
   * command has been executed.
   *
   * @param  {Object} args    [description]
   * @param  {Object} options [description]
   */
  * handle (args, options) {
    this.info(`Creating wallet: ${args.type} ${args.username} ${args.pin}`)
    const resp = yield new CoinFactory('tracto').createWallet(args.username, args.pin)    
    this.info(`Response: ${resp}`)
  }  
}

module.exports = CryptoCoin
