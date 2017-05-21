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

// Main Page
Route.on('/').render('welcome')

// Login
Route.group('Authentication', function() {

  Route.get('/login', 'Auth/LoginController.index').as('login')
  Route.post('/login', 'Auth/LoginController.login').as('login')
  Route.get('/logout', 'Auth/LoginController.logout')

  Route.get('/forgot', 'Auth/ForgotPasswordController.index').as('forgot')
  Route.post('/forgot', 'Auth/ForgotPasswordController.reset').as('forgot')

  // Register
  Route.get('/register', 'Auth/RegisterController.index').as('register')
  Route.post('/register', 'Auth/RegisterController.register').as('register')

  Route.get('/verify', 'Auth/AccountVerifyController.index').as('verify')
  Route.post('/verify', 'Auth/AccountVerifyController.verify').as('verify')

}).prefix('/auth')

// Account routes
Route.group('Accounts', function () {
  Route.get('/', 'AccountController.index')
  Route.get('/btc', 'AccountController.account_btc')
  Route.get('/tracto', 'AccountController.account_tracto')
  Route.get('/ethereum', 'AccountController.account_ethereum')
}).prefix('/accounts').middleware('auth')

// Secure Area routes
Route.group('Secure Area', function() {


  Route.get('/dashboard', 'DashboardController.index').as('dashboard')

  // Buysell
  Route.get('/buysell/btc', 'BuySellController.trade_btc')
  Route.get('/buysell/tracto', 'BuySellController.trade_tracto')

  Route.get('/market', 'MarketDataController.fetchData')

}).middleware('auth')

Route.group('API',function() {

  // OrderBook Resources
	Route.get('/orderbook', 'OrderBookController.index')
	Route.post('/orderbook', 'OrderBookController.store')
	Route.post('/orderbook/delete', 'OrderBookController.delete')
	Route.post('/orderbook/activate', 'OrderBookController.activate')
	Route.get('/orderbook/showbid', 'OrderBookController.showbid')
	Route.get('/orderbook/showask', 'OrderBookController.showask')
	Route.get('/orderbook/showdelete', 'OrderBookController.showdelete')

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

  // OrderBook
  // Route.resource('orderbook', 'OrderBookController')
  Route.get('orderbook', 'OrderBookController.index')
  Route.post('orderbook', 'OrderBookController.store')
  Route.post('orderbook/delete', 'OrderBookController.delete')
  Route.post('orderbook/activate', 'OrderBookController.activate')
  Route.get('orderbook/showbid', 'OrderBookController.showbid')
  Route.get('orderbook/showask', 'OrderBookController.showask')
  Route.get('orderbook/showdelete', 'OrderBookController.showdelete')

}).prefix('/api/v1')
