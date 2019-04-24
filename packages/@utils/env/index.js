const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const env = process.env
const filename = path.resolve(process.cwd(), `env/${process.env.NODE_ENV}.env`)
if (fs.existsSync(filename)) {
  const config = dotenv.parse(fs.readFileSync(filename))

  Object.keys(config).forEach(key => {
    if (env[key] !== undefined) {
      env[key] = config[key]
    }
  })
}

exports.env = env
