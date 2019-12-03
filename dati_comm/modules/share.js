function e(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    return n.default = e, n;
}

function n(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.share = void 0;

var t, o = require("../../sdata/SDataShare"), s = require("../../modules/Player"), a = require("../libs/network/Conns"), c = e(require("../../gamecfg")), r = e(require("../../modules/LocalData")), i = (t = {
    getShareInfo: function(e) {
        getApp().globalData.isFromCheckShare = !0;
        var n = o.SDataShare.GetRow(e), t = n[o.SDataShare.I_Icon], a = n[o.SDataShare.I_UserName], c = n[o.SDataShare.I_Note];
        return 1 == a && (c = c.format(s.Player.Name())), {
            Note: c,
            Icon: s.Player.ArticleServerUrl() + "/public/uploads/ProblemImg/" + t
        };
    },
    getCommonShareContent: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var n = this.getShareInfo(1), t = {
            title: n.Note,
            path: "pages/index/index?share=true",
            success: this.sharenewquna,
            fail: this._onShareFail
        };
        return console.log("parmsparmsparmsparmsparmsparmsparmsparmsparmsparms", t), t.imageUrl = n.Icon, 
        t;
    },
    getCGShareContent: function(e, n) {
        return getApp().globalData.isFromCheckShare = !0, {
            title: "我已经闯过" + n + "关，成语 谜语 歇后语 脑筋急转弯，成语猜猜看，成语小秀才，猜谜语，成语接龙，成语消消乐，猜灯谜，猜歇后语，看图猜成语",
            path: "/pages/index/index",
            success: function(t) {
                var o = parseInt(new Date().getTime() / 864e5), s = r.GetNumber(r.ParamName.SHARE_TIME), a = r.GetNumber(r.ParamName.SHARE_COUNT);
                if (o == s ? a += 1 : a = 1, r.Set(r.ParamName.SHARE_TIME, o), r.Set(r.ParamName.SHARE_COUNT, a), 
                n < 200) {
                    if (console.log("onshare success1"), a > 10) return void ("" == wx.getStorageSync("ShowTipsPre100") && (wx.setStorage({
                        key: "ShowTipsPre100",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取十次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (n < 400) {
                    if (console.log("onshare success2"), a > 8) return void ("" == wx.getStorageSync("ShowTipsPre200") && (wx.setStorage({
                        key: "ShowTipsPre200",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取八次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (n < 600) {
                    if (console.log("onshare success3"), a > 6) return void ("" == wx.getStorageSync("ShowTipsPre300") && (wx.setStorage({
                        key: "ShowTipsPre300",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取六次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (n < 800) {
                    if (console.log("onshare success3"), a > 4) return void ("" == wx.getStorageSync("ShowTipsPre400") && (wx.setStorage({
                        key: "ShowTipsPre400",
                        data: "show"
                    }), wx.showModal({
                        title: "提示",
                        content: "您一天只能获取四次分享奖励哦！！！",
                        showCancel: !1
                    })));
                } else if (console.log("onshare success3"), a > 2) return void ("" == wx.getStorageSync("ShowTipsPreOther") && (wx.setStorage({
                    key: "ShowTipsPreOther",
                    data: "show"
                }), wx.showModal({
                    title: "提示",
                    content: "您一天只能获取两次分享奖励哦！！！",
                    showCancel: !1
                })));
                var c = r.GetNumber(r.ParamName.TOTAL_POINT);
                c += 0, r.Set(r.ParamName.TOTAL_POINT, c), e.setData({
                    total_point: c
                });
            },
            fail: function(e) {}
        };
    },
    getShareContent: function(e, n) {
        var t = this.getShareInfo(n), o = {
            title: t.Note,
            path: "pages/index/index?share=true",
            success: this.sharenewquna,
            fail: this._onShareFail
        };
        return o.imageUrl = t.Icon, o;
    },
    getPKShareMessage: function(e) {
        var n = this.getShareInfo(3), t = {
            title: n.Note,
            path: "pages/index/index?share=true&m8=" + e,
            imageUrl: n.Icon,
            success: this._onShareSuccess,
            fail: this._onShareFail
        };
        return console.log(t), t;
    },
    getTeamShareMessage: function(e) {
        var n = this.getShareInfo(3), t = {
            title: n.Note,
            path: "pages/index/index?share=true&m9=" + e,
            imageUrl: n.Icon
        };
        return console.log(t), t;
    },
    getCheckLockShareMessage: function(e, n) {
        var t = this.getShareInfo(8);
        return {
            title: t.Note,
            path: "pages/index/index?share=true",
            imageUrl: t.Icon,
            success: function(n) {
                console.log("成功", e), e && e(n);
            },
            fail: function(t) {
                console.log("失败", e), n && n(t);
            }
        };
    },
    getCheckGiveShareMessage: function(e, n) {
        var t = this.getShareInfo(9), o = {
            title: t.Note,
            path: "pages/index/index?share=true",
            success: function(n) {
                a.GameConn.Request({
                    n: "ssc"
                }, function(n) {
                    e && e(n);
                });
            },
            fail: function(e) {
                n && n();
            }
        };
        return o.imageUrl = t.Icon, o;
    },
    getoverShareMessage: function(e, n) {
        var t = this.getShareInfo(4), o = {
            title: t.Note,
            path: "pages/index/index?share=true",
            success: function(n) {
                e && e(n);
            },
            fail: function(e) {
                n && n();
            }
        };
        return o.imageUrl = t.Icon, o;
    },
    hasShareReward: function() {
        return s.Player.Backpack.ShareGerenNum < s.Player.Sharelimit;
    },
    _onShareSuccess: function(e) {
        console.log("#_onShareSuccess#", e), a.GameConn.Request({
            n: "ssc"
        }, function(e) {
            console.log("炫耀成功，获得金币", e.jb), console.log("今天第 " + e.cs + " 次分享成功！");
        });
    },
    _onShareFail: function() {
        console.log("Share failed!!!");
    },
    sharenewqun: function(e) {
        console.log("进入群分享", e), wx.getShareInfo({
            shareTicket: e[0],
            success: function(e) {
                var n = {};
                n.ed = e.encryptedData, n.iv = e.iv, console.log("获取到ediv", n), a.GameConn.Request({
                    n: "sqsc",
                    m: 1,
                    wxg: n
                }, function(e) {
                    if (0 == e.r) return e.jb;
                    1 == e.r ? wx.showModal({
                        title: "分享提醒",
                        content: "这个群已经分享，请换个群分享",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    }) : wx.showModal({
                        title: "分享失败",
                        content: "未知错误",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    });
                });
            }
        });
    },
    sharenewquna: function(e) {
        console.log("进入群分享", e), wx.getShareInfo({
            shareTicket: e.shareTickets[0],
            success: function(e) {
                var n = {};
                n.ed = e.encryptedData, n.iv = e.iv, console.log("获取到ediv", n), a.GameConn.Request({
                    n: "sqsc",
                    m: 1,
                    wxg: n
                }, function(e) {
                    0 == e.r || (1 == e.r ? wx.showModal({
                        title: "分享提醒",
                        content: "这个群已经分享，请换个群分享",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    }) : wx.showModal({
                        title: "分享失败",
                        content: "未知错误",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    }));
                });
            }
        });
    },
    shareshopqun: function(e) {
        wx.getShareInfo({
            shareTicket: e[0],
            success: function(e) {
                var n = {};
                n.ed = e.encryptedData, n.iv = e.iv, a.GameConn.Request({
                    n: "sqsc",
                    m: 2,
                    wxg: n
                }, function(e) {
                    0 == e.r || (1 == e.r ? wx.showModal({
                        title: "分享提醒",
                        content: "这个群已经分享，请换个群分享",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    }) : wx.showModal({
                        title: "分享失败",
                        content: "未知错误",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    }));
                });
            }
        });
    },
    sharequn: function(e) {
        wx.getShareInfo({
            shareTicket: e[0],
            success: function(e) {
                var n = {};
                n.ed = e.encryptedData, n.iv = e.iv, a.GameConn.Request({
                    n: "sqsc",
                    m: 1,
                    wxg: n
                }, function(e) {
                    0 == e.r ? a.GameConn.Request({
                        n: "cg",
                        fl: c.xieyi
                    }, function(e) {
                        a.GameConn.Request({
                            n: "cgplay"
                        }, function(e) {});
                    }) : 1 == e.r ? wx.showModal({
                        title: "分享提醒",
                        content: "这个群已经分享，请换个群分享",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {
                            a.GameConn.Request({
                                n: "cg",
                                fl: c.xieyi
                            }, function(e) {
                                a.GameConn.Request({
                                    n: "cgplay"
                                }, function(e) {});
                            });
                        }
                    }) : wx.showModal({
                        title: "分享失败",
                        content: "未知错误",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {
                            a.GameConn.Request({
                                n: "cg",
                                fl: c.xieyi
                            }, function(e) {
                                a.GameConn.Request({
                                    n: "cgplay"
                                }, function(e) {});
                            });
                        }
                    });
                });
            }
        });
    },
    sharegeren: function() {
        a.GameConn.Request({
            n: "ssc"
        }, function(e) {
            0 == e.r ? a.GameConn.Request({
                n: "cg",
                fl: c.xieyi
            }, function(e) {
                a.GameConn.Request({
                    n: "cgplay"
                }, function(e) {});
            }) : wx.showModal({
                title: "分享失败",
                content: "未知错误",
                showCancel: !1,
                confirmText: "确定",
                success: function(e) {
                    a.GameConn.Request({
                        n: "cg",
                        fl: c.xieyi
                    }, function(e) {
                        a.GameConn.Request({
                            n: "cgplay"
                        }, function(e) {});
                    });
                }
            });
        });
    }
}, n(t, "sharenewqun", function(e, t, o, r) {
    var i = this, u = this, l = e.shareTickets;
    l ? wx.getShareInfo({
        shareTicket: l[0],
        success: function(e) {
            var t = {};
            t.ed = e.encryptedData, t.iv = e.iv, a.GameConn.Request({
                n: "sqsc",
                m: 1,
                wxg: t
            }, function(e) {
                if (0 == e.r) {
                    var t = s.Player.Money();
                    t += e.jb, i.setData(n({}, e, parseInt(t))), r = parseInt(r + 1), i.fenxiang(r, o), 
                    a.GameConn.Request({
                        n: "cg",
                        fl: c.xieyi
                    }, function(e) {
                        a.GameConn.Request({
                            n: "cgplay"
                        }, function(e) {});
                    });
                } else 1 == e.r ? wx.showModal({
                    title: "分享提醒",
                    content: "这个群已经分享，请换个群分享",
                    showCancel: !1,
                    confirmText: "确定",
                    success: function(e) {}
                }) : wx.showModal({
                    title: "分享失败",
                    content: "未知错误",
                    showCancel: !1,
                    confirmText: "确定",
                    success: function(e) {}
                });
            });
        }
    }) : wx.showModal({
        title: "分享提醒",
        content: "需要分享到QQ",
        showCancel: !1,
        confirmText: "确定",
        success: function(e) {
            a.GameConn.Request({
                n: "ssc"
            }, function(e) {
                if (0 == e.r) {
                    var t = s.Player.Money();
                    t += e.jb, u.setData(n({}, e, parseInt(t))), o += 1, u.fenxiang(r, o), a.GameConn.Request({
                        n: "cg",
                        fl: c.xieyi
                    }, function(e) {
                        a.GameConn.Request({
                            n: "cgplay"
                        }, function(e) {});
                    });
                } else wx.showModal({
                    title: "分享失败",
                    content: "未知错误",
                    showCancel: !1,
                    confirmText: "确定",
                    success: function(e) {}
                });
            });
        }
    });
}), n(t, "sharenewgeren", function() {
    a.GameConn.Request({
        n: "ssc"
    }, function(e) {
        if (0 == e.r) return e.jb;
        wx.showModal({
            title: "分享失败",
            content: "未知错误",
            showCancel: !1,
            confirmText: "确定",
            success: function(e) {}
        });
    });
}), t);

exports.share = i;