const { configure, getLogger } = require('log4js')

const packageName = process.env.npm_package_name

configure({
  appenders: { [packageName]: { type: 'console' } },
  categories: {
    default: {
      appenders: [packageName],
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    }
  }
})

const logger = getLogger(packageName)

exports.logger = logger
