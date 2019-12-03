var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("./res/KeyValueMath")), r = new (require("../dati_comm/sdata/jscsv").jscsv)(e.data);

module.exports = {
    SDataKeyMath: r
};