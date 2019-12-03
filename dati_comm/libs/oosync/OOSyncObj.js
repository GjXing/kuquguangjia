function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = function() {
    function n() {
        e(this, n);
    }
    return t(n, [ {
        key: "Init",
        value: function(e) {
            this._sid = e, this._name = "", this._Parent = null, this._key_values = {}, this._childs = {};
        }
    }, {
        key: "Init",
        value: function(e, t, n) {
            this._sid = e, this._name = n, this._Parent = t, this._key_values = {}, this._childs = {};
        }
    }, {
        key: "GetValue",
        value: function(e) {
            return this._key_values[e];
        }
    }, {
        key: "ChildCount",
        value: function() {
            return Object.getOwnPropertyNames(this._childs).length;
        }
    }, {
        key: "SetValue",
        value: function(e, t) {
            this._key_values[e] = t;
        }
    }, {
        key: "GetChild",
        value: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            if (this.HasChild(e)) return this._childs[e];
            if (!t) return null;
            var i = new n();
            return i.Init(this._sid, this, e), this._childs[e] = i, i;
        }
    }, {
        key: "Delete",
        value: function() {
            this._Parent.RemoveChild(this);
        }
    }, {
        key: "RemoveChild",
        value: function(e) {
            var t = e._name;
            this.HasChild(t) && this._childs[t] == e && this.RemoveChildN(t);
        }
    }, {
        key: "RemoveChildN",
        value: function(e) {
            this._childs.Remove(e);
        }
    }, {
        key: "HasChild",
        value: function(e) {
            return null != this._childs[e];
        }
    }, {
        key: "Path",
        value: function() {
            if (null == this._Parent) return "";
            var e = this._Parent.Path();
            return null == e ? null : "" == e ? this.Name() : e + "/" + this.Name();
        }
    }, {
        key: "Parent",
        value: function() {
            return _Parent;
        }
    }, {
        key: "Name",
        value: function() {
            return this._name;
        }
    }, {
        key: "Sid",
        value: function() {
            return this._sid;
        }
    }, {
        key: "Foreach",
        value: function(e) {
            if (null != e) for (var t in this._childs) e(t, this._childs[t]); else Log("OOSyncObj Foreach jsFun is null");
        }
    } ]), n;
}();

exports.default = n;