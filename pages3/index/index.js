function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e, n = getApp();

Page((e = {
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: !1,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId
    },
    onLoad: function() {
        var t = this, e = wx.getStorageSync("levelname") || "书童";
        this.setData({
            levelName: e
        }), wx.login({
            success: function(e) {
                e.code ? wx.getUserInfo({
                    success: function(e) {
                        n.globalData.userInfo = e.userInfo, t.setData({
                            userInfo: n.globalData.userInfo,
                            hasUserInfo: !0
                        });
                    },
                    fail: function(e) {
                        t.setData({
                            userInfo: {
                                avatarUrl: "../assets/img/photo.png"
                            },
                            hasUserInfo: !1
                        });
                    }
                }) : console.log("登录失败！" + e.errMsg);
            }
        });
    },
    onReady: function() {
        this.showInsertAd(), this.showIFav();
    },
    showInsertAd: function() {
        wx.createInterstitialAd && setTimeout(function() {
            wx.createInterstitialAd({
                adUnitId: wx.gg.insertId
            }).show().catch(function(t) {});
        }, 15e3);
    },
    showIFav: function() {
        var t = this;
        this.setData({
            showIfa: !0
        }), setTimeout(function() {
            t.setData({
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
        var t = wx.getStorageSync("levelname") || "书童";
        this.setData({
            levelName: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    startGame: function() {
        this.showTapStyle("startHover"), wx.navigateTo({
            url: "/pages3/game/game"
        });
    }
}, t(e, "onShareAppMessage", function(t) {
    return console.log(t, 22), "button" === t.from && console.log(t.target), {
        title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
        path: "/pages3/index/index",
        success: function(t) {},
        fail: function(t) {}
    };
}), t(e, "showTapStyle", function(t) {
    var e = this, n = {};
    n[t] = "btn-hover", this.setData(n), setTimeout(function() {
        n[t] = "", e.setData(n);
    }, 100);
}), e));