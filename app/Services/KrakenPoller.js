'use struct'

const req = use('Request');
// const MarketData = use('App/Model/MarketData')

class KrakenPoller {

  constructor() {
  }

  * poll() {

    var autobahn = require('autobahn');
    var wsuri = "wss://api.kraken.com/0/public/Trades";
    var connection = new autobahn.Connection({
      url: wsuri,
      realm: "realm1"
    });

    connection.onopen = function (session) {
      function marketEvent (args, kwargs) {
        console.log(args);
      }
      session.subscribe('XETHZUSD', marketEvent)
      // session.subscribe('BTC_ETH', marketEvent)
    }
    connection.open()
    // const url = request.get('https://api.kraken.com/0/public/Trades?pair=XETHZUSD')
    // response.send(JSON.stringify(url))
    // console.log(url)

    // const url = 'https://api.kraken.com/0/public/Trades?pair=XETHZUSD';
    // fetch(url)
    // .then((resp) => resp.json())
    // .then(function(data) {
    //   return {
    //     api: 'connection',
    //     version: '1.0'
    //   }
    // })
    // console.log(url);

    // poll the data

    // return the data
    return {
      api: 'connection',
      version: '1.0'
    }
  }

}

module.exports = KrakenPoller
