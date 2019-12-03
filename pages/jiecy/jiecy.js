function a(a, t, r) {
    return t in a ? Object.defineProperty(a, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = r, a;
}

function t(a, t, r) {
    return t in a ? Object.defineProperty(a, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = r, a;
}

var r, i, e = function(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    return t.default = a, t;
}(require("../../modules/LocalData")), s = require("../../utils/util.js");

getApp(), Page((r = {
    clickItem: function(a) {
        var t = a.currentTarget.dataset.item, r = this.data.cur_level - 1;
        if ("2" == s.JIELONG_INIT[r][t]) {
            for (var i = [], e = [], n = 0; n < 100; n++) i[n] = this.data.array_url[n], e[n] = this.data.array[n];
            if (e[t] = "", i[this.data.cur_char] = this.data.NOR_BG, this.data.cur_char = t, 
            i[t] = this.data.SEL_BG, this.setData({
                array_url: i,
                array: e
            }), -1 == this.data.array_index[t]) ; else {
                for (var o = [], n = 0; n < 40; n++) o[n] = this.data.array_show[n];
                o[this.data.array_index[t]] = !0, this.data.array_index[t] = -1, this.setData({
                    array_show: o
                });
            }
            this.check();
        }
    },
    clickAns: function(a) {
        var t = a.currentTarget.dataset.item;
        this.ans(t), this.check();
    },
    showTips: function() {
        if (this.data.total_point < 30) wx.showToast({
            title: "金币不足,点击[加金币]按钮获取金币",
            duration: 2e3,
            icon: "none"
        }); else {
            var a = e.GetNumber(e.ParamName.TOTAL_POINT);
            if (a < 30) try {
                var t = wx.getSystemInfoSync();
                if (console.log(t.model), -1 != t.model.search("iPhone")) return void wx.showToast({
                    title: "金币不够哦！",
                    icon: "success",
                    image: "../../imgs/comm/warn.png",
                    duration: 2e3
                });
            } catch (a) {} else {
                for (var r = Number(this.data.cur_char), i = r + 1, n = this.data.cur_level - 1, o = s.JIELONG_FINISH[n].substring(r, i), c = -1, h = 0; h < this.data.cur_sel_array.length; h++) if (this.data.array_show[h] && o == this.data.cur_sel_array[h]) {
                    c = h;
                    break;
                }
                console.log("char::" + o + "item:::  " + c), -1 != c ? (a -= 30, e.Set(e.ParamName.TOTAL_POINT, a), 
                this.setData({
                    total_point: a
                }), this.ans(c), this.check()) : wx.showToast({
                    title: "答案已被选",
                    duration: 2500
                });
            }
        }
    },
    help: function() {},
    onShareAppMessage: function(a) {
        return {
            title: "我已经闯过" + this.data.cur_level + "关，成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "/pages/index/index"
        };
    },
    onReady: function() {
        this.showInsertAd();
    },
    showInsertAd: function() {
        wx.createInterstitialAd && setTimeout(function() {
            wx.createInterstitialAd({
                adUnitId: wx.gg.insertId
            }).show().catch(function(a) {});
        }, 15e3);
    },
    onLoad: function() {
        var a = e.GetNumber(e.ParamName.CURRENT_LEVELS_JIELONG), t = e.GetNumber(e.ParamName.TOTAL_POINT);
        a < 1 && (a = 1), this.data.cur_level = a, a -= 1, console.log("point:temp::::" + t);
        for (var r = [], i = [], n = 0; n < s.JIELONG_INIT[a].length; n++) {
            var o = n + 1, c = s.JIELONG_INIT[a].substring(n, o);
            console.log("====" + s.JIELONG_INIT[a]), r[n] = "1" == c ? this.data.EMPTY_BG : this.data.NOR_BG, 
            -1 == this.data.cur_char && "2" == c && (this.data.cur_char = n), i[n] = "1" == c || "2" == c ? "" : c, 
            this.data.array_index[n] = -1;
        }
        r[this.data.cur_char] = this.data.SEL_BG;
        for (var h = [], d = [], n = 0; n < 40; n++) o = n + 1, n < s.JIELONG_ANS[a].length ? (d[n] = !0, 
        h[n] = s.JIELONG_ANS[a].substring(n, o)) : (d[n] = !1, h[n] = "");
        this.setData({
            array: i,
            array_url: r,
            total_point: t,
            cur_sel_array: h,
            array_show: d
        });
    },
    onShow: function() {
        var a = e.GetNumber(e.ParamName.TOTAL_POINT);
        this.setData({
            total_point: a
        });
    }
}, a(r, "onReady", function() {
    wx.setNavigationBarTitle({
        title: "【接龙 " + this.data.cur_level + "/100】"
    });
}), a(r, "ans", function(a) {
    if (this.data.array_show[a]) {
        for (var t = [], r = 0; r < 40; r++) t[r] = this.data.array_show[r];
        t[a] = !1, this.setData({
            array_show: t
        });
        for (var i = [], n = [], r = 0; r < 100; r++) i[r] = this.data.array_url[r], n[r] = this.data.array[r];
        n[this.data.cur_char] = this.data.cur_sel_array[a], i[this.data.cur_char] = this.data.NOR_BG, 
        this.data.array_index[this.data.cur_char] = a;
        for (var o = "", r = 0; r < 100; r++) "" == n[r] ? o += "1" : o += n[r];
        var c = this.data.cur_level - 1;
        if (o != s.JIELONG_FINISH[c]) {
            console.log();
            var h = Number(this.data.cur_char) + 1, d = h + 1, u = Number(this.data.cur_char) + 10, _ = u + 1;
            if (h < 100 && "2" == s.JIELONG_INIT[c].substring(h, d) && "" == n[h]) this.data.cur_char = h, 
            i[this.data.cur_char] = this.data.SEL_BG; else if (u < 100 && "2" == s.JIELONG_INIT[c].substring(u, _) && "" == n[u]) this.data.cur_char = u, 
            i[this.data.cur_char] = this.data.SEL_BG; else for (r = 0; r < 100; r++) {
                var l = r + 1;
                if ("2" == s.JIELONG_INIT[c].substring(r, l) && "" == n[r]) {
                    this.data.cur_char = r, i[r] = this.data.SEL_BG;
                    break;
                }
            }
            this.setData({
                array_url: i,
                array: n
            });
        } else {
            this.data.cur_level < 100 && (this.data.cur_level += 1), e.Set(e.ParamName.CURRENT_LEVELS_JIELONG, this.data.cur_level), 
            this.data.cur_level > e.GetNumber(e.ParamName.PASS_LEVELS_JIELONG) && (e.Set(e.ParamName.PASS_LEVELS_JIELONG, this.data.cur_level), 
            this.data.total_point = this.data.total_point + 50, e.Set(e.ParamName.TOTAL_POINT, this.data.total_point)), 
            wx.redirectTo({
                url: "jiecy"
            });
            var f = this.data.cur_level - 1;
            wx.showModal({
                title: "恭喜过关",
                content: "恭喜您通过成语接龙第" + f + "关\n\n                金币 +50",
                showCancel: !1
            });
        }
    }
}), a(r, "check", function() {
    for (var a = [], t = 0; t < 100; t++) a[t] = this.data.array_url[t];
    for (var r = this.data.cur_level - 1, t = 0; t < 100; t++) {
        var i = t + 1;
        if ("" != this.data.array[t] && this.data.array[t] == s.JIELONG_FINISH[r].substring(t, i)) {
            for (var e = t % 10, n = 0, o = 0, c = !1, h = !1, d = 0; d <= e; d++) {
                var u = t - d, _ = t - d + 1;
                if ("" == this.data.array[u] || this.data.array[u] != s.JIELONG_FINISH[r].substring(u, _)) {
                    if ("" == this.data.array[u] && "2" != s.JIELONG_INIT[r].substring(u, _)) break;
                    c = !0;
                    break;
                }
                n++;
            }
            for (d = 1; d < 10 - e; d++) {
                var u = t + d, _ = t + d + 1;
                if ("" == this.data.array[u] || this.data.array[u] != s.JIELONG_FINISH[r].substring(u, _)) {
                    if ("" == this.data.array[u] && "2" != s.JIELONG_INIT[r].substring(u, _)) break;
                    h = !0;
                    break;
                }
                o++;
            }
            c || h || n + o >= 3 && (a[t] = this.data.SUC_BG);
            for (var l = t / 10, f = 0, I = 0, N = !1, v = !1, d = 1; d <= l; d++) {
                var u = t - 10 * d, _ = t - 10 * d + 1;
                if ("" == this.data.array[u] || this.data.array[u] != s.JIELONG_FINISH[r].substring(u, _)) {
                    if ("" == this.data.array[u] && "2" != s.JIELONG_INIT[r].substring(u, _)) break;
                    N = !0;
                    break;
                }
                f++;
            }
            for (d = 1; d < 10 - l; d++) {
                var u = t + 10 * d, _ = t + 10 * d + 1;
                if ("" == this.data.array[u] || this.data.array[u] != s.JIELONG_FINISH[r].substring(u, _)) {
                    if ("" == this.data.array[u] && "2" != s.JIELONG_INIT[r].substring(u, _)) break;
                    v = !0;
                    break;
                }
                I++;
            }
            v || N || I + f >= 3 && (a[t] = this.data.SUC_BG), this.setData({
                array_url: a
            });
        }
    }
}), a(r, "getToday", function() {
    var a = new Date();
    return a.getFullYear() + a.getMonth() + a.getDate();
}), a(r, "isFrist", function(a) {
    var t = this.getToday();
    return wx.getStorageSync(a) != t;
}), a(r, "createVideoAd", function() {
    var a = this;
    if (wx.createRewardedVideoAd) {
        if (this.videoAd) return void this.videoAd.show().catch(function() {
            a.videoAd.load().then(function() {
                return a.videoAd.show();
            }).catch(function(t) {
                a.success && a.success();
            });
        });
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: wx.gg.videoId
        }), this.errFun = function(t) {
            a.success && a.success();
        }, this.closeFun = function(t) {
            t && t.isEnded ? a.success && a.success() : a.fail && a.fail();
        }, this.videoAd.onError(this.errFun), this.videoAd.onClose(this.closeFun), this.videoAd.show().catch(function() {
            a.videoAd.load().then(function() {
                return a.videoAd.show();
            }).catch(function(t) {
                a.success && a.success();
            });
        });
    } else this.success && this.success();
}), a(r, "showVideoAd", function(a, t) {
    this.success = a, this.fail = t, this.createVideoAd();
}), a(r, "addCoins", function(a) {
    var t = this, r = this.isFrist("coin"), i = Number(wx.getStorageSync("coin_count") || 0);
    r && (wx.setStorageSync("coin_count", 0), i = 0), this.success = function() {
        var a = t.getToday();
        wx.setStorageSync("coin", a), wx.setStorageSync("coin_count", ++i), t.addCoins2();
    }, this.fail = function() {
        wx.showToast({
            title: "您还没看完视频广告哦！",
            icon: "none",
            duration: 2e3
        });
    }, i < 10 ? wx.showModal({
        title: "提示",
        content: "看个视频广告获得【50】金币！",
        success: function(a) {
            a.confirm ? t.showVideoAd(t.success, t.fail) : a.cancel;
        }
    }) : wx.showModal({
        title: "提示",
        content: "今天免费领金币次数已经用完了，明天再来吧！"
    });
}), a(r, "addCoins2", function(a) {
    var t = this.data.total_point + 50;
    this.setData({
        total_point: t
    }), e.Set(e.ParamName.TOTAL_POINT, t);
}), a(r, "data", (i = {
    isGG: !0,
    adunit: wx.gg.bannerId,
    adunit_sp: wx.gg.spId,
    adunit_qt: wx.gg.qtId,
    cur_level: 1,
    idiom_explain: !1,
    banner_sts: !1,
    width: .33,
    SEL_BG: "#bf9b82",
    NOR_BG: "#f6ce9b",
    EMPTY_BG: "",
    array_sel_item: [],
    userid: 1e4,
    point_chg: 0,
    total_point: 200,
    array_cur_level_idioms: [ "不不不不" ],
    array_cur_level_explain_brif: []
}, t(i, "EMPTY_BG", "#b2c4c6"), t(i, "NOR_BG", "#ffffff"), t(i, "SEL_BG", "#893f00"), 
t(i, "SUC_BG", "#00FF00"), t(i, "array_url", []), t(i, "array", []), t(i, "array_index", []), 
t(i, "cur_char", -1), t(i, "array_show", []), t(i, "cur_sel_array", []), i)), r));