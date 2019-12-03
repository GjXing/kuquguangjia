var a = function(a) {
    if (a && a.__esModule) return a;
    var e = {};
    if (null != a) for (var t in a) Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
    return e.default = a, e;
}(require("../../modules/LocalData"));

getApp(), Page({
    clickItem: function(a) {
        var e = a.currentTarget.dataset.item;
        e > this.data.level ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "关卡还没激活哦！"
        }) : (console.log(a.currentTarget.dataset.item), e = e + (2 * this.data.level_id - 1) * (2 * this.data.level_id - 1) - 1, 
        getApp().globalData.wnds.Wnd_Play.CurrLevel = e, getApp().globalData.wnds.Wnd_Play.Show());
    },
    onLoad: function(e) {
        var t = e.id;
        this.data.level_id = t;
        var r = (2 * t + 1) * (2 * t + 1) - (2 * t - 1) * (2 * t - 1), l = a.GetNumber(a.ParamName.PASS_LEVELS) - (2 * t - 1) * (2 * t - 1) + 1;
        l < 0 && (l = 0);
        for (var o = parseInt(r / 7) + 1, n = [], d = 1; d <= o; d++) {
            for (var i = [], c = 0; c < 7; c++) i[c] = 7 * (d - 1) + c + 1;
            n[d - 1] = i;
        }
        this.setData({
            count: r,
            array: n,
            level: l
        });
    },
    data: {
        level_id: 0,
        level: 3,
        count: 1,
        array: [ [ 1, 2, 3, 4, 5, 6, 7 ], [ 8, 9, 10, 11, 12, 13, 14 ], [ 15, 16, 17, 18, 19, 20, 21 ], [ 22, 23, 24, 25, 26, 27, 28 ], [ 29, 30, 31, 32, 33, 34, 35 ], [ 36, 37, 38, 39, 40, 41, 42 ], [ 43, 44, 45, 46, 47, 48, 49 ], [ 50, 51, 52, 53, 54, 55, 56 ], [ 57, 58, 59, 60, 61, 62, 63 ], [ 64, 65, 66, 67, 68, 69, 70 ], [ 71, 72, 73, 74, 75, 76, 77 ], [ 78, 79, 80, 81, 82, 83, 84 ], [ 85, 86, 87, 88, 89, 90, 91 ], [ 92, 93, 94, 95, 96, 97, 98 ], [ 99, 100, 101, 102, 103, 104, 105 ], [ 106, 107, 108, 109, 110, 111, 112 ], [ 113, 114, 115, 116, 117, 118, 119 ], [ 120, 121, 122, 123, 124, 125, 126 ] ],
        nor: "#fff5a3",
        unlock: "#d1cec1"
    }
});