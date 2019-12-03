Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = [ "十", "一", "二", "三", "四", "五", "六", "七", "八", "九" ], I = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" ];

exports.Num2Chinese = function(I) {
    return I > 9 ? e[parseInt(I / 10)] + e[I % 10] : e[I];
}, exports.LuoMa = function(e, r) {
    return I[e - r];
};