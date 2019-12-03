function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GameConn = void 0;

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), n = require("../dati_comm/libs/network/UIEvent"), o = require("../dati_comm/libs/network/NSLoader"), s = require("../dati_comm/libs/oosync/OOSyncClient"), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../dati_comm/modules/MsgBox")), i = 0, l = new (function() {
    function l() {
        var t = this;
        e(this, l), this._socketHandle = null, this._connd = !1, this.onConn = new n.UIEvent(), 
        this.onRecv = new n.UIEvent(), this.onClose = new n.UIEvent(), this._loaders = {}, 
        this.Route = 1, this.SetHeartbeatTime(), setInterval(function() {
            t.Update("GConn");
        }, 1e3);
    }
    return t(l, [ {
        key: "SetHeartbeatTime",
        value: function() {
            this._lastHeartbeatTime = Date.parse(new Date()) / 1e3;
        }
    }, {
        key: "Update",
        value: function(e) {
            var t = Date.parse(new Date()) / 1e3;
            if (getApp().globalData.LoginOK && this._lastHeartbeatTime + 20 < t) {
                var n = {
                    n: "hbeat"
                };
                this._Send(JSON.stringify(n), this.Route), console.log("=====心跳=====", e);
            }
            var o = !1, s = this._loaders;
            for (var a in s) {
                var i = s[a];
                i.needRequest && (console.log("Update ReRequest"), getApp().globalData.LoginOK && i.ReRequest()), 
                i.requestTime && i.requestTime + 10 < t && (o = !0, console.log("请求超时", e));
            }
            o && (this.Close(), getApp().globalData.LoginOK = !1);
        }
    }, {
        key: "CheckConn",
        value: function() {
            return this._connd && this._socketHandle;
        }
    }, {
        key: "Conn",
        value: function(e) {
            var t = this;
            this._socketHandle && this.Close(), this._url = e, this._socketHandle = wx.connectSocket({
                url: e,
                fail: function(e) {
                    t._Close(), console.log(e);
                },
                success: function(e) {}
            });
            var n = this._socketHandle;
            i++, console.log("Conn count:", i), this._socketHandle.onOpen(function(e) {
                n == t._socketHandle && (console.log("NSSocket Onopen", e), t._connd = !0, t.onConn.Emit());
            }), this._socketHandle.onClose(function(e) {
                n == t._socketHandle && t._Close();
            }), this._socketHandle.onMessage(function(e) {
                n == t._socketHandle && t.OnMessage(e.data);
            }), this._socketHandle.onError(function(e) {
                n == t._socketHandle && (console.log("NSSocket onError", e), t._Close());
            });
        }
    }, {
        key: "OnMessage",
        value: function(e) {
            var t = e.indexOf("#E#"), n = e.indexOf("#E#", t + 3), o = JSON.parse(e.substr(0, t)), a = void 0, i = void 0;
            n < 0 ? a = e.substr(t + 3) : (i = Number(e.substr(t + 3, n - (t + 3))), a = e.substr(n + 3));
            var l = o.l;
            if (o.r, null != l && "" != l) {
                var r = this._loaders[Number(l)];
                null != r && (delete this._loaders[Number(l)], r._setResult(a, i));
            } else {
                var c = JSON.parse(a);
                s.OOSyncClient.DoDispatcher(c) || this.onRecv.Emit(c);
            }
        }
    }, {
        key: "Notify",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            -1 == t && (t = this.Route), this._Send(e, t);
        }
    }, {
        key: "CreateLoader",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
            -1 == t && (t = this.Route);
            var n = new o.NSLoader(this, e, t);
            return this._loaders[n._lid] = n, n;
        }
    }, {
        key: "Request",
        value: function(e, t) {
            if (getApp().globalData.LoginOK) {
                var n = this.CreateLoader(e);
                n.OnComplete.On(this, function(e) {
                    null != t && t(e);
                }), n.OnError.On(this, function() {
                    wx.showToast({
                        title: "网络故障，请稍后再试！",
                        icon: "none",
                        duration: 2e3
                    }), getApp().globalData.LoginOK = !1;
                });
            } else a.ShowOK("消息", "网络连接不通畅，请稍后再试！");
        }
    }, {
        key: "_Close",
        value: function() {
            this._connd, this._connd = !1, null != this._socketHandle && (i--, console.log("DConn count:", i), 
            this._socketHandle.close(), this._socketHandle = null, this.onClose.Emit()), this._ClearLoaders();
        }
    }, {
        key: "_ClearLoaders",
        value: function() {
            var e = this._loaders;
            this._loaders = {};
            for (var t in e) e[t]._setError();
        }
    }, {
        key: "Close",
        value: function() {
            this._ClearLoaders(), this._socketHandle && (i--, console.log("DConn count:", i), 
            this._socketHandle.close(), this._socketHandle = null);
        }
    }, {
        key: "_Send",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (this.SetHeartbeatTime(), !this.CheckConn()) return console.log("##_Send CheckConn ret##"), 
            getApp().globalData.LoginOK = !1, !1;
            var o = {
                r: t
            };
            null != n && (o.l = n);
            var s = JSON.stringify(o) + "#E#" + e;
            return this._socketHandle.send({
                data: s
            }), !0;
        }
    } ]), l;
}())();

exports.GameConn = l;