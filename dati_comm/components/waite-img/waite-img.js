Component({
    properties: {
        width: {
            type: Number,
            value: 249,
            observer: function(t, e) {
                this.setData({
                    width: t
                });
            }
        },
        height: {
            type: Number,
            value: 94,
            observer: function(t, e) {
                this.setData({
                    height: t
                });
            }
        },
        srcArr: {
            type: Array,
            value: [],
            observer: function(t, e) {
                this.setData({
                    srcArr: t
                });
            }
        },
        time: {
            type: Number,
            value: 400,
            observer: function(t, e) {
                this.setData({
                    time: t
                });
            }
        },
        show: {
            type: Boolean,
            value: !0,
            observer: function(t, e) {
                console.log("show"), this.setData({
                    show: t
                }), this.stop();
            }
        }
    },
    data: {
        width: 249,
        height: 94,
        srcArr: [],
        time: 400,
        show: !0
    },
    ready: function() {
        this.setData({
            src: this.data.srcArr[0]
        }), console.log(this.data);
    },
    methods: {
        stop: function() {
            clearInterval(this.timmer), this.times = 0;
        },
        changeImg: function() {
            var t = this;
            return this.timmer = null, this.times = 0, function() {
                var e = t.data.srcArr.length;
                e && (t.timmer = setInterval(function() {
                    t.times, t.data.srcArr.length, t.setData({
                        src: t.data.srcArr[t.times % e]
                    }), console.log(t.times % e), t.times++;
                }, t.data.time));
            };
        }
    }
});