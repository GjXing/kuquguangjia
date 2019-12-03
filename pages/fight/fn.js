function n(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function n(n, t) {
        for (var r = 0; r < t.length; r++) {
            var e = t[r];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(n, e.key, e);
        }
    }
    return function(t, r, e) {
        return r && n(t.prototype, r), e && n(t, e), t;
    };
}(), r = function() {
    function r(t) {
        n(this, r);
        var e = {};
        e = Object.assign(e, t), this.cur_turn_level = e.cur_turn_level, this.ALL_IDIOMS = e.ALL_IDIOMS, 
        this.currentGussint = this.ALL_IDIOMS[this.cur_turn_level - 1], this.Da_An_Index_Arr = [], 
        this.getTenChenYu(this.cur_turn_level);
    }
    return t(r, [ {
        key: "getTenChenYu",
        value: function(n) {
            var t = this, r = this.ALL_IDIOMS.slice(n - 1, 10 + n - 1).join(""), e = [];
            this.getRandomArr(r.length - 1).forEach(function(n, t) {
                e.push(r[n]);
            }), this.random_da_an = this.getDaAn(e), this.currentGussint.split("").forEach(function(n, r) {
                t.Da_An_Index_Arr.push(t.random_da_an.indexOf(n));
            }), this.random_da_an.push("");
        }
    }, {
        key: "getRandom",
        value: function(n) {
            var t = Math.random() * n, r = Math.round(t);
            return r = Math.max(Math.min(r, n), 0);
        }
    }, {
        key: "getRandomArr",
        value: function(n) {
            for (var t = [], r = !0; r; ) {
                var e = this.getRandom(n);
                t.includes(e) || (t.push(e), t.length == n + 1 && (r = !1));
            }
            return t;
        }
    }, {
        key: "getDaAn",
        value: function(n) {
            for (var t = [], r = 0; r < 16; r++) {
                var e = n.shift();
                this.currentGussint.includes(e) && (n.push(e), r--);
            }
            return this.getRandomArr(32).forEach(function(r, e) {
                t.push(n[r]);
            }), n.sort(function() {
                return .5 - Math.random();
            }), n;
        }
    }, {
        key: "tipDaAn",
        value: function(n) {
            for (var t = 0; t < this.random_da_an.length; t++) if (this.random_da_an[t] == n) return t;
        }
    }, {
        key: "updateDAANIndex",
        value: function() {
            for (var n = !0, t = 0, r = 0, e = [], a = this.Da_An_Index_Arr; n; ) {
                var u = t % 4;
                this.currentGussint[r] == this.random_da_an[a[u]] && (e.push(a[u]), ++r == a.length && (n = !1)), 
                t++;
            }
            return e;
        }
    } ]), r;
}();

exports.default = r;