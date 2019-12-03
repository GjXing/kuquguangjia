var a = {
    CCY: {
        subtype_money: 4,
        subtype_jifen: 3,
        AppId: "wx63373c52b31009ff",
        PayKey: "guaguajiaoguaguajiaoguaguajiao12",
        shopIconArr: [ 1, 5, 3 ],
        title: "猜成语",
        NavigationBarFG: "#ffffff",
        NavigationBarBG: "#391c56",
        xieyi: 501
    }
};

module.exports = {
    BuildConfig: function(e, i) {
        var t = a[e];
        return t.ProjectID = e, t.ServerListUrl = "https://list.quwenyx.com/gameweb/" + e + "/Config" + i + ".xml", 
        t.PubConfigUrl = "https://list.quwenyx.com/GameWeb/Pub/" + e + "_PubConfg.xml", 
        t;
    }
};