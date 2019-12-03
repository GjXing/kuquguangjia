function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PageEvents = void 0;

var r = function() {
    function e(e, r) {
        for (var o = 0; o < r.length; o++) {
            var n = r[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, o, n) {
        return o && e(r.prototype, o), n && e(r, n), r;
    };
}(), o = {
    OnTopWndChanged: new (require("../libs/network/UIEvent.js").UIEvent)()
}, n = null, t = function() {
    function t(r) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        e(this, t), this.url = r, this.jumpMode = o;
    }
    return r(t, [ {
        key: "Show",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            if (n !== this || "/pages/fightOver/fightOverPage" !== this.url) {
                n = this, o.OnTopWndChanged.Emit(this);
                var t = this.url;
                if (e) {
                    var a = "";
                    for (var i in e) {
                        var l = (e[i] + "").replace("=", "%3D");
                        console.log(l);
                        var u = i + "=" + l;
                        "" == a ? a = u : a += "&" + u;
                    }
                    t += "?" + a, r && (t += "&" + r), console.log("PageShow#1 ", t);
                } else r && (t += "?" + r), console.log("PageShow#2 ", t);
                console.log("PageShow ", t);
                var s = this._TemporaryJumpMode ? this._TemporaryJumpMode : this.jumpMode;
                switch (this._TemporaryJumpMode = null, s) {
                  case 2:
                    wx.reLaunch({
                        url: t
                    });
                    break;

                  case 1:
                    wx.navigateTo({
                        url: t
                    });
                    break;

                  case 3:
                    wx.redirectTo({
                        url: t
                    });
                }
            }
        }
    }, {
        key: "IsVisible",
        value: function() {
            return n == this;
        }
    }, {
        key: "TemporaryJumpMode",
        set: function(e) {
            this._TemporaryJumpMode = e;
        }
    } ]), t;
}();

exports.default = t, exports.PageEvents = o;