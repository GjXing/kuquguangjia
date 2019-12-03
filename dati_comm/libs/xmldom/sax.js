function e() {}

function r(e, r, c, f, d) {
    function m(e) {
        if (e > 65535) {
            var r = 55296 + ((e -= 65536) >> 10), t = 56320 + (1023 & e);
            return String.fromCharCode(r, t);
        }
        return String.fromCharCode(e);
    }
    function h(e) {
        var r = e.slice(1, -1);
        return r in c ? c[r] : "#" === r.charAt(0) ? m(parseInt(r.substr(1).replace("x", "0x"))) : (d.error("entity not found:" + e), 
        e);
    }
    function g(r) {
        var t = e.substring(D, r).replace(/&#?\w+;/g, h);
        v && p(D), f.characters(t, 0, r - D), D = r;
    }
    function p(r, t) {
        for (;r >= b && (t = x.exec(e)); ) w = t.index, b = w + t[0].length, v.lineNumber++;
        v.columnNumber = r - w + 1;
    }
    for (var w = 0, b = 0, x = /.+(?:\r\n?|\n)|.*$/g, v = f.locator, N = [ {
        currentNSMap: r
    } ], F = {}, D = 0; ;) {
        switch ((S = e.indexOf("<", D)) > D && g(S), e.charAt(S + 1)) {
          case "/":
            var E = e.indexOf(">", S + 3), k = e.substring(S + 2, E), A = N.pop(), C = A.localNSMap;
            if (A.tagName != k && d.fatalError("end tag name: " + k + " is not match the current start tagName:" + A.tagName), 
            f.endElement(A.uri, A.localName, k), C) for (var M in C) f.endPrefixMapping(M);
            E++;
            break;

          case "?":
            v && p(S), E = o(e, S, f);
            break;

          case "!":
            v && p(S), E = u(e, S, f);
            break;

          default:
            if (S < 0) return void (e.substr(D).match(/^\s*$/) || d.error("source code out of document root"));
            try {
                v && p(S);
                var O = new l(), E = a(e, S, O, h, d), q = O.length;
                if (q && v) {
                    for (var y = t(v, {}), S = 0; S < q; S++) {
                        var T = O[S];
                        p(T.offset), T.offset = t(v, {});
                    }
                    t(y, v);
                }
                O.closed = O.closed || i(e, E, O.tagName, F), n(O, f, N), "http://www.w3.org/1999/xhtml" !== O.uri || O.closed ? E++ : E = s(e, E, O.tagName, h, f);
            } catch (e) {
                d.error("element parse error: " + e), E = -1;
            }
        }
        E < 0 ? g(S + 1) : D = E;
    }
}

function t(e, r) {
    return r.lineNumber = e.lineNumber, r.columnNumber = e.columnNumber, r;
}

function a(e, r, t, a, n) {
    for (var s, i = ++r, c = p; ;) {
        var u = e.charAt(i);
        switch (u) {
          case "=":
            if (c === w) s = e.slice(r, i), c = x; else {
                if (c !== b) throw new Error("attribute equal must after attrName");
                c = x;
            }
            break;

          case "'":
          case '"':
            if (c === x) {
                if (r = i + 1, !((i = e.indexOf(u, r)) > 0)) throw new Error("attribute value no end '" + u + "' match");
                o = e.slice(r, i).replace(/&#?\w+;/g, a), t.add(s, o, r - 1), c = N;
            } else {
                if (c != v) throw new Error('attribute value must after "="');
                o = e.slice(r, i).replace(/&#?\w+;/g, a), t.add(s, o, r), n.warning('attribute "' + s + '" missed start quot(' + u + ")!!"), 
                r = i + 1, c = N;
            }
            break;

          case "/":
            switch (c) {
              case p:
                t.setTagName(e.slice(r, i));

              case N:
              case F:
              case D:
                c = D, t.closed = !0;

              case v:
              case w:
              case b:
                break;

              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;

          case ">":
            switch (c) {
              case p:
                t.setTagName(e.slice(r, i));

              case N:
              case F:
              case D:
                break;

              case v:
              case w:
                "/" === (o = e.slice(r, i)).slice(-1) && (t.closed = !0, o = o.slice(0, -1));

              case b:
                c === b && (o = s), c == v ? (n.warning('attribute "' + o + '" missed quot(")!!'), 
                t.add(s, o.replace(/&#?\w+;/g, a), r)) : (n.warning('attribute "' + o + '" missed value!! "' + o + '" instead!!'), 
                t.add(o, o, r));
                break;

              case x:
                throw new Error("attribute value missed!!");
            }
            return i;

          case "":
            u = " ";

          default:
            if (u <= " ") switch (c) {
              case p:
                t.setTagName(e.slice(r, i)), c = F;
                break;

              case w:
                s = e.slice(r, i), c = b;
                break;

              case v:
                var o = e.slice(r, i).replace(/&#?\w+;/g, a);
                n.warning('attribute "' + o + '" missed quot(")!!'), t.add(s, o, r);

              case N:
                c = F;
            } else switch (c) {
              case b:
                n.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), t.add(s, s, r), 
                r = i, c = w;
                break;

              case N:
                n.warning('attribute space is required"' + s + '"!!');

              case F:
                c = w, r = i;
                break;

              case x:
                c = v, r = i;
                break;

              case D:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
        }
        i++;
    }
}

function n(e, r, t) {
    for (var a = e.tagName, n = null, s = t[t.length - 1].currentNSMap, i = e.length; i--; ) {
        var u = e[i], o = u.qName, l = u.value;
        if ((h = o.indexOf(":")) > 0) var f = u.prefix = o.slice(0, h), d = o.slice(h + 1), m = "xmlns" === f && d; else d = o, 
        f = null, m = "xmlns" === o && "";
        u.localName = d, !1 !== m && (null == n && (n = {}, c(s, s = {})), s[m] = n[m] = l, 
        u.uri = "http://www.w3.org/2000/xmlns/", r.startPrefixMapping(m, l));
    }
    for (i = e.length; i--; ) (f = (u = e[i]).prefix) && ("xml" === f && (u.uri = "http://www.w3.org/XML/1998/namespace"), 
    "xmlns" !== f && (u.uri = s[f]));
    var h = a.indexOf(":");
    h > 0 ? (f = e.prefix = a.slice(0, h), d = e.localName = a.slice(h + 1)) : (f = null, 
    d = e.localName = a);
    var g = e.uri = s[f || ""];
    if (r.startElement(g, d, a, e), e.closed) {
        if (r.endElement(g, d, a), n) for (f in n) r.endPrefixMapping(f);
    } else e.currentNSMap = s, e.localNSMap = n, t.push(e);
}

function s(e, r, t, a, n) {
    if (/^(?:script|textarea)$/i.test(t)) {
        var s = e.indexOf("</" + t + ">", r), i = e.substring(r + 1, s);
        if (/[&<]/.test(i)) return /^script$/i.test(t) ? (n.characters(i, 0, i.length), 
        s) : (i = i.replace(/&#?\w+;/g, a), n.characters(i, 0, i.length), s);
    }
    return r + 1;
}

function i(e, r, t, a) {
    var n = a[t];
    return null == n && (n = a[t] = e.lastIndexOf("</" + t + ">")), n < r;
}

function c(e, r) {
    for (var t in e) r[t] = e[t];
}

function u(e, r, t) {
    switch (e.charAt(r + 2)) {
      case "-":
        return "-" === e.charAt(r + 3) ? (a = e.indexOf("--\x3e", r + 4), t.comment(e, r + 4, a - r - 4), 
        a + 3) : -1;

      default:
        if ("CDATA[" == e.substr(r + 3, 6)) {
            var a = e.indexOf("]]>", r + 9);
            return t.startCDATA(), t.characters(e, r + 9, a - r - 9), t.endCDATA(), a + 3;
        }
        var n = d(e, r), s = n.length;
        if (s > 1 && /!doctype/i.test(n[0][0])) {
            var i = n[1][0], c = s > 3 && /^public$/i.test(n[2][0]) && n[3][0], u = s > 4 && n[4][0], o = n[s - 1];
            return t.startDTD(i, c, u), t.endDTD(), o.index + o[0].length;
        }
    }
    return -1;
}

function o(e, r, t) {
    var a = e.indexOf("?>", r);
    if (a) {
        var n = e.substring(r, a).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        return n ? (n[0].length, t.processingInstruction(n[1], n[2]), a + 2) : -1;
    }
    return -1;
}

function l(e) {}

function f(e, r) {
    return e.__proto__ = r, e;
}

function d(e, r) {
    var t, a = [], n = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    for (n.lastIndex = r, n.exec(e); t = n.exec(e); ) if (a.push(t), t[1]) return a;
}

var m = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, h = new RegExp("[\\-\\.0-9" + m.source.slice(1, -1) + "·̀-ͯ\\ux203F-⁀]"), g = new RegExp("^" + m.source + h.source + "*(?::" + m.source + h.source + "*)?$"), p = 0, w = 1, b = 2, x = 3, v = 4, N = 5, F = 6, D = 7;

e.prototype = {
    parse: function(e, t, a) {
        var n = this.domBuilder;
        n.startDocument(), c(t, t = {}), r(e, t, a, n, this.errorHandler), n.endDocument();
    }
}, l.prototype = {
    setTagName: function(e) {
        if (!g.test(e)) throw new Error("invalid tagName:" + e);
        this.tagName = e;
    },
    add: function(e, r, t) {
        if (!g.test(e)) throw new Error("invalid attribute:" + e);
        this[this.length++] = {
            qName: e,
            value: r,
            offset: t
        };
    },
    length: 0,
    getLocalName: function(e) {
        return this[e].localName;
    },
    getOffset: function(e) {
        return this[e].offset;
    },
    getQName: function(e) {
        return this[e].qName;
    },
    getURI: function(e) {
        return this[e].uri;
    },
    getValue: function(e) {
        return this[e].value;
    }
}, f({}, f.prototype) instanceof f || (f = function(e, r) {
    function t() {}
    t.prototype = r, t = new t();
    for (r in e) t[r] = e[r];
    return t;
}), "function" == typeof require && (exports.XMLReader = e), "function" == typeof require && (exports.XMLReader = e);