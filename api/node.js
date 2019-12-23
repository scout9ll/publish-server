const config = require('../../config/file.config.js')
const keys = Object.keys(config)
keys.splice(0, 1)
const names = [...keys]

console.log(keys.length)