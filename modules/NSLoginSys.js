function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.NSLoginSys = void 0;

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), n = (e(require("../dati_comm/libs/xmldom/dom-parser")), require("../dati_comm/libs/network/UIEvent")), o = (require("../dati_comm/libs/network/NSSocket"), 
require("../dati_comm/libs/network/Conns"), require("../dati_comm/libs/network/NSServerList")), r = (require("../dati_comm/sdata/SDataID2"), 
e(require("../gamecfg")), require("./GConn")), s = 0, a = null, u = new (function() {
    function e() {
        t(this, e), this.OnLoginSuccess = new n.UIEvent(), this.OnLoginFail = new n.UIEvent(), 
        this.OnStep = new n.UIEvent(), this._Step = 0, r.GameConn.onConn.On(this, this.OnGameConn), 
        r.GameConn.onClose.On(this, this.OnGameClose);
    }
    return i(e, [ {
        key: "OnGameClose",
        value: function() {
            this.connGameStep != this._Step && this._PostErrorMsg("链接服务器失败！");
        }
    }, {
        key: "OnGameConn",
        value: function() {
            this._NextStep("OnGameConn"), console.log("请求登录 " + this.wxData.code), this.connGameStep = this._Step, 
            r.GameConn.Route = 1;
            var e = r.GameConn.CreateLoader({
                n: "ck",
                tp: "wxg",
                wxg: {
                    c: this.wxData.code,
                    ed: this.wxData.encryptedData,
                    iv: this.wxData.iv
                }
            });
            e.OnComplete.On(this, this.OnLoginCheckOK), e.OnError.On(this, this.OnLoginCheckError);
        }
    }, {
        key: "Begin",
        value: function(e) {
            a && (clearTimeout(a), a = null), this._Step = 0, this.wxData = e, this._NextStep("Begin"), 
            this.WaitServerList();
        }
    }, {
        key: "WaitServerList",
        value: function() {
            var e = this;
            a = setTimeout(function() {
                console.log("WaitServerList Begin"), o.ServerList.ExistError ? e._PostErrorMsg("获取网关地址失败！") : o.ServerList._ExistList ? e.LoadServerListOK() : e.WaitServerList(), 
                console.log("WaitServerList End");
            }, 50);
        }
    }, {
        key: "WaitPubConfig",
        value: function() {
            var e = this;
            a = setTimeout(function() {
                console.log("WaitPubConfig Begin"), PubConfig.ExistError ? e._PostErrorMsg("获取配置信息失败！") : PubConfig._ExistList ? e.WaitServerList() : e.WaitPubConfig(), 
                console.log("WaitPubConfig End");
            }, 50);
        }
    }, {
        key: "LoadServerListOK",
        value: function() {
            this._RequestCK();
        }
    }, {
        key: "_RequestCK",
        value: function() {
            this._NextStep("_RequestCK"), s = 0;
            var e = this.wxData.userInfo.nickName.hash();
            if (o.ServerList.GameSvrList.length > 0) {
                var t = o.ServerList.GameSvrList[e % o.ServerList.GameSvrList.length];
                this.SeldGameSvrInfo = t, console.log("gameurl", t.url), r.GameConn.Conn(t.url);
            } else console.log("不存在有效的服务器！"), this._PostErrorMsg("获取游戏服务器地址失败！");
        }
    }, {
        key: "_NextStep",
        value: function(e) {
            this._Step++, this.OnStep.Emit(e);
        }
    }, {
        key: "OnLoginCheckOK",
        value: function(e) {
            this._NextStep("OnLoginCheckOK"), clearTimeout(void 0), 0 === e.r ? (this.OnLoginSuccess.Emit({
                pubkey: e.k,
                logicSid: e.lgsid,
                url: this.SeldGameSvrInfo.url
            }), this._Step = 0) : this._PostErrorMsg("登录失败");
        }
    }, {
        key: "OnLoginCheckError",
        value: function() {
            r.GameConn.Close(), this._PostErrorMsg("账户验证超时！");
        }
    }, {
        key: "_PostErrorMsg",
        value: function(e) {
            this._NextStep("_PostErrorMsg");
            var t = this._Step;
            this._Step = 0, this.OnLoginFail.Emit({
                step: t,
                msg: e
            });
        }
    } ]), e;
}())();

exports.NSLoginSys = u;