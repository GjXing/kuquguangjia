function e() {
    wx.getSetting({
        success: function(e) {
            e.authSetting["scope.userInfo"] ? (console.log("开始获取用户信息"), wx.getUserInfo({
                withCredentials: !0,
                success: t.success,
                fail: t.fail
            })) : (console.log("未授权获取用户信息"), t.fail());
        },
        fail: function() {
            console.log("获取授权失败"), t.fail();
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.wxAccount = void 0;

var o = require("UIEvent"), n = (require("./loginLoading"), 0), c = {
    userInfo: {},
    code: "",
    loginToWxSucceededEvent: new o.UIEvent(),
    loginToWxFailedEvent: new o.UIEvent(),
    autoLoginToWxSucceededEvent: new o.UIEvent(),
    autoLoginToWxFailedEvent: new o.UIEvent(),
    getUserInfoSucceededEvent: new o.UIEvent(),
    getUserInfoFailedEvent: new o.UIEvent(),
    checkSessionSucceededEvent: new o.UIEvent(),
    checkSessionFailedEvent: new o.UIEvent(),
    authorizeEvent: new o.UIEvent(),
    login: function() {
        console.log("start to login to weixin..."), this._login();
    },
    _login: function() {
        wx.login({
            success: i.success,
            fail: i.fail
        });
    },
    autoLogin: function() {
        console.log("start to auto relogin to weixin..."), wx.login({
            success: s.success,
            fail: s.fail
        });
    },
    checkSession: function() {
        console.log("start to check weixin session..."), wx.checkSession({
            success: l.success,
            fail: l.fail
        });
    }
}, i = {
    success: function(o) {
        console.log("login to weixin successfully.", o), c.code = o.code, c.loginToWxSucceededEvent.Emit(o.code), 
        console.log("=========================================", o.code), n = 0, e(), console.log(o.code);
    },
    fail: function() {
        console.log("failed to login to weixin."), n++ < 3 ? c._login() : c.loginToWxFailedEvent.Emit();
    }
}, s = {
    success: function(e) {
        console.log("auto relogin to weixin successfully.", e.code), c.autoLoginToWxSucceededEvent.Emit(e.code);
    },
    fail: function() {
        console.log("failed to auto relogin to weixin."), c.autoLoginToWxFailedEvent.Emit();
    }
}, t = {
    success: function(e) {
        console.log("get user info from weixin successfully."), c.userInfo = e, c.getUserInfoSucceededEvent.Emit(c.userInfo);
    },
    fail: function() {
        c.getUserInfoFailedEvent.Emit();
    }
}, l = {
    success: function() {
        console.log("check weixin session successfully."), c.checkSessionSucceededEvent.Emit();
    },
    fail: function() {
        console.log("failed to check weixin session."), c.checkSessionFailedEvent.Emit();
    }
};

exports.wxAccount = c;