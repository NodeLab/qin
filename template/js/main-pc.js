/**
 * Date: 14-3-17
 * Author: Jerry
 * Time: 下午6:43
 */
var Global = {
    LOGGED: false,
    groupId:229
};

jQuery(function($){
    var $datesTab = $('.promotion-dates-tab'),
        $citiesTab = $('.promotion-cities-tab');

    $datesTab.on('click', 'li', function (e) {
        var $this = $(this),
            index = $datesTab.children('li').index(this);

        $this.addClass('current').siblings().removeClass('current');

        $('.promotion-items').children('li:eq(' + index+ ')').addClass('current').siblings().removeClass('current');
        e.preventDefault();
    });
    $citiesTab.on('click', 'li', function (e) {
        var $this = $(this),
            index = $citiesTab.children('li').index(this);

        $this.addClass('current').siblings().removeClass('current');

        $('.promotion-city').children('li:eq(' + index+ ')').addClass('current').siblings().removeClass('current');
        e.preventDefault();
    });
});

jQuery(function($){
    //$('#winner-list').prizeRoller();
    //debug
    //$('#winner-list').rollingList();
    $('.rules-btn').on('click', function(){
        $('.rules-detail').toggle();
    });
    $('.btn-rules-detail-title').on('click',function(){
        $('.rules-detail').hide()
    });
});

jQuery(function($){

    var info = {};//存储用户信息


    //弹框定位
    function overlayShadow(){
        var boxCenter = $('.pop-layer-result'),
            overlay = $('.overlay');
        boxCenter.show().css({//初始弹框居中
            'left':($(window).width()-boxCenter.width())/2 + 'px',
            'top':($(window).height()-boxCenter.height())/2 + 'px'
        });
        overlay.show().css({//初始背景层居中
            'width': $(window).width(),
            'height': $(window).height()
        });
        $(window).on('resize', function(){
            boxCenter.css({//改变窗口大小时弹框居中
                'left':($(window).width()-boxCenter.width())/2 + 'px',
                'top':($(window).height()-boxCenter.height())/2 + 'px'
            });
            overlay.css({//改变窗口大小时背景层居中
                'width': $(window).width(),
                'height': $(window).height()
            });
        });

        //ie6兼容
        var isIE7 = $.browser.msie && (Number($.browser.version) <= 7);
        if(isIE7){//ie7及以下的浏览器
            boxCenter.css('top', ($(window).height()-boxCenter.height())/2 + $(window).scrollTop() + 'px');
            overlay.css('top', $(window).scrollTop() + 'px');
            $(window).scroll(function(){
                boxCenter.css('top', ($(window).height()-boxCenter.height())/2 + $(window).scrollTop() + 'px');
                overlay.css('top', $(window).scrollTop() + 'px');
            });
        };
    }

    //设置九宫格
    var PrizeInfo = {},
        grid = new $.Grid({
        gridSize: 148,
        gap: 5,
        imgGroup:['1','2','3','4','5','6','7','8','noprize1'],
        imgPath:'images/grid/'
    });
    //生产九宫格
    grid.listen('showWindow', function () {
        popupLayerPrize(PrizeInfo.msg);
    });
    //抽奖事件
    grid.bindCustomEvents(function(){
        switch(PrizeInfo.code){
            case 200:
                switch (PrizeInfo.msg.prize.rank) {
                case 1: //中奖
                    grid.prizeImage = '1';
                    break;
                case 2:
                    grid.prizeImage = '2';
                    break;
                case 3:
                    grid.prizeImage = '3';
                    break;
                case 4:
                    grid.prizeImage = '4';
                    break;
                case 5:
                    grid.prizeImage = '5';
                    break;
                case 6:
                    grid.prizeImage = '6';
                    break;
                case 7:
                    grid.prizeImage = '7';
                    break;
                case 8:
                    grid.prizeImage = '8';
                    break;
                default://没中奖
                    grid.prizeImage = randomString([
                        'noprize1'
                        ]);
                    break;
                }
            break;
            default:
                grid.prizeImage = randomString([
                    'noprize1'
                    ]);
            break;
        }
    });
    // function () {
    //     fresh_info(PrizeInfo);
    // });

    //刷新剩余次数
    // function fresh_info(prizeInfo) {
    //     if (prizeInfo){
    //         Global.CHANCE = prizeInfo.remain;
    //     }

    //     $('#chance').find('span').text(Global.CHANCE);
    // }

    //生成抽奖相关按钮
    function popupLayerEnter() {
        var overlay = $('.float-layer'),

            box = $('<div class="pop-layer-button"></div>'),
            activeButton = $('<a class="btn" href="javascript:void(0);"></a>');

        if (Global.LOGGED) {
            box.addClass('ready');

            activeButton.on('click', function () {
                box.remove();
                getNewPrize();
            }).appendTo(box);
        }
        else {
            box.addClass('login');

            activeButton.on('click', function () {
                if(window.DP){
                    $.login();
                }

                else {
                    window.location = 'http://www.dianping.com/login';
                }
                return false;
            }).appendTo(box);
        }
        box.appendTo(overlay);
    }
    function popupLayerEnter2(){
        var overlay = $('.float-layer'),

            box = $('<div class="pop-layer-button"></div>'),
            activeButton = $('<a class="btn" href="javascript:void(0);"></a>');

        box.addClass('no-chance');
        box.appendTo(overlay);
    }

    //随机数
    function randomString(strs) {
        return strs[Math.floor(Math.random() * strs.length)];
    }

    //中奖弹框
    function popupLayerPrize() {

        var overlay = $('.float-layer'),
            box = $('<div class="pop-layer-result i3"></div>'),
            title = $('<p class="popup-title"></p>'),
            text = $('<p class="popup-text"></p>'),
            closeButton = $('<a class="close-button" title="关闭" href="javascript:void(0);"></a>'),
            pushMobileNum = $('<a class="btn" id="content-message-btn" href="javascript:void(0);">提交</a>'),
            shareGroup = $('<div class="btn-group"></div>'),
            shareSina = $('<a class="btn btn-shareSina" href="javascript:void(0);">小伙伴快来！</a>');
            // shareWeixin = $('<a class="btn btn-shareWeixin" href="javascript:void(0);">分享到朋友圈</a>'),
            // info = $('<p class="popup-info">* 您还可以分享此活动链接，获得一次额外抽红包的机会。</p>');

            switch(PrizeInfo.code){
                case 200:
                    switch (PrizeInfo.msg.prize.rank) {
                        case 1: //中奖
                        case 2: 
                        case 3: 
                        case 4: 
                        case 5: 
                        case 6:
                        case 7:
                        case 8:
                            title.html('恭喜你获得<br /><span>' + PrizeInfo.msg.prize.prizeName + '!</span>');
                            text.html(
                                '<p class="tips">请提供您的联系方式，以便我们发送中奖信息。</p>' +
                                '<label for="" class="mobile-text"><span>手机：</span>'+
                                '<input id="mobileText" type="text" class="mobile-input" maxlength="11">'+
                                '</label>'
                                );

                            title.appendTo(box);
                            text.appendTo(box);
                            closeButton.one('click', function(){
                                popupLayerEnter();
                                grid.initPrizeView();
                                box.remove();
                                $('.overlay').hide();
                            }).appendTo(box);
                            pushMobileNum.appendTo(box);
                            box.addClass(grid.prizeImage).appendTo('body');

                            $('#content-message-btn').unbind('click').on('click', function(e){
                                e.stopPropagation();
                                
                                var mobileNo = $('#mobileText').val(),
                                    mobileWarning = $('#warning');
                                    mobileNoReg = /\d+/;
                                if(mobileNo.length === 11 && mobileNoReg.test(mobileNo) && mobileNo.charAt(0) === '1'){
                                    SendMessage( mobileNo, PrizeInfo.msg.recordId); //发短信
                                }else{
                                    alert('输入有误，请重新输入。');
                                }
                            });
                            break;
                        default://没中奖
                            title.html('客官，明儿再来啊！');
                            text.html('将活动讯息同步到您的新浪微博，<br />让小伙伴们一起来吧！');

                            title.appendTo(box);
                            text.appendTo(box);
                            closeButton.one('click', function(){
                                popupLayerEnter();
                                grid.initPrizeView();
                                box.remove();
                                $('.overlay').hide();
                            }).appendTo(box);
                            shareSina.on('click', function () {
                            }).appendTo(shareGroup);
                            shareGroup.appendTo(box);
                            box.addClass(grid.prizeImage).appendTo('body');
                            break;
                    }
                    overlayShadow();
                break;
                default:
                    popupLayerEnter2();
                break;
            }
    }

    //ajax获取奖品信息
    function getNewPrize() {
        $.ajax({
            url: '/prize/ajax/prizeDraw',
            data: {groupId: Global.groupId},
            // url: '',
            success: function (response) {
                switch (response.code) {
                    case 200:
                        PrizeInfo = response;
                        break;
                    default:
                        PrizeInfo = {status : 0, remain: 0};
                        break;
                }
                grid.trigger('gridReady');
            }
        });
    }

    //登录
    function Login(){
        $.ajax({
            url: '/ajax/json/account/info',
            data: {r: Number(new Date())},
            cache: false,
            async: false,
            success:function(rsp){
                userMobile = rsp.msg.mobile
            }
        })
        .done(function(rsp){
            var code = rsp.code;
            switch(code){
                case 200:
                    var msg = rsp.msg;
                    info.uid = msg.id;
                    info.username = msg.name;
                    info.mobile = msg.mobile;
                    Global.LOGGED = 1;
                break;
                case 403:

                break;
                default:
                break;
            }
        })
        .fail(function(rsp){

            // popup login redirect
            toLogin();
            Overlay();
        });
    }

    //发送短信
    function SendMessage(mobileNo, recordId){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/prize/ajax/userInfo',
            data: { recordId: recordId, mobileNo: mobileNo}
        })
        .done(function(rsp){
            //发送成功提示
           $('.close-button').trigger('click');
            alert('发送成功！');
        })
        .fail(function(){
            //发送失败提示
            alert('对不起，发送失败！');
        });
    }


    $(document).on('click','.btn-shareSina', function(){
        var url = encodeURIComponent(location.href),
        pic = encodeURIComponent('http://event.dianping.com/market/dashanghai/images/grid/noprize3.png'),
        title = encodeURIComponent('#大众点评#美食大联盟，吃货福利，万券齐发！'),
        address = 'http://service.weibo.com/share/share.php?appkey=1392673069&url=' + url + '&title=' + title;
        window.open(address, '_blank');
    });
    Login();
    popupLayerEnter();
});
