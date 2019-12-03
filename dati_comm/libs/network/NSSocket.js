function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.NSSocket = void 0;

var n = function() {
    function e(e, n) {
        for (var o = 0; o < n.length; o++) {
            var t = n[o];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, o, t) {
        return o && e(n.prototype, o), t && e(n, t), n;
    };
}(), o = require("./UIEvent"), t = require("./NSLoader"), s = require("../oosync/OOSyncClient"), i = 0, l = function() {
    function l() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        e(this, l), this._socketHandle = null, this._connd = !1, this.onConn = new o.UIEvent(), 
        this.onRecv = new o.UIEvent(), this.onClose = new o.UIEvent(), this._loaders = {}, 
        this._sessionCode = t, this._sid = n, this.SetHeartbeatTime();
    }
    return n(l, [ {
        key: "SetHeartbeatTime",
        value: function() {
            this._lastHeartbeatTime = Date.parse(new Date()) / 1e3;
        }
    }, {
        key: "Update",
        value: function(e) {
            var n = Date.parse(new Date()) / 1e3;
            if (this._lastHeartbeatTime + 20 < n) {
                var o = {
                    n: "hbeat"
                };
                this._Send(JSON.stringify(o), this._sid), console.log("=====心跳=====", e);
            }
            var t = !1, s = this._loaders;
            for (var i in s) {
                var l = s[i];
                l.needRequest && (console.log("Update ReRequest"), l.ReRequest()), l.requestTime && l.requestTime + 10 < n && (t = !0, 
                console.log("请求超时", e));
            }
            t && (this.Close(), this._loaders = {}, console.log("_showLoginBox#10", e), getApp().globalData.ServerLogin.ShowGoHomeBox());
        }
    }, {
        key: "CheckConn",
        value: function() {
            return this._connd && this._socketHandle;
        }
    }, {
        key: "Conn",
        value: function(e) {
            var n = this;
            this._url = e, this._socketHandle = wx.connectSocket({
                url: e,
                fail: function(e) {
                    n._Close(), console.log(e);
                },
                success: function(e) {}
            });
            var o = this._socketHandle;
            i++, console.log("Conn count:", i), this._socketHandle.onOpen(function(e) {
                o == n._socketHandle && (console.log("NSSocket Onopen", e), n._connd = !0, n.BindSessionCode(n._sid, n._sessionCode), 
                n.onConn.Emit());
            }), this._socketHandle.onClose(function(e) {
                o == n._socketHandle && n._Close();
            }), this._socketHandle.onMessage(function(e) {
                o == n._socketHandle && n.OnMessage(e.data);
            }), this._socketHandle.onError(function(e) {
                o == n._socketHandle && (console.log("NSSocket onError", e), n._Close());
            });
        }
    }, {
        key: "BindSessionCode",
        value: function(e, n) {
            if (this._sid = e, this._sessionCode = n, console.log("###BindSessionCode####"), 
            null != this._sessionCode) {
                console.log("###send bdsc####");
                var o = {
                    n: "bdsc",
                    code: this._sessionCode
                };
                this._Send(JSON.stringify(o), this._sid);
            }
        }
    }, {
        key: "OnMessage",
        value: function(e) {
            var n = e.indexOf("#E#"), o = e.indexOf("#E#", n + 3), t = JSON.parse(e.substr(0, n)), i = void 0, l = void 0;
            o < 0 ? i = e.substr(n + 3) : (l = Number(e.substr(n + 3, o - (n + 3))), i = e.substr(o + 3));
            var a = t.l;
            if (t.r, null != a && "" != a) {
                var r = this._loaders[Number(a)];
                null != r && (delete this._loaders[Number(a)], r._setResult(i, l));
            } else {
                var c = this._parseNotify(i), u = "$" + c.lid;
                this.Notify(u, 1e8 + c.sid);
                var d = JSON.parse(c.data);
                s.OOSyncClient.DoDispatcher(d) || this.onRecv.Emit(d);
            }
        }
    }, {
        key: "_parseNotify",
        value: function(e) {
            var n = e.indexOf("#N#"), o = e.indexOf("#N#", n + 3);
            return {
                sid: Number(e.substr(0, n)),
                lid: e.substr(n + 3, o - (n + 3)),
                data: e.substr(o + 3)
            };
        }
    }, {
        key: "Notify",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            this._Send(e, n);
        }
    }, {
        key: "Request",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, o = new t.NSLoader(this, e, n);
            return this._loaders[o._lid] = o, o;
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
            for (var n in e) e[n]._setError();
        }
    }, {
        key: "Close",
        value: function() {
            this._socketHandle && (i--, console.log("DConn count:", i), this._socketHandle.close(), 
            this._socketHandle = null);
        }
    }, {
        key: "_Send",
        value: function(e, n) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (this.SetHeartbeatTime(), !this.CheckConn()) return console.log("##_Send CheckConn ret##"), 
            !1;
            var t = {
                r: n
            };
            null != o && (t.l = o);
            var s = JSON.stringify(t) + "#E#" + e;
            return this._socketHandle.send({
                data: s
            }), !0;
        }
    } ]), l;
}();

exports.NSSocket = l;