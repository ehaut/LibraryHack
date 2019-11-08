const {
  getBooking
} = require('../../common/region.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookings: [],
    date: "",
    error: '',
    success: '',
    next: true, //代表是否能进入下一步
    scroll_height: 0,
    person: {},
    booking: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    let pages = getCurrentPages()
    this.data.person = pages[pages.length - 2].data.person;
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (160) - 30
    })

    this.getBook()
  },
  getBook() {
    let page = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    getBooking(this.data.person.openId,app.globalData.token).then(res => {
      console.log(res)
      page.setData({
        bookings: res.res.data.page.list
      })
    }).catch(res => {
      console.log(res)
      page.setData({
        error: '错误'
      })
    }).finally(res => {
      wx.hideLoading()
    })
  },
  redirect(e) {
    let booking = e.currentTarget.dataset.booking
    this.setData(
      {
        booking: booking
      }
    )
    wx.navigateTo({
      url: '/pages/book-detail/index',
    })
  }
})