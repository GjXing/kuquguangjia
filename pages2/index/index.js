var e = getApp(), a = [ 0, 0, 0, 0, 0, 0, 0 ], t = {
    gold: 0,
    coin: 0,
    exp: 0,
    level: 1
}, o = [];

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        grade_title: "秀才",
        exp_percent: 0,
        isIPX: !1,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function() {
        var n = this;
        wx.showShareMenu({
            withShareTicket: !0
        }), e.globalData.userInfo ? this.setData({
            userInfo: e.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? e.userInfoReadyCallback = function(e) {
            n.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(a) {
                e.globalData.userInfo = a.userInfo, n.setData({
                    userInfo: a.userInfo,
                    hasUserInfo: !0
                });
            }
        });
        try {
            var s = e.globalData.levelSaveData, i = wx.getStorageSync(s);
            console.log("vaule is " + i), i ? o = i : (console.log("init SaveData...."), o = a, 
            wx.setStorage({
                key: s,
                data: a
            }), console.log("init SaveData finished ....."));
        } catch (e) {}
        try {
            var l = e.globalData.gameSaveData;
            console.log("gameSaveData saveData is " + l);
            var r = wx.getStorageSync(l);
            console.log("gameSaveData vaule is " + r), r || (console.log("init gamesavedata..."), 
            o = t, wx.setStorage({
                key: l,
                data: o
            }));
        } catch (e) {}
        var g = wx.getStorageSync(e.globalData.gameSaveData).exp, c = wx.getStorageSync(e.globalData.gameSaveData).level, u = e.globalData.gradeTitleName[c], f = g / Number(e.globalData.levelUpdateLimited[c]) * 100;
        console.log("_current_exp vaule is " + g), console.log("_current_exp vaule is " + g), 
        console.log("_exp_percent vaule is " + f), this.setData({
            exp_percent: f,
            grade_title: u,
            isIPX: e.globalData.isIPX
        });
    },
    getUserInfo: function(a) {
        console.log(a), e.globalData.userInfo = a.detail.userInfo, this.setData({
            userInfo: a.detail.userInfo,
            hasUserInfo: !0
        });
    },
    gotoLevel: function(a) {
        var t = a.currentTarget.dataset.pos, o = a.currentTarget.dataset.type;
        if (console.log("gotoLevel type:" + o), t > 5) wx.showToast({
            title: "暂未开放",
            icon: "none",
            duration: 1e3,
            mask: !0
        }); else {
            var n = e.globalData.currentType, s = o;
            wx.setStorage({
                key: n,
                data: s
            }), wx.navigateTo({
                url: "../level/level?id=" + t + "&type=" + o
            });
        }
    },
    gotoGame: function(a) {
        a.currentTarget.dataset.pos;
        var t = a.currentTarget.dataset.type, o = e.globalData.currentType;
        wx.setStorage({
            key: o,
            data: t
        });
        var o = e.globalData.levelSaveData, n = wx.getStorageSync(o)[t];
        wx.navigateTo({
            url: "../guess/guess?id=" + n + "&type=" + t
        });
    },
    onReady: function() {
        this.iconAnimation = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease-in-out",
            success: function(e) {
                console.log("创建动画成功： " + e);
            }
        });
        var e = !0;
        setInterval(function() {
            this.iconAnimation.scale(.85).step().scale(1).step(), e = !e, this.setData({
                iconAnimation: this.iconAnimation.export()
            });
        }.bind(this), 1e3), this.showInsertAd(), this.showIFav();
    },
    showInsertAd: function() {
        wx.createInterstitialAd && setTimeout(function() {
            wx.createInterstitialAd({
                adUnitId: wx.gg.insertId
            }).show().catch(function(e) {});
        }, 15e3);
    },
    showIFav: function() {
        var e = this;
        this.setData({
            showIfa: !0
        }), setTimeout(function() {
            e.setData({
                showIfa: !1
            });
        }, 4e3);
    },
    closeIFav: function() {
        this.setData({
            showIfa: !1
        });
    },
    onShow: function() {
        this.onLoad();
    },
    onShareAppMessage: function() {
        return {
            title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "pages2/index/index"
        };
    }
});