'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body =
      'http://cnc.ccf.com.cn/informs/showinformindex_zs.php?itemid=&prodid=410000&type=dd'
  }
}

module.exports = HomeController
