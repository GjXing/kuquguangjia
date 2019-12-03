!function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    e.default = t;
}(require("../../modules/LocalData")), Page({
    data: {
        openid: "",
        one: 2,
        two: 6,
        one_point: "500x2",
        two_point: "1800x2"
    },
    onLoad: function(t) {
        "1" == wx.getStorageSync("pay_finish") && this.setData({
            one: 6,
            two: 8,
            one_point: "1800x2",
            two_point: "2500x2"
        });
    },
    clickItem: function(t) {
        var e = 0;
        if ("" == wx.getStorageSync("payLastTime") || (e = Number(wx.getStorageSync("payLastTime"))), 
        parseInt(new Date().getTime() / 1e3) > e + 2) {
            var n = t.currentTarget.dataset.item;
            this.pay(n);
        } else wx.showModal({
            title: "提示",
            content: "赞赏太过频繁哦，请稍后再试",
            cancelText: "",
            success: function(t) {}
        });
    },
    RandomNum: function(t) {
        for (var e = "", n = 0; n < t; n++) e += Math.floor(10 * Math.random());
        return e;
    },
    pay: function(t) {}
});