const cheerio = require('cheerio')
const sd = require('silly-datetime')

module.exports = {
  schedule: {
    immediate: false,
    cron: '* * * * * *',
    interval: '1h',
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // const param = {
    //   keyword: '手机',
    //   suggest: '1.def.0.V02--38s0',
    //   wq: '手机',
    //   ev: 'exprice_2600-6000^',
    //   page: 1,
    //   s: 1,
    //   click: 0,
    // }
    // const res = await ctx.curl(
    //   'https://search.jd.com/search?keyword=%E6%89%8B%E6%9C%BA&suggest=1.def.0.V02--38s0&wq=%E6%89%8B%E6%9C%BA&ev=exprice_2600-6000%5E&page=1&s=1&click=0',
    //   {
    //     method: 'GET',
    //     dataType: 'text',
    //     data: param,
    //   }
    // )
    // console.log(res)
    // let cookieArr = res.headers['set-cookie']
    // cookieArr = cookieArr.map((v) => v.split(';')[0])
    // const result = await ctx.curl(
    //   'http://cnc.ccf.com.cn/informs/showinformindex_zs.php?itemid=&prodid=410000&type=dd',
    //   {
    //     dataType: 'text',
    //     headers: {
    //       Cookie: cookieArr.join('; '),
    //     },
    //   }
    // )
    // const $ = cheerio.load(result.data)
    // const jsonArr = []
    // $('tr.px14').each(function () {
    //   const arr = []
    //   $(this)
    //     .children('td')
    //     .each(function () {
    //       arr.push($(this).text())
    //     })
    //   jsonArr.push({
    //     NAME1: arr[0].trim(),
    //     DATATIME: arr[1],
    //     DDMEAN: arr[2],
    //     YESTODAY: arr[3],
    //     RAISE: arr[4],
    //     CREATEDATE: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    //   })
    // })
    // for (let i = 0; i < jsonArr.length; i++) {
    //   await ctx.service.ccf.insert(jsonArr[i])
    // }
    // console.log(jsonArr, '==========')
  },
}
