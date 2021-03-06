module.exports = {
  schedule: {
    immediate: false,
    // cron: '0 0,10,20,30 17 * * *',
    cron: '20 */10 16,17 * * *',
    // interval: '20s',
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    async function clawlerData(prodid, cookieArr) {
      const url = `http://cnc.ccf.com.cn/informs/showinformindex_zs.php?itemid=&prodid=${prodid}&type=dd`
      const jsonArr = await ctx.helper.getDomData(url, cookieArr)
      await ctx.service.ccf.insert(jsonArr)
    }
    try {
      const res = await ctx.service.ccf.login()
      let cookieArr = res.headers['set-cookie']
      cookieArr = cookieArr.map((v) => v.split(';')[0])

      await clawlerData('210000', cookieArr)
      await clawlerData('220000', cookieArr)
      await clawlerData('310000', cookieArr)
      await clawlerData('410000', cookieArr)
    } catch (err) {
      ctx.logger.error(err)
    }
  },
}
