define(function(require,exports,module){	
	var $ = require('jquery')	

	$('.prize-button').on('click',function(){
			$.ajax({
	            url: '/prize/ajax/prizeDraw',
	            data: {
	                groupId: 198
	            },
	            success: function (response) {
	            	var result = response ; 
	                if(!result.code in [ 406 , 200 , 501]){
						console.log(result)
		   				alert('系统错误 请重试')
		   				return 
		   			}
		   			if(result.code == 403){
		   				if (confirm('亲，请先登录')){
		   					window.location = "http://www.dianping.com/login?redir=" + encodeURIComponent(window.location.href)
		   				}
		   				return 
		   			}
		   			if(result.code == 406) {
		   				//关闭
		   				alert('活动已关闭')
		   			}
		   			if(result.code == 200) {
		   				var prizeName
		   				var rank = result.msg.prize.rank ;
		   				switch (rank) {
		   					case 1 : prizeName = "一等奖"; break;
		   					case 2 : prizeName = "二等奖"; break;
		   					case 3 : prizeName = "三等奖"; break;
		   					case 4 : prizeName = "四等奖"; break;
		   				}
		   				window.recordId = result.msg.recordId ;
		   				$('.prize-name span').html(prizeName);
		   				$('.alert-box').show()
		   				rank != 0 ? $('.alert-prize').show()  : $('.alert-fail').show()
		   			}
		   			if(result.code == 501) {
		   				alert('亲，一天只能抽一次，请明天再来吧')
		   				//没有次数
		   			}
	            }
	        });
	})

	$('.close-button').on('click',function(){
		$('.alert-box').hide()
	})


	$('.confirm-button').on('click',function(){
		var name = $('input')[0].value ;
		if (name === '' || name.length >20) {
			alert('您输入的姓名信息有误，请重新输入')
			return 
		}
		var phoneNo = $('.input-number').val() ; 
		$('.input-number').attr('disabled','disabled');


		if ( phoneNo === '' || !/^(1[3-9][0-9])\d{8}$/.test(phoneNo) ) {
			alert('您输入的电话号码有误，请重新输入')
			$('input').removeAttr("disabled")
			return 
		}
		$.ajax({
			url:'/prize/ajax/userInfo?recordId='+window.recordId+'&mobileNo='+ phoneNo ,
			success:function(result){
				if(result.code == 200){
                    
                    alert('发送成功')
                    $('.alert-box').hide()
                } else {
                	$('input').removeAttr("disabled")
                    alert('发送失败，请重试')
                }
			}
		})
		
	})
	
})