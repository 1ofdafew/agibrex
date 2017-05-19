'use strict'

const Ws = use('Ws')

var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});


connection.onopen = function (session) {

  const channel = Ws.channel('market')

  function marketEvent (args, kwargs) {
    const data = args
    // const filter = new BloomFilter(data)
    // const result = filter.sift('/BTC|LTC|XMR|ETH/')

    // console.log('Filter results: ', result)
    for (var i=0, len=data.length; i < len; i++) {
      if (data[i].type === 'newTrade') {
        // channel.emit('message', data[i])

        // we can split this into buy/sell data
        // and emit to the desired page that listen to the data
        if (data[i].data.type === 'sell') {
          channel.emit('sell', data[i].data)
        }

        if (data[i].data.type === 'buy') {
          channel.emit('buy', data[i].data)
        }

      }
    }

    // var res = JSON.stringify(result);
    // ws.send(MarketDataController(res));

  }
  function tickerEvent (args,kwargs) {
    // console.log(args)
  }
  function trollboxEvent (args,kwargs) {
    // console.log(args)
  }
  session.subscribe('USDT_BTC', marketEvent)
  session.subscribe('BTC_ETH', marketEvent)
  session.subscribe('BTC_LTC', marketEvent)
  session.subscribe('BTC_XMR', marketEvent)
  session.subscribe('BTC_XRP', marketEvent)
  // session.subscribe('ticker', tickerEvent)
  // session.subscribe('trollbox', trollboxEvent);
}

connection.onclose = function () {
  console.log("Websocket connection closed")
}

connection.open()
