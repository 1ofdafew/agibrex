

class Coin {

  constructor() {
    // check all the methods implemented.
    if (this.constructor === Coin) {
      throw new TypeError('Can\'t call this class directly')
    }

    if (this.createWallet === undefined) {
      throw new TypeError('createWallet is not defined')
    }
  }
}