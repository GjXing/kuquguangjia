function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), t = require("./NSSocket"), r = [], o = !1, a = new (function() {
    function a() {
        e(this, a);
    }
    return n(a, [ {
        key: "CreateConn",
        value: function(e, n, t) {
            var a = this;
            o || (o = !0, setInterval(function() {
                return a.Update();
            }, 3e3)), r.push({
                routeFlag: e,
                sessionCode: n,
                reCall: t
            });
        }
    }, {
        key: "Update",
        value: function() {
            if (0 != r.length) {
                var e = r[0];
                r.splice(0, 1), e.reCall(new t.NSSocket(e.routeFlag, e.sessionCode));
            }
        }
    } ]), a;
}())();

module.exports = {
    NSSocketPool: a
};