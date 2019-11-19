# 河南工业大学图书馆预约微信小程序复刻版 v1.0.3

<div style="text-align:center">

![小程序码](./pic/ocr.jpg)
</div>

## 整体介绍

```txt
    本程序为图书馆预约系统小程序复刻版，其主要功能与WiseLibrary相同。本程序的优点主要有
```
* 界面简洁
* 操作逻辑优化
* 快速预约上一次的座位
* ~~清除违约~~


```txt
    图书馆接口采用token存于本地的形式，我们只需要调用接口获取图书馆的token，之后每次请求将token以 token:'xxx'的形式存于headers中即可
```

## 函数接口

```txt
    本程序主要的函数都在/common/region.js 文件中
```
|函数|解释|
|:-------------:|:-------------:|
|getRegion(time, token)|得到区域列表
|getSeat(time, position, token)|获取座位列表
|bookSeat(time, position, openid, seatid, token)|预定座位
|getBooking(openid, token)|获取预定信息
|leave(openid, bookingid, token)|离开
|leaveback(openid, bookingid, token)|返回
|cancel(openid, bookingid, token)|取消
|sign(openid, bookingid, token)|签到
|signoff(openid, bookingid, token)|签退
|getToken()|获取保存的token
|getTokenFromServer(openid, username, password)|重新获取token
|getUserAdmin(username,token)|获取用户列表
|disp()|取消绑定

## 官方API列表

```javascrpit
 domain_url: "https://wplib.haut.edu.cn/seatbook/",
    apiList: {
        login: "api/seatbook/bindinguser",
        queryOpenId: "api/seatbook/openid",
        getuserinfo: "api/seatbook/userinfo",
        unbinduser: "api/seatbook/unbindinguser",
        getregionList: "api/seatbook/region",
        getseatList: "api/seatbook/query",
        addbooking: "api/seatbook/addbooking",
        mybooking: "api/seatbook/mybooking",
        signin: "api/seatbook/signin",
        signoff: "api/seatbook/signoff",
        leave: "api/seatbook/leave",
        leaveBack: "api/seatbook/leaveBack",
        keepon: "api/seatbook/keepon",
        cancelbooking: "api/seatbook/cancel",
        randomseat: "api/seatbook/random",
        bookingrule: "api/seatbook/rule",
        bookinginfo: "api/seatbook/bookinginfo",
        bookingrules: "api/sbookadmin/rulelist",
        regionlist: "api/sbookadmin/regionlist",
        regionop: "api/sbookadmin/regionoc",
        userlist: "api/sbookadmin/userlist",
        clearall: "api/sbookadmin/clearall",
        clearone: "api/sbookadmin/clearone",
        bookinglist: "api/sbookadmin/bookinglist",
        editrule: "api/sbookadmin/uprule",
        cancelbooking_admin: "api/sbookadmin/cancel",
        beaconlist: "api/seatbook/beacon",
        breakbooking: "api/seatbook/disobey"
```

## request示例

```javascript
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
```

## 程序展示图

<div style="text-align:center">

![主页](./pic/pic1.jpg)

![详情页](./pic/pic2.jpg)

![预约页](./pic/pic3.jpg)
</div>


