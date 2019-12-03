Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = !1, t = {
    canClick: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 600;
        return !e && (e = !0, setTimeout(function() {
            e = !1;
        }, t), !0);
    }
};

exports.buttonDisabler = t;