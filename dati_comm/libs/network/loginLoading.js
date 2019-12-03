Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    show: function(e) {
        var o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        wx.showLoading({
            title: e,
            mask: o
        });
    },
    hide: function() {
        wx.hideLoading();
    }
};

exports.loginLoading = e;