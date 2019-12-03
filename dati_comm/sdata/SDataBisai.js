function o(o, t) {
    if (!(o instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(o, t) {
    if (!o) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != (void 0 === t ? "undefined" : i(t)) && "function" != typeof t ? o : t;
}

function e(o, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : i(t)));
    o.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(o, t) : o.__proto__ = t);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, r = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : n(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : n(o);
}, i = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(o) {
    return void 0 === o ? "undefined" : r(o);
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : r(o);
}, u = require("./jscsv"), c = function(o) {
    if (o && o.__esModule) return o;
    var t = {};
    if (null != o) for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);
    return t.default = o, t;
}(require("../../sdata/res/Bisai")), f = new (function(n) {
    function r() {
        o(this, r);
        var e = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, c.data));
        return e.Foreach(function(o, t) {
            switch (t[e.I_BisaiType]) {
              case 6:
                e.Zonghe1v1 = t;
                break;

              case 7:
                e.Fenlei1v1 = t;
                break;

              case 5:
                e.Chuangguan = t;
            }
        }), e;
    }
    return e(r, u.jscsv), r;
}())();

module.exports = {
    SDataBisai: f
};