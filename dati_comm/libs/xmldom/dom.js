function e(e, t) {
    for (var n in e) t[n] = e[n];
}

function t(t, n) {
    var r = t.prototype;
    if (Object.create) {
        var o = Object.create(n.prototype);
        r.__proto__ = o;
    }
    if (!(r instanceof n)) {
        var i = function() {};
        i.prototype = n.prototype, e(r, i = new i()), t.prototype = r = i;
    }
    r.constructor != t && ("function" != typeof t && console.error("unknow Class:" + t), 
    r.constructor = t);
}

function n(e, t) {
    if (t instanceof Error) var r = t; else r = this, Error.call(this, re[e]), this.message = re[e], 
    Error.captureStackTrace && Error.captureStackTrace(this, n);
    return r.code = e, t && (this.message = this.message + ": " + t), r;
}

function r() {}

function o(e, t) {
    this._node = e, this._refresh = t, i(this);
}

function i(t) {
    var n = t._node._inc || t._node.ownerDocument._inc;
    if (t._inc != n) {
        var r = t._refresh(t._node);
        V(t, "length", r.length), e(r, t), t._inc = n;
    }
}

function u() {}

function a(e, t) {
    for (var n = e.length; n--; ) if (e[n] === t) return n;
}

function s(e, t, n, r) {
    if (r ? t[a(t, r)] = n : t[t.length++] = n, e) {
        n.ownerElement = e;
        var o = e.ownerDocument;
        o && (r && N(o, e, r), m(o, e, n));
    }
}

function l(e, t, r) {
    var o = a(t, r);
    if (!(o >= 0)) throw n(oe, new Error());
    for (var i = t.length - 1; o < i; ) t[o] = t[++o];
    if (t.length = i, e) {
        var u = e.ownerDocument;
        u && (N(u, e, r), r.ownerElement = null);
    }
}

function c(e) {
    if (this._features = {}, e) for (var t in e) this._features = e[t];
}

function d() {}

function f(e) {
    return "<" == e && "&lt;" || ">" == e && "&gt;" || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";";
}

function h(e, t) {
    if (t(e)) return !0;
    if (e = e.firstChild) do {
        if (h(e, t)) return !0;
    } while (e = e.nextSibling);
}

function p() {}

function m(e, t, n) {
    e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
}

function N(e, t, n, r) {
    e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""];
}

function y(e, t, n) {
    if (e && e._inc) {
        e._inc++;
        var r = t.childNodes;
        if (n) r[r.length++] = n; else {
            for (var o = t.firstChild, i = 0; o; ) r[i++] = o, o = o.nextSibling;
            r.length = i;
        }
    }
}

function v(e, t) {
    var n = t.previousSibling, r = t.nextSibling;
    return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, 
    y(e.ownerDocument, e), t;
}

function b(e, t, n) {
    var r = t.parentNode;
    if (r && r.removeChild(t), t.nodeType === ee) {
        var o = t.firstChild;
        if (null == o) return t;
        var i = t.lastChild;
    } else o = i = t;
    var u = n ? n.previousSibling : e.lastChild;
    o.previousSibling = u, i.nextSibling = n, u ? u.nextSibling = o : e.firstChild = o, 
    null == n ? e.lastChild = i : n.previousSibling = i;
    do {
        o.parentNode = e;
    } while (o !== i && (o = o.nextSibling));
    return y(e.ownerDocument || e, e), t.nodeType == ee && (t.firstChild = t.lastChild = null), 
    t;
}

function g(e, t) {
    var n = t.parentNode;
    n && (r = e.lastChild, n.removeChild(t), r = e.lastChild);
    var r = e.lastChild;
    return t.parentNode = e, t.previousSibling = r, t.nextSibling = null, r ? r.nextSibling = t : e.firstChild = t, 
    e.lastChild = t, y(e.ownerDocument, e, t), t;
}

function E() {
    this._nsMap = {};
}

function S() {}

function w() {}

function T() {}

function _() {}

function D() {}

function C() {}

function I() {}

function A() {}

function R() {}

function O() {}

function x() {}

function U() {}

function M(e, t) {
    switch (e.nodeType) {
      case $:
        var n = e.attributes, r = n.length, o = e.firstChild, i = e.tagName, u = z === e.namespaceURI;
        t.push("<", i);
        for (var a = 0; a < r; a++) M(n.item(a), t, u);
        if (o || u && !/^(?:meta|link|img|br|hr|input)$/i.test(i)) {
            if (t.push(">"), u && /^script$/i.test(i)) o && t.push(o.data); else for (;o; ) M(o, t), 
            o = o.nextSibling;
            t.push("</", i, ">");
        } else t.push("/>");
        return;

      case J:
      case ee:
        for (o = e.firstChild; o; ) M(o, t), o = o.nextSibling;
        return;

      case G:
        return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, f), '"');

      case H:
        return t.push(e.data.replace(/[<&]/g, f));

      case W:
        return t.push("<![CDATA[", e.data, "]]>");

      case Q:
        return t.push("\x3c!--", e.data, "--\x3e");

      case K:
        var s = e.publicId, l = e.systemId;
        if (t.push("<!DOCTYPE ", e.name), s) t.push(' PUBLIC "', s), l && "." != l && t.push('" "', l), 
        t.push('">'); else if (l && "." != l) t.push(' SYSTEM "', l, '">'); else {
            var c = e.internalSubset;
            c && t.push(" [", c, "]"), t.push(">");
        }
        return;

      case Z:
        return t.push("<?", e.target, " ", e.data, "?>");

      case X:
        return t.push("&", e.nodeName, ";");

      default:
        t.push("??", e.nodeName);
    }
}

function B(e, t, n) {
    var r;
    switch (t.nodeType) {
      case $:
        (r = t.cloneNode(!1)).ownerDocument = e;
        for (var o = r.attributes, i = o.length, u = 0; u < i; u++) r.setAttributeNodeNS(B(e, o.item(u), n));

      case ee:
        break;

      case G:
        n = !0;
    }
    if (r || (r = t.cloneNode(!1)), r.ownerDocument = e, r.parentNode = null, n) for (var a = t.firstChild; a; ) r.appendChild(B(e, a, n)), 
    a = a.nextSibling;
    return r;
}

function P(e, t, n) {
    var o = new t.constructor();
    for (var i in t) {
        var a = t[i];
        "object" != (void 0 === a ? "undefined" : F(a)) && a != o[i] && (o[i] = a);
    }
    switch (t.childNodes && (o.childNodes = new r()), o.ownerDocument = e, o.nodeType) {
      case $:
        var s = t.attributes, l = o.attributes = new u(), c = s.length;
        l._ownerElement = o;
        for (var d = 0; d < c; d++) o.setAttributeNode(P(e, s.item(d), !0));
        break;

      case G:
        n = !0;
    }
    if (n) for (var f = t.firstChild; f; ) o.appendChild(P(e, f, n)), f = f.nextSibling;
    return o;
}

function V(e, t, n) {
    e[t] = n;
}

var L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, k = "function" == typeof Symbol && "symbol" == L(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : L(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : L(e);
}, j = "function" == typeof Symbol && "symbol" == k(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : k(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : k(e);
}, F = "function" == typeof Symbol && "symbol" == j(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : j(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : j(e);
}, z = "http://www.w3.org/1999/xhtml", Y = {}, $ = Y.ELEMENT_NODE = 1, G = Y.ATTRIBUTE_NODE = 2, H = Y.TEXT_NODE = 3, W = Y.CDATA_SECTION_NODE = 4, X = Y.ENTITY_REFERENCE_NODE = 5, q = Y.ENTITY_NODE = 6, Z = Y.PROCESSING_INSTRUCTION_NODE = 7, Q = Y.COMMENT_NODE = 8, J = Y.DOCUMENT_NODE = 9, K = Y.DOCUMENT_TYPE_NODE = 10, ee = Y.DOCUMENT_FRAGMENT_NODE = 11, te = Y.NOTATION_NODE = 12, ne = {}, re = {}, oe = (ne.INDEX_SIZE_ERR = (re[1] = "Index size error", 
1), ne.DOMSTRING_SIZE_ERR = (re[2] = "DOMString size error", 2), ne.HIERARCHY_REQUEST_ERR = (re[3] = "Hierarchy request error", 
3), ne.WRONG_DOCUMENT_ERR = (re[4] = "Wrong document", 4), ne.INVALID_CHARACTER_ERR = (re[5] = "Invalid character", 
5), ne.NO_DATA_ALLOWED_ERR = (re[6] = "No data allowed", 6), ne.NO_MODIFICATION_ALLOWED_ERR = (re[7] = "No modification allowed", 
7), ne.NOT_FOUND_ERR = (re[8] = "Not found", 8)), ie = (ne.NOT_SUPPORTED_ERR = (re[9] = "Not supported", 
9), ne.INUSE_ATTRIBUTE_ERR = (re[10] = "Attribute in use", 10));

ne.INVALID_STATE_ERR = (re[11] = "Invalid state", 11), ne.SYNTAX_ERR = (re[12] = "Syntax error", 
12), ne.INVALID_MODIFICATION_ERR = (re[13] = "Invalid modification", 13), ne.NAMESPACE_ERR = (re[14] = "Invalid namespace", 
14), ne.INVALID_ACCESS_ERR = (re[15] = "Invalid access", 15), n.prototype = Error.prototype, 
e(ne, n), r.prototype = {
    length: 0,
    item: function(e) {
        return this[e] || null;
    }
}, o.prototype.item = function(e) {
    return i(this), this[e];
}, t(o, r), u.prototype = {
    length: 0,
    item: r.prototype.item,
    getNamedItem: function(e) {
        for (var t = this.length; t--; ) {
            var n = this[t];
            if (n.nodeName == e) return n;
        }
    },
    setNamedItem: function(e) {
        var t = e.ownerElement;
        if (t && t != this._ownerElement) throw new n(ie);
        var r = this.getNamedItem(e.nodeName);
        return s(this._ownerElement, this, e, r), r;
    },
    setNamedItemNS: function(e) {
        var t, r = e.ownerElement;
        if (r && r != this._ownerElement) throw new n(ie);
        return t = this.getNamedItemNS(e.namespaceURI, e.localName), s(this._ownerElement, this, e, t), 
        t;
    },
    removeNamedItem: function(e) {
        var t = this.getNamedItem(e);
        return l(this._ownerElement, this, t), t;
    },
    removeNamedItemNS: function(e, t) {
        var n = this.getNamedItemNS(e, t);
        return l(this._ownerElement, this, n), n;
    },
    getNamedItemNS: function(e, t) {
        for (var n = this.length; n--; ) {
            var r = this[n];
            if (r.localName == t && r.namespaceURI == e) return r;
        }
        return null;
    }
}, c.prototype = {
    hasFeature: function(e, t) {
        var n = this._features[e.toLowerCase()];
        return !(!n || t && !(t in n));
    },
    createDocument: function(e, t, n) {
        var o = new p();
        if (o.doctype = n, n && o.appendChild(n), o.implementation = this, o.childNodes = new r(), 
        t) {
            var i = o.createElementNS(e, t);
            o.appendChild(i);
        }
        return o;
    },
    createDocumentType: function(e, t, n) {
        var r = new C();
        return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r;
    }
}, d.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    insertBefore: function(e, t) {
        return b(this, e, t);
    },
    replaceChild: function(e, t) {
        this.insertBefore(e, t), t && this.removeChild(t);
    },
    removeChild: function(e) {
        return v(this, e);
    },
    appendChild: function(e) {
        return this.insertBefore(e, null);
    },
    hasChildNodes: function() {
        return null != this.firstChild;
    },
    cloneNode: function(e) {
        return P(this.ownerDocument || this, this, e);
    },
    normalize: function() {
        for (var e = this.firstChild; e; ) {
            var t = e.nextSibling;
            t && t.nodeType == H && e.nodeType == H ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), 
            e = t);
        }
    },
    isSupported: function(e, t) {
        return this.ownerDocument.implementation.hasFeature(e, t);
    },
    hasAttributes: function() {
        return this.attributes.length > 0;
    },
    lookupPrefix: function(e) {
        for (var t = this; t; ) {
            var n = t._nsMap;
            if (n) for (var r in n) if (n[r] == e) return r;
            t = 2 == t.nodeType ? t.ownerDocument : t.parentNode;
        }
        return null;
    },
    lookupNamespaceURI: function(e) {
        for (var t = this; t; ) {
            var n = t._nsMap;
            if (n && e in n) return n[e];
            t = 2 == t.nodeType ? t.ownerDocument : t.parentNode;
        }
        return null;
    },
    isDefaultNamespace: function(e) {
        return null == this.lookupPrefix(e);
    }
}, e(Y, d), e(Y, d.prototype), p.prototype = {
    nodeName: "#document",
    nodeType: J,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function(e, t) {
        if (e.nodeType == ee) {
            for (var n = e.firstChild; n; ) {
                var r = n.nextSibling;
                this.insertBefore(n, t), n = r;
            }
            return e;
        }
        return null == this.documentElement && 1 == e.nodeType && (this.documentElement = e), 
        b(this, e, t), e.ownerDocument = this, e;
    },
    removeChild: function(e) {
        return this.documentElement == e && (this.documentElement = null), v(this, e);
    },
    importNode: function(e, t) {
        return B(this, e, t);
    },
    getElementById: function(e) {
        var t = null;
        return h(this.documentElement, function(n) {
            if (1 == n.nodeType && n.getAttribute("id") == e) return t = n, !0;
        }), t;
    },
    createElement: function(e) {
        var t = new E();
        return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new r(), 
        (t.attributes = new u())._ownerElement = t, t;
    },
    createDocumentFragment: function() {
        var e = new O();
        return e.ownerDocument = this, e.childNodes = new r(), e;
    },
    createTextNode: function(e) {
        var t = new T();
        return t.ownerDocument = this, t.appendData(e), t;
    },
    createComment: function(e) {
        var t = new _();
        return t.ownerDocument = this, t.appendData(e), t;
    },
    createCDATASection: function(e) {
        var t = new D();
        return t.ownerDocument = this, t.appendData(e), t;
    },
    createProcessingInstruction: function(e, t) {
        var n = new x();
        return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, 
        n;
    },
    createAttribute: function(e) {
        var t = new S();
        return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, 
        t;
    },
    createEntityReference: function(e) {
        var t = new R();
        return t.ownerDocument = this, t.nodeName = e, t;
    },
    createElementNS: function(e, t) {
        var n = new E(), o = t.split(":"), i = n.attributes = new u();
        return n.childNodes = new r(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, 
        n.namespaceURI = e, 2 == o.length ? (n.prefix = o[0], n.localName = o[1]) : n.localName = t, 
        i._ownerElement = n, n;
    },
    createAttributeNS: function(e, t) {
        var n = new S(), r = t.split(":");
        return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 
        2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
    }
}, t(p, d), E.prototype = {
    nodeType: $,
    hasAttribute: function(e) {
        return null != this.getAttributeNode(e);
    },
    getAttribute: function(e) {
        var t = this.getAttributeNode(e);
        return t && t.value || "";
    },
    getAttributeNode: function(e) {
        return this.attributes.getNamedItem(e);
    },
    setAttribute: function(e, t) {
        var n = this.ownerDocument.createAttribute(e);
        n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
    },
    removeAttribute: function(e) {
        var t = this.getAttributeNode(e);
        t && this.removeAttributeNode(t);
    },
    appendChild: function(e) {
        return e.nodeType === ee ? this.insertBefore(e, null) : g(this, e);
    },
    setAttributeNode: function(e) {
        return this.attributes.setNamedItem(e);
    },
    setAttributeNodeNS: function(e) {
        return this.attributes.setNamedItemNS(e);
    },
    removeAttributeNode: function(e) {
        return this.attributes.removeNamedItem(e.nodeName);
    },
    removeAttributeNS: function(e, t) {
        var n = this.getAttributeNodeNS(e, t);
        n && this.removeAttributeNode(n);
    },
    hasAttributeNS: function(e, t) {
        return null != this.getAttributeNodeNS(e, t);
    },
    getAttributeNS: function(e, t) {
        var n = this.getAttributeNodeNS(e, t);
        return n && n.value || "";
    },
    setAttributeNS: function(e, t, n) {
        var r = this.ownerDocument.createAttributeNS(e, t);
        r.value = r.nodeValue = n, this.setAttributeNode(r);
    },
    getAttributeNodeNS: function(e, t) {
        return this.attributes.getNamedItemNS(e, t);
    },
    getElementsByTagName: function(e) {
        return new o(this, function(t) {
            var n = [];
            return h(t, function(r) {
                r === t || r.nodeType != $ || "*" !== e && r.tagName != e || n.push(r);
            }), n;
        });
    },
    getElementsByTagNameNS: function(e, t) {
        return new o(this, function(n) {
            var r = [];
            return h(n, function(o) {
                o === n || o.nodeType !== $ || o.namespaceURI !== e || "*" !== t && o.localName != t || r.push(o);
            }), r;
        });
    }
}, p.prototype.getElementsByTagName = E.prototype.getElementsByTagName, p.prototype.getElementsByTagNameNS = E.prototype.getElementsByTagNameNS, 
t(E, d), S.prototype.nodeType = G, t(S, d), w.prototype = {
    data: "",
    substringData: function(e, t) {
        return this.data.substring(e, e + t);
    },
    appendData: function(e) {
        e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
    },
    insertData: function(e, t) {
        this.replaceData(e, 0, t);
    },
    appendChild: function(e) {
        throw new Error(re[3]);
    },
    deleteData: function(e, t) {
        this.replaceData(e, t, "");
    },
    replaceData: function(e, t, n) {
        n = this.data.substring(0, e) + n + this.data.substring(e + t), this.nodeValue = this.data = n, 
        this.length = n.length;
    }
}, t(w, d), T.prototype = {
    nodeName: "#text",
    nodeType: H,
    splitText: function(e) {
        var t = this.data, n = t.substring(e);
        t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
        var r = this.ownerDocument.createTextNode(n);
        return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
    }
}, t(T, w), _.prototype = {
    nodeName: "#comment",
    nodeType: Q
}, t(_, w), D.prototype = {
    nodeName: "#cdata-section",
    nodeType: W
}, t(D, w), C.prototype.nodeType = K, t(C, d), I.prototype.nodeType = te, t(I, d), 
A.prototype.nodeType = q, t(A, d), R.prototype.nodeType = X, t(R, d), O.prototype.nodeName = "#document-fragment", 
O.prototype.nodeType = ee, t(O, d), x.prototype.nodeType = Z, t(x, d), U.prototype.serializeToString = function(e) {
    var t = [];
    return M(e, t), t.join("");
}, d.prototype.toString = function() {
    return U.prototype.serializeToString(this);
};

try {
    if (Object.defineProperty) {
        var ue = function e(t) {
            switch (t.nodeType) {
              case 1:
              case 11:
                var n = [];
                for (t = t.firstChild; t; ) 7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)), 
                t = t.nextSibling;
                return n.join("");

              default:
                return t.nodeValue;
            }
        };
        Object.defineProperty(o.prototype, "length", {
            get: function() {
                return i(this), this.$$length;
            }
        }), Object.defineProperty(d.prototype, "textContent", {
            get: function() {
                return ue(this);
            },
            set: function(e) {
                switch (this.nodeType) {
                  case 1:
                  case 11:
                    for (;this.firstChild; ) this.removeChild(this.firstChild);
                    (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                    break;

                  default:
                    this.data = e, this.value = value, this.nodeValue = e;
                }
            }
        }), V = function(e, t, n) {
            e["$$" + t] = n;
        };
    }
} catch (e) {}

"function" == typeof require && (exports.DOMImplementation = c, exports.XMLSerializer = U);