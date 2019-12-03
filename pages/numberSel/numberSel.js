var e = function(e) {
    if (e && e.__esModule) return e;
    var a = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (a[t] = e[t]);
    return a.default = e, a;
}(require("../../modules/LocalData"));

getApp(), Page({
    clickItem: function(e) {
        var a = e.currentTarget.dataset.item;
        a > this.data.level ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "关卡还没激活哦！"
        }) : (console.log(e.currentTarget.dataset.item), wx.setStorageSync("NUMBER_LEVEL", a), 
        wx.navigateTo({
            url: "../numberPlay/numberPlay?id=" + this.data.level_id
        }));
    },
    onLoad: function(a) {
        var t = a.id;
        this.data.level_id = t;
        for (var r = wx.getStorageSync(e.ParamName.NUMBER_XTH).split(",")[this.data.level_id - 1], l = parseInt(50 / 7) + 1, n = [], o = 1; o <= l; o++) {
            for (var i = [], c = 0; c < 7; c++) i[c] = 7 * (o - 1) + c + 1;
            n[o - 1] = i;
        }
        this.setData({
            count: 50,
            array: n,
            level: r
        });
    },
    onShow: function() {
        var a = wx.getStorageSync(e.ParamName.NUMBER_XTH).split(",")[this.data.level_id - 1];
        this.setData({
            level: a
        });
    },
    data: {
        level_id: 0,
        level: 3,
        count: 1,
        array: [ [ 1, 2, 3, 4, 5, 6, 7 ], [ 8, 9, 10, 11, 12, 13, 14 ], [ 15, 16, 17, 18, 19, 20, 21 ], [ 22, 23, 24, 25, 26, 27, 28 ], [ 29, 30, 31, 32, 33, 34, 35 ], [ 36, 37, 38, 39, 40, 41, 42 ], [ 43, 44, 45, 46, 47, 48, 49 ], [ 50, 51, 52, 53, 54, 55, 56 ] ],
        nor: "#fff5a3",
        unlock: "#d1cec1"
    }
});