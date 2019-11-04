//获取region
export function getRegion(time) {
  return new Promise((resl, rej) => {
    let date = new Date(new Date().getTime() + 1200000);
    let dateString = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/region',
      method: 'get',
      data:
      {
        starttime: time + dateString,
        endtime: time + ' 22: 00: 00'
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, list: res.data.regionList })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}
//获取seat
export function getSeat(time, position) {
  return new Promise((resl, rej) => {
    let date = new Date(new Date().getTime() + 1200000);
    let dateString = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/query',
      data:
      {
        starttime: time + dateString,
        endtime: time + ' 22: 00: 00',
        layerid: position.layerid,
        regionid: position.regionid
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, list: res.data.seatList })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}
//预定座位
export function bookSeat(time, position, openid, seatid) {
  return new Promise((resl, rej) => {
    let date = new Date(new Date().getTime() + 1200000);
    let dateString = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/addbooking',
      data:
      {
        starttime: time + dateString,
        endtime: time + ' 22: 00: 00',
        layerid: position.layerid,
        regionid: position.regionid,
        openid: openid,
        seatid: seatid
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}
export function getBooking(openid) {
  return new Promise((resl, rej) => {
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/mybooking',
      data:
      {
        openid: openid,
        page: 1,
        limit: 20
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}
//离开
export function leave(openid, bookingid) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/leave',
      data:
      {
        openid: openid,
        bookingid: bookingid
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}

//返回
export function leaveback(openid, bookingid) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/leaveBack',
      data:
      {
        openid: openid,
        bookingid: bookingid
      },     
      header: {//请求头
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}

//强制取消预约
export function cancel(openid, bookingid) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/cancel',
      data:
      {
        openid: openid,
        bookingid: bookingid
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}
//签到
export function sign(openid, bookingid) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/signin',
      data:
      {
        openid: openid,
        bookingid: bookingid
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}
//签退
export function signoff(openid, bookingid) {
  return new Promise((resl, rej) => {
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/signoff',
      data:
      {
        openid: openid,
        bookingid: bookingid
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({ code: 0, res: res })
          }
          else
            return rej({ code: -1, res: res })
        }
        else {
          return rej({ code: -1, res: res })
        }
      },
      fail(res) {
        return rej({ code: -1, res: res })
      }
    })
  })
}