<?php /* Smarty version Smarty-3.1.19, created on 2017-06-27 09:24:31 compiled from "/Users/bjhl/workspace/Mobile_Web_FE/src/page/activity/superTeacher/result/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:38497815659321d4a407044-51849554%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '6024b34bb1e5ba4f68f94eea835e82760b9bb9f5' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/activity/superTeacher/result/index.tpl', 1 => 1488283293, 2 => 'file', ), '6ec51e77a3d6cbb1810f71fc1d75564ba1062951' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/_base/base_default.tpl', 1 => 1489977023, 2 => 'file', ), '8f28543d315cab791d6032df18eaa1d02ee6bc0b' => array ( 0 => '/Users/bjhl/workspace/Mobile_Web_FE/src/page/_base/base.tpl', 1 => 1498467857, 2 => 'file', ), ), 'nocache_hash' => '38497815659321d4a407044-51849554', 'function' => array ( ), 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_59321d4a4f3149_75759390', 'variables' => array ( 'site_config' => 0, 'origin' => 0, 'main_origin' => 0, 'static_origin' => 0, 'main_domain' => 0, 'page_title' => 0, 'page_description' => 0, 'page_keywords' => 0, 'ext_data' => 0, 'log_data' => 0, 'sku_id' => 0, 'page_module' => 0, 'enable_backTopButton' => 0, 'g_modules' => 0, 'script_data' => 0, 'reportUrl' => 0, 'report_param_p' => 0, 'reportCity' => 0, ), 'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_59321d4a4f3149_75759390')) {function content_59321d4a4f3149_75759390($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include '/Users/bjhl/workspace/Mobile_Web_FE/mock/smarty/plugins/modifier.replace.php';
?><!DOCTYPE html> <html lang="zh-CN"> <?php $_smarty_tpl->tpl_vars['origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['baseUri'],'/'), null, 0);?>
<?php $_smarty_tpl->tpl_vars['origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"https://","http://"), null, 0);?>
<?php $_smarty_tpl->tpl_vars['origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"http://","https://"), null, 0);?> <?php $_smarty_tpl->tpl_vars['main_origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['mainUri'],'/'), null, 0);?>
<?php $_smarty_tpl->tpl_vars['main_domain'] = new Smarty_variable(smarty_modifier_replace(smarty_modifier_replace($_smarty_tpl->tpl_vars['main_origin']->value,"https://",''),"http://",''), null, 0);?> <?php $_smarty_tpl->tpl_vars['static_origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['staticBaseUri'],'/'), null, 0);?>
<?php $_smarty_tpl->tpl_vars['static_origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"https://","http://"), null, 0);?>
<?php $_smarty_tpl->tpl_vars['static_origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"http://","https://"), null, 0);?> <?php $_smarty_tpl->tpl_vars['isShowAds'] = new Smarty_variable(true, null, 0);?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('dev', null, 0);?>
<?php if ($_smarty_tpl->tpl_vars['main_domain']->value=="m.genshuixue.com") {?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('www', null, 0);?>
<?php } elseif ($_smarty_tpl->tpl_vars['main_domain']->value=="beta-m.genshuixue.com") {?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('beta', null, 0);?>
<?php } elseif ($_smarty_tpl->tpl_vars['main_domain']->value=="test-m.genshuixue.com") {?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('test', null, 0);?>
<?php } else { ?> <?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable('dev', null, 0);?>
<?php }?>
<head> <?php $_smarty_tpl->tpl_vars['g_modules'] = new Smarty_variable(array(), null, 0);?> <?php $_smarty_tpl->tpl_vars['page_title'] = new Smarty_variable("跟谁学杯互联网风云老师视频大赛获奖榜单", null, 0);?> <?php $_smarty_tpl->tpl_vars['page_module'] = new Smarty_variable("page/activity/superTeacher/result/index", null, 0);?> <?php $_smarty_tpl->tpl_vars['enable_backTopButton'] = new Smarty_variable(false, null, 0);?> <meta charset="utf-8"/> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <!-- TDK --> <title><?php echo $_smarty_tpl->tpl_vars['page_title']->value;?>
</title> <?php if (!empty($_smarty_tpl->tpl_vars['page_description']->value)) {?> <meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['page_description']->value;?>
"/> <?php }?> <?php if (!empty($_smarty_tpl->tpl_vars['page_keywords']->value)) {?> <meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['page_keywords']->value;?>
"/> <?php }?> <meta name="format-detection" content="telephone=no"/> <!--兼容老浏览器--> <meta name="HandheldFriendly" content="True"> <meta name="MobileOptimized" content="320"> <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1"> <script type="text/javascript"> (function () { })(); </script> <!--隐藏苹果工具栏和菜单栏--> <meta name="apple-mobile-web-app-capable" content="yes"/> <!--todo 修改苹果浏览器状态栏样式--> <!--<meta name="apple-mobile-web-app-status-bar-style" content="black">--> <!--chrome工具栏颜色（android chrome 39开始支持）--> <meta name="theme-color" content="#FF9900"> <meta name="baidu-site-verification" content="AwZm789POz"/> <meta name="format-detection" content="telephone=no"> <meta http-equiv="x-dns-prefetch-control" content="on"/> <link rel="dns-prefetch" href="http://storage.genshuixue.com"/> <link rel="dns-prefetch" href="https://click.genshuixue.com"/> <meta name="gsx-page" content="<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
"/> <?php if (!$_smarty_tpl->tpl_vars['ext_data']->value['is_app']&&!$_smarty_tpl->tpl_vars['ext_data']->value['is_tapp']&&$_smarty_tpl->tpl_vars['isShowAds']->value) {?> <?php $_smarty_tpl->createLocalArrayVariable('g_modules', null, 0);
$_smarty_tpl->tpl_vars['g_modules']->value[] = 'common/_page_init';?> <?php }?> <?php $_smarty_tpl->tpl_vars['script_data'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value, null, 0);?> <script type="text/javascript"> (function(){ /* 一些公共的page参数 */ window.common_page_info = {}; common_page_info["page_type"] = "<?php echo $_smarty_tpl->tpl_vars['ext_data']->value['page'];?>
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
/src/page/activity/superTeacher/result/index.styl"> </head>
<body>
<?php echo $_smarty_tpl->getSubTemplate ("page/_base/parts_base/domain.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?> <div id="page_main"><section class="banner"><img data-src="./img/banner.png" alt="" class="img"></section><section class="no1"><div class="title tac"><img data-src="./img/no1.png" alt="" class="img"></div><?php $_smarty_tpl->tpl_vars['no1'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value['first'], null, 0);?><div class="content"><a href="/activity/superTeacherPersonal?number=<?php echo $_smarty_tpl->tpl_vars['no1']->value['number'];?>
" class="link"><img data-src="./img/no1-avatar.png" alt="" class="avatar tac"><div class="name fz18 tac"><?php echo $_smarty_tpl->tpl_vars['no1']->value['teacher_name'];?>
</div><div class="wrapper-tac tac"><span class="pv">浏览量<?php echo $_smarty_tpl->tpl_vars['no1']->value['pv'];?>
</span><span class="seperator"> | </span><span class="stu-no">学生数<?php echo $_smarty_tpl->tpl_vars['no1']->value['student_count'];?>
</span></div><div class="prize-comment"><div class="title fz18">获奖评语：</div><div class="content fz14"><?php echo $_smarty_tpl->tpl_vars['no1']->value['description'];?>
</div></div></a></div></section><section class="no10"><div class="title tac"><img data-src="./img/prize2.png" alt="" class="prize"><div class="text tac"><span class="angle-left"></span><span class="desc fw700 fz18">2016年度十大人气老师</span><span class="angle-right"></span></div></div><div class="content"><?php $_smarty_tpl->tpl_vars['item0'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item0']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['ten']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item0']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item0']->key => $_smarty_tpl->tpl_vars['item0']->value) {
$_smarty_tpl->tpl_vars['item0']->_loop = true; $_smarty_tpl->tpl_vars['item0']->index++;
?><a href="/activity/superTeacherPersonal?number=<?php echo $_smarty_tpl->tpl_vars['item0']->value['number'];?>
" class="tac unit<?php if ($_smarty_tpl->tpl_vars['item0']->index%2==0) {?> unit-left<?php }?>"><img data-src="<?php echo $_smarty_tpl->tpl_vars['item0']->value['avatar'];?>
" alt="" class="avatar"><div class="name text-ellipsis fz16 fw700"><?php echo $_smarty_tpl->tpl_vars['item0']->value['teacher_name'];?>
</div><div class="pv">浏览量<?php echo $_smarty_tpl->tpl_vars['item0']->value['pv'];?>
</div><div class="stu-no">学生数<?php echo $_smarty_tpl->tpl_vars['item0']->value['student_count'];?>
</div></a><?php } ?></div></section><section class="creative tac"><div class="title"><img data-src="./img/prize3.png" alt="" class="prize"><div class="text"><span class="angle-left angle-left-pink"></span><span class="desc fw700 fz18">最佳创意课堂奖</span><span class="angle-right angle-right-pink"></span></div></div><div class="content"><?php $_smarty_tpl->tpl_vars['item0'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item0']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['course']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item0']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item0']->key => $_smarty_tpl->tpl_vars['item0']->value) {
$_smarty_tpl->tpl_vars['item0']->_loop = true; $_smarty_tpl->tpl_vars['item0']->index++;
?><a href="/activity/superTeacherPersonal?number=<?php echo $_smarty_tpl->tpl_vars['item0']->value['number'];?>
" class="unit<?php if ($_smarty_tpl->tpl_vars['item0']->index%2==1) {?> unit-left<?php }?><?php if ($_smarty_tpl->tpl_vars['item0']->index==0) {?> unit-first tac<?php }?>"><img data-src="<?php echo $_smarty_tpl->tpl_vars['item0']->value['avatar'];?>
" alt="" class="avatar"><div class="name text-ellipsis fz16 fw700"><?php echo $_smarty_tpl->tpl_vars['item0']->value['teacher_name'];?>
</div><div class="pv">浏览量<?php echo $_smarty_tpl->tpl_vars['item0']->value['pv'];?>
</div><div class="stu-no">学生数<?php echo $_smarty_tpl->tpl_vars['item0']->value['student_count'];?>
</div></a><?php } ?></div></section><section class="method tac"><div class="title"><img data-src="./img/prize4.png" alt="" class="prize"><div class="text"><span class="angle-left"></span><span class="desc fw700 fz18">最佳教学方法奖</span><span class="angle-right"></span></div></div><div class="content"><?php $_smarty_tpl->tpl_vars['item0'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item0']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['teach']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item0']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item0']->key => $_smarty_tpl->tpl_vars['item0']->value) {
$_smarty_tpl->tpl_vars['item0']->_loop = true; $_smarty_tpl->tpl_vars['item0']->index++;
?><a href="/activity/superTeacherPersonal?number=<?php echo $_smarty_tpl->tpl_vars['item0']->value['number'];?>
" class="unit<?php if ($_smarty_tpl->tpl_vars['item0']->index%2==1) {?> unit-left<?php }?><?php if ($_smarty_tpl->tpl_vars['item0']->index==0) {?> unit-first tac<?php }?>"><img data-src="<?php echo $_smarty_tpl->tpl_vars['item0']->value['avatar'];?>
" alt="" class="avatar"><div class="name text-ellipsis fz16 fw700"><?php echo $_smarty_tpl->tpl_vars['item0']->value['teacher_name'];?>
</div><div class="pv">浏览量<?php echo $_smarty_tpl->tpl_vars['item0']->value['pv'];?>
</div><div class="stu-no">学生数<?php echo $_smarty_tpl->tpl_vars['item0']->value['student_count'];?>
</div></a><?php } ?></div></section><section class="talent tac"><div class="title"><img data-src="./img/prize5.png" alt="" class="prize"><div class="text"><span class="angle-left angle-left-pink"></span><span class="desc fw700 fz18">最佳才艺奖</span><span class="angle-right angle-right-pink"></span></div></div><div class="content"><?php $_smarty_tpl->tpl_vars['item0'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item0']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['art']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item0']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item0']->key => $_smarty_tpl->tpl_vars['item0']->value) {
$_smarty_tpl->tpl_vars['item0']->_loop = true; $_smarty_tpl->tpl_vars['item0']->index++;
?><a href="/activity/superTeacherPersonal?number=<?php echo $_smarty_tpl->tpl_vars['item0']->value['number'];?>
" class="unit<?php if ($_smarty_tpl->tpl_vars['item0']->index%2==1) {?> unit-left<?php }?><?php if ($_smarty_tpl->tpl_vars['item0']->index==0) {?> unit-first tac<?php }?>"><img data-src="<?php echo $_smarty_tpl->tpl_vars['item0']->value['avatar'];?>
" alt="" class="avatar"><div class="name text-ellipsis fz16 fw700"><?php echo $_smarty_tpl->tpl_vars['item0']->value['teacher_name'];?>
</div><div class="pv">浏览量<?php echo $_smarty_tpl->tpl_vars['item0']->value['pv'];?>
</div><div class="stu-no">学生数<?php echo $_smarty_tpl->tpl_vars['item0']->value['student_count'];?>
</div></a><?php } ?></div></section><section class="young"><div class="title tac"><img data-src="./img/prize6.png" alt="" class="prize"><div class="text"><span class="angle-left"></span><span class="desc fw700 fz18">年度新锐老师奖</span><span class="angle-right"></span></div></div><div class="list-young"><?php $_smarty_tpl->tpl_vars['item0'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item0']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['fifty']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['item0']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['item0']->key => $_smarty_tpl->tpl_vars['item0']->value) {
$_smarty_tpl->tpl_vars['item0']->_loop = true; $_smarty_tpl->tpl_vars['item0']->index++;
?><a href="/activity/superTeacherPersonal?number=<?php echo $_smarty_tpl->tpl_vars['item0']->value['number'];?>
" class="unit"><img data-src="<?php echo $_smarty_tpl->tpl_vars['item0']->value['avatar'];?>
" alt="" class="avatar"><span class="name text-ellipsis fw700">&nbsp;<?php echo $_smarty_tpl->tpl_vars['item0']->value['teacher_name'];?>
&nbsp;</span><span class="pv">浏览量<?php echo $_smarty_tpl->tpl_vars['item0']->value['pv'];?>
</span><span class="seperator fz14">&nbsp;|&nbsp;</span><span class="stu-no">学生数<?php echo $_smarty_tpl->tpl_vars['item0']->value['student_count'];?>
</span></a><?php } ?><div class="tip-no-rank tac">——————— 奖项排名不分先后 ———————</div></div></section><section class="prizes"><div class="title title-prizes tac"><div class="text"><span class="angle-left angle-left-pink"></span><span class="desc fw700 fz18">大赛奖品</span><span class="angle-right angle-right-pink"></span></div></div><div class="content-prizes"><div class="unit"><img data-src="./img/prize1.png" alt="" class="trophy"><h3 class="prize-name fz14">互联网风云老师<span class="num fz20"> 1名</span></h3><p class="desc">大众评审阶段得票数前10名老师，入围互联网教育风云奖。专家评委根据课堂创意、教学方法、才艺展示和互联网教学创新综合评选。</p><p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>iPhone 7手机一部</p></div><div class="unit"><img data-src="./img/prize2.png" alt="" class="trophy"><h3 class="prize-name fz14">年度人气老师<span class="num fz20"> 10名</span></h3><p class="desc">大众评审阶段得票数前10名，当选年度人气老师。</p><p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>iPad一部</p></div><div class="unit"><img data-src="./img/prize3.png" alt="" class="trophy"><h3 class="prize-name fz14">最佳创意课堂奖<span class="num fz20"> 5名</span></h3><p class="desc">大众评审阶段得票数前100名，入围最佳创意课堂奖，专家团队评选出前5名。</p><p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>kindle一部</p></div><div class="unit"><img data-src="./img/prize4.png" alt="" class="trophy"><h3 class="prize-name fz14">最佳教学方法奖<span class="num fz20"> 5名</span></h3><p class="desc">大众评审阶段得票前100名，入围最佳教学方法奖，专家团队评选出前5名。</p><p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>kindle一部</p></div><div class="unit"><img data-src="./img/prize5.png" alt="" class="trophy"><h3 class="prize-name fz14">最佳才艺奖<span class="num fz20"> 5名</span></h3><p class="desc">大众评审阶段得票前100名老师，入围最佳才艺奖，专家团队评选出前5名。</p><p class="specific">颁发荣誉证书及奖杯<br>跟谁学站内全量推广<br>跟谁学合作主流媒体宣传<br>kindle一部</p></div><div class="unit"><img data-src="./img/prize6.png" alt="" class="trophy"><h3 class="prize-name fz14">年度新锐老师奖<span class="num fz20"> 50名</span></h3><p class="desc">单日得票前十名老师，入围年度新锐老师奖，专家团队根据互联网教学创新评选出50名年度新锐老师奖。</p><p class="specific">颁发荣誉证书及奖杯<br>2000条平台短信</p></div></div></section><section class="intro-rank"><div class="btns-wrapper tac"><a class="btn fw700 tac fz18 intro" href="/activity/superTeacher#intro">查看大赛介绍</a><a class="btn fw700 tac fz18" href="/activity/superTeacherVote">参赛老师风采</a></div></section><section class="footer"><div class="who"><span class="desc">主办方：</span><img data-src="./img/logo.png" width="69" height="30"></div><p class="final-right">本活动最终解释权归跟谁学所有</p><p class="copyright">Copyright © 2014 - 2017 北京百家互联科技有限公司版权所有.<br>京公网安备11010802015210号 | 京ICP备14027590号-1</p></section></div><!--<div id="bottom-container" style="position: fixed;width:100%;bottom:0;z-index: 1;"><div style="width:100%;position:relative;"></div></div>--> <?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(($_smarty_tpl->tpl_vars['main_origin']->value).("/static/report"), null, 0);?>
<?php if ($_smarty_tpl->tpl_vars['site_config']->value['protocol']=="https") {?> <?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['reportUrl']->value,"http://","https://"), null, 0);?>
<?php }?>
<?php $_smarty_tpl->tpl_vars['reportCity'] = new Smarty_variable($_smarty_tpl->tpl_vars['ext_data']->value['curr_city']['id'], null, 0);?>
<?php $_smarty_tpl->tpl_vars['report_param_p'] = new Smarty_variable($_smarty_tpl->tpl_vars['ext_data']->value['page'], null, 0);?>
<script type="text/javascript" src="<?php echo $_smarty_tpl->tpl_vars['reportUrl']->value;?>
?p=<?php echo $_smarty_tpl->tpl_vars['report_param_p']->value;?>
&city=<?php echo $_smarty_tpl->tpl_vars['reportCity']->value;?>
"></script> <?php echo $_smarty_tpl->getSubTemplate ('page/_base/parts_base/page_init.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?> </body> </html>
<?php }} ?>