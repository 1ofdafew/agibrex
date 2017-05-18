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
	Route.resource('orderbook', 'OrderBookController')
}).prefix('api/v1')

//Route.get('/orderbook/store', 'OrderBookController.store')
//Route.post('orderbook', 'OrderBookController.store')

// Account
Route.get('/account/:acc_type', 'AccountController.index')

// Buysell
Route.get('/buysell/:acc_type', 'BuySellController.index')

Route.get('/market', 'MarketDataController.fetchData')

