function e(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

var r, t = {
    info: {
        key: "ID",
        keytype: "int"
    },
    head: [ "ID", "String" ],
    body: (r = {}, e(r, 2001, [ 2001, "确认" ]), e(r, 2002, [ 2002, "取消" ]), e(r, 2003, [ 2003, "稍等片刻" ]), 
    e(r, 2004, [ 2004, "正在登陆" ]), e(r, 2005, [ 2005, "需要获取您的公开信息" ]), e(r, 2006, [ 2006, "仅获取您的公开信息（昵称、头像等），不会获取您的任何隐私信息，以及泄露您的公开信息。" ]), 
    e(r, 2007, [ 2007, "提示" ]), e(r, 2008, [ 2008, "未自定义昵称" ]), e(r, 2009, [ 2009, "更新提示" ]), 
    e(r, 2010, [ 2010, "新版本已经准备就绪，点击确定即可重启应用。" ]), e(r, 2011, [ 2011, "游戏版本已更新。<br />请退出QQ和小程序，重新进入，即可体验全新版本。" ]), 
    e(r, 2012, [ 2012, "分享失败" ]), e(r, 2013, [ 2013, "充值失败" ]), e(r, 2014, [ 2014, "成语猜猜看" ]), 
    e(r, 2015, [ 2015, "每日签到奖励" ]), e(r, 2016, [ 2016, "第{0}天" ]), e(r, 2017, [ 2017, "{0}金币" ]), 
    e(r, 2018, [ 2018, "领取金币" ]), e(r, 2019, [ 2019, "获得{0}金币" ]), e(r, 2020, [ 2020, "开始猜成语" ]), 
    e(r, 2021, [ 2021, "成语接龙" ]), e(r, 2022, [ 2022, "历史成就" ]), e(r, 2023, [ 2023, "更多好玩" ]), 
    e(r, 2024, [ 2024, "提示" ]), e(r, 2025, [ 2025, "更多金币" ]), e(r, 2026, [ 2026, "分享" ]), 
    e(r, 2027, [ 2027, "分享可获得金币" ]), e(r, 2028, [ 2028, "存在错误哦" ]), e(r, 2029, [ 2029, "先删除错误答案" ]), 
    e(r, 2030, [ 2030, "恭喜过关" ]), e(r, 2031, [ 2031, "恭喜您通过成语接龙第{0}关" ]), e(r, 2032, [ 2032, "金币不足" ]), 
    e(r, 2033, [ 2033, "每天最多获得{0}次分享金币" ]), e(r, 2034, [ 2034, "【接龙 {0}/{1}】" ]), e(r, 2035, [ 2035, "等级" ]), 
    e(r, 2036, [ 2036, "选关" ]), e(r, 2037, [ 2037, "赞赏" ]), e(r, 2038, [ 2038, "赞赏可获得金币哦" ]), 
    e(r, 2039, [ 2039, "赞赏可获得金币哦，活动期间奖励双倍" ]), e(r, 2040, [ 2040, "求助" ]), e(r, 2041, [ 2041, "匹配对战" ]), 
    e(r, 2042, [ 2042, "对战" ]), e(r, 2043, [ 2043, "匹配中" ]), e(r, 2044, [ 2044, "正在寻找对手" ]), 
    e(r, 2045, [ 2045, "放弃并返回" ]), e(r, 2046, [ 2046, "匹配成功，即将开始对战！" ]), e(r, 2047, [ 2047, "{0}分" ]), 
    e(r, 2048, [ 2048, "再来一局" ]), e(r, 2049, [ 2049, "炫耀成绩" ]), e(r, 2050, [ 2050, "下一题" ]), 
    e(r, 2051, [ 2051, "最后一题<br />得分双倍" ]), e(r, 2052, [ 2052, "需要授权才能进行联机对战哦" ]), r)
};

module.exports = {
    data: t
};