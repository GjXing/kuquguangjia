function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

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
}(), n = function() {
    function n(t) {
        e(this, n), this.I32Value = t >>> 0;
    }
    return t(n, [ {
        key: "SetBool",
        value: function(e, t) {
            var n = this.pos2mask(e);
            t ? this.I32Value |= n : this.I32Value &= ~n;
        }
    }, {
        key: "GetBool",
        value: function(e) {
            return (this.I32Value & this.pos2mask(e)) > 0;
        }
    }, {
        key: "pos2mask",
        value: function(e) {
            return 1 << e;
        }
    } ]), n;
}();

exports.I32BoolValue = n;