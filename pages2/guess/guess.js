function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp();

Page((e = {
    data: {
        id: 0,
        type: 0,
        puzzle_level: 0,
        puzzle_level_show: 0,
        question: "",
        answer: "",
        tipes: "",
        wordLength: 0,
        candidates: [],
        candiCopys: [],
        wordString: [],
        wordIndex: [],
        isSuccess: !1,
        isShowAnser: !1,
        hideTime: 0,
        isShareFlag: !1,
        interstitialAd: null,
        videoAd: null,
        coolDown: 0,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId,
        isGG: !0
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "题目加载中",
            mask: !0
        }), this.initData(t.id, t.type), this.setData({
            isIPX: a.globalData.isIPX
        });
    },
    initData: function(t, e) {
        var s = this;
        switch (Number(e)) {
          case 1:
            var i = a.globalData.puzzle_data_01[t], n = a.globalData.answer_data_01;
            break;

          case 2:
            var i = a.globalData.puzzle_data_02[t], n = a.globalData.answer_data_02;
            break;

          case 3:
            var i = a.globalData.puzzle_data_03[t], n = a.globalData.answer_data_03;
            break;

          case 4:
            var i = a.globalData.puzzle_data_04[t], n = a.globalData.answer_data_04;
            break;

          case 5:
            var i = a.globalData.puzzle_data_05[t], n = a.globalData.answer_data_05;
        }
        var o = i.question, r = i.tips, l = i.answer, c = l.length, d = function(t, e) {
            return Math.random() > .5 ? -1 : 1;
        };
        n = n.sort(d);
        for (var u = [], h = 0; h < l.length; h++) u[h] = l.charAt(h);
        var g = 15 - l.length;
        u.push.apply(u, n.slice(0, g)), u.sort(d);
        for (var w = [], v = [], f = 0; f < c; f++) w[f] = "", v[f] = 0;
        try {
            var p = 200 * (Number(e) - 1) + Number(t) + 1;
            s.setData({
                puzzle_level: Number(t) + 1,
                puzzle_level_show: p,
                type: e,
                question: o,
                answer: l,
                hint: r,
                wordLength: c,
                candidates: u,
                candiCopys: u,
                wordString: w,
                wordIndex: v
            }), s.setNavTitle("第" + s.data.puzzle_level_show + "关");
        } catch (t) {
            console.log("Error is " + t.message);
        }
        wx.hideLoading();
    },
    setNavTitle: function(t) {
        wx.setNavigationBarTitle({
            title: t
        });
    },
    onReady: function() {
        this.iconAnimation = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease-in-out",
            success: function(t) {
                console.log("创建动画成功： " + t);
            }
        });
        var t = !0;
        setInterval(function() {
            this.iconAnimation.scale(.85).step().scale(1).step(), t = !t, this.setData({
                iconAnimation: this.iconAnimation.export()
            });
        }.bind(this), 1e3), this.showInsertAd();
    },
    showInsertAd: function() {
        wx.createInterstitialAd && setTimeout(function() {
            wx.createInterstitialAd({
                adUnitId: wx.gg.insertId
            }).show().catch(function(t) {});
        }, 15e3);
    },
    removeDuplicates: function(t) {
        var e = {}, a = [];
        for (var s in t) e[t[s]] = !0;
        for (var i in e) a.push(i);
        return a;
    },
    gotoNext: function(t) {
        wx.showLoading({
            title: "题目加载中",
            mask: !0
        });
        var e = Number(this.data.puzzle_level);
        this.initData(e, this.data.type), this.setData({
            isSuccess: !1
        });
    },
    closeAnser: function() {
        this.setData({
            isShowAnser: !1
        });
    },
    clearWord: function(e) {
        var a, s = e.currentTarget.dataset.pos, i = "wordString[" + s + "]", n = "wordIndex[" + s + "]", o = "candidates[" + this.data.wordIndex[s] + "]";
        this.setData((a = {}, t(a, i, ""), t(a, n, 0), t(a, o, this.data.candiCopys[this.data.wordIndex[s]]), 
        a));
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
    showAnswer: function(t) {
        var e = this, a = this.isFrist("answer"), s = Number(wx.getStorageSync("answer_count") || 0);
        a && (wx.setStorageSync("answer_count", 0), s = 0), this.success = function() {
            var a = e.getToday();
            wx.setStorageSync("answer", a), wx.setStorageSync("answer_count", ++s), e.showAnswer2(t);
        }, this.fail = function() {
            wx.showToast({
                title: "您还没看完视频广告哦！",
                icon: "none",
                duration: 2e3
            });
        }, !this.data.isGG || 1 != s && 10 != s && 20 != s && 30 != s && 40 != s && 50 != s && 60 != s && 70 != s && 80 != s && 100 != s ? this.success() : wx.showModal({
            title: "提示",
            content: "看完视频广告，可以【查看答案】哦！",
            success: function(t) {
                t.confirm ? e.showVideoAd(e.success, e.fail) : t.cancel;
            }
        });
    },
    showAnswer2: function() {
        this.setData({
            isShowAnser: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "pages2/index/index"
        };
    },
    bindFill: function(e) {
        for (var a = e.currentTarget.dataset.loc, s = "candidates[" + a + "]", i = "", n = 0; n < this.data.wordString.length; n++) i += this.data.wordString[n];
        if (i.length < this.data.answer.length) {
            for (n = 0; n < this.data.wordLength; n++) if ("" == this.data.wordString[n]) {
                var o, r = "wordString[" + n + "]", l = "wordIndex[" + n + "]", s = "candidates[" + a + "]", c = this.data.candidates[a];
                console.log("xString is " + c), this.setData((o = {}, t(o, r, c), t(o, l, a), t(o, s, ""), 
                o));
                break;
            }
            this.isWin();
        }
    },
    isWin: function() {
        for (var t = "", e = 0; e < this.data.wordString.length; e++) t += this.data.wordString[e];
        if (t.length == this.data.answer.length) if (t == this.data.answer) {
            console.log("答案正确"), this.setData({
                isSuccess: !0
            });
            var s = Number(this.data.puzzle_level), i = a.globalData.levelSaveData, n = wx.getStorageSync(i);
            if (console.log("1: vaule is " + n[this.data.type]), console.log("1: vaule_list is " + JSON.stringify(n)), 
            s > n[this.data.type]) {
                console.log("save data "), n[this.data.type] = s, console.log("2: vaule is " + n[this.data.type]), 
                console.log("2: vaule_list is " + JSON.stringify(n)), wx.setStorage({
                    key: i,
                    data: n
                });
                var o = wx.getStorageSync(a.globalData.gameSaveData), r = Number(o.level);
                if (r < a.globalData.maxLevel) {
                    var l = Number(o.exp) + Number(a.globalData.levelup_addExp), c = a.globalData.levelUpdateLimited[r];
                    l >= c && (l -= c, r = Number(r) + 1, o.level = r), o.exp = l;
                }
                var d = Number(o.gold) + Number(a.globalData.levelup_addGold);
                o.gold = d, wx.setStorage({
                    key: a.globalData.gameSaveData,
                    data: o
                });
            }
        } else console.log("答案错误"), wx.vibrateLong({}), wx.showToast({
            title: "再想想...",
            icon: "none"
        });
    },
    gotoLevel: function(t) {
        var e = a.globalData.currentType, s = wx.getStorageSync(e);
        wx.navigateTo({
            url: "../level/level?id=1&type=" + s
        });
    },
    isLevelUp: function(t, e) {},
    saveGameData: function(t, e, a) {},
    toHelpHelp: function() {
        wx.showToast({
            title: "加油，答案马上就要出来了",
            icon: "none"
        });
    }
}, t(e, "onShareAppMessage", function() {
    var t = a.globalData.userInfo;
    return console.log(JSON.stringify(t)), t ? t.nickName + "邀请你帮忙猜一猜" : "你的好友邀请帮忙", 
    {
        title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
        path: "pages2/index/index"
    };
}), t(e, "onShow", function() {
    console.log("画面显示");
    var t = this;
    if (this.data.isShareFlag) {
        var e = new Date(), a = e - this.hideTime;
        console.log("显示时间为： " + e), console.log("时间间隔为： " + a), a > 8e3 ? this.setData({
            isShowAnser: !0,
            isShareFlag: !1
        }) : (wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            var e = [ "分享到群才能查看答案哦", "分享到不同群才可以哦", "分享到群才可以哦" ];
            e.sort(function(t, e) {
                return Math.random() > .5 ? -1 : 1;
            }), wx.hideLoading(), wx.showModal({
                title: "分享失败",
                content: e[0],
                showCancel: !0,
                cancelText: "取消",
                confirmText: "确定",
                success: function(e) {
                    e.confirm ? (console.log("用户点击确定"), t.shareGame()) : e.cancel && (console.log("用户点击取消"), 
                    t.shareGame());
                }
            });
        }, 1200));
    }
}), t(e, "shareGame", function() {
    console.log("方法a"), this.setData({
        isShareFlag: !1
    });
}), t(e, "onHide", function() {
    console.log("画面隐藏"), this.hideTime = new Date(), console.log("当前时间为 ： " + this.hideTime);
}), e));