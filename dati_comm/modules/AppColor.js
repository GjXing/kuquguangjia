var t = function(t) {
    if (t && t.__esModule) return t;
    var o = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (o[a] = t[a]);
    return o.default = t, o;
}(require("../../gamecfg")), o = t.ProjectID, a = t;

module.exports = {
    headbg: function() {
        wx.setNavigationBarColor({
            frontColor: a.NavigationBarFG,
            backgroundColor: a.NavigationBarBG
        });
    },
    title: function() {
        wx.setNavigationBarTitle({
            title: a.title
        });
    },
    ProId: o,
    tabtitle: function(t) {
        wx.setNavigationBarTitle({
            title: t
        });
    },
    tabheadbg: function(t) {
        wx.setNavigationBarColor({
            frontColor: a.NavigationBarFG,
            backgroundColor: t
        });
    }
};