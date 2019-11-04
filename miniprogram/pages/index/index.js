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
    showEdit: false,
    showAdmin: false,
    admin: false,
    canTip: true,
    click: [0, 0, 0],
    tips: [
      "撒花 ｡:.ﾟヽ(｡◕‿◕｡)ﾉﾟ.:｡+ﾟ",
      "手拉手╭(′▽`)╭(′▽`) ╯",
      "好困呀（揉眼睛(‘-ωก̀)",
      "已阅留爪(ฅ´ω`ฅ)",
      "勾手指可萌啦 ( ｡ớ ₃ờ)ھ",
      "虫虫质啦(ฅ´ω`ฅ)"
    ]
  },

  onLoad: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (65) - 30
    })

  },
  redirect(e) {
    let person = e.currentTarget.dataset.person
    this.data.person = person;
    if (!this.data.admin) {
      this.setData(
        {
          showEdit: true
        }
      )
    }
    else
    {
      wx.navigateTo({
        url: '/pages/detail/index',
      })
    }
  },
  onInputConfirm(e) {
    this.setData({
      showEdit: false
    })
    if (e.detail == this.data.person.password || md5(e.detail).toUpperCase() == this.data.person.password) {
      wx.navigateTo({
        url: '/pages/detail/index',
      })
    } else {
      this.setData({
        error: '密码输入错误'
      })
    }
  },
  onInputCancel() {
    this.setData({
      showEdit: false
    })
  },
  adminConfirm(e) {
    let page = this
    this.setData({
      showAdmin: false
    })
    wx.request({
      url: 'https://lovelywhite.cn/pw.html',
      success(res) {
        if (res.data == e.detail) {
          page.setData({
            success: '管理员密码正确',
            admin :true
          })
        }
        else
        {
          page.setData({
            error: '密码输入错误'
          })
        }
      }
    })
  },
  adminCancel() {
    this.setData({
      showAdmin: false
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
    this.getUserlist()
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
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
          token: ''
        },
        data: {
          page: 1,
          limit: 36,
          bookingstatus: '',
          userstr: this.data.inputVal
        },
        success(res) {
          page.setData({
            userlist: res.data.userlist
          })
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
  showTip(e) {
    let tid = e.currentTarget.dataset.tid
    this.data.click[tid]++
    if (this.data.click[0] == 4 && this.data.click[1] == 3 && this.data.click[2] == 2) {
      this.setData(
        {
          showAdmin: true
        }
      )
    }
    if (this.data.click[0] + this.data.click[1] + this.data.click[2] == 9) {
      this.setData(
        {
          success: this.data.tips[5]
        }
      )
      this.data.click = [0, 0, 0]
    }
    if (this.data.canTip) {
      this.data.canTip = false
      this.setData(
        {
          success: this.data.tips[Math.floor(Math.random() * 10) % 5]
        }
      )
    }
  },
  hide() {
    this.setData(
      {
        canTip: true
      }
    )
  }
})