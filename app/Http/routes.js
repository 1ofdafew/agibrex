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
Route.get('/login', 'AuthController.index')
Route.post('/login', 'AuthController.login')

// Register
Route.get('/register', 'RegisterController.index')
Route.post('register', 'RegisterController.doRegister')

// OrderBook
Route.group('version1',function() {
	// Route.resource('orderbook', 'OrderBookController')
	Route.get('orderbook', 'OrderBookController.index')
	Route.post('orderbook', 'OrderBookController.store')
	Route.post('orderbook/delete', 'OrderBookController.delete')
	Route.post('orderbook/activate', 'OrderBookController.activate')
	Route.get('orderbook/showbid', 'OrderBookController.showbid')
	Route.get('orderbook/showask', 'OrderBookController.showask')
	Route.get('orderbook/showdelete', 'OrderBookController.showdelete')
}).prefix('api/v1')

// Account
Route.get('/account/:acc_type', 'AccountController.index')
Route.get('/dashboard', 'DashboardController.index')

// Buysell
Route.get('/buysell/:acc_type', 'BuySellController.index')

Route.get('/market', 'MarketDataController.fetchData')


Route.group('version1',function() {
  //profile
  Route.get('profile', 'ProfileController.index')
  Route.get('profile/show', 'ProfileController.show')
  Route.post('profile', 'ProfileController.store')
  Route.post('profile/update', 'ProfileController.update')
  
  //credit card
  Route.get('creditCard', 'CreditCardController.index')
  Route.get('creditCard/show', 'CreditCardController.show')
  Route.post('creditCard', 'CreditCardController.store')
  Route.post('creditCard/update', 'CreditCardController.update')

  //history
  Route.get('history','HistoryController.index')
  Route.post('history','HistoryController.store')
  Route.get('history/show','HistoryController.show')

  //transaction
  Route.get('transaction','TransactionController.index')
  Route.post('transaction','TransactionController.store')
  Route.get('transaction/show','TransactionController.show')

}).prefix('api/v1')

// Asset
// Route.get('/asset', 'ProfileController.index')

// //creditCard
//  Route.group('version1',function() {
//   Route.resource('creditCard', 'CreditCardController')
// }).prefix('api/v1')

// //history
// Route.get('/history','HistoryController.index')

// //orderbook
// Route.get('/orderbook','OrderBookController.index')

// //payment
// Route.get('/payment','PaymentController.index')

// //transaction
// Route.get('transaction','TransactionController.index')
