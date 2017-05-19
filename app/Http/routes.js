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

// Buysell
Route.get('/buysell/:acc_type', 'BuySellController.index')

Route.get('/market', 'MarketDataController.fetchData')

