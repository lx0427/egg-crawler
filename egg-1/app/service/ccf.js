'use strict'

const Service = require('egg').Service

class CcfService extends Service {
  /**
   * 向oracle中插入数据
   * @param {*} jsonArr | ,连接的数据
   */
  async insert(jsonArr) {
    const { ctx } = this
    const connection = await ctx.helper.connectOracle()
    for (let i = 0; i < jsonArr.length; i++) {
      const str = `insert into scrapy_data_ccf_price(NAME1,DATATIME,DDMEAN,YESTODAY,RAISE,CREATEDATE) values (
        ${jsonArr[i].join(',')})`
      await connection.execute(str)

      /* test_ptameg 测试表 */
      // const str = `insert into test_ptameg(NAME1,DATATIME,DDMEAN,YESTODAY,RAISE,CREATEDATE) values (
      //   ${jsonArr[i].join(',')})`
      // const res = await connection.execute(str)
      // ctx.logger.info(res)
    }
    await connection.close()
  }

  /**
   * 登录
   * @param {*} time 执行次数
   */
  async login(time = 0) {
    const { ctx } = this
    try {
      if (time >= 3) {
        ctx.logger.error('连续3次登录错误')
        return false
      }
      const param = {
        custlogin: 1,
        url: '',
        lng: 120.26948,
        lat: 30.20784,
        s: '',
        action: 'login',
        username: 'zjhyjt',
        password: 31121500,
        'imageField.x': 34,
        'imageField.y': 13,
      }
      const res = await ctx.curl('http://cnc.ccf.com.cn/member/member.php', {
        method: 'POST',
        dataType: 'text',
        data: param,
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'Content-Length': 155,
        // },
        timeout: 60 * 1000 * 5,
      })
      ctx.logger.info('登录成功！')
      return res
    } catch (err) {
      // 记录错误
      ctx.logger.error(err)
      // 重新执行登录
      return this.login(++time)
    }
  }
}

module.exports = CcfService
