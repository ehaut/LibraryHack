//获取region

export function getRegion(time, token) {
  return new Promise((resl, rej) => {
    let date = new Date(new Date().getTime() + 1200000);
    let dateString = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/region',
      method: 'get',
      data: {
        starttime: time + dateString,
        endtime: time + ' 22: 00: 00',
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              list: res.data.regionList
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
//获取seat
export function getSeat(time, position, token) {
  return new Promise((resl, rej) => {
    let date = new Date(new Date().getTime() + 1200000);
    let dateString = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/query',
      data: {
        starttime: time + dateString,
        endtime: time + ' 22: 00: 00',
        layerid: position.layerid,
        regionid: position.regionid,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              list: res.data.seatList
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
//预定座位
export function bookSeat(time, position, openid, seatid, token) {
  return new Promise((resl, rej) => {
    let date = new Date(new Date().getTime() + 1200000);
    let dateString = " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/addbooking',
      data: {
        starttime: time + dateString,
        endtime: time + ' 22: 00: 00',
        layerid: position.layerid,
        regionid: position.regionid,
        openid: openid,
        seatid: seatid,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
export function getBooking(openid, token) {
  return new Promise((resl, rej) => {
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/mybooking',
      data: {
        openid: openid,
        page: 1,
        limit: 20,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
//离开
export function leave(openid, bookingid, token) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/leave',
      data: {
        openid: openid,
        bookingid: bookingid,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}

//返回
export function leaveback(openid, bookingid, token) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/leaveBack',
      method:'get',
      data: {
        openid: openid,
        bookingid: bookingid,
      },
      header: {
        "content-type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}

//强制取消预约
export function cancel(openid, bookingid, token) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/cancel',
      data: {
        openid: openid,
        bookingid: bookingid,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
//签到
export function sign(openid, bookingid, token) {
  return new Promise((resl, rej) => {

    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/signin',
      data: {
        openid: openid,
        bookingid: bookingid,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
//签退
export function signoff(openid, bookingid, token) {
  return new Promise((resl, rej) => {
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/signoff',
      data: {
        openid: openid,
        bookingid: bookingid,
      },
      header: {
        "Content-Type": "application/json",
        token: token
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            return resl({
              code: 0,
              res: res
            })
          } else
            return rej({
              code: -1,
              res: res
            })
        } else {
          return rej({
            code: -1,
            res: res
          })
        }
      },
      fail(res) {
        return rej({
          code: -1,
          res: res
        })
      }
    })
  })
}
//获取token
export function getToken() {
  return new Promise((resl, rej) => {
    const db = wx.cloud.database();
    db.collection("data").get({
      success(res) {
        if (res.data.length != 0) {
          resl({
            code: 0,
            id: res.data[0]._id,
            token: res.data[0].token,
            openid: res.data[0].openid
          })
        } else {
          rej({
            code: -1,
            token: res
          })
        }
      },
      fail(res) {
        rej({
          code: -1,
          res
        })
      }
    })
  })
}

export function getTokenFromServer(openid, username, password) {
  return new Promise((resl, rej) => {
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/seatbook/bindinguser',
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        token: ''
      },
      data: {
        openid: openid,
        username: username,
        password: password,
        only: parseInt(parseInt(new Date().getTime() / 1e3) / 60) * 176
      },
      success(res) {
        console.log(res)
        if (0 == res.data.code) {
          resl({
            code: 0,
            token: res.data.data.token
          })
        } else {
          resl({
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
      }
    })
  })
}

export function getUserAdmin(username,token) {
  return new Promise((resl, rej) => {
    wx.request({
      url: 'https://wplib.haut.edu.cn/seatbook/api/sbookadmin/userlist',
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        token: token
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
      complete() { }
    })
  })
}