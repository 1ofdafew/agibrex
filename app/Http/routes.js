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
  Route.get('/', 'PocController.index')
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
Route.get('/coming_soon','ComingSoonController.index')


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
}).prefix('/data')

/**
 * Exchange
 */
Route.group('Exchange', function() {
  Route.get('/','ExchangeController.index')
  Route.get('/btc','ExchangeController.btc')
  Route.get('/eth','ExchangeController.eth')
  Route.get('/trc','ExchangeController.trc')
  Route.post('/sell/TRC','ExchangeController.selltrc')
  Route.post('/buy/TRC','ExchangeController.buytrc')
  Route.post('/sell/BTC','ExchangeController.sellbtc')
  Route.post('/buy/BTC','ExchangeController.buybtc')
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

