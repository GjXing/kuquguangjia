function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = require("../network/UIEvent"), i = function() {
    function i(e) {
        var o = this;
        t(this, i), this._isPlaying = !1, this._ctx = wx.createInnerAudioContext(), this._ctx.autoplay = !1, 
        this._ctx.src = e ? e.src : null, this._ctx.volume = e ? e.volume : 1, this._ctx.loop = !!e && !!e.loop, 
        this._ctx.obeyMuteSwitch = !!e && !e.playOnMute, this.waitingEvent = new n.UIEvent(), 
        this.canPlayEvent = new n.UIEvent(), this.playEndedEvent = new n.UIEvent(), this.errorEvent = new n.UIEvent(), 
        this._ctx.onCanplay(function() {
            console.log("can play"), o.canPlayEvent.Emit();
        }), this._ctx.onEnded(function() {
            console.log("play ended"), o.playEndedEvent.Emit();
        }), this._ctx.onWaiting(function() {
            console.log("waiting"), o.waitingEvent.Emit();
        }), this._ctx.onError(function(t) {
            console.log("error code: " + t), o.errorEvent.Emit(t);
        }), this._resumeOnShow && (wx.onShow(this._resume.bind(this)), this._onShow = !0);
    }
    return e(i, [ {
        key: "release",
        value: function() {
            this.pause(), this._onShow && wx.offShow(this._resume), this.ctx.destroy(), this._isReleased = !0, 
            console.log("released");
        }
    }, {
        key: "play",
        value: function() {
            this.ctx.play(), this._isPlaying = !0;
        }
    }, {
        key: "replay",
        value: function() {
            this.stop(), this.play();
        }
    }, {
        key: "stop",
        value: function() {
            this.ctx.stop(), this._isPlaying = !1;
        }
    }, {
        key: "pause",
        value: function() {
            this.ctx.pause(), this._isPlaying = !1;
        }
    }, {
        key: "seek",
        value: function(t) {
            this.ctx.seek(t);
        }
    }, {
        key: "_resume",
        value: function() {
            console.log("resume"), this._isPlaying && this.play();
        }
    }, {
        key: "_checkRelease",
        value: function() {
            if (this._isReleased) throw new Error("this Audio has been released already and will not be available again.");
        }
    }, {
        key: "ctx",
        get: function() {
            return this._checkRelease(), this._ctx;
        }
    }, {
        key: "src",
        get: function() {
            return this.ctx.src;
        },
        set: function(t) {
            this.ctx.scr = t;
        }
    }, {
        key: "loop",
        get: function() {
            return this.ctx.loop;
        },
        set: function(t) {
            this.ctx.loop = t;
        }
    }, {
        key: "isPlaying",
        get: function() {
            return this._isPlaying;
        }
    }, {
        key: "buffered",
        get: function() {
            return this.ctx.buffered;
        }
    }, {
        key: "currentTime",
        get: function() {
            return this.ctx.currentTime;
        }
    }, {
        key: "duration",
        get: function() {
            return this.ctx.duration;
        }
    }, {
        key: "volume",
        get: function() {
            return this.ctx.volume;
        },
        set: function(t) {
            this.ctx.volume = t;
        }
    } ]), i;
}();

exports.default = i;