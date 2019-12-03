var e = require("../libs/oosync/OOSyncClient"), n = require("../libs/network/UIEvent"), t = function(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    return n.default = e, n;
}(require("../../gamecfg")), l = new n.UIEvent(), o = new n.UIEvent(), i = new n.UIEvent(), r = null;

e.OOSyncClient.BindValueChangedEvent(0, "Player/Params", "*", function(e) {
    var n = e.split("@");
    if (2 == n.length) {
        var i = parseInt(n[1]);
        i == t.subtype_money ? (console.log("==========金币改变=========="), l.Emit()) : i == t.subtype_jifen && (console.log("==========积分改变=========="), 
        o.Emit());
    }
}), e.OOSyncClient.BindValueChangedEvent(0, "Player/Goods", "*", function(e) {
    r && clearTimeout(r), r = setTimeout(function() {
        r = null, console.log("==========背包改变=========="), i.Emit();
    }, 50);
}), module.exports = {
    OnMoneyChanged: l,
    OnJifenChanged: o,
    OnBackpackChanged: i
};