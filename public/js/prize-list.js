define(function(require,exports,modules){
	return function(jquery){
		function test(roller){
			console.log(1)
			roller.animate({top:'-100px'},1000)
		}
		(function($){
		    $.fn.prizeRoller = function(option){
		        var scroll=$(this) ,roller = scroll.find('ul');

		        $.ajax({
		            url: '/prize/ajax/recordList',
		            data: {
		                groupId: 239,
		                max: 13
		            },
		            success: function (response) {
		                roller.empty();
		                if (response.code == 200) {
		                    var luckBeggars = response.msg.recordList;
		                    for (var i = 0; i < luckBeggars.length; i++) {
		                        $('<li></li>').text("恭喜 "+luckBeggars[i].userNickName + '中了' + luckBeggars[i].prizeName).appendTo(roller);
		                    }
		                    setInterval(function(){
		                    	var top = roller.position().top ; 
		                    	var list_length = roller.find('li').length
		                    	if ( top < -1 * (list_length) * 26 ){
		                    		//
		                    		//roller.animate({top:(top-50)+'px'},1000)
		                    		//roller.animate({top:0+'px'},1000)
		                    		roller.css({top:'0px'})

		                    	} else {
		                    		//
		                    		console.log('go')
		                    		roller.animate({top:(top-23)+'px'},1000)
		                    	}
		                    },1000)
		                }
		            }
		        });
		    }
		})(jQuery);

	}
})