var e = require("../../libs/core/Ticker"), r = require("../../libs/core/math");

Component({
    properties: {
        direction: {
            type: String,
            value: "h"
        },
        inverse: {
            type: Boolean,
            value: !1
        },
        showBack: {
            type: Boolean,
            value: !1
        },
        backRadius: {
            type: Number,
            value: 25
        },
        backColor: {
            type: String,
            value: "yellow"
        },
        showMid: {
            type: Boolean,
            value: !1
        },
        midColor: {
            type: String,
            value: "red"
        },
        midSpace: {
            type: Number,
            value: 0
        },
        midSpeed: {
            type: Number,
            value: .8
        },
        showFore: {
            type: Boolean,
            value: !1
        },
        foreColor: {
            type: String,
            value: "green"
        },
        foreSpace: {
            type: Number,
            value: 12
        },
        foreSpeed: {
            type: Number,
            value: -1
        },
        foreRadius: {
            type: Number,
            value: 25
        },
        borderWidth: {
            type: Number,
            value: 0
        },
        borderColor: {
            type: String,
            value: "red"
        },
        progress: {
            type: Number,
            value: 0
        }
    },
    data: {
        midWidth: 70,
        midHeight: 100,
        foreWidth: 30,
        foreHeight: 100,
        rot: 0
    },
    methods: {
        setStartProgress: function(e) {
            e = r.math.clamp(e, 0, 1), this.properties.progress = e, this._foreProgress = e, 
            this._midProgress = e, this._setVision();
        },
        setProgress: function(e) {
            e = r.math.clamp(e, 0, 1), this.properties.progress = e;
        },
        getProgress: function() {
            return this.properties.progress;
        },
        _setVision: function() {
            this.properties.showMid && (this._isHorizontal() ? (this.setData({
                midHeight: 100
            }), this.setData({
                midWidth: 100 * this._midProgress
            })) : (this.setData({
                midWidth: 100
            }), this.setData({
                midHeight: 100 * this._midProgress
            }))), this.properties.showFore && (this._isHorizontal() ? (this.setData({
                foreHeight: 100
            }), this.setData({
                foreWidth: 100 * this._foreProgress
            })) : (this.setData({
                foreWidth: 100
            }), this.setData({
                foreHeight: 100 * this._foreProgress
            })));
        },
        _isHorizontal: function() {
            return "h" === this.properties.direction || "horizontal" === this.properties.direction;
        },
        _isInverse: function() {
            return this.properties.inverse;
        },
        update: function(e) {
            var r = !1;
            this._foreProgress !== this.properties.progress && this.properties.showFore && (this.properties.foreSpeed < 0 ? this._foreProgress = this.properties.progress : this.properties.progress > this._foreProgress ? (this._foreProgress += e * this.properties.foreSpeed, 
            this._foreProgress = Math.min(this._foreProgress, this.properties.progress)) : (this._foreProgress -= e * this.properties.foreSpeed, 
            this._foreProgress = Math.max(this._foreProgress, this.properties.progress)), r = !0), 
            this._midProgress !== this.properties.progress && this.properties.showMid && (this.properties.midSpeed < 0 ? this._midProgress = this.properties.progress : this.properties.progress > this._midProgress ? (this._midProgress += e * this.properties.midSpeed, 
            this._midProgress = Math.min(this._midProgress, this.properties.progress)) : (this._midProgress -= e * this.properties.midSpeed, 
            this._midProgress = Math.max(this._midProgress, this.properties.progress)), r = !0), 
            r && this._setVision();
        }
    },
    ready: function() {
        this.properties.inverse && this.setData({
            rot: 180
        }), this.setStartProgress(this.properties.progress), e.Ticker.register(this, this.update);
    }
});