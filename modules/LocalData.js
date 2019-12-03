function e(e, t, S) {
    return t in e ? Object.defineProperty(e, t, {
        value: S,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = S, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.BindData = exports.AutoUploadParams = exports.Set = exports.GetNumber = exports.Get = exports.ParamName = exports.AutoInitParams = void 0, 
require("./GConn");

var t, S, r = require("../dati_comm/libs/oosync/OOSyncClient"), n = (function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var S in e) Object.prototype.hasOwnProperty.call(e, S) && (t[S] = e[S]);
    t.default = e;
}(require("../dati_comm/modules/DataSecurity")), !1), o = {
    PASS_LEVELS: "PassLevels",
    PASS_LEVELS_JIELONG: "PassLevelsJielong",
    CURRENT_LEVELS_JIELONG: "CurrentLevelsJielong",
    TOTAL_POINT: "TotalPoint",
    LAST_SIGNIN: "LastSignin",
    TOTAL_SIGNIN_COUNT: "TotalSigninCount",
    SHARE_TIME: "ShareTime",
    SHARE_COUNT: "ShareCount",
    NICK_NAME: "NickName",
    AVATOR_URL: "AvatorUrl",
    NEW_USER: "NewUser",
    OPERATION_NUM: "OperationNum",
    UPLOADING: "Uploading",
    PAY_FINISH: "pay_finish",
    JL_SHARE_TIME: "JLShareTime",
    JL_SHARE_COUNT: "JLShareCount",
    FINGHT_COUNT: "FinghtCount",
    LAST_FINGHT: "LastFinght",
    GUANQIA: "guanqia",
    DAAN: "daan",
    AUTHORIZE: "Authorize",
    AUTHORIZEOK: "AuthorizeOK",
    NUMBER_IS_OK: "NumberIsOk",
    SHOW_NUMBER: "SHOW_NUMBER",
    NUMBER_XTH: "NumberXth"
};

e(t = {}, o.PASS_LEVELS, 1), e(t, o.PASS_LEVELS_JIELONG, 1), e(t, o.CURRENT_LEVELS_JIELONG, 1), 
e(t, o.TOTAL_POINT, 1), e(S = {}, o.LAST_SIGNIN, 1), e(S, o.TOTAL_SIGNIN_COUNT, 1), 
e(S, o.SHARE_TIME, 1), e(S, o.SHARE_COUNT, 1), e(S, o.JL_SHARE_TIME, 1), e(S, o.JL_SHARE_COUNT, 1), 
e(S, o.PAY_FINISH, 1);

for (var a in o) !function(e) {
    r.OOSyncClient.BindValueChangedEvent(0, "Player", e, function(t) {
        if (n) {
            var S = r.OOSyncClient.RootObj(), o = r.OOSyncClient.GetObject(S.Sid(), "Player").GetValue(e);
            o && wx.setStorageSync(e, o);
        }
    });
}(o[a]);

exports.AutoInitParams = function() {
    "" == wx.getStorageSync(o.TOTAL_POINT) && (wx.setStorageSync(o.TOTAL_POINT, 100), 
    wx.setStorageSync(o.NEW_USER, 1), console.log("送金币300")), "" == wx.getStorageSync(o.CURRENT_LEVELS_JIELONG) && wx.setStorageSync(o.CURRENT_LEVELS_JIELONG, 1), 
    "" == wx.getStorageSync(o.PASS_LEVELS_JIELONG) && wx.setStorageSync(o.PASS_LEVELS_JIELONG, 1), 
    "" == wx.getStorageSync(o.PASS_LEVELS) && wx.setStorageSync(o.PASS_LEVELS, 1), "" == wx.getStorageSync(o.OPERATION_NUM) && wx.setStorageSync(o.OPERATION_NUM, 1), 
    "" == wx.getStorageSync(o.NUMBER_IS_OK) && wx.setStorageSync(o.NUMBER_IS_OK, "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"), 
    "" == wx.getStorageSync(o.NUMBER_XTH) && wx.setStorageSync(o.NUMBER_XTH, "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1"), 
    "" == wx.getStorageSync(o.SHOW_NUMBER) && wx.setStorageSync(o.SHOW_NUMBER, "1");
}, exports.ParamName = o, exports.Get = function(e) {
    return wx.getStorageSync(e);
}, exports.GetNumber = function(e) {
    return Number(this.Get(e));
}, exports.Set = function(e, t) {
    wx.setStorageSync(e, "" + t);
}, exports.AutoUploadParams = function() {}, exports.BindData = function(e, t) {
    t();
};