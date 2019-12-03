var r = function(r) {
    if (r && r.__esModule) return r;
    var e = {};
    if (null != r) for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    return e.default = r, e;
}(require("./res/dztalk")), e = new (require("../dati_comm/sdata/jscsv").jscsv)(r.data);

module.exports = {
    SDatadztalk: e
};