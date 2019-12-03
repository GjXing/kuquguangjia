function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

var t = require("../../modules/Player"), o = (require("../../dati_comm/libs/network/Conns"), 
require("../../dati_comm/modules/buttonDisabler")), a = require("../../dati_comm/modules/FightRoom"), n = e(require("../../modules/LocalData")), r = (e(require("../../dati_comm/modules/DataSecurity")), 
require("../../dati_comm/modules/share"), null), s = {
    seconds: 100
};

Page({
    data: {
        data: s
    },
    onLoad: function(e) {
        this.setData({
            left_name: t.Player.Name(),
            left_Url: t.Player.IconUrl(),
            right_name: a.FightRoom.RightPlys[0].name,
            right_Url: a.FightRoom.RightPlys[0].iconurl,
            opa: 0
        }), this.OnShowDone();
    },
    OnShowDone: function() {
        if (r = a.FightRoom.Chengji) {
            console.log("cjcjcjcjc", r);
            var e = a.FightRoom.IsA ? r.afen : r.bfen, t = a.FightRoom.IsA ? r.bfen : r.afen, o = a.FightRoom.IsA ? r.anum : r.bnum, n = a.FightRoom.IsA ? r.bnum : r.anum;
            this.setData({
                left_fen: e,
                right_fen: t,
                left_dadui: o,
                right_dadui: n
            });
            var s = a.FightRoom.IsA ? 1 == r.win : 1 != r.win;
            s && this.finghtjl(), this.setData({
                win_sf: s,
                opa: 1
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = n.GetNumber(n.ParamName.PASS_LEVELS);
        return getApp().globalData.isFromCheckShare = !0, {
            title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "/pages/index/index",
            success: function(e) {
                var o = parseInt(new Date().getTime() / 864e5), a = n.GetNumber(n.ParamName.SHARE_TIME), r = n.GetNumber(n.ParamName.SHARE_COUNT);
                if (o == a ? r += 1 : r = 1, n.Set(n.ParamName.SHARE_TIME, o), n.Set(n.ParamName.SHARE_COUNT, r), 
                t < 200) {
                    if (console.log("onshare success1"), r > 10) return void ("" == wx.getStorageSync("ShowTipsPre100") && (wx.setStorage({
                        key: "ShowTipsPre100",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取十次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (t < 400) {
                    if (console.log("onshare success2"), r > 8) return void ("" == wx.getStorageSync("ShowTipsPre200") && (wx.setStorage({
                        key: "ShowTipsPre200",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取八次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (t < 600) {
                    if (console.log("onshare success3"), r > 6) return void ("" == wx.getStorageSync("ShowTipsPre300") && (wx.setStorage({
                        key: "ShowTipsPre300",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取六次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (t < 800) {
                    if (console.log("onshare success3"), r > 4) return void ("" == wx.getStorageSync("ShowTipsPre400") && (wx.setStorage({
                        key: "ShowTipsPre400",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取四次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (console.log("onshare success3"), r > 2) return void ("" == wx.getStorageSync("ShowTipsPreOther") && (wx.setStorage({
                    key: "ShowTipsPreOther",
                    data: "show"
                }), wx.showModal({
                    title: "提示",
                    content: "您一天只能获取两次分享奖励哦！！！",
                    showCancel: !1
                })));
                var s = n.GetNumber(n.ParamName.TOTAL_POINT);
                s += 30, n.Set(n.ParamName.TOTAL_POINT, s), that.setData({
                    total_point: s
                }), wx.showToast({
                    title: "获得30金币",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(e) {}
        };
    },
    zlyj: function() {
        o.buttonDisabler.canClick(2e3) && ((0, a.StopFight)(), a.FightRoom.ShowReadyWnd(!0), 
        a.FightRoom.ConnGame(function(e) {
            e ? a.FightRoom.RePK() : (wx.showToast({
                title: "网络故障，请稍后再试.",
                icon: "none",
                duration: 2e3
            }), getCurrentPages().length > 1 && wx.navigateBack({
                delta: 1
            }));
        }));
    },
    finghtjl: function() {
        var e = parseInt(new Date().getTime() / 864e5), t = parseInt(n.GetNumber(n.ParamName.LAST_FINGHT) / 864e5);
        console.log("Daysb", t), 0 != t && "0" != t || (e -= 1, n.Set(n.ParamName.LAST_FINGHT, new Date().getTime())), 
        console.log("Daysa", e), console.log("Daysb", t), e - t >= 1 && n.Set(n.ParamName.FINGHT_COUNT, 0);
        var o = parseInt(n.GetNumber(n.ParamName.FINGHT_COUNT));
        o < 3 ? (o += 1, n.Set(n.ParamName.TOTAL_POINT, n.GetNumber(n.ParamName.TOTAL_POINT) + 20), 
        n.Set(n.ParamName.FINGHT_COUNT, o), wx.showToast({
            title: "每日对战获胜+20金币(" + o + "/3)",
            icon: "none",
            duration: 2e3
        }), parseInt(n.GetNumber(n.ParamName.LAST_FINGHT)), n.Set(n.ParamName.LAST_FINGHT, new Date().getTime())) : 3 == o && (o += 1);
    }
});