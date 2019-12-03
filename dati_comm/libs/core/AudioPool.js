function e(e) {
    var r = t[e];
    return r && r.release(), r = new o.default({
        src: e
    }), t[e] = r, r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.GetAudio = exports.StopAudio = exports.PlayAudio = void 0;

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./AudioSource")), t = {};

exports.PlayAudio = function(o) {
    e(o).replay();
}, exports.StopAudio = function(o) {
    var t = e(o);
    null != t && t.stop();
}, exports.GetAudio = e;