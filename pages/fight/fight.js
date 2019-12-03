function t(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (i[o] = t[o]);
    return i.default = t, i;
}

function i(t, i, o) {
    return i in t ? Object.defineProperty(t, i, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[i] = o, t;
}

var o = require("../../modules/Player"), n = require("../../dati_comm/libs/network/Conns"), a = require("../../dati_comm/modules/FightRoom"), e = require("../../dati_comm/sdata/SDataID2.js"), s = (require("../../dati_comm/sdata/KeyValue.js"), 
t(require("../../dati_comm/modules/DataSecurity"))), h = t(require("../../modules/LocalData")), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./fn.js")), u = require("../../utils/util.js"), l = void 0, c = void 0, g = 0, m = void 0, f = 20, d = !1;

Page({
    data: {
        cur_turn_level: 1,
        main_img_url: "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/pic/obj_1.jpg",
        total_point: "12",
        array_show: [],
        array: [],
        ans: [ 24, 24, 24, 24 ],
        show_tip_btn: !1
    },
    onLoad: function(t) {
        d = !0, this.setData({
            shuzhi: 0
        }), this.setData({
            fenshu_left: 0
        }), this.setData({
            fenshu_right: 0
        });
    },
    onReady: function() {
        console.log("fight ready###########");
    },
    onShow: function() {
        console.log("fight show###########"), l = !0, g = 0, c && clearInterval(c), c = setInterval(function() {
            n.WorldConn.Connected() ? g = 0 : ++g > 3 && (clearInterval(c), c = null, getApp().globalData.ServerLogin.ShowGoHomeBox());
        }, 3e3), this._BindEvts(), this.OnEnterRoom(), this.OnDoLun0(), this.OnDoKantiEnd(), 
        this.OnDoLun(), this.OnDoHuidaJG(), this.OnCJ();
    },
    onHide: function() {
        d = !1, l = !1, c && (clearInterval(c), c = null), m && (clearInterval(m), m = null), 
        this.offEvts();
    },
    offEvts: function() {
        console.log("！！！！！！！！！！！！！！！！！！注销事件"), a.FightRoom.EvtEnterRoom.Off(this.OnEnterRoom), 
        a.FightRoom.EvtDoLun0.Off(this.OnDoLun0), a.FightRoom.EvtDoLun.Off(this.OnDoLun), 
        a.FightRoom.EvtDoKantiEnd.Off(this.OnDoKantiEnd), a.FightRoom.EvtDoTexiao.Off(this.OnDoTexiao), 
        a.FightRoom.EvtDoHuidaJG.Off(this.OnDoHuidaJG), a.FightRoom.EvtCJ.Off(this.OnCJ);
    },
    _BindEvts: function() {
        console.log("！！！！！！！！！！！！！！！！！！绑定事件"), this.offEvts(), a.FightRoom.EvtEnterRoom.On(this, this.OnEnterRoom), 
        a.FightRoom.EvtDoLun0.On(this, this.OnDoLun0), a.FightRoom.EvtDoLun.On(this, this.OnDoLun), 
        a.FightRoom.EvtDoKantiEnd.On(this, this.OnDoKantiEnd), a.FightRoom.EvtDoTexiao.On(this, this.OnDoTexiao), 
        a.FightRoom.EvtDoHuidaJG.On(this, this.OnDoHuidaJG), a.FightRoom.EvtCJ.On(this, this.OnCJ);
    },
    OnCJ: function() {
        l && a.FightRoom.Chengji && getApp().globalData.wnds.Wnd_overFight.Show();
    },
    onUnload: function() {
        this.onHide();
    },
    OnEnterRoom: function() {
        l && (this.setData({
            show_daan: null,
            qizi_left: !1,
            qizi_right: !1
        }), d && this.setData({
            array_show: null
        }), 0 == a.FightRoom.LFen || this.setData({
            fenshu_left: a.FightRoom.LFen
        }), 0 == a.FightRoom.RFen || this.setData({
            fenshu_right: a.FightRoom.RFen
        }), this.setData({
            nickname: o.Player.Name(),
            avatarUrl: o.Player.IconUrl(),
            nickname_right: a.FightRoom.RightPlys[0].name,
            avatarUrl_right: a.FightRoom.RightPlys[0].iconurl
        }));
    },
    OnDoLun0: function() {
        if (l && (d && this.startTipBtnTime(), this.setData({
            show_daan: null,
            menban: !1,
            qizi_left: !1,
            qizi_right: !1
        }), l)) {
            var t = a.FightRoom.Lun;
            h.Get(h.ParamName.GUANQIA) != t && (h.Set(h.ParamName.GUANQIA, t), this.data.ans = [ 24, 24, 24, 24 ], 
            this.setData({
                ans: this.data.ans
            })), this.setData({
                cur_turn_level: t,
                gqs: a.FightRoom.MaxLun
            });
        }
    },
    startTipBtnTime: function() {
        clearInterval(m), f = 10, this.setData({
            show_tip_btn: !1
        }), m = setInterval(function() {
            0 == --f && (clearInterval(m), this.setData({
                show_tip_btn: !0
            }));
        }.bind(this), 1e3);
    },
    OnDoLun: function() {
        if (l) {
            console.log("FightRoom.Wenti:::" + a.FightRoom.Wenti);
            var t = "http://xcxcy.oss-cn-hangzhou.aliyuncs.com/cycck/pic/obj_" + a.FightRoom.Wenti + ".jpg";
            a.FightRoom.Wenti > 501 && (t = "http://cyktc.oss-cn-beijing.aliyuncs.com/cyimg_rename/" + u.PIC[a.FightRoom.Wenti - 502]), 
            console.log("图片", a.FightRoom.Wenti), this.setData({
                main_img_url: t
            }), this.setData({
                daan_img: !1,
                shuzhi: 1
            });
        }
    },
    OnDoKantiEnd: function() {
        if (l && a.FightRoom.Daan && h.Get(h.ParamName.DAAN) != a.FightRoom.Wenti) {
            h.Set(h.ParamName.DAAN, a.FightRoom.Wenti);
            var t = [];
            this.guess = new r.default({
                cur_turn_level: a.FightRoom.Wenti,
                ALL_IDIOMS: u.ALL_IDIOMS
            });
            for (var i = 0; i < 32; i++) t.push(!0);
            this.setData({
                array: this.guess.random_da_an
            }), this.setData({
                array_show: t
            }), this.setData({
                daan_xs: !0
            });
        }
    },
    OnDoTexiao: function() {
        if (d = !0, console.log("进入次数！！！", a.FightRoom.Texiao), null != a.FightRoom.Texiao) switch (a.FightRoom.Texiao) {
          case 1:
            this.setData({
                show_daan: !1,
                daan_img: !0,
                qizi_left: !1,
                qizi_right: !1,
                data_xyt: (0, e.txt)(2051),
                daan_xs: !1
            });
            break;

          case 2:
            this.setData({
                show_daan: !1,
                qizi_left: !1,
                qizi_right: !1,
                daan_img: !0,
                data_xyt: (0, e.txt)(2050),
                daan_xs: !1
            });
        }
    },
    OnDoHuidaJG: function() {
        if (l && a.FightRoom.HuidaJG) {
            var t = a.FightRoom.HuidaJG;
            this.setData({
                show_daan: this.guess.currentGussint,
                menban: !0
            }), t.uid == a.FightRoom.LeftPlys[0].uid ? (this.setData({
                fenshu_left: t.f,
                qizi_left: !0
            }), d = !0) : (this.setData({
                fenshu_right: t.f,
                qizi_right: !0
            }), d = !0);
        }
    },
    onShareAppMessage: function() {},
    clickItem: function(t) {
        var o, e = t.currentTarget, h = this.data.ans;
        if (h.includes(24)) {
            var r = e.dataset.item;
            console.log(e);
            for (var u = 0; u < h.length; u++) if (24 == h[u]) {
                h.splice(u, 1, r);
                break;
            }
            this.setData((o = {}, i(o, "array_show[" + r + "]", !1), i(o, "ans", h), o));
            for (var l = "", c = 0; c < h.length; c++) l += this.data.array[h[c]];
            if (console.log("选择的答案：", l), console.log("正确答案：", this.guess.currentGussint), this.guess.currentGussint == l && 4 == l.length) {
                var g = a.FightRoom.Lun, m = l, f = a.FightRoom.Daan, d = {
                    n: "hd",
                    x: m,
                    lun: g,
                    s: s.Sign(f, m, g)
                };
                this.setData({
                    show_daan: m,
                    menban: !0
                }), n.WorldConn.Request(d, function(t) {
                    console.log("回答返回 ", t.r);
                });
            } else 4 == l.length && wx.showToast({
                title: "存在错误哦",
                icon: "success",
                image: "../../imgs/comm/warn.png",
                duration: 2e3
            });
            console.log(parseInt(r));
        } else wx.showToast({
            title: "先删除错误答案",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        });
    },
    clickAns: function(t) {
        var o = t.currentTarget.dataset.item, n = this.data.ans;
        console.log(n[o]), this.setData(i({}, "array_show[" + n[o] + "]", !0));
        for (var a = 0; a < n.length; a++) if (n[a] == n[o]) {
            n.splice(a, 1, 24);
            break;
        }
        this.setData({
            ans: n
        });
    },
    showTips: function() {
        for (var t = this.data.ans, i = 0; i < t.length; i++) if (24 == t[i]) {
            var o = {};
            return o.currentTarget = {}, o.currentTarget.dataset = {
                item: this.guess.Da_An_Index_Arr[i]
            }, this.clickItem(o), this.setData({
                show_tip_btn: !1
            }), void this.startTipBtnTime();
        }
        wx.showToast({
            title: "先删除错误答案",
            icon: "success",
            image: "../../imgs/comm/warn.png",
            duration: 2e3
        }), console.log(this.guess.tipDaAn("因"));
    }
});