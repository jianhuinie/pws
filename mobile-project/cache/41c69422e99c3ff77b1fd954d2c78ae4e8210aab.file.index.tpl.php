<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/index/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:605677508584b7098570533-71505350%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '41c69422e99c3ff77b1fd954d2c78ae4e8210aab' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/index/index.tpl', 1 => 1481336833, 2 => 'file', ), '6ec51e77a3d6cbb1810f71fc1d75564ba1062951' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/_base/base_default.tpl', 1 => 1467975500, 2 => 'file', ), '8f28543d315cab791d6032df18eaa1d02ee6bc0b' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/_base/base.tpl', 1 => 1467975500, 2 => 'file', ), '2a4efa16f49177e848bb7ae738ffaf68db51c488' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/_common/nav_bar/nav_bar.tpl', 1 => 1481336833, 2 => 'file', ), '188ee7c04ac45e81d5babee7e05ff0d3bb4187f6' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/fourTab/index.tpl', 1 => 1473418693, 2 => 'file', ), '9f8705c5f94424ce40ec2718ace15977558b2f2d' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/addQQ/index.tpl', 1 => 1473418693, 2 => 'file', ), '19aaeb52c5b98c16be30d1bc100bf0640a19112d' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/banner/index.tpl', 1 => 1473418693, 2 => 'file', ), '638ca3c572e21fb9a300f4d9e79b1d7a31bd7dc6' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/courseCardFour/index.tpl', 1 => 1473418693, 2 => 'file', ), '1bc838e0913819663d85603200e2a04090ad8401' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/courseCardThree/index.tpl', 1 => 1473418693, 2 => 'file', ), '2d349d8de2f2ce451fbaea27b6f49e5a2318e846' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/dailySelection/index.tpl', 1 => 1481336833, 2 => 'file', ), 'e3c8c895f65bcbc685d0d1d118989ee2b29765cb' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/fiveTab/index.tpl', 1 => 1481336833, 2 => 'file', ), '588c78f0d995da023415e1fe1f7cc9b2c620d45f' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/orgSelection/index.tpl', 1 => 1473418693, 2 => 'file', ), 'aa42a28032df82eb279fdc3a0bedf946a97d81f5' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/selectedTeacher/index.tpl', 1 => 1473418693, 2 => 'file', ), '0ff69c993c9e65aba4a80438d41f6d7140bcd082' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/tenTab/index.tpl', 1 => 1473418693, 2 => 'file', ), '8d6f4ca5afbbaee9094c7586c0aa5cd0ce6b07ec' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/moreCourse/index.tpl', 1 => 1473418693, 2 => 'file', ), ), 'nocache_hash' => '605677508584b7098570533-71505350', 'function' => array ( ), 'variables' => array ( 'site_config' => 0, 'origin' => 0, 'main_origin' => 0, 'static_origin' => 0, 'main_domain' => 0, 'page_title' => 0, 'page_description' => 0, 'page_keywords' => 0, 'ext_data' => 0, 'log_data' => 0, 'sku_id' => 0, 'page_module' => 0, 'enable_backTopButton' => 0, 'g_modules' => 0, 'script_data' => 0, 'reportUrl' => 0, 'report_param_p' => 0, 'reportCity' => 0, ), 'has_nocache_code' => false, 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_584b709874dac1_93541142',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_584b709874dac1_93541142')) {function content_584b709874dac1_93541142($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include '/Users/bjhl/workspace/Mobile_Web_FE/mock/smarty/plugins/modifier.replace.php';
?><!DOCTYPE html> <html lang="zh-CN"> <?php $_smarty_tpl->tpl_vars['origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['baseUri'],'/'), null, 0);?>
<?php $_smarty_tpl->tpl_vars['origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"https://","http://"), null, 0);?>
<?php $_smarty_tpl->tpl_vars['origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"http://","https://"), null, 0);?> <?php $_smarty_tpl->tpl_vars['main_origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['mainUri'],'/'), null, 0);?>
<?php $_smarty_tpl->tpl_vars['main_domain'] = new Smarty_variable(smarty_modifier_replace(smarty_modifier_replace($_smarty_tpl->tpl_vars['main_origin']->value,"https://",''),"http://",''), null, 0);?> <?php $_smarty_tpl->tpl_vars['static_origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['staticBaseUri'],'/'), null, 0);?>
<?php $_smarty_tpl->tpl_vars['static_origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"https://","http://"), null, 0);?>
<?php $_smarty_tpl->tpl_vars['static_origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"http://","https://"), null, 0);?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('dev', null, 0);?>
<?php if ($_smarty_tpl->tpl_vars['main_domain']->value=="m.genshuixue.com") {?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('www', null, 0);?>
<?php } elseif ($_smarty_tpl->tpl_vars['main_domain']->value=="beta-m.genshuixue.com") {?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('beta', null, 0);?>
<?php } elseif ($_smarty_tpl->tpl_vars['main_domain']->value=="test-m.genshuixue.com") {?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('test', null, 0);?>
<?php } else { ?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('dev', null, 0);?>
<?php }?>
<head> <?php $_smarty_tpl->tpl_vars['g_modules'] = new Smarty_variable(array(), null, 0);?> <?php $_smarty_tpl->tpl_vars['area'] = new Smarty_variable("bj", null, 0);?> <?php if (isset($_smarty_tpl->tpl_vars['ext_data']->value['curr_city'])&&!empty($_smarty_tpl->tpl_vars['ext_data']->value['curr_city']['domain'])) {?> <?php $_smarty_tpl->tpl_vars['area'] = new Smarty_variable($_smarty_tpl->tpl_vars['ext_data']->value['curr_city']['domain'], null, 0);?> <?php }?> <?php if (empty($_GET['grade'])) {?> <?php $_smarty_tpl->tpl_vars['grade'] = new Smarty_variable('', null, 0);?> <?php } else { ?> <?php $_smarty_tpl->tpl_vars['grade'] = new Smarty_variable((rawurlencode($_GET['grade'])), null, 0);?> <?php }?> <?php $_smarty_tpl->tpl_vars['isShare'] = new Smarty_variable(false, null, 0);?> <?php if (isset($_GET['s'])&&$_GET['s']=='share') {?> <?php $_smarty_tpl->tpl_vars['isShare'] = new Smarty_variable(true, null, 0);?> <?php }?> <?php $_smarty_tpl->tpl_vars['grade_value'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value['channel_name'], null, 0);?> <?php ob_start();?><?php if ($_smarty_tpl->tpl_vars['isShare']->value) {?><?php echo "?s=share";?><?php }?><?php $_tmp1=ob_get_clean();?><?php $_smarty_tpl->tpl_vars['search_button'] = new Smarty_variable("/".((string)$_smarty_tpl->tpl_vars['area']->value)."/st-.html".$_tmp1, null, 0);?> <?php $_smarty_tpl->tpl_vars['page_title'] = new Smarty_variable($_smarty_tpl->tpl_vars['grade_value']->value, null, 0);?> <?php $_smarty_tpl->tpl_vars['page_module'] = new Smarty_variable("page/k12Channel/index/index", null, 0);?> <?php $_smarty_tpl->tpl_vars['enable_backTopButton'] = new Smarty_variable(true, null, 0);?> <?php $_smarty_tpl->tpl_vars['color'] = new Smarty_variable("#ff9100", null, 0);?> <?php if ($_smarty_tpl->tpl_vars['tpl_data']->value['color']) {?> <?php $_smarty_tpl->tpl_vars['color'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value['color'], null, 0);?> <?php }?> <?php $_smarty_tpl->tpl_vars['script_data'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value, null, 0);?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['grade'] = $_smarty_tpl->tpl_vars['grade']->value;?> <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <!-- TDK --> <title><?php echo $_smarty_tpl->tpl_vars['page_title']->value;?>
</title> <?php if (!empty($_smarty_tpl->tpl_vars['page_description']->value)) {?> <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['page_description']->value;?>
"/> <?php }?> <?php if (!empty($_smarty_tpl->tpl_vars['page_keywords']->value)) {?> <meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['page_keywords']->value;?>
"/> <?php }?> <meta name="format-detection" content="telephone=no"/> <!--兼容老浏览器--> <meta name="HandheldFriendly" content="True"> <meta name="MobileOptimized" content="320"> <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1"> <!--隐藏苹果工具栏和菜单栏--> <meta name="apple-mobile-web-app-capable" content="yes"/> <!--todo 修改苹果浏览器状态栏样式--> <!--<meta name="apple-mobile-web-app-status-bar-style" content="black">--> <!--chrome工具栏颜色（android chrome 39开始支持）--> <meta name="theme-color" content="#FF9900"> <meta name="baidu-site-verification" content="AwZm789POz"/> <meta name="format-detection" content="telephone=no"> <meta http-equiv="x-dns-prefetch-control" content="on"/> <link rel="dns-prefetch" href="http://storage.genshuixue.com"/> <link rel="dns-prefetch" href="http://click.genshuixue.com"/> <meta name="gsx-page" content="<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
"/> <?php if (!$_smarty_tpl->tpl_vars['ext_data']->value['is_app']&&!$_smarty_tpl->tpl_vars['ext_data']->value['is_tapp']) {?> <?php $_smarty_tpl->createLocalArrayVariable('g_modules', null, 0);
$_smarty_tpl->tpl_vars['g_modules']->value[] = 'common/_page_init';?> <?php }?> <script type="text/javascript"> (function(){ /* 一些公共的page参数 */ window.common_page_info = {}; common_page_info["page_type"] = "<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
"; <?php if (isset($_smarty_tpl->tpl_vars['log_data']->value)) {?> common_page_info["page_str"] = "<?php echo $_smarty_tpl->tpl_vars['log_data']->value['page_type'];?>
"; <?php }?> <?php if (!empty($_GET['source'])) {?> common_page_info["url_source"] = '<?php echo $_GET['source'];?>
'; <?php }?> <?php if (!empty($_GET['traffic_source'])) {?> common_page_info["traffic_source"] = '<?php echo $_GET['traffic_source'];?>
'; <?php }?> })(); </script> <script src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/loader.js"></script> <script label-del="true" src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/lib/requirejs/plugin_text.js"></script> <?php $_smarty_tpl->tpl_vars['sku_id'] = new Smarty_variable('', null, 0);?> <meta name="gsx-sku" content="<?php echo $_smarty_tpl->tpl_vars['sku_id']->value;?>
"> <script> (function (global) { var page_config = null; var require_config = null; var cbs = []; function isReady() { return page_config && require_config; } function check() { if (isReady()) { var cb; while (cb = cbs.shift()) { cb(page_config); } } } global['GSX_INIT'] = function (config) { global['GSX_INIT'] = null; page_config = config; check(); }; global['gsx_ready'] = function (callback) { if (isReady()) { callback(page_config, require_config); } else if ('function' == typeof callback) { cbs.push(callback); } }; global['initRequireConfig'] = function (config) { config['root_path'] = '<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/'; if (require._config) { require._config(config); } require_config = config || true; check(); }; })(window); gsx_ready(function (page_config) { require(['common/analysis'], function (analysis) { var pvParam = { "guid": page_config.log[0], "params": { "user_role": page_config.user ? page_config.user.type : '', "page_type": "<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
" } }; pvParam.params["page_str"] = common_page_info.page_str || ""; /*pvParam.params['url_source'] = common_page_info.url_source || "";*/ if (common_page_info.traffic_source) { pvParam.params['traffic_source'] = common_page_info.traffic_source || ""; } analysis.pgv(pvParam); if (!page_config.env.is_app) { analysis.sku({ "guid": page_config.log[0], "page_type": "<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
", 'terminal': 'm', 'city_id': page_config.city.id, 'sku_id': '<?php echo $_smarty_tpl->tpl_vars['sku_id']->value;?>
' }); } analysis.watchClick({ 'params': { "type": "msite", "service": "<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
" } }); analysis.timing(); }); }); window.ErrTrace = (function (page_name) { var arr = []; function send() { if (window.require) { var f = arr[0]; gsx_ready(function (page_config) { if (page_config.env.type == 'production') { require(['ga'], function (ga) { ga('send', 'event', f[0], f[1], f[2]); }); } }); } else { setTimeout(send, 2000); } } function onErrorHandler(msg, fileName, lineNo, columnNo, errorObject) { var ua = navigator.userAgent; if (ua.toLowerCase().indexOf('baiduboxapp') != -1) { return; } var info = []; if (fileName) { info.push('filename:' + fileName + ';'); } if (typeof lineNo == 'number') { info.push(' line:' + lineNo + ';'); } if (typeof columnNo == 'number') { info.push(' column:' + columnNo + ';'); } info.push(' url:' + location.href); info.push(' ' + msg); info.push(' --> ' + navigator.userAgent); if (errorObject && errorObject.stack) { info.push(' --> ' + errorObject.stack); } arr.push(['Javascript Error', page_name, info.join('')]); send(); } window.addEventListener('error', function (err) { onErrorHandler( err.message, err.filename, err.lineno, err.colno, err.error ); }); return { setLog: function (ex) { onErrorHandler(ex.message, '', -1, -1, ex); }, getLog: function () { return arr; }, trigger: function (errorMsg) { onErrorHandler(errorMsg); } }; })("<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
"); <?php if (!empty($_smarty_tpl->tpl_vars['page_module']->value)) {?> var page_module = '<?php echo $_smarty_tpl->tpl_vars['page_module']->value;?>
'; <?php }?> <?php if ($_smarty_tpl->tpl_vars['enable_backTopButton']->value) {?> <?php $_smarty_tpl->createLocalArrayVariable('g_modules', null, 0);
$_smarty_tpl->tpl_vars['g_modules']->value[] = 'common/backTopButton';?> <?php }?> var other_modules = <?php echo json_encode($_smarty_tpl->tpl_vars['g_modules']->value);?>
; var page_data = null; <?php if (isset($_smarty_tpl->tpl_vars['script_data']->value)) {?> page_data = <?php echo json_encode($_smarty_tpl->tpl_vars['script_data']->value);?>
; <?php }?> </script> <script label-del="true"> <?php echo $_smarty_tpl->getSubTemplate ("manifest.js", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?> </script> <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/page/k12Channel/index/index.styl"/> </head>
<body>
<?php echo $_smarty_tpl->getSubTemplate ("page/_base/parts_base/domain.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?> <div id="page_main"><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['grade_value']->value;?>
<?php $_tmp3=ob_get_clean();?><?php /* Call merged included template "page/_common/nav_bar/nav_bar.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("page/_common/nav_bar/nav_bar.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('text'=>$_tmp3), 0, '605677508584b7098570533-71505350');
content_584b7098617df9_43479167($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/_common/nav_bar/nav_bar.tpl" */?><?php $_smarty_tpl->tpl_vars['data_list'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value['list'], null, 0);?><?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['data_list']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><?php if ($_smarty_tpl->tpl_vars['item']->value['template']=='fourTab') {?><?php /* Call merged included template "page/k12Channel/component/fourTab/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/fourTab/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b7098640070_18315942($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/fourTab/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='addQQ') {?><?php /* Call merged included template "page/k12Channel/component/addQQ/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/addQQ/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b709865d9e3_97491433($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/addQQ/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='banner') {?><?php /* Call merged included template "page/k12Channel/component/banner/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/banner/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b7098669ce1_49518413($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/banner/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='courseCardFour') {?><?php /* Call merged included template "page/k12Channel/component/courseCardFour/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/courseCardFour/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b7098674389_50774639($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/courseCardFour/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='courseCardThree') {?><?php /* Call merged included template "page/k12Channel/component/courseCardThree/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/courseCardThree/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b709868b1f6_01027243($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/courseCardThree/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='dailySelection') {?><?php /* Call merged included template "page/k12Channel/component/dailySelection/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/dailySelection/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b70986b1692_24792501($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/dailySelection/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='fiveTab') {?><?php /* Call merged included template "page/k12Channel/component/fiveTab/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/fiveTab/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b70986c5403_44155969($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/fiveTab/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='orgSelection') {?><?php /* Call merged included template "page/k12Channel/component/orgSelection/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/orgSelection/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b70986e0084_06806327($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/orgSelection/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='selectedTeacher') {?><?php /* Call merged included template "page/k12Channel/component/selectedTeacher/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/selectedTeacher/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b70986f1681_60719152($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/selectedTeacher/index.tpl" */?><?php } elseif ($_smarty_tpl->tpl_vars['item']->value['template']=='tenTab') {?><?php /* Call merged included template "page/k12Channel/component/tenTab/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate('page/k12Channel/component/tenTab/index.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b709870a120_32645333($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/tenTab/index.tpl" */?><?php }?><?php } ?><?php /* Call merged included template "page/k12Channel/component/moreCourse/index.tpl" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("page/k12Channel/component/moreCourse/index.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('course_list'=>$_smarty_tpl->tpl_vars['item']->value), 0, '605677508584b7098570533-71505350');
content_584b70987187a9_09930308($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "page/k12Channel/component/moreCourse/index.tpl" */?><?php if ($_smarty_tpl->tpl_vars['tpl_data']->value['bubble_url']) {?><div class="bubble"><a href="#add-qq" data-appnojump='true'><img src="<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['bubble_url'];?>
"></a></div><?php }?></div><div id="bottom-container" style="position: fixed;width:100%;bottom:0;"><div style="width:100%;position:relative;"></div></div> <?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(($_smarty_tpl->tpl_vars['main_origin']->value).("/static/report"), null, 0);?>
<?php if ($_smarty_tpl->tpl_vars['site_config']->value['protocol']=="https") {?> <?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['reportUrl']->value,"http://","https://"), null, 0);?>
<?php }?>
<?php $_smarty_tpl->tpl_vars['reportCity'] = new Smarty_variable($_smarty_tpl->tpl_vars['ext_data']->value['curr_city']['id'], null, 0);?>
<?php $_smarty_tpl->tpl_vars['report_param_p'] = new Smarty_variable($_smarty_tpl->tpl_vars['ext_data']->value['page'], null, 0);?>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['reportUrl']->value;?>
?p=<?php echo $_smarty_tpl->tpl_vars['report_param_p']->value;?>
&city=<?php echo $_smarty_tpl->tpl_vars['reportCity']->value;?>
"></script> <?php echo $_smarty_tpl->getSubTemplate ('page/_base/parts_base/page_init.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?> </body> </html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/_common/nav_bar/nav_bar.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b7098617df9_43479167')) {function content_584b7098617df9_43479167($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_cn_truncate')) include '/Users/bjhl/workspace/Mobile_Web_FE/mock/smarty/plugins/modifier.cn_truncate.php';
?><header id="page_nav_bar" class="nav-bar"> <?php if (!(isset($_smarty_tpl->tpl_vars['no_back_button']->value)&&!empty($_smarty_tpl->tpl_vars['no_back_button']->value)&&$_smarty_tpl->tpl_vars['no_back_button']->value)) {?> <div class="nav-wrap-left"> <?php if (isset($_smarty_tpl->tpl_vars['type']->value)&&$_smarty_tpl->tpl_vars['type']->value=='askDetail') {?> <a class="nav-button" href="javascript:history.length == 1?(window.location.href='http://m.genshuixue.com/wenda/home'):history.go(-1);"> <?php } else { ?> <a class="nav-button" href="javascript:history.length == 1?(window.location.href='http://m.genshuixue.com/'):history.go(-1);"> <?php }?> <i class="icon icon-back"></i> </a> </div> <?php }?> <div class="nav-header h1"> <?php echo smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['text']->value,12);?> </div> <?php if (isset($_smarty_tpl->tpl_vars['search_button']->value)&&!empty($_smarty_tpl->tpl_vars['search_button']->value)&&$_smarty_tpl->tpl_vars['search_button']->value) {?> <div class="nav-wrap-right"> <a href="<?php echo $_smarty_tpl->tpl_vars['search_button']->value;?>
"><span class="icon-search"></span></a> </div> <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['menu_button']->value)&&!empty($_smarty_tpl->tpl_vars['menu_button']->value)&&$_smarty_tpl->tpl_vars['menu_button']->value) {?> <div class="nav-wrap-right"> <span class="nav-button menu-button"> <i class="icon icon-menu"></i> </span> </div> <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['share_button']->value)&&!empty($_smarty_tpl->tpl_vars['share_button']->value)&&$_smarty_tpl->tpl_vars['share_button']->value) {?> <div class="nav-wrap-right"> <span class="nav-button"> <a href="http://kaoyan.m.genshuixue.com/download/kaoyan"> <img width="20" height="20" src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/page/_common/nav_bar/ic_hc_donwload_n@2x.png" > </a> </span> </div> <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['addIcon']->value)&&!empty($_smarty_tpl->tpl_vars['addIcon']->value)&&$_smarty_tpl->tpl_vars['addIcon']->value) {?> <div class="nav-wrap-right"> <span class="nav-button"> <a href="/recommend/fill_info?source=genshuixue&page_type=index-index&type=list"> <img width="20" height="20" src="http://img.gsxservice.com/0cms/d/file/content/2016/08/57c687a463fe7.png" > </a> </span> </div> <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['studentRoomRule']->value)&&!empty($_smarty_tpl->tpl_vars['studentRoomRule']->value)&&$_smarty_tpl->tpl_vars['studentRoomRule']->value) {?> <div class="nav-wrap-right"> <span class="nav-button"> <a href="/recommend/studentsHallRule"> <span style="margin-right: 15px;color: #6d6d6e;">规则说明</span> </a> </span> </div> <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['ask_button']->value)&&!empty($_smarty_tpl->tpl_vars['ask_button']->value)&&$_smarty_tpl->tpl_vars['ask_button']->value) {?> <div class="nav-wrap-right"> <span class="nav-button"> <a data-href="/Wenda/askQuestion" class="answer-tobe-ask"> <span style="font-size:14px;">提问</span> </a> </span> </div> <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['askRoom']->value)&&!empty($_smarty_tpl->tpl_vars['askRoom']->value)&&$_smarty_tpl->tpl_vars['askRoom']->value) {?> <div class="nav-wrap-right"> <span class="nav-button"> <a data-href="/Wenda/askQuestion" class="ask-for-teacher"> <span class="my-question"> <p class="my-question-text">我的提问</p> <?php if (isset($_smarty_tpl->tpl_vars['questionNumber']->value)&&$_smarty_tpl->tpl_vars['questionNumber']->value>0) {?> <p class="my-question-number"></p> <?php }?> </span> </a> </span> </div> <?php }?> </header> <script> /* 如果在app中，隐藏掉navbar */ /* bjum:用于判断UM-app */ var ua = navigator.userAgent.toLowerCase(); if (ua.indexOf('genshuixue') > -1 || /bjum-(\w*)/.exec(ua)) { document.getElementById('page_nav_bar').style.display="none"; var bodyCss = document.body.style.cssText; if (bodyCss.indexOf('is-app') == -1) { bodyCss += "is-app"; document.body.setAttribute('class', bodyCss); } } gsx_ready(function (config) { if (config.source == "baidu_app_zhidahao" || config.source == "baidu_zhidahao"|| config.source == "x360life") { document.getElementById("page_nav_bar").style.display = "none"; } });
</script>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/fourTab/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b7098640070_18315942')) {function content_584b7098640070_18315942($_smarty_tpl) {?><div class="four-tab"> <?php $_smarty_tpl->tpl_vars['tab_data'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?> <div class="four-tab-one tab-item logClick" data-url="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[0]['webUrl'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[0]['is_search'];?>
" data-ctype="0" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['tab_data']->value[0]['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[0]['keyword'];?>
"<?php }?>> <p class="title"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[0]['title'];?>
</p> <p class="sub" style="margin-bottom: 27px;"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[0]['sub'];?>
</p> <img src="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[0]['imgUrl'];?>
" class="tab-avart-one"> </div> <div class="four-tab-two tab-item logClick" data-url="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[1]['webUrl'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[1]['is_search'];?>
" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['tab_data']->value[1]['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[1]['keyword'];?>
"<?php }?>> <p class="title" style="width:65%;"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[1]['title'];?>
</p> <p class="sub line-clamp" style="width:65%;"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[1]['sub'];?>
</p> <img src="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[1]['imgUrl'];?>
" class="tab-avart-two"> </div> <div class="four-tab-three tab-item logClick" data-url="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[2]['webUrl'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[2]['is_search'];?>
" data-ctype="2" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['tab_data']->value[2]['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[2]['keyword'];?>
"<?php }?>> <p class="title line-clamp line-clamp-2"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[2]['title'];?>
</p> <p class="sub line-clamp"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[2]['sub'];?>
</p> <img src="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[2]['imgUrl'];?>
" class="tab-avart-other"> </div> <div class="four-tab-four tab-item logClick" data-url="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[3]['webUrl'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[3]['is_search'];?>
" data-ctype="3" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['tab_data']->value[3]['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[3]['keyword'];?>
"<?php }?>> <p class="title line-clamp line-clamp-2"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[3]['title'];?>
</p> <p class="sub line-clamp"><?php echo $_smarty_tpl->tpl_vars['tab_data']->value[3]['sub'];?>
</p> <img src="<?php echo $_smarty_tpl->tpl_vars['tab_data']->value[3]['imgUrl'];?>
" class="tab-avart-other"> </div> </div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/addQQ/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b709865d9e3_97491433')) {function content_584b709865d9e3_97491433($_smarty_tpl) {?><?php $_smarty_tpl->tpl_vars['data_info'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?>
<div class="add-qq" id="add-qq"> <img data-src="<?php echo $_smarty_tpl->tpl_vars['data_info']->value['img'];?>
"> <p><?php echo $_smarty_tpl->tpl_vars['data_info']->value['name'];?>
</p> <p>(<?php echo $_smarty_tpl->tpl_vars['data_info']->value['number'];?>
)</p> <div class="add-qq-now" data-url="<?php echo $_smarty_tpl->tpl_vars['data_info']->value['url'];?>
" data-andriod-key="<?php echo $_smarty_tpl->tpl_vars['data_info']->value['android_key'];?>
" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;border: 1px solid <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">立即加入该群</div>
</div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/banner/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b7098669ce1_49518413')) {function content_584b7098669ce1_49518413($_smarty_tpl) {?><div class="baner-wrap bottom"> <div class="top-slider top-sliders-container" id="myslider"> <ul class="slide_group clearfix"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['course_list']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true; $_smarty_tpl->tpl_vars['item']->index++;
?> <li class="slide" data-index="<?php echo $_smarty_tpl->tpl_vars['item']->index;?>
"> <a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['webUrl'];?>
" class="logClick" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
"> <img width="100%" height="100%" data-src="<?php echo $_smarty_tpl->tpl_vars['item']->value['imgUrl'];?>
"/> </a> </li> <?php } ?> </ul> <ul class="slide_position clearfix"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['course_list']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true; $_smarty_tpl->tpl_vars['item']->index++;
?> <?php if ($_smarty_tpl->tpl_vars['item']->index==0) {?> <li class="on"> <span></span> </li> <?php } else { ?> <li> <span></span> </li> <?php }?> <?php } ?> </ul> </div>
</div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/courseCardFour/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b7098674389_50774639')) {function content_584b7098674389_50774639($_smarty_tpl) {?><?php $_smarty_tpl->tpl_vars['data_info'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?>
<div class="course-card-four"> <div class="start-title"> <span class="icon-star_all block-line"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="title"><?php echo $_smarty_tpl->tpl_vars['data_info']->value['title'];?>
</div> <span class="icon-star_all block-line block-line-right"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="start-title-sub"> <?php echo $_smarty_tpl->tpl_vars['data_info']->value['sub'];?> </div> </div> <ul class="course-info clearfix"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['data_info']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?> <li data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" data-type="<?php echo $_smarty_tpl->tpl_vars['item']->value['type'];?>
" data-number="<?php echo $_smarty_tpl->tpl_vars['item']->value['course_number'];?>
" class="course-item course-item-card logClick" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
"> <div class="first-nav"> <img data-src="<?php echo $_smarty_tpl->tpl_vars['item']->value['img'];?>
"> <p> 已报名<?php echo $_smarty_tpl->tpl_vars['item']->value['total_pay'];?>
</p> </div> <div class="second-nav"> <span class="title line-clamp"> <?php if ($_smarty_tpl->tpl_vars['item']->value['type']==8) {?> <span class="type-icon">直播课</span> <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['type']==2) {?> <span class="type-icon">线下班课</span> <?php } else { ?> <span class="type-icon">视频课</span> <?php }?> <?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?> </span> </div> <div class="last-nav"> <?php if ($_smarty_tpl->tpl_vars['item']->value['price']==0) {?> <span class="price" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">免费</span> <?php } else { ?> <span class="price" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">￥<?php echo $_smarty_tpl->tpl_vars['item']->value['price'];?>
</span> <?php }?> <?php if ($_smarty_tpl->tpl_vars['item']->value['type']==2) {?> <span class="other-info"><?php echo $_smarty_tpl->tpl_vars['item']->value['distance'];?>
</span> <?php } else { ?> <span class="other-info"><?php echo $_smarty_tpl->tpl_vars['item']->value['begin_time_desc'];?>
</span> <?php }?> </div> </li> <?php } ?> </ul> <div data-url="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['more_url'];?>
" data-ctype="2" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-key-word="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['keyword'];?>
" class="logClick class-card" data-area="<?php echo $_smarty_tpl->tpl_vars['area']->value;?>
"> <div class="has-more" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">更多课程 ></div> </div>
</div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/courseCardThree/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b709868b1f6_01027243')) {function content_584b709868b1f6_01027243($_smarty_tpl) {?><?php $_smarty_tpl->tpl_vars['data_info'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?>
<div class="course-card-three"> <div class="start-title"> <span class="icon-star_all block-line"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="title"><?php echo $_smarty_tpl->tpl_vars['data_info']->value['title'];?>
</div> <span class="icon-star_all block-line block-line-right"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="start-title-sub"> <?php echo $_smarty_tpl->tpl_vars['data_info']->value['sub'];?> </div> </div> <ul class="course-info clearfix"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['data_info']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true; $_smarty_tpl->tpl_vars['item']->index++;
?> <?php if ($_smarty_tpl->tpl_vars['item']->index==0) {?> <li data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" data-type="<?php echo $_smarty_tpl->tpl_vars['item']->value['type'];?>
" data-number="<?php echo $_smarty_tpl->tpl_vars['item']->value['course_number'];?>
" class="course-item course-item-card logClick" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" style="width: 100%;"> <?php } else { ?> <li data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" data-type="<?php echo $_smarty_tpl->tpl_vars['item']->value['type'];?>
" data-number="<?php echo $_smarty_tpl->tpl_vars['item']->value['course_number'];?>
" class="course-item course-item-card logClick" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
"> <?php }?> <div class="first-nav"> <?php if ($_smarty_tpl->tpl_vars['item']->index==0) {?> <img data-src="<?php echo $_smarty_tpl->tpl_vars['item']->value['img'];?>
" style="height: 200px;"> <p style="height: 36px; line-height: 36px; font-size: 14px;"> 已报名<?php echo $_smarty_tpl->tpl_vars['item']->value['total_pay'];?>
</p> <?php } else { ?> <img data-src="<?php echo $_smarty_tpl->tpl_vars['item']->value['img'];?>
"> <p> 已报名<?php echo $_smarty_tpl->tpl_vars['item']->value['total_pay'];?>
</p> <?php }?> </div> <div class="second-nav"> <span class="title line-clamp"> <?php if ($_smarty_tpl->tpl_vars['item']->value['type']==8) {?> <span class="type-icon">直播课</span> <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['type']==2) {?> <span class="type-icon">线下班课</span> <?php } else { ?> <span class="type-icon">视频课</span> <?php }?> <?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?> </span> </div> <div class="last-nav"> <?php if ($_smarty_tpl->tpl_vars['item']->index==0) {?> <?php if ($_smarty_tpl->tpl_vars['item']->value['price']==0) {?> <span class="price" style="font-size: 16px; color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">免费</span> <?php } else { ?> <span class="price" style="font-size: 16px; color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">￥<?php echo $_smarty_tpl->tpl_vars['item']->value['price'];?>
</span> <?php }?> <?php } else { ?> <?php if ($_smarty_tpl->tpl_vars['item']->value['price']==0) {?> <span class="price" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">免费</span> <?php } else { ?> <span class="price" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">￥<?php echo $_smarty_tpl->tpl_vars['item']->value['price'];?>
</span> <?php }?> <?php }?> <?php if ($_smarty_tpl->tpl_vars['item']->value['type']==2) {?> <span class="other-info"><?php echo $_smarty_tpl->tpl_vars['item']->value['distance'];?>
</span> <?php } else { ?> <span class="other-info"><?php echo $_smarty_tpl->tpl_vars['item']->value['begin_time_desc'];?>
</span> <?php }?> </div> </li> <?php } ?> </ul> <div data-url="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['more_url'];?>
" data-ctype="2" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-key-word="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['keyword'];?>
" class="logClick class-card" data-area="<?php echo $_smarty_tpl->tpl_vars['area']->value;?>
"> <div class="has-more" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">更多课程 ></div> </div>
</div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/dailySelection/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b70986b1692_24792501')) {function content_584b70986b1692_24792501($_smarty_tpl) {?><?php $_smarty_tpl->tpl_vars['data_info'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?>
<div class="day-good"> <div class="start-title"> <span class="icon-star_all block-line"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="title"><?php echo $_smarty_tpl->tpl_vars['data_info']->value['title'];?>
</div> <span class="icon-star_all block-line block-line-right"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="start-title-sub"> <?php echo $_smarty_tpl->tpl_vars['data_info']->value['sub'];?> </div> </div> <div class="swiper-container"> <div class="swiper-wrapper"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['data_info']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?> <div class="swiper-slide"> <div class="total"> <div class="total-img"> <div class="img-phone course-item-card" data-number="<?php echo $_smarty_tpl->tpl_vars['item']->value['number'];?>
" data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" data-type="<?php echo $_smarty_tpl->tpl_vars['item']->value['type'];?>
"> <img width="auto" height="auto" src="<?php echo $_smarty_tpl->tpl_vars['item']->value['img'];?>
"/> <div class="course-info line-clamp line-clamp-2"> <?php if ($_smarty_tpl->tpl_vars['item']->value['type']==8) {?> <span class="course-icon" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;border:1px solid <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">直播课</span> <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['type']==2) {?> <span class="course-icon" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;border:1px solid <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">线下班课</span> <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['type']==3) {?> <span class="course-icon" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;border:1px solid <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">视频课</span> <?php } else { ?> <span class="course-icon" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;border:1px solid <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">资讯</span> <?php }?> <span class="course-title"><?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
</span> </div> <p class="pay-number"> <?php if ($_smarty_tpl->tpl_vars['item']->value['type']==10) {?> <?php echo $_smarty_tpl->tpl_vars['item']->value['from'];?> <?php } else { ?> <?php echo $_smarty_tpl->tpl_vars['item']->value['total_pay'];?>
人已报名 <?php }?> </p> </div> </div> </div> </div> <?php } ?> </div> </div>
</div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/fiveTab/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b70986c5403_44155969')) {function content_584b70986c5403_44155969($_smarty_tpl) {?><ul class="five-tab"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['course_list']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true; $_smarty_tpl->tpl_vars['item']->index++;
?> <?php if ($_smarty_tpl->tpl_vars['item']->index<3) {?>
<?php if ($_smarty_tpl->tpl_vars['item']->index==2) {?>
<li class="item-first-nav tab-item logClick" style="border-right:none" data-ctype="<?php echo $_smarty_tpl->tpl_vars['item']->index;?>
" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['item']->value['is_search'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['item']->value['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['item']->value['keyword'];?>
"<?php }?> data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['webUrl'];?>
">
<?php } else { ?>
<li class="item-first-nav tab-item logClick" data-ctype="<?php echo $_smarty_tpl->tpl_vars['item']->index;?>
" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['item']->value['is_search'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['item']->value['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['item']->value['keyword'];?>
"<?php }?> data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['webUrl'];?>
">
<?php }?> <p class="title"><?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
</p> <p class="sub line-clamp"><?php echo $_smarty_tpl->tpl_vars['item']->value['sub'];?>
</p> <img src="<?php echo $_smarty_tpl->tpl_vars['item']->value['imgUrl'];?>
">
</li>
<?php } else { ?> <?php if ($_smarty_tpl->tpl_vars['item']->index==4) {?>
<li class="item-second-nav tab-item logClick" style="border-right:none" data-ctype="<?php echo $_smarty_tpl->tpl_vars['item']->index;?>
" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['item']->value['is_search'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['item']->value['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['item']->value['keyword'];?>
"<?php }?> data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['webUrl'];?>
">
<?php } else { ?>
<li class="item-second-nav tab-item logClick" data-ctype="<?php echo $_smarty_tpl->tpl_vars['item']->index;?>
" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['item']->value['is_search'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['item']->value['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['item']->value['keyword'];?>
"<?php }?> data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['webUrl'];?>
">
<?php }?> <p class="title2"><?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
</p> <p class="sub sub-other line-clamp"><?php echo $_smarty_tpl->tpl_vars['item']->value['sub'];?>
</p> <img src="<?php echo $_smarty_tpl->tpl_vars['item']->value['imgUrl'];?>
" class="second-nav-avart">
</li>
<?php }?>
<?php } ?>
</ul><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/orgSelection/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b70986e0084_06806327')) {function content_584b70986e0084_06806327($_smarty_tpl) {?><?php $_smarty_tpl->tpl_vars['data_info'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?>
<?php $_smarty_tpl->tpl_vars['org_list'] = new Smarty_variable($_smarty_tpl->tpl_vars['data_info']->value['list'], null, 0);?>
<?php if (isset($_smarty_tpl->tpl_vars['data_info']->value['keyword'])&&$_smarty_tpl->tpl_vars['data_info']->value['keyword']) {?>
<div class="nearby-org" data-key-word="<?php echo $_smarty_tpl->tpl_vars['data_info']->value['keyword'];?>
">
<?php } else { ?>
<div class="nearby-org" data-key-word="<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['more']['keyword'];?>
">
<?php }?> <div class="start-title"> <span class="icon-star_all block-line"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="title"><?php echo $_smarty_tpl->tpl_vars['data_info']->value['title'];?>
</div> <span class="icon-star_all block-line block-line-right"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="start-title-sub"> <?php echo $_smarty_tpl->tpl_vars['data_info']->value['sub'];?> </div> </div> <ul class="org-list"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['org_list']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true; $_smarty_tpl->tpl_vars['item']->index++;
?> <a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
"> <?php if ($_smarty_tpl->tpl_vars['item']->index==count($_smarty_tpl->tpl_vars['org_list']->value)-1) {?> <li class="org-item logClick" style="border-bottom: none" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
"> <?php } else { ?> <li class="org-item logClick" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
"> <?php }?> <img data-src="<?php echo $_smarty_tpl->tpl_vars['item']->value['logo'];?>
"> <div class="org-info"> <p class="org-name"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</p> <div class="second-nav"> <span><?php echo $_smarty_tpl->tpl_vars['item']->value['teacher_count'];?>
位老师</span> <span><?php echo $_smarty_tpl->tpl_vars['item']->value['total_comments'];?>
条评论</span> </div> <?php if (isset($_smarty_tpl->tpl_vars['item']->value['range'])) {?> <div class="third-nav"> <span class="location"><?php echo $_smarty_tpl->tpl_vars['item']->value['range'];?>
</span> </div> <?php }?> </div> </li> </a> <?php } ?> </ul> <p class="has-more hide logClick" data-ctype="2" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
">更多机构 ></p> </div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/selectedTeacher/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b70986f1681_60719152')) {function content_584b70986f1681_60719152($_smarty_tpl) {?><?php $_smarty_tpl->tpl_vars['data_info'] = new Smarty_variable($_smarty_tpl->tpl_vars['course_list']->value['data'], null, 0);?>
<?php $_smarty_tpl->tpl_vars['teacher'] = new Smarty_variable($_smarty_tpl->tpl_vars['data_info']->value['list'], null, 0);?> <div class="block sel-teacher bottom"> <div class="start-title"> <span class="icon-star_all block-line"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="title"><?php echo $_smarty_tpl->tpl_vars['data_info']->value['title'];?>
</div> <span class="icon-star_all block-line block-line-right"> <span class="line"></span> <span class="line line-sub"></span> </span> <div class="start-title-sub"><?php echo $_smarty_tpl->tpl_vars['data_info']->value['sub'];?>
</div> </div> <a class="sel-teacher-content logClick" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" href="<?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['url'];?>
"> <div class="avatar"> <img data-src="<?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['avatar'];?>
" width="100%" height="100%"/> </div> <div class="sel-teacher-text" style="border: 1px solid <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
"> <div class="label-text single-line"> <p class="name" style="color:<?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;"><?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['name'];?>
</p> <p style="font-size:12px;height: 24px;line-height: 24px;"> <?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['subject'];?> <?php if ($_smarty_tpl->tpl_vars['teacher']->value['top']['school_age']==-1) {?> 30年以上教龄 <?php } else { ?> <?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['school_age'];?> 年教龄 <?php }?> <?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['student_count'];?>
名学生</p> </div> <div class="describe line-clamp line-clamp-2"> <?php echo $_smarty_tpl->tpl_vars['teacher']->value['top']['desc'];?> </div> </div> </a> <?php if (isset($_smarty_tpl->tpl_vars['teacher']->value['list'])&&count($_smarty_tpl->tpl_vars['teacher']->value['list'])) {?> <div class="land-list"> <div class="list-container"> <div class="list"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['teacher']->value['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?> <a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" class="logClick" data-ctype="2" data-cname="k12_teacher"> <div class="avatar"> <img src="<?php echo $_smarty_tpl->tpl_vars['item']->value['avatar'];?>
" width="100%" height="100%"/> </div> <div class="name line-clamp"><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</div> <div class="sel-teacher-text"> <p class="text-info line-clamp"><?php echo $_smarty_tpl->tpl_vars['item']->value['subject'];?>
</p> <p class="text-info line-clamp"> <?php if ($_smarty_tpl->tpl_vars['item']->value['school_age']==-1) {?> 30年以上教龄 <?php } else { ?> <?php echo $_smarty_tpl->tpl_vars['item']->value['school_age'];?>
年教龄 <?php }?> <?php echo $_smarty_tpl->tpl_vars['item']->value['student_count'];?>
名学生</p> </div> </a> <?php } ?> </div> </div> </div> <a class="label-text more logClick" data-ctype="3" data-cname="k12_teacher" href="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['more_url'];?>
" style="color: <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;">更多老师></a> <?php }?> </div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/tenTab/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b709870a120_32645333')) {function content_584b709870a120_32645333($_smarty_tpl) {?><ul class="ten-tab clearfix"> <?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['course_list']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true; $_smarty_tpl->tpl_vars['item']->index++;
?> <li class="item-nav tab-item logClick" style="border-right:none" data-ctype="<?php echo $_smarty_tpl->tpl_vars['item']->index;?>
" data-cname="<?php echo $_smarty_tpl->tpl_vars['course_list']->value['report_name'];?>
" data-is-search="<?php echo $_smarty_tpl->tpl_vars['item']->value['is_search'];?>
" <?php if (isset($_smarty_tpl->tpl_vars['item']->value['keyword'])) {?>data-name="<?php echo $_smarty_tpl->tpl_vars['item']->value['keyword'];?>
"<?php }?> data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['webUrl'];?>
"> <img data-src="<?php echo $_smarty_tpl->tpl_vars['item']->value['imgUrl'];?>
"> <p class="title"><?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
</p>
</li>
<?php } ?>
</ul><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-12-10 11:03:52 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/k12Channel/component/moreCourse/index.tpl" */ ?>
<?php if ($_valid && !is_callable('content_584b70987187a9_09930308')) {function content_584b70987187a9_09930308($_smarty_tpl) {?><div class="search-more"> <div class="text"> <img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/page/course/k12_search/img/search-more.png"> 都不是你想要的？ </div> <div data-url="/<?php echo $_smarty_tpl->tpl_vars['area']->value;?>
/sc-<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['more']['keyword'];?>
.html<?php if ($_smarty_tpl->tpl_vars['isShare']->value) {?>?s=share<?php }?>" data-jockey="bjhlstudent://o.c?a=course_search<?php if ($_smarty_tpl->tpl_vars['isShare']->value) {?>&s=share<?php }?>" class="btn-search-more logClick" style="background: <?php echo $_smarty_tpl->tpl_vars['color']->value;?>
;" data-query="<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['more']['keyword'];?>
" data-ctype="1" data-cname="<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['more']['report_name'];?>
"> 查看更多<?php echo $_smarty_tpl->tpl_vars['grade_value']->value;?>
课程 <span class="icon-circle-right"></span> </div>
</div><?php }} ?>