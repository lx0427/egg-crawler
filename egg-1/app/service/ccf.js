'use strict'

const Service = require('egg').Service

class CcfService extends Service {
  async insert(data) {
    await this.app.mysql.insert('scrapy_price_ccf_ptamegpoly_dd', data)
  }
}

module.exports = CcfService
