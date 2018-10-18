require('./index.less');
require('../common.less');
$(function () {
    $(".index").click(function(){
        location.href="../index/index.html"
    });
    $(".idea").click(function(){
        location.href="../idea/index.html"
    });
    $(".light").click(function(){
        location.href="../light/index.html"
    });
    $(".scope").click(function(){
        location.href="../scope/index.html"
    });
    $(".challenge").click(function(){
        location.href="../challenge/index.html"
    });
    $(".login").click(function(){
        location.href="../login/index.html";
    });
    $(".personalCenter").click(function(){
        location.href="../personalCenter/index.html";
    })
    // var url = location.search; //获取url中"?"符后的字串
    // var theRequest = new Object();
    // if (url.indexOf("?") != -1) {
    //     var str = url.substr(1);
    //     strs = str.split("&");
    //     for(var i = 0; i < strs.length; i ++) {
    //         theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    //     }
    // }
    // var msg=theRequest.msg;
    // $(".location").click(function(){
    //     location.href="https://mail/"+msg;
    // })
})