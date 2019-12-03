Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.request = function() {
    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "post";
    return new Promise(function(r, u) {
        wx.request({
            url: e.globalData.API_URL,
            data: Object.assign(o, {
                from: e.globalData.XCX_KEY
            }),
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: n,
            success: function(e) {
                r(e);
            },
            fail: function(e) {
                t.default.modal("请求失败");
            },
            complete: function(e) {}
        });
    });
};

var e = require("Conf"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("WxAction"));