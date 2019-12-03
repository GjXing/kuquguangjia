var t = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("./MsgBox")), e = require("../sdata/SDataID2");

module.exports = {
    BindAppUpdateEvt: function() {
        console.log("BindAppUpdateEvt*******************************");
        var a = wx.getUpdateManager();
        a.onCheckForUpdate(function(t) {
            console.log("updateManager*******************************", t.hasUpdate);
        }), a.onUpdateReady(function() {
            t.ShowOK((0, e.txt)(1072), (0, e.txt)(1073), "确定", function() {
                a.applyUpdate();
            });
        }), a.onUpdateFailed(function() {
            t.ShowOK((0, e.txt)(1072), (0, e.txt)(1074));
        });
    }
};