require('../common.less');
require('./index.less');
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
    $(".personalCenter").click(function(){
        location.href="../personalCenter/index.html";
    })
    var width=window.screen.width;
    if(width<700){
        console.log(width);
        $(".first-slide").attr("src","../images/6.jpg");
        $(".second-slide").attr("src","../images/7.jpg");
        $(".third-slide").attr("src","../images/8.jpg");
        $(".fourth-slide").attr("src","../images/9.jpg");
        $(".fifth-slide").attr("src","../images/10.jpg");
    }else{
        console.log(width);
        $(".first-slide").attr("src","../images/1.jpg");
        $(".second-slide").attr("src","../images/2.jpg");
        $(".third-slide").attr("src","../images/3.jpg");
        $(".fourth-slide").attr("src","../images/4.jpg");
        $(".fifth-slide").attr("src","../images/5.jpg");
    }
    var storage=window.localStorage;
    $(".quit").click(function(){
        //点击退出清除缓存并且跳转页面到登录
        storage.clear();
        location.href="../login/index.html";
    });
    if(storage.length==0){
        var loginId="";
        var token="";
    }else{
        //有数据，说明已经登录过了
        var loginId=storage.loginId;
        var token=storage.token;
        var user_name=storage.user_name;
        var type=storage.type;
        var quit=user_name+"|退出";
        $( ".personalCenter").parent().attr("style","display:block;");
        $( ".quit").parent().attr("style","display:block;");
        $( ".login").parent().attr("style","display:none;");
       $( ".quit").text(quit);
    }
    $(".btn").click(function(){
        // 显示填表，其余部分虚化
        if(width>=700){
            $(".alertWindow").attr("class","alertWindow pcWindow");
            $(".alertWindow").attr("style","display:block;");
        }else{
            $(".alertWindow").attr("class","alertWindow phoneWindow");
            $(".alertWindow").attr("style","display:block;");
        }

        $(".all").attr("style","opacity:0.5;");
        $(".btn-default").click(function(){
            $(".alertWindow").attr("style","display:none;");
            $(".all").attr("style","opacity:1;");
        })
        $(".btn-success").click(function(){

            // 填的内容提交
            var dream=$("input[name='dream']").val();
            var area=$("input[name='area']").val();
            var tongdian=$("input[name='tongdian']").val();
            var user_name=$("input[name='user_name']").val();
            var contact=$("input[name='contact']").val();
            var weixin=$("input[name='weixin']").val();
            var email=$("input[name='email']").val();
            if(dream==null||dream==""){
                alert("请输入梦想");
                return
            }
            if(area==null||area==""){
                alert("请输入领域/方向");
                return
            }
            if(tongdian==null||tongdian==""){
                alert("请输入痛点");
                return
            }
            if(user_name==null||user_name==""){
                alert("请输入姓名");
                return
            }
            var regContact = /^1\d{10}$/;
            if(regContact.test(contact)==false){
                alert("联系方式格式不正确");
                return;
            }
            if(contact==null||contact==""){
                alert("请输入联系方式");
                return
            }
            if(weixin==null||weixin==""){
                alert("请输入微信");
                return
            }
            var regEmail=/^[1-9a-zA-Z_]\w*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/;
            if(regEmail.test(email)==false){
                alert("邮箱格式不正确");
                return;
            }
            if(email==null||email==""){
                alert("请输入邮箱");
                return
            }
            var datas={
                dream:dream,
                area:area,
                tongdian:tongdian,
                user_name:user_name,
                contact:contact,
                weixin:weixin,
                email:email,
                loginId:loginId,
                token:token
            }
            var url="http://dreamcloud.work//sayDream";
            $.post(url,datas,function(res){
                console.log(res)
                if(res.code==1000){
                    alert(res.msg);
                    $(".alertWindow").attr("style","display:none;");
                    $(".all").attr("style","opacity:1;");
                    $("input[name='dream']").val("");
                    $("input[name='area']").val("");
                    $("input[name='tongdian']").val("");
                    $("input[name='user_name']").val("");
                    $("input[name='contact']").val("");
                    $("input[name='weixin']").val("");
                    $("input[name='email']").val("");
                }else{
                    alert(res.msg);
                }

            })
        })
    })
})