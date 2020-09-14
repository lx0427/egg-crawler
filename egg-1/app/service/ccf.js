'use strict'

const Service = require('egg').Service

class CcfService extends Service {
  // mysgl
  // async insert(data) {
  //   await this.app.mysql.insert('scrapy_price_ccf_ptamegpoly_dd', data)
  // }
  /**
   * 向oracle中插入数据
   * @param {*} data | ,连接的数据
   */
  async insert(data) {
    const { ctx } = this
    const connection = await ctx.helper.connectOracle()
    const str = `insert into test_ptameg(NAME1,DATATIME,DDMEAN,YESTODAY,RAISE,CREATEDATE) values (${data})`
    // console.log(data, '==========')
    const result = await connection.execute(str)
    await connection.close()
    return result
  }
}

module.exports = CcfService
