
/*
 * GET home page.
 */
 
var ftp,
	fs = require('fs-extra'),
	path = require('path'),
	exec = require('child_process').exec,
	targz = require('tar.gz'),
	JSFtp = require("jsftp");

exports.index = function (req, res){
  res.sendfile('views/template.html');
};

exports.push = function (req, res){
	var name = req.query.name;
	if (name) {
		fs.exists('project/' + name + '/data.js', function (exists) {
			if (exists) {
			} else {
				res.send(404);
			}
		});
	} else {
		res.send(404);
	}
};

exports.project = function (req, res) {
	var stat,
		name = req.params.name,
		url = req.url.substring(1);
	
	if (name) {
		fs.exists(url, function (exists) {
			if (exists) {
				stat = fs.lstatSync(url);
				if (stat.isDirectory()) {
					res.sendfile('project/' + name + '/index.html');
				} else {
					res.sendfile(url);
				}
			} else {
				res.send(404);
			}
		});
	} else {
		res.send(404);
	}
};

exports.publish = function (req, res){
	var name = req.body.name,
		data = req.body.data;
		data = 'window.storeList = ' + data;
	if (name) {
		fs.exists('project/' + name, function (exists) {
			if (exists) {
				fs.exists('project/' + name + '/data.js', function (exists) {
					if (exists) {
						res.send({result: true });
						return;
					}
					fs.copy('template/', 'project/' + name + '/', function (err) {
						if (err) {
							console.log(err);
							res.send({result: false, error: '生成项目失败'});
						} else {
							fs.writeFile('project/' + name + '/data.js', data, function (err) {
								if (err) {
									res.send({result: false, error: '生成数据文件失败'});
								} else {
									res.send({result: true });
								}
							})
						}
					});
				});
			} else {
				res.send({result: false, error: '还没有这个项目'});
			}
		});
	} else {
		res.send({result: false, error: '没有项目名'});
	}
};

function mkdir (dirpath, mode, callback) {
	var cb = callback || mode;
	fs.exists(dirpath, function (exists) {
		if (exists) {
			cb && cb();
		} else {
			callback ? mkdir(path.dirname(dirpath), mode, function () {
				fs.mkdir(dirpath, mode, callback);
			}) : mkdir(path.dirname(dirpath),  function () {
				fs.mkdir(dirpath, mode);
			})
		}
	})
}

exports.uploadpic = function (req, res) {
	var i, file, command,
		cnt = 0,
		num = 0,
		w = req.body.w,
		h = req.body.h,
		name = req.body.name,
		ret = [],
		force = req.body.force == '1' ? true : false,
		files = req.files;

	mkdir('project/' + name + '/img', function (err) {
		if (err) {
			console.log(err);
			res.send({result: false, error: '创建图片目录失败'});
			return;
		}
		for (i in files) {
			file = files[i];
			command = 'gm mogrify  -resize ' + w + 'x' + h + (force ? '!' : '') + ' ' + file.path + '';
			num++;
			ret.push('img/' + path.basename(file.path));
			( function (command, _path) {
				exec(command, function (error, stdout, stderr) {
					if (error) {
						console.log(error);
						res.send({result: false, errror: '压缩图片失败'});
						return;
					}
					fs.rename(_path, 'project/' + name + '/img/' + path.basename(_path), function (err) {
						if (err) {
							console.log(err);
							res.send({result: false, error: '创建图片失败'});
							return;
						}
						cnt++;
						if (cnt == num) {
							res.send({result: true, data: ret});
						}
					})

				});
			})(command, file.path);
			if (num == 0) {
				res.send({result: false, error: '没有上传图片'});
			}			
		}
	});
};



function put (dir, pre,  cb) {
	var ftp = new JSFtp({
		host: "192.168.1.105",
		port: 21, // defaults to 21
		user: "balbo", // defaults to "anonymous"
		pass: "123456" // defaults to "@anonymous"
	});
	
	read(dir, pre, cb);
	
	function read (dir, pre, callback) {
		ftp.raw.mkd(pre + dir, function (err) {
			if (err) {
				if (err.code = 550) {
				} else {
					console.log(err);
					callback(err);
					return;
				}
			}
			fs.readdir(dir, function (err, files) {
				var file, stat, 
					cnt = 0,
					i = 0;
				if (err) {
					console.log(err);
					callback(err);
					return;
				}
				for (; i < files.length; i++) {
					file = dir + '/' + files[i];
					stat = fs.lstatSync(file);
					if (stat.isDirectory()) {
						read(file, pre, function (err) {	
							if (err) {	
								console.log(err);
								callback(err);
								return;
							}
							cnt++;
							if (cnt == files.length) {
								callback();
							}
						});
					} else {
						ftp.put(file, pre + file, function (err) {
							if (err) {
								console.log(err);
								callback(err);
								return;
							}
							cnt++;
							if (cnt == files.length) {
								callback();
							}
						});
					}
				}
				if (i == 0) {
					callback();
				}
			})
		})
	}
}
