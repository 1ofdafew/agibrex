'use strict'

const Command = use('Command')
const CoinFactory = use('App/Services/Coins/CoinFactory')
const TractoCoin = use('App/Services/Coins/TractoCoin')

const User = use('App/Model/User')
const Wallet = use('App/Model/Wallet')

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
    this.info(`Creating wallet ${args.type} for ${args.username}`)

    // find the user first.
    const user = yield User.query().where('username', args.username).fetch()
    if (user) {
      const resp = yield new CoinFactory('tracto').createWallet(args.username, args.pin)    
      const ret = JSON.parse(resp).data.wallet

      // {"status":"ok",
      //  "data":{
      //    "wallet":{
      //       "uuid":"100b6807-a39a-42db-86b3-52aa4ff1ba5c",
      //       "type":"TRACTO",
      //       "username":"hisham",
      //       "address":"TvyZ4eSRCAk2o1jH6VHunK6XmDXALvusgKGbU2kb9rMae3RZg9n3vjyFNYekyeKHMWDbrrQuL7MPpAUNm73MLpbL2A8u2Cydi",
      //       "pin":"Ez218jPCS79WYVdie34J4UiWyL33sK7wLZymGYWD9vDG",
      //       "mnemonics":"start claim tenant worth clarify orange fiction sand dash task ginger toast",
      //       "created_at":"2017-05-17T05:55:13Z",
      //       "updated_at":"2017-05-17T05:55:13Z"
      //     }
      //   }
      // }      

      // save into wallet data
      const wallet = new Wallet()
      wallet.user_id = user.id
      wallet.uuid = ret.uuid
      wallet.type = ret.type 
      wallet.username = ret.username 
      wallet.address = ret.address
      wallet.pin = ret.pin 
      wallet.mnemonics = ret.mnemonics

      yield wallet.save()

      console.log(wallet.toJSON)
      this.info(`Wallet Address: ${wallet.address}`)      
    } else {
      this.error(`Can't find the username '${args.username}'`)
      return
    }
  }  

}

module.exports = CryptoCoin
