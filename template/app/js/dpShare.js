window.share_url = "http://event.dianping.com/market/地址阿亲/index.html?platform=notindp";
window.share_desc = "";
window.share_title = "";
window.share_img = "";
try {

    window.DPAppUp = {};
    window.DPAppUp.shareConfig = {
        url: window.share_url,
        image: window.share_img,
        title: window.share_title,
        desc: window.share_title
    }

    function initShare() {
        var iframe = document.createElement("iframe"),
            frameContainer = document.createElement("div"),
            shareConfig = "dpshare://_?content=" + encodeURIComponent(JSON.stringify(window.DPAppUp.shareConfig));
        frameContainer.setAttribute('style', 'display:none');
        frameContainer.appendChild(iframe);
        document.body.appendChild(frameContainer);
        iframe.setAttribute("src", shareConfig);
    }

    window.onload = function() {

        function getQueryStringByName(name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        };
        initShare();
    }

} catch (e) {

}


function autoListenWx(shareWX, shareWXTL) {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', shareWX, function(res) {});
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', shareWXTL, function(res) {});
        });
    }, false);
}

function share_Wx_Dp_Attach(args) {
    function getQueryStringByName(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }

    function is_notInDp() {
        var platform = getQueryStringByName('platform');
        if (platform == 'notindp') {
            return true;
        }
        return false;
    }

    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    function isInDp() {
        var userAgent = window.navigator.userAgent.toLowerCase(),
            isInDp = !userAgent.match(/MicroMessenger/i);
        return isInDp;
    }

    function isInSina() {
        var userAgent = window.navigator.userAgent.toLowerCase(),
            isInSina = userAgent.match(/weibo/i);
        return isInSina;
    }

    function isInTenXun() {
        var userAgent = window.navigator.userAgent.toLowerCase(),
            isInTenXun = userAgent.match(/tencentmicroblog/i);
        return isInTenXun;
    }

    function sinaShare(c) {
        var pic = c.image;
        var url = 'http://v.t.sina.com.cn/share/share.php?appkey=1392673069&url=' + encodeURIComponent(c.url) + '&title=' + encodeURIComponent(c.title + c.desc) + '&content=utf-8' + '&pic=' + encodeURIComponent(pic);
        //window.open(url, '_blank');
        location.href = url;
    };

    function tengxunShare(c) {
        var pic = c.image;
        var url = 'http://share.v.t.qq.com/index.php?c=share&a=index&source=1000013&url=' + encodeURIComponent(c.url) + '&title=' + encodeURIComponent(c.title + c.desc) + '&content=utf-8' + '&pic=' + encodeURIComponent(pic);
        //window.open(url, '_blank');
        location.href = url;
    };


    function showShareTips(info) {
        var tips = $('<p></p>').css({
            'z-index': '999',
            'font-size': '13px',
            'line-height': '180%',
            'position': 'fixed',
            'width': document.documentElement.scrollWidth,
            'height': document.documentElement.clientHeight,
            'margin': 0,
            'padding': '40px 10px',
            'color': ' #fff',
            'background-color': 'rgba(0,0,0,.8)',
            'top': 0,
            'left': 0,
            'background-image': 'url(http://si1.s1.dpfile.com/t/cssnew/events/labevent/seefilm/mmimages/share-cover-tips.e3893cb7ee521914fd768d05fab419b3.png)',
            'background-repeat': 'no-repeat',
            '-webkit-background-size': '100% auto',
            'background-size': '100% auto'
        }).appendTo($('body'));
        if (info) {
            tips.html(info);
        }
        tips.on('click', function() {
            tips.remove();
        });
        setTimeout(function() {
            tips.remove();
        }, 3000);
    }
    if (is_weixin()) {
        showShareTips();
        return;
    }
    if (typeof WeixinJSBridge != 'undefined') {
        showShareTips();
        return;
    };
    if (isInSina()) {
        sinaShare(args);
        return;
    }
    if (isInTenXun()) {
        tengxunShare(args);
        return;
    }
    if (is_notInDp()) {
        return;
    }
    if (isInDp()) {
        args = (typeof args === 'object') ? JSON.stringify(args) : args + '';
        location.href = "js://_?method=share&args=" + encodeURIComponent(args);
    }
}