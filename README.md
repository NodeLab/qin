Q - I - N
=========
[![Build Status](https://travis-ci.org/NodeLab/qin.svg?branch=master)](https://travis-ci.org/NodeLab/qin)
  
  这是一个简单的开发环境，用于实现环境mock、接口代理等功能。
  
## 使用场景

1. 搭建一个简单的 http 环境，例如flash的as脚本，页面内的静态资源
2. 搭建一个 `FTL` 的模版渲染引擎，通过配置一些数据 ，更好的实现前后端分离
3. 搭建一个接口 `mock` 支持 GET POST 的ajax请求 (通过配置config.json)
4. 转发请求至开发环境，对于某些难以 `mock` 的请求(例如需要权限校验的场景)可以转发至开发环境
  
## 安装

```shell
npm i -g qin
## 推荐使用 cnpm 安装
```

## 使用方式

* 在命令行、项目路径内，输入 `qin`

```shell
cd your/static/path/and/tempalte/project
qin
  
```

* 根据提示，在浏览器内访问本机地址

* 如果你需要继续使用一些高级配置，首先生成配置文件

```shell
qin -i 
## 生成配置文件
vim config.json
## 配置生成文件
qin
## 打开 qin
```

## 选项说明

### -h, --help

列出可用参数，通过使用 `qin -h` 或者 `qin --help` 的方式调用

### －V, --version

显示当前版本，和当前 package.json 中版本一致

### -p, --port [int]

配置 http 服务的启动端口，默认会选用 8000 端口

### -i, --init

生成配置文件，实现自定义的接口 mock、转发

### -e, --easy

不使用自动刷新，提升性能

## 配置文件说明

修改 ```qin -i``` 生成的配置文件，可以实现自定义操作

### apiPath (string)

通过配置这个字段，未 `mock` 的请求会转发到这个地址

### htmlPath (string)

默认的模版路径，例如项目的结构为
```shell
.
└── app
    ├── html
    │   ├── index.ftl
    │   └── ttt.ftl
``` 
如果配置 htmlPath 为html，访问`localhost:port/ttt.ftl`，将返回渲染完毕的`html/ttt.ftl`

#### ajaxList (object)

内容为路由地址，和具体配置的映射关系

```json
{
  "ajaxList": {
    "/test": {
      "type": "get",
      "code": "200",
      "msg": "hello world!"
    },
    "/post": {
      "type": "post",
      "body": {
        "groupId": "189"
      },
      "result": {
        "code": "200"
      },
      "reject": {
        "code": "500"
      }
    }
  }
}
```

### 路由地址

例如示例中的 `/test`, `/post`，配置之后将会代理`localhost:port/test`及`post`

### type

例如示例中的 `type` 字段，选择代理路由的类型是 `get` 或是 `post`

### body

如果配置了这个字段，只有当提交内容的字段和body设置的字段一致才返回 result 字段 否则返回reject

### result

满足 body 条件，返回该字段内容

### reject

不满足 body 条件，返回改字段内容

## 作者

[ref](https://github.com/NodeLab/qin/blob/master/AUTHORS.md)

## 协议

MIT



