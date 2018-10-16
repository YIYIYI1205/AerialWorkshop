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
    //默认个人
    var type="personal";
    $("#personal").click(function(){
        $(".title a").attr("class","");
        $(this).attr("class","active");
        $(".personal").attr("style","display:block");
        $(".company").attr("style","display:none");
        type="personal";
    })
    $("#company").click(function(){
        $(".title a").attr("class","");
        $(this).attr("class","active");
        $(".personal").attr("style","display:none");
        $(".company").attr("style","display:block");
        type="company";
    })
    $(".button").click(function(){
        //隐藏的话先获取到的是个人的input，所以两个不能名字一样
        //先判断是个人还是企业
        var Type=$("a[class='active']").text()
        if(Type=="个人"){
            var email=$("input[name='email']").val();
            var tel=$("input[name='telephone']").val();
            var user_name=$("input[name='user_name']").val();
            var password=$("input[name='password']").val();
        }else{
            var email=$("input[name='company_email']").val();
            var tel=$("input[name='company_telephone']").val();
            var user_name=$("input[name='company_user_name']").val();
            var password=$("input[name='company_password']").val();
            var companyName=$("input[name='companyName']").val();
        }
        var regEmail=/^[1-9a-zA-Z_]\w*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/;
        if(regEmail.test(email)==false){
            alert("邮箱格式不正确");
            return;
        }
        if(email==null||email==""){
            alert("邮箱不能为空");
            return;
        }
        var regTel = /^1\d{10}$/;
        if(regTel.test(tel)==false){
            alert("手机号格式不正确");
            return;
        }
        if(tel==null||tel==""){
            alert("手机号不能为空");
            return;
        }
        if(user_name==null||user_name==""){
            alert("用户名不能为空");
            return;
        }
        if(password==null||password==""){
            alert("密码不能为空");
            return;
        }
        if(type=="company"){
            if(companyName==null||companyName==""){
                alert("公司/组织不能为空");
                return;
            }
        }
        // 取邮箱的类型
        var index=email.lastIndexOf("\@");
        var msg=email.substring(index+1,email.length)
        console.log(msg);
        // 发送请求，跳转页面
        var data={
            email:email,
            tel:tel,
            user_name:user_name,
            password:password,
            companyName:companyName,
            usertype:type,
        };
        var url="http://dreamcloud.work/user/register";
        $.get(url,data,function(res){
            console.log(res);
            if(res.code==1010){
                alert(res.msg);
                //跳转邮箱页面
                location.href="../email/index.html";

            }else{
                alert(res.msg);
            }
        })
    })
})