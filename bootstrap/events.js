'use strict'

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
|
| Here you register events and define their listeners, which can be inline
| closures or reference to a Listener inside app/Listeners. Also your
| listeners can be async.
|
| Listeners are saved in app/Listeners directory.
|
| @example
| Event.when('login', 'User.login')
|
*/
const Event = use('Event')

Event.when('Http.error.*', 'Http.handleError')
Event.when('Http.start', 'Http.onStart')

Event.when('kraken.data', 'Kraken.process')

// User registration events
Event.when('user:registered', 'UserRegistered.process')
Event.when('user:sendResetPassword', 'UserRegistered.sendResetPassword')
Event.when('user:resendConfirmation', 'UserRegistered.resendConfirmation')

//Matching bid/ask
Event.when('matcher:ok', 'MatchListener.ok')
// Event.when('match:recheck', 'MatchedResult.recheck')
Event.when('matcher:failed', 'MatchListener.failed')

// Transfer status
// Event.when('transfer:ok', 'MatchListener.ok')
//
// // BTC Status
// Event.when('btc:ok', 'TradeListener.ok')
