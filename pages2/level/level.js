var e = getApp(), t = [ "", "1-200关", "201-400关", "401-600关", "601-800关", "801-1000关", "1001-1200关" ];

Page({
    data: {
        year: new Date().getFullYear(),
        currentLevel: 0,
        maxLevel: 0,
        type: 0,
        startLevel: 0,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId
    },
    onLoad: function(a) {
        wx.showShareMenu({
            withShareTicket: !0
        });
        var l = e.globalData.currentType, r = wx.getStorageSync(l);
        console.log("levle-page type is " + r), wx.setNavigationBarTitle({
            title: t[r]
        });
        var n = e.globalData.levelSaveData, o = wx.getStorageSync(n)[r];
        this.setData({
            maxLevel: e.globalData.puzzle_maxLevel[r],
            currentLevel: o,
            type: r,
            isIPX: e.globalData.isIPX,
            startLevel: 200 * Number(r - 1)
        });
    },
    gotoGuess: function(e) {
        var t = this, a = e.currentTarget.dataset.loc;
        a <= t.data.currentLevel ? wx.navigateTo({
            url: "../guess/guess?id=" + a + "&type=" + this.data.type
        }) : console.log("当前等级未激活");
    },
    onShow: function() {
        this.onLoad();
    }
});