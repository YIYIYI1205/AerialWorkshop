require('./index.less');
require('../common.less');
$(function () {
    //每次进入登录页面，先把localstorage清空
    var storage=window.localStorage;
    storage.clear();
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
    $(".button").click(function(){
        var user_name=$("input[name='user_name']").val();
        var password=$("input[name='password']").val();
        if(user_name==null||user_name==""){
            alert("请输入用户名");
            return
        }
        if(password==null||password==""){
            alert("请输入密码");
            return
        }
        var data={user_name:user_name,password:password};
        //发送请求，成功后跳转到首页
        var url="http://dreamcloud.work/user/login"
        $.get(url,data,function(res){
            console.log(res);
            if(res.code==1020){
                alert(res.msg);
                //把后台传过来的id和token和用户名存在localStorage
                var loginId=res.map.loginId;
                var token=res.map.token;
                var user_name=res.map.user_name;
                var type=res.map.type;
                storage["loginId"]=loginId;
                storage["token"]=token;
                storage["user_name"]=user_name;
                storage["type"]=type;
                location.href="../index/index.html";
            }else{
                alert(res.msg);
            }
        })
    })
    $(".left a").click(function(){
        location.href="../register/index.html"
    })
})