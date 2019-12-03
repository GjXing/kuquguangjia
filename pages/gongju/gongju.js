Page({
    data: {
        wxCard: "renzhengfei666",
        adunit: wx.gg.bannerId
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    copyClick: function() {
        wx.setClipboardData({
            data: this.data.wxCard,
            success: function(n) {
                wx.getClipboardData({
                    success: function(n) {
                        wx.showToast({
                            title: "复制成功",
                            icon: "success",
                            duration: 1500
                        });
                    }
                });
            }
        });
    }
});