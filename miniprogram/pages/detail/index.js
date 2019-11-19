// miniprogram/pages/detail/index.js
import {
  getBooking,
  bookSeat,
  getUserAdmin
} from "../../common/region.js"
const app = getApp()
Page({

  data: {
    person: {},
    error: '',
    success: '',
    id: '',
    last: {}, //上一次预约
    layer: {
      '三': 3,
      '四': 4,
      '五': 5,
      '六': 6,
      '七': 7,
      '八': 8,
      '九': 9,
      '十': 10
    }
  },
  onLoad(e) {
    let page = this
    let pages = getCurrentPages()
    this.setData({
      person: pages[pages.length - 2].data.person,
      id: pages[pages.length - 2].data.id,
    })
    if (this.data.person.username == '201612010124') {
      this.setData({
        success: '欢迎小喵酱使用软件！！！'
      })
    }
    console.log(this.data.person)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //获取上一次的座位
    getBooking(this.data.person.openId, app.globalData.token).then(res => {
      console.log(res)
      page.setData({
        last: res.res.data.page.list && res.res.data.page.list.length != 0 ? res.res.data.page.list[0] : []
      })
      wx.hideLoading()
    }).catch(res => {
      console.log(res)
      wx.hideLoading()
    })
  },
  redirect(e) {
    let fromwhere = e.currentTarget.dataset.fromwhere
    if (this.data.person.openId != null) {
      if (fromwhere == 'bookseat') {
        wx.navigateTo({
          url: '/pages/book-seat/index',
        })

      } else if (fromwhere == 'bookrecord') {
        wx.navigateTo({
          url: '/pages/book-record/index',
        })
      }
    } else {
      this.setData({
        success: '未绑定微信号'
      })
    }
  },
  clear() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将清空学号：' + page.data.person.username + " 的违约次数，确定？",
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          getUserAdmin(page.data.person.username, app.globalData.token).then(res1 => {
            console.log(res1)
            page.data.person = res1.person
            if (page.data.person.userId) {
              wx.request({
                url: 'https://wplib.haut.edu.cn/seatbook/api/sbookadmin/clearone',
                method: 'get',
                data: {
                  userid: page.data.person.userId
                },
                header: {
                  "content-type": "application/json",
                  token: app.globalData.token,
                },
                success(res2) {
                  console.log(res2)
                  if (res2.statusCode == 200 && res2.data.code == 0) {
                    page.data.person.breakNumber = 0
                    page.setData({
                      success: '清空违约成功',
                      person: page.data.person
                    })
                  }
                  else {
                    page.setData({
                      error: res2.data.msg ? res2.data.msg : '清空违约失败'
                    })
                  }
                },
                fail(res2) {
                  page.setData({
                    error: '清空违约失败'
                  })
                },
                complete(res2) {
                  wx.hideLoading()
                }
              })
            }
            else {
              page.setData({
                error: 'userId获取失败'
              })
            }

          }).catch(res1 => {

          })

        }
      }
    })

  },
  disp() {
    let page = this
    if (page.data.person.openId && page.data.person.openId != '') {
      wx.showModal({
        title: '提示',
        content: '您即将取消学号：' + page.data.person.username + " 的绑定状态，确定？",
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '处理中',
              mask: true
            })
            wx.request({
              url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/unbindinguser',
              method: 'post',
              data: {
                openid: page.data.person.openId
              },
              header: {
                'content-type': "application/x-www-form-urlencoded",
                token: app.globalData.token,
              },
              success(res) {
                if (res.statusCode === 200) {
                  page.data.person.openId = null
                  let pages = getCurrentPages()
                  pages[pages.length - 2].data.isLogin = false
                  const db = wx.cloud.database()
                  db.collection('data').doc(page.data.id).remove().then(
                    e => {
                      page.setData({
                        success: '取消绑定成功',
                        person: page.data.person
                      })
                      setTimeout(() => {
                        wx.navigateBack({})
                      }, 600);
                    }
                  ).catch(e => {
                    page.setData({
                      success: '成功，数据库无记录',
                      person: page.data.person
                    })
                    setTimeout(() => {
                      wx.navigateBack({})
                    }, 600);
                    console.log(e)
                  })
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
          }
        }
      })
    } else {
      page.setData({
        error: '未绑定微信号'
      })
    }
  },
  book() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将预定,确定？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          let date = new Date();
          console.log(page.data.layer[page.data.last.regionName[0]])
          let position = {
            layerid: page.data.layer[page.data.last.regionName[0]],
            regionid: page.data.last.buildingLayerRegionId
          }
          bookSeat(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(), position, page.data.person.openId, page.data.last.seatId, app.globalData.token).then(res => {
            wx.hideLoading()
            if (res.code == 0) {
              page.setData({
                success: '预定成功'
              })
            } else {
              page.setData({
                error: res.res && res.res.data.msg ? res.res.data.msg : '错误'
              })
            }
          }).catch(res => {
            wx.hideLoading()
            page.setData({
              error: res.res && res.res.data.msg ? res.res.data.msg : "错误"
            })
          })
        }
      }
    })
  }
})