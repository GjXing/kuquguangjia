function t(t, i, a) {
    return i in t ? Object.defineProperty(t, i, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = a, t;
}

var i = require("../../modules/Player"), a = require("../../dati_comm/modules/FightRoom"), e = require("../../dati_comm/libs/network/Conns"), n = require("../../dati_comm/modules/share"), o = require("../../dati_comm/modules/LoginJump"), h = require("../../dati_comm/modules/buttonDisabler"), s = require("../../dati_comm/sdata/SDataID2.js"), l = void function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (i[a] = t[a]);
    i.default = t;
}(require("../../dati_comm/modules/AppColor.js")), r = 0, g = void 0, m = 0, f = {
    wndname: "prepare",
    display: !1,
    wndAlpha: 1,
    wndPosX: 0,
    items: [],
    waittxtv: !1,
    fangqiv: !1,
    startv: !1,
    yqhaoyou: !1,
    showStart: !1,
    readytxtv: !1,
    PlyCount: 1,
    leftPly: [ {
        v: !0,
        icon: null,
        name: ""
    }, {
        v: !0,
        icon: null,
        name: ""
    }, {
        v: !0,
        icon: null,
        name: ""
    } ],
    rightPly: [ {
        v: !0,
        icon: null,
        name: ""
    }, {
        v: !0,
        icon: null,
        name: ""
    }, {
        v: !0,
        icon: null,
        name: ""
    } ],
    q_type: {
        w: 314,
        h: 78,
        split: [ 52, 52, 0 ],
        img: [ "../../imgs/fight/q_d_3.png", "../../imgs/fight/q_d_2.png", "../../imgs/fight/q_d_1.png" ]
    },
    srcArr: [ "../../imgs/fight/wait_1.png", "../../imgs/fight/wait_2.png", "../../imgs/fight/wait_3.png", "../../imgs/fight/wait_4.png" ],
    waiteHeater: [ "../../imgs/fight/h_1.png", "../../imgs/fight/h_2.png", "../../imgs/fight/h_3.png", "../../imgs/fight/h_4.png", "../../imgs/fight/h_5.png", "../../imgs/fight/h_6.png" ],
    an_1: null
};

Page({
    data: {
        animation: "",
        data: f
    },
    onShow: function() {
        var a = this;
        this._SetEmptyPly(f.rightPly[0]), this.setData(t({}, "data.dengdaidh", "dengdaidh")), 
        this.setData(t({}, "data.headframe", i.Player.HeadFrame)), setTimeout(function() {
            a.setData(t({}, "data.top_VS", "top_VS"));
        }, 500), r = 0, l && clearInterval(l), l = setInterval(function() {
            e.WorldConn.Connected() ? r = 0 : ++r > 3 && (clearInterval(l), l = null, getApp().globalData.ServerLogin.ShowGoHomeBox());
        }, 3e3), (0, o.AutoJump)("prepare"), this.NeedExitFight = !0, this._BindEvts(), 
        this.OnShowDone(), this.OnJoin(), this.OnLeave(), this.OnStart(), this.OnFightReady(), 
        this.OnEnterRoom();
    },
    onLoad: function(t) {
        this._SetEmptyPly(f.rightPly[0]), (0, o.AutoJump)("prepare", t);
        for (var i = 0; i < 3; i++) f.leftPly[i].v = !1, f.rightPly[i].v = !1;
        this._UpdatePlys();
    },
    offEvts: function() {
        a.FightRoom.EvtReady.Off(this.OnFightReady), a.FightRoom.EvtStart.Off(this.OnStart), 
        a.FightRoom.EvtAJoin.Off(this.OnAJoin), a.FightRoom.EvtJoin.Off(this.OnJoin), a.FightRoom.EvtLeave.Off(this.OnLeave), 
        a.FightRoom.EvtEnterRoom.Off(this.OnEnterRoom);
    },
    onUnload: function() {
        this.onHide();
    },
    onHide: function() {
        this._SetEmptyPly(f.rightPly[0]), l && (clearInterval(l), l = null), g && (clearInterval(g), 
        g = null), this.offEvts();
        for (var t = 0; t < 3; t++) f.leftPly[t].v = !1, f.rightPly[t].v = !1;
        this._UpdatePlys(), this.NeedExitFight && a.FightRoom.LeaveRoom(), f = {
            wndname: "ready",
            display: !1,
            wndAlpha: 1,
            wndPosX: 0,
            waittxtv: !1,
            fangqiv: !1,
            startv: !1,
            yqhaoyou: !1,
            readytxtv: !1,
            PlyCount: 1,
            leftPly: [ {
                v: !0,
                icon: null,
                name: ""
            }, {
                v: !0,
                icon: null,
                name: ""
            }, {
                v: !0,
                icon: null,
                name: ""
            } ],
            rightPly: [ {
                v: !0,
                icon: null,
                name: ""
            }, {
                v: !0,
                icon: null,
                name: ""
            }, {
                v: !0,
                icon: null,
                name: ""
            } ],
            q_type: {
                w: 314,
                h: 78,
                split: [ 52, 52, 0 ],
                img: [ "../../imgs/fight/q_d_3.png", "../../imgs/fight/q_d_2.png", "../../imgs/fight/q_d_1.png" ]
            },
            srcArr: [ "../../imgs/fight/wait_1.png", "../../imgs/fight/wait_2.png", "../../imgs/fight/wait_3.png", "../../imgs/fight/wait_4.png" ],
            waiteHeater: [ "../../imgs/fight/h_1.png", "../../imgs/fight/h_2.png", "../../imgs/fight/h_3.png", "../../imgs/fight/h_4.png", "../../imgs/fight/h_5.png", "../../imgs/fight/h_6.png" ],
            an_1: null
        };
    },
    onShareAppMessage: function() {
        return this.NeedExitFight = !1, 9 == a.FightRoom.CurrMode ? n.share.getTeamShareMessage(a.FightRoom.InviteCode) : n.share.getPKShareMessage(a.FightRoom.InviteCode);
    },
    _SetEmptyPly: function(t) {
        t.v = !0, t.icon = null, t.name = "???", t.uid = "";
    },
    OnShowDone: function() {
        var e = this;
        if (m = 0, console.log((0, s.txt)(2044)), this.setData({
            zzpp: (0, s.txt)(2044)
        }), this.setData({
            ppwc: (0, s.txt)(2046)
        }), this.setData({
            zzpp_a: !0
        }), this.setData({
            ppwc_b: !1
        }), clearInterval(g), g = setInterval(function() {
            ++m > 3 && (m = 0);
            for (var t = "", i = 0; i < m; i++) t += ".";
            this.setData({
                zzpp: (0, s.txt)(2044) + t
            });
        }.bind(this), 500), a.FightRoom.CurrPairWnd = this, a.FightRoom.CurrMode, f.leftPly[0].v = !0, 
        f.leftPly[0].icon = i.Player.IconUrl(), f.leftPly[0].name = i.Player.Name(), f.leftPly[0].hf = i.Player.IsVip, 
        f.leftPly[0].k = i.Player.HeadFrame, this._SetEmptyPly(f.rightPly[0]), this.setData(t({}, "data.PlyCount", a.FightRoom.Is3V3 ? 3 : 1)), 
        a.FightRoom.Is3V3) for (n = 1; n < 3; n++) this._SetEmptyPly(f.leftPly[n]), this._SetEmptyPly(f.rightPly[n]); else for (n = 1; n < 3; n++) f.leftPly[n].v = !1, 
        f.rightPly[n].v = !1;
        for (var n = 0; n < 3; n++) f.leftPly[n].gifwait = !a.FightRoom.IsYaoQing, f.rightPly[n].gifwait = !0;
        this._UpdatePlys(), this._HideAllST(), setTimeout(function() {
            e.setData(t({}, "data.waittxtv", !0));
        }, 500), this.setData(t({}, "data.fangqiv", !0)), this.setData(t({}, "data.yqhaoyou", a.FightRoom.IsYaoQing)), 
        this.setData(t({}, "data.showStart", !1));
    },
    _UpdatePlys: function() {
        this.setData(t({}, "data.leftPly", f.leftPly)), this.setData(t({}, "data.rightPly", f.rightPly));
    },
    _HideAllST: function() {
        this.setData(t({}, "data.waittxtv", !1)), this.setData(t({}, "data.fangqiv", !1)), 
        this.setData(t({}, "data.readytxtv", !1));
    },
    _BindEvts: function() {
        this.offEvts(), a.FightRoom.EvtReady.On(this, this.OnFightReady), a.FightRoom.EvtStart.On(this, this.OnStart), 
        a.FightRoom.EvtAJoin.On(this, this.OnAJoin), a.FightRoom.EvtJoin.On(this, this.OnJoin), 
        a.FightRoom.EvtLeave.On(this, this.OnLeave), a.FightRoom.EvtEnterRoom.On(this, this.OnEnterRoom);
    },
    _JoinPly: function(t, i, a) {
        for (var e = i.uid, n = i.name, o = 0; o < t.length; o++) if (t[o].uid == e || t[o].name == n) return;
        for (o = 0; o < t.length; o++) if (null == t[o].icon) return t[o].name = i.name, 
        t[o].icon = i.icon, t[o].uid = i.uid, t[o].hf = i.hf, void (t[o].k = i.k);
    },
    OnFightReady: function() {
        if (console.log("进入OnFightReady！！！"), !(a.FightRoom.Step < a.FightRoom.RoomStep.Ready)) {
            for (var i = 0; i < a.FightRoom.LeftPlys.length; i++) {
                var e = a.FightRoom.LeftPlys[i];
                this._JoinPly(f.leftPly, {
                    uid: e.uid,
                    name: e.name,
                    icon: e.iconurl,
                    hf: e.hf,
                    k: e.k
                }, !0);
            }
            this._UpdateRightPlys(), this._HideAllST(), this.setData(t({}, "data.readytxtv", !0));
        }
    },
    _UpdateRightPlys: function() {
        var i = this, e = 0, n = a.FightRoom.RightPlys.length;
        setTimeout(function(o) {
            var h = a.FightRoom.RightPlys[e];
            i._JoinPly(f.rightPly, {
                uid: h.uid,
                name: h.name,
                icon: h.iconurl,
                hf: h.hf,
                k: h.k
            }, !1), i._UpdatePlys();
            var s = wx.createAnimation({
                duration: 300,
                timingFunction: "linear"
            });
            s.translateX(-50).step(), i.setData(t({}, "data.ra1", s.export())), ++e, i.setData(t({}, "data.dengdaia", !1)), 
            setTimeout(function(a) {
                i.setData(t({}, "data.startv", !0));
            }, 300), e >= n || setTimeout(function(o) {
                var h = a.FightRoom.RightPlys[e];
                i._JoinPly(f.rightPly, {
                    uid: h.uid,
                    name: h.name,
                    icon: h.iconurl,
                    hf: h.hf,
                    k: h.k
                }, !1), i._UpdatePlys();
                var s = wx.createAnimation({
                    duration: 300,
                    timingFunction: "linear",
                    delay: 100
                });
                s.translateX(-50).step(), i.setData(t({}, "data.ra2", s.export())), ++e >= n || setTimeout(function(n) {
                    var o = a.FightRoom.RightPlys[e];
                    i._JoinPly(f.rightPly, {
                        uid: o.uid,
                        name: o.name,
                        icon: o.iconurl,
                        hf: o.hf,
                        k: o.k
                    }, !1), i._UpdatePlys();
                    var h = wx.createAnimation({
                        duration: 300,
                        timingFunction: "linear",
                        delay: 100
                    });
                    h.translateX(-50).step(), i.setData(t({}, "data.ra3", h.export()));
                }, 200);
            }, 200);
        }, 100);
    },
    OnJoin: function() {
        for (var i = a.FightRoom.LeftJoin, e = a.FightRoom.RightJoin, n = 0; n < i.length; n++) this._JoinPly(f.leftPly, i[n], !0);
        for (n = 0; n < e.length; n++) this._JoinPly(f.rightPly, e[n], !1);
        for (var o = 0, n = 0; n < f.leftPly.length; n++) {
            var h = f.leftPly[n];
            h.v && h.icon && o++;
        }
        this.setData(t({}, "data.showStart", 2 == o && 9 == a.FightRoom.CurrMode)), this.setData(t({}, "data.yqhaoyou", a.FightRoom.IsYaoQing && o < 3)), 
        this._UpdatePlys();
    },
    OnEnterRoom: function() {
        console.log("进入战斗页面", a.FightRoom.Step < a.FightRoom.RoomStep.EnterRoom), a.FightRoom.Step < a.FightRoom.RoomStep.EnterRoom || getCurrentPages().length < 2 || (this.NeedExitFight = !1, 
        getApp().globalData.wnds.Wnd_Fight.Show());
    },
    OnLeave: function() {
        for (var t = a.FightRoom.LeftJoin, i = a.FightRoom.RightJoin, e = 1; e < f.leftPly.length; e++) if (f.leftPly[e].v) {
            for (var n = !1, o = f.leftPly[e].uid, h = 0; h < t.length; h++) if (t[h].uid == o) {
                n = !0;
                break;
            }
            n || this._SetEmptyPly(f.leftPly[e]);
        }
        for (e = 0; e < f.rightPly.length; e++) if (f.rightPly[e].v) {
            for (var n = !1, o = f.rightPly[e].uid, h = 0; h < i.length; h++) if (i[h].uid == o) {
                n = !0;
                break;
            }
            n || this._SetEmptyPly(f.rightPly[e]);
        }
        this.OnJoin();
    },
    OnStart: function() {
        a.FightRoom.Step < a.FightRoom.RoomStep.Start || this._HideAllST();
    },
    Back: function() {
        e.WorldConn.Close(), getCurrentPages().length > 1 && wx.navigateBack({
            delta: 1
        });
    },
    OnAJoin: function() {
        this.setData({
            zzpp_a: !1
        }), this.setData({
            ppwc_b: !0
        }), clearInterval(g);
    },
    OnStartClick: function(i) {
        var a = this;
        h.buttonDisabler.canClick() && (this.setData(t({}, "data.showStart", !1)), e.WorldConn.Request({
            n: "start"
        }, function(t) {
            a.ParseStartResult(t);
        }));
    },
    ParseStartResult: function(i) {
        var a = i.r;
        this.setData(t({}, "data.showStart", 2 == a));
    },
    ontips: function() {
        var a = [], e = i.Player.Level1;
        e = parseInt(e) + 1 + "", SDTips.Foreach(function(t, i) {
            var n = {
                Id: i[SDTips.I_ID]
            }, o = n.Id.toString();
            "1" == o[0] ? (n = {
                Notes: i[SDTips.I_Notes]
            }, a.push(n)) : o[0] == e && (n = {
                Notes: i[SDTips.I_Notes]
            }, a.push(n));
        });
        var n = Math.floor(Math.random() * a.length);
        this.setData(t({}, "data.items", a[n]));
    },
    OnFangqiClick: function(t) {
        h.buttonDisabler.canClick() && this.Back();
    }
});