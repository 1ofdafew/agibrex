'use strict'


/*
|--------------------------------------------------------------------------
| Http Server
|--------------------------------------------------------------------------
|
| Here we boot the HTTP Server by calling the exported method. A callback
| function is optionally passed which is executed, once the HTTP server
| is running.
|
*/

// disable logging to console
if (process.env.NODE_ENV == "production") {
  console.log = function() {}
}

require('events').EventEmitter.defaultMaxListeners = 0;
//emitter.setMaxListeners(100)
// or 0 to turn off the limit

const http = require('./bootstrap/http')
http(function () {
  use('Event').fire('Http.start')
})
