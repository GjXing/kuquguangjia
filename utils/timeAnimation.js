function t(t) {
    this.self = t, this.time = 100, this.timer = null, this.steps = 100, this.step = 0, 
    this.interval = 0, this.times = 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), t.prototype = {
    init: function(t, i) {
        return this.times = 0, this.myintegral = t, this.integral = i, this.step = (this.integral - this.myintegral) / this.steps, 
        this.interval = this.steps / this.time, this.move(), this;
    },
    move: function() {
        var t = this;
        if (this.times >= this.steps) return clearTimeout(this.timer), this.timer = null, 
        void (this.times = 0);
        this.times++, this.timer = setTimeout(function() {
            t.myintegral += t.step, "function" == typeof t.score && t.score(t.myintegral), t.move();
        }, this.interval);
    }
}, exports.TimeAnimation = t;