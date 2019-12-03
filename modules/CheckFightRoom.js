function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e() {
    c.Stop(), s.WorldConn.Close();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.StopFight = exports.CheckFightRoom = void 0;

var i = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, i, s) {
        return i && t(e.prototype, i), s && t(e, s), e;
    };
}(), s = require("../dati_comm/libs/network/Conns"), n = require("../dati_comm/libs/network/UIEvent.js"), o = require("../modules/Player.js"), a = require("../dati_comm/sdata/SDataID2"), h = require("../dati_comm/libs/network/loginLoading"), r = require("../sdata/SDatadzface"), u = require("../sdata/SDatadztalk"), l = Math.round(9999 * Math.random()), c = null, d = function() {
    function c() {
        t(this, c), console.log("=========================>init CheckFightRoom"), s.GameConn.OnNotify.On(this, this.onGameRecv), 
        this.EvtCheckDoLun0 = new n.UIEvent(), this.EvtCheckDoLun = new n.UIEvent(), this.EvtCheckktend = new n.UIEvent(), 
        this.EvtCheckT = new n.UIEvent(), this.EvtCheckLock = new n.UIEvent(), s.WorldConn.OnNotify.On(this, this.OnRecv), 
        this.EvtEnterRoom = new n.UIEvent(), this.EvtDoT = new n.UIEvent(), this.EvtDoLun = new n.UIEvent(), 
        this.EvtDoLun0 = new n.UIEvent(), this.EvtDoKantiEnd = new n.UIEvent(), this.EvtDoTexiao = new n.UIEvent(), 
        this.EvtDoHuidaJG = new n.UIEvent(), this.EvtDoHuiheEnd = new n.UIEvent(), this.EvtCJ = new n.UIEvent(), 
        this.EvtReady = new n.UIEvent(), this.EvtStart = new n.UIEvent(), this.EvtJoin = new n.UIEvent(), 
        this.EvtLeave = new n.UIEvent(), this.EvtUserReady = new n.UIEvent(), this.EvtSpk = new n.UIEvent(), 
        this.EvtAJoin = new n.UIEvent(), this.RoomStep = {
            None: 0,
            Ready: 5,
            Start: 10,
            EnterRoom: 20
        }, this.Step = this.RoomStep.None, this._CurrPairWnd = null, this.WentiTxt = "", 
        this.SpeekList = [], this.LeftPlys = [], this.RightPlys = [], this.LeftJoin = [], 
        this.RightJoin = [], this.ReadyUsers = [], this.MaxLun = 10, this.MaxFen = 1e3;
    }
    return i(c, [ {
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
            this.needSendLeaveNM && (this.needSendLeaveNM = !1, e(), this.Fighting = !1, s.GameConn.Request({
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
            h.loginLoading.show("", !0), this.Fighting = !1, s.GameConn.Request({
                n: "exitroom"
            }, function(e) {
                h.loginLoading.hide(), t(e.r);
            });
        }
    }, {
        key: "LeaveRoom3",
        value: function(t) {
            this.Fighting = !1, s.GameConn.Request({
                n: "exitroom"
            }, function(e) {
                t(e.r);
            });
        }
    }, {
        key: "StartPK",
        value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = this, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, h = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null;
            if (!this.IsWorking) {
                this._ResetParam();
                var r = {
                    n: "dz",
                    m: t,
                    s: e,
                    op: l++,
                    lz: a,
                    fl: i
                };
                h ? (r.join = h, this.InviteCode = h) : this.InviteCode = o.Player.InviteCode, s.GameConn.Request(r, function(t) {
                    n.ParseDZ(t);
                });
            }
        }
    }, {
        key: "RePK",
        value: function() {
            var t = this;
            this.IsWorking || (this._ResetParam(), this.IsRePK = !0, s.GameConn.Request({
                n: "refight"
            }, function(e) {
                t.ParseRefight(e);
            }));
        }
    }, {
        key: "_ResetParam",
        value: function() {
            this.FightIsStop = !1, this.IsRePK = !1, this.LeftJoin = [], this.RightJoin = [], 
            this.ReadyUsers = [], this.Fighting = !0, this.Texiao = null, this.Daan = null, 
            this.Chengji = null, this.Step = this.RoomStep.None, this.IsEnterRoom = !1, this.LunZQ = null, 
            this.RightSel = [], this.IsWorking = !0, this.SpeekList = [];
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
        key: "onGameRecv",
        value: function(t) {
            switch (console.log("================> game recv"), t.n) {
              case "lun0":
                this._ParseChecklun0(t);
                break;

              case "lun":
                this._ParseChecklun(t);
                break;

              case "ktend":
                this._ParseCheckktend(t);
                break;

              case "t":
                this._ParseCheckT(t);
                break;

              case "cglock":
                this._ParseCheckLock(t);
            }
        }
    }, {
        key: "_ParseChecklun0",
        value: function(t) {
            console.log("parse lun0", t), this.Lun = t.currlun, this.DatiTime = t.dt, this.LastTime = t.t, 
            this.EvtCheckDoLun0.Emit();
        }
    }, {
        key: "_ParseChecklun",
        value: function(t) {
            console.log("parse lun", t), this.WentiImg = t.img, this.WentiImg && (this.WentiImg = o.Player.ArticleServerUrl() + "/public/uploads/ProblemImg/" + this.WentiImg), 
            this.WentiMusic = t.music, this.WentiTxt = t.tm, this.EvtCheckDoLun.Emit();
        }
    }, {
        key: "_ParseCheckktend",
        value: function(t) {
            console.log("parse kantiend", t), this.Daan = t.daan, this.errBtnArr = t.err, this.EvtCheckktend.Emit();
        }
    }, {
        key: "_ParseCheckT",
        value: function(t) {
            console.log("parse time", t), this.SYDatiTime = t.v, this.EvtCheckT.Emit();
        }
    }, {
        key: "_ParseCheckLock",
        value: function(t) {
            console.log("parse parse", t), this.EvtCheckLock.Emit(t);
        }
    }, {
        key: "_Parsespk",
        value: function(t) {
            console.log("spk", t);
            var e = t.uid, i = this.LeftPly(e);
            if (i || (i = this.RightPly(e)), i) {
                var s;
                if (t.txt) (s = {
                    ply: i,
                    tp: 2
                }).txt = t.txt; else if (s = {
                    ply: i,
                    tp: t.tp
                }, 1 == t.tp) n = r.SDatadzface.GetRow(t.id), s.emoticon = o.Player.ArticleServerUrl() + "/public/uploads/ProblemImg/" + n[r.SDatadzface.I_Picture]; else {
                    var n = u.SDatadztalk.GetRow(t.id);
                    s.txt = n[u.SDatadztalk.I_TextPre];
                }
                this.SpeekList.push(s), this.EvtSpk.Emit();
            }
        }
    }, {
        key: "_Parseeready",
        value: function(t) {
            for (var e = t.u, i = this.ReadyUsers.length - 1; i >= 0; i--) if (this.ReadyUsers[i].uid == e) return;
            var s = this.LeftPly(e);
            s ? this.ReadyUsers.push(s) : (s = this.RightPly(e)) && this.ReadyUsers.push(s), 
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
            console.log("join", t), t.icon = this.IconUrl(t.icon), 1 == t.isl ? this.LeftJoin.push(t) : (this.RightJoin.push(t), 
            console.log("========post join right==========")), console.log("========post join=========="), 
            this.EvtJoin.Emit();
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
            this.IsEnterRoom || (this.IsEnterRoom = !0, s.WorldConn.BindSessionCode(this._roomsid, this._WorldSessioncode), 
            s.WorldConn.Request({
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
            this.WentiMusic = t.music, this.WentiTxt = t.tm, this.EvtDoLun.Emit();
        }
    }, {
        key: "_Parsektend",
        value: function(t) {
            this.Daan = t.daan, this.EvtDoKantiEnd.Emit();
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
            this.Is3V3 && !getApp().globalData.wnds.Wnd_Match.dwdata && s.GameConn.Request({
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
            getApp().globalData.wnds.Wnd_Check_Fight.Show();
        }
    }, {
        key: "RequestCloseSNotify",
        value: function() {
            s.GameConn.Request({
                n: "CloseSNotify"
            }, function(t) {
                t.r;
            });
        }
    }, {
        key: "RequestSJPH",
        value: function(t) {
            var e = this;
            s.GameConn.Request({
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
                return s.GameConn.Request({
                    n: "SeasonJS"
                }, function(e) {
                    t.NM_SeasonJS(e);
                }), !0;

              case 30:
                return console.log("-------结算中--------"), this.ShowBox((0, a.txt)(1035), function() {}), 
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
            if (this.FightIsStop) e(); else if (console.log("ParseDZ", t), this.Menpiao = t.mp, 
            this.CurrMode = t.mode, this._AutoRequestDuanWeiInfo(), console.log("=============ParseDZ============r:", t.r), 
            0 == t.r || 2 == t.r) this._PD(t); else switch (this.IsWorking = !1, this.Fighting = !1, 
            t.r) {
              case 1:
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
            console.log("重连到配对节点"), s.WorldConn.BindSessionCode(1e8 + this._PairSID, this._WorldSessioncode);
        }
    }, {
        key: "_PD",
        value: function(t) {
            var e = this;
            this._WorldUrl = t.url, this._WorldSessioncode = t.scode, this._PairSID = t.sid, 
            s.WorldConn.ReCreate(this._WorldUrl, 1e8 + this._PairSID, this._WorldSessioncode), 
            this.IsRePK && getCurrentPages().length > 1 && (getApp().globalData.wnds.Wnd_Ready.TemporaryJumpMode = 3), 
            getApp().globalData.wnds.Wnd_Ready.Show(), this.Peiduiing = !0, s.WorldConn.Request({
                n: "pd"
            }, function(t) {
                e.PDResult(t);
            });
        }
    }, {
        key: "LoginClear",
        value: function() {
            this.Peiduiing ? c.Fighting = !0 : c.Fighting = !1;
        }
    }, {
        key: "PDResult",
        value: function(t) {
            if (this.FightIsStop) e(); else if (this.Peiduiing = !1, console.log("PDResult", t), 
            0 == t.r) t.sid && (this._roomsid = t.sid + 1e8, this._SendRoom()); else {
                switch (this.Fighting = !1, this.IsWorking = !1, t.r) {
                  case 3:
                    return void this.ShowBox("房间已解散");

                  case 5:
                    this.ShowBox((0, a.txt)(1035));
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
                var i = this.IsA ? this.APlys : this.BPlys, s = this.IsA ? this.BPlys : this.APlys;
                this.LFen = this.IsA ? t.afen : t.bfen, this.RFen = this.IsA ? t.bfen : t.afen, 
                o = 0, this.LeftPlys = [];
                for (var n in i) if ((h = i[n]).uid == this.SelfUID) {
                    h.idx = o++, h.isLeft = !0, this.LeftPlys.push(h);
                    break;
                }
                for (var n in i) (h = i[n]).uid != this.SelfUID && (h.idx = o++, h.isLeft = !0, 
                this.LeftPlys.push(h));
                var o = 0;
                this.RightPlys = [];
                for (var n in s) (h = s[n]).isLeft = !1, h.idx = o++, this.RightPlys.push(h);
                for (this._ClearWtcache(), a = 0; a < this.RightPlys.length; a++) h = this.RightPlys[a], 
                this._Talk(h.uid, h.name + "进入房间");
                for (var a = 0; a < this.LeftPlys.length; a++) {
                    var h = this.LeftPlys[a];
                    this._Talk(h.uid, h.name + "进入房间");
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
            this._Timer && (clearTimeout(this._Timer), this._Timer = null), this.IsWorking = !1, 
            this.FightIsStop = !0;
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
                i.iconurl = this.IconUrl(i.iconurl), i.uid = e;
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
    } ]), c;
}();

exports.CheckFightRoom = c = new d(), exports.CheckFightRoom = c, exports.StopFight = e;