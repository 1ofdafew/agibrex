
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});


connection.onopen = function (session) {
  function marketEvent (args, kwargs) {
    const data = args
    const filter = new BloomFilter(data)
    const result = filter.sift('/BTC|LTC|XMR|ETH/')

    console.log(data)
    console.log('Filter results: ', result)

    var res = JSON.stringify(result);
    ws.send(MarketDataController(res));

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
