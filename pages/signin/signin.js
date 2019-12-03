var a = function(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}(require("../../modules/LocalData"));

Page({
    data: {
        ITEM_BG_NOR: "#FEBE00",
        ITEM_BG_SEL: "#676262",
        NUM_BG_NOR: "#E9AE00",
        NUM_BG_SEL: "#988d8d",
        FONT_COLOR_NOR: "#f6e75f",
        FONT_COLOR_SEL: "#9c9c9c",
        signinCount: 0,
        item_bg: [],
        num_bg: [],
        font_color: []
    },
    onLoad: function() {
        var t = parseInt(new Date().getTime() / 864e5), e = parseInt(a.GetNumber(a.ParamName.LAST_SIGNIN) / 864e5);
        console.log("lasTotalDays::" + e + "   curTotalDays::" + t);
        var N = [], _ = [], T = [];
        if (t - e == 1) for (this.data.signinCount = a.GetNumber(a.ParamName.TOTAL_SIGNIN_COUNT), 
        console.log("signinCount::" + e + "   curTotalDays::" + t), n = 0; n < 7; n++) n <= this.data.signinCount ? (N[n] = this.data.ITEM_BG_NOR, 
        _[n] = this.data.NUM_BG_NOR, T = this.data.FONT_COLOR_NOR) : (N[n] = this.data.ITEM_BG_SEL, 
        _[n] = this.data.NUM_BG_SEL, T = this.data.FONT_COLOR_SEL); else {
            a.Set(a.ParamName.TOTAL_SIGNIN_COUNT, 0);
            for (var n = 0; n < 7; n++) n <= 0 ? (N[n] = this.data.ITEM_BG_NOR, _[n] = this.data.NUM_BG_NOR, 
            T = this.data.FONT_COLOR_NOR) : (N[n] = this.data.ITEM_BG_SEL, _[n] = this.data.NUM_BG_SEL, 
            T = this.data.FONT_COLOR_SEL);
        }
        this.setData({
            item_bg: N,
            num_bg: _,
            font_color: T
        });
    },
    onKnow: function() {
        wx.navigateBack({});
    },
    onUnload: function() {
        var t = a.GetNumber(a.ParamName.TOTAL_POINT), e = a.GetNumber(a.ParamName.TOTAL_SIGNIN_COUNT), N = 20;
        6 == e ? (e = 0, t += 140, N = 140) : (t += 20 * ++e, N = 20 * e);
        try {
            a.Set(a.ParamName.TOTAL_SIGNIN_COUNT, e), a.Set(a.ParamName.TOTAL_POINT, t), a.Set(a.ParamName.LAST_SIGNIN, new Date().getTime());
        } catch (N) {
            a.Set(a.ParamName.TOTAL_SIGNIN_COUNT, e), a.Set(a.ParamName.TOTAL_POINT, t), a.Set(a.ParamName.LAST_SIGNIN, new Date().getTime());
        }
        wx.showToast({
            title: "获得" + N + "金币"
        });
    },
    onJump: function() {
        var t = a.GetNumber(a.ParamName.TOTAL_POINT);
        console.log("onJump ====", t);
        var e = a.GetNumber(a.ParamName.TOTAL_SIGNIN_COUNT);
        6 == e ? (e = 0, t += 140) : t += 20 * ++e, a.Set(a.ParamName.TOTAL_SIGNIN_COUNT, e), 
        a.Set(a.ParamName.TOTAL_POINT, t), a.Set(a.ParamName.LAST_SIGNIN, new Date().getTime()), 
        wx.navigateToMiniProgram({
            appId: "wx1d6d50e86b86dc7e",
            path: "pages/index/index",
            success: function(a) {
                wx.navigateBack({});
            }
        });
    }
});