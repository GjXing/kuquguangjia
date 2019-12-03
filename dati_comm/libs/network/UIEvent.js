function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = function() {
    function n() {
        t(this, n), this._evtList = [];
    }
    return e(n, [ {
        key: "On",
        value: function(t, e) {
            return this._evtList.push([ t, e ]), this;
        }
    }, {
        key: "Off",
        value: function(t) {
            for (var e = 0; e < this._evtList.length; e++) if (this._evtList[e][1] === t) return void this._evtList.splice(e, 1);
        }
    }, {
        key: "Clear",
        value: function() {
            this._evtList = [];
        }
    }, {
        key: "Emit",
        value: function() {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            for (var i = 0; i < this._evtList.length; i++) {
                var r, a = this._evtList[i];
                (r = a[1]).call.apply(r, [ a[0] ].concat(e));
            }
        }
    } ]), n;
}();

exports.UIEvent = n;