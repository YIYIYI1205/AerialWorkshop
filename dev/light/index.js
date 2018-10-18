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
        var data={
            loginId:loginId,
            token:token
        }
        $(".question").attr("style","display:block;");
        $(".window").attr("style","display:none;");
        //从后台获取数据
        getLost()
        
    };
    function getLost(){
        var urlGet="http://dreamcloud.work/user/challenge/list";
        $.get(urlGet,data,function(res){
            console.log(res);
            if(res.length==0){
                alert("暂时没有数据");
            }
            for(var i =0;i<res.length;i++){
                var list=$('<div class="list"></div>');
                var questionName='<div class="input-group input-group-sm"><span class="input-group-addon">问题名称</span><span class="form-control questionName" aria-describedby="sizing-addon3">'+res[i].questionName+'</span></div>';
                list.append($(questionName));
                var area='<div class="input-group input-group-sm"><span class="input-group-addon">领域</span> <span class="form-control area">'+res[i].area+'</span></div>';
                list.append($(area));
                var award='<div class="input-group input-group-sm"><span class="input-group-addon">奖励</span><span class="form-control award">'+res[i].award+'</span></div>';
                list.append($(award));
                // 根据毫秒数构建 Date 对象
                var date = new Date(res[i].endDate);
                // 格式化日期
                dateTime = date.toLocaleString();
                var endDate='<div class="input-group input-group-sm"><span class="input-group-addon">截止日期</span><span class="form-control endDate">'+dateTime+'</span></div>';
                list.append($(endDate));
                var questionSummary='<div class="input-group input-group-sm"><span class="input-group-addon">问题概述</span><div class="form-control questionSummary">'+res[i].questionSummary+'</span></div>';
                list.append($(questionSummary));
                var questionDetail='<div class="input-group input-group-sm"><span class="input-group-addon">问题详述</span><div class="questionDetail">'+res[i].questionDetail+'</span></div>';
                list.append($(questionDetail));
                var standard='<div class="input-group input-group-sm"><span class="input-group-addon" id="sizing-addon3">交付标准</span><span class="form-control standard">'+res[i].standard+'</span></div>';
                list.append($(standard));
                var appendix='<div class="input-group input-group-sm"><span class="input-group-addon" id="sizing-addon3">问题附件</span><a href="http://dreamcloud.work'+res[i].appendix+'" class="form-control appendix">附件下载</a></div>';
                list.append($(appendix));
                var answer='<span>你的回答：</span><textarea class="answer" cols="100" rows="10" data-id="'+res[i].id+'"></textarea>';
                list.append($(answer));
                list.append($('<button type="button" class="btn">提交</button>'));
                $(".question").append(list);
                //点击提交后，只提交回答和该问题的id和用户id
                if(i==res.length-1){
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
                        console.log(datas);
                        //把数据发送给后台
                        var url="http://dreamcloud.work/user/challenge/challengeSolve"
                        $.get(url,datas,function(res){
                            console.log(res);
                            alert(res.msg);
                            getLost();
                        })
                    })
                }
            }
        })
    }    
    //登录类型是企业用户时，直接显示企业页面，点击提交后向后台发送数据
    if(type=='company'){
        console.log("123");
        $(".question").attr("style","display:none;");
        $(".window").attr("style","display:block;");
        $(".btn-success").click(function(){
            var questionName=$("input[name='questionName']").val();
            var area=$("input[name='area']").val();
            var award=$("input[name='award']").val();
            var endDate=$("#endDate").val();
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
            //点击提交后向后台发送请求，并传输用户loginId,token验证
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
            };
            console.log(datas);
            var url="http://dreamcloud.work/user/challenge/submit";
            $.get(url,datas,function(res){
                console.log(res);
                if(res.code==1030){
                    alert(res.msg);
                    //刷新页面
                    location.href="index.html";
                }else{
                    alert("页面已过期，请重新登录");
                    //跳转登录页面
                    location.href="../login/index.html";
                }
            })
        })
    };
})