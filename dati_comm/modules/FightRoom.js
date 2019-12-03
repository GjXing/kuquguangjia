function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e() {
    d.Stop(), n.WorldConn.Close();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.StopFight = exports.FightRoom = void 0;

var i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), n = require("../libs/network/Conns"), s = require("../libs/network/UIEvent.js"), o = require("../../modules/Player.js"), a = require("../sdata/SDataID2"), r = require("../libs/network/loginLoading"), h = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../modules/MsgBox")), l = require("../../utils/util"), u = Math.round(9999 * Math.random()), d = void 0, c = function() {
    function d() {
        t(this, d), n.WorldConn.OnNotify.On(this, this.OnRecv), this.EvtEnterRoom = new s.UIEvent(), 
        this.EvtDoT = new s.UIEvent(), this.EvtDoLun = new s.UIEvent(), this.EvtDoLun0 = new s.UIEvent(), 
        this.EvtDoKantiEnd = new s.UIEvent(), this.EvtDoTexiao = new s.UIEvent(), this.EvtDoHuidaJG = new s.UIEvent(), 
        this.EvtDoHuiheEnd = new s.UIEvent(), this.EvtCJ = new s.UIEvent(), this.EvtReady = new s.UIEvent(), 
        this.EvtStart = new s.UIEvent(), this.EvtJoin = new s.UIEvent(), this.EvtLeave = new s.UIEvent(), 
        this.EvtUserReady = new s.UIEvent(), this.EvtSpk = new s.UIEvent(), this.EvtAJoin = new s.UIEvent(), 
        this.RoomStep = {
            None: 0,
            Ready: 5,
            Start: 10,
            EnterRoom: 20
        }, this.Step = this.RoomStep.None, this._CurrPairWnd = null, this.Wenti = 1, this.SpeekList = [], 
        this.LeftPlys = [], this.RightPlys = [], this.LeftJoin = [], this.RightJoin = [], 
        this.ReadyUsers = [], this.MaxLun = 10, this.MaxFen = 1e3;
    }
    return i(d, [ {
        key: "ShowBox",
        value: function(t, e) {
            var i = this;
            wx.showModal({
                title: "消息",
                content: t,
                showCancel: "false",
                cancelText: "",
                confirmText: "确定",
                confirmColor: "#3cc51f",
                complete: function(t) {
                    e ? e() : i._CurrPairWnd && i._CurrPairWnd.Back();
                }
            });
        }
    }, {
        key: "LeaveRoom",
        value: function() {
            this.needSendLeaveNM = !0;
        }
    }, {
        key: "CancelLeaveRoom",
        value: function() {
            this.needSendLeaveNM = !1;
        }
    }, {
        key: "DoLeaveRoom",
        value: function() {
            var t = this;
            this.needSendLeaveNM && (this.needSendLeaveNM = !1, e(), this.Fighting = !1, n.GameConn.Request({
                n: "exitroom"
            }, function(e) {
                t.AutoShowLostMoney(e);
            }));
        }
    }, {
        key: "AutoShowLostMoney",
        value: function(t) {
            t.money && this.ShowBox((0, a.txt)(1021).format(t.money), function() {});
        }
    }, {
        key: "LeaveRoom2",
        value: function(t) {
            r.loginLoading.show("", !0), this.Fighting = !1, n.GameConn.Request({
                n: "exitroom"
            }, function(e) {
                r.loginLoading.hide(), t(e.r);
            });
        }
    }, {
        key: "LeaveRoom3",
        value: function(t) {
            this.Fighting = !1, n.GameConn.Request({
                n: "exitroom"
            }, function(e) {
                t(e.r);
            });
        }
    }, {
        key: "ConnGame",
        value: function(t) {
            var e = this;
            if (getApp().globalData.LoginOK) t(!0); else {
                getApp().globalData.ServerLogin.login(), this.ConnGameTimer && clearInterval(this.ConnGameTimer);
                var i = 0;
                this.ConnGameTimer = setInterval(function() {
                    return getApp().globalData.LoginOK ? (clearInterval(e.ConnGameTimer), e.ConnGameTimer = null, 
                    void t(!0)) : ++i >= 100 ? (clearInterval(e.ConnGameTimer), e.ConnGameTimer = null, 
                    void t(!1)) : void 0;
                }, 50);
            }
        }
    }, {
        key: "ShowReadyWnd",
        value: function() {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_prepare.TemporaryJumpMode = 3), 
            getApp().globalData.wnds.Wnd_prepare.Show();
        }
    }, {
        key: "StartPK",
        value: function(t) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, a = this, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, h = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
            if (!getApp().globalData.LoginOK) return console.log("StartPK 网络故障"), void (this._CurrPairWnd && this._CurrPairWnd.Back());
            e(), this.LeaveRoom3(function(e) {
                a._ResetParam();
                var l = {
                    n: "dz",
                    m: t,
                    s: i,
                    op: u++,
                    lz: r,
                    fl: s
                };
                h ? (l.join = h, a.InviteCode = h) : a.InviteCode = o.Player.InviteCode, n.GameConn.Request(l, function(t) {
                    a.ParseDZ(t);
                });
            });
        }
    }, {
        key: "RePK",
        value: function() {
            var t = this;
            e(), this._ResetParam(), n.GameConn.Request({
                n: "refight"
            }, function(e) {
                t.ParseRefight(e);
            });
        }
    }, {
        key: "_ResetParam",
        value: function() {
            this.FightIsStop = !1, this.LeftJoin = [], this.RightJoin = [], this.ReadyUsers = [], 
            this.Fighting = !0, this.Texiao = null, this.Daan = null, this.Chengji = null, this.Step = this.RoomStep.None, 
            this.IsEnterRoom = !1, this.LunZQ = null, this.RightSel = [], this.IsWorking = !0, 
            this.SpeekList = [];
        }
    }, {
        key: "OnRecv",
        value: function(t) {
            switch (t.n) {
              case "lun0":
                this._Parselun0(t);
                break;

              case "lun":
                this._Parselun(t);
                break;

              case "hdjg":
                this._Parsehdjg(t);
                break;

              case "hhEnd":
                this._ParsehhEnd(t);
                break;

              case "cj":
                this._ParseCJ(t);
                break;

              case "t":
                this._ParseT(t);
                break;

              case "tx":
                this._Parsetx(t);
                break;

              case "ktend":
                this._Parsektend(t);
                break;

              case "ajoin":
                this._Parseajoin(t);
                break;

              case "join":
                this._Parsejoin(t);
                break;

              case "lv":
                this._Parselv(t);
                break;

              case "eready":
                this._Parseeready(t);
                break;

              case "spk":
                this._Parsespk(t);
            }
        }
    }, {
        key: "_Parsespk",
        value: function(t) {
            console.log("spk", t);
            var e = t.uid, i = this.LeftPly(e);
            i || (i = this.RightPly(e));
        }
    }, {
        key: "_Parseeready",
        value: function(t) {
            for (var e = t.u, i = this.ReadyUsers.length - 1; i >= 0; i--) if (this.ReadyUsers[i].uid == e) return;
            var n = this.LeftPly(e);
            n ? this.ReadyUsers.push(n) : (n = this.RightPly(e)) && this.ReadyUsers.push(n), 
            this.EvtUserReady.Emit();
        }
    }, {
        key: "_Parselv",
        value: function(t) {
            for (console.log("lv", t), e = this.LeftJoin.length - 1; e >= 0; e--) this.LeftJoin[e].uid == t.uid && this.LeftJoin.splice(e, 1);
            for (e = this.RightJoin.length - 1; e >= 0; e--) this.RightJoin[e].uid == t.uid && this.RightJoin.splice(e, 1);
            for (var e = this.ReadyUsers.length - 1; e >= 0; e--) this.ReadyUsers[e].uid == t.uid && this.ReadyUsers.splice(e, 1);
            console.log("========post Leave=========="), this.EvtLeave.Emit();
        }
    }, {
        key: "_Parsejoin",
        value: function(t) {
            console.log("join", t), t.icon = this.IconUrl(t.icon), t.k = this.HeadFrameUrl(t.k), 
            1 == t.isl ? this.LeftJoin.push(t) : (this.RightJoin.push(t), console.log("========post join right==========")), 
            console.log("========post join=========="), this.EvtJoin.Emit();
        }
    }, {
        key: "HeadFrameUrl",
        value: function(t) {
            return null;
        }
    }, {
        key: "_Parseajoin",
        value: function(t) {
            this.EvtAJoin.Emit(), this._roomsid = t.sid + 1e8, this._SendRoom();
        }
    }, {
        key: "_SendRoom",
        value: function() {
            var t = this;
            this.IsEnterRoom || (this.IsEnterRoom = !0, n.WorldConn.BindSessionCode(this._roomsid, this._WorldSessioncode), 
            n.WorldConn.Request({
                n: "room"
            }, function(e) {
                t.RoomResult(e);
            }));
        }
    }, {
        key: "_ParseT",
        value: function(t) {
            this.SYDatiTime = t.v, this.EvtDoT.Emit();
        }
    }, {
        key: "_ClearWtcache",
        value: function() {
            this.LunZQ = null, this.RightSel = [], this.HuidaJG = null, this.HuiHeJG = null, 
            this.SYDatiTime = null;
        }
    }, {
        key: "_Parselun0",
        value: function(t) {
            this._ClearWtcache(), this.Lun = t.currlun, this.DatiTime = t.dt, this.EvtDoLun0.Emit();
        }
    }, {
        key: "_Parselun",
        value: function(t) {
            this.WentiImg = t.img, this.WentiImg && (this.WentiImg = o.Player.ArticleServerUrl() + "/public/uploads/ProblemImg/" + this.WentiImg), 
            this.WentiMusic = t.music, this.Wenti = t.tm % (l.ALL_IDIOMS.length - 13) + 1, this.EvtDoLun.Emit();
        }
    }, {
        key: "_Parsektend",
        value: function(t) {
            console.log("_Parsektend!!!", t), this.Daan = t.k, this.EvtDoKantiEnd.Emit();
        }
    }, {
        key: "_Parsetx",
        value: function(t) {
            this.Texiao = t.tx, this.TexiaoTime = t.txtime, this.Texiaotxt = t.txt, this.EvtDoTexiao.Emit();
        }
    }, {
        key: "_Parsehdjg",
        value: function(t) {
            this.HuidaJG = t;
            var e = this.RightPly(t.uid);
            e && this.RightSel.push({
                ply: e,
                x: t.x
            }), t.zq && (this.LunZQ = t.zq), this.EvtDoHuidaJG.Emit();
        }
    }, {
        key: "_ParsehhEnd",
        value: function(t) {
            this.HuiHeJG = t, this.EvtDoHuiheEnd.Emit();
        }
    }, {
        key: "_ParseCJ",
        value: function(t) {
            this.IsWorking = !1, this.Chengji = t, this.EvtCJ.Emit();
        }
    }, {
        key: "_AutoRequestDuanWeiInfo",
        value: function() {
            this.Is3V3 && !getApp().globalData.wnds.Wnd_Match.dwdata && n.GameConn.Request({
                n: "pk3v3"
            }, function(t) {
                getApp().globalData.wnds.Wnd_Match.dwdata = t;
            });
        }
    }, {
        key: "ParseRefight",
        value: function(t) {
            if (this.CurrMode = t.mode, this._AutoRequestDuanWeiInfo(), console.log("=============ParseRefight============r:", t.r), 
            0 == t.r) this._PD(t); else {
                switch (this.IsWorking = !1, this.Fighting = !1, t.r) {
                  case 1:
                    return void this.ShowBox("房间已解散");
                }
                this._CurrPairWnd && this._CurrPairWnd.Back();
            }
        }
    }, {
        key: "Jump3V3",
        value: function() {
            this.JumpSeasonUI() || (getApp().globalData.wnds.Wnd_Match.dwdata ? (getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_Match.TemporaryJumpMode = 3), 
            getApp().globalData.wnds.Wnd_Match.Show()) : (wx.showLoading({
                title: "跳转中...",
                mask: !0
            }), n.GameConn.Request({
                n: "pk3v3"
            }, function(t) {
                wx.hideLoading(), getApp().globalData.wnds.Wnd_Match.dwdata = t, getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_Match.TemporaryJumpMode = 3), 
                getApp().globalData.wnds.Wnd_Match.Show();
            })));
        }
    }, {
        key: "RequestCloseSNotify",
        value: function() {
            n.GameConn.Request({
                n: "CloseSNotify"
            }, function(t) {
                t.r;
            });
        }
    }, {
        key: "RequestSJPH",
        value: function(t) {
            var e = this;
            n.GameConn.Request({
                n: "SJPH"
            }, function(i) {
                0 == i.r && (e.SJPH = i, t());
            });
        }
    }, {
        key: "JumpSeasonUI",
        value: function() {
            var t = this;
            switch (console.log("JumpSeasonUI Player.SeasonJLST", o.Player.SeasonJLST), o.Player.SeasonJLST) {
              case 10:
              case 20:
                return n.GameConn.Request({
                    n: "SeasonJS"
                }, function(e) {
                    t.NM_SeasonJS(e);
                }), !0;

              case 30:
                return console.log("-------结算中--------"), this.ShowBox((0, a.txt)(2035), function() {}), 
                !0;

              default:
                return !1;
            }
        }
    }, {
        key: "NM_SeasonJS",
        value: function(t) {
            switch (this.SeasonJS = t, o.Player.SeasonJLST) {
              case 10:
                return 1 == o.Player.SeasonNotify ? (getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_NoticeAccounts.TemporaryJumpMode = 3), 
                getApp().globalData.wnds.Wnd_NoticeAccounts.Show()) : this.RequestSJPH(function() {
                    getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_MatchJieSuan.TemporaryJumpMode = 3), 
                    getApp().globalData.wnds.Wnd_MatchJieSuan.Show();
                }), !0;

              case 20:
                return getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_StartMatch.TemporaryJumpMode = 3), 
                getApp().globalData.wnds.Wnd_StartMatch.Show(), !0;
            }
        }
    }, {
        key: "ParseDZ",
        value: function(t) {
            if (this.FightIsStop) return e(), void (this._CurrPairWnd && this._CurrPairWnd.Back());
            if (console.log("ParseDZ", t), this.Menpiao = t.mp, this.CurrMode = t.mode, this._AutoRequestDuanWeiInfo(), 
            console.log("=============ParseDZ============r:", t.r), 0 == t.r || 2 == t.r) this._PD(t); else switch (this.IsWorking = !1, 
            this.Fighting = !1, t.r) {
              case 1:
                h.ShowCZJump();
                break;

              case 4:
                this.ShowBox("房间已解散");
                break;

              case 5:
                console.log("ParseDZ_re5", o.Player.SeasonJLST), this.JumpSeasonUI();
                break;

              default:
                this._CurrPairWnd && this._CurrPairWnd.Back();
            }
        }
    }, {
        key: "ConnPair",
        value: function() {
            console.log("重连到配对节点"), n.WorldConn.BindSessionCode(1e8 + this._PairSID, this._WorldSessioncode);
        }
    }, {
        key: "_PD",
        value: function(t) {
            var e = this;
            console.log("_PD#1"), this._WorldUrl = t.url, this._WorldSessioncode = t.scode, 
            this._PairSID = t.sid, n.WorldConn.ReCreate(this._WorldUrl, 1e8 + this._PairSID, this._WorldSessioncode), 
            console.log("_PD#2"), this.Peiduiing = !0, n.WorldConn.Request({
                n: "pd"
            }, function(t) {
                e.PDResult(t);
            });
        }
    }, {
        key: "LoginClear",
        value: function() {
            this.Peiduiing ? d.Fighting = !0 : d.Fighting = !1;
        }
    }, {
        key: "PDResult",
        value: function(t) {
            if (console.log("PDResult#1"), this.FightIsStop) return e(), void console.log("PDResult#2");
            if (this.Peiduiing = !1, console.log("PDResult", t), 0 == t.r) t.sid && (this._roomsid = t.sid + 1e8, 
            this._SendRoom()); else {
                switch (this.Fighting = !1, this.IsWorking = !1, t.r) {
                  case 3:
                    return void this.ShowBox("房间已解散");

                  case 5:
                    this.ShowBox((0, a.txt)(2035));
                }
                this._CurrPairWnd && this._CurrPairWnd.Back();
            }
        }
    }, {
        key: "RoomResult",
        value: function(t) {
            if (console.log("=============RoomResult============r:", t.r, this.FightIsStop), 
            this.FightIsStop) e(); else {
                if (0 != t.r) return this.IsWorking = !1, void (this._CurrPairWnd && this._CurrPairWnd.Back());
                this.APlys = this._ParsePlayers(t.aply), this.BPlys = this._ParsePlayers(t.bply), 
                this.MaxLun = t.sumlun, this.MaxFen = t.sumfen, this.Lun = t.lun, this.Mode = t.mode, 
                this.SelfUID = t.uid, this.IsA = 1 == t.isa;
                var i = this.IsA ? this.APlys : this.BPlys, n = this.IsA ? this.BPlys : this.APlys;
                this.LFen = 0, this.RFen = 0, o = 0, this.LeftPlys = [];
                for (var s in i) if ((r = i[s]).uid == this.SelfUID) {
                    r.idx = o++, r.isLeft = !0, this.LeftPlys.push(r);
                    break;
                }
                for (var s in i) (r = i[s]).uid != this.SelfUID && (r.idx = o++, r.isLeft = !0, 
                this.LeftPlys.push(r));
                var o = 0;
                this.RightPlys = [];
                for (var s in n) (r = n[s]).isLeft = !1, r.idx = o++, this.RightPlys.push(r);
                for (this._ClearWtcache(), a = 0; a < this.RightPlys.length; a++) r = this.RightPlys[a], 
                this._Talk(r.uid, r.name + "进入房间");
                for (var a = 0; a < this.LeftPlys.length; a++) {
                    var r = this.LeftPlys[a];
                    this._Talk(r.uid, r.name + "进入房间");
                }
                this._EmitReady();
            }
        }
    }, {
        key: "_Talk",
        value: function(t, e) {
            this._Parsespk({
                uid: t,
                txt: e
            });
        }
    }, {
        key: "_EmitReady",
        value: function() {
            var t = this;
            console.log("_EmitReady"), this.Step = this.RoomStep.Ready, this.EvtReady.Emit(), 
            this._Timer = setTimeout(function() {
                return t._EmitStart();
            }, 1e3);
        }
    }, {
        key: "_EmitStart",
        value: function() {
            var t = this;
            console.log("_EmitStart"), this.Step = this.RoomStep.Start, this.EvtStart.Emit(), 
            this._Timer = setTimeout(function() {
                return t._EmitEnterRoom();
            }, 1e3);
        }
    }, {
        key: "Stop",
        value: function() {
            this._Timer && (clearTimeout(this._Timer), this._Timer = null), this.ConnGameTimer && (clearInterval(this.ConnGameTimer), 
            this.ConnGameTimer = null), this.IsWorking = !1, this.FightIsStop = !0, this._ResetParam();
        }
    }, {
        key: "_EmitEnterRoom",
        value: function() {
            console.log("_EmitEnterRoom"), this.Step = this.RoomStep.EnterRoom, this.EvtEnterRoom.Emit();
        }
    }, {
        key: "_ParsePlayers",
        value: function(t) {
            for (var e in t) {
                var i = t[e];
                i.iconurl = this.IconUrl(i.iconurl), i.k = this.HeadFrameUrl(i.k), i.uid = e;
            }
            return t;
        }
    }, {
        key: "LeftPly",
        value: function(t) {
            return (this.IsA ? this.APlys : this.BPlys)[t];
        }
    }, {
        key: "RightPly",
        value: function(t) {
            return (this.IsA ? this.BPlys : this.APlys)[t];
        }
    }, {
        key: "IconUrl",
        value: function(t) {
            return "01" == t.substr(0, 2) ? o.Player.ArticleServerUrl() + "/public/uploads/ProblemImg/" + t.substr(2) : t;
        }
    }, {
        key: "Is3V3",
        get: function() {
            return 4 == this.CurrMode || 9 == this.CurrMode;
        }
    }, {
        key: "IsYaoQing",
        get: function() {
            return 9 == this.CurrMode || 8 == this.CurrMode;
        }
    }, {
        key: "CurrPairWnd",
        get: function() {
            return this._CurrPairWnd;
        },
        set: function(t) {
            this._CurrPairWnd = t;
        }
    } ]), d;
}();

exports.FightRoom = d = new c(), exports.FightRoom = d, exports.StopFight = e;