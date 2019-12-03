function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
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
}(), r = require("../modules/PubConfig"), n = require("../../modules/Player"), a = require("../libs/long"), i = (function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    t.default = e;
}(require("../../gamecfg")), require("../libs/network/Conns")), o = require("../libs/network/UIEvent.js"), l = require("../libs/network/NSServerList"), u = {}, s = function() {
    function r(t, a, i) {
        e(this, r), this.moshi = t, this.adList = [];
        var o = a.getElementsByTagName("a");
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< " + o + " >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        for (var l = 0; l < o.length; l++) {
            var s = o[l];
            if (t == parseInt(s.getAttribute("moshi"))) {
                var p = 0;
                if (1 == t) {
                    p = parseInt(s.getAttribute("saveid"));
                    var c = i[parseInt((p - 1) / 64)], f = (p - 1) % 64, g = parseInt(f / 8);
                    if (0 != (c[7 - g] >>> 0 & 1 << (g = f % 8)) || u[p]) continue;
                }
                var v = {
                    saveid: p,
                    qz: parseInt(s.getAttribute("qz")),
                    path: s.getAttribute("path"),
                    appId: s.getAttribute("appId"),
                    picture: n.Player.ArticleServerUrl() + "/public/uploads/ProblemImg/" + s.getAttribute("pic"),
                    viphide: parseInt(s.getAttribute("viphide"))
                };
                this.adList.push(v), console.log("AppJumpMgr==================#1", v);
            }
        }
    }
    return t(r, [ {
        key: "Random",
        value: function() {
            if (this.adList.length < 1) return null;
            if (console.log("AppJumpMgr==================#2"), 3 == this.moshi) return this.adList[0];
            for (var e = 0, t = [], r = 0; r < this.adList.length; r++) {
                var a = this.adList[r];
                1 == a.viphide && 1 == n.Player.IsVip || (t.push(a), e += a.qz);
            }
            if (console.log("AppJumpMgr==================#3"), e > 0) for (var i = Math.floor(Math.random() * e), o = 0, r = 0; r < t.length; r++) {
                var l = t[r];
                if (o += l.qz, i < o) return l;
            }
            return null;
        }
    } ]), r;
}(), p = new o.UIEvent(), c = {}, f = 0;

module.exports = {
    Random: function(e) {
        if (c[e] = null, console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", r.PubConfig), r.PubConfig.AD) {
            var t = r.PubConfig.AD.getElementsByTagName("wz" + e);
            if (!(null == t || t.length < 1)) {
                for (var i = [], o = 9001; o <= 9005; o++) {
                    var l = n.Player.Backpack.GetParam(o);
                    null == l ? i.push(a.Long.fromString("0").toBytesBE()) : i.push(a.Long.fromString(l).toBytesBE());
                }
                for (var u = t[0], o = 1; o <= 3; o++) {
                    var p = new s(o, u, i).Random();
                    if (p) {
                        c[e] = p;
                        break;
                    }
                }
            }
        }
    },
    Curr: function(e) {
        return c[e];
    },
    Jump: function(e) {
        if (console.log(c[e]), c[e]) {
            console.log("进入跳转");
            var t = c[e], r = t.saveid;
            console.log("jumpID", r), wx.navigateToMiniProgram({
                appId: t.appId,
                path: t.path,
                envVersion: "release",
                success: function(t) {
                    if (console.log("跳转app成功：", t), r > 0) {
                        f = n.Player.Backpack.ADClick + 1;
                        var a = {
                            n: "jumpApp",
                            id: r,
                            m: 1
                        };
                        i.GameConn.Request(a, function(e) {}), u[r] = !0;
                    } else f = n.Player.Backpack.ADClick;
                    p.Emit(e);
                },
                fail: function(e) {
                    console.log("打开失败：" + e);
                }
            });
        }
    },
    Jumpdati: function() {
        if (l.ServerList.Func) {
            var e = l.ServerList.Func.JumpAppsdt;
            if (e) {
                for (var t = [], r = e.getElementsByTagName("a"), n = 0; n < r.length; n++) {
                    var a = r[n], i = {
                        path: a.getAttribute("path"),
                        appId: a.getAttribute("appId")
                    };
                    t.push(i);
                }
                wx.navigateToMiniProgram({
                    appId: i.appId,
                    path: i.path,
                    envVersion: "release",
                    success: function(e) {
                        console.log("打开成功：" + e);
                    },
                    fail: function(e) {
                        console.log("打开失败：" + e);
                    }
                });
            }
        }
    },
    OnJumpAppSuccess: p,
    GetClickNum: function() {
        return f != n.Player.Backpack.ADClick + 1 && (f = n.Player.Backpack.ADClick), Math.max(f, n.Player.Backpack.ADClick);
    }
};