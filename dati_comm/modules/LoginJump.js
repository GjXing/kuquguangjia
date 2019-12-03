function e() {
    o.ServerLogin.login();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AutoJump = void 0;

var o = require("../../modules/ServerLogin.js"), a = !1;

exports.AutoJump = function(t) {
    var g = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = getApp().globalData;
    return console.log("gDatagDatagDatagDatagDatagData", n), n.isFromShare ? (n.isFromShare = !1, 
    a = !0, getApp().globalData.IndexPageOptions = g, getApp().globalData.ServerLogin = o.ServerLogin, 
    e(), !0) : !(a && "index" !== t || (console.log("执行跳转 ", a, t), getApp().globalData.IndexPageOptions = g, 
    getApp().globalData.ServerLogin = o.ServerLogin, a ? (console.log("跳转首页..."), setTimeout(function() {
        getApp().globalData.wnds.Wnd_Home.Show();
    }, 50)) : (console.log("执行登录逻辑..."), a = !0, e()), 0));
};