function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.NSLoader = void 0;

var t = function() {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t;
    };
}(), s = require("UIEvent"), i = 1, n = function() {
    function n(t, r, o) {
        e(this, n), this._socket = t, this._lid = i++, this.OnComplete = new s.UIEvent(), 
        this.OnError = new s.UIEvent(), this.jsonObj = r, this.routeFlag = o, this._existResult = !1, 
        this.needRequest = !1, this.ReRequest();
    }
    return t(n, [ {
        key: "ReRequest",
        value: function() {
            this._existResult || (this.requestTime = Date.parse(new Date()) / 1e3, this.needRequest = !this._socket._Send(JSON.stringify(this.jsonObj), this.routeFlag, this._lid), 
            this._socket._loaders[this._lid] = this);
        }
    }, {
        key: "_setResult",
        value: function(e, t) {
            1 === t ? (this._existResult = !0, this.OnComplete.Emit(JSON.parse(e))) : this._setError();
        }
    }, {
        key: "_setError",
        value: function() {
            this.OnError.Emit();
        }
    } ]), n;
}();

exports.NSLoader = n;