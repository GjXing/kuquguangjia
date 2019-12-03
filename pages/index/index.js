function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

var a, o = require("../../utils/Request.js"), n = require("../../modules/Player"), i = e(require("../../modules/LocalData")), r = require("../../dati_comm/modules/buttonDisabler"), s = require("../../dati_comm/modules/FightRoom"), c = (e(require("../../dati_comm/modules/MsgBox")), 
e(require("../../dati_comm/modules/Authorize"))), u = (require("../../modules/ServerLogin"), 
require("../../dati_comm/sdata/SDataID2"));

getApp(), require("../../utils/report.js"), Page((a = {
    data: {
        text: "开始",
        avatarUrl: "",
        nickname: "",
        showAd: !1,
        banner_sts: !1,
        showViewFlag: !0,
        cyxxk_tips: "领200金币",
        mx_tips: "领200金币",
        game_data_list: [],
        showModal: !0,
        numbers: "1",
        isNew: !0,
        showIfa: !0,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_feeds: wx.gg.feedsId
    },
    start: function() {
        var t = i.GetNumber(i.ParamName.PASS_LEVELS);
        getApp().globalData.wnds.Wnd_Play.CurrLevel = t, getApp().globalData.wnds.Wnd_Play.Show();
    },
    SaveUserInfo: function(t) {
        var e = this, a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = function() {
            e.setData({
                authorize: !1
            }), i.Set(i.ParamName.AUTHORIZE, 1);
        }, n = c.GetUserInfo(t);
        null != n ? (i.Set(i.ParamName.NICK_NAME, n.nickName), i.Set(i.ParamName.AVATOR_URL, n.avatarUrl), 
        i.Set(i.ParamName.AUTHORIZEOK, 1), this.setData({
            authorizeok: !0
        }), this.UpdateUserInfo(), o()) : a && o();
    },
    authorizeStart: function(t) {
        this.SaveUserInfo(t), this.start();
    },
    authorizeStartNumber: function(t) {
        this.SaveUserInfo(t), this.startNumber();
    },
    jielong: function() {
        getApp().globalData.wnds.Wnd_Jiecy.Show();
    },
    authorizeJielong: function(t) {
        this.SaveUserInfo(t), this.jielong();
    },
    authorizeDuizhan: function(t) {
        r.buttonDisabler.canClick(2e3) && (null != c.GetUserInfo(t) ? (this.SaveUserInfo(t, !1), 
        this.duizhan()) : 1 != i.GetNumber(i.ParamName.AUTHORIZEOK) ? wx.showToast({
            title: (0, u.txt)(2052),
            icon: "none",
            duration: 2e3
        }) : (wx.showToast({
            title: "网络故障，请稍后再试.",
            icon: "none",
            duration: 2e3
        }), getApp().globalData.LoginOK = !1));
    },
    duizhan: function() {
        (0, s.StopFight)(), s.FightRoom.ShowReadyWnd(), s.FightRoom.ConnGame(function(t) {
            t ? s.FightRoom.StartPK(1) : (wx.showToast({
                title: "网络故障，请稍后再试.",
                icon: "none",
                duration: 2e3
            }), getApp().globalData.LoginOK = !1);
        });
    },
    sel: function() {
        getApp().globalData.wnds.Wnd_Level.Show();
    },
    numbers: function() {
        getApp().globalData.wnds.Wnd_Number.Show();
    },
    help: function() {
        wx.navigateTo({
            url: "../sub_pages/help/help"
        });
    },
    more_cyxxk: function() {
        "" == wx.getStorageSync("CYXXK_POINT") && (wx.setStorageSync("CYXXK_POINT", "ok"), 
        i.Set(i.ParamName.TOTAL_POINT, i.GetNumber(i.ParamName.TOTAL_POINT) + 200), wx.showToast({
            title: "获得200金币",
            icon: "success",
            duration: 2e3
        }), this.setData({
            cyxxk_tips: "换个玩法"
        })), wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: "",
            path: "",
            success: function(t) {}
        }) : wx.showToast({
            title: "QQ版本过低",
            duration: 2e3
        });
    },
    more_mx: function() {
        "" == wx.getStorageSync("MX_POINT") && (wx.setStorageSync("MX_POINT", "ok"), i.Set(i.ParamName.TOTAL_POINT, i.GetNumber(i.ParamName.TOTAL_POINT) + 200), 
        wx.showToast({
            title: "获得200金币",
            icon: "success",
            duration: 2e3
        }), this.setData({
            mx_tips: "换个玩法"
        })), wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: "",
            path: "",
            success: function(t) {}
        }) : wx.showToast({
            title: "QQ版本过低",
            duration: 2e3
        });
    },
    AutoShowSignin: function() {
        parseInt(new Date().getTime() / 864e5) - parseInt(i.GetNumber(i.ParamName.LAST_SIGNIN) / 864e5) == 0 || (console.log("res.SDKVersion < '1.6.4'"), 
        getApp().globalData.wnds.Wnd_Signin.Show());
    },
    UpdateUserInfo: function() {
        this.setData({
            nickname: n.Player.Name(),
            avatarUrl: n.Player.IconUrl()
        });
    },
    onReady: function() {},
    onLoad: function(t) {
        if ("wxad" == t.from && getApp().aldstat.sendEvent("QQ广告", {
            vers: t.vers
        }), console.log("游戏版本", t.version), t.version) {
            var e = t.version;
            (0, o.request)({
                action: "versionControl",
                appid: "wxb1cccd25e84119ca",
                version_num: e
            }).then(function(e) {
                console.log("返回数据", e), e.data.data || (getApp().aldstat.sendEvent(t.from + "cyll_即将跳转"), 
                wx.navigateToMiniProgram({
                    appId: "wx53b1b4ab6fa0d044",
                    path: "/pages/index/index?from=cyll_gg",
                    extraData: {
                        foo: "bar"
                    },
                    success: function(e) {
                        getApp().aldstat.sendEvent(t.from + "cyll_成功");
                    },
                    fail: function(e) {
                        getApp().aldstat.sendEvent(t.from + "cyll_失败");
                    }
                })), e.data.data && wx.hideTabBar();
            });
        }
        this.options = t, this.UpdateUserInfo(), n = this, wx.getStorage({
            key: "GAME_DATA_LIST",
            success: function(t) {
                for (var e = t.data.length, a = 0; a < e; a++) "" == wx.getStorageSync(t.data[a].title) ? t.data[a].isClicked = !1 : t.data[a].isClicked = !0;
                n.setData({
                    game_data_list: t.data
                }), console.log("GAME_DATA_LIST", n.data.game_data_list);
            }
        }), n.setGameDataList(), this.setData({
            authorize: 1 != i.GetNumber(i.ParamName.AUTHORIZE),
            authorizeok: 1 == i.GetNumber(i.ParamName.AUTHORIZEOK)
        }), i.AutoUploadParams();
        try {
            var a = wx.getSystemInfoSync();
            console.log(a.model), -1 != a.model.search("iPhone") ? wx.setStorageSync("PHONE_MODEL", "1") : wx.setStorageSync("PHONE_MODEL", "2");
        } catch (t) {}
        i.GetNumber(i.ParamName.PASS_LEVELS) > 20 && this.setData({
            showAd: !0
        }), "" != wx.getStorageSync("CYXXK_POINT") && this.setData({
            cyxxk_tips: "换个玩法"
        }), "" != wx.getStorageSync("MX_POINT") && this.setData({
            mx_tips: "换个玩法"
        }), "" == wx.getStorageSync("lastTime") || Number(wx.getStorageSync("lastTime")), 
        "Y" == wx.getStorageSync("Click_Number") && this.setData({
            isNew: !1
        });
        var n = this;
    }
}, t(a, "onReady", function() {
    parseInt(new Date().getTime() / 864e5), parseInt(i.GetNumber(i.ParamName.LAST_SIGNIN) / 864e5), 
    (0, s.StopFight)(), this.AutoShowSignin();
}), t(a, "onShow", function() {
    var t = this;
    this.setData({
        showIfa: !0
    }), setTimeout(function() {
        t.setData({
            showIfa: !1
        });
    }, 4e3);
}), t(a, "closeIFav", function() {
    this.setData({
        showIfa: !1
    });
}), t(a, "onShareAppMessage", function(t) {
    return getApp().globalData.isFromCheckShare = !0, {
        title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
        path: "/pages/index/index",
        success: function(t) {},
        fail: function(t) {}
    };
}), t(a, "suggestReward", function(t) {
    if (t.detail.isFirst) {
        var e = Number(wx.getStorageSync(i.ParamName.TOTAL_POINT));
        e += t.detail.appInfo.coins, wx.setStorage({
            key: i.ParamName.TOTAL_POINT,
            data: e
        }), wx.showToast({
            title: "获得" + t.detail.appInfo.coins + "金币",
            icon: "success",
            duration: 2e3
        });
    }
}), t(a, "toOther", function(t) {
    var e = this, a = parseInt(t.currentTarget.id), o = e.data.game_data_list[a].title, n = e.data.game_data_list[a].coins;
    console.log("=======1"), "" == wx.getStorageSync(o) && (wx.setStorageSync(o, "ok"), 
    console.log("=======2"), i.GetNumber(i.ParamName.TOTAL_POINT), i.Set(i.ParamName.TOTAL_POINT, i.GetNumber(i.ParamName.TOTAL_POINT) + n), 
    wx.showToast({
        title: "获得" + n + "金币",
        icon: "success",
        duration: 2e3
    }));
}), t(a, "setGameDataList", function() {}), t(a, "startNumber", function() {
    wx.setStorage({
        key: "Click_Number",
        data: "Y"
    }), this.setData({
        isNew: !1
    }), wx.setStorageSync("NUMBER_LEVEL", ""), wx.navigateTo({
        url: "../numberPlay/numberPlay?id=" + wx.getStorageSync("SHOW_NUMBER")
    });
}), t(a, "toBox", function() {
    wx.navigateToMiniProgram({
        appId: "wx5d807e82b055f420",
        path: "/pages/index/index"
    });
}), t(a, "jump", function() {
    wx.setStorageSync("JUMP_LAST_TIME", new Date().getTime()), wx.reportAnalytics("click_ad" + wx.getStorageSync("SHOW_APP_ID"), {
        count: 1
    });
    var t = "";
    "" == wx.getStorageSync("SHOW_PAGE") || (t = wx.getStorageSync("SHOW_PAGE")), wx.navigateToMiniProgram ? (this.setData({
        banner_sts: !1
    }), wx.navigateToMiniProgram({
        appId: wx.getStorageSync("SHOW_APP_ID"),
        path: t,
        success: function(t) {
            if ("" == wx.getStorageSync("CLICK_USER" + wx.getStorageSync("SHOW_APP_ID"))) {
                wx.setStorage({
                    key: "CLICK_USER" + wx.getStorageSync("SHOW_APP_ID"),
                    data: "0"
                }), wx.reportAnalytics("click_success" + wx.getStorageSync("SHOW_APP_ID"), {
                    success_count: 1
                });
                var e = Number(wx.getStorageSync("SHOW_UP"));
                new Date().getTime() % e == 0 && wx.reportAnalytics("click_ad" + wx.getStorageSync("SHOW_APP_ID"), {
                    count: 1
                });
            }
        }
    })) : wx.showToast({
        title: "QQ版本过低",
        duration: 2e3
    });
}), a));