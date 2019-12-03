Component({
    properties: {
        IsAspectFit: {
            type: Boolean,
            value: !1
        },
        src: {
            type: String,
            value: ""
        },
        width: {
            type: String,
            value: ""
        },
        height: {
            type: String,
            value: ""
        }
    },
    data: {
        retryNum: 0
    },
    methods: {
        OnLoad: function(t) {
            this.data.retryNum = 0, console.log("OnLoad", t);
        },
        OnError: function(t) {
            if (++this.data.retryNum < 100) {
                var e = t.detail.errMsg.split(" ")[1];
                this.setData({
                    src: ""
                }), this.setData({
                    src: e
                });
            }
        }
    }
});