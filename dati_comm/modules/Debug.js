function e(e) {
    var o = {
        n: "Dbg",
        func: e
    };
    n.GameConn.Request(o, function(e) {
        r.ShowOK("消息", e.msg);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ShowMenu = void 0;

var o = require("../../modules/Player.js"), n = require("../libs/network/Conns"), r = function(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (o[n] = e[n]);
    return o.default = e, o;
}(require("./MsgBox"));

exports.ShowMenu = function(n) {
    o.Player.IsDebug ? wx.showActionSheet({
        itemList: [ "原功能", "加金币", "加学分" ],
        success: function(o) {
            switch (console.log(o.tapIndex), o.tapIndex) {
              case 0:
                n();
                break;

              case 1:
                e(1), console.log("加金币");
                break;

              case 2:
                e(2), console.log("加学分");
            }
        },
        fail: function(e) {
            console.log(e.errMsg);
        }
    }) : n();
};