function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ServerList = void 0;

var r = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var i = e[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, r, i) {
        return r && t(e.prototype, r), i && t(e, i), e;
    };
}(), i = t(require("../xmldom/dom-parser")), n = t(require("../../../gamecfg")), s = new (function() {
    function t() {
        e(this, t), this._ExistError = !1, this._ExistList = !1;
    }
    return r(t, [ {
        key: "ReLoad",
        value: function() {
            this._ExistError = !1, this._ExistList = !1, this._RetryCount = 0, this._ReLoad();
        }
    }, {
        key: "_ReLoad",
        value: function() {
            var t = this;
            console.log("======================重新装载服务器列表======================"), wx.request({
                url: n.ServerListUrl,
                data: {
                    _: new Date().getTime()
                },
                method: "get",
                header: {
                    "Content-Type": "application/json"
                },
                success: function(e) {
                    t.OnLoadServerListSuccess(e.data);
                },
                fail: function() {
                    t._RetryCount++ < 3 ? t._ReLoad() : (t._ExistError = !0, console.log("======================服务器列表装载错误!======================"));
                }
            });
        }
    }, {
        key: "OnLoadServerListSuccess",
        value: function(t) {
            this._ExistList = !0, console.log("======================获取服务器列表成功======================"), 
            this.AccountSvrList = [], this.WorldSvrList = [], this.GameSvrList = [], this.ArticleSvrList = [];
            var e = new i.DOMParser();
            console.log("xmlParser:", e);
            var r = e.parseFromString(t), n = r.getElementsByTagName("GameServer")[0];
            if (null != n) {
                this.Func = {};
                var s = r.getElementsByTagName("Notice")[0];
                this.Notice = s.getAttribute("txt");
                for (var a = r.getElementsByTagName("Func")[0].getElementsByTagName("a"), o = 0; o < a.length; o++) v = a[o], 
                this.Func[v.getAttribute("name")] = v;
                for (var u = r.getElementsByTagName("ArticleServer")[0], l = n.getElementsByTagName("a"), c = 0; c < l.length; c++) v = l[c], 
                this.GameSvrList.push({
                    url: v.getAttribute("url"),
                    id: v.getAttribute("id")
                });
                for (var g = u.getElementsByTagName("a"), h = 0; h < g.length; h++) {
                    var v = g[h];
                    this.ArticleSvrList.push({
                        url: v.getAttribute("url")
                    });
                }
                this._UpseArray(this.ArticleSvrList);
            } else console.log("======================错误的配置======================");
        }
    }, {
        key: "_UpseArray",
        value: function(t) {
            for (var e = t.length - 1, r = 0; r < t.length; r++) {
                var i = this._RandomNum(0, e), n = t[r];
                t[r] = t[i], t[i] = n;
            }
        }
    }, {
        key: "_RandomNum",
        value: function(t, e) {
            var r = e - t, i = Math.random();
            return t + Math.round(i * r);
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
    }, {
        key: "JumpQMCG",
        get: function() {
            var t = this.Func.JumpQMCG;
            return t ? {
                v: !0,
                appId: t.getAttribute("appId"),
                path: t.getAttribute("path"),
                Quanzhong: t.getAttribute("Quanzhong"),
                Picture: t.getAttribute("Picture")
            } : {
                v: !1
            };
        }
    } ]), t;
}())();

exports.ServerList = s;