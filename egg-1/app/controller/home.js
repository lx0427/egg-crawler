'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this

    const res = await ctx.service.ccf.login()
    let cookieArr = res.headers['set-cookie']
    cookieArr = cookieArr.map((v) => v.split(';')[0])
    const jsonArr = await ctx.helper.getDomData(
      'http://cnc.ccf.com.cn/informs/showinformindex_zs.php?itemid=&prodid=410000&type=dd',
      cookieArr
    )
    console.log(jsonArr, '========')

    for (let i = 0; i < jsonArr.length; i++) {
      await ctx.service.ccf.insert(jsonArr[i].join(','))
    }
    ctx.body = 'success'
  }
}

module.exports = HomeController
