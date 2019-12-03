function i(i, t, n) {
    this.low = 0 | i, this.high = 0 | t, this.unsigned = !!n;
}

function t(i) {
    return !0 === (i && i.__isLong__);
}

function n(i, t) {
    var n, h, e;
    return t ? (i >>>= 0, (e = 0 <= i && i < 256) && (h = g[i]) ? h : (n = s(i, (0 | i) < 0 ? -1 : 0, !0), 
    e && (g[i] = n), n)) : (i |= 0, (e = -128 <= i && i < 128) && (h = o[i]) ? h : (n = s(i, i < 0 ? -1 : 0, !1), 
    e && (o[i] = n), n));
}

function h(i, t) {
    if (isNaN(i)) return t ? w : v;
    if (t) {
        if (i < 0) return w;
        if (i >= a) return b;
    } else {
        if (i <= -d) return p;
        if (i + 1 >= d) return y;
    }
    return i < 0 ? h(-i, t).neg() : s(i % l | 0, i / l | 0, t);
}

function s(t, n, h) {
    return new i(t, n, h);
}

function e(i, t, n) {
    if (0 === i.length) throw Error("empty string");
    if ("NaN" === i || "Infinity" === i || "+Infinity" === i || "-Infinity" === i) return v;
    if ("number" == typeof t ? (n = t, t = !1) : t = !!t, (n = n || 10) < 2 || 36 < n) throw RangeError("radix");
    var s;
    if ((s = i.indexOf("-")) > 0) throw Error("interior hyphen");
    if (0 === s) return e(i.substring(1), t, n).neg();
    for (var r = h(f(n, 8)), u = v, o = 0; o < i.length; o += 8) {
        var g = Math.min(8, i.length - o), l = parseInt(i.substring(o, o + g), n);
        if (g < 8) {
            var a = h(f(n, g));
            u = u.mul(a).add(h(l));
        } else u = (u = u.mul(r)).add(h(l));
    }
    return u.unsigned = t, u;
}

function r(i, t) {
    return "number" == typeof i ? h(i, t) : "string" == typeof i ? e(i, t) : s(i.low, i.high, "boolean" == typeof t ? t : i.unsigned);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = null;

try {
    u = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([ 0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11 ])), {}).exports;
} catch (i) {}

i.prototype.__isLong__, Object.defineProperty(i.prototype, "__isLong__", {
    value: !0
}), i.isLong = t;

var o = {}, g = {};

i.fromInt = n, i.fromNumber = h, i.fromBits = s;

var f = Math.pow;

i.fromString = e, i.fromValue = r;

var l = 4294967296, a = l * l, d = a / 2, c = n(1 << 24), v = n(0);

i.ZERO = v;

var w = n(0, !0);

i.UZERO = w;

var m = n(1);

i.ONE = m;

var N = n(1, !0);

i.UONE = N;

var E = n(-1);

i.NEG_ONE = E;

var y = s(-1, 2147483647, !1);

i.MAX_VALUE = y;

var b = s(-1, -1, !0);

i.MAX_UNSIGNED_VALUE = b;

var p = s(0, -2147483648, !1);

i.MIN_VALUE = p;

var q = i.prototype;

q.toInt = function() {
    return this.unsigned ? this.low >>> 0 : this.low;
}, q.toNumber = function() {
    return this.unsigned ? (this.high >>> 0) * l + (this.low >>> 0) : this.high * l + (this.low >>> 0);
}, q.toString = function(i) {
    if ((i = i || 10) < 2 || 36 < i) throw RangeError("radix");
    if (this.isZero()) return "0";
    if (this.isNegative()) {
        if (this.eq(p)) {
            var t = h(i), n = this.div(t), s = n.mul(t).sub(this);
            return n.toString(i) + s.toInt().toString(i);
        }
        return "-" + this.neg().toString(i);
    }
    for (var e = h(f(i, 6), this.unsigned), r = this, u = ""; ;) {
        var o = r.div(e), g = (r.sub(o.mul(e)).toInt() >>> 0).toString(i);
        if ((r = o).isZero()) return g + u;
        for (;g.length < 6; ) g = "0" + g;
        u = "" + g + u;
    }
}, q.getHighBits = function() {
    return this.high;
}, q.getHighBitsUnsigned = function() {
    return this.high >>> 0;
}, q.getLowBits = function() {
    return this.low;
}, q.getLowBitsUnsigned = function() {
    return this.low >>> 0;
}, q.getNumBitsAbs = function() {
    if (this.isNegative()) return this.eq(p) ? 64 : this.neg().getNumBitsAbs();
    for (var i = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (i & 1 << t); t--) ;
    return 0 != this.high ? t + 33 : t + 1;
}, q.isZero = function() {
    return 0 === this.high && 0 === this.low;
}, q.eqz = q.isZero, q.isNegative = function() {
    return !this.unsigned && this.high < 0;
}, q.isPositive = function() {
    return this.unsigned || this.high >= 0;
}, q.isOdd = function() {
    return 1 == (1 & this.low);
}, q.isEven = function() {
    return 0 == (1 & this.low);
}, q.equals = function(i) {
    return t(i) || (i = r(i)), (this.unsigned === i.unsigned || this.high >>> 31 != 1 || i.high >>> 31 != 1) && this.high === i.high && this.low === i.low;
}, q.eq = q.equals, q.notEquals = function(i) {
    return !this.eq(i);
}, q.neq = q.notEquals, q.ne = q.notEquals, q.lessThan = function(i) {
    return this.comp(i) < 0;
}, q.lt = q.lessThan, q.lessThanOrEqual = function(i) {
    return this.comp(i) <= 0;
}, q.lte = q.lessThanOrEqual, q.le = q.lessThanOrEqual, q.greaterThan = function(i) {
    return this.comp(i) > 0;
}, q.gt = q.greaterThan, q.greaterThanOrEqual = function(i) {
    return this.comp(i) >= 0;
}, q.gte = q.greaterThanOrEqual, q.ge = q.greaterThanOrEqual, q.compare = function(i) {
    if (t(i) || (i = r(i)), this.eq(i)) return 0;
    var n = this.isNegative(), h = i.isNegative();
    return n && !h ? -1 : !n && h ? 1 : this.unsigned ? i.high >>> 0 > this.high >>> 0 || i.high === this.high && i.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(i).isNegative() ? -1 : 1;
}, q.comp = q.compare, q.negate = function() {
    return !this.unsigned && this.eq(p) ? p : this.not().add(m);
}, q.neg = q.negate, q.add = function(i) {
    t(i) || (i = r(i));
    var n = this.high >>> 16, h = 65535 & this.high, e = this.low >>> 16, u = 65535 & this.low, o = i.high >>> 16, g = 65535 & i.high, f = i.low >>> 16, l = 0, a = 0, d = 0, c = 0;
    return c += u + (65535 & i.low), d += c >>> 16, c &= 65535, d += e + f, a += d >>> 16, 
    d &= 65535, a += h + g, l += a >>> 16, a &= 65535, l += n + o, l &= 65535, s(d << 16 | c, l << 16 | a, this.unsigned);
}, q.subtract = function(i) {
    return t(i) || (i = r(i)), this.add(i.neg());
}, q.sub = q.subtract, q.multiply = function(i) {
    if (this.isZero()) return v;
    if (t(i) || (i = r(i)), u) return s(u.mul(this.low, this.high, i.low, i.high), u.get_high(), this.unsigned);
    if (i.isZero()) return v;
    if (this.eq(p)) return i.isOdd() ? p : v;
    if (i.eq(p)) return this.isOdd() ? p : v;
    if (this.isNegative()) return i.isNegative() ? this.neg().mul(i.neg()) : this.neg().mul(i).neg();
    if (i.isNegative()) return this.mul(i.neg()).neg();
    if (this.lt(c) && i.lt(c)) return h(this.toNumber() * i.toNumber(), this.unsigned);
    var n = this.high >>> 16, e = 65535 & this.high, o = this.low >>> 16, g = 65535 & this.low, f = i.high >>> 16, l = 65535 & i.high, a = i.low >>> 16, d = 65535 & i.low, w = 0, m = 0, N = 0, E = 0;
    return E += g * d, N += E >>> 16, E &= 65535, N += o * d, m += N >>> 16, N &= 65535, 
    N += g * a, m += N >>> 16, N &= 65535, m += e * d, w += m >>> 16, m &= 65535, m += o * a, 
    w += m >>> 16, m &= 65535, m += g * l, w += m >>> 16, m &= 65535, w += n * d + e * a + o * l + g * f, 
    w &= 65535, s(N << 16 | E, w << 16 | m, this.unsigned);
}, q.mul = q.multiply, q.divide = function(i) {
    if (t(i) || (i = r(i)), i.isZero()) throw Error("division by zero");
    if (u) return this.unsigned || -2147483648 !== this.high || -1 !== i.low || -1 !== i.high ? s((this.unsigned ? u.div_u : u.div_s)(this.low, this.high, i.low, i.high), u.get_high(), this.unsigned) : this;
    if (this.isZero()) return this.unsigned ? w : v;
    var n, e, o;
    if (this.unsigned) {
        if (i.unsigned || (i = i.toUnsigned()), i.gt(this)) return w;
        if (i.gt(this.shru(1))) return N;
        o = w;
    } else {
        if (this.eq(p)) return i.eq(m) || i.eq(E) ? p : i.eq(p) ? m : (n = this.shr(1).div(i).shl(1)).eq(v) ? i.isNegative() ? m : E : (e = this.sub(i.mul(n)), 
        o = n.add(e.div(i)));
        if (i.eq(p)) return this.unsigned ? w : v;
        if (this.isNegative()) return i.isNegative() ? this.neg().div(i.neg()) : this.neg().div(i).neg();
        if (i.isNegative()) return this.div(i.neg()).neg();
        o = v;
    }
    for (e = this; e.gte(i); ) {
        n = Math.max(1, Math.floor(e.toNumber() / i.toNumber()));
        for (var g = Math.ceil(Math.log(n) / Math.LN2), l = g <= 48 ? 1 : f(2, g - 48), a = h(n), d = a.mul(i); d.isNegative() || d.gt(e); ) d = (a = h(n -= l, this.unsigned)).mul(i);
        a.isZero() && (a = m), o = o.add(a), e = e.sub(d);
    }
    return o;
}, q.div = q.divide, q.modulo = function(i) {
    return t(i) || (i = r(i)), u ? s((this.unsigned ? u.rem_u : u.rem_s)(this.low, this.high, i.low, i.high), u.get_high(), this.unsigned) : this.sub(this.div(i).mul(i));
}, q.mod = q.modulo, q.rem = q.modulo, q.not = function() {
    return s(~this.low, ~this.high, this.unsigned);
}, q.and = function(i) {
    return t(i) || (i = r(i)), s(this.low & i.low, this.high & i.high, this.unsigned);
}, q.or = function(i) {
    return t(i) || (i = r(i)), s(this.low | i.low, this.high | i.high, this.unsigned);
}, q.xor = function(i) {
    return t(i) || (i = r(i)), s(this.low ^ i.low, this.high ^ i.high, this.unsigned);
}, q.shiftLeft = function(i) {
    return t(i) && (i = i.toInt()), 0 == (i &= 63) ? this : i < 32 ? s(this.low << i, this.high << i | this.low >>> 32 - i, this.unsigned) : s(0, this.low << i - 32, this.unsigned);
}, q.shl = q.shiftLeft, q.shiftRight = function(i) {
    return t(i) && (i = i.toInt()), 0 == (i &= 63) ? this : i < 32 ? s(this.low >>> i | this.high << 32 - i, this.high >> i, this.unsigned) : s(this.high >> i - 32, this.high >= 0 ? 0 : -1, this.unsigned);
}, q.shr = q.shiftRight, q.shiftRightUnsigned = function(i) {
    if (t(i) && (i = i.toInt()), 0 == (i &= 63)) return this;
    var n = this.high;
    return i < 32 ? s(this.low >>> i | n << 32 - i, n >>> i, this.unsigned) : 32 === i ? s(n, 0, this.unsigned) : s(n >>> i - 32, 0, this.unsigned);
}, q.shru = q.shiftRightUnsigned, q.shr_u = q.shiftRightUnsigned, q.toSigned = function() {
    return this.unsigned ? s(this.low, this.high, !1) : this;
}, q.toUnsigned = function() {
    return this.unsigned ? this : s(this.low, this.high, !0);
}, q.toBytes = function(i) {
    return i ? this.toBytesLE() : this.toBytesBE();
}, q.toBytesLE = function() {
    var i = this.high, t = this.low;
    return [ 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24, 255 & i, i >>> 8 & 255, i >>> 16 & 255, i >>> 24 ];
}, q.toBytesBE = function() {
    var i = this.high, t = this.low;
    return [ i >>> 24, i >>> 16 & 255, i >>> 8 & 255, 255 & i, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t ];
}, i.fromBytes = function(t, n, h) {
    return h ? i.fromBytesLE(t, n) : i.fromBytesBE(t, n);
}, i.fromBytesLE = function(t, n) {
    return new i(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24, t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24, n);
}, i.fromBytesBE = function(t, n) {
    return new i(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], n);
}, exports.Long = i;