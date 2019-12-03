var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(a) {
    return void 0 === a ? "undefined" : t(a);
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : void 0 === a ? "undefined" : t(a);
}, e = "function" == typeof Symbol && "symbol" == a(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : a(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : a(t);
}, s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
};

!function() {
    function t(t) {
        var a = "";
        try {
            a = wx.getStorageSync("aldstat_uuid");
        } catch (t) {
            a = "uuid-getstoragesync";
        }
        if (!a) {
            a = "" + Date.now() + Math.floor(1e7 * Math.random());
            try {
                wx.setStorageSync("aldstat_uuid", a);
            } catch (t) {
                wx.setStorageSync("aldstat_uuid", "uuid-getstoragesync");
            }
            t.aldstat_is_first_open = !0;
        }
        return a;
    }
    function a() {
        wx.request({
            url: "https://" + _ + ".aldwx.com/config/app.json",
            header: {
                AldStat: "MiniApp-Stat"
            },
            method: "GET",
            success: function(t) {
                if (200 === t.statusCode) for (var a in t.data) wx.setStorageSync(a, t.data[a]);
            }
        });
    }
    function e(t, a, e) {
        if (t[a]) {
            var s = t[a];
            t[a] = function(t) {
                e.call(this, t, a), s.call(this, t);
            };
        } else t[a] = function(t) {
            e.call(this, t, a);
        };
    }
    function o(t, a, e) {
        if (t[a]) {
            var s = t[a];
            t[a] = function(t) {
                var o = s.call(this, t);
                return e.call(this, [ t, o ], a), o;
            };
        } else t[a] = function(t) {
            e.call(this, t, a);
        };
    }
    function n(t) {
        this.app = t;
    }
    function r(t) {
        for (var a in t) return !1;
        return !0;
    }
    function i(t) {
        if ("string" != typeof t) return !1;
        var a = t.replace(/\s+/g, "_");
        return !/[~`!@/#+=\$%\^()&\*]+/g.test(a);
    }
    var l = "6.1.2", _ = "log", d = require("./ald-stat-conf.js"), c = 0, u = 0, p = 0, h = 0, f = {}, g = function(t) {
        wx.getSetting && wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? (console.log("获取了用户信息啊"), wx.getUserInfo({
                    withCredentials: !1,
                    success: function(a) {
                        t(a);
                    }
                })) : console.log("未获取用户信息啊");
            }
        });
    }, w = function(t, a, e) {
        void 0 === arguments[1] && (a = "GET"), void 0 === arguments[2] && (e = "d.html");
        var s = 0;
        !function o() {
            c += 1, t.rq_c = c, wx.request({
                url: "https://" + _ + ".aldwx.com/" + e,
                data: t,
                header: {
                    AldStat: "MiniApp-Stat"
                },
                method: a,
                success: function() {},
                fail: function() {
                    s < 2 && (s++, t.retryTimes = s, o());
                }
            });
        }();
    }, v = function(a, e, s, o) {
        var n = {
            ak: d.app_key,
            uu: t(a),
            at: a.aldstat_access_token,
            st: Date.now(),
            tp: s,
            ev: e,
            v: l
        };
        o && (n.ct = o), a.aldstat_qr && (n.qr = a.aldstat_qr), w(n, "GET", "d.html");
    }, y = function(a, e, s, o) {
        void 0 === a.aldstat_showoption && (a.aldstat_showoption = {});
        var n = {
            ak: d.app_key,
            wsr: a.aldstat_showoption,
            uu: t(a),
            at: a.aldstat_access_token,
            st: Date.now(),
            tp: s,
            ev: e,
            nt: a.aldstat_network_type,
            pm: a.aldstat_phone_model,
            pr: a.aldstat_pixel_ratio,
            ww: a.aldstat_window_width,
            wh: a.aldstat_window_height,
            lang: a.aldstat_language,
            wv: a.aldstat_wechat_version,
            lat: a.aldstat_lat,
            lng: a.aldstat_lng,
            spd: a.aldstat_speed,
            v: l
        };
        o && (n.ct = o), a.aldstat_location_name && (n.ln = a.aldstat_location_name), a.aldstat_src && (n.sr = a.aldstat_src), 
        a.aldstat_qr && (n.qr = a.aldstat_qr), w(n, "GET", "d.html");
    };
    n.prototype.debug = function(t) {
        y(this.app, "debug", 0, t);
    }, n.prototype.warn = function(t) {
        y(this.app, "debug", 1, t);
    }, n.prototype.error = function(t) {
        v(this.app, "debug", 2, t);
    }, n.prototype.sendEvent = function(t, a) {
        if (!i(t)) return !1;
        if (t.length >= 255) return !1;
        if ("object" === (void 0 === a ? "undefined" : s(a))) {
            for (var e in a) {
                if (!i(e)) return !1;
                if ("object" == s(a[e])) return !1;
                if (!i(a[e])) return !1;
            }
            y(this.app, "event", t, JSON.stringify(a));
        } else if ("string" == typeof a && a.length <= 255) {
            if (i(a)) {
                var o = String(a);
                new Object()[o] = a, y(this.app, "event", t, a);
            }
        } else y(this.app, "event", t, !1);
    };
    var m = function() {
        var t = this;
        t.aldstat_duration += Date.now() - t.aldstat_showtime, k(t, "app", "unLaunch");
    }, S = function(t, a, e) {
        void 0 !== wx.getShareInfo ? wx.getShareInfo({
            shareTicket: a,
            success: function(a) {
                y(t, "event", "ald_share_" + e, JSON.stringify(a));
            },
            fail: function() {
                y(t, "event", "ald_share_" + e, "1");
            }
        }) : y(t, "event", "ald_share_" + e, "1");
    }, b = function(e) {
        a(), this.aldstat = new n(this);
        var s = "";
        try {
            s = wx.getStorageSync("aldstat_src");
        } catch (e) {
            s = "uuid-getstoragesync";
        }
        s && (this.aldstat_src = s);
        var o = t(this);
        this.aldstat_uuid = o, this.aldstat_timestamp = Date.now(), this.aldstat_showtime = Date.now(), 
        this.aldstat_duration = 0;
        var r = this;
        r.aldstat_error_count = 0, r.aldstat_page_count = 1, r.aldstat_first_page = 0, this.aldstat_showoption = void 0 !== e ? e : {};
        var i = function() {
            g(function(t) {
                var a = "";
                try {
                    a = wx.getStorageSync("aldstat_uuid");
                } catch (t) {
                    a = "uuid-getstoragesync";
                }
                t.userInfo.uu = a, f = t, w(t.userInfo, "GET", "u.html");
            });
        }, l = function() {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    r.aldstat_lat = t.latitude, r.aldstat_lng = t.longitude, r.aldstat_speed = t.speed;
                }
            });
        };
        wx.getNetworkType({
            success: function(t) {
                r.aldstat_network_type = t.networkType;
            },
            complete: function() {
                wx.getSystemInfo({
                    success: function(t) {
                        r.aldstat_vsdk_version = void 0 === t.SDKVersion ? "1.0.0" : t.SDKVersion, r.aldstat_phone_model = t.model, 
                        r.aldstat_pixel_ratio = t.pixelRatio, r.aldstat_window_width = t.windowWidth, r.aldstat_window_height = t.windowHeight, 
                        r.aldstat_language = t.language, r.aldstat_wechat_version = t.version, r.aldstat_sv = t.system, 
                        r.aldstat_wvv = t.platform;
                    },
                    complete: function() {
                        d.getLocation && l(), i();
                    }
                });
            }
        });
        var _ = "";
        try {
            _ = wx.getStorageSync("app_session_key_create_launch_upload");
        } catch (e) {
            _ = "";
        }
        _ ? _ > 0 && "number" == typeof _ && (r.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())) : r.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random()), 
        k(r, "app", "launch");
    }, x = function(t, a) {
        var e = this;
        void 0 === this.aldstat_error_count ? this.aldstat_error_count = 1 : this.aldstat_error_count++, 
        y(e, "event", "ald_error_message", JSON.stringify(t));
    }, k = function(a, e, s) {
        var o = "";
        try {
            o = wx.getStorageSync("app_" + s + "_upload");
        } catch (a) {
            o = "";
        }
        if ((o || "launch" === s) && !(o < 1 && "number" == typeof o)) {
            void 0 === a.aldstat_timestamp && (a.aldstat_timestamp = Date.now());
            var n = wx.getSystemInfoSync();
            a.aldstat_vsdk_version = void 0 === n.SDKVersion ? "1.0.0" : n.SDKVersion, a.aldstat_phone_model = n.model, 
            a.aldstat_pixel_ratio = n.pixelRatio, a.aldstat_window_width = n.windowWidth, a.aldstat_window_height = n.windowHeight, 
            a.aldstat_language = n.language, a.aldstat_sv = n.system, a.aldstat_wvv = n.platform;
            var r = {
                ak: d.app_key,
                waid: d.appid,
                wst: d.appsecret,
                uu: t(a),
                at: a.aldstat_access_token,
                wsr: a.aldstat_showoption,
                st: a.aldstat_timestamp,
                dr: a.aldstat_duration,
                et: Date.now(),
                pc: a.aldstat_page_count,
                fp: a.aldstat_first_page,
                lp: a.aldstat_last_page,
                life: s,
                ec: a.aldstat_error_count,
                nt: a.aldstat_network_type,
                pm: a.aldstat_phone_model,
                wsdk: a.aldstat_vsdk_version,
                pr: a.aldstat_pixel_ratio,
                ww: a.aldstat_window_width,
                wh: a.aldstat_window_height,
                lang: a.aldstat_language,
                wv: a.aldstat_wechat_version,
                lat: a.aldstat_lat,
                lng: a.aldstat_lng,
                spd: a.aldstat_speed,
                v: l,
                ev: e,
                sv: a.aldstat_sv,
                wvv: a.aldstat_wvv
            };
            "launch" === s ? u += 1 : "show" === s ? p += 1 : h += 1, r.la_c = u, r.as_c = p, 
            r.ah_c = h, a.page_share_count && "number" == typeof a.page_share_count && (r.sc = a.page_share_count), 
            a.aldstat_is_first_open && (r.ifo = "true"), a.aldstat_location_name && (r.ln = a.aldstat_location_name), 
            a.aldstat_src && (r.sr = a.aldstat_src), a.aldstat_qr && (r.qr = a.aldstat_qr), 
            a.ald_share_src && (r.usr = a.ald_share_src), w(r, "GET", "d.html");
        }
    }, q = function(t) {
        this.aldstat_showtime = Date.now(), this.aldstat_showoption = void 0 !== t ? t : {};
        var a = "";
        try {
            a = wx.getStorageSync("app_session_key_create_show_upload");
        } catch (t) {
            a = "";
        }
        a && a > 0 && "number" == typeof a && (this.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())), 
        k(this, "app", "show"), void 0 !== t && (void 0 !== t.shareTicket ? S(this, t.shareTicket, "click") : void 0 !== t.query && void 0 !== t.query.ald_share_src && S(this, "0", "click"));
    }, D = function(t, a) {
        var e = this;
        e.aldstat_is_first_open && (e.aldstat_is_first_open = !1), e.aldstat_duration = Date.now() - e.aldstat_showtime, 
        k(e, "app", "hide");
    }, T = function(t, a) {
        var e = getApp();
        I(e, this, "hide");
    }, A = function(t, a) {
        var e = getApp();
        I(e, this, "unload");
    }, M = function(t, a) {
        var e = "";
        try {
            e = wx.getStorageSync("aldstat_src");
        } catch (t) {
            e = "";
        }
        var s = getApp();
        if (wx.showShareMenu, e && (s.aldstat_src = e), !r(t)) {
            if (void 0 !== t.aldsrc) if (e) s.aldstat_qr = t.aldsrc; else {
                try {
                    wx.setStorageSync("aldstat_src", t.aldsrc);
                } catch (t) {}
                s.aldstat_src = t.aldsrc, s.aldstat_qr = t.aldsrc;
            }
            void 0 !== t.ald_share_src && (s.ald_share_src = t.ald_share_src), this.aldstat_page_args = JSON.stringify(t);
        }
        I(s, this, "load");
    }, I = function(a, e, s) {
        var o = "";
        try {
            o = wx.getStorageSync("page_" + s + "_upload");
        } catch (a) {
            o = "";
        }
        if ((o || "show" === s) && !(o < 1 && "number" == typeof o)) {
            e.aldstat_start_time = Date.now(), e.aldstat_error_count = 0, a.aldstat_page_count ? a.aldstat_page_count++ : a.aldstat_page_count = 1, 
            a.aldstat_first_page || (a.aldstat_first_page = e.__route__, e.aldstat_is_first_page = !0), 
            a.aldstat_last_page = e.__route__;
            var n = {
                uu: t(a),
                at: a.aldstat_access_token,
                wsr: a.aldstat_showoption,
                ak: d.app_key,
                ev: "page",
                st: e.aldstat_start_time,
                dr: Date.now() - e.aldstat_start_time,
                pp: e.__route__,
                life: s,
                sc: e.page_share_count,
                ec: e.aldstat_error_count,
                nt: a.aldstat_network_type,
                pm: a.aldstat_phone_model,
                pr: a.aldstat_pixel_ratio,
                ww: a.aldstat_window_width,
                wh: a.aldstat_window_height,
                lang: a.aldstat_language,
                wv: a.aldstat_wechat_version,
                lat: a.aldstat_lat,
                lng: a.aldstat_lng,
                spd: a.aldstat_speed,
                v: l,
                wsdk: a.aldstat_vsdk_version,
                sv: a.aldstat_sv,
                wvv: a.aldstat_wvv
            };
            e.aldstat_is_first_page && (n.ifp = "true"), a.aldstat_page_last_page && (n.lp = a.aldstat_page_last_page), 
            a.aldstat_location_name && (n.ln = a.aldstat_location_name), e.aldstat_page_args && (n.ag = e.aldstat_page_args), 
            a.aldstat_src && (n.sr = a.aldstat_src), a.aldstat_qr && (n.qr = a.aldstat_qr), 
            a.ald_share_src && (n.usr = a.ald_share_src), a.aldstat_page_last_page = e.__route__, 
            w(n, "GET", "d.html");
        }
    }, E = function(t, a) {
        var e = getApp();
        I(e, this, "show");
    }, G = function(t, a) {
        var e = getApp();
        y(e, "event", "ald_pulldownrefresh", 1);
    }, O = function(t, a) {
        var e = getApp();
        y(e, "event", "ald_reachbottom", 1);
    }, j = function(t, a) {
        var e = this, o = getApp();
        if (void 0 !== t && void 0 !== t[1]) {
            var n = "";
            try {
                n = wx.getStorageSync("aldstat_uuid");
            } catch (t) {
                n = "uuid-getstoragesync";
            }
            var r = "";
            try {
                r = wx.getStorageSync(n);
            } catch (t) {
                r = "p_share_count_getst";
            }
            var i = "";
            if ("undefined" !== o.ald_share_src && o.ald_share_src) {
                for (var l = (i = o.ald_share_src).split(","), _ = !0, c = 0, u = l.length; c < u; c++) if (l[c].replace('"', "") == n) {
                    _ = !1;
                    break;
                }
                l.length >= 3 && (_ && l.shift(), i = l.toString()), "" !== i && _ && (i = i + "," + n);
            } else try {
                i = wx.getStorageSync("aldstat_uuid");
            } catch (t) {
                i = "ald_share_src_getst";
            }
            if (t[1].path && "undefined" !== t[1].path || (d.defaultPath ? t[1].path = d.defaultPath : t[1].path = e.__route__), 
            -1 != t[1].path.indexOf("?") ? t[1].path += "&ald_share_src=" + i : t[1].path += "?ald_share_src=" + i, 
            y(o, "event", "ald_share_chain", {
                path: o.aldstat_last_page,
                chain: i
            }), "" === r || void 0 === r) {
                try {
                    wx.setStorageSync(n, 1);
                } catch (t) {}
                r = 1, o.page_share_count = r;
            } else {
                r = parseInt(wx.getStorageSync(n)) + 1, o.page_share_count = r;
                try {
                    wx.setStorageSync(n, r);
                } catch (t) {}
            }
            g(function(t) {
                var a = "";
                try {
                    a = wx.getStorageSync("aldstat_uuid");
                } catch (t) {
                    a = "uuid-getstoragesync";
                }
                t.userInfo.uu = a, w(t.userInfo, "GET", "u.html");
            }), t[1], void 0 === t[1].success && (t[1].success = function(t) {}), void 0 === t[1].fail && (t[1].fail = function(t) {});
            var p = t[1].fail, h = t[1].success;
            return t[1].success = function(t) {
                if (new Array(), "object" === s(t.shareTickets)) for (var a = 0; a < t.shareTickets.length; a++) S(o, t.shareTickets[a], "user");
                y(o, "event", "ald_share_status", JSON.stringify(t)), h(t);
            }, t[1].fail = function(t) {
                y(o, "event", "ald_share_status", "fail"), p(t);
            }, t[1];
        }
    }, N = App;
    App = function(t) {
        e(t, "onLaunch", b), e(t, "onUnlaunch", m), e(t, "onShow", q), e(t, "onHide", D), 
        e(t, "onError", x), N(t);
    };
    var J = Page;
    Page = function(t) {
        e(t, "onLoad", M), e(t, "onUnload", A), e(t, "onShow", E), e(t, "onHide", T), e(t, "onReachBottom", O), 
        e(t, "onPullDownRefresh", G), void 0 !== t.onShareAppMessage && o(t, "onShareAppMessage", j), 
        J(t);
    };
}();