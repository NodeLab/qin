define(function(require,exports,module){	
	var util = require('./util');
	var hello = document.getElementById('hello');
	hello.style.color = util.randomColor();
	window.setInterval(function(){
		hello.style.color = util.randomColor();
	},1500);	
})