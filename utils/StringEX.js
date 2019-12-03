String.prototype.format = function() {
    var t = arguments;
    return this.replace(/\{(\d+)\}/g, function(r, n) {
        return t[n];
    });
}, String.prototype.hash = function() {
    for (var t = 5381, r = this.length - 1; r > -1; r--) t += (t << 5) + this.charCodeAt(r);
    return 2147483647 & t;
};