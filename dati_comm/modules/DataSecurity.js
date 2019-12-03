var r = require("./md5");

module.exports = {
    Sign: function() {
        for (var t = arguments, e = "", n = 0; n < t.length; n++) e += t[n].toString();
        for (var o = "", n = 0; n < e.length; n++) {
            var i = 2 ^ e.charCodeAt(n);
            i < 16 && (i += 16), i > 255 && (i = 255), o += i.toString(16);
        }
        return (0, r.MD5)(o);
    }
};