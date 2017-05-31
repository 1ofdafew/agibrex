'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const History = exports = module.exports = {}



History.checkLocation = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.location)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid location')
  }
  yield next
}

// ^   #start of the line
//  (    #  start of group #1
//    [01]?\\d\\d? #    Can be one or two digits. If three digits appear, it must start either 0 or 1
//     #    e.g ([0-9], [0-9][0-9],[0-1][0-9][0-9])
//     |   #    ...or
//    2[0-4]\\d  #    start with 2, follow by 0-4 and end with any digit (2[0-4][0-9])
//     |           #    ...or
//    25[0-5]      #    start with 2, follow by 5 and ends with 0-5 (25[0-5])
//  )    #  end of group #2
//   \.            #  follow by a dot "."
// ....            # repeat with 3 times (3x)
// $   #end of the line

History.checkIpAddress= function * (next) {
  const re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.exec(this.ip_address)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid ip address')
  }
  yield next
}

History.checkTrace = function * (next) {
  const re = /^\d+$/.exec(this.trace)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Trace Number')
  }
  yield next
}

History.checkActivities = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.activities)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid activities')
  }
  yield next
}