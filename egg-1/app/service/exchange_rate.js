'use strict'

const Service = require('egg').Service

class ExchangeRateService extends Service {
  /**
   * 向oracle中插入数据
   * @param {*} data | ,连接的数据
   */
  async insert(data) {
    const { ctx } = this
    const connection = await ctx.helper.connectOracle()
    const str = `insert into scrapy_data_exchange_rate(CURRENCY,SPOT_BUYING,CASH_BUYING,SPOT_SELLING,CASH_SELLING,BANK_DISCOUNT_PRICE,RELEASE_TIME,CREATEDATE) values (
        ${data.join(',')})`
    const res = await connection.execute(str)
    await connection.close()
    return res
  }
}

module.exports = ExchangeRateService
