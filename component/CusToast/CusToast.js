var t = {
    "_toast_.isHide": !1,
    "_toast_.content": ""
}, e = function(t, e, s) {
    return e in t ? Object.defineProperty(t, e, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = s, t;
}({
    show: function(t) {
        var e = this;
        this.setData({
            "_toast_.isHide": !0,
            "_toast_.content": t
        }), setTimeout(function() {
            e.setData({
                "_toast_.isHide": !1
            });
        }, 2e3);
    }
}, "show", function(t, e) {
    var s = this;
    this.setData({
        "_toast_.isHide": !0,
        "_toast_.content": t
    }), setTimeout(function() {
        s.setData({
            "_toast_.isHide": !1
        });
    }, e);
});

module.exports = {
    ToastPannel: function() {
        var s = getCurrentPages(), a = s[s.length - 1];
        return this.__page = a, Object.assign(a, e), a.toastPannel = this, a.setData(t), 
        this;
    }
};