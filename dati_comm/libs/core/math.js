Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    clamp: function(t, r, e) {
        return Math.min(e, Math.max(t, r));
    },
    cycle: function(t, r, e) {
        var n = e - r;
        if (t < r) {
            var a = (t - e) % n;
            return 0 === a ? r : e + a;
        }
        return t >= e ? r + (t - r) % n : t;
    },
    getSqrDistance: function(t, r) {
        var e = r[0] - t[0], n = r[1] - t[1];
        return Math.pow(e, 2) + Math.pow(n, 2);
    },
    getVec2SqrLength: function(t) {
        return Math.pow(t[0], 2) + Math.pow(t[1], 2);
    },
    randomRange: function(t, r) {
        var e = r - t + 1;
        return Math.floor(Math.random() * e + t);
    }
};

exports.math = t;