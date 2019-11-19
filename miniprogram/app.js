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
      token:'8f50b798-6cce-46c6-8352-d22d830f6ad8'
      // ''
    }
  }
})