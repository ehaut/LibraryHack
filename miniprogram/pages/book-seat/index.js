const { getRegion, getSeat, bookSeat } = require('../../common/region.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regions: [],
    position: {},
    seats: [],
    date: "",
    error: '',
    success: '',
    next: true,//代表是否能进入下一步
    scroll_height: 0,
    person: {}
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
      scroll_height: windowHeight * 750 / windowWidth - (110) - 30
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.getRegion()
  },
  redirect(e) {
    let page = this
    let region = e.currentTarget.dataset.region
    this.data.position = {
      layerid: region.buildingLayerId,
      regionid: region.id
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    getSeat(page.data.date, page.data.position, app.globalData.token).then(res => {
      wx.hideLoading()
      for (let e in res.list) {
        if (res.list[e].isCan == "1") {
          page.data.seats.push(res.list[e])
        }
      }
      page.setData(
        {
          next: false,
        }
      )
      page.setData(
        {
          seats: page.data.seats
        }
      )
    }).catch(res => {
      wx.hideLoading()
      page.setData(
        {
          error: '获取座位失败'
        }
      )
    })
  },
  book(e) {
    let page = this
    wx.showModal({
      title: '提示',
      content: '您即将预定,确定？',
      success(res) {
        if(res.confirm)
        {
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          let seat = e.currentTarget.dataset.seat
          bookSeat(page.data.date, page.data.position, page.data.person.openId, seat.id, app.globalData.token).then(res => {
            wx.hideLoading()
            if (res.code == 0) {
              page.setData(
                {
                  success: '预定成功'
                }
              )
            }
            else {
              page.setData(
                {
                  error: res.res && res.res.data.msg ? res.res.data.msg : '错误'
                }
              )
            }
          }).catch(res => {
            wx.hideLoading()
            page.setData(
              {
                error: res.res && res.res.data.msg ? res.res.data.msg : "错误"
              }
            )
          })
        }
      }
    })


  },
  getRegion() {
    let page = this
    this.setData(
      {
        region:[],
        seats:[],
        next: true
      }
    )
    if (!this.data.date == "") {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      getRegion(page.data.date, app.globalData.token).then(res => {
        wx.hideLoading()
        page.setData(
          {
            regions: res.list
          }
        )
      }).catch(res => {
        wx.hideLoading()
        page.setData({
          error: '错误'
        })
      })
    }
    else {
      page.setData({
        error: '请先选择时间'
      })
    }
  }
})