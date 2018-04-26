<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/teacher_center/courseDate.html" */ ?>
<?php /*%%SmartyHeaderCode:142173015257902d5ed26832-47070596%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( 'f8f174672d02bed40e585d64265b2af3c1af4197' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/teacher_center/courseDate.html', 1 => 1466835415, 2 => 'file', ), '891c132d00e63cd70b38e700394d1e93cf82c06b' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/base.html', 1 => 1490257588, 2 => 'file', ), 'dccb2cbef84515bcd9383c8ca6bd9fb24d49d1d0' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/pc/base.html', 1 => 1466835415, 2 => 'file', ), 'a0e398ea6b63d450f545c3275bffc9d2f8c40bb5' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/base.html', 1 => 1487735822, 2 => 'file', ), 'c815b6162871b1d53d528aec99c8fdd7a0423c9b' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/upgrade.html', 1 => 1466835415, 2 => 'file', ), 'd4d7602e284258fcaae1571105bc61c2f45a7ed6' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/rave/round.html', 1 => 1466835415, 2 => 'file', ), '04d19d93342ab6b86293d273a842cf72b8451393' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/rave/ravebanner.html', 1 => 1466835415, 2 => 'file', ), '9a2f6822b3907d9547e932484348dd1da4a1c543' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/flotage.html', 1 => 1490257588, 2 => 'file', ), '5fef91682c607d44a9c4fa991e16826153e3895b' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/siteNav.html', 1 => 1466835415, 2 => 'file', ), 'c94c93a831a9b2dc16f8444296fc25ee633af864' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/common/header.html', 1 => 1490257588, 2 => 'file', ), '99a5a66bbffff038f3456694f65615438887f329' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/common/nav.html', 1 => 1490257588, 2 => 'file', ), '4696ad3fd870d1a2278415ac16bec6179b80f4cd' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/image.html', 1 => 1486532611, 2 => 'file', ), '8c2226c5a07312f9bc58f2287a65ef06666e59c0' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/common/sidebar.html', 1 => 1490257588, 2 => 'file', ), 'b310d6d54f0333442495ae338c47667bb65fefa4' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/teacher_center/common/sidebar.html', 1 => 1490767017, 2 => 'file', ), '6385035fd0ee961413893a9cab8729a702b82424' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/script.html', 1 => 1490773019, 2 => 'file', ), 'de4754b769ea4fde43c96b26f1e42222974e8138' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/footer.html', 1 => 1490257588, 2 => 'file', ), ), 'nocache_hash' => '142173015257902d5ed26832-47070596', 'function' => array ( ), 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_57902d5ef1aaa1_26072850', 'variables' => array ( 'site_config' => 0, 'origin' => 0, 'static_origin' => 0, 'env' => 0, 'root_https' => 0, 'root_http' => 0, 'curr_city' => 0, 'friend_links' => 0, 'need_im' => 0, 'upload_origin' => 0, 'log_data' => 0, 'need_mobile_seo' => 0, 'need_location_seo' => 0, 'tpl_data' => 0, 'sku_id' => 0, 'reportUrl' => 0, 'root' => 0, 'page_class' => 0, 'login_dialog_config' => 0, ), 'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_57902d5ef1aaa1_26072850')) {function content_57902d5ef1aaa1_26072850($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.replace.php';
?>
<!DOCTYPE html><html lang="zh-CN" xmlns:wb="http://open.weibo.com/wb">
<!--[if IE 8 ]><html lang="zh-CN" class="ie8"><![endif]--><!--[if IE 9 ]><html lang="zh-CN" class="ie9"><![endif]-->
<head> <?php $_smarty_tpl->tpl_vars['origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['baseUri'],'/'), null, 0);?><?php $_smarty_tpl->tpl_vars['static_origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['staticBaseUri'],'/'), null, 0);?><?php $_smarty_tpl->tpl_vars['origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"https://","http://"), null, 0);?><?php $_smarty_tpl->tpl_vars['origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"http://","https://"), null, 0);?><?php $_smarty_tpl->tpl_vars['static_origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"https://","http://"), null, 0);?><?php $_smarty_tpl->tpl_vars['static_origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"http://","https://"), null, 0);?><?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable($_smarty_tpl->tpl_vars['site_config']->value['env'], null, 0);?><?php if ($_smarty_tpl->tpl_vars['env']->value=="production") {?><?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable("www", null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['root_http'] = new Smarty_variable((('http://').($_smarty_tpl->tpl_vars['env']->value)).('.genshuixue.com'), null, 0);?><?php $_smarty_tpl->tpl_vars['root_https'] = new Smarty_variable((('https://').($_smarty_tpl->tpl_vars['env']->value)).('.genshuixue.com'), null, 0);?><?php if (substr($_SERVER['SERVER_PROTOCOL'],0,5)==='HTTPS') {?><?php $_smarty_tpl->tpl_vars['root'] = new Smarty_variable($_smarty_tpl->tpl_vars['root_https']->value, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['root'] = new Smarty_variable($_smarty_tpl->tpl_vars['root_http']->value, null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['is_ios'] = new Smarty_variable(false, null, 0);?><?php if ((preg_match("/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i",$_SERVER['HTTP_USER_AGENT']))) {?><?php $_smarty_tpl->tpl_vars['is_mobile_platform'] = new Smarty_variable(true, null, 0);?><?php if ((preg_match("/iPad|iPhone/i",$_SERVER['HTTP_USER_AGENT']))) {?><?php $_smarty_tpl->tpl_vars['is_ios'] = new Smarty_variable(true, null, 0);?><?php }?><?php } else { ?><?php $_smarty_tpl->tpl_vars['is_mobile_platform'] = new Smarty_variable(false, null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['city'] = new Smarty_variable($_smarty_tpl->tpl_vars['curr_city']->value['id'], null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['footerFriendLinks'] = $_smarty_tpl->tpl_vars['friend_links']->value;?><?php $_smarty_tpl->tpl_vars['rave_activity_host'] = new Smarty_variable('http://616.genshuixue.com', null, 0);?><?php $_smarty_tpl->tpl_vars['need_mobile_seo'] = new Smarty_variable(false, null, 0);?><?php $_smarty_tpl->tpl_vars['show_friend_links'] = new Smarty_variable(false, null, 0);?><?php $_smarty_tpl->tpl_vars['login_dialog_config'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('login_dialog_config', null, 0);
$_smarty_tpl->tpl_vars['login_dialog_config']->value['student_only'] = false;?><?php $_smarty_tpl->createLocalArrayVariable('login_dialog_config', null, 0);
$_smarty_tpl->tpl_vars['login_dialog_config']->value['teacher_only'] = false;?><?php if (!isset($_smarty_tpl->tpl_vars['need_im']->value)) {?><?php $_smarty_tpl->tpl_vars['need_im'] = new Smarty_variable(true, null, 0);?><?php }?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['needIm'] = $_smarty_tpl->tpl_vars['need_im']->value;?><?php $_smarty_tpl->tpl_vars['upload_origin'] = new Smarty_variable(rtrim((($tmp = @$_smarty_tpl->tpl_vars['site_config']->value['uploadBaseUri'])===null||$tmp==='' ? $_smarty_tpl->tpl_vars['site_config']->value['baseUri'] : $tmp),'/'), null, 0);?><?php $_smarty_tpl->tpl_vars['upload_origin'] = new Smarty_variable(($_smarty_tpl->tpl_vars['upload_origin']->value).('/user/previewImage'), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['upload_origin'] = $_smarty_tpl->tpl_vars['upload_origin']->value;?><?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['page_type'] = $_smarty_tpl->tpl_vars['log_data']->value['page'];?><?php }?><?php $_smarty_tpl->tpl_vars['flotage_config'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('flotage_config', null, 0);
$_smarty_tpl->tpl_vars['flotage_config']->value['hidden'] = 0;?><?php $_smarty_tpl->createLocalArrayVariable('flotage_config', null, 0);
$_smarty_tpl->tpl_vars['flotage_config']->value['hideChatToKF'] = false;?><?php $_smarty_tpl->tpl_vars['rave_config'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('rave_config', null, 0);
$_smarty_tpl->tpl_vars['rave_config']->value['hidden'] = 1;?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['cityDomain'] = $_smarty_tpl->tpl_vars['curr_city']->value['domain'];?> <?php $_smarty_tpl->tpl_vars['amd_more'] = new Smarty_variable(array('common/main/component/overview'), null, 0);?> <?php if ($_smarty_tpl->tpl_vars['user_data']->value['user_type']==0) {?> <?php $_smarty_tpl->tpl_vars['identity'] = new Smarty_variable("teacher", null, 0);?> <?php } else { ?> <?php $_smarty_tpl->tpl_vars['identity'] = new Smarty_variable("student", null, 0);?> <?php }?> <?php $_smarty_tpl->tpl_vars['page_class'] = new Smarty_variable(($_smarty_tpl->tpl_vars['identity']->value).('-center'), null, 0);?> <?php $_smarty_tpl->tpl_vars['script_path'] = new Smarty_variable("teacherCenter/courseDate", null, 0);?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['courseDateDesc'] = $_smarty_tpl->tpl_vars['tpl_data']->value['teacher_usabletime_desc'];?> <meta charset="utf-8" /><link rel="dns-prefetch" href="http://cdn.bootcss.com" /><link rel="dns-prefetch" href="http://apps.bdimg.com" /><link rel="dns-prefetch" href="http://su.bdimg.com" /><link rel="dns-prefetch" href="http://s1.bdstatic.com" /><link rel="dns-prefetch" href="http://api.map.baidu.com" /><link rel="dns-prefetch" href="http://storage.genshuixue.com" /><?php if ($_smarty_tpl->tpl_vars['need_im']->value) {?><link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/asset/hermes/css/main.css" /><?php }?><?php if ($_smarty_tpl->tpl_vars['need_mobile_seo']->value) {?><meta name="mobile-agent" content="format=xhtml;url=http://<?php echo smarty_modifier_replace($_SERVER['HTTP_HOST'],'www.genshuixue.com','m.genshuixue.com');?>
<?php echo smarty_modifier_replace(smarty_modifier_replace($_SERVER['REQUEST_URI'],'script',''),'javascript:','');?>
"><meta name="mobile-agent" content="format=html5;url=http://<?php echo smarty_modifier_replace($_SERVER['HTTP_HOST'],'www.genshuixue.com','m.genshuixue.com');?>
<?php echo smarty_modifier_replace(smarty_modifier_replace($_SERVER['REQUEST_URI'],'script',''),'javascript:','');?>
"><meta name="mobile-agent" content="format=wml;url=http://<?php echo smarty_modifier_replace($_SERVER['HTTP_HOST'],'www.genshuixue.com','m.genshuixue.com');?>
<?php echo smarty_modifier_replace(smarty_modifier_replace($_SERVER['REQUEST_URI'],'script',''),'javascript:','');?>
"><?php }?><?php if (isset($_smarty_tpl->tpl_vars['need_location_seo']->value)&&isset($_smarty_tpl->tpl_vars['tpl_data']->value['lbs'])) {?><meta name="location" content="province=<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['lbs']['province'];?>
;city=<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['lbs']['city'];?>
;coord=<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['lbs']['coord']['lng'];?>
,<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['lbs']['coord']['lat'];?>
"><?php }?><meta name="viewport"content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"><meta name="keywords" content="跟谁学, " /><meta name="description" content="跟谁学, " /><title>
课程设置 - 可授课时间 - <?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['huike']['is_huike_student'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['huike']['is_huike_student']) {?> 汇课间
<?php } else { ?> 跟谁学
<?php }?>
</title><?php $_smarty_tpl->tpl_vars['sku_id'] = new Smarty_variable('', null, 0);?><meta name="gsx_sku" content="<?php echo $_smarty_tpl->tpl_vars['sku_id']->value;?>
"><script src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/dep/web-analysis/0.0.5/wat.js"></script><script>(function (global) {var GSX_CONFIG = null;global['GSX_INIT'] = function (config) {global['GSX_INIT'] = null;GSX_CONFIG = config;var cb;while (cb = cbs.shift()) {cb(GSX_CONFIG);}};var cbs = [];global['gsx_ready'] = function (callback) {if (GSX_CONFIG) {callback(GSX_CONFIG);} else if ('function' == typeof callback) {cbs.push(callback);}};})(window);window.gsx_ready(function(config){var WAT = window.WAT;if (WAT) {var page_type = "<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page'];?>
<?php }?>";var page_str = "<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page_type'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page_type'];?>
<?php }?>";var referrer = document.referrer;var encodeReferrer = encodeURI(referrer);var pre_page_str = localStorage.getItem('pre_page_str');var pre_page_obj;try {pre_page_obj = JSON.parse(pre_page_str) || {};} catch (e) {pre_page_obj = {};var refKey = encodeReferrer + '_pre_page_str';pre_page_obj[refKey] = pre_page_str;pre_page_obj[Date.now()] = refKey;}WAT.pgv({"user_number": config.user ? config.user.number : '',"guid": config.log[0],"params": {"page_type": page_type,"page_str": page_str,"pre_page_str": encodeReferrer && pre_page_obj[encodeReferrer + '_pre_page_str'],"user_role": config.user ? config.user.type : '',"session_id": config.log[1]}});setTimeout(function () {for (var name in pre_page_obj) {if (pre_page_obj.hasOwnProperty(name)) {var dt = +name;if (!isNaN(dt) && Date.now() - dt > 2 * 60 * 60 * 1000) {var key = pre_page_obj[name];pre_page_obj[key] = null;pre_page_obj[name] = null;delete pre_page_obj[key];delete pre_page_obj[name];}}}var encodeUrl = encodeURI(location.href);var key = encodeUrl + '_pre_page_str';pre_page_obj[key] = page_str;pre_page_obj[Date.now()] = key;localStorage.setItem('pre_page_str', JSON.stringify(pre_page_obj));pre_page_obj = null;});WAT.initClick({"type": "pc","hot": !!config.hot_click,"service": page_type});WAT.watchClick();WAT.timing();}});</script><?php if (isset($_smarty_tpl->tpl_vars['site_config']->value['mainUri'])) {?><?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(($_smarty_tpl->tpl_vars['site_config']->value['mainUri']).("static/report"), null, 0);?><?php if ($_smarty_tpl->tpl_vars['site_config']->value['protocol']=="https") {?><?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['reportUrl']->value,"http://","https://"), null, 0);?><?php }?><?php } else { ?><?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(($_smarty_tpl->tpl_vars['root']->value).("/static/report"), null, 0);?><?php }?><script>window.gsx_ready(function (config) {var logUrl = WAT.toUrl('pb0.genshuixue.com', '/sku.gif');WAT.send(logUrl, {'terminal': 'pc','page_type': '<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page'];?>
<?php }?>','referrer': document.referrer,'user_number': config.user ? config.user.number : '','user_role': config.user ? config.user.type : '','guid': config.log[0],'city_id': config.city.id,'sku_id': '<?php echo $_smarty_tpl->tpl_vars['sku_id']->value;?>
'});});</script><script>var leaveMessPageType = "<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page'];?>
<?php }?>";var referer = document.referrer;var src = '<?php echo $_smarty_tpl->tpl_vars['reportUrl']->value;?>
'+'?referer='+referer;var script = document.createElement('script');script.src = src;script.type = 'text/javascript';script.charset = 'utf-8';document.getElementsByTagName('head')[0].appendChild(script);</script>
<meta name="renderer" content="webkit|ie-stand|ie-comp" /><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /><meta http-equiv="Cache-Control" content="no-transform" /><meta http-equiv="Cache-Control" content="no-siteapp" /><meta property="qc:admins" content="3464026660675630510556375" /><meta property="wb:webmaster" content="4658769fd343afda" /><meta name="applicable-device" content="pc" />
<link rel="shortcut icon" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/logo.ico" />
<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/css/teacherCenter/courseDate.less">
</head><?php if (isset($_smarty_tpl->tpl_vars['page_class']->value)) {?><body class="<?php echo $_smarty_tpl->tpl_vars['page_class']->value;?>
"><?php } else { ?><body><?php }?>
<?php /* Call merged included template "common/upgrade.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/upgrade.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a14428_21329334($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/upgrade.html" */?><?php if (!$_smarty_tpl->tpl_vars['rave_config']->value['hidden']) {?><?php /* Call merged included template "rave/ravebanner.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("rave/ravebanner.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a18376_93547222($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "rave/ravebanner.html" */?><?php }?><?php if (!$_smarty_tpl->tpl_vars['flotage_config']->value['hidden']) {?><?php /* Call merged included template "common/component/flotage.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/component/flotage.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a1fa50_15453526($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/component/flotage.html" */?><?php }?> <?php /* Call merged included template "common/siteNav.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/siteNav.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a23b87_65204163($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/siteNav.html" */?> <?php /* Call merged included template "common/center/common/header.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/center/common/header.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a251a8_17510346($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/center/common/header.html" */?> <?php /* Call merged included template "common/center/common/nav.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/center/common/nav.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a31511_42616030($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/center/common/nav.html" */?> <div id="main"> <?php /* Call merged included template "teacher_center/common/sidebar.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("teacher_center/common/sidebar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('active'=>"course"), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a4a7f6_53328426($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "teacher_center/common/sidebar.html" */?><div id="content" class="card"><div class="card-header"><a href="/teacher_course/list_admin">课程设置</a>&nbsp;&gt;&nbsp;<a>可授课时间</a></div><div class="card-body"><div class="course-date"><div id="calendar"></div><div class="toolbar"><i class="icon icon-check-circle"></i>表示可授课</div><table class="short-selector"><tbody><tr><td class="workday"><i class="icon icon-check-circle"></i>工作日</td><td class="saturday"><i class="icon icon-check-circle"></i>周六</td><td class="sunday"><i class="icon icon-check-circle"></i>周日</td></tr><tr><td class="morning"><i class="icon icon-check-circle"></i>&nbsp;上午</td><td class="afternoon"><i class="icon icon-check-circle"></i>下午</td><td class="evening"><i class="icon icon-check-circle"></i>晚上</td></tr></tbody></table><div class="form-group description"><label class="form-label">可授课时间描述：</label><div class="form-controls"><div class="form-editor"><textarea name="descript" type="text" class="form-text" placeholder="例如：周一、三、五晚上，周六全天以及周日白天可授课"></textarea><span class="form-hint">还可以输入<strong>30</strong>字</span></div></div></div><?php if ($_smarty_tpl->tpl_vars['tpl_data']->value['audits']['usabletime_desc']['verify_status']==2) {?><div class="reasons form-block"><i class="icon icon-info-circle"></i><?php $_smarty_tpl->tpl_vars['reason'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['reason']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['audits']['usabletime_desc']['reasons']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['reason']->key => $_smarty_tpl->tpl_vars['reason']->value) {
$_smarty_tpl->tpl_vars['reason']->_loop = true;
?><?php echo $_smarty_tpl->tpl_vars['reason']->value;?>
；<?php } ?></div><?php }?><div class="action"><button class="btn btn-primary btn-save">保存</button><a class="btn btn-default" href="/teacher_course/list_admin">返回课程设置</a></div></div></div></div> </div> <?php /* Call merged included template "common/script.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/script.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56b84c75_14376000($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/script.html" */?> <?php /* Call merged included template "common/footer.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/footer.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56be9619_75098925($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/footer.html" */?> <?php if ($_smarty_tpl->tpl_vars['env']->value=='test'||$_smarty_tpl->tpl_vars['env']->value=='beta') {?><?php echo $_smarty_tpl->getSubTemplate ("common/component/checkImageSize.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<?php }?><?php if ($_smarty_tpl->tpl_vars['env']->value=='www') {?><?php }?><?php echo $_smarty_tpl->getSubTemplate ("common/component/loginDialog.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('onlyShowStudent'=>$_smarty_tpl->tpl_vars['login_dialog_config']->value['student_only'],'onlyShowTeacher'=>$_smarty_tpl->tpl_vars['login_dialog_config']->value['teacher_only']), 0);?>
<?php echo $_smarty_tpl->getSubTemplate ("common/center/component/enterClassroom.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
</body></html><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/upgrade.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a14428_21329334')) {function content_58db6e56a14428_21329334($_smarty_tpl) {?> <!--[if lt IE 8]><div class="browser-upgrade"><div class="wrapper">您的浏览器版本过低，为了保证更好的安全性和浏览体验，建议更换高级浏览器，如：<a href="http://www.baidu.com/s?wd=谷歌浏览器">谷歌浏览器</a><a href="http://www.baidu.com/s?wd=火狐浏览器">火狐浏览器</a><a href="http://www.baidu.com/s?wd=360极速浏览器">360 极速浏览器</a></div></div><style>body {padding-top: 40px;}.browser-upgrade {background-color: #DA7575;border-bottom: 1px solid #D65F39;color: #F0F0F0;padding: 10px 0;position: absolute;top: 0;left: 0;width: 100%;z-index: 10000;}.browser-upgrade .wrapper {width: 1100px;margin: 0 auto;}.browser-upgrade a {color: yellow;margin-right: 10px;text-decoration: underline;}</style><![endif]--><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/rave/ravebanner.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a18376_93547222')) {function content_58db6e56a18376_93547222($_smarty_tpl) {?><div id="ravebanner" class="hiderave" data-href="<?php echo $_smarty_tpl->tpl_vars['rave_activity_host']->value;?>
" style="display:none"><span class="icon icon-close"></span><img src="http://img.gsxservice.com/0cms/d/file/content/2015/06/556fc87248270.jpg" class="banner-img" width="1100px"/><div class="main-wrapper"><a href="#excellent-course-wrapper" class="anchor excellent_course"></a><a href="#org-rave-wrapper" class="anchor get_coupon"></a><a href="#crazy-discount-wrapper" class="anchor crazy_discount"></a><a href="#sec-kill-wrapper" class="anchor sec_kill"></a><div class="rave" id="crazy-discount-wrapper"><?php /* Call merged included template "rave/round.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("rave/round.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '142173015257902d5ed26832-47070596');
content_58db6e56a1a404_11503419($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "rave/round.html" */?></div></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/rave/round.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a1a404_11503419')) {function content_58db6e56a1a404_11503419($_smarty_tpl) {?><div class="round-wrapper" id="raveRound"><div class="round-list"><div class="round-prev"><span class="icon icon-chevron-left"></span></div><div class="round-item first disabled" data-index="0" data-key="dxzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_graduate.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">大学专场</div></div><div class="round-mask"></div></div><div class="round-item second disabled" data-index="1" data-key="xcgzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_t9.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">小学中学</div></div><div class="round-mask"></div></div><div class="round-item third" data-index="2" data-key="bpsjb"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_main.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">爆品暑假班</div></div><div class="round-mask"></div></div><div class="round-item four disabled" data-index="3" data-key="lxzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_overseas.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">出国留学</div></div><div class="round-mask"></div></div><div class="round-item five disabled" data-index="4" data-key="ysxqzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_art.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">艺体兴趣</div></div><div class="round-mask"></div></div><div class="round-next"><span class="icon icon-chevron-right"></span></div></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/flotage.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a1fa50_15453526')) {function content_58db6e56a1fa50_15453526($_smarty_tpl) {?>
<div id="flotage-help"><div class="flotage-help-icon"></div><div class="flotage-buttons"><div class="flotage-btn findteacher">预约名师试听</div><div class="flotage-btn comeon-im">立即咨询</div><!-- <div class="flotage-btn comeon-im">一对一辅导</div> --><div class="flotage-btn get-courses">关注领好课</div><div class="qrcode-box"><div class="text-primary">跟谁学学生版:</div><div class="text-primary">genshuixue_student</div><div class="wechat-qrcode"></div><div class="text-muted">精品好课等你领</div></div></div></div><div id="flotage-middle"<?php if (isset($_COOKIE['CLOSE_FLOTAGE_APP'])) {?> style="display:none"<?php }?>><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/static/app"><div class="flotage-app"></div></a></div><div id="flotage-bottom"><div class="wrapper"><ul><li id="mobile-down" style="display:none"><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/static/app"><i class="icon icon-mobile"></i></a><a class="tip" rel="nofollow" href="http://www.genshuixue.com/static/app">手机下载</a></li><li style="display:none"><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/guide/feedback?a=feedback"><i class="icon icon-edit-underline"></i></a><a class="tip" rel="nofollow" href="http://www.genshuixue.com/guide/feedback?a=feedback">意见反馈</a></li><li style="display:none"><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/static/windows"><i class="icon icon-customer small"></i></a><a id="flotage-top" class="tip" rel="nofollow" href="javascript:void(0)">联系客服</a></li><li style="display:none"><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/static/student"><i class="icon icon-question small"></i></a><a class="tip" rel="nofollow" href="http://www.genshuixue.com/static/student">平台流程</a></li><li class="backup"><a class="tip-icon" rel="nofollow" href="javascript:void(0)"><i class="icon icon-up"></i></a><a class="tip" rel="nofollow" href="javascript:void(0)">回到顶部</a></li></ul></div></div><div id="anonymous-im"><div class="comeon-im"><i class="icon icon-chat"></i>在线咨询</div></div><div class="subsurface" style="display:none"><div class="mode"></div><div class="wrapper"><div class="inner-box"><div class="floating-layer"></div><div class="download-buttons"><div class="text-info">直接下载</div><div class="download-btn"><a target="_blank" href="https://itunes.apple.com/cn/app/gen-shui-xue-zhao-hao-lao/id919947654?mt=8&zn=zn_ixz_pc_pc">iPhone</a></div><div class="download-btn"><a target="_blank" href="http://d.gsxservice.com/app/genshuixue.apk?ct=&zn=zn_axz_pc_pc">Android</a></div></div><div class="qrcode-item"><div class="title">下载客户端</div><div class="client-qrcode"></div></div><div class="qrcode-item"><div class="title">关注微信公众号</div><div class="weixin-qrcode"></div></div><div class="close"></div></div></div></div><div class="small-subsurface"></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/siteNav.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a23b87_65204163')) {function content_58db6e56a23b87_65204163($_smarty_tpl) {?>
<div id="site-nav"><div class="wrapper"></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/center/common/header.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a251a8_17510346')) {function content_58db6e56a251a8_17510346($_smarty_tpl) {?> <div id="header"><div class="wrapper"><?php if ((isset($_smarty_tpl->tpl_vars['tpl_data']->value['is_huike_teacher'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['is_huike_teacher'])||(isset($_smarty_tpl->tpl_vars['tpl_data']->value['huike']['is_huike_student'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['huike']['is_huike_student'])) {?><a class="logo-huikejian"></a><?php } else { ?><a class="logo" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
"></a><?php }?><h1><?php if ($_smarty_tpl->tpl_vars['identity']->value=='teacher') {?><a href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/teacher_center/index">老师个人中心</a><?php } else { ?>学生个人中心<?php }?></h1><!--div class="teacher-qr-container"><div><img style="width: 80px;" src="http://cdn.gsxservice.com/asset/img/app/pc/teacher-qr.png" /></div><div><div class="teacher-app-title">老师版APP</div><div>随时接收学生留言</div><div>随时查看主页浏览量</div></div></div--></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/center/common/nav.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a31511_42616030')) {function content_58db6e56a31511_42616030($_smarty_tpl) {?>
<?php if (!isset($_smarty_tpl->tpl_vars['nav_active_tab']->value)) {?><?php $_smarty_tpl->tpl_vars['nav_active_tab'] = new Smarty_variable('', null, 0);?><?php }?><div id="nav"><div class="wrapper"><?php if ($_smarty_tpl->tpl_vars['identity']->value=='teacher') {?><div class="feedback"><i class="icon icon-edit-o"></i><a class="text" href="/guide/feedback?a=feedback" target="_blank">问题反馈</a></div><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='index') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/teacher_center/index">个人中心</a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='account') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['identity']->value;?>
_center/account">账户设置</a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='message') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['identity']->value;?>
_center/message">消息管理</a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='vip') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/teacher_center/vip_center" target="_blank">会员中心<div class="vip-icon"></div></a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='home') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/t/<?php echo $_smarty_tpl->tpl_vars['user_data']->value['user_number'];?>
" target="_blank">我的主页</a><?php } else { ?><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='lesson') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/lesson/studentLessons">首页</a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='home') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/x/<?php echo $_smarty_tpl->tpl_vars['user_data']->value['user_number'];?>
" target="_blank">个人主页</a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='account') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['identity']->value;?>
_center/account">账户设置</a><a class="tab <?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='message') {?>active<?php }?>" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['identity']->value;?>
_center/message">消息</a><?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['huike']['is_huike_student'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['huike']['is_huike_student']) {?><a class="tab" href="<?php echo $_smarty_tpl->tpl_vars['tpl_data']->value['huike']['org_url'];?>
" target="_blank">我的学校</a><?php }?><?php }?></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/teacher_center/common/sidebar.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56a4a7f6_53328426')) {function content_58db6e56a4a7f6_53328426($_smarty_tpl) {?> <?php $_smarty_tpl->createLocalArrayVariable('manageOverview', null, 0);
$_smarty_tpl->tpl_vars['manageOverview']->value['name'] = '管理总览';?>
<?php $_smarty_tpl->createLocalArrayVariable('manageOverview', null, 0);
$_smarty_tpl->tpl_vars['manageOverview']->value['url'] = '/teacher_center/index';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='manageOverview') {?> <?php $_smarty_tpl->createLocalArrayVariable('manageOverview', null, 0);
$_smarty_tpl->tpl_vars['manageOverview']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->createLocalArrayVariable('courseManage', null, 0);
$_smarty_tpl->tpl_vars['courseManage']->value['name'] = '课程管理';?> <?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['name'] = '我的课表';?>
<?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['url'] = '/teacher_center/timetable';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='timetable') {?> <?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('courseManage', null, 0);
$_smarty_tpl->tpl_vars['courseManage']->value['children'][] = $_smarty_tpl->tpl_vars['myCourse']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('courseSettings', null, 0);
$_smarty_tpl->tpl_vars['courseSettings']->value['name'] = '课程设置';?>
<?php $_smarty_tpl->createLocalArrayVariable('courseSettings', null, 0);
$_smarty_tpl->tpl_vars['courseSettings']->value['url'] = '/teacher_center/set_course';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='courseSettings') {?> <?php $_smarty_tpl->createLocalArrayVariable('courseSettings', null, 0);
$_smarty_tpl->tpl_vars['courseSettings']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('courseManage', null, 0);
$_smarty_tpl->tpl_vars['courseManage']->value['children'][] = $_smarty_tpl->tpl_vars['courseSettings']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('cloudPlayback', null, 0);
$_smarty_tpl->tpl_vars['cloudPlayback']->value['name'] = '直播回放';?>
<?php $_smarty_tpl->createLocalArrayVariable('cloudPlayback', null, 0);
$_smarty_tpl->tpl_vars['cloudPlayback']->value['url'] = '/teacher_center/cloudplayback';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='cloudPlayback') {?> <?php $_smarty_tpl->createLocalArrayVariable('cloudPlayback', null, 0);
$_smarty_tpl->tpl_vars['cloudPlayback']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('courseManage', null, 0);
$_smarty_tpl->tpl_vars['courseManage']->value['children'][] = $_smarty_tpl->tpl_vars['cloudPlayback']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('trialCourse', null, 0);
$_smarty_tpl->tpl_vars['trialCourse']->value['name'] = '预约试听';?>
<?php $_smarty_tpl->createLocalArrayVariable('trialCourse', null, 0);
$_smarty_tpl->tpl_vars['trialCourse']->value['class'] = 'white-flag';?>
<?php $_smarty_tpl->createLocalArrayVariable('trialCourse', null, 0);
$_smarty_tpl->tpl_vars['trialCourse']->value['url'] = '/teacher_center/trial_course';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='trialCourse') {?> <?php $_smarty_tpl->createLocalArrayVariable('trialCourse', null, 0);
$_smarty_tpl->tpl_vars['trialCourse']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('courseManage', null, 0);
$_smarty_tpl->tpl_vars['courseManage']->value['children'][] = $_smarty_tpl->tpl_vars['trialCourse']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('tradeManage', null, 0);
$_smarty_tpl->tpl_vars['tradeManage']->value['name'] = '交易管理';?> <?php $_smarty_tpl->tpl_vars['orders'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('orders', null, 0);
$_smarty_tpl->tpl_vars['orders']->value['name'] = '订单管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('orders', null, 0);
$_smarty_tpl->tpl_vars['orders']->value['class'] = 'orders';?>
<?php $_smarty_tpl->createLocalArrayVariable('orders', null, 0);
$_smarty_tpl->tpl_vars['orders']->value['url'] = '/teacher_center/orders';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='orders') {?> <?php $_smarty_tpl->createLocalArrayVariable('orders', null, 0);
$_smarty_tpl->tpl_vars['orders']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('tradeManage', null, 0);
$_smarty_tpl->tpl_vars['tradeManage']->value['children'][] = $_smarty_tpl->tpl_vars['orders']->value;?> <?php $_smarty_tpl->tpl_vars['student'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('student', null, 0);
$_smarty_tpl->tpl_vars['student']->value['name'] = '学生管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('student', null, 0);
$_smarty_tpl->tpl_vars['student']->value['class'] = 'student';?>
<?php $_smarty_tpl->createLocalArrayVariable('student', null, 0);
$_smarty_tpl->tpl_vars['student']->value['url'] = '/teacher_center/student';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='student') {?> <?php $_smarty_tpl->createLocalArrayVariable('student', null, 0);
$_smarty_tpl->tpl_vars['student']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('tradeManage', null, 0);
$_smarty_tpl->tpl_vars['tradeManage']->value['children'][] = $_smarty_tpl->tpl_vars['student']->value;?> <?php $_smarty_tpl->tpl_vars['comment'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('comment', null, 0);
$_smarty_tpl->tpl_vars['comment']->value['name'] = '评价管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('comment', null, 0);
$_smarty_tpl->tpl_vars['comment']->value['class'] = 'comment';?>
<?php $_smarty_tpl->createLocalArrayVariable('comment', null, 0);
$_smarty_tpl->tpl_vars['comment']->value['url'] = '/teacher_center/commentFromStudent';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='comment') {?> <?php $_smarty_tpl->createLocalArrayVariable('comment', null, 0);
$_smarty_tpl->tpl_vars['comment']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('tradeManage', null, 0);
$_smarty_tpl->tpl_vars['tradeManage']->value['children'][] = $_smarty_tpl->tpl_vars['comment']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('profileManage', null, 0);
$_smarty_tpl->tpl_vars['profileManage']->value['name'] = '个人设置';?> <?php $_smarty_tpl->tpl_vars['cert'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('cert', null, 0);
$_smarty_tpl->tpl_vars['cert']->value['name'] = '认证设置';?>
<?php $_smarty_tpl->createLocalArrayVariable('cert', null, 0);
$_smarty_tpl->tpl_vars['cert']->value['url'] = '/teacher_center/user_cert';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='cert') {?> <?php $_smarty_tpl->createLocalArrayVariable('cert', null, 0);
$_smarty_tpl->tpl_vars['cert']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('profileManage', null, 0);
$_smarty_tpl->tpl_vars['profileManage']->value['children'][] = $_smarty_tpl->tpl_vars['cert']->value;?> <?php $_smarty_tpl->tpl_vars['profile'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('profile', null, 0);
$_smarty_tpl->tpl_vars['profile']->value['name'] = '资料管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('profile', null, 0);
$_smarty_tpl->tpl_vars['profile']->value['url'] = '/teacher_center/profile';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='profile') {?> <?php $_smarty_tpl->createLocalArrayVariable('profile', null, 0);
$_smarty_tpl->tpl_vars['profile']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('profileManage', null, 0);
$_smarty_tpl->tpl_vars['profileManage']->value['children'][] = $_smarty_tpl->tpl_vars['profile']->value;?> <?php $_smarty_tpl->tpl_vars['address'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('address', null, 0);
$_smarty_tpl->tpl_vars['address']->value['name'] = '地址管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('address', null, 0);
$_smarty_tpl->tpl_vars['address']->value['url'] = '/tcenter/addresses/list';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='address') {?> <?php $_smarty_tpl->createLocalArrayVariable('address', null, 0);
$_smarty_tpl->tpl_vars['address']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('profileManage', null, 0);
$_smarty_tpl->tpl_vars['profileManage']->value['children'][] = $_smarty_tpl->tpl_vars['address']->value;?> <?php $_smarty_tpl->tpl_vars['org'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('org', null, 0);
$_smarty_tpl->tpl_vars['org']->value['name'] = '我的机构';?>
<?php $_smarty_tpl->createLocalArrayVariable('org', null, 0);
$_smarty_tpl->tpl_vars['org']->value['url'] = '/teacher_center/org';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='org') {?> <?php $_smarty_tpl->createLocalArrayVariable('org', null, 0);
$_smarty_tpl->tpl_vars['org']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('profileManage', null, 0);
$_smarty_tpl->tpl_vars['profileManage']->value['children'][] = $_smarty_tpl->tpl_vars['org']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('indexManage', null, 0);
$_smarty_tpl->tpl_vars['indexManage']->value['name'] = '主页管理';?> <?php $_smarty_tpl->tpl_vars['courseSort'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('courseSort', null, 0);
$_smarty_tpl->tpl_vars['courseSort']->value['name'] = '课程排序';?>
<?php $_smarty_tpl->createLocalArrayVariable('courseSort', null, 0);
$_smarty_tpl->tpl_vars['courseSort']->value['url'] = '/tcenter/courses/all-courses/list-by-sort';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='courseSort') {?> <?php $_smarty_tpl->createLocalArrayVariable('courseSort', null, 0);
$_smarty_tpl->tpl_vars['courseSort']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('indexManage', null, 0);
$_smarty_tpl->tpl_vars['indexManage']->value['children'][] = $_smarty_tpl->tpl_vars['courseSort']->value;?> <?php $_smarty_tpl->tpl_vars['photos'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('photos', null, 0);
$_smarty_tpl->tpl_vars['photos']->value['name'] = '我的照片';?>
<?php $_smarty_tpl->createLocalArrayVariable('photos', null, 0);
$_smarty_tpl->tpl_vars['photos']->value['url'] = '/teacher_center/photos';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='photos') {?> <?php $_smarty_tpl->createLocalArrayVariable('photos', null, 0);
$_smarty_tpl->tpl_vars['photos']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('indexManage', null, 0);
$_smarty_tpl->tpl_vars['indexManage']->value['children'][] = $_smarty_tpl->tpl_vars['photos']->value;?> <?php $_smarty_tpl->tpl_vars['video'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('video', null, 0);
$_smarty_tpl->tpl_vars['video']->value['name'] = '我的视频';?>
<?php $_smarty_tpl->createLocalArrayVariable('video', null, 0);
$_smarty_tpl->tpl_vars['video']->value['url'] = '/teacher_center/video';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='video') {?> <?php $_smarty_tpl->createLocalArrayVariable('video', null, 0);
$_smarty_tpl->tpl_vars['video']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('indexManage', null, 0);
$_smarty_tpl->tpl_vars['indexManage']->value['children'][] = $_smarty_tpl->tpl_vars['video']->value;?> <?php $_smarty_tpl->tpl_vars['decorate'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('decorate', null, 0);
$_smarty_tpl->tpl_vars['decorate']->value['name'] = '主页装修';?>
<?php $_smarty_tpl->createLocalArrayVariable('decorate', null, 0);
$_smarty_tpl->tpl_vars['decorate']->value['url'] = '/teacher_center/index_decorate';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='decorate') {?> <?php $_smarty_tpl->createLocalArrayVariable('decorate', null, 0);
$_smarty_tpl->tpl_vars['decorate']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('indexManage', null, 0);
$_smarty_tpl->tpl_vars['indexManage']->value['children'][] = $_smarty_tpl->tpl_vars['decorate']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('dataCenter', null, 0);
$_smarty_tpl->tpl_vars['dataCenter']->value['name'] = '数据中心';?>
<?php $_smarty_tpl->createLocalArrayVariable('dataCenter', null, 0);
$_smarty_tpl->tpl_vars['dataCenter']->value['url'] = '/teacher_center/visit_data';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='sysntheticSort'||$_smarty_tpl->tpl_vars['active']->value==='visitData'||$_smarty_tpl->tpl_vars['active']->value==='transactionData') {?> <?php $_smarty_tpl->createLocalArrayVariable('dataCenter', null, 0);
$_smarty_tpl->tpl_vars['dataCenter']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->createLocalArrayVariable('marketingCenter', null, 0);
$_smarty_tpl->tpl_vars['marketingCenter']->value['name'] = '营销中心';?> <?php $_smarty_tpl->tpl_vars['smsCenter'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('smsCenter', null, 0);
$_smarty_tpl->tpl_vars['smsCenter']->value['name'] = '短信中心';?>
<?php $_smarty_tpl->createLocalArrayVariable('smsCenter', null, 0);
$_smarty_tpl->tpl_vars['smsCenter']->value['url'] = '/sms_account/center';?>
<?php $_smarty_tpl->createLocalArrayVariable('smsCenter', null, 0);
$_smarty_tpl->tpl_vars['smsCenter']->value['class'] = 'smsCenter';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='smsCenter') {?>
<?php $_smarty_tpl->createLocalArrayVariable('smsCenter', null, 0);
$_smarty_tpl->tpl_vars['smsCenter']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('marketingCenter', null, 0);
$_smarty_tpl->tpl_vars['marketingCenter']->value['children'][] = $_smarty_tpl->tpl_vars['smsCenter']->value;?> <?php $_smarty_tpl->tpl_vars['myCourse'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['name'] = '优惠券';?>
<?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['url'] = '#';?>
<?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['class'] = 'coupon';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='myCourse') {?> <?php $_smarty_tpl->createLocalArrayVariable('myCourse', null, 0);
$_smarty_tpl->tpl_vars['myCourse']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('marketingCenter', null, 0);
$_smarty_tpl->tpl_vars['marketingCenter']->value['children'][] = $_smarty_tpl->tpl_vars['myCourse']->value;?> <?php $_smarty_tpl->tpl_vars['market'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('market', null, 0);
$_smarty_tpl->tpl_vars['market']->value['name'] = '促销活动';?>
<?php $_smarty_tpl->createLocalArrayVariable('market', null, 0);
$_smarty_tpl->tpl_vars['market']->value['url'] = '/teacher_center/market?type=1';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='market') {?> <?php $_smarty_tpl->createLocalArrayVariable('market', null, 0);
$_smarty_tpl->tpl_vars['market']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('marketingCenter', null, 0);
$_smarty_tpl->tpl_vars['marketingCenter']->value['children'][] = $_smarty_tpl->tpl_vars['market']->value;?> <?php $_smarty_tpl->tpl_vars['activity'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('activity', null, 0);
$_smarty_tpl->tpl_vars['activity']->value['name'] = '活动报名';?>
<?php $_smarty_tpl->createLocalArrayVariable('activity', null, 0);
$_smarty_tpl->tpl_vars['activity']->value['url'] = '/teacher_center/activity_apply';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='activity') {?> <?php $_smarty_tpl->createLocalArrayVariable('activity', null, 0);
$_smarty_tpl->tpl_vars['activity']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['alliance'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('alliance', null, 0);
$_smarty_tpl->tpl_vars['alliance']->value['name'] = 'U盟推广';?>
<?php $_smarty_tpl->createLocalArrayVariable('alliance', null, 0);
$_smarty_tpl->tpl_vars['alliance']->value['class'] = 'alliance';?>
<?php $_smarty_tpl->createLocalArrayVariable('alliance', null, 0);
$_smarty_tpl->tpl_vars['alliance']->value['url'] = '#';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='alliance') {?> <?php $_smarty_tpl->createLocalArrayVariable('alliance', null, 0);
$_smarty_tpl->tpl_vars['alliance']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('marketingCenter', null, 0);
$_smarty_tpl->tpl_vars['marketingCenter']->value['children'][] = $_smarty_tpl->tpl_vars['alliance']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('walletManage', null, 0);
$_smarty_tpl->tpl_vars['walletManage']->value['name'] = '钱包管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('walletManage', null, 0);
$_smarty_tpl->tpl_vars['walletManage']->value['url'] = '/wallet/index';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='cash'||$_smarty_tpl->tpl_vars['active']->value==='myBankCard') {?> <?php $_smarty_tpl->createLocalArrayVariable('walletManage', null, 0);
$_smarty_tpl->tpl_vars['walletManage']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->createLocalArrayVariable('diskManage', null, 0);
$_smarty_tpl->tpl_vars['diskManage']->value['name'] = '资料管理';?> <?php $_smarty_tpl->createLocalArrayVariable('netdisk', null, 0);
$_smarty_tpl->tpl_vars['netdisk']->value['name'] = '资料库';?>
<?php $_smarty_tpl->createLocalArrayVariable('netdisk', null, 0);
$_smarty_tpl->tpl_vars['netdisk']->value['url'] = '/teacher_center/netdisk';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='netdisk') {?> <?php $_smarty_tpl->createLocalArrayVariable('netdisk', null, 0);
$_smarty_tpl->tpl_vars['netdisk']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('diskManage', null, 0);
$_smarty_tpl->tpl_vars['diskManage']->value['children'][] = $_smarty_tpl->tpl_vars['netdisk']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('storageSpace', null, 0);
$_smarty_tpl->tpl_vars['storageSpace']->value['name'] = '存储空间';?>
<?php $_smarty_tpl->createLocalArrayVariable('storageSpace', null, 0);
$_smarty_tpl->tpl_vars['storageSpace']->value['url'] = '/teacher_center/storage_space';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='storageSpace') {?> <?php $_smarty_tpl->createLocalArrayVariable('storageSpace', null, 0);
$_smarty_tpl->tpl_vars['storageSpace']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('diskManage', null, 0);
$_smarty_tpl->tpl_vars['diskManage']->value['children'][] = $_smarty_tpl->tpl_vars['storageSpace']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('moreFunction', null, 0);
$_smarty_tpl->tpl_vars['moreFunction']->value['name'] = '更多功能';?> <?php $_smarty_tpl->tpl_vars['articleManage'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('articleManage', null, 0);
$_smarty_tpl->tpl_vars['articleManage']->value['name'] = '文章管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('articleManage', null, 0);
$_smarty_tpl->tpl_vars['articleManage']->value['class'] = 'article';?>
<?php $_smarty_tpl->createLocalArrayVariable('articleManage', null, 0);
$_smarty_tpl->tpl_vars['articleManage']->value['url'] = '#';?>
<?php $_smarty_tpl->createLocalArrayVariable('moreFunction', null, 0);
$_smarty_tpl->tpl_vars['moreFunction']->value['children'][] = $_smarty_tpl->tpl_vars['articleManage']->value;?> <?php $_smarty_tpl->tpl_vars['bbs'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('bbs', null, 0);
$_smarty_tpl->tpl_vars['bbs']->value['name'] = '社区互动';?>
<?php $_smarty_tpl->createLocalArrayVariable('bbs', null, 0);
$_smarty_tpl->tpl_vars['bbs']->value['blank'] = '1';?>
<?php $_smarty_tpl->createLocalArrayVariable('bbs', null, 0);
$_smarty_tpl->tpl_vars['bbs']->value['outer'] = '1';?>
<?php $_smarty_tpl->createLocalArrayVariable('bbs', null, 0);
$_smarty_tpl->tpl_vars['bbs']->value['url'] = 'http://bbs.genshuixue.com/';?>
<?php $_smarty_tpl->createLocalArrayVariable('moreFunction', null, 0);
$_smarty_tpl->tpl_vars['moreFunction']->value['children'][] = $_smarty_tpl->tpl_vars['bbs']->value;?> <?php $_smarty_tpl->tpl_vars['myInvite'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('myInvite', null, 0);
$_smarty_tpl->tpl_vars['myInvite']->value['name'] = '我的邀请';?>
<?php $_smarty_tpl->createLocalArrayVariable('myInvite', null, 0);
$_smarty_tpl->tpl_vars['myInvite']->value['url'] = '/teacher_center/invite';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='myInvite') {?> <?php $_smarty_tpl->createLocalArrayVariable('myInvite', null, 0);
$_smarty_tpl->tpl_vars['myInvite']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('moreFunction', null, 0);
$_smarty_tpl->tpl_vars['moreFunction']->value['children'][] = $_smarty_tpl->tpl_vars['myInvite']->value;?> <?php $_smarty_tpl->tpl_vars['teacherRank'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('teacherRank', null, 0);
$_smarty_tpl->tpl_vars['teacherRank']->value['name'] = '我的排名';?>
<?php $_smarty_tpl->createLocalArrayVariable('teacherRank', null, 0);
$_smarty_tpl->tpl_vars['teacherRank']->value['url'] = '/teacher_center/teacherRank';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='teacherRank') {?> <?php $_smarty_tpl->createLocalArrayVariable('teacherRank', null, 0);
$_smarty_tpl->tpl_vars['teacherRank']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['manageOverview']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['courseManage']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['tradeManage']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['profileManage']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['indexManage']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['dataCenter']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['marketingCenter']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['walletManage']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['diskManage']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['moreFunction']->value;?> <?php if (isset($_smarty_tpl->tpl_vars['user_data']->value)&&isset($_smarty_tpl->tpl_vars['user_data']->value['rank_activity_seniority'])&&$_smarty_tpl->tpl_vars['user_data']->value['rank_activity_seniority']&&false) {?> <?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['teacherRank']->value;?>
<?php }?> <?php /* Call merged included template "common/center/common/sidebar.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/center/common/sidebar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('menu'=>$_smarty_tpl->tpl_vars['menu']->value), 0, '142173015257902d5ed26832-47070596');
content_58db6e56ae41d3_32190662($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/center/common/sidebar.html" */?> <?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/center/common/sidebar.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56ae41d3_32190662')) {function content_58db6e56ae41d3_32190662($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_cn_truncate')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.cn_truncate.php';
?> <?php if (!isset($_smarty_tpl->tpl_vars['nav_active_tab']->value)) {?><?php $_smarty_tpl->tpl_vars['nav_active_tab'] = new Smarty_variable('', null, 0);?><?php }?><div id="sidebar" class="card <?php if ($_smarty_tpl->tpl_vars['identity']->value!=='teacher') {?> student-sidebar <?php } else { ?> teacher-sidebar<?php }?>"><?php if ($_smarty_tpl->tpl_vars['identity']->value!=='teacher') {?><div class="user-info<?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='index') {?> active<?php }?>"><?php /* Call merged included template "common/component/image.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/component/image.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('url'=>$_smarty_tpl->tpl_vars['user_data']->value['avatar'],'width'=>58,'class'=>"thumbnail small"), 0, '142173015257902d5ed26832-47070596');
content_58db6e56aed234_31319056($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/component/image.html" */?><?php $_smarty_tpl->tpl_vars['display_name'] = new Smarty_variable(smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['user_data']->value['display_name'],5), null, 0);?><h5<?php if ($_smarty_tpl->tpl_vars['display_name']->value!=$_smarty_tpl->tpl_vars['user_data']->value['display_name']) {?> data-title="<?php echo $_smarty_tpl->tpl_vars['user_data']->value['display_name'];?>
"<?php }?>><?php echo $_smarty_tpl->tpl_vars['display_name']->value;?>
</h5><p>ID：<?php echo $_smarty_tpl->tpl_vars['user_data']->value['user_number'];?>
</p></div><?php }?><div class="menu"><?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['menu']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><?php if (isset($_smarty_tpl->tpl_vars['item']->value['https'])&&$_smarty_tpl->tpl_vars['item']->value['https']) {?><?php $_smarty_tpl->tpl_vars['host_name'] = new Smarty_variable($_smarty_tpl->tpl_vars['origin_https']->value, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['host_name'] = new Smarty_variable($_smarty_tpl->tpl_vars['origin_http']->value, null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable(array(), null, 0);?><?php if (isset($_smarty_tpl->tpl_vars['item']->value['children'])&&count($_smarty_tpl->tpl_vars['item']->value['children'])>0) {?><?php $_smarty_tpl->createLocalArrayVariable('class', null, 0);
$_smarty_tpl->tpl_vars['class']->value[] = 'has-children';?><?php $_smarty_tpl->tpl_vars['has_children'] = new Smarty_variable(true, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['has_children'] = new Smarty_variable(false, null, 0);?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['item']->value['active'])&&$_smarty_tpl->tpl_vars['item']->value['active']) {?><?php $_smarty_tpl->createLocalArrayVariable('class', null, 0);
$_smarty_tpl->tpl_vars['class']->value[] = 'active';?><?php }?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable(implode(' ',$_smarty_tpl->tpl_vars['class']->value), null, 0);?><div class="menu-item<?php if ($_smarty_tpl->tpl_vars['class']->value) {?> <?php echo $_smarty_tpl->tpl_vars['class']->value;?>
<?php }?>"><?php if ($_smarty_tpl->tpl_vars['has_children']->value) {?><b><?php if (isset($_smarty_tpl->tpl_vars['item']->value['icon'])) {?><i class="icon <?php echo $_smarty_tpl->tpl_vars['item']->value['icon'];?>
"></i><?php }?><strong><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</strong></b><?php } else { ?><a <?php if (isset($_smarty_tpl->tpl_vars['item']->value['url'])) {?> href="<?php echo $_smarty_tpl->tpl_vars['host_name']->value;?>
<?php echo $_smarty_tpl->tpl_vars['item']->value['url'];?>
" <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['item']->value['blank'])) {?>target="_blank"<?php }?> ><?php if (isset($_smarty_tpl->tpl_vars['item']->value['icon'])) {?><i class="icon <?php echo $_smarty_tpl->tpl_vars['item']->value['icon'];?>
"></i><?php }?><strong><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</strong><?php if ($_smarty_tpl->tpl_vars['item']->value['name']=='预约试听') {?><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/teacher-center/new.png" style="margin-left:5px;"><?php }?></a><?php }?><?php if ($_smarty_tpl->tpl_vars['has_children']->value) {?><ul class="sub-menu"><?php $_smarty_tpl->tpl_vars['sub_item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['sub_item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['item']->value['children']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['sub_item']->key => $_smarty_tpl->tpl_vars['sub_item']->value) {
$_smarty_tpl->tpl_vars['sub_item']->_loop = true;
?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable(array(), null, 0);?><?php if (isset($_smarty_tpl->tpl_vars['sub_item']->value['class'])) {?><?php $_smarty_tpl->createLocalArrayVariable('class', null, 0);
$_smarty_tpl->tpl_vars['class']->value[] = $_smarty_tpl->tpl_vars['sub_item']->value['class'];?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['sub_item']->value['active'])&&$_smarty_tpl->tpl_vars['sub_item']->value['active']) {?><?php $_smarty_tpl->createLocalArrayVariable('class', null, 0);
$_smarty_tpl->tpl_vars['class']->value[] = 'active';?><?php }?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable(implode(' ',$_smarty_tpl->tpl_vars['class']->value), null, 0);?><li<?php if ($_smarty_tpl->tpl_vars['class']->value) {?> class="<?php echo $_smarty_tpl->tpl_vars['class']->value;?>
"<?php }?>><a <?php if (isset($_smarty_tpl->tpl_vars['sub_item']->value['outer'])) {?> href="<?php echo $_smarty_tpl->tpl_vars['sub_item']->value['url'];?>
" <?php } else { ?> href="<?php echo $_smarty_tpl->tpl_vars['host_name']->value;?>
<?php echo $_smarty_tpl->tpl_vars['sub_item']->value['url'];?>
" <?php }?> <?php if (isset($_smarty_tpl->tpl_vars['sub_item']->value['blank'])) {?>target="_blank"<?php }?>><?php echo $_smarty_tpl->tpl_vars['sub_item']->value['name'];?>
<?php if ($_smarty_tpl->tpl_vars['sub_item']->value['name']==='主页装修去掉') {?><strong class="text-error tiny" style="font-weight: bold;">&nbsp;NEW</strong><?php }?></a></li><?php } ?></ul><?php }?></div><?php } ?></div><?php if ($_smarty_tpl->tpl_vars['identity']->value==='teacher'&&count($_smarty_tpl->tpl_vars['ext_data']->value['teacher_center_notify'])>0) {?><div class="notify"><?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['ext_data']->value['teacher_center_notify']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['link'];?>
" target="_blank"><i></i><?php $_smarty_tpl->tpl_vars['title'] = new Smarty_variable(smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['item']->value['title'],11), null, 0);?><span<?php if ($_smarty_tpl->tpl_vars['title']->value!=$_smarty_tpl->tpl_vars['item']->value['title']) {?> data-title="<?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
"<?php }?>><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</span></a><?php } ?></div><?php }?><?php if ($_smarty_tpl->tpl_vars['identity']->value!=='teacher') {?><div class="qrcode-box"><div class="text-primary">跟谁学微信公众号码</div><div class="wechat-qrcode"></div><div class="text-info">关注领好课</div></div><?php }?></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/image.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56aed234_31319056')) {function content_58db6e56aed234_31319056($_smarty_tpl) {?>
<?php if (isset($_smarty_tpl->tpl_vars['class']->value)) {?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable(((' class="').($_smarty_tpl->tpl_vars['class']->value)).('"'), null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable('', null, 0);?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['alt']->value)) {?><?php $_smarty_tpl->tpl_vars['alt'] = new Smarty_variable(((' alt="').($_smarty_tpl->tpl_vars['alt']->value)).('"'), null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['alt'] = new Smarty_variable('', null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['width2height'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['160'] = 120;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['180'] = 134;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['48'] = 48;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['54'] = 54;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['58'] = 58;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['60'] = 60;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['66'] = 66;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['72'] = 72;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['78'] = 78;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['80'] = 80;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['90'] = 90;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['98'] = 98;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['120'] = 120;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['150'] = 150;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['152'] = 152;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['240'] = 170;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['200'] = 150;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['167'] = 167;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['130'] = 74;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['390'] = 293;?><?php $_smarty_tpl->createLocalArrayVariable('width2height', null, 0);
$_smarty_tpl->tpl_vars['width2height']->value['70'] = 54;?><?php $_smarty_tpl->tpl_vars['parts'] = new Smarty_variable(explode('.',$_smarty_tpl->tpl_vars['url']->value), null, 0);?><?php $_smarty_tpl->tpl_vars['extname'] = new Smarty_variable(array_pop($_smarty_tpl->tpl_vars['parts']->value), null, 0);?><?php if ($_smarty_tpl->tpl_vars['extname']->value==='gif') {?><?php $_smarty_tpl->tpl_vars['extname'] = new Smarty_variable('jpg', null, 0);?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['no_crop']->value)&&$_smarty_tpl->tpl_vars['no_crop']->value) {?><?php $_smarty_tpl->tpl_vars['crop_value'] = new Smarty_variable('0', null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['crop_value'] = new Smarty_variable('1', null, 0);?><?php }?><?php if (!isset($_smarty_tpl->tpl_vars['height']->value)) {?><?php $_smarty_tpl->tpl_vars['height'] = new Smarty_variable($_smarty_tpl->tpl_vars['width2height']->value[$_smarty_tpl->tpl_vars['width']->value], null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['width'] = new Smarty_variable(intval($_smarty_tpl->tpl_vars['width']->value), null, 0);?><?php $_smarty_tpl->tpl_vars['height'] = new Smarty_variable(intval($_smarty_tpl->tpl_vars['height']->value), null, 0);?><?php if (isset($_smarty_tpl->tpl_vars['no_img']->value)) {?><?php $_smarty_tpl->tpl_vars['url'] = new Smarty_variable((((((((($_smarty_tpl->tpl_vars['url']->value).("@")).($_smarty_tpl->tpl_vars['crop_value']->value)).("e_")).($_smarty_tpl->tpl_vars['width']->value)).("w_")).($_smarty_tpl->tpl_vars['height']->value)).('h_1c_0i_1o_90Q_1x.')).($_smarty_tpl->tpl_vars['extname']->value), null, 1);
if ($_smarty_tpl->parent != null) $_smarty_tpl->parent->tpl_vars['url'] = clone $_smarty_tpl->tpl_vars['url'];?><?php echo $_smarty_tpl->tpl_vars['url']->value;?>
<?php } else { ?><?php $_smarty_tpl->tpl_vars['url'] = new Smarty_variable((((((((($_smarty_tpl->tpl_vars['url']->value).("@")).($_smarty_tpl->tpl_vars['crop_value']->value)).("e_")).($_smarty_tpl->tpl_vars['width']->value)).("w_")).($_smarty_tpl->tpl_vars['height']->value)).('h_1c_0i_1o_90Q_1x.')).($_smarty_tpl->tpl_vars['extname']->value), null, 0);?><img <?php if (isset($_smarty_tpl->tpl_vars['lazy_load']->value)&&$_smarty_tpl->tpl_vars['lazy_load']->value) {?>data-<?php }?>src="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
" <?php echo $_smarty_tpl->tpl_vars['class']->value;?>
<?php echo $_smarty_tpl->tpl_vars['alt']->value;?> width="<?php echo $_smarty_tpl->tpl_vars['width']->value;?>
" height="<?php echo $_smarty_tpl->tpl_vars['height']->value;?>
" <?php if (!empty($_smarty_tpl->tpl_vars['onerror']->value)) {?>onerror="<?php echo $_smarty_tpl->tpl_vars['onerror']->value;?>
"<?php }?>/><?php }?>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/script.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56b84c75_14376000')) {function content_58db6e56b84c75_14376000($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.replace.php';
?> <script src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/dep/base/0.0.12/src/base.js"></script><script>require.config({baseUrl: '<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src',packages: [{name: 'cobble',location: '../dep/cobble/0.3.28/src',main: 'main'},{name: 'webIM',location: '../dep/webIM/0.0.1/src',main: 'sdk'},{name: 'moment',location: '../dep/moment/2.7.0/src',main: 'moment'},{name: 'imageCrop',location: '../dep/image-crop/0.0.3/src',main: 'imageCrop'},{name: 'underscore',location: '../dep/underscore/1.6.0/src',main: 'underscore'},{name: 'audioPlayer',location: '../dep/audioPlayer/0.0.3/src',main: 'audioPlayer'},{name: 'TextClipboard',location: '../dep/TextClipboard/0.0.3/src',main: 'TextClipboard'},{name: 'echarts',location: '../dep/echarts/2.1.10/src',main: 'echarts'},{name: 'cc',location: '../dep/cc/1.1.1/src',main: 'main'},{name: 'custom',location: '../dep/cc/1.1.1/custom'},{name: 'moment',location: '../dep/moment/2.7.0/src',main: 'moment'},{name: 'SwfStore',location: '../dep/SwfStore/0.0.1/src',main: 'SwfStore'}],urlArgs: {'hermes/dispatcher': '{edp-variable:{version}}'}});<?php $_smarty_tpl->tpl_vars['amd_modules'] = new Smarty_variable(array('common/store','common/service','common/eventEmitter','common/combine/site'), null, 0);?><?php if (isset($_smarty_tpl->tpl_vars['amd_more']->value)) {?><?php if (is_array($_smarty_tpl->tpl_vars['amd_more']->value)) {?><?php $_smarty_tpl->tpl_vars['path'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['path']->_loop = false; $_from = $_smarty_tpl->tpl_vars['amd_more']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['path']->key => $_smarty_tpl->tpl_vars['path']->value) {
$_smarty_tpl->tpl_vars['path']->_loop = true;
?><?php $_smarty_tpl->createLocalArrayVariable('amd_modules', null, 0);
$_smarty_tpl->tpl_vars['amd_modules']->value[] = $_smarty_tpl->tpl_vars['path']->value;?><?php } ?><?php } elseif (is_string($_smarty_tpl->tpl_vars['amd_more']->value)) {?><?php $_smarty_tpl->createLocalArrayVariable('amd_modules', null, 0);
$_smarty_tpl->tpl_vars['amd_modules']->value[] = $_smarty_tpl->tpl_vars['amd_more']->value;?><?php }?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['script_path']->value)) {?><?php $_smarty_tpl->createLocalArrayVariable('amd_modules', null, 0);
$_smarty_tpl->tpl_vars['amd_modules']->value[] = $_smarty_tpl->tpl_vars['script_path']->value;?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['static_more']->value)) {?>require(<?php echo json_encode($_smarty_tpl->tpl_vars['static_more']->value,77);?>
, function () {for (var i = 0, len = arguments.length; i < len; i++) {var module = arguments[i];if (module && $.isFunction(module.init)) {module.init();}}});<?php }?>require(<?php echo json_encode($_smarty_tpl->tpl_vars['amd_modules']->value,77);?>
,function () {var args = arguments;var store = args[0];var service = args[1];var events = args[2];var user = {id: 0,type: -1,avatar: '',source_sys_id: 0,classCourse: '',globalDistrict: '',name: '',number: '',mobile: '',qreserve_remind: 1,qreserve_global_sign: 1,vip_level : 0};<?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['avatar'])) {?>user.id = <?php echo $_smarty_tpl->tpl_vars['user_data']->value['user_id'];?>
;user.type = <?php echo $_smarty_tpl->tpl_vars['user_data']->value['user_type'];?>
;user.number = '<?php echo preg_replace("%(?<!\\\\)'%", "\'",$_smarty_tpl->tpl_vars['user_data']->value['user_number']);?>
';<?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['user_name'])) {?>user.name = '<?php echo preg_replace("%(?<!\\\\)'%", "\'",smarty_modifier_replace($_smarty_tpl->tpl_vars['user_data']->value['user_name'],"\\","\\\\"));?>
';<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['mobile'])) {?>user.mobile = '<?php echo $_smarty_tpl->tpl_vars['user_data']->value['mobile'];?>
';<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['avatar'])) {?>user.avatar = '<?php echo $_smarty_tpl->tpl_vars['user_data']->value['avatar'];?>
';<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['permission'])) {?>user.classCourse = '<?php echo $_smarty_tpl->tpl_vars['user_data']->value['permission']['class_course'];?>
';user.globalDistrict = '<?php echo $_smarty_tpl->tpl_vars['user_data']->value['permission']['global_district'];?>
';<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['source_sys_id'])) {?>user.source_sys_id = <?php echo $_smarty_tpl->tpl_vars['user_data']->value['source_sys_id'];?>
;<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['vip_level'])) {?>user.vip_level = <?php echo $_smarty_tpl->tpl_vars['user_data']->value['vip_level'];?>
;<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['qreserve_remind'])) {?>user.qreserve_remind = <?php echo $_smarty_tpl->tpl_vars['user_data']->value['qreserve_remind'];?>
;<?php }?><?php if (isset($_smarty_tpl->tpl_vars['user_data']->value['qreserve_global_sign'])) {?>user.qreserve_global_sign = <?php echo $_smarty_tpl->tpl_vars['user_data']->value['qreserve_global_sign'];?>
;<?php }?><?php }?>store.set({user: user,monkey: {'<?php echo $_smarty_tpl->tpl_vars['site_config']->value['csrfTokenName'];?>
': '<?php echo $_smarty_tpl->tpl_vars['site_config']->value['csrfTokenValue'];?>
'},serverTime: new Date(<?php echo $_smarty_tpl->tpl_vars['ts']->value*1000;?>
),cityId: '<?php echo $_smarty_tpl->tpl_vars['city']->value;?>
',env: '<?php echo $_smarty_tpl->tpl_vars['env']->value;?>
'});<?php if (isset($_smarty_tpl->tpl_vars['script_data']->value)) {?>var data = <?php echo json_encode($_smarty_tpl->tpl_vars['script_data']->value);?>
;if (data.user || data.env || data.cityId) {alert('store 已占用 user、env、serverTime、cityId！');return;}store.set(data);<?php }?>var init = function () {var body = $('body');for (var i = 3, len = args.length; i < len; i++) {var module = args[i];if (module && $.isFunction(module.init)) {module.init.call(body, events);}}};if (user.avatar) {init();}else {service.getUserBasicInfo().done(function (response) {if (response.code === 0) {var data = response.data;if (data.avatar) {user.avatar = data.avatar;user.name = data.display_name;user.mobile = data.mobile;user.id = + data.user_id;user.type = + data.user_type;user.number = data.user_number;user.source_sys_id = data.source_sys_id;user.source_sys_id = + data.source_sys_id;}}init();});}});</script>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2017-03-29 16:20:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/footer.html" */ ?>
<?php if ($_valid && !is_callable('content_58db6e56be9619_75098925')) {function content_58db6e56be9619_75098925($_smarty_tpl) {?> <div id="footer"><div class="wrapper"><div class="favor-links"><div class="tel"><i class="icon icon-phone"></i><h4>4000-910-910</h4><span>周一至周日&nbsp;9:00-23:00</span></div><div class="list"><h4>关注我们</h4><ul><li><span class="show-wechat">官方微信</span></li><li class="weibo"><a rel="nofollow" href="http://weibo.com/genshuixue" target="_blank">新浪微博</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/business?a=business" target="_blank">联系我们</a></li></ul></div><div class="list"><h4>关于跟谁学</h4><ul><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/about?a=about" target="_blank">了解我们</a></li><li><a rel="nofollow" href="http://www.genshuixue.com/activity/onekey_teacher?name=zhsh" target="_blank">代理合作</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/recruit" target="_blank">校园招聘</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/join?a=join" target="_blank">社会招聘</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/clause?a=clause" target="_blank">网站条款</a></li></ul></div><div class="list"><h4>服务支持</h4><ul><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/guarantee?a=guarantee" target="_blank">平台保障</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/video?a=video" target="_blank">视频拍摄</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/pay?a=pay" target="_blank">支付问题</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/feedback?a=feedback" target="_blank">意见反馈</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/tort?a=tort" target="_blank">侵权投诉</a></li></ul></div><div class="list"><h4>帮助中心</h4><ul><li><a rel="nofollow" href="http://www.genshuixue.com/static/student" target="_blank">平台流程</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/entering?a=entering" target="_blank">老师入驻</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/teacher?a=teacher" target="_blank">老师帮助</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/student?a=student" target="_blank">学生帮助</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/org?a=org" target="_blank">机构帮助</a></li></ul></div></div><div class="site-map"><ul><li><a rel="nofollow" href="http://www.genshuixue.com/guide/clause?a=clause" target="_blank">网站条款</a></li><li><a rel="nofollow" href="http://www.genshuixue.com/guide/notice?a=notice" target="_blank">活动公告</a></li><li><a href="http://www.genshuixue.com/guide/news?a=news" target="_blank">新闻报道</a></li><li><a href="http://www.genshuixue.com/static/links#8" target="_blank">申请合作</a></li><li><!--首页、搜索结果页--><?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['site_map'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['site_map']) {?><a href="/static/seoWebMap" target="_blank">网站地图</a><?php } else { ?><a href="http://www.genshuixue.com/static/seoWebMap" target="_blank">网站地图</a><?php }?></li><li><a href="http://www.genshuixue.com/st/-975_1061_1066.html" target="_blank">油画培训</a></li><li><a href="http://www.genshuixue.com/bj/st--975_1061.html" target="_blank">绘画培训</a></li><li><a href="http://www.genshuixue.com/sh/st--975_1031_1034.html" target="_blank">拉丁舞培训</a></li><li><a href="http://www.genshuixue.com/i-ielts/a/4" target="_blank">雅思机经</a></li><li><a href=" http://www.genshuixue.com/so/-573_600_603.html" target="_blank">Java培训</a></li></ul></div><?php if (isset($_smarty_tpl->tpl_vars['show_friend_links']->value)&&$_smarty_tpl->tpl_vars['show_friend_links']->value) {?><div class="friend-links"><ul><li class="friend-links-label"><strong>合作伙伴：</strong></li><?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['friendLinks'])) {?><?php $_smarty_tpl->tpl_vars['fl'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['fl']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['friendLinks']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['fl']->key => $_smarty_tpl->tpl_vars['fl']->value) {
$_smarty_tpl->tpl_vars['fl']->_loop = true;
?><?php if (!$_smarty_tpl->tpl_vars['fl']->value['jsload']) {?><li><a href="<?php echo $_smarty_tpl->tpl_vars['fl']->value['link'];?>
" target="_blank"<?php if ($_smarty_tpl->tpl_vars['fl']->value['nofollow']) {?> rel="nofollow"<?php }?>><?php echo $_smarty_tpl->tpl_vars['fl']->value['title'];?>
</a></li><?php }?><?php } ?><?php }?><li class="friend-links-last"><a href="<?php echo $_smarty_tpl->tpl_vars['root']->value;?>
/static/links" target="_blank" class="more">更多</a></li></ul></div><?php }?><div class="copyright">Copyright © 2014 - 2017 北京百家互联科技有限公司版权所有. 京公网安备11010802015210号 | 京ICP备14027590号-1</div><?php if ($_smarty_tpl->tpl_vars['env']->value==='www') {?><div class="cert"><a style="display: none;" class="anquan_auth" rel="nofollow" key ="55fac474efbfb024124812c8" logo_size="124x47" logo_type="realname" href="http://www.anquan.org" ><script src="//static.anquan.org/static/outer/js/aq_auth.js"></script></a><a id="_pingansec_bottomimagelarge_shiming" href="http://si.trustutn.org/info?sn=785161021024981516566&certType=1"><img src="http://v.trustutn.org/images/cert/bottom_large_img.png"/></a></div><?php }?></div></div>
<?php }} ?>