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
    var url="http://dreamcloud.work/user/challenge/challengeAnswerList";
    var datas={
        loginId:loginId,
        token:token
    }
    $.get(url,datas,function(res){
        console.log(res);
        if(res.code==1024){
            alert(res.msg)
            location.href="../login/index.html"
        }else{
            res=res.reverse();
            for(var i =0;i<res.length;i++){
                var list=$('<div class="list"></div>');
                var questionName='<div class="input-group input-group-sm"><span class="input-group-addon">问题名称'+(i+1)+'</span><span class="form-control questionName" aria-describedby="sizing-addon3">'+res[i].challengeList.questionName+'</span></div>';
                list.append($(questionName));
                if(type=="company"){
                    if(res[i].answers.length==0){
                        var space="<h4>暂时没有回答提交</h4>"
                        list.append($(space));
                    }else{

                        for(var j=0;j<res[i].answers.length;j++){
                            var answerList=$('<div class="answerList"></div>');
                            var answer='<div class="input-group input-group-sm"><span class="input-group-addon">问题回答'+(j+1)+'</span><div class="form-control answer">'+res[i].answers[j].answer+'</span></div>';
                            answerList.append($(answer));
                            // 根据毫秒数构建 Date 对象
                            var date = new Date(res[i].answers[j].commitDate);
                            // 格式化日期
                            dateTime = date.toLocaleString();
                            var commitDate='<div class="input-group input-group-sm"><span class="input-group-addon">提交日期</span><span class="form-control commitDate">'+dateTime+'</span></div>';
                            answerList.append($(commitDate));
                            var commitPeople='<div class="input-group input-group-sm"><span class="input-group-addon">提交人</span><span class="form-control commitPeople">'+res[i].answers[j].user_name+'</span></div>';
                            answerList.append($(commitPeople));
                            list.append($(answerList));
                        }
                    }
                }else{
                    var answerList=$('<div class="answerList"></div>');
                    var answer='<div class="input-group input-group-sm"><span class="input-group-addon">问题回答</span><div class="form-control answer">'+res[i].answer+'</span></div>';
                    answerList.append($(answer));
                    var date = new Date(res[i].answerDate);
                    dateTime = date.toLocaleString();
                    var commitDate='<div class="input-group input-group-sm"><span class="input-group-addon">提交日期</span><span class="form-control commitDate">'+dateTime+'</span></div>';
                    answerList.append($(commitDate));
                    list.append($(answerList));
                }
                $(".lists").append(list);
            }
        }
    })
    // 轻工场
    var url="http://dreamcloud.work/user/lightfactory/lightfactoryAnswerList";
    var datas={
        loginId:loginId,
        token:token
    }
    $.get(url,datas,function(res){
        console.log(res);
        if(res.code==1024){
            alert(res.msg)
            location.href="../login/index.html"
        }else{
            res=res.reverse();
            for(var i =0;i<res.length;i++){
                var list=$('<div class="list"></div>');
                var questionName='<div class="input-group input-group-sm"><span class="input-group-addon">问题名称'+(i+1)+'</span><span class="form-control questionName" aria-describedby="sizing-addon3">'+res[i].lightFactoryList.lquestionName+'</span></div>';
                list.append($(questionName));
                if(type=="company"){
                    if(res[i].answers.length==0){
                        var space="<h4>暂时没有回答提交</h4>"
                        list.append($(space));
                    }else{
                        for(var j=0;j<res[i].answers.length;j++){
                            var answerList=$('<div class="answerList"></div>');
                            var answer='<div class="input-group input-group-sm"><span class="input-group-addon">问题回答'+(j+1)+'</span><div class="form-control answer">'+res[i].answers[j].lanswer+'</span></div>';
                            answerList.append($(answer));
                            // 根据毫秒数构建 Date 对象
                            var date = new Date(res[i].answers[j].lcommitDate);
                            // // 格式化日期
                            dateTime = date.toLocaleString();
                            var commitDate='<div class="input-group input-group-sm"><span class="input-group-addon">提交日期</span><span class="form-control commitDate">'+dateTime+'</span></div>';
                            answerList.append($(commitDate));
                            var commitPeople='<div class="input-group input-group-sm"><span class="input-group-addon">提交人</span><span class="form-control commitPeople">'+res[i].answers[j].user_name+'</span></div>';
                            answerList.append($(commitPeople));
                            list.append($(answerList));
                        }
                    }
                }else{
                    var answerList=$('<div class="answerList"></div>');
                    var answer='<div class="input-group input-group-sm"><span class="input-group-addon">问题回答</span><div class="form-control answer">'+res[i].lanswer+'</span></div>';
                    answerList.append($(answer));
                    var date = new Date(res[i].lanswerDate);
                    dateTime = date.toLocaleString();
                    var commitDate='<div class="input-group input-group-sm"><span class="input-group-addon">提交日期</span><span class="form-control commitDate">'+dateTime+'</span></div>';
                    answerList.append($(commitDate));
                    list.append($(answerList));
                }
                $(".listsLight").append(list);
            }
        }

    })
})