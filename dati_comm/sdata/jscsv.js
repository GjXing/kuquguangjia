function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

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
}(), n = {
    int: 1,
    str: 2
}, a = function() {
    function a(t) {
        e(this, a), this.mFieldName2Index = {}, this.mData = t, this.mIndexToFieldName = {};
        for (var i = this.mData.head, r = 0; r < i.length; r++) {
            var o = i[r];
            this.mFieldName2Index[o] = r, this.mIndexToFieldName[r] = o, this["I_" + o] = r;
        }
        this.keytype = "str" == t.info.keytype ? n.str : n.int;
    }
    return t(a, [ {
        key: "Name2I",
        value: function(e) {
            return this.mFieldName2Index[e];
        }
    }, {
        key: "GetFieldV",
        value: function(e, t) {
            return this.mData.body[t][this.Name2I(e)];
        }
    }, {
        key: "GetV",
        value: function(e, t) {
            return this.mData.body[t][e];
        }
    }, {
        key: "GetRow",
        value: function(e) {
            return this.mData.body[e];
        }
    }, {
        key: "GetCount",
        value: function() {
            var e = 0;
            for (var t in this.mData.body) e++;
            return e;
        }
    }, {
        key: "Contain",
        value: function(e) {
            return null != this.mData.body[e];
        }
    }, {
        key: "Foreach",
        value: function(e) {
            var t = this.mData.body;
            for (var n in t) e(n, t[n]);
        }
    } ]), a;
}();

module.exports = {
    jscsv: a
};