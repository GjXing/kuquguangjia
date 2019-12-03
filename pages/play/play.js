var t = function(t) {
    if (t && t.__esModule) return t;
    var a = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
    return a.default = t, a;
}(require("../../modules/LocalData")), a = require("../../dati_comm/modules/share"), e = require("../../utils/util.js");

getApp(), Page({
    data: {
        cur_level: 1,
        level_icon_url: "",
        main_img_url: "",
        array_sel_item: [],
        array: [],
        array_show: [],
        ans: [],
        ansBg: [],
        pointAdd: !1,
        total_point: 0,
        cur_turn_level: 1,
        showAd: !1,
        banner_sts: !1,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId,
        isGG: !0
    },
    onLoad: function() {
        this.data.cur_level = getApp().globalData.wnds.Wnd_Play.CurrLevel;
        var a = t.GetNumber(t.ParamName.TOTAL_POINT);
        this.data.cur_level < 1 && (this.data.cur_level = 1);
        var s = "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/q/" + this.data.cur_level + ".jpg";
        this.data.cur_level > 501 && (s = "https://hyimages.oss-cn-beijing.aliyuncs.com/ccy/h/" + e.PIC[this.data.cur_level - 502]);
        var n;
        for (n = 1; n < 17 && !(this.data.cur_level < (2 * n + 1) * (2 * n + 1)); n++) ;
        var o = "http://cyktc.oss-cn-beijing.aliyuncs.com/level/level_" + n + ".png";
        this.getRandomArr();
        for (var i = [], r = 0; r < 4; r++) i[r] = 24;
        for (var c = [], r = 0; r < 24; r++) c[r] = !0;
        var l = !1, d = !0;
        try {
            var h = wx.getSystemInfoSync();
            console.log(h.model), -1 != h.model.search("iPhone") ? d = !0 : l = !0;
        } catch (t) {}
        if (this.data.cur_level < 30 && (l = !1), (this.data.cur_level < 10 || "1" == wx.getStorageSync("pay_finish")) && (d = !1), 
        new (getApp().ToastPannel)(), console.log("showadtemp"), d && (console.log("showadtemp"), 
        wx.getStorageSync("LOCAL_GENDER") != wx.getStorageSync("SHOW_GENDER"))) {
            var u = Number(wx.getStorageSync("SHOW_REPEAT")), g = Number(wx.getStorageSync("JUMP_LAST_TIME"));
            if ("2" == wx.getStorageSync("SHOW_AD") && ("" == wx.getStorageSync("CLICK_USER" + wx.getStorageSync("SHOW_APP_ID")) || new Date().getTime() > g + 864e5 * u) && (wx.getStorageSync("PHONE_MODEL") == wx.getStorageSync("SHOW_MODEL") || "0" == wx.getStorageSync("SHOW_MODEL"))) {
                var _ = Number(wx.getStorageSync("SHOW_MANY"));
                new Date().getTime() % 10 < _ && (new Date().getTime() % 3 == 0 && this.show("点击底部广告条，即可获得200金币哦", 2e3), 
                this.setData({
                    banner_sts: !0
                }));
            }
        }
        this.setData({
            ans: i,
            array_show: c,
            main_img_url: s,
            level_icon_url: o,
            total_point: a,
            pointAdd: l,
            showAd: d
        });
    },
    onShow: function() {
        var a = t.GetNumber(t.ParamName.TOTAL_POINT);
        this.setData({
            total_point: a
        });
    },
    addPoint: function() {
        getApp().globalData.wnds.Wnd_Pay.Show();
    },
    clickAns: function(t) {
        var a = t.currentTarget.dataset.item;
        if (24 != this.data.ans[a]) {
            for (var e = [], s = 0; s < 4; s++) e[s] = this.data.ans[s];
            for (var n = [], s = 0; s < 24; s++) n[s] = this.data.array_show[s];
            n[e[a]] = !0, e[a] = 24, this.setData({
                ans: e,
                array_show: n
            });
        }
    },
    clickItem: function(t) {
        for (var a = t.currentTarget.dataset.item, e = -1, s = 0; s < 4; s++) if (24 == this.data.ans[s]) -1 == e && (e = s); else if (a == this.data.ans[s]) return;
        -1 != e ? this.updateData(a, e) : wx.showToast({
            title: "先删除错误答案",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        });
    },
    clickFree: function(t) {
        console.log("===");
    },
    getPoint: function() {
        wx.showToast({
            title: "看视频可免费领金币哦！",
            icon: "success",
            duration: 2e3
        });
    },
    showTips: function(a) {
        if (this.data.total_point < 30) wx.showToast({
            title: "金币不足,点击[加金币]按钮获取金币",
            duration: 2e3,
            icon: "none"
        }); else {
            var s = this.getEmptyItem();
            if (-1 != s) {
                if (this.data.total_point < 30) try {
                    var n = wx.getSystemInfoSync();
                    if (console.log(n.model), -1 != n.model.search("iPhone")) return void wx.showToast({
                        title: "金币不够哦！",
                        icon: "success",
                        image: "../../imgs/comm/warn.png",
                        duration: 2e3
                    });
                } catch (t) {} else {
                    var o = this.data.total_point - 30;
                    t.Set(t.ParamName.TOTAL_POINT, o), this.setData({
                        total_point: o
                    });
                    var i = e.ALL_IDIOMS[this.data.cur_level - 1].substr(s, 1);
                    console.log("===" + i);
                    for (var r = 0; r < 24; r++) if (i == this.data.array[r]) {
                        this.updateData(r, s);
                        break;
                    }
                }
            } else wx.showToast({
                title: "先删除错误答案",
                icon: "success",
                image: "../../imgs/comm/warn.png",
                duration: 2e3
            });
        }
    },
    help: function() {},
    onShareAppMessage: function(t) {
        return a.share.getCGShareContent(this, this.data.cur_level);
    },
    onReady: function() {
        var t;
        for (t = 1; t < 17 && !(this.data.cur_level < (2 * t + 1) * (2 * t + 1)); t++) ;
        var a = 1;
        a = 1 == t ? this.data.cur_level : this.data.cur_level - (2 * t - 1) * (2 * t - 1) + 1, 
        wx.setNavigationBarTitle({
            title: "【" + e.LEVEL_NAMES[t - 1] + "】"
        }), this.setData({
            cur_turn_level: a
        }), this.showInsertAd();
    },
    showInsertAd: function() {
        wx.createInterstitialAd && setTimeout(function() {
            wx.createInterstitialAd({
                adUnitId: wx.gg.insertId
            }).show().catch(function(t) {});
        }, 15e3);
    },
    updateData: function(a, s) {
        for (var n = [], o = 0; o < 4; o++) n[o] = this.data.ans[o];
        n[s] = a;
        for (var i = [], o = 0; o < 24; o++) i[o] = this.data.array_show[o];
        for (o = 0; o < 4; o++) 24 != n[o] && (i[n[o]] = !1);
        this.setData({
            ans: n,
            array_show: i
        });
        for (var r = "", o = 0; o < 4; o++) {
            if (24 == n[o]) return;
            r += this.data.array[n[o]];
        }
        if (r == e.ALL_IDIOMS[this.data.cur_level - 1]) {
            if (!(this.data.cur_level < 1153)) return void wx.showModal({
                title: "提示",
                content: "更多好玩，敬请期待！先玩下看图知成语？",
                cancelText: "取消",
                confirmText: "好的",
                success: function(t) {
                    t.confirm && (wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                        appId: "wxca17df2788ccdb62",
                        path: "pages/sub_pages/play/play",
                        success: function(t) {}
                    }) : wx.showToast({
                        title: "QQ版本过低",
                        duration: 2e3
                    }));
                }
            });
            this.data.cur_level += 1, getApp().globalData.wnds.Wnd_Play.CurrLevel = this.data.cur_level, 
            this.data.cur_level > t.GetNumber(t.ParamName.PASS_LEVELS) && (t.Set(t.ParamName.PASS_LEVELS, this.data.cur_level), 
            this.data.total_point = this.data.total_point + 5, t.Set(t.ParamName.TOTAL_POINT, this.data.total_point)), 
            100 == this.data.cur_level && "" == wx.getStorageSync("UPLOAD_100") && (wx.setStorageSync("UPLOAD_100", 1), 
            wx.reportAnalytics("pass_level_100", {
                handrad: 1
            })), 200 == this.data.cur_level && "" == wx.getStorageSync("UPLOAD_200") && (wx.setStorageSync("UPLOAD_200", 1), 
            wx.reportAnalytics("pass_level_200", {
                two_handrad: 1
            })), 300 == this.data.cur_level && "" == wx.getStorageSync("UPLOAD_300") && (wx.setStorageSync("UPLOAD_300", 1), 
            wx.reportAnalytics("pass_level_300", {
                three_handrad: 1
            })), wx.redirectTo({
                url: "play"
            });
            var c = this.data.cur_level - 2;
            wx.showModal({
                title: e.ALL_IDIOMS[c],
                content: "【解释】：" + e.EXPLAIN[c] + "\n\n金币 +5",
                showCancel: !1
            });
        } else wx.showToast({
            title: "存在错误哦",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        });
    },
    getRandom: function(t) {
        var a = Math.random() * t, e = Math.round(a);
        return e = Math.max(Math.min(e, t), 0);
    },
    getRandomArr: function() {
        for (var t = "", a = 1; a < 11; a++) console.log("===" + e.ALL_IDIOMS[this.data.cur_level - 1 + a]), 
        t += e.ALL_IDIOMS[this.data.cur_level - 1 + a];
        t = e.ALL_IDIOMS[this.data.cur_level - 1] + t;
        for (var s = [], a = 0; a < 120; a++) 40 == (i = this.getRandom(40)) && (i = 0), 
        -1 == s.indexOf(i) && (s[s.length] = i);
        if (s.length < 40) for (var n = !0, o = s.length; o < 40; o++) if (n) for (n = !1, 
        a = 0; a < 40; a++) -1 == s.indexOf(a) && (s[o] = a); else for (n = !0, a = 39; a >= 0; a--) -1 == s.indexOf(a) && (s[o] = a);
        for (a = 0; a < 4; a++) if (!(s.indexOf(a) < 24)) for (;;) {
            var i = this.getRandom(23);
            if (!(s[i] < 4)) {
                s[i] = a;
                break;
            }
        }
        for (var r = [], a = 0; a < 24; a++) r[a] = t.substr(s[a], 1);
        r[24] = "", this.setData({
            array: r
        });
    },
    getEmptyItem: function() {
        var t = new Date().getTime();
        return t % 3 == 2 ? 24 == this.data.ans[1] ? 1 : 24 == this.data.ans[3] ? 3 : 24 == this.data.ans[2] ? 2 : 24 == this.data.ans[0] ? 0 : -1 : t % 3 == 1 ? 24 == this.data.ans[3] ? 3 : 24 == this.data.ans[1] ? 1 : 24 == this.data.ans[2] ? 2 : 24 == this.data.ans[0] ? 0 : -1 : 24 == this.data.ans[2] ? 2 : 24 == this.data.ans[1] ? 1 : 24 == this.data.ans[3] ? 3 : 24 == this.data.ans[0] ? 0 : -1;
    },
    jump: function() {
        wx.setStorageSync("JUMP_LAST_TIME", new Date().getTime());
        var a = this.data.total_point + 200;
        t.Set(t.ParamName.TOTAL_POINT, a), this.setData({
            total_point: a
        }), wx.showToast({
            title: "获得200金币",
            duration: 2e3
        }), wx.reportAnalytics("click_ad" + wx.getStorageSync("SHOW_APP_ID"), {
            count: 1
        });
        var e = "";
        "" == wx.getStorageSync("SHOW_PAGE") || (e = wx.getStorageSync("SHOW_PAGE")), wx.navigateToMiniProgram ? (this.setData({
            banner_sts: !1
        }), wx.navigateToMiniProgram({
            appId: wx.getStorageSync("SHOW_APP_ID"),
            path: e,
            success: function(t) {
                "" == wx.getStorageSync("CLICK_USER" + wx.getStorageSync("SHOW_APP_ID")) && (wx.setStorage({
                    key: "CLICK_USER" + wx.getStorageSync("SHOW_APP_ID"),
                    data: "0"
                }), wx.setStorageSync("CLICK_USER" + wx.getStorageSync("SHOW_APP_ID"), "0"), wx.reportAnalytics("click_success" + wx.getStorageSync("SHOW_APP_ID"), {
                    success_count: 1
                }));
                var a = Number(wx.getStorageSync("SHOW_UP"));
                new Date().getTime() % a == 0 && (console.log("log==========="), wx.reportAnalytics("click_ad" + wx.getStorageSync("SHOW_APP_ID"), {
                    count: 1
                }));
            }
        })) : wx.showToast({
            title: "QQ版本过低",
            duration: 2e3
        });
    },
    getToday: function() {
        var t = new Date();
        return t.getFullYear() + t.getMonth() + t.getDate();
    },
    isFrist: function(t) {
        var a = this.getToday();
        return wx.getStorageSync(t) != a;
    },
    createVideoAd: function() {
        var t = this;
        if (wx.createRewardedVideoAd) {
            if (this.videoAd) return void this.videoAd.show().catch(function() {
                t.videoAd.load().then(function() {
                    return t.videoAd.show();
                }).catch(function(a) {
                    t.success && t.success();
                });
            });
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: wx.gg.videoId
            }), this.errFun = function(a) {
                t.success && t.success();
            }, this.closeFun = function(a) {
                a && a.isEnded ? t.success && t.success() : t.fail && t.fail();
            }, this.videoAd.onError(this.errFun), this.videoAd.onClose(this.closeFun), this.videoAd.show().catch(function() {
                t.videoAd.load().then(function() {
                    return t.videoAd.show();
                }).catch(function(a) {
                    t.success && t.success();
                });
            });
        } else this.success && this.success();
    },
    showVideoAd: function(t, a) {
        this.success = t, this.fail = a, this.createVideoAd();
    },
    addCoins: function(t) {
        var a = this, e = this.isFrist("coin"), s = Number(wx.getStorageSync("coin_count") || 0);
        e && (wx.setStorageSync("coin_count", 0), s = 0), this.success = function() {
            var t = a.getToday();
            wx.setStorageSync("coin", t), wx.setStorageSync("coin_count", ++s), a.addCoins2();
        }, this.fail = function() {
            wx.showToast({
                title: "您还没看完视频广告哦！",
                icon: "none",
                duration: 2e3
            });
        }, s < 10 ? wx.showModal({
            title: "提示",
            content: "看个视频广告获得【50】金币！",
            success: function(t) {
                t.confirm ? a.showVideoAd(a.success, a.fail) : t.cancel;
            }
        }) : wx.showModal({
            title: "提示",
            content: "今天免费领金币次数已经用完了，明天再来吧！"
        });
    },
    addCoins2: function() {
        var a = this.data.total_point + 50;
        this.setData({
            total_point: a
        }), t.Set(t.ParamName.TOTAL_POINT, a);
    }
});