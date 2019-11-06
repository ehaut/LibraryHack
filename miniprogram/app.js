//app.js
const {
  getToken
} = require('./common/region.js')
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'yyyax-h7txn',
        traceUser: true,
      })

    }
    this.globalData = {
      token: ''
    }
    getToken().then(res => {
      this.globalData.token = res.token
      console.log(res.token)
    }).catch(res => {
      console.log(res)
    })
  }
})