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
    var storage=window.localStorage;
    $(".quit").click(function(){
        //点击退出清除缓存并且跳转页面到登录
        storage.clear();
        location.href="../login/index.html";
    });
    if(storage.length==0){
        alert("请登录");
        location.href="../login/index.html";
    }else{
        //有数据，说明已经登录过了
        var loginId=storage.loginId;
        var token=storage.token;
        var user_name=storage.user_name;
        var type=storage.type;
        var quit=user_name+"|退出";
        $(".quit").text(quit);
    }
    //登录类型是个人用户时，先向后台请求数据，显示到页面上，点击提交后，只向后台提交该问题（附带问题id）的答案
    if(type=='personal'){
        $(".question").attr("style","display:block;");
        $(".window").attr("style","display:none;");
        //从后台获取数据
        //点击提交后，只提交回答和该问题的id和用户id
        $(".btn").click(function(){
            var answer=$(this).prev().val();
            var questionId=$(this).prev().data('id');
            console.log(questionId);
            var datas={
                answer:answer,
                questionId:questionId,
                loginId:loginId,
                token:token
            }
            //把数据发送给后台
        })
    };
    //登录类型是企业用户时，直接显示企业页面，点击提交后向后台发送数据
    if(type=='company'){
        $(".question").attr("style","display:none;");
        $(".window").attr("style","display:block;");
        $(".btn-success").click(function(){
            var questionName=$("input[name='questionName']").val();
            var area=$("input[name='area']").val();
            var award=$("input[name='award']").val();
            var endDate=$("input[name='endDate']").val();
            var questionSummary=$("input[name='questionSummary']").val();
            var questionDetail=$("input[name='questionDetail']").val();
            var standard=$("input[name='standard']").val();
            if(questionName==""||questionName==null){
                alert("问题名称不能为空");
                return;
            };
            if(area==""||area==null){
                alert("领域不能为空");
                return;
            };
            if(award==""||award==null){
                alert("奖励不能为空");
                return;
            };
            if(endDate==""||endDate==null){
                alert("截止日期不能为空");
                return;
            };
            if(questionSummary==""||questionSummary==null){
                alert("问题概述不能为空");
                return;
            };
            if(questionDetail==""||questionDetail==null){
                alert("问题详述不能为空");
                return;
            };
            if(standard==""||standard==null){
                alert("交付标准不能为空");
                return;
            };
            //向后台发送请求，并传输用户loginId,token验证
            var datas={
                questionName:questionName,
                area:area,
                award:award,
                endDate:endDate,
                questionSummary:questionSummary,
                questionDetail:questionDetail,
                standard:standard,
                loginId:loginId,
                token:token
            }
        })
    };
})