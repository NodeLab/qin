window.shareUrl = window.share_url;
window.shareImg = window.share_img;
window.shareDesc = window.share_desc;
window.shareTitle = window.share_title;
window.shareWX = {
	appid: 'wx841a97238d9e17b2',
	title: shareTitle,
	desc: shareDesc,
	link: shareUrl,
	img_url: shareImg,
};
window.shareWXTL = $.extend({}, shareWX);
shareWXTL.title = shareWX.desc;
window.shareApp = {
	title: shareDesc,
	desc: shareTitle + " " + shareDesc + shareUrl, //fix ios app, so android may have double
	url: shareUrl,
	image: shareImg
};
autoListenWx(shareWX, shareWXTL);
//share_Wx_Dp_Attach(shareApp);
$(document).ready(function() {
	//commonly used-------------------------------------------------------------------
	var ajax_prize = "/prize/ajax/prizeDraw?groupId=198",
		words_notLogin = "对不起,您还没有登陆,请先登陆!",
		ajax_send_tel = '/prize/ajax/userInfo',
		rand = function() {
			return (" " + Math.random()).split('.')[1];
		},
		indexPlat = function() {
			if (getQueryStringByName('platform') == 'notindp') {
				return "index.html?platform=notindp";
			}
			return "index.html";
		};
	//this is for code----------------------------------------------------------------
	//****************----------------------------------------------------------------
	//****************----------------------------------------------------------------
	//****************----------------------------------------------------------------
		//write something	
	



	//****************----------------------------------------------------------------
	//****************----------------------------------------------------------------
	//****************----------------------------------------------------------------	
	//commonly used-------------------------------------------------------------------	
	function setCookie(c_name, value, expiredays, domain) {
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + expiredays)
		document.cookie = c_name + "=" + escape(value) + ";path=/" +
			((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
	}

	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	}

	function getQueryStringByName(name) {
		var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
		if (result == null || result.length < 1) {
			return "";
		}
		return result[1];
	};

	function isLogin() {
		$.ajax({
			url: '/ajax/json/account/info',
			success: function(data) {
				console.log(data);
			}
		})
	}

})