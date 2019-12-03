var r = function(r) {
    if (r && r.__esModule) return r;
    var e = {};
    if (null != r) for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    return e.default = r, e;
}(require("../../sdata/res/UserFrame")), e = new (require("./jscsv").jscsv)(r.data);

module.exports = {
    SDataUserFrame: e
};