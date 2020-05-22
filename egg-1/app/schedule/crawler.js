const cheerio = require('cheerio')
const sd = require('silly-datetime')

module.exports = {
  schedule: {
    immediate: false,
    // cron: '0 0,30 17,19 * * *',
    interval: '5m',
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
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
    let cookieArr = res.headers['set-cookie']
    cookieArr = cookieArr.map((v) => v.split(';')[0])
    const result = await ctx.curl(
      'http://cnc.ccf.com.cn/informs/showinformindex_zs.php?itemid=&prodid=410000&type=dd',
      {
        dataType: 'text',
        headers: {
          Cookie: cookieArr.join('; '),
        },
      }
    )
    const $ = cheerio.load(result.data)
    const jsonArr = []
    $('tr.px14').each(function () {
      const arr = []
      $(this)
        .children('td')
        .each(function () {
          arr.push($(this).text())
        })
      jsonArr.push({
        NAME1: arr[0].trim(),
        DATATIME: arr[1],
        DDMEAN: arr[2],
        YESTODAY: arr[3],
        RAISE: arr[4],
        CREATEDATE: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      })
    })
    for (let i = 0; i < jsonArr.length; i++) {
      await ctx.service.ccf.insert(jsonArr[i])
    }
    // console.log(jsonArr, '==========')
  },
}
