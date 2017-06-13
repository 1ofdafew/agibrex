'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

/**
 * Main Page
 */
Route.get('/', 'PreviewController.index')
Route.post('/', 'PreviewController.invited')

Route.on('/home').render('welcome')

/**
 * POC Pages
 */
Route.group('Proof of Concept', function () {
  Route.get('/', 'PocController.orderbook')
  Route.get('/message', 'PocController.message')
}).prefix('/poc')

/**
 * Login
 */
Route.group('Authentication', function () {

  Route.get('/login', 'Auth/LoginController.index').as('login')
  Route.post('/login', 'Auth/LoginController.login').as('login')
  Route.get('/logout', 'Auth/LoginController.logout').as('logout')

  Route.get('/forgot', 'Auth/ForgotPasswordController.index').as('forgot')
  Route.post('/forgot', 'Auth/ForgotPasswordController.reset').as('forgot')
  Route.get('/reset', 'Auth/ForgotPasswordController.prepareResetPassword').as('reset')
  Route.post('/reset', 'Auth/ForgotPasswordController.doResetPassword').as('reset')

  // Register
  Route.get('/register', 'Auth/RegisterController.index').as('register')
  Route.post('/register', 'Auth/RegisterController.register').as('register')
  Route.get('/resetpass', 'Auth/RegisterController.resetPassword').as('resetPassword')

  Route.get('/verify', 'Auth/AccountVerifyController.index').as('verify')
  Route.post('/verify', 'Auth/AccountVerifyController.verify').as('verify')
  Route.get('/resend', 'Auth/AccountVerifyController.resend').as('resend')
  Route.post('/resend', 'Auth/AccountVerifyController.doResend').as('doResend')

}).prefix('/auth')

//BabbleBox
Route.get('/babblebox', 'BabbleBoxController.index')

/**
 * Dashboard
 */
Route.get('/dashboard', 'DashboardController.index')
  .as('dashboard')
  .middleware('auth')

/**
  * Temporary Page
*/
Route.get('/temp','TempController.index')
Route.get('/apiAccess/api_Access','TempController.index')
Route.get('/coming_soon','ComingSoonController.index')

/**
 * Inbox
 */
Route.get('/inbox', 'InboxController.index')
  .as('inbox')
  .middleware('auth')

/**
 * Gibrex
 */
 Route.group('Gibrex', function () {

   Route.get('/about/us', 'Gibrex/GibrexController.aboutGibrex').middleware('auth')
   Route.get('/security/info', 'Gibrex/GibrexController.ourSecurity').middleware('auth')
   Route.get('/exchange/fees', 'Gibrex/GibrexController.fees').middleware('auth')
   Route.get('/contact/us', 'Gibrex/GibrexController.contactUs').middleware('auth')

 }).prefix('/gibrex')


/**
 * Security
 */
Route.group('Security', function () {

  Route.get('/options','Security/SecurityController.index').middleware('auth')
  Route.post('/options','Security/SecurityController.pick').middleware('auth')

  Route.get('/qrcode','Security/QRCodeController.index').middleware('auth')
  Route.post('/qrcode','Security/QRCodeController.verify').middleware('auth')

  Route.get('/sms','Security/SMSController.index').middleware('auth')
  Route.post('/sms','Security/SMSController.index').middleware('auth')

}).prefix('/security')


/**
 * Account routes
 */
Route.group('Accounts', function () {

  Route.get('/', 'Accounts/AccountController.index').middleware('auth')

  Route.get('/bitcoin', 'Accounts/BitcoinController.account').middleware('auth')
  Route.post('/bitcoin/create', 'Accounts/BitcoinController.create').middleware('auth')
  Route.get('/bitcoin/deposit', 'Accounts/BitcoinController.deposit').middleware('auth')
  Route.get('/bitcoin/withdraw', 'Accounts/BitcoinController.withdraw').middleware('auth')

  Route.get('/tracto', 'Accounts/TractoController.account').middleware('auth')
  Route.post('/tracto/create', 'Accounts/TractoController.create').middleware('auth')
  Route.get('/tracto/deposit', 'Accounts/TractoController.deposit').middleware('auth')
  Route.get('/tracto/withdraw', 'Accounts/TractoController.withdraw').middleware('auth')

  Route.get('/ethereum', 'Accounts/EthereumController.account').middleware('auth')
  Route.post('/ethereum/create', 'Accounts/EthereumController.create').middleware('auth')
  Route.get('/ethereum/deposit', 'Accounts/EthereumController.deposit').middleware('auth')
  Route.get('/ethereum/withdraw', 'Accounts/EthereumController.withdraw').middleware('auth')


}).prefix('/accounts')

/**
 * User Settings
 */
Route.group('User Settings', function () {

  Route.get('/profile', 'User/SettingsController.profile').middleware('auth')
  Route.get('/change', 'User/SettingsController.changePassword').middleware('auth')

}).prefix('/user')


/**
 * Historical data
 */
Route.group('Historical Data', function() {
  Route.get('/bitcoin', 'Data/ChartController.bitcoin')
  Route.get('/ethereum', 'Data/ChartController.ethereum')
  Route.get('/apple', 'Data/ChartController.apple')
  Route.get('/ethereum/fees', 'Data/ChartController.getFees')
}).prefix('/data')

/**
 * Exchange
 */
Route.group('Exchange', function() {

  Route.get('/',          'ExchangeController.index')

  // BTC to others
  Route.get('/btc/eth',   'ExchangeController.btcEth')
  Route.get('/btc/trc',   'ExchangeController.btcTrc')

  // ETH to others
  Route.get('/eth/btc',   'ExchangeController.ethBtc')
  Route.get('/eth/trc',   'ExchangeController.ethTrc')

  // TRC to others
  Route.get('/trc/btc',   'ExchangeController.trcBtc')
  Route.get('/trc/eth',   'ExchangeController.trcEth')

  Route.get('/twitter',   'ExchangeController.twitter')

  // ==========================================================================
  // Buy Services
  // BTC to others
  Route.post('/buy/btc/eth',  'ExchangeController.buyBtcFromEth')
  Route.post('/buy/btc/trc',  'ExchangeController.buyBtcFromTrc')

  // ETH to others
  Route.post('/buy/eth/btc',  'ExchangeController.buyEthFromBtc')
  Route.post('/buy/eth/trc',  'ExchangeController.buyEthFromTrc')

  // TRC to others
  Route.post('/buy/trc/btc',  'ExchangeController.buyTrcFromBtc')
  Route.post('/buy/trc/eth',  'ExchangeController.buyTrcFromEth')
  //
  // ==========================================================================
  // Sell Services
  // BTC to others
  Route.post('/sell/btc/eth',  'ExchangeController.sellBtcToEth')
  Route.post('/sell/btc/trc',  'ExchangeController.sellBtcToTrc')

  Route.post('/sell/eth/btc',  'ExchangeController.sellEthToBtc')
  Route.post('/sell/eth/trc',  'ExchangeController.sellEthToTrc')

  Route.post('/sell/trc/btc',  'ExchangeController.sellTrcToBtc')
  Route.post('/sell/trc/eth',  'ExchangeController.sellTrcToEth')

}).prefix('/exchange')

/**
 * Trades
 */
Route.group('Buy n Sell', function () {
  Route.get('/bitcoin', 'TradesController.trade_bitcoin').middleware('auth')
  Route.get('/tracto', 'TradesController.trade_tracto').middleware('auth')
  Route.get('/ethereum', 'TradesController.trade_ethereum').middleware('auth')
}).prefix('/trades')

Route.get('/market', 'MarketDataController.fetchData').middleware('auth')


Route.group('API',function () {

  //profile
  Route.get('/profile', 'ProfileController.index')
  Route.get('/profile/show', 'ProfileController.show')
  Route.post('/profile', 'ProfileController.store')
  Route.post('/profile/update', 'ProfileController.update')

  //credit card
  Route.get('/creditCard', 'CreditCardController.index')
  Route.get('/creditCard/show', 'CreditCardController.show')
  Route.post('/creditCard', 'CreditCardController.store')
  Route.post('/creditCard/update', 'CreditCardController.update')

  //history
  Route.get('/history','HistoryController.index')
  Route.post('/history','HistoryController.store')
  Route.get('/history/show','HistoryController.show')

  //transaction
  Route.get('/transaction','TransactionController.index')
  Route.post('/transaction','TransactionController.store')
  Route.get('/transaction/show','TransactionController.show')

  //OrderBook
  Route.get('orderbook', 'OrderBookController.index')
  Route.post('orderbook', 'OrderBookController.store')
  Route.post('orderbook/delete', 'OrderBookController.delete')
  Route.post('orderbook/activate', 'OrderBookController.activate')
  Route.get('orderbook/showbid', 'OrderBookController.showbid')
  Route.get('orderbook/showask', 'OrderBookController.showask')
  Route.get('orderbook/showdelete', 'OrderBookController.showdelete')

  //Matching
  Route.post('match/process', 'MatchController.process')

  //Asset
  Route.get('/asset','AssetController.index')
  Route.post('/asset','AssetController.store')
  Route.get('/asset/show','AssetController.show')

  //Payment
  Route.get('/payment','PaymentController.index')
  Route.post('/payment','PaymentController.store')
  Route.get('/payment/show','PaymentController.show')

}).prefix('/api/v1')


//Buy/Sell chart
Route.get('/obchart', 'ObchartController.index').as('orderbook.chart')
Route.get('/obchart/bid', 'ObchartController.bid')
Route.get('/obchart/ask', 'ObchartController.ask')
Route.on('/mdepth').render('orderbook.chart')
Route.get('/order_book', 'OrderBookController.view')

Route.group('Social Feeds', function() {
  Route.get('/twitter', 'Social/TwitterController.twitter')
}).prefix('/social')
