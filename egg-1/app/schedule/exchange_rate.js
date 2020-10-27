module.exports = {
  schedule: {
    immediate: false,
    cron: '0 0 16 * * *',
    // interval: '10s',
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const data = await ctx.helper.getExchangeRateDomData()
    const res = await ctx.service.exchangeRate.insert(data)
    console.log(res, new Date())
  },
}
