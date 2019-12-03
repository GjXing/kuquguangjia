function i(i, s, e) {
    return s in i ? Object.defineProperty(i, s, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[s] = e, i;
}

function s(i) {
    if (i && i.__esModule) return i;
    var s = {};
    if (null != i) for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (s[e] = i[e]);
    return s.default = i, s;
}

function e(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

var t;

wx.gg = {
    bannerId: "adunit-8d04d53f3f01aaea",
    videoId: "adunit-e2f4d489223e60b9",
    insertId: "adunit-ac1f04720c462523",
    spId: "adunit-9c3e46085e3a3aea",
    qtId: ""
};

var n = require("./dati_comm/libs/core/Ticker"), a = e(require("./dati_comm/libs/core/Tween")), o = require("./dati_comm/modules/FightRoom"), r = e(require("./dati_comm/modules/PageWrap")), u = (require("./dati_comm/libs/network/UIEvent.js"), 
require("./dati_comm/modules/AppUpgrade")), d = s(require("./modules/LocalData"));

require("./utils/StringEX"), s(require("./gamecfg.js"));

var p = require("./component/CusToast/CusToast"), w = require("./modules/ServerLogin.js");

n.Ticker.start(30), n.Ticker.register(null, function(i) {
    a.default.update();
});

var q = require("./utils/util.js"), l = !1, g = {
    wnd: {
        duration: .3,
        outerPosX: 1e3,
        alphaEaseType: a.default.Easing.Linear.None,
        posXEaseType: a.default.Easing.Linear.None,
        upperOutPosX: 750,
        lowerOutPosX: -200,
        slideSeqDuration: .5
    }
};

App({
    ToastPannel: p.ToastPannel,
    onLaunch: function(i) {
        this.checkIsIPhoneX(), this.getMenuButtonBoundingClientRect(), this.globalData.ServerLogin = w.ServerLogin, 
        "" == wx.getStorageSync(this.globalData.CURRENT_LEVELS) && wx.setStorageSync(this.globalData.CURRENT_LEVELS, 1), 
        (0, u.BindAppUpdateEvt)(), d.AutoInitParams(), console.log(i), this.globalData.isFromShare = "true" === i.query.share;
    },
    forceUpdate: function() {
        if (wx.getUpdateManager) {
            var i = wx.getUpdateManager();
            i.onCheckForUpdate(function(i) {
                console.log("is need update ", i.hasUpdate);
            }), i.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(s) {
                        s.confirm && i.applyUpdate();
                    }
                });
            }), i.onUpdateFailed(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本下载失败",
                    showCancel: !1
                });
            });
        }
    },
    onShow: function(i) {
        console.log(i), this.globalData.isFromShare = "true" === i.query.share;
        var s = this.globalData.isFromCheckShare, e = 1 === getCurrentPages().length;
        console.log("!!!!!!!!!!", s), this.globalData.wnds.Wnd_Home && !s && l && !e || (this.globalData.isFromCheckShare = !1), 
        l = !0;
    },
    onHide: function() {
        console.log("==============App Hide================"), o.FightRoom.CancelLeaveRoom();
    },
    getMenuButtonBoundingClientRect: function() {
        var i = this;
        wx.getSystemInfo({
            success: function(s) {
                i.globalData.StatusBar = s.statusBarHeight;
                var e = wx.getMenuButtonBoundingClientRect();
                i.globalData.Custom = e, i.globalData.CustomBar = e.bottom + e.top - s.statusBarHeight;
            }
        });
    },
    checkIsIPhoneX: function() {
        var i = this;
        wx.getSystemInfo({
            success: function(s) {
                -1 != s.model.search("iPhone X") && (i.globalData.isIPX = !0, console.log("机型是 iphone X"));
            }
        });
    },
    globalData: (t = {
        CURRENT_LEVELS: "CurrentLevels",
        userInfo: null,
        wh: q.getPhoneInfor().windowHeight,
        ww: q.getPhoneInfor().windowWidth,
        anims: g,
        wnds: {},
        LoginOK: !1,
        isFromShare: !1,
        RsaPubkey: "",
        pages: {
            Shopping: "dati_comm/pages/shopping/shoppingpage",
            Ranking: "pages/ranking/rankingPage",
            Classify: "pages/classify/classifyPage",
            FightOver: "pages/fightOver/fightOverPage",
            Home: "pages/index/index"
        },
        ColorList: [ {
            title: "搞笑",
            name: "red",
            color: "#e54d42",
            pinyin: "gao xiao"
        }, {
            title: "经典",
            name: "orange",
            color: "#f37b1d",
            pinyin: "jing dian"
        }, {
            title: "儿童",
            name: "yellow",
            color: "#fbbd08",
            pinyin: "er tong"
        }, {
            title: "整人",
            name: "olive",
            color: "#8dc63f",
            pinyin: "zheng ren"
        }, {
            title: "动物",
            name: "cyan",
            color: "#1cbbb4",
            pinyin: "dong wu"
        }, {
            title: "冷笑话",
            name: "blue",
            color: "#0081ff",
            pinyin: "lengxiaohua"
        }, {
            title: "字谜",
            name: "purple",
            color: "#6739b6",
            pinyin: "zi mi"
        }, {
            title: "灯谜",
            name: "mauve",
            color: "#9c26b0",
            pinyin: "deng mi"
        }, {
            title: "数学",
            name: "brown",
            color: "#a5673f",
            pinyin: "shu xue"
        }, {
            title: "无厘头",
            name: "black",
            color: "#333333",
            pinyin: "wu li tou"
        }, {
            title: "幽默",
            name: "white",
            color: "#ffffff",
            pinyin: "you mo"
        } ]
    }, i(t, "userInfo", null), i(t, "isIPX", !1), i(t, "levelSaveData", "puzzleLevelData"), 
    i(t, "gameSaveData", "gameSaveData"), i(t, "currentType", "currentType"), i(t, "puzzle_maxLevel", [ 0, 200, 200, 200, 200, 200, 200, 200 ]), 
    i(t, "maxLevel", 13), i(t, "levelup_addExp", 1), i(t, "levelup_addGold", 10), i(t, "levelUpdateLimited", [ 0, 10, 20, 30, 50, 80, 120, 160, 200, 250, 300, 350, 400, 0 ]), 
    i(t, "gradeTitleName", [ "", "书童", "童生", "秀才", "举人", "贡士", "翰林", "侍郎", "尚书", "大学士", "御史", "丞相", "太子少师", "太子太师" ]), 
    i(t, "answer_data_01", [ "彩", "虹", "哈", "镜", "太", "阳", "能", "雷", "电", "灯", "塔", "云", "嘴", "瓜", "子", "橄", "榄", "灯", "笼", "眼", "镜", "舞", "狮", "机", "关", "枪", "皮", "影", "戏", "盐", "胡", "琴", "月", "亮", "鸡", "毛", "掸", "非", "轿", "包", "砚", "多", "级", "火", "箭", "手", "指", "毛", "笔", "帆", "船", "蚊", "子", "生", "肖", "钓", "鱼", "秋", "千", "华", "野", "兔", "万", "香", "蕉", "布", "袋", "舞", "狮", "霜", "粽", "鲁", "皮", "军", "号", "针", "打", "喷", "嚏", "风", "扇", "雷", "太", "阳", "能", "水", "镜", "子", "米", "牙", "齿", "腰", "带", "橡", "皮", "降", "落", "伞", "石", "榴", "地", "球", "仪", "篷", "船", "彗", "星", "磨", "相", "鞋", "葡", "萄", "彩", "虹", "风", "蜡", "烛", "枕", "头", "雨", "伞", "做", "梦", "衣", "架", "电", "灯", "雷", "毛", "笔", "冲", "天", "炮", "温", "度", "计", "锯", "舌", "头", "雨", "伞", "养", "影", "灯", "塔", "枕", "头", "嘴", "唇", "冰", "凌", "螺", "丝", "钉", "豆", "腐", "毽", "手", "风", "琴", "月", "亮" ]), 
    i(t, "puzzle_data_01", [ {
        id: "1",
        tips: "打一字",
        question: "明星胜出有后台 ",
        answer: "唱"
    }, {
        id: "2",
        tips: "打一字",
        question: "不见他人传野闻 ",
        answer: "也"
    }, {
        id: "3",
        tips: "打一物",
        question: "一个胖小孩，坐着不起来，不怕天气冷，只怕晒太阳。 ",
        answer: "雪人"
    }, {
        id: "4",
        tips: "打一成语",
        question: "敖广昆仲居何处 ",
        answer: "四海为家"
    }, {
        id: "5",
        tips: "打一物",
        question: "指着你的脸，按住你的心，请你通知主人公，快快开门接客人。 ",
        answer: "门铃"
    }, {
        id: "6",
        tips: "打一字",
        question: "竹短草长入目来 ",
        answer: "算"
    }, {
        id: "7",
        tips: "打一字",
        question: "寺庙半隐人栖身 ",
        answer: "府"
    }, {
        id: "8",
        tips: "打一自然现象",
        question: "脚踏千江水，手捧路边沙，惊动林中鸟，落下满园花。 ",
        answer: "风"
    }, {
        id: "9",
        tips: "打一自然现象",
        question: "一根彩绸缎，挂在天门外，不是风吹去，只因太阳晒。 ",
        answer: "彩虹"
    }, {
        id: "10",
        tips: "打一字",
        question: "又回到村里 ",
        answer: "树"
    }, {
        id: "11",
        tips: "打一成语",
        question: "什 ",
        answer: "推心置腹"
    }, {
        id: "12",
        tips: "打一字",
        question: "俩人侍一主 ",
        answer: "往"
    }, {
        id: "13",
        tips: "打一科技产物",
        question: "是船不在水里游，跑到太空走一走，月亮上面做了客，嗖的一下回地球。 ",
        answer: "宇宙飞船"
    }, {
        id: "14",
        tips: "打一字",
        question: "短处一点一点摆出来 ",
        answer: "知"
    }, {
        id: "15",
        tips: "打一字",
        question: "上海中转 ",
        answer: "电"
    }, {
        id: "16",
        tips: "打一自然景观",
        question: "一片白花花，水帘山前挂，犹如倾盆雨，风景美如画。 ",
        answer: "瀑布"
    }, {
        id: "17",
        tips: "打一动物",
        question: "前腿短来后腿长，身穿皮装色土黄，蹦蹦跳跳田野上，又咬庄稼又偷粮。 ",
        answer: "野兔"
    }, {
        id: "18",
        tips: "打一字",
        question: "园中改革一无成 ",
        answer: "西"
    }, {
        id: "19",
        tips: "打一字",
        question: "须前取景拍照片 ",
        answer: "影"
    }, {
        id: "20",
        tips: "打一成语",
        question: "把话说开了 ",
        answer: "人声鼎沸"
    }, {
        id: "21",
        tips: "打一人体器官",
        question: "大的两节，小的三节，长长短短，二十八节。 ",
        answer: "手指"
    }, {
        id: "22",
        tips: "打一食物",
        question: "泥里生出来，磨里转出来，盖个四方印，挑到街上卖。 ",
        answer: "豆腐"
    }, {
        id: "23",
        tips: "打一成语",
        question: "我本谪仙人 ",
        answer: "自命不凡"
    }, {
        id: "24",
        tips: "打一字",
        question: "刚一接触就变坏 ",
        answer: "夕"
    }, {
        id: "25",
        tips: "打一字",
        question: "一个字，点点大，想摸它，把帽下。 ",
        answer: "头"
    }, {
        id: "26",
        tips: "打一成语",
        question: "拔河比赛 ",
        answer: "以退为进"
    }, {
        id: "27",
        tips: "打一成语",
        question: "水中贝 ",
        answer: "一触即溃"
    }, {
        id: "28",
        tips: "打一成语",
        question: "昨夜见军帖，木兰入东市。 ",
        answer: "招兵买马"
    }, {
        id: "29",
        tips: "打一物",
        question: "生在深山长在林，入了古洞烟火熏，三魂六魄上天去，剩下骨头卖给人。 ",
        answer: "木炭"
    }, {
        id: "30",
        tips: "打一字",
        question: "好好学，里面都有。 ",
        answer: "子"
    }, {
        id: "31",
        tips: "打一成语",
        question: "后妃为儿暗争斗 ",
        answer: "望子成龙"
    }, {
        id: "32",
        tips: "打一人体器官",
        question: "一家人口多，共住一个窝，先生小弟弟，后生大哥哥。 ",
        answer: "牙齿"
    }, {
        id: "33",
        tips: "打一成语",
        question: "十五块布做衣服 ",
        answer: "七拼八凑"
    }, {
        id: "34",
        tips: "打一成语",
        question: "用武力对付敌人 ",
        answer: "以文会友"
    }, {
        id: "35",
        tips: "打一字",
        question: "明日要去听音乐 ",
        answer: "月"
    }, {
        id: "36",
        tips: "打一食物",
        question: "绿衣裹身上，珍珠里面藏，要想得珍珠，解带扒衣裳。 ",
        answer: "粽子"
    }, {
        id: "37",
        tips: "打一生活物",
        question: "一只小铁猴，有嘴没有头，帮你搞卫生，咬脚又咬手。 ",
        answer: "指甲刀"
    }, {
        id: "38",
        tips: "打一成语",
        question: "王婆设计，金莲投毒。 ",
        answer: "大难不死"
    }, {
        id: "39",
        tips: "打一成语",
        question: "白娘子被禁 ",
        answer: "一语双关"
    }, {
        id: "40",
        tips: "打一字",
        question: "这一点前所未有 ",
        answer: "斥"
    }, {
        id: "41",
        tips: "打一字",
        question: "千古牵连一笔勾 ",
        answer: "乱"
    }, {
        id: "42",
        tips: "打一成语",
        question: "脐带 ",
        answer: "牵肠挂肚"
    }, {
        id: "43",
        tips: "打一物",
        question: "小姑娘，真伤心，只淌眼泪不出声。 ",
        answer: "蜡烛"
    }, {
        id: "44",
        tips: "打一文具",
        question: "一个矮矮人，穿的短短裙，走的弯弯路，说话细又明。 ",
        answer: "毛笔"
    }, {
        id: "45",
        tips: "打一成语",
        question: "谁失街亭危全军 ",
        answer: "害群之马"
    }, {
        id: "46",
        tips: "打一成语",
        question: "铁棒磨成针 ",
        answer: "大材小用"
    }, {
        id: "47",
        tips: "打一生活物",
        question: "有眼无珠一光棍，常常走进闺秀门，见的是美女红颜，穿的是绫罗绸缎。 ",
        answer: "缝衣针"
    }, {
        id: "48",
        tips: "打一字",
        question: "一个字，真稀奇，池中没有水，地上没有泥。 ",
        answer: "也"
    }, {
        id: "49",
        tips: "打一字",
        question: "一一补足就对了 ",
        answer: "是"
    }, {
        id: "50",
        tips: "打一字",
        question: "一笔抹杀 ",
        answer: "禾"
    }, {
        id: "51",
        tips: "打一成语",
        question: "画地为牢 ",
        answer: "固步自封"
    }, {
        id: "52",
        tips: "打一成语",
        question: "决策人士昏昏然 ",
        answer: "当局者迷"
    }, {
        id: "53",
        tips: "打一成语",
        question: "仙人掌 ",
        answer: "身手不凡"
    }, {
        id: "54",
        tips: "打一成语",
        question: "书中自有黄金屋 ",
        answer: "一本万利"
    }, {
        id: "55",
        tips: "打一字",
        question: "雨润横山妆素颜 ",
        answer: "雪"
    }, {
        id: "56",
        tips: "打一成语",
        question: "百分不及十分强 ",
        answer: "尺短寸长"
    }, {
        id: "57",
        tips: "打一玩具",
        question: "一位姑娘好苗条，头重脚轻身子摇，两个耳坠左右甩，敲在脸上咚咚叫。 ",
        answer: "拨浪鼓"
    }, {
        id: "58",
        tips: "打一体育活动",
        question: "两岸人马一般多，拉拉扯扯一条索，后退的，心中乐，前进的，莫奈何。 ",
        answer: "拔河"
    }, {
        id: "59",
        tips: "打一字",
        question: "集中一点 ",
        answer: "虫"
    }, {
        id: "60",
        tips: "打一成语",
        question: "沃野千里禁驱驰 ",
        answer: "田忌赛马"
    }, {
        id: "61",
        tips: "打一字",
        question: "数数算算，不止几千，再添一点，它就不圆。 ",
        answer: "万"
    }, {
        id: "62",
        tips: "打一成语",
        question: "五句话 ",
        answer: "三言两语"
    }, {
        id: "63",
        tips: "打一成语",
        question: "又长胖了，真烦！ ",
        answer: "肥头大耳"
    }, {
        id: "64",
        tips: "打一字",
        question: "晚去一天 ",
        answer: "免"
    }, {
        id: "65",
        tips: "打一成语",
        question: "头脑简单，四肢发达 ",
        answer: "无能为力"
    }, {
        id: "66",
        tips: "打一字",
        question: "改变旧貌争第一 ",
        answer: "甲"
    }, {
        id: "67",
        tips: "打一成语",
        question: "弯腰接电话 ",
        answer: "俯首帖耳"
    }, {
        id: "68",
        tips: "打一成语",
        question: "圭 ",
        answer: "西装革履"
    }, {
        id: "69",
        tips: "打一物",
        question: "两头尖尖白如银，世上无我难做人，但得有人猜着我，要算世上聪明人。 ",
        answer: "米"
    }, {
        id: "70",
        tips: "打一日常用品",
        question: "头脚上长头发，清早起来满地爬。 ",
        answer: "扫把"
    }, {
        id: "71",
        tips: "打一成语",
        question: "更 ",
        answer: "与人方便"
    }, {
        id: "72",
        tips: "打一自然物",
        question: "好吃没滋味，脏了不能洗，掉到地面上，再也拿不起。 ",
        answer: "水"
    }, {
        id: "73",
        tips: "打一成语",
        question: "绑票 ",
        answer: "令人费解"
    }, {
        id: "74",
        tips: "打一物",
        question: "叫针不是针，像表不是表，千里去旅游，它是好向导。 ",
        answer: "指南针"
    }, {
        id: "75",
        tips: "打一成语",
        question: "不杀高俅誓不休 ",
        answer: "冲口而出"
    }, {
        id: "76",
        tips: "打一成语",
        question: "真想要 ",
        answer: "不假思索"
    }, {
        id: "77",
        tips: "打一字",
        question: "一点一点学 ",
        answer: "字"
    }, {
        id: "78",
        tips: "打一常见物",
        question: "高大汉，扁扁身，走路光用脚后跟。 ",
        answer: "门"
    }, {
        id: "79",
        tips: "打一字",
        question: "坐月子坐成个胖子 ",
        answer: "半"
    }, {
        id: "80",
        tips: "打一字",
        question: "站在前边，想在后边，说在中间，藏在脑间 ",
        answer: "意"
    }, {
        id: "81",
        tips: "打一成语",
        question: "期市",
        answer: "撕心裂肺"
    }, {
        id: "82",
        tips: "打一成语",
        question: "出外节约 ",
        answer: "在所不惜"
    }, {
        id: "83",
        tips: "打一字",
        question: "方寸有一点点乱 ",
        answer: "河"
    }, {
        id: "84",
        tips: "打一字",
        question: "有心表态 ",
        answer: "太"
    }, {
        id: "85",
        tips: "打一干果",
        question: "红灯笼，挂高楼，刮刮风，点点头。 ",
        answer: "红枣"
    }, {
        id: "86",
        tips: "打一成语",
        question: "互送秋波 ",
        answer: "以眼还眼"
    }, {
        id: "87",
        tips: "打一成语",
        question: "看喜剧从不吝啬",
        answer: "见笑大方"
    }, {
        id: "88",
        tips: "打一字",
        question: "争先恐后去当头 ",
        answer: "急"
    }, {
        id: "89",
        tips: "打一字",
        question: "我有一物分两旁，一旁好吃一旁香，一旁眉山去吃草，一旁岷江把身藏。 ",
        answer: "鲜"
    }, {
        id: "90",
        tips: "打一天文现象",
        question: "早餐有，中餐无，晚餐有，夜宵无。 ",
        answer: "日食"
    }, {
        id: "91",
        tips: "打一字",
        question: "不见点点秋意存 ",
        answer: "钻"
    }, {
        id: "92",
        tips: "打一成语",
        question: "二字作何解 ",
        answer: "如释重负"
    }, {
        id: "93",
        tips: "打一人体器官",
        question: "一对烟囱真稀奇，不冲天空冲着地；夏天不冒半点烟，冬天老是喷白气！ ",
        answer: "鼻子"
    }, {
        id: "94",
        tips: "打一常见物",
        question: "大似西瓜，轻似鸿毛，不生翅翼，倒会飞跑。 ",
        answer: "气球"
    }, {
        id: "95",
        tips: "打一成语",
        question: "随地吐痰害处大 ",
        answer: "感人肺腑"
    }, {
        id: "96",
        tips: "打一字",
        question: "一时半刻 ",
        answer: "孩"
    }, {
        id: "97",
        tips: "打一字",
        question: "只差两点到黄昏 ",
        answer: "名"
    }, {
        id: "98",
        tips: "打一成语",
        question: "儿童图书专柜 ",
        answer: "小本经营"
    }, {
        id: "99",
        tips: "打一成语",
        question: "牛马 ",
        answer: "虎头蛇尾"
    }, {
        id: "100",
        tips: "打一字",
        question: "一加一不等于二，你加一点你当家。 ",
        answer: "王"
    }, {
        id: "101",
        tips: "打一字",
        question: "断一半，接一半。连起来，还是断。 ",
        answer: "折"
    }, {
        id: "102",
        tips: "打一成语",
        question: "动物作标本 ",
        answer: "装模作样"
    }, {
        id: "103",
        tips: "打一物",
        question: "远望一个潭，白龙在内盘，红龙直窜起，青龙直上天。 ",
        answer: "灯盏"
    }, {
        id: "104",
        tips: "打一成语",
        question: "西瓜地里散步 ",
        answer: "左右逢源"
    }, {
        id: "105",
        tips: "打一字",
        question: "哥俩同在照片中，模样有别声音同。一个反应不灵敏，一个眼睛亮晶晶。 ",
        answer: "相"
    }, {
        id: "106",
        tips: "打一字",
        question: "人一去就是三个星期 ",
        answer: "借"
    }, {
        id: "107",
        tips: "打一游戏用具",
        question: "上山砍木搭架来，威风凛凛上高台，有人问我前世事，摇头晃脑走出来。 ",
        answer: "秋千"
    }, {
        id: "108",
        tips: "打一成语",
        question: "为何少三点 ",
        answer: "一盘散沙"
    }, {
        id: "109",
        tips: "打一字",
        question: "线切割加工 ",
        answer: "红"
    }, {
        id: "110",
        tips: "打一自然物",
        question: "白玉盘，圆又圆，青色板上滚一晚。 ",
        answer: "月亮"
    }, {
        id: "111",
        tips: "打一成语",
        question: "皇帝诏曰 ",
        answer: "照本宣科"
    }, {
        id: "112",
        tips: "打一文具",
        question: "姐妹两个感情好，一个站着，一个跑。 ",
        answer: "圆规"
    }, {
        id: "113",
        tips: "打一成语",
        question: "打针时不要分心 ",
        answer: "全神贯注"
    }, {
        id: "114",
        tips: "打一生活物",
        question: "弯弯曲曲一捆柴，放在家中等客来，迎得客来又客往，无论老少扑满杯。 ",
        answer: "衣架"
    }, {
        id: "115",
        tips: "打一自然现象",
        question: "虽然叫河在天上，不见水来只见光，就是吹来十级风，不兴波涛不起浪。 ",
        answer: "银河"
    }, {
        id: "116",
        tips: "打一字",
        question: "这个变化真不小 ",
        answer: "大"
    }, {
        id: "117",
        tips: "打一成语",
        question: "忽闻老板发癫狂 ",
        answer: "东风过耳"
    }, {
        id: "118",
        tips: "打一字",
        question: "前头我上得第一 ",
        answer: "首"
    }, {
        id: "119",
        tips: "打一字",
        question: "千字插中间，北字分两边。 ",
        answer: "乖"
    }, {
        id: "120",
        tips: "打一成语",
        question: "脊梁冒汗人惊悚 ",
        answer: "背水一战"
    }, {
        id: "121",
        tips: "打一成语",
        question: "发票未盖章 ",
        answer: "不足为凭"
    }, {
        id: "122",
        tips: "打一成语",
        question: "口字别解 ",
        answer: "回心转意"
    }, {
        id: "123",
        tips: "打一动物",
        question: "小小个子难发现，嗡嗡飞来舔一舔。 ",
        answer: "蚊子"
    }, {
        id: "124",
        tips: "打一现象",
        question: "忽然心中起，等他又不来，绣花姑娘停针起，读书公子笔下呆。 ",
        answer: "打喷嚏"
    }, {
        id: "125",
        tips: "打一自然物",
        question: "风吹皮皱，雨打开花，食虽无味，少不了它。 ",
        answer: "水"
    }, {
        id: "126",
        tips: "打一成语",
        question: "酉时狗吠扰人心 ",
        answer: "鸡犬不宁"
    }, {
        id: "127",
        tips: "打一文具",
        question: "竹家娘子细细腰，脚跟生来都是毛，做起事来脱衣裳，走起路来扭又绕。 ",
        answer: "毛笔"
    }, {
        id: "128",
        tips: "打一字",
        question: "宣传绿化 ",
        answer: "请"
    }, {
        id: "129",
        tips: "打一常见物",
        question: "远看像座亭，近看没窗棂，上边直流水，下边有人行。 ",
        answer: "雨伞"
    }, {
        id: "130",
        tips: "打一字",
        question: "两个合一起，猜竹不可以，要问为什么，我来告诉你。 ",
        answer: "答"
    }, {
        id: "131",
        tips: "打一字",
        question: "两点有人来 ",
        answer: "火"
    }, {
        id: "132",
        tips: "打一字",
        question: "为父期盼终是严 ",
        answer: "爸"
    }, {
        id: "133",
        tips: "打一成语",
        question: "绝望！ ",
        answer: "叹为观止"
    }, {
        id: "134",
        tips: "打一水果",
        question: "黄包袱，包冷饭，又好吃，又好看。 ",
        answer: "石榴"
    }, {
        id: "135",
        tips: "打一字",
        question: "大计划小变动 ",
        answer: "读"
    }, {
        id: "136",
        tips: "打一字",
        question: "一一难舍手足情 ",
        answer: "提"
    }, {
        id: "137",
        tips: "打一字",
        question: "里面是大的，外面是方的。 ",
        answer: "因"
    }, {
        id: "138",
        tips: "打一生活物",
        question: "远看一座城，近看不像城，只闻脚步声，不见人出城。 ",
        answer: "钟"
    }, {
        id: "139",
        tips: "打一成语",
        question: "姓氏名号都已报 ",
        answer: "只字不提"
    }, {
        id: "140",
        tips: "打一字",
        question: "边谈边品可赏心 ",
        answer: "语"
    }, {
        id: "141",
        tips: "打一成语",
        question: "比干抗议受非刑 ",
        answer: "有口无心"
    }, {
        id: "142",
        tips: "打一成语",
        question: "克夫 ",
        answer: "嫁祸于人"
    }, {
        id: "143",
        tips: "打一字",
        question: "只对一半 ",
        answer: "叹"
    }, {
        id: "144",
        tips: "打一成语",
        question: "楚辞 ",
        answer: "不欢而散"
    }, {
        id: "145",
        tips: "打一成语",
        question: "瑞气升腾罩金乌 ",
        answer: "蒸蒸日上"
    }, {
        id: "146",
        tips: "打一成语",
        question: "浪子骂皇帝",
        answer: "青云直上"
    }, {
        id: "147",
        tips: "打一成语",
        question: "沉鱼落雁 ",
        answer: "杳无音信"
    }, {
        id: "148",
        tips: "打一成语",
        question: "发夹 ",
        answer: "丝丝入扣"
    }, {
        id: "149",
        tips: "打一字",
        question: "堆土为坟 ",
        answer: "文"
    }, {
        id: "150",
        tips: "打一成语",
        question: "谋董贼孟德献刀 ",
        answer: "操戈入室"
    }, {
        id: "151",
        tips: "打一字",
        question: "站在树梢上 ",
        answer: "亲"
    }, {
        id: "152",
        tips: "打一自然物",
        question: "摇荡海中水，扫落园中花，走遍普天下，不能见到它。 ",
        answer: "风"
    }, {
        id: "153",
        tips: "打一成语",
        question: "恰似美人浴 ",
        answer: "如鱼得水"
    }, {
        id: "154",
        tips: "打一乐器",
        question: "头出三个角，背缚三根索，屁股头弹得花绿绿。 ",
        answer: "三弦"
    }, {
        id: "155",
        tips: "打一字",
        question: "讲话算数 ",
        answer: "说"
    }, {
        id: "156",
        tips: "打一成语",
        question: "老巷幻影 ",
        answer: "故弄玄虚"
    }, {
        id: "157",
        tips: "打一行为",
        question: "乌江里面白浪翻，一条白龙下江来，硬棒棒进去，软皮皮出来。 ",
        answer: "做面条"
    }, {
        id: "158",
        tips: "打一字",
        question: "国有家没有，哥有弟没有，唱有跳也有，说有读没有。 ",
        answer: "口"
    }, {
        id: "159",
        tips: "打一成语",
        question: "未成年人莫参观 ",
        answer: "不可小觑"
    }, {
        id: "160",
        tips: "打一字",
        question: "东风添翼 ",
        answer: "飞"
    }, {
        id: "161",
        tips: "打一成语",
        question: "两点尚差十五分 ",
        answer: "一时三刻"
    }, {
        id: "162",
        tips: "打一字",
        question: "车一进三 ",
        answer: "阵"
    }, {
        id: "163",
        tips: "打一交通工具",
        question: "远看像张弓，近看两头通，不怕下大雨，只怕鬼头风。 ",
        answer: "篷船"
    }, {
        id: "164",
        tips: "打一人体器官",
        question: "一堵红墙两头窄，能够从中两分开，红墙启合话声来，你说奇怪不奇怪。 ",
        answer: "嘴唇"
    }, {
        id: "165",
        tips: "打一字",
        question: "氧化氢 ",
        answer: "泉"
    }, {
        id: "166",
        tips: "打一娱乐设施",
        question: "远看像高坡，近看像楼阁；上坡慢慢走，下坡快如梭。 ",
        answer: "滑梯"
    }, {
        id: "167",
        tips: "打一成语",
        question: "谁解莺莺一片情 ",
        answer: "生而知之"
    }, {
        id: "168",
        tips: "打一字",
        question: "老爸的意思是小心没有错 ",
        answer: "父"
    }, {
        id: "169",
        tips: "打一成语",
        question: "上课从不歪身坐 ",
        answer: "堂堂正正"
    }, {
        id: "170",
        tips: "打一成语",
        question: "唐僧坐骑姿雄健 ",
        answer: "龙马精神"
    }, {
        id: "171",
        tips: "打一成语",
        question: "副职只干副职事 ",
        answer: "不务正业"
    }, {
        id: "172",
        tips: "打一字",
        question: "垂头坐下没心思 ",
        answer: "重"
    }, {
        id: "173",
        tips: "打一字",
        question: "凑满一百万 ",
        answer: "跳"
    }, {
        id: "174",
        tips: "打一成语",
        question: "成年 ",
        answer: "日积月累"
    }, {
        id: "175",
        tips: "打一成语",
        question: "曹冲称大象，吴王索鱼肠。 ",
        answer: "刻舟求剑"
    }, {
        id: "176",
        tips: "打一食物",
        question: "乍看像鱼汤，细看像豆浆，非汤又非浆，喝起格外香。 ",
        answer: "牛奶"
    }, {
        id: "177",
        tips: "打一成语",
        question: "喜获双胞胎 ",
        answer: "一举两得"
    }, {
        id: "178",
        tips: "打一成语",
        question: "酒香不怕巷子深",
        answer: "气味相投"
    }, {
        id: "179",
        tips: "打一成语",
        question: "浮 ",
        answer: "水乳交融"
    }, {
        id: "180",
        tips: "打一乐器",
        question: "肚大腰圆腹中空，脸皮厚厚爱紧绷，别看胸中无点墨，说起话来咚咚咚。 ",
        answer: "鼓"
    }, {
        id: "181",
        tips: "打一武器",
        question: "头戴三角铁，身穿鸠鸡衣，幸亏弦大哥，送出月牙城。 ",
        answer: "箭"
    }, {
        id: "182",
        tips: "打一字",
        question: "个个生得笨 ",
        answer: "本"
    }, {
        id: "183",
        tips: "打一字",
        question: "样子难看，扭头就走。 ",
        answer: "丑"
    }, {
        id: "184",
        tips: "打一自然现象",
        question: "生来无形，走动便有声，夏天无它热，冬天有它冷。 ",
        answer: "风"
    }, {
        id: "185",
        tips: "打一自然物",
        question: "生无骨头死无踪，又无骨头又无形，穿城过街它能走，绣花楼中它也行。 ",
        answer: "风"
    }, {
        id: "186",
        tips: "打一字",
        question: "仇人已除 ",
        answer: "九"
    }, {
        id: "187",
        tips: "打一成语",
        question: "一枝红杏出墙来 ",
        answer: "漏泄春光"
    }, {
        id: "188",
        tips: "打一文具",
        question: "一个小石潭，满池烂泥巴，飞来白天鹅，变成黑乌鸦。 ",
        answer: "砚台"
    }, {
        id: "189",
        tips: "打一成语",
        question: "战场 ",
        answer: "用武之地"
    }, {
        id: "190",
        tips: "打一成语",
        question: "美猴王龙宫得宝。 ",
        answer: "大海捞针"
    }, {
        id: "191",
        tips: "打一字",
        question: "汉奸改装尽奴相 ",
        answer: "汗"
    }, {
        id: "192",
        tips: "打一动物",
        question: "身穿绿衣裳，家住百花庄，通宵叫不停，人人喊它娘。 ",
        answer: "纺织娘"
    }, {
        id: "193",
        tips: "打一成语",
        question: "临走没有讲清楚 ",
        answer: "含糊其辞"
    }, {
        id: "194",
        tips: "打一成语",
        question: "姑苏烟雨锁苍茫 ",
        answer: "吴下阿蒙"
    }, {
        id: "195",
        tips: "打一字",
        question: "单骑救阿斗 ",
        answer: "动"
    }, {
        id: "196",
        tips: "打一字",
        question: "逐一匹配，双双成功。 ",
        answer: "四"
    }, {
        id: "197",
        tips: "打一生活物",
        question: "上不到天，下不到地，中间有人立。 ",
        answer: "伞"
    }, {
        id: "198",
        tips: "打一字",
        question: "传失其人 ",
        answer: "专"
    }, {
        id: "199",
        tips: "打一成语",
        question: "宦官 ",
        answer: "大势已去"
    }, {
        id: "200",
        tips: "打一字",
        question: "家中着火猪走失 ",
        answer: "灾"
    } ]), i(t, "answer_data_02", [ "彩", "虹", "哈", "镜", "太", "阳", "能", "雷", "电", "灯", "塔", "云", "嘴", "瓜", "子", "橄", "榄", "灯", "笼", "眼", "镜", "舞", "狮", "机", "关", "枪", "皮", "影", "戏", "盐", "胡", "琴", "月", "亮", "鸡", "毛", "掸", "非", "轿", "包", "砚", "多", "级", "火", "箭", "手", "指", "毛", "笔", "帆", "船", "蚊", "子", "生", "肖", "钓", "鱼", "秋", "千", "华", "野", "兔", "万", "香", "蕉", "布", "袋", "舞", "狮", "霜", "粽", "鲁", "皮", "军", "号", "针", "打", "喷", "嚏", "风", "扇", "雷", "太", "阳", "能", "水", "镜", "子", "米", "牙", "齿", "腰", "带", "橡", "皮", "降", "落", "伞", "石", "榴", "地", "球", "仪", "篷", "船", "彗", "星", "磨", "相", "鞋", "葡", "萄", "彩", "虹", "风", "蜡", "烛", "枕", "头", "雨", "伞", "做", "梦", "衣", "架", "电", "灯", "雷", "毛", "笔", "冲", "天", "炮", "温", "度", "计", "锯", "舌", "头", "雨", "伞", "养", "影", "灯", "塔", "枕", "头", "嘴", "唇", "冰", "凌", "螺", "丝", "钉", "豆", "腐", "毽", "手", "风", "琴", "月", "亮" ]), 
    i(t, "puzzle_data_02", [ {
        id: "201",
        tips: "打一字",
        question: "人结同心留个影 ",
        answer: "答"
    }, {
        id: "202",
        tips: "打一字",
        question: "一点兴奋 ",
        answer: "几"
    }, {
        id: "203",
        tips: "打一文具",
        question: "生就一张圆圆嘴，光啃木头不喝水，娃娃写字常请它，请它出来啃几嘴。 ",
        answer: "刨笔刀"
    }, {
        id: "204",
        tips: "打一成语",
        question: "礼单",
        answer: "世情如纸"
    }, {
        id: "205",
        tips: "打一字",
        question: "和尚身上一条巾 ",
        answer: "常"
    }, {
        id: "206",
        tips: "打一成语",
        question: "阎罗王 ",
        answer: "鬼头鬼脑"
    }, {
        id: "207",
        tips: "打一自然现象",
        question: "你走它就走，你站它就站，青天陪你玩，阴天看不见。 ",
        answer: "影子"
    }, {
        id: "208",
        tips: "打一成语",
        question: "翼德粗心后人传 ",
        answer: "飞短流长"
    }, {
        id: "209",
        tips: "打一成语",
        question: "川字变卅字 ",
        answer: "一以贯之"
    }, {
        id: "210",
        tips: "打一成语",
        question: "席地等周公 ",
        answer: "坐以待旦"
    }, {
        id: "211",
        tips: "打一日常用品",
        question: "赛场像个盘，三人跑得欢，矮子走一步，长子走一圈。 ",
        answer: "钟表"
    }, {
        id: "212",
        tips: "打一字",
        question: "两人闯入七星阵 ",
        answer: "淡"
    }, {
        id: "213",
        tips: "打一成语",
        question: "翼德逞凶招杀身 ",
        answer: "飞来横祸"
    }, {
        id: "214",
        tips: "打一成语",
        question: "《石头记》中写袭人 ",
        answer: "梦笔生花"
    }, {
        id: "215",
        tips: "打一自然物",
        question: "对门山上有株草，草上珍珠结不少，小妹拿来用线穿，金线银线穿不了。 ",
        answer: "露水"
    }, {
        id: "216",
        tips: "打一成语",
        question: "不扫房屋，不叠床被，不听啰嗦，不会下跪，不看脸色，不用俱内。 ",
        answer: "自成一家"
    }, {
        id: "217",
        tips: "打一成语",
        question: "第一个挂彩 ",
        answer: "头破血流"
    }, {
        id: "218",
        tips: "打一字",
        question: "弟子刚先走 ",
        answer: "倒"
    }, {
        id: "219",
        tips: "打一成语",
        question: "八月秋高风怒号 ",
        answer: "虎虎有生气"
    }, {
        id: "220",
        tips: "打一字",
        question: "左边加一半，右边减一半。 ",
        answer: "喊"
    }, {
        id: "221",
        tips: "打一生理现象",
        question: "翻山越岭脚不移，吃饭吃肉肚中饥，读书唱歌没声音，下雨下雪不湿衣 ",
        answer: "做梦"
    }, {
        id: "222",
        tips: "打一成语",
        question: "文举必能全悟透 ",
        answer: "融会贯通"
    }, {
        id: "223",
        tips: "打一字",
        question: "一赊再赊知多少 ",
        answer: "欺"
    }, {
        id: "224",
        tips: "打一物",
        question: "一个胖娃白生生，坐在雪地不吱声，不怕冻来不怕冷，只怕红红太阳升。 ",
        answer: "雪人"
    }, {
        id: "225",
        tips: "打一生活物",
        question: "姐儿两个一般大，穿了一身绣花褂，擦了多少油和粉，听了不少私房话。 ",
        answer: "枕头"
    }, {
        id: "226",
        tips: "打一字",
        question: "两树之间 ",
        answer: "双"
    }, {
        id: "227",
        tips: "打一自然物",
        question: "像烟不是烟，布满天地间，太阳一出来，赶快都逃散 ",
        answer: "雾"
    }, {
        id: "228",
        tips: "打一乐器",
        question: "既要用脚踩，还要用手摸，面上用力按，肚里会唱歌。 ",
        answer: "风琴"
    }, {
        id: "229",
        tips: "打一自然物",
        question: "乍看白茫茫，细看有河床，没有鱼儿游，不见船来往。 ",
        answer: "银河"
    }, {
        id: "230",
        tips: "打一玩具",
        question: "看翎毛生得有限，身上带两个铜钱，你叫我跳上跳下，我叫你跑后跑前。 ",
        answer: "毽子"
    }, {
        id: "231",
        tips: "打一物",
        question: "长得像表不是表，问它时间不知道。谁要进山钻森林，不戴上它不得了。 ",
        answer: "指南针"
    }, {
        id: "232",
        tips: "打一成语",
        question: "飞机灭火",
        answer: "上行下效"
    }, {
        id: "233",
        tips: "打一字",
        question: "携手共言誓 ",
        answer: "斤"
    }, {
        id: "234",
        tips: "打一成语",
        question: "祖籍罗马 ",
        answer: "小本生意"
    }, {
        id: "235",
        tips: "打一文具",
        question: "年轻头发白，年老黑油油，睡觉常戴帽，著书扶它走。 ",
        answer: "毛笔"
    }, {
        id: "236",
        tips: "打一成语",
        question: "竹林七贤皆醉酒 ",
        answer: "颠三倒四"
    }, {
        id: "237",
        tips: "打一成语",
        question: "木偶戏 ",
        answer: "装腔作势"
    }, {
        id: "238",
        tips: "打一字",
        question: "湖光水月西施女 ",
        answer: "姑"
    }, {
        id: "239",
        tips: "打一成语",
        question: "元首 ",
        answer: "始终如一"
    }, {
        id: "240",
        tips: "打一自然物",
        question: "来自江河海，天空任浮载，白脸转黑脸，眼泪便出来。 ",
        answer: "云"
    }, {
        id: "241",
        tips: "打一字",
        question: "看看两角零钱，闻闻芳香一片。 ",
        answer: "芬"
    }, {
        id: "242",
        tips: "打一食物",
        question: "金枝玉叶山上飘，流落人间冷水浇，仅仅为了一把米，被人绳索捆在腰。 ",
        answer: "粽子"
    }, {
        id: "243",
        tips: "打一字",
        question: "加一横在天上，加二横在脸上。 ",
        answer: "口"
    }, {
        id: "244",
        tips: "打一食物",
        question: "四角尖尖，中央围腰，相牵相伴落水死，起来脱衣裳。 ",
        answer: "粽子"
    }, {
        id: "245",
        tips: "打一生活物",
        question: "两个口袋里，不装麦和米，十个小兄弟，五个住一起。 ",
        answer: "手套"
    }, {
        id: "246",
        tips: "打一字",
        question: "加劲劳动，个个有份 ",
        answer: "力"
    }, {
        id: "247",
        tips: "打一字",
        question: "一点配方 ",
        answer: "万"
    }, {
        id: "248",
        tips: "打一成语",
        question: "大哥二爸三太爷 ",
        answer: "论资排辈"
    }, {
        id: "249",
        tips: "打一成语",
        question: "狂风摧花空自恶",
        answer: "气急败坏"
    }, {
        id: "250",
        tips: "打一物",
        question: "小小零件人人夸，哪里需要哪安家，一个心眼为集体，多种机器都有它。 ",
        answer: "螺丝钉"
    }, {
        id: "251",
        tips: "打一字",
        question: "献点爱心得后福 ",
        answer: "富"
    }, {
        id: "252",
        tips: "打一军事武器",
        question: "一出娘胎就会飞，无毛无翼快难追，它往敌人身上钻，敌人倒地它不归。 ",
        answer: "子弹"
    }, {
        id: "253",
        tips: "打一字",
        question: "猜得出色必封侯 ",
        answer: "猴"
    }, {
        id: "254",
        tips: "打一字",
        question: "一周多三天 ",
        answer: "早"
    }, {
        id: "255",
        tips: "打一字",
        question: "少夫人去堂后 ",
        answer: "坛"
    }, {
        id: "256",
        tips: "打一字",
        question: "安排貂蝉诱吕布 ",
        answer: "宫"
    }, {
        id: "257",
        tips: "打一数字",
        question: "两只蚂蚁，顶个木棍，一只蚂蚁，站在上面。 ",
        answer: "六"
    }, {
        id: "258",
        tips: "打一成语",
        question: "两个号吹成一个调 ",
        answer: "异口同声"
    }, {
        id: "259",
        tips: "打一字",
        question: "这边多一半，那边补一半；要想猜着它，莫在里面转。 ",
        answer: "外"
    }, {
        id: "260",
        tips: "打一字",
        question: "猴年有雄心 ",
        answer: "伸"
    }, {
        id: "261",
        tips: "打一自然物",
        question: "散步在小溪，睡觉在池塘。奔跑在江河，咆哮在海洋。 ",
        answer: "水"
    }, {
        id: "262",
        tips: "打一科技物",
        question: "身体长长分几节，燃料提炼很特别，运载工具它第一，飞向太空不停歇。 ",
        answer: "多级火箭"
    }, {
        id: "263",
        tips: "打一字",
        question: "秧田长草没田禾 ",
        answer: "英"
    }, {
        id: "264",
        tips: "打一自然物",
        question: "天冷才出来，白毯到处盖，不怕风儿吹，只怕太阳晒。 ",
        answer: "霜"
    }, {
        id: "265",
        tips: "打一字",
        question: "少点主见 ",
        answer: "现"
    }, {
        id: "266",
        tips: "打一生活物",
        question: "长尾铁船木舵，装着红粮杂货，快过快过快过，不过就要惹祸。 ",
        answer: "熨斗"
    }, {
        id: "267",
        tips: "打一成语",
        question: "说得到，做得到。 ",
        answer: "言之有理"
    }, {
        id: "268",
        tips: "打一成语",
        question: "酒肉穿肠过",
        answer: "食而不化"
    }, {
        id: "269",
        tips: "打一字",
        question: "土生土长西安女 ",
        answer: "娃"
    }, {
        id: "270",
        tips: "打一字",
        question: "打乱笔画巧安排 ",
        answer: "克"
    }, {
        id: "271",
        tips: "打一成语",
        question: "兴霸伏首愿认输 ",
        answer: "甘拜下风"
    }, {
        id: "272",
        tips: "打一成语",
        question: "丈人但安坐 ",
        answer: "稳如泰山"
    }, {
        id: "273",
        tips: "打一成语",
        question: "慢行有好处 ",
        answer: "欲速则不达"
    }, {
        id: "274",
        tips: "打一工具",
        question: "四面四堵墙，圈猪不圈羊。 ",
        answer: "算盘"
    }, {
        id: "275",
        tips: "打一字",
        question: "假骨文 ",
        answer: "故"
    }, {
        id: "276",
        tips: "打一成语",
        question: "向来不曾制谜 ",
        answer: "素未谋面"
    }, {
        id: "277",
        tips: "打一生活物",
        question: "害了相思病，身体瘦如柴，巴得团圆日，不觉泪满腮。 ",
        answer: "雨伞"
    }, {
        id: "278",
        tips: "打一成语",
        question: "凭君传语报平安 ",
        answer: "言而无信"
    }, {
        id: "279",
        tips: "打一成语",
        question: "插翅虎挡路行劫",
        answer: "横行霸道"
    }, {
        id: "280",
        tips: "打一传统艺术",
        question: "穿红戴绿是神仙，有膀有腿是神仙，有口却不会说话，借人家金口玉言。 ",
        answer: "皮影戏"
    }, {
        id: "281",
        tips: "打一成语",
        question: "夏后便是农忙时 ",
        answer: "多事之秋"
    }, {
        id: "282",
        tips: "打一字",
        question: "抛开个人，上下一心。 ",
        answer: "志"
    }, {
        id: "283",
        tips: "打一物",
        question: "有眼无珠一身光，穿红穿绿又穿黄，跟着懒妇他睡觉，跟着勤妇分外忙。 ",
        answer: "针"
    }, {
        id: "284",
        tips: "打一生活物",
        question: "头尖尖，尾圆圆，游过多少好花园，穿过多少绫罗缎。 ",
        answer: "针"
    }, {
        id: "285",
        tips: "打一字",
        question: "一一称是 ",
        answer: "足"
    }, {
        id: "286",
        tips: "打一成语",
        question: "微躯敢一言 ",
        answer: "小人当道"
    }, {
        id: "287",
        tips: "打一成语",
        question: "精神托于箕尾 ",
        answer: "在天之灵"
    }, {
        id: "288",
        tips: "打一字",
        question: "一住京中三十载 ",
        answer: "草"
    }, {
        id: "289",
        tips: "打一成语",
        question: "遥望文君展才智 ",
        answer: "远见卓识"
    }, {
        id: "290",
        tips: "打一字",
        question: "心上犯怵 ",
        answer: "术"
    }, {
        id: "291",
        tips: "打一生活物",
        question: "一物三餐陪着我，它吃饱了我正饿，我吃饱了它肚空，乖乖巧巧回房坐。 ",
        answer: "碗"
    }, {
        id: "292",
        tips: "打一字",
        question: "江河横溢 ",
        answer: "泼"
    }, {
        id: "293",
        tips: "打一成语",
        question: "乘人不备扭头走 ",
        answer: "出乖露丑"
    }, {
        id: "294",
        tips: "打一动物",
        question: "眼睛大脑袋小，身上穿件大绿袄，手拿两把大镰刀，只斩害虫不割草。 ",
        answer: "螳螂"
    }, {
        id: "295",
        tips: "打一成语",
        question: "架起天线，图像清晰。 ",
        answer: "立竿见影"
    }, {
        id: "296",
        tips: "打一成语",
        question: "新构铜雀图藏娇 ",
        answer: "迁乔之望"
    }, {
        id: "297",
        tips: "打一成语",
        question: "玉帝露面阎王隐身 ",
        answer: "神出鬼没"
    }, {
        id: "298",
        tips: "打一字",
        question: "用人纳言总不疑 ",
        answer: "信"
    }, {
        id: "299",
        tips: "打一成语",
        question: "拍马屁拍到马腿上 ",
        answer: "眼高手低"
    }, {
        id: "300",
        tips: "打一成语",
        question: "谜底破后恨其烂 ",
        answer: "中气不足"
    }, {
        id: "301",
        tips: "打一交通工具",
        question: "有人说我像老鹰，有人说我像蜻蜓；请你到我肚里来，带你飞到北京城。 ",
        answer: "飞机"
    }, {
        id: "302",
        tips: "打一字",
        question: "人残心不残 ",
        answer: "必"
    }, {
        id: "303",
        tips: "打一成语",
        question: "林妹妹葬花，楚卞和泣璧。 ",
        answer: "怜香惜玉"
    }, {
        id: "304",
        tips: "打一工具",
        question: "头大身扁，嘴巴多变，咬住螺帽，直打转转。 ",
        answer: "扳手"
    }, {
        id: "305",
        tips: "打一成语",
        question: "五指不齐 ",
        answer: "三长两短"
    }, {
        id: "306",
        tips: "打一成语",
        question: "十个男儿九粗心 ",
        answer: "雄才大略"
    }, {
        id: "307",
        tips: "打一食物",
        question: "一群白鹅，浮水过河，用桨挑起，送到庙里。 ",
        answer: "饺子"
    }, {
        id: "308",
        tips: "打一成语",
        question: "一看吓一跳 ",
        answer: "触目惊心"
    }, {
        id: "309",
        tips: "打一成语",
        question: "按摩医生医术好 ",
        answer: "手到病除"
    }, {
        id: "310",
        tips: "打一物",
        question: "顶山叠下山，半山竖旗杆，雷公轰轰响，雪花落满山。 ",
        answer: "石磨"
    }, {
        id: "311",
        tips: "打一成语",
        question: "一共二画 ",
        answer: "恰如其分"
    }, {
        id: "312",
        tips: "打一字",
        question: "待到秋后续前缘 ",
        answer: "终"
    }, {
        id: "313",
        tips: "打一字",
        question: "梦中有，醒来无；死了有，活着无；多则有，少则无。 ",
        answer: "夕"
    }, {
        id: "314",
        tips: "打一成语",
        question: "只为二奶至离婚 ",
        answer: "因小失大"
    }, {
        id: "315",
        tips: "打一字",
        question: "书声乐声和鼓声 ",
        answer: "股"
    }, {
        id: "316",
        tips: "打一物",
        question: "一岁二岁无影形，十五十六长成人，要想做到三十岁，二十八岁要归位。 ",
        answer: "月亮"
    }, {
        id: "317",
        tips: "打一成语",
        question: "事发先后没在重庆 ",
        answer: "始终不渝"
    }, {
        id: "318",
        tips: "打二字日常现象",
        question: "早晨头朝西，下午头朝东。中午它最短，一天两头长。 ",
        answer: "影子"
    }, {
        id: "319",
        tips: "打一字",
        question: "犹如丫丫翻了身 ",
        answer: "从"
    }, {
        id: "320",
        tips: "打一文具",
        question: "身为植物所生，头为动物所长，不是人工造就，哪有古今文章。 ",
        answer: "毛笔"
    }, {
        id: "321",
        tips: "打一成语",
        question: "煤球和元宵一样 ",
        answer: "黑白不分"
    }, {
        id: "322",
        tips: "打一字",
        question: "有人告诉就懂得 ",
        answer: "会"
    }, {
        id: "323",
        tips: "打一字",
        question: "闹市散罢天放晴 ",
        answer: "间"
    }, {
        id: "324",
        tips: "打一成语",
        question: "阴有雨 ",
        answer: "九泉之下"
    }, {
        id: "325",
        tips: "打一成语",
        question: "船长下令鸣笛 ",
        answer: "一命呜呼"
    }, {
        id: "326",
        tips: "打一物",
        question: "一物也不大，走路头朝下，不读孔孟书，光说文气话。 ",
        answer: "毛笔"
    }, {
        id: "327",
        tips: "打一成语",
        question: "猜谜有益 ",
        answer: "利在其中"
    }, {
        id: "328",
        tips: "打一字",
        question: "平易近人好相处 ",
        answer: "伴"
    }, {
        id: "329",
        tips: "打一人体器官",
        question: "一物生得鲜，四面不见天，长年不下雨，光湿不会干。 ",
        answer: "舌头"
    }, {
        id: "330",
        tips: "打一成语",
        question: "好细腰 ",
        answer: "美中不足"
    }, {
        id: "331",
        tips: "打一字",
        question: "用心来调理 ",
        answer: "样"
    }, {
        id: "332",
        tips: "打一教学用品",
        question: "一个黑大汉，靠墙靠壁站，白蛇身上过，脚印人人见。 ",
        answer: "黑板"
    }, {
        id: "333",
        tips: "打一字",
        question: "影后全靠换新妆 ",
        answer: "珍"
    }, {
        id: "334",
        tips: "打一游乐设施",
        question: "一面镜子真奇秒，个个见了哈哈笑，瘦子一照成胖子，矮子一照能变高。 ",
        answer: "哈哈镜"
    }, {
        id: "335",
        tips: "打一成语",
        question: "秀才无缘见真龙 ",
        answer: "生不逢辰"
    }, {
        id: "336",
        tips: "打一字",
        question: "厂内养狗讨人嫌 ",
        answer: "厌"
    }, {
        id: "337",
        tips: "打一成语",
        question: "朕所忧烦无子嗣 ",
        answer: "孤苦零丁"
    }, {
        id: "338",
        tips: "打一成语",
        question: "七人皆失踪 ",
        answer: "化为乌有"
    }, {
        id: "339",
        tips: "打一成语",
        question: "再三吻张生 ",
        answer: "六亲不认"
    }, {
        id: "340",
        tips: "打一字",
        question: "宋字不戴帽，不能猜作木。 ",
        answer: "李"
    }, {
        id: "341",
        tips: "打一字",
        question: "一只羊羔没有尾，仔细看看四条腿。 ",
        answer: "养"
    }, {
        id: "342",
        tips: "打一物",
        question: "一个画家真奇怪，不用画笔不用彩，朝它面前站一站，咔嚓一声画下来。 ",
        answer: "照相机"
    }, {
        id: "343",
        tips: "打一成语",
        question: "猴子捞月，精卫填海。 ",
        answer: "落井下石"
    }, {
        id: "344",
        tips: "打一成语",
        question: "听见 ",
        answer: "耳闻目睹"
    }, {
        id: "345",
        tips: "打一字",
        question: "叶动心不动 ",
        answer: "思"
    }, {
        id: "346",
        tips: "打一成语",
        question: "老来俏 ",
        answer: "故作姿态"
    }, {
        id: "347",
        tips: "打一成语",
        question: "死结 ",
        answer: "难分难解"
    }, {
        id: "348",
        tips: "打一动物",
        question: "小货郎，山里转，只卖针，不卖线。 ",
        answer: "刺猬"
    }, {
        id: "349",
        tips: "打一水果",
        question: "打破坛一个，中藏玛瑙珍珠。 ",
        answer: "石榴"
    }, {
        id: "350",
        tips: "打一水果",
        question: "衣裳有绿也有红，钮子藏在心窝中，酸甜可口营养多，维生素有好几种。 ",
        answer: "大枣"
    }, {
        id: "351",
        tips: "打一常见物",
        question: "远看像条龙，近看铁打成，坡地人拖它，平地它拖人。 ",
        answer: "自行车"
    }, {
        id: "352",
        tips: "打一生活物",
        question: "小时青竹林，长大刮骨抽筋，听些花言巧语，看着人们翻身。 ",
        answer: "席子"
    }, {
        id: "353",
        tips: "打一物",
        question: "姐姐花肚皮，妹妹花肚皮，肚皮对肚皮，肚脐对肚脐。 ",
        answer: "磨"
    }, {
        id: "354",
        tips: "打一字",
        question: "比二多一半 ",
        answer: "死"
    }, {
        id: "355",
        tips: "打一成语",
        question: "僧人去多久 ",
        answer: "曾几何时"
    }, {
        id: "356",
        tips: "打一字",
        question: "除草得第二 ",
        answer: "艺"
    }, {
        id: "357",
        tips: "打一自然物",
        question: "刀砍没有缝，枪打没有洞；斧头砍不烂，没牙能咬动。 ",
        answer: "水"
    }, {
        id: "358",
        tips: "打一乐器",
        question: "肚皮花里绿，背脊三根索，头里三只角，日里沿街走，夜里歇壁角。 ",
        answer: "三弦"
    }, {
        id: "359",
        tips: "打一成语",
        question: "双雄 ",
        answer: "左右为难"
    }, {
        id: "360",
        tips: "打一成语",
        question: "关公刮骨疗毒，吴起杀妻求将。 ",
        answer: "忍痛割爱"
    }, {
        id: "361",
        tips: "打一成语",
        question: "读了两遍便记住 ",
        answer: "念念不忘"
    }, {
        id: "362",
        tips: "打一字",
        question: "来点刁，还要更刁点。 ",
        answer: "羽"
    }, {
        id: "363",
        tips: "打一自然现象",
        question: "有城不能去旅游，有楼不能住里头，海面沙漠半空悬，不用能工巧匠修。 ",
        answer: "海市蜃楼"
    }, {
        id: "364",
        tips: "打一成语",
        question: "十年未改旧官职 ",
        answer: "原封不动"
    }, {
        id: "365",
        tips: "打一物",
        question: "头上一对角，脖上一根索，吃饱肚子，扎牢脖子。 ",
        answer: "布袋"
    }, {
        id: "366",
        tips: "打一成语",
        question: "误差 ",
        answer: "将错就错"
    }, {
        id: "367",
        tips: "打一字",
        question: "听话音是虚心人 （打一少笔字）",
        answer: "化"
    }, {
        id: "368",
        tips: "打一游戏名",
        question: "你也十六，我也十六，同母所生，两样面目，日里同行，夜里同宿，只因斗气，一世不睦。 ",
        answer: "中国象棋"
    }, {
        id: "369",
        tips: "打一成语",
        question: "进剧团饰演李逵 ",
        answer: "班门弄斧"
    }, {
        id: "370",
        tips: "打一成语",
        question: "化妆表演 ",
        answer: "粉墨登场"
    }, {
        id: "371",
        tips: "打一水果",
        question: "一位姑娘架上爬，生性顽皮乱涂画，先画绿叶一片片，再画珍珠一挂挂。 ",
        answer: "葡萄"
    }, {
        id: "372",
        tips: "打一物",
        question: "光芒四射照四方，大海之中我最高，黑夜之中少了我，东南西北找不到。 ",
        answer: "灯塔"
    }, {
        id: "373",
        tips: "打一字",
        question: "句中没有顿号 ",
        answer: "勺"
    }, {
        id: "374",
        tips: "打一字",
        question: "双方因犬生悲剧 ",
        answer: "哭"
    }, {
        id: "375",
        tips: "打一成语",
        question: "加班计划 ",
        answer: "一五一十"
    }, {
        id: "376",
        tips: "打一动物",
        question: "有种虫儿真奇怪，专吃叶子不吃菜，白白身子细又长，吐出丝来造间房。 ",
        answer: "蚕蛾"
    }, {
        id: "377",
        tips: "打一成语",
        question: "姑娘当先生 ",
        answer: "好为人师"
    }, {
        id: "378",
        tips: "打一字",
        question: "拧开盖子敲一敲 ",
        answer: "打"
    }, {
        id: "379",
        tips: "打一人体器官",
        question: "早上开门，晚上关门，走近一看，门里有人。 ",
        answer: "眼睛"
    }, {
        id: "380",
        tips: "打一成语",
        question: "三十六计何上 ",
        answer: "溜之大吉"
    }, {
        id: "381",
        tips: "打一成语",
        question: "勾拳已是定式 ",
        answer: "屈打成招"
    }, {
        id: "382",
        tips: "打一字",
        question: "三十天夺得锦旗 ",
        answer: "阴"
    }, {
        id: "383",
        tips: "打一字",
        question: "点点滴滴成百万 ",
        answer: "儿"
    }, {
        id: "384",
        tips: "打一成语",
        question: "一骑来者国姓爷 ",
        answer: "马到成功"
    }, {
        id: "385",
        tips: "打一字",
        question: "上边两个加，下边一个加，绿叶开紫花，像瓜不叫瓜。 ",
        answer: "茄"
    }, {
        id: "386",
        tips: "打一字",
        question: "人人为改革出力 ",
        answer: "伙"
    }, {
        id: "387",
        tips: "打一字",
        question: "半册多点 ",
        answer: "丹"
    }, {
        id: "388",
        tips: "打一玩具",
        question: "一人牵一线，不怕大风吹我起，只怕大雨淋我身。 ",
        answer: "风筝"
    }, {
        id: "389",
        tips: "打一家用电器",
        question: "屋里千根藤，藤上结个瓜，待到太阳落，瓜内又开花。 ",
        answer: "电灯"
    }, {
        id: "390",
        tips: "打一字",
        question: "未得君亲成庶人 ",
        answer: "群"
    }, {
        id: "391",
        tips: "打一字",
        question: "桌椅箱柜样样有 ",
        answer: "木"
    }, {
        id: "392",
        tips: "打一成语",
        question: "孕妇走钢丝 ",
        answer: "铤而走险"
    }, {
        id: "393",
        tips: "打一成语",
        question: "怎么也不像岳父 ",
        answer: "安如泰山"
    }, {
        id: "394",
        tips: "打一成语",
        question: "骑兵踩地雷 ",
        answer: "人仰马翻"
    }, {
        id: "395",
        tips: "打一成语",
        question: "据查仅存其一 ",
        answer: "杳无踪影"
    }, {
        id: "396",
        tips: "打一常见物",
        question: "姐妹二人身均匀，心如湖水一般平，主人一刻离不得，恐怕前途看不清。 ",
        answer: "眼镜"
    }, {
        id: "397",
        tips: "打一物",
        question: "草叶层层纸儿卷，也不咸来也不甜，吃千吃万吃不饱，片片白云飞上天。 ",
        answer: "卷烟"
    }, {
        id: "398",
        tips: "打一成语",
        question: "十口分离，十口团聚。 ",
        answer: "解甲归田"
    }, {
        id: "399",
        tips: "打一字",
        question: "抢先别落后 ",
        answer: "拐"
    }, {
        id: "400",
        tips: "打一成语",
        question: "撇开领导，出场亮相 ",
        answer: "抛头露面"
    } ]), i(t, "answer_data_03", [ "狮", "燕", "子", "鹿", "虱", "丹", "顶", "鹤", "珊", "瑚", "虫", "鸡", "鹌", "鹑", "大", "象", "白", "鹭", "鹦", "鹉", "鲫", "鱼", "蜻", "蜓", "狗", "熊", "大", "雁", "花", "金", "龟", "猫", "骡", "野", "鸭", "水", "母", "乌", "鸦", "马", "黑", "天", "鹅", "蛤", "蟆", "虎", "猫", "猪", "孔", "雀", "田", "螺", "蟋", "蟀", "蝗", "虫", "鹰", "蟑", "螂", "鹅", "鳖", "抹", "香", "鲸", "草", "蜢", "长", "臂", "猿", "蛀", "虫", "蝎", "猞", "猁", "蚊", "熊", "猫", "响", "尾", "蛇", "熊", "猫", "刺", "猬", "树", "懒", "海", "星", "北", "极", "熊", "白", "鲨", "花", "紫", "貂", "海", "蜇", "蝼", "蛄", "獭", "貉", "灵", "猫", "海", "鸥", "蚯", "蚓", "波", "斯", "猫", "金", "丝", "猴", "羊" ]), 
    i(t, "puzzle_data_03", [ {
        id: "401",
        tips: "打一成语",
        question: "开会再说 ",
        answer: "人云亦云"
    }, {
        id: "402",
        tips: "打一字",
        question: "虽已七十有劲头 ",
        answer: "轻"
    }, {
        id: "403",
        tips: "打一字",
        question: "改变困境人为先 ",
        answer: "保"
    }, {
        id: "404",
        tips: "打一字",
        question: "排除污水，大加称赞。 ",
        answer: "夸"
    }, {
        id: "405",
        tips: "打一成语",
        question: "天天改仪容 ",
        answer: "大仁大义"
    }, {
        id: "406",
        tips: "打一物",
        question: "一物脾气怪，专把钢铁爱，遇到就粘上，不扯分不开。 ",
        answer: "磁铁"
    }, {
        id: "407",
        tips: "打一成语",
        question: "居心不良当治罪 ",
        answer: "十恶不赦"
    }, {
        id: "408",
        tips: "打一字",
        question: "二人约会在西堤 ",
        answer: "去"
    }, {
        id: "409",
        tips: "打一物",
        question: "不见向上飞，只见往下落，翅膀一收回，露出人一人。 ",
        answer: "降落伞"
    }, {
        id: "410",
        tips: "打一字",
        question: "端午节后出生 ",
        answer: "产"
    }, {
        id: "411",
        tips: "打一字",
        question: "派一人去外围 ",
        answer: "伟"
    }, {
        id: "412",
        tips: "打一成语",
        question: "写稿最忌在午前 ",
        answer: "打草惊蛇"
    }, {
        id: "413",
        tips: "打一字",
        question: "折扣之后两手空 ",
        answer: "听"
    }, {
        id: "414",
        tips: "打一动物",
        question: "长脚小儿郎，吹箫入洞房，爱吃红花酒，拍手见阎王。 ",
        answer: "蚊子"
    }, {
        id: "415",
        tips: "打一字",
        question: "默许 ",
        answer: "午"
    }, {
        id: "416",
        tips: "打一物",
        question: "平时家中养，干活就放躺，叫它挑重担，浑身骨节响。 ",
        answer: "扁担"
    }, {
        id: "417",
        tips: "打一生活物",
        question: "一条腿，一排牙，个头不大作用大，每天回家都求他。 ",
        answer: "钥匙"
    }, {
        id: "418",
        tips: "打一字",
        question: "两点开会 ",
        answer: "并"
    }, {
        id: "419",
        tips: "打一物",
        question: "打开半个月亮，收起来一根棒，荷花飘香用它，菊花开放收藏。 ",
        answer: "折扇"
    }, {
        id: "420",
        tips: "打一物",
        question: "有人无我，有我无人，人去我在，人归不在。 ",
        answer: "锁"
    }, {
        id: "421",
        tips: "打一自然现象",
        question: "你有我有他也有，黑身黑腿黑黑头，灯前月下跟你走，就是从来不开口。 ",
        answer: "影子"
    }, {
        id: "422",
        tips: "打一水果",
        question: "颜色青青两头尖，先尝涩口过后甜。 ",
        answer: "橄榄"
    }, {
        id: "423",
        tips: "打一电器",
        question: "冷了升温，热了降温，屋里有它，四季如春。 ",
        answer: "空调"
    }, {
        id: "424",
        tips: "打一成语",
        question: "醉酒搓麻咋不输 ",
        answer: "曲高和寡"
    }, {
        id: "425",
        tips: "打一物",
        question: "不用播种不用栽，节日一到花儿开。轰隆一声冲天响，万紫千红放光彩。 ",
        answer: "烟花"
    }, {
        id: "426",
        tips: "打一成语",
        question: "上屋救火 ",
        answer: "灭顶之灾"
    }, {
        id: "427",
        tips: "打一字",
        question: "忙把心放下 ",
        answer: "忘"
    }, {
        id: "428",
        tips: "打一字",
        question: "脱贫之后人变样 ",
        answer: "份"
    }, {
        id: "429",
        tips: "打一物",
        question: "满身都是牙，遇事两头拉，谁也谈不拢，总是闹分家。 ",
        answer: "锯子"
    }, {
        id: "430",
        tips: "打一成语",
        question: "猴毛怎得变猛虎 ",
        answer: "一气呵成"
    }, {
        id: "431",
        tips: "打一游戏",
        question: "手中一把抓，心中想着它，我想心中喊着它，又怕喊错不是它。 ",
        answer: "猜拳"
    }, {
        id: "432",
        tips: "打一成语",
        question: "车满载 ",
        answer: "无隙可乘"
    }, {
        id: "433",
        tips: "打一字",
        question: "本人退休",
        answer: "一"
    }, {
        id: "434",
        tips: "打一成语",
        question: "菊花满径伴良辰 ",
        answer: "黄道吉日"
    }, {
        id: "435",
        tips: "打一成语",
        question: "厚刀钝刀无买主 ",
        answer: "薄利多销"
    }, {
        id: "436",
        tips: "打一字",
        question: "却是旧时相识 ",
        answer: "做"
    }, {
        id: "437",
        tips: "打一成语",
        question: "不能公开搞 ",
        answer: "暗中作对"
    }, {
        id: "438",
        tips: "打一字",
        question: "触火即燃 ",
        answer: "然"
    }, {
        id: "439",
        tips: "打一字",
        question: "谓之男儿，排行第四 ",
        answer: "丁"
    }, {
        id: "440",
        tips: "打一生活物",
        question: "头上一撮毛，专往人嘴跑，上下左右爬，冒出白泡泡。 ",
        answer: "牙刷"
    }, {
        id: "441",
        tips: "打一成语",
        question: "夫妻古稀结伴行 ",
        answer: "七十二行"
    }, {
        id: "442",
        tips: "打一成语",
        question: "彩排之前 ",
        answer: "涂脂抹粉"
    }, {
        id: "443",
        tips: "打一成语",
        question: "神曲 ",
        answer: "不同凡响"
    }, {
        id: "444",
        tips: "打一成语",
        question: "垂帘听政管群臣 ",
        answer: "后发制人"
    }, {
        id: "445",
        tips: "打一字",
        question: "加加减减又不对 ",
        answer: "封"
    }, {
        id: "446",
        tips: "打一字",
        question: "八点九点十点 ",
        answer: "染"
    }, {
        id: "447",
        tips: "打一物",
        question: "黑洞洞，白洞洞，十八罗汉扛不动。 ",
        answer: "水井"
    }, {
        id: "448",
        tips: "打一字",
        question: "入穴行窃 ",
        answer: "切"
    }, {
        id: "449",
        tips: "打一物",
        question: "红艳艳，飘胸前，像火苗，暖心间。 ",
        answer: "红领巾"
    }, {
        id: "450",
        tips: "打一物",
        question: "有花不能采，有鸟不能叫，有树不能爬，有果不能摘。 ",
        answer: "画"
    }, {
        id: "451",
        tips: "打一字",
        question: "抽刀必割 ",
        answer: "害"
    }, {
        id: "452",
        tips: "打一成语",
        question: "一二五六七 ",
        answer: "丢三落四"
    }, {
        id: "453",
        tips: "打一成语",
        question: "玄德在此莫担心 ",
        answer: "有备无患"
    }, {
        id: "454",
        tips: "打一物",
        question: "小孩子，穿彩褂，过年过节都有它，说话噼里啪啦。 ",
        answer: "鞭炮"
    }, {
        id: "455",
        tips: "打一成语",
        question: "不经意到来 ",
        answer: "无心之过"
    }, {
        id: "456",
        tips: "打二字行为活动",
        question: "嘴儿亲，舌儿伸，两手尖尖搂抱着身，按着窍儿通口气，呜呜咽咽作娇声 ",
        answer: "吹箫"
    }, {
        id: "457",
        tips: "打一字",
        question: "九字巧改造，不知多少。 ",
        answer: "几"
    }, {
        id: "458",
        tips: "打一成语",
        question: "内事不决问张昭，外事不决问周瑜。 ",
        answer: "权宜之计"
    }, {
        id: "459",
        tips: "打一物",
        question: "此物生来权力大，车马行人服从它，看它红脸不敢行，红脸变绿走没错。 ",
        answer: "红绿灯"
    }, {
        id: "460",
        tips: "打一生活物",
        question: "生时正是新年头，不知和谁结了仇，一天揭我一层皮，揭到年终命已休。 ",
        answer: "日历"
    }, {
        id: "461",
        tips: "打一成语",
        question: "瞎子上山岭 ",
        answer: "不知高低"
    }, {
        id: "462",
        tips: "打一游戏用品",
        question: "无脚无腿偏爱跳，非禽非兽却有毛，不要让它掉在地，谁先掉地谁输了。 ",
        answer: "毽子"
    }, {
        id: "463",
        tips: "打一字",
        question: "百变之后还是我 ",
        answer: "自"
    }, {
        id: "464",
        tips: "打一自然现象",
        question: "高高大大，无脚会行，靠天讨饭，天下闻名。 ",
        answer: "云"
    }, {
        id: "465",
        tips: "打一字",
        question: "古城改造要搬迁 ",
        answer: "吧"
    }, {
        id: "466",
        tips: "打一字",
        question: "有儿有女有兄妹 ",
        answer: "味"
    }, {
        id: "467",
        tips: "打一字",
        question: "珍珠玛瑙全有 ",
        answer: "王"
    }, {
        id: "468",
        tips: "打一字",
        question: "夜幕降临到贵州 ",
        answer: "今"
    }, {
        id: "469",
        tips: "打一成语",
        question: "生炉子 ",
        answer: "煽风点火"
    }, {
        id: "470",
        tips: "打一成语",
        question: "神话 ",
        answer: "一表非凡"
    }, {
        id: "471",
        tips: "打一字",
        question: "连声应允 ",
        answer: "哥"
    }, {
        id: "472",
        tips: "打一生活物",
        question: "两只小船，无桨无篷。十个小孩，分坐船中。白天来来去去，晚上人去船空。 ",
        answer: "鞋子"
    }, {
        id: "473",
        tips: "打一字",
        question: "提高声音 ",
        answer: "升"
    }, {
        id: "474",
        tips: "打一字",
        question: "两只小耳朵 ",
        answer: "际"
    }, {
        id: "475",
        tips: "打一自然物",
        question: "初出茅庐一张弓，世上无人拉得动。 ",
        answer: "月亮"
    }, {
        id: "476",
        tips: "打一成语",
        question: "话到嘴边又咽下 ",
        answer: "自食其言"
    }, {
        id: "477",
        tips: "打一成语",
        question: "一个碟子摔成九块 ",
        answer: "四分五裂"
    }, {
        id: "478",
        tips: "打一字",
        question: "日里有一横，猜目可不行。 ",
        answer: "量"
    }, {
        id: "479",
        tips: "打一字",
        question: "如去一口，仍少一人。 ",
        answer: "奶"
    }, {
        id: "480",
        tips: "打一成语",
        question: "忽略中段 ",
        answer: "瞻前顾后"
    }, {
        id: "481",
        tips: "打一文具",
        question: "有个球儿不能拍，整个世界在身上，上面有山不长草，上面有海不起浪。 ",
        answer: "地球仪"
    }, {
        id: "482",
        tips: "打一乐器",
        question: "一条横小巷，许多小天窗，一阵风声起，歌声传四方。 ",
        answer: "笛子"
    }, {
        id: "483",
        tips: "打一字",
        question: "一字十笔歪，任你随意猜，若是猜不出，请你父亲来。 ",
        answer: "爹"
    }, {
        id: "484",
        tips: "打一成语",
        question: "肉铺悬挂猪下水 ",
        answer: "提心吊胆"
    }, {
        id: "485",
        tips: "打一成语",
        question: "一千零一夜 ",
        answer: "天方夜谭"
    }, {
        id: "486",
        tips: "打一生活物",
        question: "不是奶酪不是糖，洁白芬芳袋中装，不能吃来不能嚼，人人每天把它尝。 ",
        answer: "牙膏"
    }, {
        id: "487",
        tips: "打一成语",
        question: "乔迁小巷起纠纷 ",
        answer: "搬弄是非"
    }, {
        id: "488",
        tips: "打一食物",
        question: "土里生，水里捞，石头缝里走一遭，摇身一变白又净。 ",
        answer: "豆腐"
    }, {
        id: "489",
        tips: "打一字",
        question: "一月一日不猜明，若能猜出勇气嘉。 ",
        answer: "胆"
    }, {
        id: "490",
        tips: "打一字",
        question: "一人关入口，急得乱发抖，下面蹬掉底，上边顶出头。 ",
        answer: "内"
    }, {
        id: "491",
        tips: "打一字",
        question: "说不清楚教人猜 ",
        answer: "谜"
    }, {
        id: "492",
        tips: "打一字",
        question: "树雄心，改旧貌。 ",
        answer: "但"
    }, {
        id: "493",
        tips: "打一字",
        question: "重点主要搞改革 ",
        answer: "汪"
    }, {
        id: "494",
        tips: "打一字",
        question: "此字一横一竖，上下放着两个八，吃饭少不了它。 ",
        answer: "米"
    }, {
        id: "495",
        tips: "打一乐器",
        question: "有弓不能射，有马不能骑，有轴不行车，有线不缝衣。 ",
        answer: "胡琴"
    }, {
        id: "496",
        tips: "打一成语",
        question: "二分之七 ",
        answer: "不三不四"
    }, {
        id: "497",
        tips: "打一成语",
        question: "前看是袭人，后看像颦儿。 ",
        answer: "如花似玉"
    }, {
        id: "498",
        tips: "打一字",
        question: "南北携手合作 ",
        answer: "拿"
    }, {
        id: "499",
        tips: "打一字",
        question: "离别之后有变化 ",
        answer: "加"
    }, {
        id: "500",
        tips: "打一水果",
        question: "胖娃娃最爱笑，笑红身子笑破嘴，笑得大嘴合不上，露出满嘴红玛瑙。 ",
        answer: "石榴"
    }, {
        id: "501",
        tips: "打一字",
        question: "全力以赴方成功 ",
        answer: "工"
    }, {
        id: "502",
        tips: "打一成语",
        question: "神雕大侠尚逊一筹 ",
        answer: "过犹不及"
    }, {
        id: "503",
        tips: "打一游戏用具",
        question: "看看又滑又圆，摸摸又硬又软；打它它跳得高，踢它它逃得远。 ",
        answer: "皮球"
    }, {
        id: "504",
        tips: "打一文具",
        question: "身体生来瘦又长，五彩衣衫黑心肠，嘴巴尖尖会说话，只见短来不见长。 ",
        answer: "铅笔"
    }, {
        id: "505",
        tips: "打一生活物",
        question: "戴顶平顶帽，身穿圆筒袄，虽然一只眼，领路本领高。 ",
        answer: "手电筒"
    }, {
        id: "506",
        tips: "打一成语",
        question: "李逵、宋江、没遮拦。 ",
        answer: "风雨无阻"
    }, {
        id: "507",
        tips: "打一字",
        question: "雾中唯见桥头露 ",
        answer: "条"
    }, {
        id: "508",
        tips: "打一成语",
        question: "爆竹响，换春联。 ",
        answer: "辞旧迎新"
    }, {
        id: "509",
        tips: "打一成语",
        question: "先生不知何许人也 ",
        answer: "师出无名"
    }, {
        id: "510",
        tips: "打一字",
        question: "少女节食人消瘦 ",
        answer: "娘"
    }, {
        id: "511",
        tips: "打一字",
        question: "倒数第一演后溜 ",
        answer: "油"
    }, {
        id: "512",
        tips: "打一常见物",
        question: "因为看不清，反要加一层。 ",
        answer: "眼镜"
    }, {
        id: "513",
        tips: "打一食物",
        question: "清水里得病，石头上送命，锅子里开花，木头上分家。 ",
        answer: "豆腐"
    }, {
        id: "514",
        tips: "打一字",
        question: "田上一棵小草，小狗守的牢牢，弟弟见了抱它，老鼠见了逃跑。 ",
        answer: "猫"
    }, {
        id: "515",
        tips: "打一人体器官",
        question: "同胞弟兄三十多，先生弟弟后生哥，当门抵户弟弟去，进了门内靠哥哥。 ",
        answer: "牙齿"
    }, {
        id: "516",
        tips: "打一人体器官",
        question: "十个小兄弟，天天不分离；样样都能干，勤劳数第一。 ",
        answer: "手指"
    }, {
        id: "517",
        tips: "打一乐器",
        question: "往里看一条暗胡同，中间开了七八个圆洞洞。 ",
        answer: "笛子"
    }, {
        id: "518",
        tips: "打一成语",
        question: "工作做不到家 ",
        answer: "无所事事"
    }, {
        id: "519",
        tips: "打一成语",
        question: "沿街叫卖 ",
        answer: "步步为营"
    }, {
        id: "520",
        tips: "打一字",
        question: "西服脱下挂前边 ",
        answer: "报"
    }, {
        id: "521",
        tips: "打一水果",
        question: "一个小圆球，头顶长花瓣，拨开是红的，吃的是白的。 ",
        answer: "山竹"
    }, {
        id: "522",
        tips: "打一成语",
        question: "叫嚣乎东西 ",
        answer: "言之有物"
    }, {
        id: "523",
        tips: "打一字",
        question: "听听会飞，细看不是，用心难过，见人来回。 ",
        answer: "非"
    }, {
        id: "524",
        tips: "打一字",
        question: "明日去合肥 ",
        answer: "巴"
    }, {
        id: "525",
        tips: "打一成语",
        question: "单字谜 ",
        answer: "独当一面"
    }, {
        id: "526",
        tips: "打一字",
        question: "哑谜 ",
        answer: "迷"
    }, {
        id: "527",
        tips: "打一字",
        question: "日日雨不断 ",
        answer: "雷"
    }, {
        id: "528",
        tips: "打一物",
        question: "一班姐妹一班郎，一对一对配鸳鸯，白天在一道，晚上各自分。 ",
        answer: "纽扣"
    }, {
        id: "529",
        tips: "打一字",
        question: "与君相伴不孤单 ",
        answer: "羊"
    }, {
        id: "530",
        tips: "打一字",
        question: "昔日已去今翻身 ",
        answer: "开"
    }, {
        id: "531",
        tips: "打一成语",
        question: "吹完优点才肯走 ",
        answer: "扬长而去"
    }, {
        id: "532",
        tips: "打一字",
        question: "一字八条腿，中间一张嘴。 ",
        answer: "井"
    }, {
        id: "533",
        tips: "打一成语",
        question: "魏 ",
        answer: "所托非人"
    }, {
        id: "534",
        tips: "打一字",
        question: "第二次借钱 ",
        answer: "欢"
    }, {
        id: "535",
        tips: "打一成语",
        question: "后羿射日 ",
        answer: "九死一生"
    }, {
        id: "536",
        tips: "打一字",
        question: "日落西山不见山 ",
        answer: "晒"
    }, {
        id: "537",
        tips: "打一字",
        question: "真通未来 ",
        answer: "兰"
    }, {
        id: "538",
        tips: "打一成语",
        question: "鲁迅诞辰100周年 ",
        answer: "百年树人"
    }, {
        id: "539",
        tips: "打一字",
        question: "好像不对头，就是不对头。 ",
        answer: "米"
    }, {
        id: "540",
        tips: "打一字",
        question: "负离子 ",
        answer: "了"
    }, {
        id: "541",
        tips: "打一成语",
        question: "指鹿为马莫附和 ",
        answer: "高不可攀"
    }, {
        id: "542",
        tips: "打一成语",
        question: "曾子何以真杀猪 ",
        answer: "非同儿戏"
    }, {
        id: "543",
        tips: "打一玩具",
        question: "一个公公精神好，从早到晚不睡觉，身体虽小力气大，千人推不到。 ",
        answer: "不倒翁"
    }, {
        id: "544",
        tips: "打一自然物",
        question: "上去一团烟，下来一条线，好吃没滋味，脏了不能洗。 ",
        answer: "水"
    }, {
        id: "545",
        tips: "打一字",
        question: "游子方离母牵挂 ",
        answer: "海"
    }, {
        id: "546",
        tips: "打一成语",
        question: "狡兔藏 ",
        answer: "退避三舍"
    }, {
        id: "547",
        tips: "打一成语",
        question: "驻巴黎大使 ",
        answer: "奉公守法"
    }, {
        id: "548",
        tips: "打一字",
        question: "查出木马，一一清除。 ",
        answer: "吗"
    }, {
        id: "549",
        tips: "打一字",
        question: "人言不可信 ",
        answer: "认"
    }, {
        id: "550",
        tips: "打一科技产物",
        question: "测距可当尺，切割能当刀，虽说它是光，却能保家国。 ",
        answer: "激光"
    }, {
        id: "551",
        tips: "打一自然物",
        question: "闪闪亮亮，万点灯火；照亮天空，布满银河。 ",
        answer: "星星"
    }, {
        id: "552",
        tips: "打一成语",
        question: "巨木 ",
        answer: "水到渠成"
    }, {
        id: "553",
        tips: "打一成语",
        question: "举世皆浊我独清 ",
        answer: "一尘不染"
    }, {
        id: "554",
        tips: "打一字",
        question: "古币 ",
        answer: "错"
    }, {
        id: "555",
        tips: "打一字",
        question: "妇女解放翻了身 ",
        answer: "山"
    }, {
        id: "556",
        tips: "打一自然现象",
        question: "人人都有个朋友，乌黑的头发乌黑的头，月下灯前陪着你，就是永远不开口。 ",
        answer: "影子"
    }, {
        id: "557",
        tips: "打一字",
        question: "残云遮月花片片 ",
        answer: "能"
    }, {
        id: "558",
        tips: "打一字",
        question: "真心牵挂意中人 ",
        answer: "春"
    }, {
        id: "559",
        tips: "打一自然物",
        question: "这颗星星不寻常，长长尾巴发着光，好像一把金扫帚，划过夜空就躲藏。 ",
        answer: "彗星"
    }, {
        id: "560",
        tips: "打一自然现象",
        question: "看不见，抓不着，常常与你开玩笑，掀掀衣角扬把沙，在你耳边呼呼叫。 ",
        answer: "风"
    }, {
        id: "561",
        tips: "打一字",
        question: "保证不说话 ",
        answer: "跑"
    }, {
        id: "562",
        tips: "打一生活物",
        question: "听听摇摇，会话会笑，尊姓大名，不知问了多少。 ",
        answer: "电话"
    }, {
        id: "563",
        tips: "打一字",
        question: "茶在壶中无人赏光 ",
        answer: "荣"
    }, {
        id: "564",
        tips: "打一字",
        question: "安字去了盖，莫当女字猜。 ",
        answer: "好"
    }, {
        id: "565",
        tips: "打一字",
        question: "未来一定美好 （打一少笔字）",
        answer: "人"
    }, {
        id: "566",
        tips: "打一字",
        question: "田里有人 ",
        answer: "困"
    }, {
        id: "567",
        tips: "打一特定称谓",
        question: "小小一种货，每人有一个。自己说得少，别人说得多。 ",
        answer: "名字"
    }, {
        id: "568",
        tips: "打一成语",
        question: "不合理 ",
        answer: "分而治之"
    }, {
        id: "569",
        tips: "打一字",
        question: "四方共合力 ",
        answer: "男"
    }, {
        id: "570",
        tips: "打一成语",
        question: "则 ",
        answer: "恻隐之心"
    }, {
        id: "571",
        tips: "打一物",
        question: "新型客轮造得怪，海上舰艇没它快，飞到太空去探险，把人载到云天外。 ",
        answer: "宇宙飞船"
    }, {
        id: "572",
        tips: "打一字",
        question: "有心在前闲不住，把心放下记不住 ",
        answer: "亡"
    }, {
        id: "573",
        tips: "打一电器",
        question: "小小一座房，有门没有窗，鱼肉水果样样有，外面热来里面凉。 ",
        answer: "电冰箱"
    }, {
        id: "574",
        tips: "打一农作物",
        question: "麻布包，红绸袄，里面睡着白宝宝。 ",
        answer: "花生"
    }, {
        id: "575",
        tips: "打一成语",
        question: "烧香拜佛佛不知 ",
        answer: "供不应求"
    }, {
        id: "576",
        tips: "打一成语",
        question: "评选最差厕所 ",
        answer: "臭味相投"
    }, {
        id: "577",
        tips: "打一生活物",
        question: "扁脸小哥哥，牙齿长得多，为了理茅草，爬上高山坡。 ",
        answer: "梳子"
    }, {
        id: "578",
        tips: "打一成语",
        question: "一尺再加一点点 ",
        answer: "同归于尽"
    }, {
        id: "579",
        tips: "打一成语",
        question: "独有当垆卖酒人 ",
        answer: "卓尔不群"
    }, {
        id: "580",
        tips: "打一成语",
        question: "一经肯定仿制多 ",
        answer: "行之有效"
    }, {
        id: "581",
        tips: "打一物",
        question: "瘦高姑娘，穿红衣裳，头上发火，泪水流。 ",
        answer: "蜡烛"
    }, {
        id: "582",
        tips: "打一字",
        question: "只一会转了四分之一圈 ",
        answer: "冲"
    }, {
        id: "583",
        tips: "打一字",
        question: "小心翼翼 ",
        answer: "水"
    }, {
        id: "584",
        tips: "打一建筑物",
        question: "远望一个圈，半个湿来半个干。 ",
        answer: "桥"
    }, {
        id: "585",
        tips: "打一字",
        question: "不顾白头要进取  ",
        answer: "最"
    }, {
        id: "586",
        tips: "打一字",
        question: "不到最后不罢休 ",
        answer: "取"
    }, {
        id: "587",
        tips: "打一成语",
        question: "乍看之下像死了 ",
        answer: "一见如故"
    }, {
        id: "588",
        tips: "打一成语",
        question: "双枪将走后，菜园子上道。 ",
        answer: "平步青云"
    }, {
        id: "589",
        tips: "打一生活物",
        question: "矮矮胖胖腹中空，一面明镜摆当中；每天会面两三次，每次见面要鞠躬。 ",
        answer: "洗脸盆"
    }, {
        id: "590",
        tips: "打一字",
        question: "无人作伴更宁静 ",
        answer: "平"
    }, {
        id: "591",
        tips: "打一成语",
        question: "九条江河流两处 ",
        answer: "五湖四海"
    }, {
        id: "592",
        tips: "打一常见物",
        question: "世上千万家，种些无叶瓜，不论冬和夏，到夜就开花。 ",
        answer: "电灯"
    }, {
        id: "593",
        tips: "打一交通工具",
        question: "有头没头颈，过河水半身，送客千里外，走路总不肯。 ",
        answer: "船"
    }, {
        id: "594",
        tips: "打一字",
        question: "散席之后又重逢 ",
        answer: "度"
    }, {
        id: "595",
        tips: "打一成语",
        question: "丑角 ",
        answer: "牛之一毛"
    }, {
        id: "596",
        tips: "打一字",
        question: "古稀之年变化多 ",
        answer: "轮"
    }, {
        id: "597",
        tips: "打一成语",
        question: "雪白雪白 ",
        answer: "冷言冷语"
    }, {
        id: "598",
        tips: "打一字",
        question: "老人七十不见老 ",
        answer: "华"
    }, {
        id: "599",
        tips: "打一玩具",
        question: "马儿马儿好，腿儿两头翘，幼儿园里养，不用喂饲料。  ",
        answer: "摇马"
    }, {
        id: "600",
        tips: "打一字",
        question: "一横二直又三点 ",
        answer: "变"
    } ]), i(t, "answer_data_04", [ "彩", "虹", "哈", "镜", "太", "阳", "能", "雷", "电", "灯", "塔", "云", "嘴", "瓜", "子", "橄", "榄", "灯", "笼", "眼", "镜", "舞", "狮", "机", "关", "枪", "皮", "影", "戏", "盐", "胡", "琴", "月", "亮", "鸡", "毛", "掸", "非", "轿", "包", "砚", "多", "级", "火", "箭", "手", "指", "毛", "笔", "帆", "船", "蚊", "子", "生", "肖", "钓", "鱼", "秋", "千", "华", "野", "兔", "万", "香", "蕉", "布", "袋", "舞", "狮", "霜", "粽", "鲁", "皮", "军", "号", "针", "打", "喷", "嚏", "风", "扇", "雷", "太", "阳", "能", "水", "镜", "子", "米", "牙", "齿", "腰", "带", "橡", "皮", "降", "落", "伞", "石", "榴", "地", "球", "仪", "篷", "船", "彗", "星", "磨", "相", "鞋", "葡", "萄", "彩", "虹", "风", "蜡", "烛", "枕", "头", "雨", "伞", "做", "梦", "衣", "架", "电", "灯", "雷", "毛", "笔", "冲", "天", "炮", "温", "度", "计", "锯", "舌", "头", "雨", "伞", "养", "影", "灯", "塔", "枕", "头", "嘴", "唇", "冰", "凌", "螺", "丝", "钉", "豆", "腐", "毽", "手", "风", "琴", "月", "亮" ]), 
    i(t, "puzzle_data_04", [ {
        id: "601",
        tips: "打一传统艺术",
        question: "远看一间屋，近看屋无人，不说半句话，却爱装古人。 ",
        answer: "木偶戏"
    }, {
        id: "602",
        tips: "打一字",
        question: "又来才对 ",
        answer: "寸"
    }, {
        id: "603",
        tips: "打一自然物",
        question: "说是花不是花，不长叶子不结果，没有树根没树杈，冬天才开花，遍地都是她。 ",
        answer: "雪花"
    }, {
        id: "604",
        tips: "打一生活物",
        question: "鲜花一朵朵，下雨它就开，开了比人高，谢了比人矮。 ",
        answer: "雨伞"
    }, {
        id: "605",
        tips: "打一自然现象",
        question: "红公鸡，白尾巴，眨眨眼，一千里。 ",
        answer: "雷电"
    }, {
        id: "606",
        tips: "打一字",
        question: "布上打了叉，心中盼望它；心愿里面藏，常表祝福话。 ",
        answer: "希"
    }, {
        id: "607",
        tips: "打一成语",
        question: "口试后派以工作",
        answer: "听之任之"
    }, {
        id: "608",
        tips: "打一成语",
        question: "大概的规矩就一两条 ",
        answer: "约法三章"
    }, {
        id: "609",
        tips: "打一字",
        question: "雄心不减 ",
        answer: "什"
    }, {
        id: "610",
        tips: "打一字",
        question: "虽分开，有钱来。 ",
        answer: "蝉"
    }, {
        id: "611",
        tips: "打一食物",
        question: "白糖梅子真希奇，也没核儿也没皮，正月十五沿街卖，过了正月没人提。 ",
        answer: "元宵"
    }, {
        id: "612",
        tips: "打一成语",
        question: "分明有异味 ",
        answer: "阴阳怪气"
    }, {
        id: "613",
        tips: "打一成语",
        question: "室内众人皆无言 ",
        answer: "在所不辞"
    }, {
        id: "614",
        tips: "打一成语",
        question: "十三四岁的少女 ",
        answer: "豆蔻年华"
    }, {
        id: "615",
        tips: "打一体育用品",
        question: "两头撑起大鱼网，不捉鱼儿不捕虾，池中碧波人声沸，网着瓜儿乐开花。 ",
        answer: "水球"
    }, {
        id: "616",
        tips: "打一物",
        question: "四角方方一块，面上乌乌一片，白龙弯弯一走，脚印人人看见。 ",
        answer: "黑板"
    }, {
        id: "617",
        tips: "打一字",
        question: "得天时，有人和 ",
        answer: "二"
    }, {
        id: "618",
        tips: "打一生活物",
        question: "弟兄两个一样高，一天到晚饭厅跑，样样小菜都尝遍，就是没有长过膘。 ",
        answer: "筷子"
    }, {
        id: "619",
        tips: "打一成语",
        question: "耳 ",
        answer: "一官半职"
    }, {
        id: "620",
        tips: "打一成语",
        question: "植树能手 ",
        answer: "绿林好汉"
    }, {
        id: "621",
        tips: "打一成语",
        question: "吴 ",
        answer: "言多必失"
    }, {
        id: "622",
        tips: "打一字",
        question: "再度看错三围 ",
        answer: "网"
    }, {
        id: "623",
        tips: "打一建筑物",
        question: "薄薄一片，四四方方，安身之处，池边墙上。 ",
        answer: "瓷砖"
    }, {
        id: "624",
        tips: "打一字",
        question: "霜有雪没有，箱有柜没有，你有我没有，立功自会有。 ",
        answer: "相"
    }, {
        id: "625",
        tips: "打一成语",
        question: "好学的本事不值钱 ",
        answer: "难能可贵"
    }, {
        id: "626",
        tips: "打一字",
        question: "好婆婆，好媳妇，好姐妹，好姑嫂，好妯娌，处处有。 ",
        answer: "女"
    }, {
        id: "627",
        tips: "打一字",
        question: "爱美之心多点点 ",
        answer: "宝"
    }, {
        id: "628",
        tips: "打一字",
        question: "一字生得巧，上下可颠倒，写了两晚上，内容真不少。 ",
        answer: "多"
    }, {
        id: "629",
        tips: "打一字",
        question: "有口水就死不了 ",
        answer: "千"
    }, {
        id: "630",
        tips: "打一成语",
        question: "虎年谈虎 ",
        answer: "风言风语"
    }, {
        id: "631",
        tips: "打二字生理现象",
        question: "说话不开口，做事不动手，走路不动脚，吃食不经喉。 ",
        answer: "做梦"
    }, {
        id: "632",
        tips: "打一字",
        question: "有了白，反而黑。 ",
        answer: "七"
    }, {
        id: "633",
        tips: "打一学习用品",
        question: "像糖不是糖，有圆也有方，帮你把错改，自己不怕脏。 ",
        answer: "橡皮擦"
    }, {
        id: "634",
        tips: "打一自然物",
        question: "滔滔奔流地下来，莫当泉水胡乱猜，泉水映照山川绿，它能催得马达开。 ",
        answer: "石油"
    }, {
        id: "635",
        tips: "打一字",
        question: "百花园里百花开 ",
        answer: "元"
    }, {
        id: "636",
        tips: "打一建筑物",
        question: "四角方方，一座空房，人来人往，有凳没床。 ",
        answer: "亭子"
    }, {
        id: "637",
        tips: "打一常见物",
        question: "一物不成材，请客他先来，客来它就走，客走它又来。 ",
        answer: "抹布"
    }, {
        id: "638",
        tips: "打一字",
        question: "里方外圆 ",
        answer: "回"
    }, {
        id: "639",
        tips: "打一字",
        question: "湖边隐约闻鼓声 ",
        answer: "古"
    }, {
        id: "640",
        tips: "打一成语",
        question: "十指不沾泥，粼粼居大厦。 ",
        answer: "白手起家"
    }, {
        id: "641",
        tips: "打一字",
        question: "小时叮人，长时咬人，大时吃人。 ",
        answer: "虫"
    }, {
        id: "642",
        tips: "打一成语",
        question: "八月十五渡西湖 ",
        answer: "望穿秋水"
    }, {
        id: "643",
        tips: "打一自然现象",
        question: "红彤彤，热烘烘，横冲直撞要逞凶，无嘴能吃天下物，只怕雨水不怕风。 ",
        answer: "火"
    }, {
        id: "644",
        tips: "打一字",
        question: "四周围墙隔大火 ",
        answer: "烟"
    }, {
        id: "645",
        tips: "打一文具",
        question: "有骨无毛，有石无山，白龙来戏水，黑虎卧一边。 ",
        answer: "砚"
    }, {
        id: "646",
        tips: "打一字",
        question: "案中发现另一案 ",
        answer: "始"
    }, {
        id: "647",
        tips: "打一成语",
        question: "未见山妖，狩猎摘果 ",
        answer: "没精打采"
    }, {
        id: "648",
        tips: "打一自然现象",
        question: "天上云里真热闹，又是打鼓又放炮，秋冬两季不常有，春夏两季常听到。 ",
        answer: "雷"
    }, {
        id: "649",
        tips: "打一物",
        question: "满屋娃娃，圆圆脑瓜，出门一滑，开朵红花。 ",
        answer: "火柴"
    }, {
        id: "650",
        tips: "打一字",
        question: "不见背后 ",
        answer: "北"
    }, {
        id: "651",
        tips: "打一字",
        question: "三点到云南 ",
        answer: "真"
    }, {
        id: "652",
        tips: "打一字",
        question: "说话十分体贴 ",
        answer: "谢"
    }, {
        id: "653",
        tips: "打一字",
        question: "一直不用靠旁边 ",
        answer: "膀"
    }, {
        id: "654",
        tips: "打一成语",
        question: "大雪纷飞 ",
        answer: "天花乱坠"
    }, {
        id: "655",
        tips: "打一水果",
        question: "身穿黄大褂，样子像月牙，吃着甜又软，人人都爱它 ",
        answer: "香蕉"
    }, {
        id: "656",
        tips: "打一字",
        question: "见了还依旧 ",
        answer: "阳"
    }, {
        id: "657",
        tips: "打一成语",
        question: "固 ",
        answer: "食古不化"
    }, {
        id: "658",
        tips: "打一食物",
        question: "生在世上嫩又青，死时要被火来熏。死后再被开水烫，要说苦命真苦命。 ",
        answer: "茶叶"
    }, {
        id: "659",
        tips: "打一字",
        question: "清闲之中来市集 ",
        answer: "闹"
    }, {
        id: "660",
        tips: "打一成语",
        question: "举报经查尽实情 ",
        answer: "弹无虚发"
    }, {
        id: "661",
        tips: "打一成语",
        question: "独坐黄昏谁是伴 ",
        answer: "日下无双"
    }, {
        id: "662",
        tips: "打一成语",
        question: "花间一壶酒 ",
        answer: "唯我独尊"
    }, {
        id: "663",
        tips: "打一成语",
        question: "尽里老谜 ",
        answer: "别开生面"
    }, {
        id: "664",
        tips: "打一字",
        question: "且在乡下搞改革 ",
        answer: "组"
    }, {
        id: "665",
        tips: "打一字",
        question: "没头就是早，早上长青草，牛羊见它乐，禾苗见它恼。 ",
        answer: "草"
    }, {
        id: "666",
        tips: "打一成语",
        question: "只因有孕显肥胖 ",
        answer: "宽大为怀"
    }, {
        id: "667",
        tips: "打多字成语",
        question: "祖传戏法",
        answer: "万变不离其宗"
    }, {
        id: "668",
        tips: "打一字",
        question: "久雨初晴 ",
        answer: "昨"
    }, {
        id: "669",
        tips: "打一字",
        question: "不退洪水不罢休 ",
        answer: "共"
    }, {
        id: "670",
        tips: "打一字",
        question: "六人不足，八人有余。 ",
        answer: "灭"
    }, {
        id: "671",
        tips: "打一字",
        question: "粗看一个口，细看四个口，其实有十口，农村到处有。 ",
        answer: "田"
    }, {
        id: "672",
        tips: "打一字",
        question: "人去即可 ",
        answer: "何"
    }, {
        id: "673",
        tips: "打一自然物",
        question: "小河里，花儿多，只能看，不能摸，谁种的，风婆婆。 ",
        answer: "浪花"
    }, {
        id: "674",
        tips: "打一成语",
        question: "该牛魔王出丑 ",
        answer: "当场出丑"
    }, {
        id: "675",
        tips: "打一成语",
        question: "点睛破壁 ",
        answer: "活龙活现"
    }, {
        id: "676",
        tips: "打一字",
        question: "开始向后仰 ",
        answer: "印"
    }, {
        id: "677",
        tips: "打一字",
        question: "您既不安心，干脆不留人。 ",
        answer: "尔"
    }, {
        id: "678",
        tips: "打一字",
        question: "三三两两能言语 （打一少笔字）",
        answer: "计"
    }, {
        id: "679",
        tips: "打一成语",
        question: "你上我下 ",
        answer: "此起彼落"
    }, {
        id: "680",
        tips: "打一生活用品",
        question: "脸上亮光光，坐在桌子上，有人跑过来，替他照个相。 ",
        answer: "镜子"
    }, {
        id: "681",
        tips: "打一成语",
        question: "话说玄德初用兵 ",
        answer: "聊备一格"
    }, {
        id: "682",
        tips: "打一成语",
        question: "晁天王天下稀奇 ",
        answer: "盖世无双"
    }, {
        id: "683",
        tips: "打一成语",
        question: "枕头 ",
        answer: "置之脑后"
    }, {
        id: "684",
        tips: "打一字",
        question: "充耳不闻 ",
        answer: "龙"
    }, {
        id: "685",
        tips: "打一字",
        question: "赵后虽可爱，君迷必有害。 ",
        answer: "钱"
    }, {
        id: "686",
        tips: "打一字",
        question: "会走还须人帮助 ",
        answer: "运"
    }, {
        id: "687",
        tips: "打一字",
        question: "全凭点滴集资财 ",
        answer: "金"
    }, {
        id: "688",
        tips: "打一成语",
        question: "",
        answer: ""
    }, {
        id: "689",
        tips: "打一体育运动",
        question: "十人管两筐，个个运瓜忙，明知筐无底，偏往筐里装。 ",
        answer: "打篮球"
    }, {
        id: "690",
        tips: "打一武器",
        question: "身体小，脑袋大，一生只说一句话，尾巴一拉声音响，敌人听了就害怕。 ",
        answer: "手榴弹"
    }, {
        id: "691",
        tips: "打一成语",
        question: "偏见 ",
        answer: "侧目而视"
    }, {
        id: "692",
        tips: "打一成语",
        question: "傍晚到达目的地 ",
        answer: "日暮途穷"
    }, {
        id: "693",
        tips: "打一物",
        question: "凉有人吃，热有人吃，烧开煮熟没人吃。 ",
        answer: "酒"
    }, {
        id: "694",
        tips: "打一字",
        question: "一直在作证 ",
        answer: "让"
    }, {
        id: "695",
        tips: "打一成语",
        question: "九寸 ",
        answer: "得寸进尺"
    }, {
        id: "696",
        tips: "打一字",
        question: "音乐声声友人来 ",
        answer: "朋"
    }, {
        id: "697",
        tips: "打一人体器官",
        question: "左边宫娥一把扇，右边宫娥一把扇，中间隔着皇后娘娘不得见。 ",
        answer: "耳"
    }, {
        id: "698",
        tips: "打一成语",
        question: "足球门 ",
        answer: "网开一面"
    }, {
        id: "699",
        tips: "打一科技物",
        question: "一门高射炮，专把宇宙照，日月和星辰，一个不漏掉。 ",
        answer: "天文望远镜"
    }, {
        id: "700",
        tips: "打一成语",
        question: "毛曰 ",
        answer: "翻手为云"
    }, {
        id: "701",
        tips: "打一字",
        question: "一个可盖房，一个能装粮，要是在一起，就能保边疆。 ",
        answer: "枪"
    }, {
        id: "702",
        tips: "打一民间艺术",
        question: "敲锣打鼓闹纷纷，半似兽来半似人，内外生成六只耳，外耳不闻内耳闻。 ",
        answer: "舞狮"
    }, {
        id: "703",
        tips: "打一自然现象",
        question: "云中好似战鼓擂，不见鼓手不见槌，夏日鼓声如炮响，寒冬反倒声全没。 ",
        answer: "雷"
    }, {
        id: "704",
        tips: "打一成语",
        question: "耻与白衣秀士为伍 ",
        answer: "不伦不类"
    }, {
        id: "705",
        tips: "打一字",
        question: "年已古稀 ",
        answer: "车"
    }, {
        id: "706",
        tips: "打一成语",
        question: "岳父恰是上司 ",
        answer: "泰山压顶"
    }, {
        id: "707",
        tips: "打一生活物",
        question: "头尖身细白如银，上秤没有半毫分，眼睛长在屁股上，只认衣衫不认人。 ",
        answer: "针"
    }, {
        id: "708",
        tips: "打一成语",
        question: "曹雪芹无钱买灯油 ",
        answer: "白日做梦"
    }, {
        id: "709",
        tips: "打一字",
        question: "一动就出血 ",
        answer: "而"
    }, {
        id: "710",
        tips: "打一行为活动",
        question: "半天不动，忽然一动，上面欢喜，下面好痛。 ",
        answer: "钓鱼"
    }, {
        id: "711",
        tips: "打一字",
        question: "四点二十分 ",
        answer: "注"
    }, {
        id: "712",
        tips: "打一字",
        question: "十月十日双十节 ",
        answer: "明"
    }, {
        id: "713",
        tips: "打一字",
        question: "抽刀断流 ",
        answer: "渐"
    }, {
        id: "714",
        tips: "打一成语",
        question: "山雨 ",
        answer: "出头露面"
    }, {
        id: "715",
        tips: "打一字",
        question: "一个字，尾巴弯，虽有用，扔一边。 ",
        answer: "甩"
    }, {
        id: "716",
        tips: "打一字",
        question: "择吉日命女结婚 ",
        answer: "纸"
    }, {
        id: "717",
        tips: "打一成语",
        question: "提起领导无话谈 ",
        answer: "说长道短"
    }, {
        id: "718",
        tips: "打一自然物",
        question: "有时像鹅毛，有时像白面，冬季满天飞，夏天看不见。 ",
        answer: "雪花"
    }, {
        id: "719",
        tips: "打一成语",
        question: "老张老陈 ",
        answer: "屡见不鲜"
    }, {
        id: "720",
        tips: "打一交通工具",
        question: "远看像城墙，近看一排房，日行千里路，能载万石粮。 ",
        answer: "火车"
    }, {
        id: "721",
        tips: "打一字",
        question: "果木砍伐山形变 ",
        answer: "画"
    }, {
        id: "722",
        tips: "打一动物",
        question: "身披铁甲摆威风，横行霸道充英雄，遇到敌人决一战，紧紧钳住不放松。 ",
        answer: "螃蟹"
    }, {
        id: "723",
        tips: "打一字",
        question: "有人扶便得 ",
        answer: "更"
    }, {
        id: "724",
        tips: "打一字",
        question: "有土崎岖不平，有足不良于行，有水风浪不停。 ",
        answer: "皮"
    }, {
        id: "725",
        tips: "打一成语",
        question: "今日不搬家",
        answer: "改天换地"
    }, {
        id: "726",
        tips: "打一字",
        question: "差点一寸 ",
        answer: "于"
    }, {
        id: "727",
        tips: "打一成语",
        question: "戚家军攻无不克 ",
        answer: "哀兵必胜"
    }, {
        id: "728",
        tips: "打一字",
        question: "有口才连升两级 ",
        answer: "团"
    }, {
        id: "729",
        tips: "打一成语",
        question: "读书破万卷 ",
        answer: "神来之笔"
    }, {
        id: "730",
        tips: "打一成语",
        question: "今夜声声犹复念 ",
        answer: "兢兢业业"
    }, {
        id: "731",
        tips: "打一文具",
        question: "方方正正像块糖，有方也有长，帮助小朋友，学习不怕脏。 ",
        answer: "橡皮"
    }, {
        id: "732",
        tips: "打一生活物",
        question: "一物生得巧，地位比人高，戴上御风寒，脱下有礼貌。 ",
        answer: "帽子"
    }, {
        id: "733",
        tips: "打一成语",
        question: "体育再三夺冠 ",
        answer: "身怀六甲"
    }, {
        id: "734",
        tips: "打一成语",
        question: "才上喜马拉雅，又到长城站。 ",
        answer: "登峰造极"
    }, {
        id: "735",
        tips: "打一物",
        question: "小小一根早竹，细细一根头发，走到半空去碰杀。 ",
        answer: "冲天炮"
    }, {
        id: "736",
        tips: "打一成语",
        question: "中秋菊盛开 ",
        answer: "花好月圆"
    }, {
        id: "737",
        tips: "打一成语",
        question: "已购航空票 ",
        answer: "有机可乘"
    }, {
        id: "738",
        tips: "打一成语",
        question: "只怨放翁把妻休 ",
        answer: "光怪陆离"
    }, {
        id: "739",
        tips: "打一自然现象",
        question: "身穿红绿彩绸，住在万国九洲，来了人人知道，去时官府难留。 ",
        answer: "彩虹"
    }, {
        id: "740",
        tips: "打一自然现象",
        question: "高高山上一堆灰，千把锄头扒不开。 ",
        answer: "雾"
    }, {
        id: "741",
        tips: "打一字",
        question: "挖去方砖补水泥 ",
        answer: "呢"
    }, {
        id: "742",
        tips: "打一日常用品",
        question: "生时正值新年头，不知和谁结怨仇。每天挖我一块肉，挖到年终命也休。 ",
        answer: "日历"
    }, {
        id: "743",
        tips: "打一文具",
        question: "一物不太大，走路头朝下，不吃人间粮，能说天下话。 ",
        answer: "笔"
    }, {
        id: "744",
        tips: "打一字",
        question: "兼听则明 ",
        answer: "总"
    }, {
        id: "745",
        tips: "打一成语",
        question: "提笔断句读 ",
        answer: "点到为止"
    }, {
        id: "746",
        tips: "打一字",
        question: "正数人七十，倒数十七人，不管怎么数，都是中国人。 ",
        answer: "华"
    }, {
        id: "747",
        tips: "打一字",
        question: "得手怀里抱，给脚想溜掉，有火就炸响，遇水就冒泡。 ",
        answer: "包"
    }, {
        id: "748",
        tips: "打一物",
        question: "长长方方一块田，田里果子万万千。要想知道有多少，噼里啪啦数一遍。 ",
        answer: "算盘"
    }, {
        id: "749",
        tips: "打一乐器",
        question: "长长一幢房，朝天两排窗，一阵风吹过，歌声扬四方。 ",
        answer: "口琴"
    }, {
        id: "750",
        tips: "打一字",
        question: "用手遮住半边脸 ",
        answer: "捡"
    }, {
        id: "751",
        tips: "打一字",
        question: "少生为妙 ",
        answer: "女"
    }, {
        id: "752",
        tips: "打一字",
        question: "一边绿油油，一边红彤彤，左边怕害虫，右边怕见水。 ",
        answer: "秋"
    }, {
        id: "753",
        tips: "打一生活物",
        question: "兄弟二人面对面，一样衣裳一样脸，一个会说话，一个是哑巴。 ",
        answer: "镜子"
    }, {
        id: "754",
        tips: "打一自然物",
        question: "乌云里面把身藏，不知它是啥模样，它的脾气特别暴，生起气来隆隆叫。 ",
        answer: "雷电"
    }, {
        id: "755",
        tips: "打一字",
        question: "不冷不热一声问 ",
        answer: "温"
    }, {
        id: "756",
        tips: "打一字",
        question: "丢头去尾 ",
        answer: "么"
    }, {
        id: "757",
        tips: "打一成语",
        question: "说走就走 ( 打一成语)",
        answer: "言行一致"
    }, {
        id: "758",
        tips: "打一成语",
        question: "跷跷板 ",
        answer: "此起彼伏"
    }, {
        id: "759",
        tips: "打一字",
        question: "山东日出 ",
        answer: "鱼"
    }, {
        id: "760",
        tips: "打一成语",
        question: "光棍无赖 ",
        answer: "独木难支"
    }, {
        id: "761",
        tips: "打一字",
        question: "猜谜已入迷 ",
        answer: "言"
    }, {
        id: "762",
        tips: "打一成语",
        question: "三伏天打哆嗦 ",
        answer: "不寒而栗"
    }, {
        id: "763",
        tips: "打一字",
        question: "出言有误听无声 ",
        answer: "吴"
    }, {
        id: "764",
        tips: "打一生活物",
        question: "俺家一个哥哥，讨个黑面老婆，天天挺着大肚，孩子不养一个。 ",
        answer: "铁锅"
    }, {
        id: "765",
        tips: "打一自然物",
        question: "一根树儿矮又短，上面挂的金银果，过路先生莫摘我，太阳出来我会躲。 ",
        answer: "露"
    }, {
        id: "766",
        tips: "打一家居",
        question: "有脚不会走，八个兄弟碰头要吃酒，人人见我要伛一伛。 ",
        answer: "椅子"
    }, {
        id: "767",
        tips: "打一成语",
        question: "逗得母亲乐呵呵 ",
        answer: "哄堂大笑"
    }, {
        id: "768",
        tips: "打一字",
        question: "十分高大，既抢又霸。 ",
        answer: "夺"
    }, {
        id: "769",
        tips: "打一成语",
        question: "穿黑衣者共三人 ",
        answer: "乌合之众"
    }, {
        id: "770",
        tips: "打一字",
        question: "一一上台作演讲 ",
        answer: "云"
    }, {
        id: "771",
        tips: "打一字",
        question: "男女同行 ",
        answer: "可"
    }, {
        id: "772",
        tips: "打一字",
        question: "人生有离合，爱心永不变。 ",
        answer: "牵"
    }, {
        id: "773",
        tips: "打一字",
        question: "交错而行 ",
        answer: "六"
    }, {
        id: "774",
        tips: "打一乐器",
        question: "一排牙齿几十个，黑的少来白的多，十个小孩去跳舞，又唱哆来咪法唆。 ",
        answer: "钢琴"
    }, {
        id: "775",
        tips: "打一生活物",
        question: "一头光来一头毛，一头干来一头潮，早晚拿起扫石缝，看你病菌往哪跑。 ",
        answer: "牙刷"
    }, {
        id: "776",
        tips: "打一成语",
        question: "好朋友晓得那事 ",
        answer: "知己知彼"
    }, {
        id: "777",
        tips: "打一字",
        question: "一来就成王 （打一多笔字）",
        answer: "城"
    }, {
        id: "778",
        tips: "打一字",
        question: "小两口哭成一团 ",
        answer: "器"
    }, {
        id: "779",
        tips: "打一成语",
        question: "墓碑 ",
        answer: "人死留名"
    }, {
        id: "780",
        tips: "打一成语",
        question: "十以内的算术 ",
        answer: "屈指可数"
    }, {
        id: "781",
        tips: "打一字",
        question: "唐虞有，尧舜无；商周有，汤武无；古文有，今文无。 ",
        answer: "口"
    }, {
        id: "782",
        tips: "打二字民俗名词",
        question: "十二个头六只角，三十六只脚，人人都有份，个个猜勿着。 ",
        answer: "生肖"
    }, {
        id: "783",
        tips: "打一成语",
        question: "手起刀落怎忍看 ",
        answer: "不顾一切"
    }, {
        id: "784",
        tips: "打一字",
        question: "田里跑到田外，不作古字猜。 ",
        answer: "叶"
    }, {
        id: "785",
        tips: "打一字",
        question: "无话不谈 ",
        answer: "炎"
    }, {
        id: "786",
        tips: "打一成语",
        question: "何虎头而蛇尾耶 ",
        answer: "当牛做马"
    }, {
        id: "787",
        tips: "打一字",
        question: "一下降低成本 ",
        answer: "未"
    }, {
        id: "788",
        tips: "打一字",
        question: "竹儿遮着天，龙儿藏下面，鸟儿里边叫，兔儿把家安。 ",
        answer: "笼"
    }, {
        id: "789",
        tips: "打一动作",
        question: "先作一个揖，再跪下求你，你若不出来，我就不站起。 ",
        answer: "求签"
    }, {
        id: "790",
        tips: "打一字",
        question: "用心改革方能成 ",
        answer: "周"
    }, {
        id: "791",
        tips: "打一字",
        question: "天上挂着两残月 ",
        answer: "丽"
    }, {
        id: "792",
        tips: "打一成语",
        question: "要带头让座 ",
        answer: "三十而立"
    }, {
        id: "793",
        tips: "打一字",
        question: "加上了方的，反而成了圆的。 ",
        answer: "员"
    }, {
        id: "794",
        tips: "打一字",
        question: "驱马离去 ",
        answer: "区"
    }, {
        id: "795",
        tips: "打一字",
        question: "出色的，须先采纳。 ",
        answer: "彩"
    }, {
        id: "796",
        tips: "打一成语",
        question: "偶然失败 ",
        answer: "出奇制胜"
    }, {
        id: "797",
        tips: "打一乐器",
        question: "三脚大怪物，牙齿几十颗，肚里藏钢丝，嘴里会唱歌。 ",
        answer: "钢琴"
    }, {
        id: "798",
        tips: "打一字",
        question: "砍去左边是树，砍去右边是树，砍去中间是树，只有不砍不是树。 ",
        answer: "彬"
    }, {
        id: "799",
        tips: "打一字",
        question: "先写上，后写下。 ",
        answer: "告"
    }, {
        id: "800",
        tips: "打一成语",
        question: "囊括全部冠军 ",
        answer: "片甲不留"
    } ]), i(t, "answer_data_05", [ "彩", "虹", "哈", "镜", "太", "阳", "能", "雷", "电", "灯", "塔", "云", "嘴", "瓜", "子", "橄", "榄", "灯", "笼", "眼", "镜", "舞", "狮", "机", "关", "枪", "皮", "影", "戏", "盐", "胡", "琴", "月", "亮", "鸡", "毛", "掸", "非", "轿", "包", "砚", "多", "级", "火", "箭", "手", "指", "毛", "笔", "帆", "船", "蚊", "子", "生", "肖", "钓", "鱼", "秋", "千", "华", "野", "兔", "万", "香", "蕉", "布", "袋", "舞", "狮", "霜", "粽", "鲁", "皮", "军", "号", "针", "打", "喷", "嚏", "风", "扇", "雷", "太", "阳", "能", "水", "镜", "子", "米", "牙", "齿", "腰", "带", "橡", "皮", "降", "落", "伞", "石", "榴", "地", "球", "仪", "篷", "船", "彗", "星", "磨", "相", "鞋", "葡", "萄", "彩", "虹", "风", "蜡", "烛", "枕", "头", "雨", "伞", "做", "梦", "衣", "架", "电", "灯", "雷", "毛", "笔", "冲", "天", "炮", "温", "度", "计", "锯", "舌", "头", "雨", "伞", "养", "影", "灯", "塔", "枕", "头", "嘴", "唇", "冰", "凌", "螺", "丝", "钉", "豆", "腐", "毽", "手", "风", "琴", "月", "亮" ]), 
    i(t, "puzzle_data_05", [ {
        id: "801",
        tips: "打一字",
        question: "而今三请才露脸 ",
        answer: "面"
    }, {
        id: "802",
        tips: "打一成语",
        question: "无法想无法说 ",
        answer: "不可思议"
    }, {
        id: "803",
        tips: "打一昆虫",
        question: "头戴红纱帽，身穿黑外套，登台做手势，走路唱小调。 ",
        answer: "苍蝇"
    }, {
        id: "804",
        tips: "打一乐器",
        question: "牵牛花，嗓门大，报军情，把令下。 ",
        answer: "军号"
    }, {
        id: "805",
        tips: "打一成语",
        question: "离奇 ",
        answer: "大有可为"
    }, {
        id: "806",
        tips: "打一字",
        question: "损耗未能一下降 ",
        answer: "毛"
    }, {
        id: "807",
        tips: "打一成语",
        question: "人多嘴杂唱不成歌 ",
        answer: "众口难调"
    }, {
        id: "808",
        tips: "打一字",
        question: "不在北京在南京 ",
        answer: "小"
    }, {
        id: "809",
        tips: "打一成语",
        question: "写得不好，背得不熟。 ",
        answer: "文弱书生"
    }, {
        id: "810",
        tips: "打一字",
        question: "上边水中居民，下边远高云层，上边有骨有肉，下边有光无暗。 ",
        answer: "鲁"
    }, {
        id: "811",
        tips: "打一字",
        question: "谁知无人发一言 ",
        answer: "主"
    }, {
        id: "812",
        tips: "打一水果",
        question: "黄泥罐里装珍珠，口小肚大拿不出，打破泥罐拿出来，酸酸甜甜味十足。 ",
        answer: "石榴"
    }, {
        id: "813",
        tips: "打一字",
        question: "一一去掉坏现象 ",
        answer: "环"
    }, {
        id: "814",
        tips: "打一字",
        question: "两点前来表决心 ",
        answer: "快"
    }, {
        id: "815",
        tips: "打一食物",
        question: "生在广寒宫，睡在被当中；城里有座水晶宫，木家小姐在当中。 ",
        answer: "冰棍"
    }, {
        id: "816",
        tips: "打一字",
        question: "各自得钱却叫穷 ",
        answer: "贫"
    }, {
        id: "817",
        tips: "打一自然现象",
        question: "轻清为天天不清，重浊为地地不明，中间为人人难见，杂以万类难找寻。 ",
        answer: "雾"
    }, {
        id: "818",
        tips: "打一成语",
        question: "观念太僵化 ",
        answer: "目瞪口呆"
    }, {
        id: "819",
        tips: "打一成语",
        question: "青面兽若不走，就一定将它拿下 ",
        answer: "志在必得"
    }, {
        id: "820",
        tips: "打一物",
        question: "一串一串纸娃娃，身上穿的红褂褂，一着火飞上天，劈里啪啦开了花。 ",
        answer: "鞭炮"
    }, {
        id: "821",
        tips: "打一成语",
        question: "月沉花谢事堪伤 ",
        answer: "落落寡欢"
    }, {
        id: "822",
        tips: "打一物",
        question: "头戴圆帽子，具体像柱子，平时不出门，出门就发火。 ",
        answer: "火柴"
    }, {
        id: "823",
        tips: "打一字",
        question: "排名最后枉费工 ",
        answer: "末"
    }, {
        id: "824",
        tips: "打一生活物",
        question: "兄弟两个一般大，出来时候不说话，每逢吃饭他先到，做活时候不见他。 ",
        answer: "筷子"
    }, {
        id: "825",
        tips: "打一物",
        question: "个儿不算大，帮着人看家， 身子用铁打，辫子门上挂。  ",
        answer: "锁"
    }, {
        id: "826",
        tips: "打一字",
        question: "先品后饮，大话不停。 ",
        answer: "吹"
    }, {
        id: "827",
        tips: "打一物",
        question: "有山不见石和崖，有地不见土和沙，江河湖海不通船，外出旅行全靠它。 ",
        answer: "地图"
    }, {
        id: "828",
        tips: "打一蔬菜",
        question: "身子苗条白似银，头上金钗两瓣分，问她衣服何处去，绿袍脱在水晶宫。 ",
        answer: "豆芽"
    }, {
        id: "829",
        tips: "打一成语",
        question: "狼烟蔽日",
        answer: "烽火连天"
    }, {
        id: "830",
        tips: "打一字",
        question: "听声音不熟 ",
        answer: "生"
    }, {
        id: "831",
        tips: "打一成语",
        question: "家务事 ",
        answer: "无所不为"
    }, {
        id: "832",
        tips: "打一成语",
        question: "张果老骑驴 ",
        answer: "背道而驰"
    }, {
        id: "833",
        tips: "打一成语",
        question: "危楼高百尺 ",
        answer: "摇摇欲坠"
    }, {
        id: "834",
        tips: "打一成语",
        question: "聊起猜谜笑颜开 ",
        answer: "谈虎色变"
    }, {
        id: "835",
        tips: "打一字",
        question: "四个男人胆量大，敢把太阳踩脚下，若是旁边遇到水，还敢钻到水底下。 ",
        answer: "替"
    }, {
        id: "836",
        tips: "打一成语",
        question: "细小疑问能回答 ",
        answer: "大惑不解"
    }, {
        id: "837",
        tips: "打一字",
        question: "加上了嘴巴，反而说不出。 ",
        answer: "亚"
    }, {
        id: "838",
        tips: "打一字",
        question: "一点爱心献父兄 ",
        answer: "宿"
    }, {
        id: "839",
        tips: "打一成语",
        question: "真心想走 ",
        answer: "三思而行"
    }, {
        id: "840",
        tips: "打一字",
        question: "次子相随送出头 ",
        answer: "远"
    }, {
        id: "841",
        tips: "打一字",
        question: "未来大好 ",
        answer: "美"
    }, {
        id: "842",
        tips: "打一字",
        question: "一知半解得十分 ",
        answer: "短"
    }, {
        id: "843",
        tips: "打一成语",
        question: "妾至妻仇视 ",
        answer: "如临大敌"
    }, {
        id: "844",
        tips: "打一成语",
        question: "人而无信 ",
        answer: "言犹在耳"
    }, {
        id: "845",
        tips: "打一成语",
        question: "怎生得黑 ",
        answer: "不明不白"
    }, {
        id: "846",
        tips: "打一字",
        question: "是土不叫土，用它把水堵，水边它常在，有洞必须堵。 ",
        answer: "堤"
    }, {
        id: "847",
        tips: "打一字",
        question: "黯然失色日落去 ",
        answer: "立"
    }, {
        id: "848",
        tips: "打一成语",
        question: "急于出家 ",
        answer: "俗不可耐"
    }, {
        id: "849",
        tips: "打一物",
        question: "有眼看不见，有口不说话，长得白又胖，最怕见阳光。 ",
        answer: "雪人"
    }, {
        id: "850",
        tips: "打一字",
        question: "兰开二度结同心 ",
        answer: "豆"
    }, {
        id: "851",
        tips: "打一字",
        question: "双方大变样 ",
        answer: "哈"
    }, {
        id: "852",
        tips: "打一老式物件",
        question: "肉在里，骨在外，背脊生疮碗样大。 ",
        answer: "斗笠"
    }, {
        id: "853",
        tips: "打一自然物",
        question: "扭扭弯弯一把弓，柳叶打把撒西东，五黄六月常常有，冬九腊月隐无踪。 ",
        answer: "彩虹"
    }, {
        id: "854",
        tips: "打一物",
        question: "生来无爹娘，却被叫娃娃，专找小孩玩，儿童喜欢它。 ",
        answer: "布娃娃"
    }, {
        id: "855",
        tips: "打一成语",
        question: "一两 ",
        answer: "天下无双"
    }, {
        id: "856",
        tips: "打一工具",
        question: "尖来尖如箭，快来快如刀，腰里插根销，尾巴长来攀着腰。 ",
        answer: "剪刀"
    }, {
        id: "857",
        tips: "打一字",
        question: "一分为二看是非 ",
        answer: "丰"
    }, {
        id: "858",
        tips: "打一字",
        question: "倾心携手定有日 ",
        answer: "指"
    }, {
        id: "859",
        tips: "打一成语",
        question: "妲己娘娘 ",
        answer: "人面兽心"
    }, {
        id: "860",
        tips: "打一成语",
        question: "感情不外露者获奖 ",
        answer: "哭笑不得"
    }, {
        id: "861",
        tips: "打一食物",
        question: "去种没有种，去锄没有垅，生吃嘎嘣响，熟吃没声音。 ",
        answer: "盐"
    }, {
        id: "862",
        tips: "打一字",
        question: "西部开发不容缓 ",
        answer: "隐"
    }, {
        id: "863",
        tips: "打一军事用品",
        question: "身上大环套小环，生来不怕挨子弹，天下多少神枪手，都要请它当裁判。 ",
        answer: "靶子"
    }, {
        id: "864",
        tips: "打一自然物",
        question: "风吹皮皱，雨落生疮，可以生吃，可以烧汤。 ",
        answer: "水"
    }, {
        id: "865",
        tips: "打一成语",
        question: "全部就业 ",
        answer: "不遗余力"
    }, {
        id: "866",
        tips: "打一字",
        question: "四连冠 ",
        answer: "宁"
    }, {
        id: "867",
        tips: "打一成语",
        question: "雨打螃蟹螃蟹跑 ",
        answer: "横行天下"
    }, {
        id: "868",
        tips: "打一军用物",
        question: "水面能行驶，海底能航行，行动很隐蔽，合格侦察兵。 ",
        answer: "潜水艇"
    }, {
        id: "869",
        tips: "打一字",
        question: "千万别后悔 ",
        answer: "惊"
    }, {
        id: "870",
        tips: "打一成语",
        question: "四六开 ",
        answer: "三三两两"
    }, {
        id: "871",
        tips: "打一成语",
        question: "孕妇莫再做手艺 ",
        answer: "身怀绝技"
    }, {
        id: "872",
        tips: "打一字",
        question: "晴空一色光闪闪 ",
        answer: "晃"
    }, {
        id: "873",
        tips: "打一成语",
        question: "耐字变射字 ",
        answer: "挺身而出"
    }, {
        id: "874",
        tips: "打一字",
        question: "相差一半，少来抬杠。 ",
        answer: "着"
    }, {
        id: "875",
        tips: "打一电器",
        question: "三把刀追一把刀，围绕圆心来赛跑，自从夏季追到秋，还是没能追得到。 ",
        answer: "电风扇"
    }, {
        id: "876",
        tips: "打一字",
        question: "清如水，明如月 ",
        answer: "晴"
    }, {
        id: "877",
        tips: "打一字",
        question: "种菜除草 ",
        answer: "采"
    }, {
        id: "878",
        tips: "打一文具",
        question: "白发满头，爱抹黑油，闲时戴帽，忙时光头。 ",
        answer: "毛笔"
    }, {
        id: "879",
        tips: "打一字",
        question: "一字左右有十口，凡是植物都有它。 ",
        answer: "叶"
    }, {
        id: "880",
        tips: "打一成语",
        question: "折枝为剑，飞叶伤人 ",
        answer: "草木皆兵"
    }, {
        id: "881",
        tips: "打一字",
        question: "贵贱都有份 ",
        answer: "贝"
    }, {
        id: "882",
        tips: "打一字",
        question: "变相回扣放桌下 ",
        answer: "操"
    }, {
        id: "883",
        tips: "打一生活物",
        question: "外国带来一朵花，有藤无叶会开花，人人说我花开好，三更半夜谢了花。 ",
        answer: "电灯泡"
    }, {
        id: "884",
        tips: "打一体育项目",
        question: "一个娃娃，台上游戏，她要过来，叫她回去。 ",
        answer: "乒乓球"
    }, {
        id: "885",
        tips: "打一成语",
        question: "说起致富脸飞霞 ",
        answer: "白发红颜"
    }, {
        id: "886",
        tips: "打一自然现象",
        question: "天黑黑来黑黑天，空中划过一条线，亮闪闪来闪闪亮，眨眼工夫就不见。 ",
        answer: "流星"
    }, {
        id: "887",
        tips: "打一成语",
        question: "巴士到站女士先行 ",
        answer: "下车伊始"
    }, {
        id: "888",
        tips: "打五字成语",
        question: "大有人在",
        answer: "一去不复返"
    }, {
        id: "889",
        tips: "打一生活物",
        question: "我的身体细又长，头长白毛身上光。从来就爱讲卫生，天天嘴里走两趟。 ",
        answer: "牙刷"
    }, {
        id: "890",
        tips: "打一字",
        question: "一一排查得结果 ",
        answer: "杏"
    }, {
        id: "891",
        tips: "打一字",
        question: "对人要真心不二 ",
        answer: "丛"
    }, {
        id: "892",
        tips: "打一成语",
        question: "高兴死了 ",
        answer: "含笑九泉"
    }, {
        id: "893",
        tips: "打一成语",
        question: "十二月二日留影 ",
        answer: "肝胆相照"
    }, {
        id: "894",
        tips: "打一物",
        question: "四角方方轻，有话在我身，二人不见面，背后说分明。 ",
        answer: "书信"
    }, {
        id: "895",
        tips: "打一玩具",
        question: "宝宝肚里无心肝，不吃奶奶不吃团，养到三年六个月，称称勿满一斤半。 ",
        answer: "洋娃娃"
    }, {
        id: "896",
        tips: "打一人体器官",
        question: "上下俩队兵，守在大门口，谁要跑进去，必定碎成粉。 ",
        answer: "牙齿"
    }, {
        id: "897",
        tips: "打一自然现象",
        question: "红绿一条龙，弯转好像弓，早晨挂在西，晚上挂在东。 ",
        answer: "虹"
    }, {
        id: "898",
        tips: "打一字",
        question: "职位调整心牵挂 ",
        answer: "聪"
    }, {
        id: "899",
        tips: "打一生活物",
        question: "两只燕子着地飞，早同去来夜同归，皇帝老子要我送，千金小姐要我随。 ",
        answer: "鞋子"
    }, {
        id: "900",
        tips: "打一生活用品",
        question: "一时吃饱总不饥，二人相思我便知，听尽人人知心话，不想人前多是非。 ",
        answer: "枕头"
    }, {
        id: "901",
        tips: "打一自然物",
        question: "一根大彩带，挂在西天外，不是风吹来，只因太阳晒。 ",
        answer: "彩虹"
    }, {
        id: "902",
        tips: "打一人体器官",
        question: "一个住这边，一个住那边，说话听得见，从小到老不见面。 ",
        answer: "耳朵"
    }, {
        id: "903",
        tips: "打一家用电器",
        question: "一只箱真奇怪，肮脏的进去，干净的出来。 ",
        answer: "洗衣机"
    }, {
        id: "904",
        tips: "打一物",
        question: "头大身长脖子细，它到田庄去学艺，杀了曹操一家人，单单留下苗广义。 ",
        answer: "锄头"
    }, {
        id: "905",
        tips: "打一成语",
        question: "周瑜迎亲 ",
        answer: "乔迁之喜"
    }, {
        id: "906",
        tips: "打一字",
        question: "一去就掌兵权 ",
        answer: "师"
    }, {
        id: "907",
        tips: "打一人体器官",
        question: "能吃又能喝，能说又能唱，人人都有它，天天都要用。 ",
        answer: "嘴"
    }, {
        id: "908",
        tips: "打一字",
        question: "我离开河南 ",
        answer: "象"
    }, {
        id: "909",
        tips: "打一成语",
        question: "放气球 ",
        answer: "不翼而飞"
    }, {
        id: "910",
        tips: "打一成语",
        question: "人口 ",
        answer: "一拍即合"
    }, {
        id: "911",
        tips: "打一成语",
        question: "高楼大厦天天起 ",
        answer: "层出不穷"
    }, {
        id: "912",
        tips: "打一字",
        question: "知识问答哪都有 ",
        answer: "口"
    }, {
        id: "913",
        tips: "打一成语",
        question: "多胎重罚让你怕 ",
        answer: "令人生畏"
    }, {
        id: "914",
        tips: "打一成语",
        question: "抢劫当场被抓住 ",
        answer: "在劫难逃"
    }, {
        id: "915",
        tips: "打一字",
        question: "雨一下，点点滴滴溅开。 ",
        answer: "巾"
    }, {
        id: "916",
        tips: "打一成语",
        question: "看到此服装，就想试一试 ",
        answer: "望眼欲穿"
    }, {
        id: "917",
        tips: "打一自然现象",
        question: "明又明，亮又亮，一团火球挂天上。冬天呆的时间短，夏天呆的时间长。",
        answer: "太阳"
    }, {
        id: "918",
        tips: "打一玩具",
        question: "小公鸡，不会叫，飞上脚背跳几跳，小朋友见了嘻嘻笑。 ",
        answer: "毽子"
    }, {
        id: "919",
        tips: "打一字",
        question: "退休之后儿顶替 ",
        answer: "仔"
    }, {
        id: "920",
        tips: "打一游戏",
        question: "相打不着手，叫喊不停口，赢了博虚名，输了偏有酒。 ",
        answer: "划拳"
    }, {
        id: "921",
        tips: "打一字",
        question: "古稀之年献爱心 ",
        answer: "军"
    }, {
        id: "922",
        tips: "打一字",
        question: "风里来，雨里去，一年到头奔前程。 ",
        answer: "稀"
    }, {
        id: "923",
        tips: "打一文具",
        question: "一个毛员外，喝水不吃菜，送客千里远，不出大门外。 ",
        answer: "毛笔"
    }, {
        id: "924",
        tips: "打一字",
        question: "七七鹊桥接两岸 ",
        answer: "互"
    }, {
        id: "925",
        tips: "打一字",
        question: "火速回来过中秋 ",
        answer: "种"
    }, {
        id: "926",
        tips: "打一物质",
        question: "来无影，去无踪，能传景，会传声。 ",
        answer: "电磁波"
    }, {
        id: "927",
        tips: "打一字",
        question: "有人发出不平声 ",
        answer: "厂"
    }, {
        id: "928",
        tips: "打一交通工具",
        question: "前两条腿，后两条腿，肚里还有两条腿。 ",
        answer: "轿子"
    }, {
        id: "929",
        tips: "打一生活物",
        question: "我有一朵花，能合又能发，不见花有叶，花根手中扎。 ",
        answer: "伞"
    }, {
        id: "930",
        tips: "打一电器",
        question: "小小一间房，只有一扇窗，唱歌又跳舞，天天变花样。 ",
        answer: "电视机"
    }, {
        id: "931",
        tips: "打一自然物",
        question: "没枝没叶没人种，一夜北风银花开，花儿随风漫天舞，房上地上全变白。 ",
        answer: "雪"
    }, {
        id: "932",
        tips: "打一植物",
        question: "去皮可吃，有皮可种，育苗以后，插在水里。 ",
        answer: "水稻"
    }, {
        id: "933",
        tips: "打一字",
        question: "不露头不闻悲声 ",
        answer: "杯"
    }, {
        id: "934",
        tips: "打一字",
        question: "草帽头上戴，身上六只嘴，太阳已下山。 ",
        answer: "曹"
    }, {
        id: "935",
        tips: "打一成语",
        question: "侯门鱼书传 ",
        answer: "深居简出"
    }, {
        id: "936",
        tips: "打一水果",
        question: "许多兄弟一个娘，人人穿着黄衣裳，个个身子都长弯，都有一副软心肠。 ",
        answer: "香蕉"
    }, {
        id: "937",
        tips: "打一成语",
        question: "平原门下客三千 ",
        answer: "胜友如云"
    }, {
        id: "938",
        tips: "打一运动项目",
        question: "双手摇，双脚跳，钻城门，跨索桥。 ",
        answer: "跳绳"
    }, {
        id: "939",
        tips: "打一物",
        question: "远看像个人，近看不是人，虽然不说话，鸟雀不敢近。 ",
        answer: "稻草人"
    }, {
        id: "940",
        tips: "打一成语",
        question: "玩罢二胡去聊天 ",
        answer: "拉拉扯扯"
    }, {
        id: "941",
        tips: "打一字",
        question: "不要出丑 ",
        answer: "物"
    }, {
        id: "942",
        tips: "打一字",
        question: "横竖在工作中 ",
        answer: "正"
    }, {
        id: "943",
        tips: "打一成语",
        question: "巨无霸、赵飞燕 ",
        answer: "重男轻女"
    }, {
        id: "944",
        tips: "打一乐器",
        question: "肚皮松松能伸缩，里面装的全是歌。 ",
        answer: "手风琴"
    }, {
        id: "945",
        tips: "打一字",
        question: "力争二人巧变化 ",
        answer: "伤"
    }, {
        id: "946",
        tips: "打一物",
        question: "红衣小姐上高台，五个姑娘扶上来，一阵心头痛，眼泪落满怀。 ",
        answer: "蜡烛"
    }, {
        id: "947",
        tips: "打二字娱乐项目",
        question: "能吃没有嘴，能跳没有腿，有河没有水，走路不后悔。 ",
        answer: "象棋"
    }, {
        id: "948",
        tips: "打一字",
        question: "见虫称知了 ",
        answer: "单"
    }, {
        id: "949",
        tips: "打一成语",
        question: "重粉浓脂不害羞 ",
        answer: "厚颜无耻"
    }, {
        id: "950",
        tips: "打一字",
        question: "七上八下是幻觉 ",
        answer: "练"
    }, {
        id: "951",
        tips: "打一生活物",
        question: "驼背哥哥，牙齿多多，人人头上，慢慢经过。 ",
        answer: "梳子"
    }, {
        id: "952",
        tips: "打一字",
        question: "一方大打出手 ",
        answer: "奇"
    }, {
        id: "953",
        tips: "打一字",
        question: "一边是太阳，一边是月亮，两边合起来，到处亮堂堂。 ",
        answer: "明"
    }, {
        id: "954",
        tips: "打一食物",
        question: "泥里出生，加工成块，又白又嫩，街上有卖。 ",
        answer: "豆腐"
    }, {
        id: "955",
        tips: "打一字",
        question: "小桥流水风中没 ",
        answer: "沉"
    }, {
        id: "956",
        tips: "打一成语",
        question: "断肠人忆断肠人 ",
        answer: "痛定思痛"
    }, {
        id: "957",
        tips: "打一成语",
        question: "小李广回乡 ",
        answer: "荣归故里"
    }, {
        id: "958",
        tips: "打一生活物",
        question: "两只眼睛两条腿，用的时候看不见腿，不用的时候盘着腿。 ",
        answer: "眼镜"
    }, {
        id: "959",
        tips: "打一成语",
        question: "小儿戏说信陵君 ",
        answer: "童言无忌"
    }, {
        id: "960",
        tips: "打一成语",
        question: "便秘有原因 ",
        answer: "不解之缘"
    }, {
        id: "961",
        tips: "打一字",
        question: "天干五行居四位 ",
        answer: "钉"
    }, {
        id: "962",
        tips: "打一字",
        question: "盲目行动心变态 ",
        answer: "忙"
    }, {
        id: "963",
        tips: "打一成语",
        question: "婚姻自主不要媒妁 ",
        answer: "爱莫能助"
    }, {
        id: "964",
        tips: "打一成语",
        question: "克于俭省 ",
        answer: "节节胜利"
    }, {
        id: "965",
        tips: "打一成语",
        question: "宫商角羽 ",
        answer: "五音不全"
    }, {
        id: "966",
        tips: "打一字",
        question: "又添五双手 ",
        answer: "技"
    }, {
        id: "967",
        tips: "打一物",
        question: "高大汉，黑心肠，头在外面露，脚在屋里藏。 ",
        answer: "烟囱"
    }, {
        id: "968",
        tips: "打一成语",
        question: "节日的焰火 ",
        answer: "五彩缤纷"
    }, {
        id: "969",
        tips: "打一字",
        question: "蟾宫告急 ",
        answer: "脆"
    }, {
        id: "970",
        tips: "打一电器",
        question: "前面来只船，舵手在上边，来时下小雨，走后路已干。 ",
        answer: "熨斗"
    }, {
        id: "971",
        tips: "打一自然物",
        question: "流流动动，动动流流，虽然无脚，游遍五洲。 ",
        answer: "云"
    }, {
        id: "972",
        tips: "打一字",
        question: "木在口中栽，非杏亦非呆，当做困字看，不算猜出来。 ",
        answer: "束"
    }, {
        id: "973",
        tips: "打一成语",
        question: "大圣故居遭洗劫 ",
        answer: "空洞无物"
    }, {
        id: "974",
        tips: "打一成语",
        question: "少小离家老大回 ",
        answer: "早出晚归"
    }, {
        id: "975",
        tips: "打一文具",
        question: "身上植物所生，头为动物所长，终年四季苦作，留下千古文章。 ",
        answer: "毛笔"
    }, {
        id: "976",
        tips: "打一成语",
        question: "两个小偷密谋 ",
        answer: "窃窃私语"
    }, {
        id: "977",
        tips: "打一成语",
        question: "大闹凌霄宝殿，脚踹森罗冥府。 ",
        answer: "惊天动地"
    }, {
        id: "978",
        tips: "打一自然物",
        question: "翩翩起舞白衣鸟，落到水里活不了。 ",
        answer: "雪"
    }, {
        id: "979",
        tips: "打一工具",
        question: "一个铁娃娃，屁股常挨打，吃的是木头，拉的是疙瘩。 ",
        answer: "凿子"
    }, {
        id: "980",
        tips: "打一字",
        question: "一官半职 ",
        answer: "耳"
    }, {
        id: "981",
        tips: "打一成语",
        question: "指鹿为马者做派，鞠躬尽瘁者操守 ",
        answer: "高风亮节"
    }, {
        id: "982",
        tips: "打一水果",
        question: "小蛇弯弯过，爬架又爬坡，结满水晶果，人说新疆多。 ",
        answer: "葡萄"
    }, {
        id: "983",
        tips: "打一成语",
        question: "将士车马炮全移位 ",
        answer: "按兵不动"
    }, {
        id: "984",
        tips: "打一字",
        question: "享乐在后 ",
        answer: "孙"
    }, {
        id: "985",
        tips: "打一字",
        question: "涉黑即罢官 ",
        answer: "出"
    }, {
        id: "986",
        tips: "打一字",
        question: "苏北冀中 ",
        answer: "苗"
    }, {
        id: "987",
        tips: "打一自然物",
        question: "水里生，水里长，一搂住，没四两。 ",
        answer: "水蒸气"
    }, {
        id: "988",
        tips: "打一自然物",
        question: "小白花，无人栽，一夜北风遍地开，无根无叶六个瓣，此花原从天上降。 ",
        answer: "雪花"
    }, {
        id: "989",
        tips: "打一字",
        question: "浪费点滴亦有错 ",
        answer: "齐"
    }, {
        id: "990",
        tips: "打一字",
        question: "顶尖高手实不多 ",
        answer: "少"
    }, {
        id: "991",
        tips: "打一字",
        question: "与人为善 ",
        answer: "食"
    }, {
        id: "992",
        tips: "打一字",
        question: "共有二横，猜二不对。 ",
        answer: "其"
    }, {
        id: "993",
        tips: "打一字",
        question: "汗水流尽 ",
        answer: "干"
    }, {
        id: "994",
        tips: "打一水果",
        question: "千弟兄，万弟兄，住的房子不透风。 ",
        answer: "石榴"
    }, {
        id: "995",
        tips: "打一字",
        question: "人生没有单行道 ",
        answer: "件"
    }, {
        id: "996",
        tips: "打一成语",
        question: "早晨日出，夜晚下雨。 ",
        answer: "明升暗降"
    }, {
        id: "997",
        tips: "打一成语",
        question: "余 ",
        answer: "半途而废"
    }, {
        id: "998",
        tips: "打一成语",
        question: "《木兰词》中妙句多 ",
        answer: "花言巧语"
    }, {
        id: "999",
        tips: "打一字",
        question: "分裂之前 ",
        answer: "衣"
    }, {
        id: "1000",
        tips: "打一字",
        question: "大小调整就明了 ",
        answer: "灯"
    } ]), t)
}), getApp().globalData.wnds.Wnd_Home = new r.default("/pages/index/index", 2), 
getApp().globalData.wnds.Wnd_Play = new r.default("/pages/play/play", 1), getApp().globalData.wnds.Wnd_Fight = new r.default("/pages/fight/fight", 3), 
getApp().globalData.wnds.Wnd_overFight = new r.default("/pages/overFight/overFight", 3), 
getApp().globalData.wnds.Wnd_prepare = new r.default("/pages/prepare/prepare", 1), 
getApp().globalData.wnds.Wnd_Jiecy = new r.default("/pages/jiecy/jiecy", 1), getApp().globalData.wnds.Wnd_Sel = new r.default("/pages/sel/sel", 1), 
getApp().globalData.wnds.Wnd_Level = new r.default("/pages/level/level", 1), getApp().globalData.wnds.Wnd_Number = new r.default("/pages/number/number", 1), 
getApp().globalData.wnds.Wnd_Signin = new r.default("/pages/signin/signin", 1), 
getApp().globalData.wnds.Wnd_Pay = new r.default("/pages/pay/pay", 1);