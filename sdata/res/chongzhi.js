function e(e, i, n) {
    return i in e ? Object.defineProperty(e, i, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[i] = n, e;
}

var i, n = {
    info: {
        key: "ID",
        keytype: "int"
    },
    head: [ "ID", "VipType", "Picture", "Name", "Num", "Price", "Present", "Xianshi" ],
    body: (i = {}, e(i, 1, [ 1, 0, "/Icon/Chongzhi/privilege_0.png", "2", 1e3, 2, 0, 1 ]), 
    e(i, 2, [ 2, 0, "/Icon/Chongzhi/privilege_0.png", "6", 3600, 6, 0, 1 ]), e(i, 3, [ 3, 0, "/Icon/Chongzhi/privilege_1.png", "8", 5e3, 8, 0, 1 ]), 
    e(i, 4, [ 4, 0, "/Icon/Chongzhi/privilege_2.png", "10", 7200, 10, 0, 1 ]), e(i, 5, [ 5, 0, "/Icon/Chongzhi/privilege_3.png", "12", 9e3, 12, 0, 1 ]), 
    e(i, 6, [ 6, 0, "/Icon/Chongzhi/privilege_4.png", "15", 11e3, 15, 0, 1 ]), e(i, 7, [ 7, 0, "/Icon/Chongzhi/privilege_5.png", "20", 16e3, 20, 0, 1 ]), 
    i)
};

module.exports = {
    data: n
};