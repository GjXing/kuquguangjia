var o = require("./wxAccount");

!function() {
    o.wxAccount.loginToWxSucceededEvent.On(this, function(c) {
        console.log("user code (arg): " + c), console.log("user code (prop): " + o.wxAccount.code), 
        o.wxAccount.checkSession();
    }), o.wxAccount.getUserInfoSucceededEvent.On(this, function(c) {
        console.log("user info:"), console.log(c), console.log(o.wxAccount.userInfo);
    }), o.wxAccount.checkSessionSucceededEvent.On(this, function(o) {
        console.log("you are still logined.");
    }), o.wxAccount.login();
}();