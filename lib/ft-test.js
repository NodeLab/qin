var os = require('os');
var mkdirp = require('mkdirp');
var destination_path =  '.';

(function createApplication(path) {
	fs.copy()
	// mkdir(path, function(){
 //    mkdir(path + '/public');
 //    })
})(destination_path);

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

function copy_template(from, to) {
  from = path.join(__dirname, '..', 'templates', from);
  write(to, fs.readFileSync(from, 'utf-8'));
}

function write(path, str, mode) {
  fs.writeFile(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

