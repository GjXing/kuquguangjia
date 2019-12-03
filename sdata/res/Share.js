function e(e, r, a) {
    return r in e ? Object.defineProperty(e, r, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = a, e;
}

var r, a = {
    info: {
        key: "Sharetype",
        keytype: "int"
    },
    head: [ "Sharetype", "UserName", "Note", "Icon" ],
    body: (r = {}, e(r, 1, [ 1, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/1.png" ]), e(r, 2, [ 2, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/1.png" ]), 
    e(r, 3, [ 3, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/6.png" ]), e(r, 4, [ 4, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/16.png" ]), 
    e(r, 5, [ 5, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/16.png" ]), e(r, 6, [ 6, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/21.png" ]), 
    e(r, 7, [ 7, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/1.png" ]), e(r, 8, [ 8, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/1.png" ]), 
    e(r, 9, [ 9, 0, "轻松好玩的答题游戏，1亿人都在玩", "Share/img/1.png" ]), r)
};

module.exports = {
    data: a
};