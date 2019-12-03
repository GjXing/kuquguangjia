function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.WorldConn = exports.GameConn = void 0;

var t = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var s = t[o];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, o, s) {
        return o && e(t.prototype, o), s && e(t, s), t;
    };
}(), o = require("UIEvent"), s = (require("./NSSocketPool"), require("./NSSocket")), n = require("./loginLoading"), i = require("../../sdata/SDataID2"), r = require("../../../modules/GConn"), h = new (function() {
    function r(t) {
        var s = this;
        e(this, r), this.OnNotify = new o.UIEvent(), this.name = t, setInterval(function() {
            s.Update();
        }, 1e3);
    }
    return t(r, [ {
        key: "Update",
        value: function() {
            this._Socket && this._Socket.CheckConn() && this._Socket.Update(this.name);
        }
    }, {
        key: "ReCreate",
        value: function(e, t, o) {
            var n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            console.log(this.name + " ReCreate"), this._url = e, this._routeFlag = t, this._sessionCode = o, 
            this._cacheRequests = [], this._errorNum = 0, n && (this._rertyCount = 0, this.Close()), 
            this._isClosed = !1, this.OnCreateSkt(new s.NSSocket(t, o));
        }
    }, {
        key: "OnCreateSkt",
        value: function(e) {
            if (console.log(this.name, "connSkt"), this._isClosed) return console.log(this.name, "connSkt_close"), 
            void e.Close();
            var t = this._Socket ? this._Socket._loaders : {};
            this._Socket = e, this._Socket.onConn.On(this, this._OnConn), this._Socket.onClose.On(this, this._OnClose), 
            this._Socket.onRecv.On(this, this._OnRecv), this._Socket.Conn(this._url);
            for (var o in t) t[o]._setError();
        }
    }, {
        key: "ReBindSocket",
        value: function(e, t, o, s) {
            var n = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
            console.log(this.name + " ReBindSocket"), this._url = e, this._routeFlag = t, this._sessionCode = o, 
            this._cacheRequests = [], this._errorNum = 0, this._rertyCount = 0, n && this.Close(), 
            this._isClosed = !1;
            var i = this._Socket ? this._Socket._loaders : {};
            this._Socket = s, this._Socket.onConn.Off(this._OnConn), this._Socket.onClose.Off(this._OnClose), 
            this._Socket.onRecv.Off(this._OnRecv), this._Socket.onConn.On(this, this._OnConn), 
            this._Socket.onClose.On(this, this._OnClose), this._Socket.onRecv.On(this, this._OnRecv);
            for (var r in i) i[r]._setError();
            this.BindSessionCode(t, o), this._OnConn();
        }
    }, {
        key: "BindSessionCode",
        value: function(e, t) {
            this._routeFlag = e, this._Socket.BindSessionCode(e, t);
        }
    }, {
        key: "Request",
        value: function(e) {
            var t = this, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if (this.Connected()) {
                var n = this._Socket.Request(e, null == s ? this._routeFlag : s);
                n.OnComplete.On(this, function(e) {
                    t._errorNum = 0, console.log(t.name, "clear errorNum", t._errorNum), null != o && o(e);
                }), n.OnError.On(this, function() {
                    t._errorNum++, console.log("==================Conns  loader.OnError================"), 
                    t.ErrorNum() > 50 ? getApp().globalData.ServerLogin.ShowGoHomeBox() : n.ReRequest();
                });
            } else {
                if (null == this._cacheRequests) return;
                this._cacheRequests.push({
                    data: e,
                    onSuccess: o,
                    routeFlag: s
                });
            }
        }
    }, {
        key: "ErrorNum",
        value: function() {
            return this._errorNum;
        }
    }, {
        key: "Close",
        value: function() {
            console.log(this.name, "close"), this._Socket && this._Socket.Close(), this._isClosed = !0;
        }
    }, {
        key: "Connected",
        value: function() {
            return !this._isClosed && !this._isTemporaryClose && this._Socket && this._Socket.CheckConn();
        }
    }, {
        key: "_OnConn",
        value: function() {
            if (this.reTryTimeout && (clearTimeout(this.reTryTimeout), this.reTryTimeout = null), 
            console.log(this.name, "Conns onconn", this._cacheRequests.length), this._isClosed = !1, 
            this._isTemporaryClose = !1, this._rertyCount = 0, n.loginLoading.hide(), this._cacheRequests.length > 0) {
                var e = this._cacheRequests;
                this._cacheRequests = [];
                for (var t = 0; t < e.length; t++) {
                    var o = e[t];
                    this.Request(o.data, o.onSuccess, o.routeFlag);
                }
            }
        }
    }, {
        key: "_OnClose",
        value: function() {
            var e = this;
            console.log(this.name, "NSConns Onclose"), this.reTryTimeout && (clearTimeout(this.reTryTimeout), 
            this.reTryTimeout = null), n.loginLoading.hide(), this._isClosed || this._rertyCount > 3 ? (console.log(this.name, "NSConns clear loaders"), 
            this._cacheRequests = [], this._Socket.Close(), this._Socket = null, this._isClosed || (console.log(this.name, "显示gohome消息框"), 
            getApp().globalData.ServerLogin.ShowGoHomeBox())) : (console.log(this.name, "retry conn..."), 
            this._isTemporaryClose || (n.loginLoading.show((0, i.txt)(1019), !1), this._Retry(), 
            this.reTryTimeout = setTimeout(function() {
                console.log("重连超时"), e._rertyCount = 1e3, e._OnClose();
            }, 15e3)));
        }
    }, {
        key: "_Retry",
        value: function() {
            this._rertyCount++, this._Socket.Close(), this.ReCreate(this._url, this._routeFlag, this._sessionCode, !1);
        }
    }, {
        key: "_OnRecv",
        value: function(e) {
            console.log("_conn OnRecv====================", e), this._isClosed ? console.log("==================_OnRecv isClosed================", this.name) : this.OnNotify.Emit(e);
        }
    } ]), r;
}())("pk");

exports.GameConn = r.GameConn, exports.WorldConn = h;