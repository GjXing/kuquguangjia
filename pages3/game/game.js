var t = getApp();

Array.prototype.shuffle || (Array.prototype.shuffle = function() {
    for (var t, e, n = this.length; n; t = parseInt(Math.random() * n), e = this[--n], 
    this[n] = this[t], this[t] = e) ;
    return this;
});

var e = require("../assets/proverbData.json.js");

e = e.data;

var n = [ [ 1, 10, "书童" ], [ 10, 20, "书生" ], [ 20, 50, "秀才" ], [ 50, 80, "举人" ], [ 80, 120, "贡生" ], [ 120, 160, "进士" ], [ 160, 200, "状元" ], [ 200, 240, "少师" ], [ 240, 1e3, "太师" ], [ 1e3, 1e4, "圣人" ] ], i = wx.getStorageSync("level") || 0, o = wx.getStorageSync("coins");

"" === o && (o = 50), c = 0, i = +i, o = +o;

var s, a, c, r, u, h, d = 0, l = {}, f = {}, d = 0;

Page(function(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}({
    goLevel: function() {
        l = {}, d = 0, u = wx.getStorageSync("reversecheck") || "", i >= e.length && (i = e.length - 1), 
        s = e[i], a = s[1].replace(/(\(.*?\))/g, ""), (u = u.split(","))[0] == i ? h = +u[1] : (h = s[2] ? Math.random() > .65 ? 0 : 1 : 0, 
        wx.setStorageSync("reversecheck", i + (h ? ",1" : ",0"))), c = this.getGrade();
        var f = n[c + 1][0] - i, g = f > 9 ? f : "0" + f;
        wx.setStorageSync("levelname", n[c][2]), r = this.getOptionData(e, i), this.setData({
            questionLevel: i + 1,
            questionTitle: h ? "？？？" : s[0],
            questionAnswer: h ? s[1] : "",
            coinNum: o,
            levelName: n[c][2],
            nextLevelName: n[c + 1][2],
            levelGap: g,
            optionList: r,
            checkedOption: l,
            styleReset: "",
            userInfo: t.globalData.userInfo,
            styleAnswer: h ? "" : "opacity: 0;transform:scale(0.5,0.5);"
        });
    },
    getGrade: function() {
        for (var t = 0, e = 0, o = n.length; e < o; e++) {
            var s = n[e];
            if (i >= s[0] && i < s[1]) {
                t = e;
                break;
            }
        }
        return t;
    },
    getOptionData: function(t, e) {
        for (var n = h ? t[i][0] : t[i][1], o = e + 1, s = 0; n.length < 21; ) {
            var a = t[o];
            a ? a = a[1] : (a = t[s][1], s++), o++, n = (n += a).replace(/(\(.*?\))/g, "");
        }
        return n = n.split("").slice(0, 21), n = n.shuffle();
    },
    searchSubStr: function(t, e) {
        for (var n = [], i = t.indexOf(e); i > -1; ) n.push(i), i = t.indexOf(e, i + 1);
        return n;
    },
    noticeTap: function() {
        if (o < 20) return wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "金币不足，点击右侧加币按钮获取金币！",
            success: function(t) {
                t.confirm;
            }
        }), !1;
        var t = Object.keys(l), e = (h ? s[0] : a).concat().split("");
        t.forEach(function(t, n) {
            var i = e.indexOf(r[t]);
            i <= -1 ? delete l[t] : e.splice(i, 1);
        });
        var n = Math.floor(e.length / 2) || -1, i = this;
        (d <= 0 ? e.slice(-n) : e.slice(0, -n)).forEach(function(t, e) {
            for (var n = i.searchSubStr(r, t), o = 0, s = n.length; o < s; o++) {
                var a = n[o];
                if (!l[a]) {
                    l[a] = !0;
                    break;
                }
            }
        }), o -= 20, wx.setStorageSync("coins", o), d++, this.setData({
            coinNum: o,
            checkedOption: l
        }), this.showTapStyle("noticeHover"), this.checkAnswer();
    },
    showTapStyle: function(t) {
        var e = this, n = {};
        n[t] = "btn-hover", this.setData(n), setTimeout(function() {
            n[t] = "", e.setData(n);
        }, 100);
    },
    shareTap: function() {},
    optionTap: function(t) {
        var e = t.currentTarget.dataset.index;
        l[e] ? delete l[e] : l[e] = !l[e], this.setData({
            checkedOption: l
        }), this.checkAnswer();
    },
    checkAnswer: function() {
        var t = [], e = Object.keys(l), u = {};
        f.animationOption = {};
        var d = h ? s[0] : a;
        if (e.length >= d.length) {
            var g = wx.createAnimation({
                duration: 200,
                timingFunction: "ease"
            });
            if (g.opacity(1).step(), e.forEach(function(e, n) {
                t.push(r[e]);
                var i = wx.createAnimation({
                    duration: 450,
                    timingFunction: "ease"
                }), o = 375 - (e % 7 * 90 + 102), s = 255 - (646 + 100 * Math.floor(e / 7));
                i.scale(.5).opacity(0).translate(o, s).step(), u[e] = i.export(), f.animationOption[e] = g;
            }), t.sort().join("") == d.split("").sort().join("")) {
                y = this, i += 1, wx.setStorageSync("level", i);
                var v, w = this.getGrade();
                if (w > c) {
                    var p = n[w];
                    v = {
                        maskTitle: "晋升" + p[2] + "！",
                        maskText: "成功晋升" + p[2] + "，\n孺子可教也！",
                        maskNum: 20
                    };
                } else v = {
                    maskTitle: "然也！",
                    maskText: s[0] + ",\n" + s[1],
                    maskNum: 5
                };
                o += v.maskNum, wx.setStorageSync("coins", o), this.setData(Object.assign({
                    tipsshow: "aShow",
                    questionAnswer: a
                }, v));
                var m = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease",
                    delay: 420
                });
                m.opacity(1).scale(1, 1).step();
                var x = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out",
                    delay: 1e3
                });
                x.opacity(1).step(), setTimeout(function() {
                    y.setData({
                        animationOption: u,
                        animationAnswer: h ? null : m.export(),
                        animationMask: x.export()
                    });
                }, 50), h && setTimeout(function() {
                    y.setData({
                        questionTitle: s[0]
                    });
                }, 450), setTimeout(function() {
                    y.setData({
                        styleAnswer: ""
                    });
                }, 1300);
            } else {
                l = {};
                var y = this;
                setTimeout(function() {
                    y.setData({
                        checkedOption: l
                    });
                }, 300);
            }
        }
    },
    data: {
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId,
        isGG: !0
    },
    onLoad: function(t) {
        this.goLevel();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "/pages3/index/index"
        };
    },
    startGame: function() {
        wx.navigateTo({
            url: "../game/game"
        });
    },
    showPop: function() {
        this.setData({
            styleMask: ""
        }), this.setData({
            animationOption: f.animationOption
        });
    },
    hidePop: function() {
        this.setData({
            tipsshow: "",
            styleMask: "",
            animationOption: f.animationOption
        }), this.goLevel();
    },
    getToday: function() {
        var t = new Date();
        return t.getFullYear() + t.getMonth() + t.getDate();
    },
    isFrist: function(t) {
        var e = this.getToday();
        return wx.getStorageSync(t) != e;
    },
    createVideoAd: function() {
        var t = this;
        if (wx.createRewardedVideoAd) {
            if (this.videoAd) return void this.videoAd.show().catch(function() {
                t.videoAd.load().then(function() {
                    return t.videoAd.show();
                }).catch(function(e) {
                    t.success && t.success();
                });
            });
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: wx.gg.videoId
            }), this.errFun = function(e) {
                t.success && t.success();
            }, this.closeFun = function(e) {
                e && e.isEnded ? t.success && t.success() : t.fail && t.fail();
            }, this.videoAd.onError(this.errFun), this.videoAd.onClose(this.closeFun), this.videoAd.show().catch(function() {
                t.videoAd.load().then(function() {
                    return t.videoAd.show();
                }).catch(function(e) {
                    t.success && t.success();
                });
            });
        } else this.success && this.success();
    },
    showVideoAd: function(t, e) {
        this.success = t, this.fail = e, this.createVideoAd();
    },
    videoAddCoins: function(t) {
        var e = this, n = this.isFrist("addcoins"), i = Number(wx.getStorageSync("addcoins_count") || 0);
        n && (wx.setStorageSync("addcoins_count", 0), i = 0), i >= 9 ? wx.showToast({
            title: "今日视频已看完，明天可以继续哦！",
            icon: "none",
            duration: 2e3
        }) : (this.success = function() {
            var t = e.getToday();
            wx.setStorageSync("addcoins", t), wx.setStorageSync("addcoins_count", ++i), e.videoAddCoins2();
        }, this.fail = function() {
            wx.showToast({
                title: "您还没看完视频广告哦！",
                icon: "none",
                duration: 2e3
            });
        }, wx.showModal({
            title: "提示",
            content: "看完视频广告，可以获得50金币哦！",
            success: function(t) {
                t.confirm ? e.showVideoAd(e.success, e.fail) : t.cancel;
            }
        }));
    },
    videoAddCoins2: function() {
        o += 50, wx.setStorageSync("coins", o), wx.showToast({
            title: "获得50金币！",
            icon: "success",
            duration: 1e3
        }), this.setData({
            coinNum: o
        });
    }
}));