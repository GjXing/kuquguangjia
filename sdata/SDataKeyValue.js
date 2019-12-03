var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (r[a] = e[a]);
    return r.default = e, r;
}(require("./res/KeyValue")), r = new (require("../dati_comm/sdata/jscsv").jscsv)(e.data);

module.exports = {
    SDataKeyValue: r
};