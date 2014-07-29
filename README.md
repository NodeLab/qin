A - I - R
=========
[![Build Status](https://travis-ci.org/elrrrrrrr/air.svg?branch=master)](https://travis-ci.org/elrrrrrrr/air)
	
	这是一个非常简洁的开发环境，主要用于进行推广活动开发。

功能
---------
	提供静态文件服务器、API代理工具、项目scafford生成器、抽奖登录相关接口模拟、项目构建部署。

安装
----
	npm install elr -g （推荐使用cnpm）

使用
----
	elr  开启服务 默认随机选取端口
	elr -p --port 指定选取端口
	elr -s --scafford [name] 项目原型搭建
	*elr build    构建图片 
	*elr deploy   部署
	*elr init     生成配置文件
	
接口模拟 
-------
	可通过根目录下config.json扩展接口
	对于线上接口，设置apiPath可实现自动转发
构建 
----
	gulp   批量压缩图片
	gulp   压缩合并js文件

部署
----
	ftp 自动上线

	
