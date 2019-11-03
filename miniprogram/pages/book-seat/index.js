const { getRegion, getSeat, bookSeat } = require('../../common/region.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regions: [],
    position:{},
    seats: [],
    date: "",
    error: '',
    success: '',
    next: true,//代表是否能进入下一步
    scroll_height: 0,
    person:{}
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
    let region = e.currentTarget.dataset.region
    this.data.position = {
      layerid: region.buildingLayerId,
      regionid: region.id
    }
    getSeat(this.data.date, this.data.position).then(res => {
      for (let e in res.list) {
        if (res.list[e].isCan == "1") {
          this.data.seats.push(res.list[e])
        }
      }
      this.setData(
        {
          next: false,
        }
      )
      this.setData(
        {
          seats: this.data.seats
        }
      )
    }).catch(res => {
      this.setData(
        {
          error: '获取座位失败'
        }
      )})
  },
  book(e)
  {
    let seat = e.currentTarget.dataset.seat
    bookSeat(this.data.date, this.data.position, this.data.person.openId,seat.id ).then(res=>
    {
      if(res.code==0)
      {
        this.setData(
          {
            success: '预定成功'
          }
        )
      }
      else
      {
        this.setData(
          {
            error: res.res && res.res.data.msg? res.res.data.msg:'错误'
          }
        )
      }
    }).catch(res=>
    {
      this.setData(
        {
          error: res.res &&res.res.data.msg ? res.res.data.msg:"错误"
        }
      )
    })
  },
  getRegion()
  {
    this.setData(
      {
        next: true
      }
    )
    if (!this.data.date == "") {
      getRegion(this.data.date).then(res => {
        this.setData(
          {
            regions: res.list
          }
        )
      }).catch(res => {
        this.setData({
          error: '错误'
        })
      }).finally()
      {
        wx.stopPullDownRefresh()
      }
    }
    else {
      wx.stopPullDownRefresh()
      this.setData({
        error: '请先选择时间'
      })

    }
  }
})