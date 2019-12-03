function t(t, o) {
    if (!(t instanceof o)) throw new TypeError("Cannot call a class as a function");
}

function o(t, o) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !o || "object" != (void 0 === o ? "undefined" : u(o)) && "function" != typeof o ? t : o;
}

function e(t, o) {
    if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === o ? "undefined" : u(o)));
    t.prototype = Object.create(o && o.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(t, o) : t.__proto__ = o);
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : n(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : n(t);
}, u = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : r(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : r(t);
}, i = require("./jscsv"), f = function(t) {
    if (t && t.__esModule) return t;
    var o = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (o[e] = t[e]);
    return o.default = t, o;
}(require("../../sdata/res/Question")), s = new (function(n) {
    function r() {
        t(this, r);
        var e = o(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, f.data));
        return e.RootQuest = [], e.Foreach(function(t, o) {
            var n = o[e.I_Parent];
            if (n >= 0) {
                var r = e.GetRow(n);
                null == r.subs && (r.subs = []), r.subs.push(o);
            } else e.RootQuest.push(o);
        }), e;
    }
    return e(r, i.jscsv), r;
}())();

module.exports = {
    SDataQuestion: s
};