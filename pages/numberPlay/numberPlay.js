var a = function(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}(require("../../modules/LocalData")), t = require("../../dati_comm/modules/share"), e = require("../../utils/util.js");

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
        level_id: 1,
        idom_arr: [],
        explain_arr: [],
        xth: []
    },
    onLoad: function(t) {
        var r = t.id;
        this.data.level_id = r;
        var i = a.GetNumber(a.ParamName.TOTAL_POINT);
        this.data.cur_level < 1 && (this.data.cur_level = 1);
        var s = wx.getStorageSync(a.ParamName.NUMBER_XTH);
        switch (this.data.xth = s.split(","), "" != wx.getStorageSync("NUMBER_LEVEL") ? this.data.cur_level = Number(wx.getStorageSync("NUMBER_LEVEL")) : this.data.cur_level = this.data.xth[this.data.level_id - 1], 
        console.log(this.data.level_id), this.data.level_id) {
          case "1":
            this.data.idom_arr = e.NUMBER_1, this.data.explain_arr = e.NUMBER_1_EXP;
            break;

          case "2":
            this.data.idom_arr = e.NUMBER_2, this.data.explain_arr = e.NUMBER_2_EXP;
            break;

          case "3":
            this.data.idom_arr = e.NUMBER_3, this.data.explain_arr = e.NUMBER_3_EXP;
            break;

          case "4":
            this.data.idom_arr = e.NUMBER_4, this.data.explain_arr = e.NUMBER_4_EXP;
            break;

          case "5":
            this.data.idom_arr = e.NUMBER_5, this.data.explain_arr = e.NUMBER_5_EXP;
            break;

          case "6":
            this.data.idom_arr = e.NUMBER_6, this.data.explain_arr = e.NUMBER_6_EXP;
            break;

          default:
            console.log("default");
        }
        var o = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/number_res/" + r + "_" + this.data.cur_level + ".png";
        console.log("main_img_temp" + o), this.getRandomArr();
        for (var n = [], l = 0; l < 4; l++) n[l] = 24;
        for (var c = [], l = 0; l < 24; l++) c[l] = !0;
        var d = !1, _ = !0;
        try {
            var h = wx.getSystemInfoSync();
            console.log(h.model), -1 != h.model.search("iPhone") ? _ = !0 : d = !0;
        } catch (a) {}
        if (this.data.cur_level < 3 && (d = !1), (this.data.cur_level < 2 || "1" == wx.getStorageSync("pay_finish")) && (_ = !1), 
        new (getApp().ToastPannel)(), console.log("showadtemp"), _ && (console.log("showadtemp"), 
        wx.getStorageSync("LOCAL_GENDER") != wx.getStorageSync("SHOW_GENDER"))) {
            var g = Number(wx.getStorageSync("SHOW_REPEAT")), u = Number(wx.getStorageSync("JUMP_LAST_TIME"));
            if ("2" == wx.getStorageSync("SHOW_AD") && ("" == wx.getStorageSync("CLICK_USER" + wx.getStorageSync("SHOW_APP_ID")) || new Date().getTime() > u + 864e5 * g) && (wx.getStorageSync("PHONE_MODEL") == wx.getStorageSync("SHOW_MODEL") || "0" == wx.getStorageSync("SHOW_MODEL"))) {
                var m = Number(wx.getStorageSync("SHOW_MANY"));
                new Date().getTime() % 10 < m && (new Date().getTime() % 3 == 0 && this.show("点击底部广告条，即可获得200金币哦", 2e3), 
                this.setData({
                    banner_sts: !0
                }));
            }
        }
        this.setData({
            ans: n,
            array_show: c,
            main_img_url: o,
            total_point: i,
            pointAdd: d,
            showAd: _
        });
    },
    onShow: function() {
        var t = a.GetNumber(a.ParamName.TOTAL_POINT);
        this.setData({
            total_point: t
        });
    },
    addPoint: function() {
        getApp().globalData.wnds.Wnd_Pay.Show();
    },
    clickAns: function(a) {
        var t = a.currentTarget.dataset.item;
        if (24 != this.data.ans[t]) {
            for (var e = [], r = 0; r < 4; r++) e[r] = this.data.ans[r];
            for (var i = [], r = 0; r < 24; r++) i[r] = this.data.array_show[r];
            i[e[t]] = !0, e[t] = 24, this.setData({
                ans: e,
                array_show: i
            });
        }
    },
    clickItem: function(a) {
        for (var t = a.currentTarget.dataset.item, e = -1, r = 0; r < 4; r++) if (24 == this.data.ans[r]) -1 == e && (e = r); else if (t == this.data.ans[r]) return;
        -1 != e ? this.updateData(t, e) : wx.showToast({
            title: "先删除错误答案",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        });
    },
    clickFree: function(a) {
        console.log("===");
    },
    getPoint: function() {
        wx.showToast({
            title: "看视频可获金币哦！",
            icon: "success",
            duration: 2e3
        });
    },
    showTips: function(t) {
        var e = this.getEmptyItem();
        if (-1 != e) {
            var r = 0;
            if (r = this.data.cur_level < 350 ? 30 : this.data.cur_level < 700 ? 50 : 70, this.data.total_point < r) try {
                var i = wx.getSystemInfoSync();
                if (console.log(i.model), -1 != i.model.search("iPhone")) return void wx.showToast({
                    title: "金币不够哦！",
                    icon: "success",
                    image: "../../imgs/comm/warn.png",
                    duration: 2e3
                });
            } catch (a) {} else {
                var s = this.data.total_point - r;
                a.Set(a.ParamName.TOTAL_POINT, s), this.setData({
                    total_point: s
                });
                var o = this.data.idom_arr[this.data.cur_level - 1].substr(e, 1);
                console.log("===" + o);
                for (var n = 0; n < 24; n++) if (o == this.data.array[n]) {
                    this.updateData(n, e);
                    break;
                }
            }
        } else wx.showToast({
            title: "先删除错误答案",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        });
    },
    help: function() {},
    onShareAppMessage: function(a) {
        return t.share.getCGShareContent(this, this.data.cur_level);
    },
    onReady: function() {
        var a;
        for (a = 1; a < 17 && !(this.data.cur_level < (2 * a + 1) * (2 * a + 1)); a++) ;
        var t = this.data.cur_level;
        wx.setNavigationBarTitle({
            title: "【第" + this.data.level_id + "期】"
        }), this.setData({
            cur_turn_level: t
        });
    },
    updateData: function(t, e) {
        for (var r = [], i = 0; i < 4; i++) r[i] = this.data.ans[i];
        r[e] = t;
        for (var s = [], i = 0; i < 24; i++) s[i] = this.data.array_show[i];
        for (i = 0; i < 4; i++) 24 != r[i] && (s[r[i]] = !1);
        this.setData({
            ans: r,
            array_show: s
        });
        for (var o = "", i = 0; i < 4; i++) {
            if (24 == r[i]) return;
            o += this.data.array[r[i]];
        }
        if (o == this.data.idom_arr[this.data.cur_level - 1]) {
            if (!(this.data.cur_level < 50)) {
                var n = wx.getStorageSync(a.ParamName.NUMBER_IS_OK), l = n.split(",");
                return l[this.data.level_id - 1] = "1", n = l.join(","), console.log(n), a.Set(a.ParamName.NUMBER_IS_OK, n), 
                void wx.showModal({
                    title: "通关提示",
                    content: "恭喜您已通关，敬请期待下一期！",
                    confirmText: "好的",
                    success: function(a) {
                        a.confirm && wx.navigateBack({
                            delta: 3
                        });
                    }
                });
            }
            this.data.cur_level = Number(this.data.cur_level) + 1, this.data.cur_level > this.data.xth[this.data.level_id - 1] && (this.data.xth[this.data.level_id - 1] = Number(this.data.xth[this.data.level_id - 1]) + 1, 
            n = this.data.xth.join(","), console.log("=====::::==" + n), a.Set(a.ParamName.NUMBER_XTH, n)), 
            a.Set(a.ParamName.PASS_LEVELS, this.data.cur_level), this.data.total_point = this.data.total_point + 5, 
            a.Set(a.ParamName.TOTAL_POINT, this.data.total_point), console.log("==========::" + this.data.cur_level), 
            wx.setStorageSync("NUMBER_LEVEL", this.data.cur_level), wx.redirectTo({
                url: "numberPlay?id=" + this.data.level_id
            });
            var c = this.data.cur_level - 2;
            wx.showModal({
                title: this.data.idom_arr[c],
                content: "【解释】：" + this.data.explain_arr[c] + "\n\n金币 +5",
                showCancel: !1
            });
        } else wx.showToast({
            title: "存在错误哦",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        });
    },
    getRandom: function(a) {
        var t = Math.random() * a, e = Math.round(t);
        return e = Math.max(Math.min(e, a), 0);
    },
    getRandomArr: function() {
        for (var a = "", t = 1; t < 11; t++) console.log("===" + this.data.idom_arr[this.data.cur_level - 1 + t]), 
        a += this.data.idom_arr[this.data.cur_level - 1 + t];
        a = this.data.idom_arr[this.data.cur_level - 1] + a;
        for (var e = [], t = 0; t < 100; t++) 40 == (s = this.getRandom(40)) && (s = 0), 
        -1 == e.indexOf(s) && (e[e.length] = s);
        if (e.length < 40) for (var r = !0, i = e.length; i < 40; i++) if (r) for (r = !1, 
        t = 0; t < 40; t++) -1 == e.indexOf(t) && (e[i] = t); else for (r = !0, t = 39; t >= 0; t--) -1 == e.indexOf(t) && (e[i] = t);
        for (t = 0; t < 4; t++) if (!(e.indexOf(t) < 24)) for (;;) {
            var s = this.getRandom(23);
            if (!(e[s] < 4)) {
                e[s] = t;
                break;
            }
        }
        for (var o = [], t = 0; t < 24; t++) o[t] = a.substr(e[t], 1);
        o[24] = "", console.log(o), this.setData({
            array: o
        });
    },
    getEmptyItem: function() {
        var a = new Date().getTime();
        return a % 3 == 2 ? 24 == this.data.ans[1] ? 1 : 24 == this.data.ans[3] ? 3 : 24 == this.data.ans[2] ? 2 : 24 == this.data.ans[0] ? 0 : -1 : a % 3 == 1 ? 24 == this.data.ans[3] ? 3 : 24 == this.data.ans[1] ? 1 : 24 == this.data.ans[2] ? 2 : 24 == this.data.ans[0] ? 0 : -1 : 24 == this.data.ans[2] ? 2 : 24 == this.data.ans[1] ? 1 : 24 == this.data.ans[3] ? 3 : 24 == this.data.ans[0] ? 0 : -1;
    },
    jump: function() {
        wx.setStorageSync("JUMP_LAST_TIME", new Date().getTime());
        var t = this.data.total_point + 200;
        a.Set(a.ParamName.TOTAL_POINT, t), this.setData({
            total_point: t
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
            success: function(a) {
                "" == wx.getStorageSync("CLICK_USER" + wx.getStorageSync("SHOW_APP_ID")) && (wx.setStorage({
                    key: "CLICK_USER" + wx.getStorageSync("SHOW_APP_ID"),
                    data: "0"
                }), wx.reportAnalytics("click_success" + wx.getStorageSync("SHOW_APP_ID"), {
                    success_count: 1
                }));
                var t = Number(wx.getStorageSync("SHOW_UP"));
                new Date().getTime() % t == 0 && (console.log("log==========="), wx.reportAnalytics("click_ad" + wx.getStorageSync("SHOW_APP_ID"), {
                    count: 1
                }));
            }
        })) : wx.showToast({
            title: "QQ版本过低",
            duration: 2e3
        });
    }
});