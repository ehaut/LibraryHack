const {
  getBooking
} = require('../../common/region.js')
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
    booking:{},
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getBook()
  },
  getBook() {
    getBooking(this.data.person.openId).then(res => {
      this.setData({
        bookings: res.res.data.page.list
      })
    }).catch(res => {
      this.setData({
        error: '错误'
      })
    }).finally(res=>{
      wx.hideLoading()
    })
  },
  redirect(e)
  {
    let booking = e.currentTarget.dataset.booking
    this.setData(
      {
        booking:booking
      }
    )
    wx.navigateTo({
      url: '/pages/book-detail/index',
    })
  }
})