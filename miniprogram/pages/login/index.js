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
    openid:'',
    isLogin: true,
    isToken: true,
    slideButtons: [{
      type: 'warn',
      text: 'Token'
    },{
      text: '密码'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.show()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.show()
  },
  show() {
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
      mask: true
    })
    getToken().then(res => {
      console.log(res.token, res.id, res.openid)
      app.globalData.token = res.token
      page.getUser(res.openid).then(res1 => {
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
          console.log(res.id)
          db.collection('data').doc(res.id).remove().then(
            res2 => {
              console.log(res2)
              page.setData({
                isLogin: false
              })
            }
          ).catch(res2 => {
            console.log(res2)
          })

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
  bindOpenIdChange(e)
  {
    this.setData({
      openid: e.detail.value
    })
  },
  slideButtonTap(e) {
    this.data.password = ""
    this.data.openid = ""
    if (e.detail.index===0)
    {
      this.setData(
        {
          isToken: true
        }
      )
    }
    else
    {
      this.setData(
        {
          isToken: false
        }
      )
    }
  },
  login(e) {
    let page = this
    //password <- token and password
    console.log(this.data.id, this.data.openid, this.data.password)
    if (this.data.password == '') {
      this.setData({
        error: '请输入完整'
      })
    } else {
      //Token登录
      if(page.data.isToken)
      {
        if (this.data.openid =='')
        {
          this.setData({
            error: '请输入完整'
          })
        }
        else
        {
          wx.showLoading({
            title: '登陆中',
            mask: true
          })
          //全局token需要提前配置，否则二getUser无法使用
          app.globalData.token = page.data.password
          page.getUser(page.data.openid).then(res => {
            page.data.person = res.person;
        
            let db = wx.cloud.database();
            db.collection("data").add({
              data: {
                _id: page.data.person.username,
                token: page.data.password,
                openid: page.data.openid,
              },
              success(res1) {
                console.log(res1)
                page.setData({
                  isLogin: true
                })
                wx.navigateTo({
                  url: '/pages/detail/index',
                })
                wx.hideLoading()
              },
              fail(res1) {
                wx.hideLoading()
                console.log(res1)
              }
            })
            
          }).catch(res => {
            wx.hideLoading()
            console.log(res)
            page.setData({
              error: res.res.data.msg ? res.res.data.msg : "错误"
            })
          })
     
        }
      }
      //账号密码登录
      else
      {
        if (this.data.id == ''){
          this.setData({
            error: '请输入完整'
          })
        }
        else
        {
          wx.showLoading({
            title: '登陆中',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'login',
            success(res) {
              console.log(res)
              //自己提供openid 学号 密码 换取token
              getTokenFromServer(res.result.openid, page.data.id, page.data.password).then(res1 => {
                console.log(res1)
                if (0 == res1.code) {
                  let db = wx.cloud.database();
                  db.collection("data").add({
                    data: {
                      _id: page.data.id,
                      token: res1.token,
                      openid: res.result.openid
                    },
                    success(res2) {
                      console.log(res2)
                      app.globalData.token = res1.token
                      page.getUser(res.result.openid).then(res3 => {
                        page.data.person = res3.person
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
                } else {
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
 
      }
    }

  },
  getUser(openid) {
    return new Promise((resl, rej) => {
      wx.request({
        url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/userinfo',
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          token: app.globalData.token
        },
        data: {
          openid: openid
        },
        success(res) {
          console.log(res)
          if (res.data.user)
            resl({
              code: 0,
              person: {
                "userId": null,
                "username": res.data.user.cardno,
                "password": null,
                "salt": null,
                "email": null,
                "mobile": null,
                "status": null, //1
                "roleIdList": null,
                "createUserId": null,
                "createTime": null, //"2019-11-07 23:00:39",
                "breakDate": null,
                "deptId": null,
                "userno": res.data.user.cardno,
                "bookingUserCategoryId": null,
                "deptName": res.data.user.deptname,
                "openId": openid,
                "displayname": res.data.user.username,
                "cardno": null,
                "breakNumber": res.data.user.breaknumber
              }
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
        complete() { }
      })
    })
  },
  onShow() {
    this.setData({
      isLogin: this.data.isLogin
    })
  }
})