function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), o = function() {
    function o(e, n, a, r, i) {
        return t(this, o), this.i = r, this.res = i, this.fp = e, this.tp = n, this.self = a, 
        this.move(), this;
    }
    return n(o, [ {
        key: "createAni",
        value: function(e) {
            var t = {
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: e.ease,
                delay: 0
            };
            return wx.createAnimation(t);
        }
    }, {
        key: "getPos",
        value: function(e) {
            var t = {
                left: 0,
                top: 0
            };
            return new Promise(function(n, o) {
                wx.createSelectorQuery().select(e).boundingClientRect(function(e) {
                    e ? (t.left = e.left, t.top = e.top, n(t)) : o(!1);
                }).exec();
            });
        }
    }, {
        key: "move",
        value: function() {
            var t = this;
            Promise.all([ this.getPos(this.fp), this.getPos(this.tp) ]).then(function(n) {
                console.log(n);
                var o = {
                    endLeft: n[0].left,
                    endTop: n[0].top,
                    fromLeft: t.res.left,
                    fromTop: t.res.top
                }, a = t.createMovePoint();
                a = Object.assign(a, o), console.log("--\x3e", a);
                var r = t.createAni(a);
                t.self.setData(e({}, "anbox.ax_" + t.i, r.left(t.res.left).top(t.res.top).step().opacity(1).step({
                    duration: 1
                }).export())), setTimeout(function() {
                    t.self.setData(e({}, "anbox.ax_" + t.i, r.left(a.left).top(a.top).rotateY(180).scale(1.2).step().left(a.endLeft).top(a.endTop).rotateY(0).scale(1).step().export()));
                }, 1e3), setTimeout(function() {
                    t.self.setData(e({}, "anbox.ax_" + t.i, r.opacity(0).step().export()));
                }, 2e3), setTimeout(function() {
                    t.self.setData(e({}, "anbox.ax_" + t.i, r.left(n[1].left).top(n[1].top).step().export()));
                }, 3e3);
            }).catch(function(e) {
                console.log(e);
            });
        }
    }, {
        key: "createMovePoint",
        value: function() {
            var e = [ "linear", "ease", "ease-in", "ease-in-out", "ease-out" ], t = Math.floor(270 * Math.random() + 30), n = Math.floor(340 * Math.random() + 10);
            return {
                ease: e[this.createRandom([ 0, e.length ])],
                left: t,
                top: n
            };
        }
    }, {
        key: "createRandom",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [ max, min ];
            return Math.floor(Math.random() * (e[0] - e[1]) + e[1]);
        }
    } ]), o;
}();

exports.default = function(t, n, a) {
    var r = [ 15, 25, 35, 45 ];
    a.setData(e({}, "data.arr", new Array(r[n]))), wx.createSelectorQuery().selectAll(t).boundingClientRect(function(e) {
        if (e.length) for (var t = {
            left: e[n].left,
            top: e[n].top
        }, i = 0; i < r[n]; i++) new o("#coin_img", "#coin_f_" + i, a, i, t);
    }).exec();
};