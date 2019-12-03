function e(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (o[n] = e[n]);
    return o.default = e, o;
}

function o(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ServerLogin = void 0;

var n = function() {
    function e(e, o) {
        for (var n = 0; n < o.length; n++) {
            var i = o[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(o, n, i) {
        return n && e(o.prototype, n), i && e(o, i), o;
    };
}(), i = require("../dati_comm/libs/network/wxAccount"), t = require("./NSLoginSys"), a = (require("../dati_comm/libs/network/Conns"), 
require("./GConn")), r = (require("../dati_comm/libs/oosync/OOSyncClient"), e(require("../dati_comm/libs/core/AudioPool")), 
require("./Player")), l = require("../dati_comm/modules/FightRoom.js"), c = require("../dati_comm/libs/network/loginLoading"), u = require("../dati_comm/sdata/SDataID2"), s = require("../dati_comm/libs/network/NSServerList"), g = e(require("./LocalData")), f = null, d = !0, m = new (function() {
    function e() {
        o(this, e), t.NSLoginSys.OnLoginSuccess.On(this, this._onNSLoginSuccess), t.NSLoginSys.OnLoginFail.On(this, this._onNSLoginFail), 
        t.NSLoginSys.OnStep.On(this, this._onNSStep), i.wxAccount.getUserInfoSucceededEvent.On(this, function(e) {
            var o = {
                code: i.wxAccount.code,
                encryptedData: e.encryptedData,
                iv: e.iv,
                userInfo: JSON.parse(e.rawData)
            };
            g.Set(g.ParamName.NICK_NAME, o.userInfo.nickName), g.Set(g.ParamName.AVATOR_URL, o.userInfo.avatarUrl), 
            console.log("serverLogin.getUserInfoSucceededEventOn"), t.NSLoginSys.Begin(o);
        }), i.wxAccount.loginToWxFailedEvent.On(this, function() {
            console.log("loginToWxFailedEvent");
        }), i.wxAccount.getUserInfoFailedEvent.On(this, function() {
            console.log("getUserInfoFailedEvent");
        }), i.wxAccount.authorizeEvent.On(this, function() {
            console.log("authorizeEvent stop timer"), f && (clearTimeout(f), f = null);
        });
    }
    return n(e, [ {
        key: "GoHome",
        value: function() {
            return c.loginLoading.hide(), d = !0, getApp().globalData.wnds.Wnd_Home.Show(), 
            !0;
        }
    }, {
        key: "login",
        value: function() {
            this._reLogin();
        }
    }, {
        key: "_hide",
        value: function() {
            c.loginLoading.hide();
        }
    }, {
        key: "_showLoginBox",
        value: function() {
            var e = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "已和服务器失去联系！";
            this._hide(), wx.showModal({
                title: "消息",
                content: o,
                showCancel: "false",
                cancelText: "",
                confirmText: "重新登录",
                confirmColor: "#3cc51f",
                complete: function(o) {
                    e._reLogin();
                }
            });
        }
    }, {
        key: "ShowGoHomeBox",
        value: function() {
            var e = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "已和服务器失去联系！";
            this._hide(), wx.showModal({
                title: "消息",
                content: o,
                showCancel: "false",
                cancelText: "",
                confirmText: "返回主页",
                confirmColor: "#3cc51f",
                complete: function(o) {
                    e.GoHome();
                }
            });
        }
    }, {
        key: "_reLogin",
        value: function() {
            getApp().globalData.LoginOK = !1, d || c.loginLoading.show((0, u.txt)(1020), !0), 
            a.GameConn.Close(), s.ServerList.ReLoad(), i.wxAccount.login(), f && (clearTimeout(f), 
            f = null);
        }
    }, {
        key: "_onNSLoginSuccess",
        value: function(e) {
            a.GameConn.Route = 1e8 + e.logicSid, getApp().globalData.RsaPubkey = e.pubkey, console.log("_onNSLoginSuccess#1", getApp().globalData.RsaPubkey);
            var o = 0;
            o = setInterval(function() {
                console.log("_onNSLoginSuccess#3"), clearInterval(o), f && (clearTimeout(f), f = null), 
                c.loginLoading.hide(), g.BindData(r.Player.ImportDataFinish, function() {
                    getApp().globalData.LoginOK = !0, console.log("成功获取了用户信息"), l.FightRoom.LoginClear(), 
                    l.FightRoom.LoginFighting = e.fighting;
                });
            }, 100);
        }
    }, {
        key: "_onNSLoginFail",
        value: function(e) {
            console.log(e.msg);
        }
    }, {
        key: "_onNSStep",
        value: function(e) {
            console.log("step " + e);
        }
    } ]), e;
}())();

exports.ServerLogin = m;