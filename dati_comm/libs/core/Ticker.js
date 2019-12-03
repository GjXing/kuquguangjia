function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), n = new (function() {
    function n() {
        e(this, n), this._callbacks = [], this._lastTime = Date.now();
    }
    return t(n, [ {
        key: "register",
        value: function(e, t) {
            this._callbacks.push([ e, t ]);
        }
    }, {
        key: "unregister",
        value: function(e) {
            var t = this._callbacks.indexOf(e);
            -1 !== t && this._callbacks.splice(t, 1);
        }
    }, {
        key: "start",
        value: function(e) {
            setInterval(this._tick.bind(this), 1e3 / e);
        }
    }, {
        key: "_tick",
        value: function() {
            var e = Date.now(), t = e - this._lastTime;
            this._lastTime = e;
            for (var n = 0; n < this._callbacks.length; n++) {
                var a = this._callbacks[n];
                a[1].call(a[0], t / 1e3);
            }
        }
    } ]), n;
}())();

exports.Ticker = n;