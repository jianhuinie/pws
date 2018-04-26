<!DOCTYPE html>

{{*

@file 用于所有页面的M站页面的父模板
@author xuzheng
@date 2015-12-16

*}}

<html lang="zh-CN">
{{*{{strip}}*}}
{{*
site_config参数：
$site_config.mainUri 主域名（http://m.genshuixue.com/， http://dev-m.genshuixue.com/）
$site_config.baseUri 当前域名（http://bj.m.genshuixue.com/, http://jigou.m.genshuixue.com/）
$site_config.protocol HTTP协议（http or https）
$site_config.staticBaseUri M站静态资源路径（http://m-cdn.genshuixue.com/）
$site_config.staticBaseLiveUri 直播cdn静态资源路径
$site_config.env
*}}
{{$origin = rtrim($site_config.baseUri, '/')}}
{{$origin_http = $origin|replace:"https://":"http://"}}
{{$origin_https = $origin|replace:"http://":"https://"}}

{{$main_origin = rtrim($site_config.mainUri, '/')}}
{{$main_domain = $main_origin|replace:"https://":""|replace:"http://":""}}

{{$static_origin = rtrim($site_config.staticBaseUri, '/')}}
{{$static_origin_http = $static_origin|replace:"https://":"http://"}}
{{$static_origin_https = $static_origin|replace:"http://":"https://"}}

{{$env = 'dev'}}
{{if $main_domain == "m.genshuixue.com"}}
    {{$env = 'www'}}
{{elseif $main_domain == "beta-m.genshuixue.com"}}
    {{$env = 'beta'}}
{{elseif $main_domain == "test-m.genshuixue.com"}}
    {{$env = 'test'}}
{{else}}
    {{$env = 'dev'}}
{{/if}}
<head>
    {{*其他需要初始化的模块, 这个数组的名字不可以修改,打包脚本会用到*}}
    {{*业务逻辑不要直接只用这个数组,如需加载其他模块请直接用require,但现在还不支持*}}
    {{$g_modules = array()}}

    {{block name="page"}}
        {{$page_title = "跟谁学-找好老师，上跟谁学"}}
        {{$page_description = ""}}
        {{$page_keywords = ""}}

        {{*页面入口模块*}}
        {{$page_module = ""}}

        {{*页面右下角,返回顶部按钮*}}
        {{$enable_backTopButton = true}}
    {{/block}}
    <meta charset="utf-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <!-- TDK -->
    <title>{{$page_title}}</title>
    {{if !empty($page_description)}}
        <meta name="description" content="{{$page_description}}"/>
    {{/if}}
    {{if !empty($page_keywords)}}
        <meta name="keywords" content="{{$page_keywords}}"/>
    {{/if}}

    <meta name="format-detection" content="telephone=no"/>

    <!--兼容老浏览器-->
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">

    <meta name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1">

    <!--隐藏苹果工具栏和菜单栏-->
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <!--todo 修改苹果浏览器状态栏样式-->
    <!--<meta name="apple-mobile-web-app-status-bar-style" content="black">-->

    <!--chrome工具栏颜色（android chrome 39开始支持）-->
    <meta name="theme-color" content="#FF9900">

    <meta name="baidu-site-verification" content="AwZm789POz"/>
    <meta name="format-detection" content="telephone=no">

    <meta http-equiv="x-dns-prefetch-control" content="on"/>

    <link rel="dns-prefetch" href="http://storage.genshuixue.com"/>
    <link rel="dns-prefetch" href="https://click.genshuixue.com"/>


    <meta name="gsx-page" content="{{$ext_data.page}}"/>
    {{block name="meta"}}{{/block}}

    {{*相关数据,比如script_data*}}
    {{block name="_data"}}{{/block}}
    {{block name="data"}}{{/block}}

    <script src="{{$static_origin}}/src/loader.js"></script>
    <script label-del="true" src="{{$static_origin}}/lib/requirejs/plugin_text.js"></script>

    <script>
        {{*ready回调*}}
        (function (global) {
            var page_config = null;
            var require_config = null;
            var cbs = [];

            function isReady() {
                return page_config && require_config;
            }

            function check() {
                if (isReady()) {
                    var cb;
                    while (cb = cbs.shift()) {
                        cb(page_config);
                    }
                }
            }

            global['GSX_INIT'] = function (config) {
                global['GSX_INIT'] = null;
                page_config = config;
                check();
            };
            global['gsx_ready'] = function (callback) {
                if (isReady()) {
                    callback(page_config, require_config);
                } else if ('function' == typeof callback) {
                    cbs.push(callback);
                }
            };
            global['initRequireConfig'] = function (config) {
                config['root_path'] = '{{$static_origin}}/';
                if (require._config) {
                    require._config(config);
                }
                require_config = config || true;
                check();
            };
        })(window);

        {{*PV统计*}}
        gsx_ready(function (page_config) {
            require(['common/analysis'], function (analysis) {
                analysis.pgv({
                    "guid": page_config.log[0],
                    "params": {
                        "page_type": "{{$ext_data.page}}"
                    }
                });
                analysis.watchClick({
                    'params': {
                        "type": "msite",
                        "service": "{{$ext_data.page}}"
                    }
                });
                analysis.timing();
            });
        });

        {{*错误上报*}}
        window.ErrTrace = (function (page_name) {
            var arr = [];

            function send() {
                if (window.require) {
                    var f = arr[0];
                    gsx_ready(function (page_config) {
                        if (page_config.env.type == 'production') {
                            require(['ga'], function (ga) {
                                ga('send', 'event', f[0], f[1], f[2]);
                            });
                        }
                    });
                } else {
                    setTimeout(send, 2000);
                }
            }

            function onErrorHandler(msg, fileName, lineNo, columnNo, errorObject) {
                var info = [];
                if (fileName) {
                    info.push('filename:' + fileName + ';');
                }
                if (lineNo) {
                    info.push(' line:' + lineNo + ';');
                }
                if (columnNo) {
                    info.push(' column:' + columnNo + ';');
                }
                info.push(' url:' + location.href);
                info.push(' ' + msg);
                info.push(' --> ' + navigator.userAgent);
                if (errorObject && errorObject.stack) {
                    info.push(' --> ' + errorObject.stack);
                }
                arr.push(['Javascript Error', page_name, info.join('')]);
                send();
            }

            window.addEventListener('error', function (err) {
                onErrorHandler(
                        err.message,
                        err.filename,
                        err.lineno,
                        err.colno,
                        err.error
                );
            });

            return {
                setLog: function (ex) {
                    onErrorHandler(ex.message, '', -1, -1, ex);
                },
                getLog: function () {
                    return arr;
                },
                trigger: function (errorMsg) {
                    onErrorHandler(errorMsg);
                }
            };
        })("{{$ext_data.page}}");

        {{if !empty($page_module)}}
        var page_module = '{{$page_module}}';
        {{/if}}

        {{if $enable_backTopButton}}
        {{$g_modules[] = 'common/backTopButton'}}
        {{/if}}

        var other_modules = {{json_encode($g_modules)}};

        var page_data = null;
        {{if isset($script_data)}}
        page_data = {{json_encode($script_data)}};
        {{/if}}

    </script>
    <script type="text/javascript">
        (function(){
            /* 一些公共的page参数 */
            window.common_page_info = {};
            common_page_info["page_type"] = "{{$ext_data.page}}";
            {{if isset($log_data)}}
                {{*上报page_str:后端用于标识当前页面路径*}}
                common_page_info["page_str"] = "{{$log_data.page_type}}";
            {{/if}}
            {{if not empty($smarty.get.source)}}
                common_page_info["url_source"] = '{{$smarty.get.source}}';
            {{/if}}
            {{if not empty($smarty.get.traffic_source)}}
                common_page_info["traffic_source"] = '{{$smarty.get.traffic_source}}';
            {{/if}}
        })();
    </script>
    <script label-del="true">
        {{include file="manifest.js"}}
    </script>

    {{block name="style"}}{{/block}}
</head>
<body>
{{include file="page_app/_base/parts_base/domain.tpl"}}

{{strip}}
    <div id="page_main">
        {{block name="content"}}{{/block}}
    </div>
{{/strip}}
{{*页面内容*}}

{{*发出report请求*}}
{{$reportUrl = $main_origin|cat:"/static/report"}}
{{if $site_config.protocol == "https"}}
    {{$reportUrl = $reportUrl|replace:"http://":"https://"}}
{{/if}}
{{$reportCity = $ext_data.curr_city.id}}
{{$report_param_p = $ext_data.page}}
<script type="text/javascript"
        src="{{$reportUrl}}?p={{$report_param_p}}&city={{$reportCity}}"></script>

{{include file='page_app/_base/parts_base/page_init.tpl'}}

{{block name="script"}}{{/block}}

</body>
{{*{{/strip}}*}}
</html>
