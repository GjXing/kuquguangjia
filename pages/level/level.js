var e = function(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var c in e) Object.prototype.hasOwnProperty.call(e, c) && (n[c] = e[c]);
    return n.default = e, n;
}(require("../../modules/LocalData"));

Page({
    data: {
        level_url: [ "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_1.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_2.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_3.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_4.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_5.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_6.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_7.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_8.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_9.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_10.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_11.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_12.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_13.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_14.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_14.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_14.png", "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_14.png" ],
        level: 1,
        adunit: wx.gg.bannerId,
        adunit_sp: wx.gg.spId,
        adunit_qt: wx.gg.qtId
    },
    onLoad: function() {
        var n, c = e.GetNumber(e.ParamName.PASS_LEVELS);
        for (n = 1; n < 18 && !(c < (2 * n + 1) * (2 * n + 1)); n++) ;
        this.data.level = n;
        for (var i = [], s = 1; s <= 17; s++) i[s - 1] = s <= n ? "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/nor_" + s + ".png" : "http://hyimages.oss-cn-beijing.aliyuncs.com/ccy/level/sel_" + s + ".png";
        this.setData({
            level_url: i
        });
    },
    clickItem: function(e) {
        var n = e.currentTarget.dataset.item;
        this.data.level < n ? wx.showToast({
            title: "请先完成激活",
            icon: "success",
            duration: 2e3
        }) : wx.navigateTo({
            url: "../sel/sel?id=" + n
        });
    }
});