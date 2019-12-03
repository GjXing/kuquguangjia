getApp(), Component({
    properties: {
        btnType: {
            type: String,
            value: "normal"
        }
    },
    data: {
        friend: {}
    },
    attached: function() {
        var t = this;
        !function(a) {
            if (a) {
                var e = [], r = [], n = 0, i = 0, l = !0, o = !1, d = void 0;
                try {
                    for (var f, y = a[Symbol.iterator](); !(l = (f = y.next()).done); l = !0) {
                        var p = f.value;
                        "image" == t.data.btnType && 0 !== p.category || "normal" == t.data.btnType && 1 !== p.category || (p.self_id ? t.id && t.id == p.self_id && (r.push(p), 
                        i += p.table) : (e.push(p), n += p.table));
                    }
                } catch (t) {
                    o = !0, d = t;
                } finally {
                    try {
                        !l && y.return && y.return();
                    } finally {
                        if (o) throw d;
                    }
                }
                var h = r.length ? r : e, u = r.length ? i : n;
                if (h.length) {
                    var v = Math.random(), c = 0, s = !0, b = !1, g = void 0;
                    try {
                        for (var m, S = h[Symbol.iterator](); !(s = (m = S.next()).done); s = !0) {
                            var w = m.value;
                            if (c <= v && v < c + w.table / u) {
                                t.setData({
                                    friend: w
                                });
                                break;
                            }
                            c += w.table / u;
                        }
                    } catch (t) {
                        b = !0, g = t;
                    } finally {
                        try {
                            !s && S.return && S.return();
                        } finally {
                            if (b) throw g;
                        }
                    }
                }
            }
        }(wx.getStorageSync("zsdlFriendLinkData"));
    },
    methods: {
        tapApp: function(t) {}
    }
});