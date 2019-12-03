function e(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    return n.default = e, n;
}

function n(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, t, r) {
        return t && e(n.prototype, t), r && e(n, r), n;
    };
}(), r = require("../dati_comm/libs/network/wxAccount"), u = require("../dati_comm/libs/network/NSServerList"), i = (require("../dati_comm/libs/core/I32BoolValue"), 
require("../dati_comm/modules/Backpack")), l = (require("../dati_comm/libs/oosync/OOSyncClient"), 
e(require("../gamecfg"))), a = e(require("./LocalData")), c = new (function() {
    function e() {
        n(this, e);
    }
    return t(e, [ {
        key: "Sex",
        value: function() {
            return null == this.SyncObj ? 1 : this.SyncObj.GetValue("Sex");
        }
    }, {
        key: "Name",
        value: function() {
            return a.Get(a.ParamName.NICK_NAME);
        }
    }, {
        key: "_wxUserInfoValid",
        value: function() {
            return null != r.wxAccount.userInfo && null != r.wxAccount.userInfo.userInfo;
        }
    }, {
        key: "Online",
        value: function() {
            return this.SyncObj ? this.SyncObj.GetValue("ol") : "???";
        }
    }, {
        key: "Money",
        value: function() {
            return this.SyncObj ? parseInt(this.SyncObj.GetValue("Money")) : 0;
        }
    }, {
        key: "Xuefen",
        value: function() {
            if (null == this.SyncObj) return 0;
            var e = this.SyncObj.GetChild("Params", !1).GetValue(l.subtype_jifen);
            return null == e ? 0 : parseInt(e);
        }
    }, {
        key: "SharedTimes",
        value: function() {
            return null == this.SyncObj ? 1 : parseInt(this.SyncObj.GetValue("Sharecount"));
        }
    }, {
        key: "IconUrl",
        value: function() {
            return a.Get(a.ParamName.AVATOR_URL);
        }
    }, {
        key: "ArticleServerUrl",
        value: function() {
            return null != u.ServerList.ArticleSvrList && u.ServerList.ArticleSvrList.length > 0 ? u.ServerList.ArticleSvrList[0].url : "https://wz1.quwenyx.com/";
        }
    }, {
        key: "GetParam",
        value: function(e) {
            return null == this.SyncObj ? null : this.SyncObj.GetValue(e);
        }
    }, {
        key: "_BindSync",
        value: function(e) {
            this.SyncObj = e, this.Backpack = new i._Backpack(), this.Backpack._BindSync(e);
        }
    }, {
        key: "IsDebug",
        get: function() {
            return null != this.SyncObj && 1 == parseInt(this.SyncObj.GetValue("dbg"));
        }
    }, {
        key: "Sharelimit",
        get: function() {
            return null == this.SyncObj ? 1 : parseInt(this.SyncObj.GetValue("Sharelimit"));
        }
    }, {
        key: "SeasonJLST",
        get: function() {
            return null == this.SyncObj ? 1 : parseInt(this.SyncObj.GetValue("SeasonJLST"));
        }
    }, {
        key: "SeasonNotify",
        get: function() {
            return null == this.SyncObj ? 1 : parseInt(this.SyncObj.GetValue("SeasonNotify"));
        }
    }, {
        key: "BestLevel1",
        get: function() {
            return null == this.SyncObj ? 1 : this.SyncObj.GetValue("BestLevel1");
        }
    }, {
        key: "SeasonNum",
        get: function() {
            return null == this.SyncObj ? -1 : parseInt(this.SyncObj.GetValue("SeasonNum"));
        }
    }, {
        key: "SeasonStart",
        get: function() {
            return null == this.SyncObj ? 0 : parseInt(this.SyncObj.GetValue("SeasonStart"));
        }
    }, {
        key: "SeasonEnd",
        get: function() {
            return null == this.SyncObj ? 0 : parseInt(this.SyncObj.GetValue("SeasonEnd"));
        }
    }, {
        key: "SeasonBtn",
        get: function() {
            return null == this.SyncObj ? 0 : parseInt(this.SyncObj.GetValue("SeasonBtn"));
        }
    }, {
        key: "Level1",
        get: function() {
            return null == this.SyncObj ? 1 : this.SyncObj.GetValue("Level1");
        }
    }, {
        key: "Level2",
        get: function() {
            return null == this.SyncObj ? 1 : this.SyncObj.GetValue("Level2");
        }
    }, {
        key: "Level3",
        get: function() {
            return null == this.SyncObj ? 1 : this.SyncObj.GetValue("Level3");
        }
    }, {
        key: "InviteCode",
        get: function() {
            return null == this.SyncObj ? "" : this.SyncObj.GetValue("InviteCode");
        }
    }, {
        key: "ImportDataFinish",
        get: function() {
            return null != this.SyncObj && 1 == Number(this.SyncObj.GetValue("ImportDataFinish"));
        }
    }, {
        key: "HeadFrame",
        get: function() {
            return this.Backpack ? null == this.Backpack.GetFirstGoods(11) ? null : this.ArticleServerUrl() + "/public/uploads/ProblemImg/" : null;
        }
    }, {
        key: "IsVip",
        get: function() {
            return !!this.Backpack && (this.Backpack.IsVip ? 1 : 0);
        }
    }, {
        key: "VipEnd",
        get: function() {
            if (!this.Backpack) return "2008-10-10";
            var e = this.Backpack.VipGoods;
            if (!e) return "2008-10-10";
            var n = e.InvalidDate;
            return "{0}-{1}-{2}".format(n.getFullYear(), n.getMonth() + 1, n.getDate());
        }
    }, {
        key: "TimuJiange",
        get: function() {
            return null == this.SyncObj ? 0 : parseInt(this.SyncObj.GetValue("cgjg"));
        }
    }, {
        key: "CZIDS",
        get: function() {
            if (null == this.SyncObj) return [];
            for (var e = this.SyncObj.GetValue("CZIDS").split(","), n = 0; n < e.length; n++) e[n] = parseInt(e[n]);
            return e;
        }
    }, {
        key: "FXMoney",
        get: function() {
            return null == this.SyncObj ? 0 : this.SyncObj.GetValue("FXMoney");
        }
    } ]), e;
}())();

module.exports = {
    Player: c
};