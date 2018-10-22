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
        var appendix=storage.appendix;
        var area=storage.area;
        var award=storage.award;
        var endDate=storage.endDate;
        var id=storage.id;
        var questionDetail=storage.questionDetail;
        var questionName=storage.questionName;
        var questionSummary=storage.questionSummary;
        var standard=storage.standard;
        var submitDate=storage.submitDate;
        var submitPerson=storage.submitPerson;
        var light=storage.light;
        var quit=user_name+"|退出";
        $(".quit").text(quit);
        if(light=="true"){
            $(".light").show();
        }else{
            $(".challenge").show();
        }
    }
    var list=$('<div class="list"></div>');
    var questionName='<div class="input-group input-group-sm"><span class="input-group-addon">问题名称</span><span class="form-control questionName" aria-describedby="sizing-addon3">'+questionName+'</span></div>';
    list.append($(questionName));
    var area='<div class="input-group input-group-sm"><span class="input-group-addon">领域</span> <span class="form-control area">'+area+'</span></div>';
    list.append($(area));
    var award='<div class="input-group input-group-sm"><span class="input-group-addon">奖励</span><span class="form-control award">'+award+'</span></div>';
    list.append($(award));
    // 根据毫秒数构建 Date 对象
    var date = new Date(parseInt(endDate));
    // 格式化日期
    var dateTime = date.toLocaleString();
    var endDate='<div class="input-group input-group-sm"><span class="input-group-addon">截止日期</span><span class="form-control endDate">'+dateTime+'</span></div>';
    list.append($(endDate));
    var questionSummary='<div class="input-group input-group-sm"><span class="input-group-addon">问题概述</span><div class="form-control questionSummary">'+questionSummary+'</span></div>';
    list.append($(questionSummary));
    var questionDetail='<div class="input-group input-group-sm"><span class="input-group-addon">问题详述</span><div class="questionDetail">'+questionDetail+'</span></div>';
    list.append($(questionDetail));
    var standard='<div class="input-group input-group-sm"><span class="input-group-addon" id="sizing-addon3">交付标准</span><span class="form-control standard">'+standard+'</span></div>';
    list.append($(standard));
    var appendix='<div class="input-group input-group-sm"><span class="input-group-addon" id="sizing-addon3">问题附件</span><a href="http://dreamcloud.work'+appendix+'" class="form-control appendix">附件下载</a></div>';
    list.append($(appendix));
    var submitdate=new Date(parseInt(submitDate));
    var submitTime=submitdate.toLocaleString();
    var submitDate='<div class="input-group input-group-sm"><span class="input-group-addon">发布日期</span><span class="form-control submitDate">'+submitTime+'</span></div>';
    list.append($(submitDate));
    var submitPerson='<div class="input-group input-group-sm"><span class="input-group-addon">发布人</span><span class="form-control submitPerson">'+submitPerson+'</span></div>';
    list.append($(submitPerson));
    var answer='<span>你的回答：</span><textarea class="answer" cols="100" rows="10" data-id="'+id+'"></textarea>';
    list.append($(answer));
    list.append($('<button type="button" class="btn">提交</button>'));
    $(".question").append(list);
    $(".btn").click(function(){
        var answer=$(this).prev().val();
        var questionId=$(this).prev().data('id');
        //把数据发送给后台
        if(light=="true"){
            var url="http://dreamcloud.work/user/lightfactory/lightfactorySolve";
            var datas={
                lanswer:answer,
                lquestionId:id,
                loginId:loginId,
                token:token
            }
        }else{
            var url="http://dreamcloud.work/user/challenge/challengeSolve";
            var datas={
                answer:answer,
                questionId:id,
                loginId:loginId,
                token:token
            }
        }
        $.get(url,datas,function(res){
            console.log(res);
            alert(res.msg);
            location.href="../index/index.html";
        })
    })
})