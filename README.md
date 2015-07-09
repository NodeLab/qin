Q - I - N
=========
[![Build Status](https://travis-ci.org/NodeLab/qin.svg?branch=master)](https://travis-ci.org/NodeLab/qin)

	这是一个非常简洁的开发环境，主要用于进行推广活动开发。

功能
----
	提供静态文件服务器、API代理工具、项目scafford生成器、接口模拟\代理、项目构建部署。

安装
----
	npm install qin -g （推荐使用cnpm）

使用
----
	使用 qin -p [int] 提供http服务
	如果需要进行扩展功能可以通过 qin -i 生成扩展文件

参数
----
	qin  开启服务 默认随机选取端口
	qin -p --port 指定选取端口

接口模拟
-------
	-通过config.json 自定义api list
	-对于线上接口，设置apiPath可实现自动转发

关于config.json
```
	{
  	 "apiPath": {
        "status": false,					// 是否转发请求的开关
        "url": "http://192.168.217.85"
    },
    "routes": {
        "/": "/bowser_component"  // 表示 将/bowser_component下的内容 同级化至 /
    },
    "ajaxList": {

    }
	}

```

