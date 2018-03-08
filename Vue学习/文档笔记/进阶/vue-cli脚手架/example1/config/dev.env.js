'use strict'
const merge = require('webpack-merge')//合并对象
const prodEnv = require('./prod.env')//导出的对象

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
