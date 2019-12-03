var r = function(r) {
    if (r && r.__esModule) return r;
    var e = {};
    if (null != r) for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    return e.default = r, e;
}(require("./res/Share")), e = new (require("../dati_comm/sdata/jscsv").jscsv)(r.data);

module.exports = {
    SDataShare: e
};