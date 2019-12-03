function r(r) {
    if (r && r.__esModule) return r;
    var e = {};
    if (null != r) for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    return e.default = r, e;
}

var e = r(require("../../sdata/res/Id2String")), t = r(require("../../sdata/res/Id2StringPub")), a = require("./jscsv"), n = t.data.body, u = e.data.body;

for (var i in n) u[i] = n[i];

var o = new a.jscsv(e.data);

module.exports = {
    txt: function() {
        var r = arguments, e = r[0], t = o.GetRow(e)[o.I_String];
        if (t = t.replace(/\<br \/\>/g, "\r\n"), r.length > 1) {
            for (var a = [], n = 1; n < r.length; n++) a.push(r[n]);
            return t.replace(/\{(\d+)\}/g, function(r, e) {
                return a[e];
            });
        }
        return t;
    }
};