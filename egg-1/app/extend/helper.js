// app/extend/helper.js
const cheerio = require('cheerio')
const sd = require('silly-datetime')
const oracledb = require('oracledb')
oracledb.autoCommit = true
module.exports = {
  async connectOracle() {
    const config = {
      // user: 'system',
      // password: 'Aini123456',
      // connectString: 'localhost:1521/orcl',
      user: 'SAPFR_READ', // 用户名
      password: 'SAPFR_READ', // 密码
      connectString: '192.168.0.130:1521/orcl',
    }
    return await oracledb.getConnection(config)
  },
  async getDomData(url, cookieArr) {
    const { ctx } = this
    const result = await ctx.curl(url, {
      dataType: 'text',
      headers: {
        Cookie: cookieArr.join('; '),
      },
    })
    const $ = cheerio.load(result.data)
    const jsonArr = []
    $('tbody')
      .eq(0)
      .children('tr.px14')
      .each(function () {
        const arr = []
        $(this)
          .children('td')
          .each(function () {
            arr.push($(this).text())
          })
        // const d = {
        //   NAME1: arr[0].trim(),
        //   DATATIME: arr[1],
        //   DDMEAN: arr[2],
        //   YESTODAY: arr[3],
        //   RAISE: arr[4],
        //   CREATEDATE: sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        // }
        /*
         * 1. 不许使用双引号
         * 2. 汉字、/、空格等必须使用单引号包裹
         */
        arr[0] = arr[0].trim()
        arr.push(sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'))

        for (let i = 0; i < arr.length; i++) {
          arr[i] = `'${arr[i]}'`
        }
        jsonArr.push(arr)
      })
    return jsonArr
  },
}
