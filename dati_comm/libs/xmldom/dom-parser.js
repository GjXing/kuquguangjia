function t(t) {
    this.options = 1 != t && t || {
        locator: {}
    };
}

function e(t, e, r) {
    function i(e) {
        var n = t[e];
        if (!n) if (a) n = 2 == t.length ? function(n) {
            t(e, n);
        } : t; else for (var i = arguments.length; --i && !(n = t[arguments[i]]); ) ;
        c[e] = n && function(t) {
            n(t + o(r));
        } || function() {};
    }
    if (!t) {
        if (e instanceof n) return e;
        t = e;
    }
    var c = {}, a = t instanceof Function;
    return r = r || {}, i("warning", "warn"), i("error", "warn", "warning"), i("fatalError", "warn", "warning", "error"), 
    c;
}

function n() {
    this.cdata = !1;
}

function r(t, e) {
    e.lineNumber = t.lineNumber, e.columnNumber = t.columnNumber;
}

function o(t) {
    if (t) return "\n@" + (t.systemId || "") + "#[line:" + t.lineNumber + ",col:" + t.columnNumber + "]";
}

function i(t, e, n) {
    return "string" == typeof t ? t.substr(e, n) : t.length >= e + n || e ? new java.lang.String(t, e, n) + "" : t;
}

function c(t, e) {
    t.currentElement ? t.currentElement.appendChild(e) : t.document.appendChild(e);
}

if (t.prototype.parseFromString = function(t, r) {
    var o = new a(), i = this.options, c = i.domBuilder || new n(), u = i.errorHandler, l = i.locator, s = {}, m = {
        lt: "<",
        gt: ">",
        amp: "&",
        quot: '"',
        apos: "'"
    };
    return l && c.setDocumentLocator(l), o.errorHandler = e(u, c, l), o.domBuilder = i.domBuilder || c, 
    /\/x?html?$/.test(r) && (m.nbsp = " ", m.copy = "©", s[""] = "http://www.w3.org/1999/xhtml"), 
    o.parse(t, s, m), c.document;
}, n.prototype = {
    startDocument: function() {
        this.document = new u().createDocument(null, null, null), this.locator && (this.document.documentURI = this.locator.systemId);
    },
    startElement: function(t, e, n, o) {
        var i = this.document, a = i.createElementNS(t, n || e), u = o.length;
        c(this, a), this.currentElement = a, this.locator && r(this.locator, a);
        for (var l = 0; l < u; l++) {
            var t = o.getURI(l), s = o.getValue(l), n = o.getQName(l), m = i.createAttributeNS(t, n);
            m.getOffset && r(m.getOffset(1), m), m.value = m.nodeValue = s, a.setAttributeNode(m);
        }
    },
    endElement: function(t, e, n) {
        var r = this.currentElement;
        r.tagName, this.currentElement = r.parentNode;
    },
    startPrefixMapping: function(t, e) {},
    endPrefixMapping: function(t) {},
    processingInstruction: function(t, e) {
        var n = this.document.createProcessingInstruction(t, e);
        this.locator && r(this.locator, n), c(this, n);
    },
    ignorableWhitespace: function(t, e, n) {},
    characters: function(t, e, n) {
        if (t = i.apply(this, arguments), this.currentElement && t) {
            if (this.cdata) o = this.document.createCDATASection(t), this.currentElement.appendChild(o); else {
                var o = this.document.createTextNode(t);
                this.currentElement.appendChild(o);
            }
            this.locator && r(this.locator, o);
        }
    },
    skippedEntity: function(t) {},
    endDocument: function() {
        this.document.normalize();
    },
    setDocumentLocator: function(t) {
        (this.locator = t) && (t.lineNumber = 0);
    },
    comment: function(t, e, n) {
        t = i.apply(this, arguments);
        var o = this.document.createComment(t);
        this.locator && r(this.locator, o), c(this, o);
    },
    startCDATA: function() {
        this.cdata = !0;
    },
    endCDATA: function() {
        this.cdata = !1;
    },
    startDTD: function(t, e, n) {
        var o = this.document.implementation;
        if (o && o.createDocumentType) {
            var i = o.createDocumentType(t, e, n);
            this.locator && r(this.locator, i), c(this, i);
        }
    },
    warning: function(t) {
        console.warn(t, o(this.locator));
    },
    error: function(t) {
        console.error(t, o(this.locator));
    },
    fatalError: function(t) {
        throw console.error(t, o(this.locator)), t;
    }
}, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(t) {
    n.prototype[t] = function() {
        return null;
    };
}), "function" == typeof require) {
    var a = require("./sax").XMLReader, u = exports.DOMImplementation = require("./dom").DOMImplementation;
    exports.XMLSerializer = require("./dom").XMLSerializer, exports.DOMParser = t;
}