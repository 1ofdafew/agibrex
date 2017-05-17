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

// Account
// Route.get('/account', 'AccountController.index')
Route.get('/account/:acc_type', 'AccountController.index')
