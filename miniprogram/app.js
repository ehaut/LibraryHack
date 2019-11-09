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
      token: 'dbc08265-f6dc-4eb0-bf54-1092aafde7e4'
    }
  }
})