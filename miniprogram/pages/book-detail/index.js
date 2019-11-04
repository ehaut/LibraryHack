// miniprogram/pages/detail/index.js
let { leave, leaveback, cancel, sign, signoff, keepon } = require('../../common/region.js')
Page({

  data: {
    booking: {},
    person: {},
    error: '',
    success: ''
  },
  onLoad(e) {
    let pages = getCurrentPages()
    this.setData(
      {
        booking: pages[pages.length - 2].data.booking,
        person: pages[pages.length - 2].data.person
      }
    )
    console.log(this.data.booking)
    console.log(this.data.person)
  },
  sign() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将签到,确定？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          sign(page.data.person.openId, page.data.booking.id).then(
            res => {
              page.setData(
                {
                  success:'签到成功'
                }
              )
            }
          ).catch(res => {
            page.setData(
              {
                error:res.res &&res.res.data.msg? res.res.data.msg:'错误'
              }
            )
          }).finally(res => {
            
            wx.hideLoading()
          })
        }
      }
    })
  },
  signoff() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将签退,确定？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          signoff(page.data.person.openId, page.data.booking.id).then(
            res => {
              page.setData(
                {
                  success:'签退成功'
                }
              )
            }
          ).catch(res => {
            page.setData(
              {
                error:res.res &&res.res.data.msg? res.res.data.msg:'错误'
              }
            )

          }).finally(res => {
            
            wx.hideLoading()
          })
        }
      }
    })
  },
  leave() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将临时离开,确定？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          leave(page.data.person.openId, page.data.booking.id).then(
            res => {
              page.setData(
                {
                  success:'离开成功'
                }
              )
            }
          ).catch(res => {
            page.setData(
              {
                error:res.res &&res.res.data.msg? res.res.data.msg:'错误'
              }
            )
          }).finally(res => {
            
            wx.hideLoading()
          })
        }
      }
    })
  },
  leaveback() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将返回,确定？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          leaveback(page.data.person.openId, page.data.booking.id).then(
            res => {
              page.setData(
                {
                  success:'返回成功'
                }
              )
            }
          ).catch(res => {
            page.setData(
              {
                error:res.res &&res.res.data.msg? res.res.data.msg:'错误'
              }
            )
          }).finally(res => {
            
            wx.hideLoading()
          })
        }
      }
    })
  },
  cancel() {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将取消预约,确定？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          cancel(page.data.person.openId, page.data.booking.id).then(
            res => {
              page.setData(
                {
                  success:'取消成功'
                }
              )
            }
          ).catch(res => {
            page.setData(
              {
                error:res.res &&res.res.data.msg? res.res.data.msg:'错误'
              }
            )
          }).finally(res => {
            
            wx.hideLoading()
          })
        }
      }
    })
  },
})