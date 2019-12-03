function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), n = function() {
    function n(e, a) {
        t(this, n), this.Id = parseInt(e), this.attr = a;
    }
    return e(n, [ {
        key: "Num",
        get: function() {
            return parseInt(this.attr.GetValue("Num"));
        }
    }, {
        key: "ShopId",
        get: function() {
            return parseInt(this.attr.GetValue("ShopId"));
        }
    }, {
        key: "SubType",
        get: function() {
            return parseInt(this.attr.GetValue("SubType"));
        }
    }, {
        key: "InvalidTime",
        get: function() {
            return this.attr.GetValue("itime");
        }
    }, {
        key: "InvalidDate",
        get: function() {
            var t = this.InvalidTime, e = parseInt(t % 100);
            t /= 100;
            var n = parseInt(t % 100);
            t /= 100;
            var a = parseInt(t % 100);
            t /= 100;
            var r = parseInt(t % 100);
            t /= 100;
            var i = parseInt(t % 100);
            t /= 100;
            var u = parseInt(t), s = "{0}/{1}/{2} {3}:{4}:{5}".format(u, i, r, a, n, e);
            return new Date(s);
        }
    }, {
        key: "InvalidHours",
        get: function() {
            var t = new Date();
            return parseInt(Math.abs(this.InvalidDate - t) / 1e3 / 60 / 60);
        }
    } ]), n;
}(), a = function() {
    function a() {
        t(this, a);
    }
    return e(a, [ {
        key: "_BindSync",
        value: function(t) {
            this.SyncObj = t;
        }
    }, {
        key: "GetParam",
        value: function(t) {
            var e = this.SyncObj.GetChild("Params", !1);
            return null == e ? null : e.GetValue(t);
        }
    }, {
        key: "GetGoodsList",
        value: function(t) {
            var e = [];
            if (!this._BackpackList) return null;
            var a = new Date();
            return this._BackpackList.Foreach(function(r, i) {
                if (console.log("GetGoodsList subtype", i.GetValue("SubType")), parseInt(i.GetValue("SubType")) == t) {
                    var u = new n(r, i);
                    a < u.InvalidDate && e.push(u);
                }
            }), e;
        }
    }, {
        key: "GetFirstGoods",
        value: function(t) {
            var e = this.GetGoodsList(t);
            return !e || e.length < 1 ? null : e[0];
        }
    }, {
        key: "GetGoods",
        value: function(t, e) {
            if (!this._BackpackList) return null;
            var a = null;
            return this._BackpackList.Foreach(function(r, i) {
                null == a && parseInt(i.GetValue("SubType")) == t && parseInt(i.GetValue("ShopId")) == e && (a = new n(r, i));
            }), a && a.InvalidTime > 0 && new Date() > a.InvalidDate && (a = null), a;
        }
    }, {
        key: "Foreach",
        value: function(t) {
            this._BackpackList && this._BackpackList.Foreach(function(e, a) {
                t(new n(e, a));
            });
        }
    }, {
        key: "_BackpackList",
        get: function() {
            return this.SyncObj.GetChild("Goods", !1);
        }
    }, {
        key: "IsVip",
        get: function() {
            return !!this.VipGoods;
        }
    }, {
        key: "AD",
        get: function() {
            if (null == this.SyncObj) return [];
            for (var t = this.SyncObj.GetValue("AD").split(";"), e = [], n = 0; n < t.length; n++) e.push(parseInt(t[n]));
            return e;
        }
    }, {
        key: "ADClick",
        get: function() {
            return null == this.SyncObj ? 0 : parseInt(this.SyncObj.GetValue("ADClick"));
        }
    }, {
        key: "VipGoods",
        get: function() {
            return this.GetGoods(13, 1);
        }
    }, {
        key: "ShareGerenNum",
        get: function() {
            return parseInt(this.GetParam(201));
        }
    }, {
        key: "ShareQunNum",
        get: function() {
            return parseInt(this.GetParam(202));
        }
    } ]), a;
}();

module.exports = {
    _Backpack: a
};