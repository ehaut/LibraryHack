//app.js
const {
  getToken
} = require('./common/region.js')
App({
  onLaunch: function() {

    if (!wx.cloud) {
    } else {
      wx.cloud.init({
        env: 'yyyax-h7txn',
        traceUser: true,
      })

    }
    this.globalData = {
      token:''
    }
  }
})