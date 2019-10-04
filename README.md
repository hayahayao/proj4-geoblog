# proj4-geoblog

这是我在学习[Vue.js 2 Web Development Projects](https://www.packtpub.com/web-development/vuejs-2-web-development-projects?utm_source=github&utm_medium=repository&utm_campaign=9781787127463) Chapter6的过程中所做的一个练习项目。

项目主要展示一个可供用户发布博客的大地图。主要功能包括：

- 一个登录页，用户可使用Google账号授权登录；
- 主界面展示一张Google地图，每篇博客在地图上都有相应的标记；
- 用户点击地图上的标记时，右侧面板展示该标记处的位置信息、博客，以及评论列表等；
- 用户点击地图上标记外的其他地点时，侧边栏面板会显示一个表单，以便用户在此地点新建一篇博客；
- 应用顶栏展示用户的头像和姓名，以及一个定位按钮和一个登出按钮。

## 运行

### 服务器

[服务器端代码](https://github.com/PacktPublishing/Vue-js-2-Web-Development-Projects/tree/master/Chapter06/chapter6-full/server)

```
npm install
npm start
```

会得到一个运行在3000端口的服务器。

### 客户端

客户端即本项目。

```
npm install
npm run serve / npm run build
```

访问<http://localhost:8080>即可查看。

## 技术点

- 使用[Vuex](https://vuex.vuejs.org/zh/)进行集中式的状态管理，包括：
  - `store`对用户信息的管理；
  - `maps`模块对地图相关信息的管理；
  - `posts`模块对博客相关信息的管理；
- 使用[Google OAuth](https://developers.google.com/identity/protocols/OAuth2) API将应用和用户连接起来；
- 使用第三方库[vue-googlemaps](https://github.com/Akryum/vue-googlemaps)将Google地图集成到应用中；
- 使用渲染函数和JSX实现`BlogContent`组件，实现动态模板
- 使用函数式组件实现`Comment`组件，更轻量更快速

## 项目结构

```
│  filters.js               // 时间过滤器
│  main.js                  // 主程序
│  router.js                // 路由配置
│
├─components
│  │  App.vue               // 项目入口
│  │  AppMenu.vue           // 上方菜单栏
│  │  BlogMap.vue           // Google地图
│  │  GeoBlog.vue           // 博客地图页面
│  │  Login.vue             // 登录页面
│  │  NotFound.vue          // 404页面
│  │
│  └─content                // 右侧博客内容面板
│          BlogContent.vue  // 整体面板框架
│          Comment.vue      // 评论组件
│          CreatePost.vue   // 新建博客面板
│          LocationInfo.vue // 上方地点信息
│          NoContent.vue    // 无内容面板
│          PlaceDetails.vue // 用于LocationInfo的地点信息组件
│          PostContent.vue  // 博客内容面板
│
├─plugins
│      fetch.js             // 向服务器发起请求的$fetch方法
│
├─store                     // 使用Vuex进行集中式状态管理
│      index.js             // 管理用户信息
│      maps.js              // 管理地图相关信息的模块
│      posts.js             // 管理博客相关信息的模块
│
└─styles                    // 原书给定的stylus样式
        imports.styl
        main.styl
        md-colors.styl
        mixins.styl
        transitions.styl
        vars.styl
```