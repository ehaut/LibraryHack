// miniprogram/pages/login/index.js
const {
  getTokenFromServer,
  getToken
} = require('../../common/region.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    tip: '',
    success: '',
    error: '',
    person: {},
    id: '',
    isLogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: 'https://lovelywhite.cn/tip',
      success(res) {
        page.setData({
          tip: res.data
        })
      }
    })
    wx.showLoading({
      title: '检查云端token',
      mask:true
    })
    getToken().then(res => {
      console.log(res.token, res.id)
      app.globalData.token = res.token
      page.getUser(res.id).then(res1 => {
        page.data.person = res1.person
        page.data.id = res.id
        wx.navigateTo({
          url: '/pages/detail/index',
          success(res2) {
            wx.hideLoading()
          }
        })

      }).catch(res1 => {
        console.log(res1)
        wx.hideLoading()
        const db = wx.cloud.database()
        try {
          db.collection('data').doc(res.id).remove()
          page.setData(
            {
              isLogin:false
            }
          )
        } catch (e) {
          console.log(e)
        }
        page.setData({
          error: res1.res.data.msg ? res1.res.data.msg : "错误"
        })
      })
    }).catch(res => {

      wx.hideLoading()
      console.log(res)
      page.setData({
        error: "请登录",
        isLogin: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let page = this
    wx.showLoading({
      title: '检查云端token',
      mask:true
    })
    getToken().then(res => {
      console.log(res.token, res.id)
      app.globalData.token = res.token
      page.getUser(res.id).then(res1 => {
        page.data.person = res1.person
        page.data.id = res.id
        wx.navigateTo({
          url: '/pages/detail/index',
          success(res2) {
            wx.hideLoading()
            wx.stopPullDownRefresh()
          }
        })
      }).catch(res1 => {
        console.log(res1)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        const db = wx.cloud.database()
        try {
          db.collection('data').doc(res.id).remove()
          page.setData(
            {
              isLogin: false
            }
          )
        } catch (e) {
          console.log(e)
        }
        page.setData({
          error: res1.res.data.msg ? res1.res.data.msg : "错误"
        })
      })
    }).catch(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log(res)
      page.setData({
        error: "请登录",
        isLogin: false
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindAccountChange(e) {
    this.setData({
      id: e.detail.value
    })
  },
  bindPasswordChange(e) {
    this.setData({
      password: e.detail.value
    })
  },
  login(e) {
    let page = this
    if (this.data.id == '' || this.data.password == '') {
      this.setData({
        error: '请输入账号密码'
      })
    } else {
      wx.showLoading({
        title: '登陆中',
        mask: true
      })
      wx.cloud.callFunction({
        name: 'login',
        success(res) {
          console.log(res)
          getTokenFromServer(res.result.openid, page.data.id, page.data.password).then(res1 => {
            console.log(res1)
            if (0 == res1.code) {
              let db = wx.cloud.database();
              db.collection("data").add({
                data: {
                  _id: page.data.id,
                  token: res1.token,
                },
                success(res2) {
                  console.log(res2)
                  app.globalData.token = res1.token
                  page.getUser(page.data.id).then(res3 => {
                    page.data.person = res3.person,
                      page.data.id = res2._id
                    page.setData({
                      isLogin: true
                    })
                    wx.navigateTo({
                      url: '/pages/detail/index',
                    })
                    wx.hideLoading()
                  }).catch(res3 => {

                    wx.hideLoading()
                    console.log(res3)
                  })
                },
                fail(res2) {
                  console.log(res2)
                }
              })
            }
            else {
              page.setData({
                error: res1.res.data.msg
              })
              wx.hideLoading()
            }
          }).catch(res1 => {
            wx.hideLoading()
            console.log(res1)
          })
        }
      })
    }

  },
  getUser(username) {
    return new Promise((resl, rej) => {
      wx.request({
        url: 'https://wplib.haut.edu.cn/seatbook/api/sbookadmin/userlist',
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          token: app.globalData.token
        },
        data: {
          page: 1,
          limit: 1,
          bookingstatus: '',
          userstr: username
        },
        success(res) {
          console.log(res)
          if (res.data.userlist)
            resl({
              code: 0,
              person: res.data.userlist[0]
            })
          else {
            rej({
              code: -1,
              res: res
            })
          }
        },
        fail(res) {
          rej({
            code: -2,
            res: res
          })
        },
        complete() {}
      })
    })
  },
  onShow()
  {
    this.setData(
      {
        isLogin:this.data.isLogin
      }
    )
  }
})