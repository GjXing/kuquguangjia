module.exports = {
    CheckAuthorize: function(e) {
        wx.getSetting({
            success: function(t) {
                console.log("###############getSetting success..."), e && e(!!t.authSetting["scope.userInfo"]);
            },
            fail: function() {
                console.log("###############getSetting fail..."), e && e(!1);
            }
        });
    },
    GetUserInfo: function(e) {
        return e.detail && e.detail.errMsg && "getUserInfo:ok" == e.detail.errMsg ? JSON.parse(e.detail.rawData) : null;
    }
};