var program = require('commander');

program.version('0.0.5').usage('<command> [options]')

program
	.command('play')
	.option('-p, --port [int]')
	.action(function(module,cmd){
		
	})