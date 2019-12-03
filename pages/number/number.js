var c = function(c) {
    if (c && c.__esModule) return c;
    var t = {};
    if (null != c) for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
    return t.default = c, t;
}(require("../../modules/LocalData"));

Page({
    data: {
        level_url: [ "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png" ],
        level_color: [ "#777777", "#777777", "#777777", "#777777", "#777777", "#777777" ],
        text_number: [ "6月8号开放", "6月15号开放", "6月22号开放", "6月29号开放", "7月6号开放", "7月13号开放", "7月20号开放" ],
        text_color: [ "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000", "#ff0000" ],
        numbers: 1
    },
    onLoad: function() {
        for (var t = c.GetNumber("SHOW_NUMBER"), n = wx.getStorageSync(c.ParamName.NUMBER_IS_OK), e = wx.getStorageSync(c.ParamName.NUMBER_XTH), o = n.split(","), u = e.split(","), a = [], r = [], s = [], l = [], i = 1; i <= 6; i++) i <= t ? (l[i - 1] = "#e77749", 
        "0" == o[i - 1] ? (a[i - 1] = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_sel.png", 
        r[i - 1] = 2 * Number(u[i - 1]) - 2 + "%", s[i - 1] = "#00ff00") : (a[i - 1] = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_sel_ok.png", 
        r[i - 1] = "", s[i - 1] = "#00ff00")) : (l[i - 1] = "#777777", a[i - 1] = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", 
        r[i - 1] = this.data.text_number[i - 1], s[i - 1] = this.data.text_color[i - 1]);
        this.setData({
            level_url: a,
            text_number: r,
            text_color: s,
            level_color: l
        });
    },
    clickItem: function(t) {
        var n = c.GetNumber("SHOW_NUMBER"), e = t.currentTarget.dataset.item;
        n < e ? wx.showToast({
            title: "敬请期待！",
            icon: "success",
            duration: 2e3
        }) : wx.navigateTo({
            url: "../numberSel/numberSel?id=" + e
        });
    },
    cyjl: function() {
        wx.showToast({
            title: "敬请期待！",
            icon: "success",
            duration: 2e3
        });
    },
    onShow: function() {
        for (var t = c.GetNumber("SHOW_NUMBER"), n = wx.getStorageSync(c.ParamName.NUMBER_IS_OK), e = wx.getStorageSync(c.ParamName.NUMBER_XTH), o = n.split(","), u = e.split(","), a = [], r = [], s = [], l = [], i = 1; i <= 6; i++) i <= t ? (l[i - 1] = "#e77749", 
        "0" == o[i - 1] ? (a[i - 1] = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_sel.png", 
        r[i - 1] = 2 * Number(u[i - 1]) - 2 + "%", s[i - 1] = "#00ff00") : (a[i - 1] = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_sel_ok.png", 
        r[i - 1] = "", s[i - 1] = "#00ff00")) : (l[i - 1] = "#777777", a[i - 1] = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number/tiku_nor.png", 
        r[i - 1] = this.data.text_number[i - 1], s[i - 1] = this.data.text_color[i - 1]);
        this.setData({
            level_url: a,
            text_number: r,
            text_color: s,
            level_color: l
        });
    }
});