module.exports = {
  schedule: {
    immediate: false,
    cron: '0 0,10,20,30 17,18 * * *',
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
    console.log(cookieArr)

    async function clawlerData(prodid) {
      const url = `http://cnc.ccf.com.cn/informs/showinformindex_zs.php?itemid=&prodid=${prodid}&type=dd`
      // console.log(url, '++++++++++++++++++')
      const jsonArr = await ctx.helper.getDomData(url, cookieArr)
      // console.log(jsonArr, 'xxxxxxxx')
      for (let i = 0; i < jsonArr.length; i++) {
        await ctx.service.ccf.insert(jsonArr[i].join(','))
      }
    }

    await clawlerData('210000')
    await clawlerData('220000')
    await clawlerData('410000')
  },
}
