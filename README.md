# 河南工业大学图书馆预约微信小程序复刻版 v1.0.3

![小程序码](./pic/ocr.jpg)

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
 domain_url: "https://wplib.haut.edu.cn/seatbook/",//主域名
    apiList: {                                     //API列表
        login: "api/seatbook/bindinguser",         //绑定用户
        queryOpenId: "api/seatbook/openid",        //查询openid 未测试
        getuserinfo: "api/seatbook/userinfo",      //获取用户信息
        unbinduser: "api/seatbook/unbindinguser",  //取消绑定用户
        getregionList: "api/seatbook/region",      //获取区域列表
        getseatList: "api/seatbook/query",         //获取座位列表
        addbooking: "api/seatbook/addbooking",     //预定座位
        mybooking: "api/seatbook/mybooking",       //获取预约记录
        signin: "api/seatbook/signin",             //签到
        signoff: "api/seatbook/signoff",           //签退
        leave: "api/seatbook/leave",               //离开
        leaveBack: "api/seatbook/leaveBack",       //返回
        keepon: "api/seatbook/keepon",             //续约
        cancelbooking: "api/seatbook/cancel",      //取消
        randomseat: "api/seatbook/random",         //随机座位 未测试
        bookingrule: "api/seatbook/rule",          //tips
        bookinginfo: "api/seatbook/bookinginfo",   //预定详情
        bookingrules: "api/sbookadmin/rulelist",   //规则表
        regionlist: "api/sbookadmin/regionlist",   //区域表
        regionop: "api/sbookadmin/regionoc",       //区域操作 未测试
        userlist: "api/sbookadmin/userlist",       //用户表
        clearall: "api/sbookadmin/clearall",       //清空所有违约 未测试
        clearone: "api/sbookadmin/clearone",       //清空个人违约
        bookinglist: "api/sbookadmin/bookinglist", //获取所有预定记录
        editrule: "api/sbookadmin/uprule",         //更新预约记录 未测试
        cancelbooking_admin: "api/sbookadmin/cancel",//管理员强制取消预定 测试失败
        beaconlist: "api/seatbook/beacon",         //查找附近蓝牙
        breakbooking: "api/seatbook/disobey"       //无代码 未知
        }
```

## request示例

```txt
一般来说在请求服务成功后 res.data.code 的值为 0 ，失败为500 或其他 并且在res.data.msg 中有消息提示
```

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
        token: token  //token
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


