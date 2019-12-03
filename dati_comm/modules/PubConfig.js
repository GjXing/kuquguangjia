function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PubConfig = void 0;

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), n = e(require("../libs/xmldom/dom-parser")), a = e(require("../../gamecfg")), o = new (function() {
    function e() {
        t(this, e), this._ExistError = !1, this._ExistList = !1;
    }
    return r(e, [ {
        key: "ReLoad",
        value: function() {
            this._ExistError = !1, this._ExistList = !1, this._RetryCount = 0, this._ReLoad();
        }
    }, {
        key: "_ReLoad",
        value: function() {
            var e = this;
            console.log("======================重新装载公共配置======================"), wx.request({
                url: a.PubConfigUrl,
                data: {
                    _: new Date().getTime()
                },
                method: "get",
                header: {
                    "Content-Type": "application/json"
                },
                success: function(t) {
                    e.OnLoadSuccess(t.data);
                },
                fail: function() {
                    e._RetryCount++ < 3 ? e._ReLoad() : (e._ExistError = !0, console.log("======================公共配置装载错误!======================"));
                }
            });
        }
    }, {
        key: "OnLoadSuccess",
        value: function(e) {
            this._ExistList = !0, console.log("======================获取公共配置成功======================");
            var t = new n.DOMParser().parseFromString(e).getElementsByTagName("AD");
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaa", t[0]), t && t.length > 0 && (this.AD = t[0]);
        }
    }, {
        key: "ExistList",
        get: function() {
            return this._ExistList;
        }
    }, {
        key: "ExistError",
        get: function() {
            return this._ExistError;
        }
    } ]), e;
}())();

exports.PubConfig = o;