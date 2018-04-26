# gsx-design-m
---

## 介绍
---
* 跟谁学m站所有用到的公共ui控件，例如：Loading、Dialog...
* util统一，例如：url.parse之类
* 构建工具的限制，仅支持amd，umd之后支持
* 统一的包管理工具bower
* 样式支持stylus/less

## 依赖
---
* jquery
* artTemplate
* iscroll

## 目录说明
---
* demo 所有src下新增的文件，必须要加相关demo
* src
    * component ui控件，所有和dom相关的，包括Loading、imageLazyLoad
        * appWakeUp app唤起
        * BasePopupDiv 弹出层DIV基础类
        * Dialog 
        * DomSize
        * DropLoad 上拉加载更多
        * fixTab 吸顶
        * ImagePlayer 图片播放器
        * lazyLoadImage 图片懒加载
        * Loading loading
        * MutipleSlide 多列滑动组件
        * PageMask 页面遮罩层
        * SlideInDialog 底部滑入控件
        * wxMask 微信遮罩层
    * util
* test 所有src下新增的功能，建议加上ut  
`** 说明 **`：
src 下面新增功能要求如下，例如：新增Loading，目录结构如下：
* component
    * Loading
        * index.js  存放实现
        * readme.md 存放说明，例如demo地址，使用方式

## 安装
---



