require('./index.less');
require('../common.less');
$(function(){
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
    //独有的了解更多按钮
    $(".resolve").click(function(){
        location.href="../resolve/index.html";
    });
    $(".question").click(function(){
        location.href="../question/index.html";
    });
    var storage=window.localStorage;
    $(".quit").click(function(){
        //点击退出清除缓存并且跳转页面到登录
        storage.clear();
        location.href="../login/index.html";
    });
    if(storage.length==0){
        var loginId="";
    }else{
        //有数据，说明已经登录过了
        var loginId=storage.loginId;
        var token=storage.token;
        var user_name=storage.user_name;
        var type=storage.type;
        var quit=user_name+"|退出";
        $( ".quit").parent().attr("style","display:block;");
        $( ".login").parent().attr("style","display:none;");
        $( ".quit").text(quit);
    }
})