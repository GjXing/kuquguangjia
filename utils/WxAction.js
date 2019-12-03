function n(n, t) {
    return new Promise(function(i, o) {
        n(Object.assign({
            success: function(n) {
                i(n);
            },
            fail: function(n) {
                o(n);
            }
        }, t));
    });
}

function t(t) {
    return n(wx.showToast, Object.assign({
        duration: 2e3
    }, t));
}

function i(t) {
    return n(wx.showModal, t);
}

function o(t) {
    return n(wx.showLoading, t);
}

var e = {
    success: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t(Object.assign({
            icon: "success"
        }, i, {
            title: n
        }));
    },
    loading: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t(Object.assign({
            icon: "loading"
        }, i, {
            title: n
        }));
    }
}, s = {
    show: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        o(Object.assign({}, t, {
            title: n
        }));
    },
    hide: function() {
        wx.hideLoading();
    }
};

module.exports = {
    toast: e,
    modal: function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return i(Object.assign({
            showCancel: !1
        }, o, {
            title: n,
            content: t
        }));
    },
    loading: s
};