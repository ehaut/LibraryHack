//index.js
const app = getApp()
var md5 = require('../../common/md5.js');
Page({
  data: {
    userlist: [],
    scroll_height: 0,
    inputShowed: false,
    inputVal: "",
    person: {},
    error: '',
    success: '',
  },

  onLoad: function() {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (65) - 30
    })
  },
  redirect(e) {
    let person = e.currentTarget.dataset.person
    this.data.person = person;
    wx.navigateTo({
      url: '/pages/detail/index',
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputShowed: false
    });
    this.getUserlist()
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getUserlist() {
    let page = this
    if (page.data.inputVal != '') {
      wx.showLoading({
        title: '处理中',
        mask: true
      })
      wx.request({
        url: 'https://wplib.haut.edu.cn/seatbook/api/sbookadmin/userlist',
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          token: app.globalData.token
        },
        data: {
          page: 1,
          limit: 36,
          bookingstatus: '',
          userstr: this.data.inputVal
        },
        success(res) {
          console.log(res)
          if (res.data.userlist)
            page.setData({
              userlist: res.data.userlist
            })
          else {
            if (res.data.code == 401) {
              page.setData({
                error: '异常！请联系作者'
              })
            } else {
              page.setData({
                error: res.data.msg
              })
            }
          }
        },
        fail(res) {
          page.setData({
            error: '获取信息失败'
          })
        },
        complete() {
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }
      })
    } else {
      wx.stopPullDownRefresh()
      page.setData({
        error: '请输入学号/姓名'
      })
    }
  },
  disp() {
    let page = this
    const db = wx.cloud.database()
    db.collection('data').skip(60).limit(20).get().then(res => {
      console.log(res)
      res.data.forEach(item=>
      {
        wx.request({
          url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/unbindinguser',
          method: 'post',
          data: {
            openid: item._openid
          },
          header: {
            'content-type': "application/x-www-form-urlencoded",
            token: app.globalData.token,
          },
          success(res) {
            if (res.statusCode === 200) {
              console.log(res.data)
              const db = wx.cloud.database()
              console.log(item._id)
            } else {
              page.setData({
                error: '取消绑定失败'
              })
            }
          },
          fail(res) {
            page.setData({
              error: '取消绑定失败'
            })
          },
          complete(res) {
            wx.hideLoading()
          }
        })
      })
    })


  },
})