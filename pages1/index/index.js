var t = getApp();

Page({
    data: {
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId,
        ColorList: t.globalData.ColorList
    },
    showDetail: function(t) {
        var e = t.currentTarget.id;
        console.error(e, t, this.data.ColorList);
        var a = this.data.ColorList[e].title;
        0 == e ? wx.navigateTo({
            url: "../detail/detail?type=gaoxiao&title=" + a
        }) : 1 == e ? wx.navigateTo({
            url: "../detail/detail?type=jingdian&title=" + a
        }) : 2 == e ? wx.navigateTo({
            url: "../detail/detail?type=ertong&title=" + a
        }) : 3 == e ? wx.navigateTo({
            url: "../detail/detail?type=zhengren&title=" + a
        }) : 4 == e ? wx.navigateTo({
            url: "../detail/detail?type=dongwu&title=" + a
        }) : 5 == e ? wx.navigateTo({
            url: "../detail/detail?type=lengxiaohua&title=" + a
        }) : 6 == e ? wx.navigateTo({
            url: "../detail/detail?type=zimi&title=" + a
        }) : 7 == e ? wx.navigateTo({
            url: "../detail/detail?type=dengmi&title=" + a
        }) : 8 == e ? wx.navigateTo({
            url: "../detail/detail?type=shuxue&title=" + a
        }) : 9 == e ? wx.navigateTo({
            url: "../detail/detail?type=wulitou&title=" + a
        }) : 10 == e && wx.navigateTo({
            url: "../detail/detail?type=youmo&title=" + a
        });
    },
    onShareAppMessage: function() {
        return {
            title: "成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "/pages1/index/index"
        };
    },
    onReady: function() {
        this.showInsertAd(), this.showIFav();
    },
    showInsertAd: function() {
        wx.createInterstitialAd && setTimeout(function() {
            wx.createInterstitialAd({
                adUnitId: wx.gg.insertId
            }).show().catch(function(t) {});
        }, 15e3);
    },
    showIFav: function() {
        var t = this;
        this.setData({
            showIfa: !0
        }), setTimeout(function() {
            t.setData({
                showIfa: !1
            });
        }, 4e3);
    },
    closeIFav: function() {
        this.setData({
            showIfa: !1
        });
    }
});