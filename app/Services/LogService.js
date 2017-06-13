'use strict'

const winston = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')

class LogService {
  
  constructor () {
    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs')
    }

    this.log = new winston.Logger({
      level: 'info',
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({filename: 'logs/agibrex.log'})
      ]
    })
  }

  debug(msg) {
    this.log.debug(msg)
  }

  info(msg) {
    this.log.info(msg)
  }

  warn(msg) {
    this.log.warn(msg)
  }

  error(msg) {
    this.log.error(msg)
  }

}

module.exports = LogService

