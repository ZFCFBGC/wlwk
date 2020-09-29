# wlwk

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#### 特别注意：
1.有新增包或第三方插件要先确认原工程中node_modules及package.json是否包含对应的文件，若需要添加则提前告知相关开发人员。
2.确保编译打包后的dist文件夹下仅有index.html文件和static文件夹。

#### 代码管理：
1.项目代码统一从指定git拉取初始化代码。
2.各个开发人员均在dev分支上开发，测试通过后才合并到master分支。
3.开发过程中，最好保证每天上班拉去一下代码，下班提交当天的代码。

#### 技术相关：
1.统一使用vue框架开发，脚手架vue-cli2.96。
2.项目构建工具统一使用webpack。
3.css预编译语言采用less。
4.UI统一使用element-ui。
5.图表类插件使用echarts。

#### 统一开发规范：

1.Body fontSize默认16px，页面元素长度单位采用px

------

2.**环境定义：通过process.env.NODE_ENV区分环境，dev为开发环境，pro为生产环境**

------

3.公共组件保存在src/components中，页面开发在对应的src/page。

------

4.公共工具方法写在*src/assets/js/tools.js*中，该文件已经在main.js中引入，添加在window对象下：

------

5.公共CSS写在*src/assets/css/base.css*中，该文件已经在main.js中引入，如果想要修改公共CSS需通知其他相关开发人员：

------

6.已引入js-cookie,绑定在vue属性上，该文件已经在main.js中注册.使用时采用 *this.$cookie* 调用：

------

7.production环境已过滤掉console.log,如有需要开放则去build/webpack.prod.conf.js去关闭。搜索关键字drop_console有明确注释（慎操作）
