'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const param = {
      custlogin: 1,
      url: '',
      lng: 120.26948,
      lat: 30.20782,
      s: '',
      action: 'login',
      username: 'zjhyjt',
      password: 31121500,
      'imageField.x': 41,
      'imageField.y': 8,
    }

    const res = await ctx.curl('http://cnc.ccf.com.cn/member/member.php', {
      method: 'POST',
      dataType: 'text',
      data: param,
    })
    // console.log(res, '+++++++++++++++++++')
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
