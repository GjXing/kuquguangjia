function t() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
        var n = 16 * Math.random() | 0;
        return ("x" == t ? n : 3 & n | 8).toString(16);
    });
}

module.exports = {
    gameid: 10,
    getUserId: function() {
        var n = wx.getStorageSync("userid");
        return n || (n = t(), wx.setStorageSync("userid", n)), n;
    },
    init: function(t, n) {},
    reportLogin: function() {},
    reportGold: function(t, n, x, r) {},
    reportEvent: function(t) {},
    reportShareOut: function(t) {},
    getShareLink: function(t) {},
    reportShowEvent: function(t, n) {},
    setAccountInfo: function(t) {}
};