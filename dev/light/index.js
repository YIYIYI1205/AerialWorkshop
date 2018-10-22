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
        var urlGet="http://dreamcloud.work/user/lightfactory/list";
        $.get(urlGet,data,function(res){
            console.log(res);
            if(res.code==1024){
                alert(res.msg)
                location.href="../login/index.html"
            }else{
                if(res.length==0){
                    alert("暂时没有数据");
                }
                res=res.reverse();
                for(var i =0;i<res.length;i++){
                    var list=$('<div class="list jump"></div>');
                    var left='<div class="left"><img src="'+res[i].limg+'"></div>';
                    var date = new Date(res[i].lendDate);
                    //     // 格式化日期
                    var dateTime = date.toLocaleString();
                    var center='<div class="center"><div class="title">'+res[i].lquestionName+'</div><div class="endTime">截止时间：'+dateTime+'</div><div class="area">领域：'+res[i].larea+'</div><div class="detail">问题概述：'+res[i].lquestionSummary+'</div></div>';
                    var right='<div class="right"><div class="award">'+res[i].laward+'￥</div><a href="#" class="showMore" data-id="'+i+'">查看更多</a>'
                    $(".lists").append(list);
                    list.append(left);
                    list.append($(center));
                    list.append($(right));
                    $(".showMore").click(function(){
                        var j=$(this).data("id");
                        console.log($(this).data("id"));
                        jump(j);
                    });
                    $(".jump").click(function(){
                        var j=$($(this).children(".right")).children("a").data("id");
                        console.log(j);
                        jump(j);
                    })
                    function jump(j){
                        storage.appendix=res[j].lappendix;
                        storage.area=res[j].larea;
                        storage.award=res[j].laward;
                        storage.endDate=res[j].lendDate;
                        storage.id=res[j].id;
                        storage.questionDetail=res[j].lquestionDetail;
                        storage.questionName=res[j].lquestionName;
                        storage.questionSummary=res[j].lquestionSummary;
                        storage.standard=res[j].lstandard;
                        storage.submitDate=res[j].lsubmitDate;
                        storage.submitPerson=res[j].user.user_name;
                        storage.light=true;
                        location.href="../detail/index.html";
                    }
                }
            }
        })
    }    
    //登录类型是企业用户时，直接显示企业页面，点击提交后向后台发送数据
    if(type=='company'){
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
            var img=$("input[name='img']:checked").val();
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
                lquestionName:questionName,
                larea:area,
                laward:award,
                lendDate:endDate,
                lquestionSummary:questionSummary,
                lquestionDetail:questionDetail,
                lstandard:standard,
                limg:img,
                loginId:loginId,
                token:token
            };
            console.log(datas);
            var url="http://dreamcloud.work/user/lightfactory/submit";
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