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
Route.on('/').render('welcome')

/** 
 * Login
 */
Route.group('Authentication', function () {

  Route.get('/login', 'Auth/LoginController.index').as('login')
  Route.post('/login', 'Auth/LoginController.login').as('login')
  Route.get('/logout', 'Auth/LoginController.logout').as('logout')

  Route.get('/forgot', 'Auth/ForgotPasswordController.index').as('forgot')  
  Route.post('/forgot', 'Auth/ForgotPasswordController.reset').as('forgot')

  // Register
  Route.get('/register', 'Auth/RegisterController.index').as('register')
  Route.post('/register', 'Auth/RegisterController.register').as('register')

  Route.get('/verify', 'Auth/AccountVerifyController.index').as('verify')
  Route.post('/verify', 'Auth/AccountVerifyController.verify').as('verify')

}).prefix('/auth')

/**
 * Dashboard 
 */
Route.get('/dashboard', 'DashboardController.index')
  .as('dashboard')
  .middleware('auth')

/**
 * Account routes
 */
Route.group('Accounts', function () {

  Route.get('/', 'Accounts/AccountController.index').middleware('auth')

  Route.get('/bitcoin', 'Accounts/BitcoinController.account').middleware('auth')
  Route.get('/bitcoin/deposit', 'Accounts/BitcoinController.deposit').middleware('auth')
  Route.get('/bitcoin/withdraw', 'Accounts/BitcoinController.withdraw').middleware('auth')

  Route.get('/tracto', 'Accounts/TractoController.account').middleware('auth')
  Route.get('/tracto/deposit', 'Accounts/TractoController.deposit').middleware('auth')
  Route.get('/tracto/withdraw', 'Accounts/TractoController.withdraw').middleware('auth')

  Route.get('/ethereum', 'Accounts/EthereumController.account').middleware('auth')
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
 * Trades
 */
Route.group('Buy n Sell', function () {
  Route.get('/bitcoin', 'TradesController.trade_bitcoin').middleware('auth')
  Route.get('/tracto', 'TradesController.trade_tracto').middleware('auth')
  Route.get('/ethereum', 'TradesController.trade_ethereum').middleware('auth')
}).prefix('/trades')

Route.get('/market', 'MarketDataController.fetchData').middleware('auth')

Route.group('API',function () {

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
