getApp();

var t = require("../../utils/jingdian.js"), s = require("../../utils/gaoxiao.js"), e = require("../../utils/zimi.js"), a = require("../../utils/dongwu.js"), i = require("../../utils/dengmi.js"), r = require("../../utils/ertong.js"), o = require("../../utils/lengxiaohua.js"), n = require("../../utils/shuxue.js"), c = require("../../utils/wulitou.js"), d = require("../../utils/youmo.js"), u = require("../../utils/zhengren.js");

Page({
    data: {
        title: "脑筋急转弯",
        questionArr: [],
        answerArr: [],
        descArr: [],
        currentpos: 1,
        question: "",
        answer: "",
        desc: "",
        showanswer: !1,
        showshare: !1,
        type: "jingdian",
        showAd: !1,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId,
        isGG: !0
    },
    onLoad: function(h) {
        var l = h.type;
        this.data.titleName = h.title, "jingdian" == l ? this.parseData(t.data) : "gaoxiao" == l ? this.parseData(s.data) : "zimi" == l ? this.parseData(e.data) : "dongwu" == l ? this.parseData(a.data) : "dengmi" == l ? this.parseData(i.data) : "ertong" == l ? this.parseData(r.data) : "zhengren" == l ? this.parseData(u.data) : "lengxiaohua" == l ? this.parseData(o.data) : "dengmi" == l ? this.parseData(i.data) : "shuxue" == l ? this.parseData(n.data) : "wulitou" == l ? this.parseData(c.data) : "youmo" == l && this.parseData(d.data);
        var w = wx.getStorageSync(l + "_curpos");
        "" == w && (w = 1), this.setData({
            type: l,
            currentpos: w,
            question: this.data.questionArr[w],
            answer: this.data.answerArr[w],
            desc: void 0 == this.data.descArr[w] ? "" : this.data.descArr[w],
            showanswer: !1,
            title: this.data.titleName + "第" + w + "关"
        }), wx.setNavigationBarTitle({
            title: this.data.title
        });
    },
    next: function() {
        console.log("下一题", this.data.currentpos), this.data.currentpos != this.data.questionArr.length - 1 ? (this.data.currentpos % 10 == 5 && this.setData({
            showAd: !0
        }), this.setData({
            currentpos: this.data.currentpos + 1,
            question: this.data.questionArr[this.data.currentpos + 1],
            answer: this.data.answerArr[this.data.currentpos + 1],
            desc: void 0 == this.data.descArr[this.data.currentpos + 1] ? "" : this.data.descArr[this.data.currentpos + 1],
            showanswer: !1,
            title: this.data.titleName + "第" + (this.data.currentpos + 1) + "关"
        }), wx.setStorageSync(this.data.type + "_curpos", this.data.currentpos)) : wx.showToast({
            title: "已经到最后一条",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), wx.setNavigationBarTitle({
            title: this.data.title
        }), console.log("下一题后面", this.data.currentpos);
    },
    forward: function() {
        console.log("上一题", this.data.currentpos), 1 != this.data.currentpos ? (this.setData({
            currentpos: this.data.currentpos - 1,
            question: this.data.questionArr[this.data.currentpos - 1],
            answer: this.data.answerArr[this.data.currentpos - 1],
            desc: void 0 == this.data.descArr[this.data.currentpos - 1] ? "" : this.data.descArr[this.data.currentpos - 1],
            showanswer: !1,
            title: this.data.titleName + "第" + (this.data.currentpos - 1) + "关"
        }), wx.setStorageSync(this.data.type + "_curpos", this.data.currentpos)) : wx.showToast({
            title: "已经到第一条",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), wx.setNavigationBarTitle({
            title: this.data.title
        }), console.log("上一题", this.data.currentpos);
    },
    showanswer: function() {
        this.setData({
            showanswer: !0
        });
    },
    parseData: function(t) {
        for (var s = t.split("&"), e = [], a = [], i = [], r = 0; r < s.length; r++) {
            var o = s[r].split("#"), n = o[0], c = o[1], d = o[2];
            e[r] = n, i[r] = c, a[r] = d;
        }
        this.setData({
            questionArr: e,
            answerArr: i,
            descArr: a
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return setTimeout(function() {
            t.openVideoAd2(), wx.showToast({
                title: "分享成功"
            });
        }, 3e3), {
            title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "/pages1/index/index"
        };
    },
    getToday: function() {
        var t = new Date();
        return t.getFullYear() + t.getMonth() + t.getDate();
    },
    isFrist: function(t) {
        var s = this.getToday();
        return wx.getStorageSync(t) != s;
    },
    createVideoAd: function() {
        var t = this;
        if (wx.createRewardedVideoAd) {
            if (this.videoAd) return void this.videoAd.show().catch(function() {
                t.videoAd.load().then(function() {
                    return t.videoAd.show();
                }).catch(function(s) {
                    t.success && t.success();
                });
            });
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: wx.gg.videoId
            }), this.errFun = function(s) {
                t.success && t.success();
            }, this.closeFun = function(s) {
                s && s.isEnded ? t.success && t.success() : t.fail && t.fail();
            }, this.videoAd.onError(this.errFun), this.videoAd.onClose(this.closeFun), this.videoAd.show().catch(function() {
                t.videoAd.load().then(function() {
                    return t.videoAd.show();
                }).catch(function(s) {
                    t.success && t.success();
                });
            });
        } else this.success && this.success();
    },
    showVideoAd: function(t, s) {
        this.success = t, this.fail = s, this.createVideoAd();
    },
    openVideoAd: function(t) {
        var s = this, e = this.isFrist("jiesuo"), a = Number(wx.getStorageSync("jiesuo_count") || 0);
        e && (wx.setStorageSync("jiesuo_count", 0), a = 0), this.success = function() {
            var t = s.getToday();
            wx.setStorageSync("jiesuo", t), wx.setStorageSync("jiesuo_count", ++a), s.openVideoAd2();
        }, this.fail = function() {
            wx.showModal({
                title: "无法解锁答案",
                content: "对不起，需要完整查看视频广告才能解锁答案哦~",
                showCancel: !1,
                cancelText: "取消",
                cancelColor: "",
                confirmText: "确定",
                confirmColor: "#576B95",
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        }, wx.showModal({
            title: "提示",
            content: "看完视频广告，可以【解锁答案】哦！",
            success: function(t) {
                t.confirm ? s.showVideoAd(s.success, s.fail) : t.cancel;
            }
        });
    },
    openVideoAd2: function() {
        this.setData({
            showAd: !1
        });
    }
});