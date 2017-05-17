
const Exceptions = use('App/Exceptions')

class CoinFactory {

  factory(type) {
    switch (type) {
      case 'tracto':
        return new TractoCoin()
      case 'bitcoin':
        return new Bitcoin()
      case 'ethereum':
        return new Ethereum()
      default:
        throw new Exceptions.ApplicationException('No such implementation')
    }
  }

}