// miniprogram/pages/detail/index.js
const app = getApp()
Page({

  data: {
    person: {},
    error: '',
    success: ''
  },
  onLoad(e) {
    let pages = getCurrentPages()
    this.setData(
      {
        person:pages[pages.length - 2].data.person
      }
    )
    if (this.data.person.username == '201612010124') {
      this.setData({
        success: '欢迎小喵酱使用软件！！！'
      })
    }
    console.log(this.data.person)
  },
  redirect(e) {
    let fromwhere = e.currentTarget.dataset.fromwhere
    if (this.data.person.openId != null) {
      if (fromwhere == 'bookseat') {
        wx.navigateTo({
          url: '/pages/book-seat/index',
        })

      }
      else if(fromwhere == 'bookrecord')
      {
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
            success(res) {
              page.data.person.breakNumber= 0
              page.setData({
                success: '清空违约成功',
                person: page.data.person
              })
            },
            fail(res) {
              page.setData({
                error: '清空违约失败'
              })
            },
            complete(res) {
              wx.hideLoading()
            }
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
                if(res.statusCode===200)
                {
                  page.data.person.openId = null
                  page.setData({
                    success: '取消绑定成功',
                    person: page.data.person
                  })
                }
                else
                {
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
  }
})