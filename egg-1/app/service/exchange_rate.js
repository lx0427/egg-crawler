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

  /**
   * 获取html
   * @param {*} time 执行次数
   */
  async getHtml(time = 0) {
    const { ctx } = this
    try {
      if (time >= 3) {
        ctx.logger.error('连续3次获取错误')
        return false
      }
      const param = {
        erectDate: '',
        nothing: '',
        pjname: '美元',
        head: 'head_620.js',
        bottom: 'bottom_591.js',
      }
      const res = await ctx.curl(
        'https://srh.bankofchina.com/search/whpj/search_cn.jsp',
        {
          method: 'POST',
          dataType: 'text',
          data: param,
        }
      )
      return res
    } catch (err) {
      ctx.logger.error(err)
      return this.getHtml(++time)
    }
  }
}

module.exports = ExchangeRateService
