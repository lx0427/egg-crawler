'use strict'
const cheerio = require('cheerio')
const sd = require('silly-datetime')
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const { goodSort } = ctx.request.query
    const param = {
      keyword: '手机',
      suggest: '1.def.0.V02--38s0',
      wq: '手机',
      ev: 'exprice_2600-6000^',
      page: 1,
      s: 1,
      click: 0,
    }
    const res = await ctx.curl(
      'https://search.jd.com/search?keyword=%E6%89%8B%E6%9C%BA&suggest=1.def.0.V02--38s0&wq=%E6%89%8B%E6%9C%BA&ev=exprice_2600-6000%5E&page=1&s=1&click=0',
      {
        method: 'GET',
        dataType: 'text',
        data: param,
      }
    )
    const $ = cheerio.load(res.data)
    const jsonArr = []
    $('.gl-item').each(function () {
      const url = $(this).find('.p-img a').attr('href') // url
      const price = $(this).find('.p-price i').text() // 价格
      const name = $(this).find('.p-name em').text() // 名称
      const no = String($(this).find('.p-name i').attr('id')).replace(
        'J_AD_',
        ''
      ) // 编号
      // $(this).text() // 价格
      jsonArr.push({
        url,
        price,
        name,
        no,
      })
    })
    {
      // console.log(jsonArr[goodSort].url)
      const res = await ctx.curl('https:' + jsonArr[goodSort].url, {
        method: 'GET',
        dataType: 'text',
        data: param,
      })
      const $ = cheerio.load(res.data)
      const infoArr = []
      $('.detail .tab-con')
        .eq(0)
        .children('div')
        .eq(1)
        .children()
        .each(function () {
          const item0 = $(this).find('.Ptable-item').eq(0).find('dd')
          const name = item0.eq(2).text()
          const year = item0.eq(3).text()
          const day = item0.eq(4).text()
          const month = item0.eq(5).text()
          const item1 = $(this).find('.Ptable-item').eq(1).find('dd')
          const length = item1.eq(0).text()
          const weight = item1.eq(1).text()
          const craft = item1.eq(2).text()
          const width = item1.eq(3).text()
          const thickness = item1.eq(5).text()
          const item2 = $(this).find('.Ptable-item').eq(2).find('dd')
          const cpu = item2.text()
          // const item2 = $(this).find('.Ptable-item').eq(2).html()
          // const reg1 = /<dd[^>]*>(.|\n)*<\/dd>/gi
          // const cpu = item2 && reg1.exec(item2)
          const item3 = $(this).find('.Ptable-item').eq(3).find('dd')
          const item3Len = item3.length
          const ppi = item3.eq(1).text()
          const screenMaterial = item3.eq(2).text()
          const refreshRate = item3.eq(3).text()
          const screenSize = item3.eq(item3Len - 1).text()
          // const item4 = $(this).find('.Ptable-item').eq(3).find('dd')
          infoArr.push({
            name,
            year,
            day,
            month,
            length,
            weight,
            craft,
            width,
            thickness,
            cpu,
            ppi,
            screenMaterial,
            refreshRate,
            screenSize,
          })
        })
      ctx.body = infoArr
    }
  }
}

module.exports = HomeController
