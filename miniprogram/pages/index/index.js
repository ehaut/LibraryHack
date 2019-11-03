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
    canTip: true,
    tips: [
      "撒花 ｡:.ﾟヽ(｡◕‿◕｡)ﾉﾟ.:｡+ﾟ",
      "手拉手╭(′▽`)╭(′▽`) ╯",
      "好困呀（揉眼睛(‘-ωก̀)",
      "已阅留爪(ฅ´ω`ฅ)",
      "勾手指可萌啦 ( ｡ớ ₃ờ)ھ"
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
    wx.navigateTo({
      url: '/pages/detail/index',
    })
    // this.setData(
    //   {
    //     showEdit:true
    //   }
    // )
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
        error: '请输入学号'
      })
    }
  },
  showTip() {
    if (this.data.canTip)
      {
        this.data.canTip=false
      this.setData(
        {
          success: this.data.tips[Math.floor(Math.random() * 10) % 5]
        }
      )
      }
  },
  hide()
  {
    this.setData(
      {
        canTip: true
      }
    )
  }
})