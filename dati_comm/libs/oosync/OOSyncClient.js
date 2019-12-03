function n(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function n(n, e) {
        for (var t = 0; t < e.length; t++) {
            var l = e[t];
            l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), 
            Object.defineProperty(n, l.key, l);
        }
    }
    return function(e, t, l) {
        return t && n(e.prototype, t), l && n(e, l), e;
    };
}(), t = function(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}(require("./OOSyncObj")), l = void 0, u = function() {
    function l(e) {
        n(this, l), this._rootObj = null, this._sid = e, this.Reset();
    }
    return e(l, [ {
        key: "RootObj",
        value: function() {
            return this._rootObj;
        }
    }, {
        key: "Sid",
        value: function() {
            return this._sid;
        }
    }, {
        key: "Reset",
        value: function() {
            this._rootObj = new t.default(), this._rootObj.Init(this._sid);
        }
    } ]), l;
}(), r = function() {
    function t() {
        n(this, t), this._valueChangedEvents = {}, this._objs = {};
    }
    return e(t, [ {
        key: "DoDispatcher",
        value: function(n) {
            if (null == n) return !1;
            if ("_Sync" != n.n) return !1;
            if (console.log(n), null == n.tm) return !1;
            null == this._objs[0] && (this._objs[0] = new u(0));
            var e = n.o;
            if (null == e) return !1;
            for (var t in e) {
                var r = e[t];
                if (null != r) {
                    var i = this.GetObject(0, t, !0);
                    for (var a in r) {
                        var s = r[a];
                        if (null == s) return !1;
                        var o = s.n, v = i.GetChild(o);
                        if (null != s.d) i.RemoveChild(o); else {
                            var h = s.m;
                            if (null != h) {
                                var f = [];
                                for (var d in h) {
                                    var c = h[d];
                                    null != c && (v.SetValue(d, c), f.push(d));
                                }
                                for (var _ = 0; _ < f.length; _++) {
                                    var b = f[_];
                                    l.PostEvent(v, b);
                                }
                            }
                        }
                    }
                }
            }
            return !0;
        }
    }, {
        key: "PostEvent",
        value: function(n, e) {
            if (null != (i = this.GetValueChangedEvent(n.Sid(), n.Path(), e)) && i(e), null != (r = this.GetValueChangedEvents(n.Sid(), n.Path()))) for (var t in r) i = r[t], 
            "" == t && null != i && i(e);
            var l = n.Path() + "@" + e, u = n.Path();
            do {
                var r = this.GetValueChangedEvents(n.Sid(), u);
                if (null != r) for (var t in r) {
                    var i = r[t];
                    "*" == t && null != i && i(l);
                }
                if ("" == u) u = null; else {
                    var a = u.lastIndexOf("/");
                    u = a < 0 ? "" : u.substr(0, a);
                }
            } while (null != u);
        }
    }, {
        key: "GetObject",
        value: function(n, e) {
            var t = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (null == this._objs[n]) return null;
            var l = this._objs[n].RootObj();
            if ("" != e) for (var u = e.split("/"), r = 0; r < u.length; r++) if (null == (l = l.GetChild(u[r], t))) return null;
            return l;
        }
    }, {
        key: "RootObj",
        value: function() {
            for (var n in this._objs) return this._objs[n];
            return null;
        }
    }, {
        key: "BindValueChangedEvent",
        value: function(n, e, t, l) {
            null == this._valueChangedEvents[n] && (this._valueChangedEvents[n] = {});
            var u = this._valueChangedEvents[n];
            null == u[e] && (u[e] = {});
            var r = u[e];
            null == r[t] && (r[t] = l);
        }
    }, {
        key: "GetValueChangedEvent",
        value: function(n, e, t) {
            if (null == this._valueChangedEvents[n]) return null;
            var l = this._valueChangedEvents[n];
            if (null == l[e]) return null;
            var u = l[e];
            return null == u[t] ? null : u[t];
        }
    }, {
        key: "GetValueChangedEvents",
        value: function(n, e) {
            if (null == this._valueChangedEvents[n]) return null;
            var t = this._valueChangedEvents[n];
            return null == t[e] ? null : t[e];
        }
    }, {
        key: "Clean",
        value: function() {
            this._valueChangedEvents = {}, this._objs = {};
        }
    } ]), t;
}();

l = new r(), module.exports = {
    OOSyncClient: l
};