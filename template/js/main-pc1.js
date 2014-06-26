/**
 * Date: 14-3-17
 * Author: Jerry
 * Time: 下午6:43
 */
var Global = {
    LOGGED: true,
    CHANCE: 1
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
    $('#winner-list').prizeRoller();
    //debug
    //$('#winner-list').rollingList();

});

jQuery(function($){

    var PrizeInfo = {},
        grid = new $.Grid({
        gridSize: 148,
        gap: 5,
        imgGroup:['chibanwu','cooked','shibanjie','tanyue','wanyu','youle','noprize1','noprize2','noprize3'],
        imgPath:'images/grid/'
    });

    grid.listen('showWindow', function () {
        popupLayerPrize(PrizeInfo);
    });
    grid.bindCustomEvents(function(){
            switch (PrizeInfo.rank) {
                case 1: //中奖
                    grid.prizeImage = 'tanyue';
                    break;
                case 2:
                    grid.prizeImage = 'chibanwu';
                    break;
                case 3:
                    grid.prizeImage = 'shibanjie';
                    break;
                case 4:
                    grid.prizeImage = 'cooked';
                    break;
                case 5:
                    grid.prizeImage = 'youle';
                    break;
                case 6:
                    grid.prizeImage = 'wanyu';
                    break;
                default://没中奖
                    grid.prizeImage = randomString([
                        'noprize1',
                        'noprize2',
                        'noprize3'
                        ]);
                    break;
            }
    }, function () {
        fresh_info(PrizeInfo);
    });

    function fresh_info(prizeInfo) {
        if (prizeInfo){
            Global.CHANCE = prizeInfo.remain;
        }

        $('#chance').find('span').text(Global.CHANCE);
    }

    function popupLayerEnter() {
        var overlay = $('.float-layer'),

            box = $('<div class="pop-layer-button"></div>'),
            activeButton = $('<a class="btn" href="javascript:void(0);"></a>');

        if (Global.LOGGED) {
            if (Global.CHANCE) {
                box.addClass('ready');

                activeButton.on('click', function () {
                    box.remove();
                    getNewPrize();
                }).appendTo(box);
            }
            else{
                box.addClass('no-chance');
            }
        }
        else {
            box.addClass('login');

            activeButton.on('click', function () {
                if(window.DP){
                    $.login();
                }
                // else if (/51ping/.test(window.location.host)) {
                //     window.location = 'http://t.51ping.com/login?redir=' + encodeURIComponent(window.location.href);
                // }
                else {
                    window.location = 'http://t.dianping.com/login?redir=' + encodeURIComponent(window.location.href);
                }
                return false;
            }).appendTo(box);
        }
        box.appendTo(overlay);
    }

    function randomString(strs) {
        return strs[Math.floor(Math.random() * strs.length)];
    }

    function popupLayerPrize(prizeInfo) {

        var overlay = $('.float-layer'),
            box = $('<div class="pop-layer-result"></div>'),
            title = $('<p class="popup-title"></p>'),
            text = $('<p class="popup-text"></p>'),
            closeButton = $('<a class="close-button" title="关闭" href="javascript:void(0);"></a>');
            // shareGroup = $('<div class="btn-group"></div>'),
            // shareSina = $('<a class="btn btn-shareSina" href="javascript:void(0);">分享到微博</a>'),
            // shareWeixin = $('<a class="btn btn-shareWeixin" href="javascript:void(0);">分享到朋友圈</a>'),
            // info = $('<p class="popup-info">* 您还可以分享此活动链接，获得一次额外抽红包的机会。</p>');

        switch (prizeInfo.rank) {
            case 1: //中奖
                title.html('恭喜你获得<br />' + prizeInfo.prizeName + '!');
                text.html('请提供您的联系方式，以便我们发送中奖信息。')
                break;
            case 2: //中奖
                title.html('恭喜你！抽中' + prizeInfo.prizeName + '元门票红包！');
                text.html(randomString([
                    '面额小了点，再试试！',
                    '这点钱打酱油都不够，再试试！',
                    '小小零花钱，再接再励！',
                    '人品很赞哦！',
                    '人品不错哦！',
                    '幸运女神正关注着您！',
                    '人品这么好，可以去买彩票了！',
                    '您已经被幸运女神看中了，小心会有艳遇哦！'
                ]))
                break;
            case 3: //中奖
                title.html('恭喜你！抽中<span>20元</span>途家网礼品券！');
                text.html('在途家网预订酒店就可使用哦！');
                break;
            default://没中奖
                title.html('客官，明儿再来啊！');
                break;
        }


        title.appendTo(box);
        text.appendTo(box);

        closeButton.one('click', function(){
            popupLayerEnter();
            grid.initPrizeView();
            box.remove();
        }).appendTo(box);


        // shareSina.on('click', function () {
        // }).appendTo(shareGroup);

        // shareWeixin.on('click', function () {
        //     var template =
        //         '<div class="popup-info">' +
        //             '<div class="popup-title">微信分享扫一扫</div>' +
        //             '<div class="popup-qr-code"></div>' +
        //             '<div class="popup-instruction"></div>' +
        //         '</div>';
        //     $.popup.setPopup({
        //         domString: template
        //     }, true);
        // }).appendTo(shareGroup);

        // shareGroup.appendTo(box);
        // info.appendTo(box);

        box.addClass(grid.prizeImage).appendTo('body');
    }

    function getNewPrize() {
        $.ajax({
            url: '/prize/ajax/prizeDraw',
            data: {groupId: 166},
            // url: '',
            success: function (response) {
                switch (response.code) {
                    case 200:
                        PrizeInfo = response.msg;
                        break;
                    default :
                        PrizeInfo = {status : 0, remain: 0};
                        break;
                }

                grid.trigger('gridReady');
            }
        });
    }

    // function getInfo(){
    //     if (Global.LOGGED) {
    //         //TODO: 获取剩余次数并更新页面内容
    //         fresh_info();
    //     }
    //     else{
    //         $('#chance').text('登录后查看');
    //     }
    // }

    //login
    function Login(logged){
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
            popupLayerEnter();
        })
        .fail(function(rsp){

            // popup login redirect
            toLogin();
            Overlay();
        });
    }

    getInfo();
});
