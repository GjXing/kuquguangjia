Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ShowOK = function(o, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "确定", t = arguments[3];
    wx.showModal({
        title: o,
        content: e,
        confirmText: n,
        showCancel: "false",
        cancelText: "",
        confirmColor: "#3cc51f",
        complete: function(o) {
            t && t();
        }
    });
}, exports.ShowCZJump = function() {
    wx.showModal({
        title: "金币不足",
        content: "所持金币不足，无法参加匹配\r\n是否前往充值？",
        showCancel: "true",
        cancelText: "否",
        confirmText: "是",
        confirmColor: "#3cc51f",
        success: function(o) {
            o.confirm ? getApp().globalData.wnds.Wnd_Shopping.Show(null, "Istz=" + !0) : o.cancel;
        }
    });
};