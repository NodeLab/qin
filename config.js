function loadConfig(){
	var configInfo = {
		mysqlConfig : {
			"host" : "127.0.0.1",
			"port" : "27017",
		}
	}
	return configInfo;
}

exports.loadConfig = loadConfig;