<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/student_center/cash.html" */ ?>
<?php /*%%SmartyHeaderCode:688022240577376b7c61c24-35939865%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '279f0db473b42c2ed2aa436362f795f474a8eb66' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/student_center/cash.html', 1 => 1467184870, 2 => 'file', ), 'ca83de8b564fb9d2f8285b8e59fee33d28d35eb0' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/cash.html', 1 => 1466836944, 2 => 'file', ), '891c132d00e63cd70b38e700394d1e93cf82c06b' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/base.html', 1 => 1466835415, 2 => 'file', ), 'dccb2cbef84515bcd9383c8ca6bd9fb24d49d1d0' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/pc/base.html', 1 => 1466835415, 2 => 'file', ), 'a0e398ea6b63d450f545c3275bffc9d2f8c40bb5' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/base.html', 1 => 1466836944, 2 => 'file', ), 'c815b6162871b1d53d528aec99c8fdd7a0423c9b' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/upgrade.html', 1 => 1466835415, 2 => 'file', ), 'd4d7602e284258fcaae1571105bc61c2f45a7ed6' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/rave/round.html', 1 => 1466835415, 2 => 'file', ), '04d19d93342ab6b86293d273a842cf72b8451393' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/rave/ravebanner.html', 1 => 1466835415, 2 => 'file', ), '9a2f6822b3907d9547e932484348dd1da4a1c543' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/flotage.html', 1 => 1466836944, 2 => 'file', ), '5fef91682c607d44a9c4fa991e16826153e3895b' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/siteNav.html', 1 => 1466835415, 2 => 'file', ), 'c94c93a831a9b2dc16f8444296fc25ee633af864' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/common/header.html', 1 => 1466835415, 2 => 'file', ), '99a5a66bbffff038f3456694f65615438887f329' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/common/nav.html', 1 => 1466836944, 2 => 'file', ), '4696ad3fd870d1a2278415ac16bec6179b80f4cd' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/image.html', 1 => 1466835415, 2 => 'file', ), '8c2226c5a07312f9bc58f2287a65ef06666e59c0' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/center/common/sidebar.html', 1 => 1466836944, 2 => 'file', ), 'edeee9bb13a7f2b54367240359256f5b23dea315' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/student_center/common/sidebar.html', 1 => 1466836944, 2 => 'file', ), '6385035fd0ee961413893a9cab8729a702b82424' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/script.html', 1 => 1466836944, 2 => 'file', ), 'de4754b769ea4fde43c96b26f1e42222974e8138' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/footer.html', 1 => 1466836944, 2 => 'file', ), ), 'nocache_hash' => '688022240577376b7c61c24-35939865', 'function' => array ( ), 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_577376b7e4c635_08296734', 'variables' => array ( 'site_config' => 0, 'origin' => 0, 'static_origin' => 0, 'env' => 0, 'root_https' => 0, 'root_http' => 0, 'curr_city' => 0, 'friend_links' => 0, 'need_im' => 0, 'upload_origin' => 0, 'need_mobile_seo' => 0, 'need_location_seo' => 0, 'tpl_data' => 0, 'sku_id' => 0, 'log_data' => 0, 'reportUrl' => 0, 'root' => 0, 'page_class' => 0, 'login_dialog_config' => 0, ), 'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_577376b7e4c635_08296734')) {function content_577376b7e4c635_08296734($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.replace.php';
?>
<!DOCTYPE html><html lang="zh-CN" xmlns:wb="http://open.weibo.com/wb">
<!--[if IE 8 ]><html lang="zh-CN" class="ie8"><![endif]--><!--[if IE 9 ]><html lang="zh-CN" class="ie9"><![endif]-->
<head> <?php $_smarty_tpl->tpl_vars['need_im'] = new Smarty_variable(false, null, 0);?> <?php $_smarty_tpl->tpl_vars['origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['baseUri'],'/'), null, 0);?><?php $_smarty_tpl->tpl_vars['static_origin'] = new Smarty_variable(rtrim($_smarty_tpl->tpl_vars['site_config']->value['staticBaseUri'],'/'), null, 0);?><?php $_smarty_tpl->tpl_vars['origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"https://","http://"), null, 0);?><?php $_smarty_tpl->tpl_vars['origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['origin']->value,"http://","https://"), null, 0);?><?php $_smarty_tpl->tpl_vars['static_origin_http'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"https://","http://"), null, 0);?><?php $_smarty_tpl->tpl_vars['static_origin_https'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['static_origin']->value,"http://","https://"), null, 0);?><?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable($_smarty_tpl->tpl_vars['site_config']->value['env'], null, 0);?><?php if ($_smarty_tpl->tpl_vars['env']->value=="production") {?><?php $_smarty_tpl->tpl_vars['env'] = new Smarty_variable("www", null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['root_http'] = new Smarty_variable((('http://').($_smarty_tpl->tpl_vars['env']->value)).('.genshuixue.com'), null, 0);?><?php $_smarty_tpl->tpl_vars['root_https'] = new Smarty_variable((('https://').($_smarty_tpl->tpl_vars['env']->value)).('.genshuixue.com'), null, 0);?><?php if (substr($_SERVER['SERVER_PROTOCOL'],0,5)==='HTTPS') {?><?php $_smarty_tpl->tpl_vars['root'] = new Smarty_variable($_smarty_tpl->tpl_vars['root_https']->value, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['root'] = new Smarty_variable($_smarty_tpl->tpl_vars['root_http']->value, null, 0);?><?php }?><?php if ((preg_match("/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i",$_SERVER['HTTP_USER_AGENT']))) {?><?php $_smarty_tpl->tpl_vars['is_mobile_platform'] = new Smarty_variable(true, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['is_mobile_platform'] = new Smarty_variable(false, null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['city'] = new Smarty_variable($_smarty_tpl->tpl_vars['curr_city']->value['id'], null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['footerFriendLinks'] = $_smarty_tpl->tpl_vars['friend_links']->value;?><?php $_smarty_tpl->tpl_vars['rave_activity_host'] = new Smarty_variable('http://616.genshuixue.com', null, 0);?><?php $_smarty_tpl->tpl_vars['need_mobile_seo'] = new Smarty_variable(false, null, 0);?><?php $_smarty_tpl->tpl_vars['show_friend_links'] = new Smarty_variable(false, null, 0);?><?php $_smarty_tpl->tpl_vars['login_dialog_config'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('login_dialog_config', null, 0);
$_smarty_tpl->tpl_vars['login_dialog_config']->value['student_only'] = false;?><?php $_smarty_tpl->createLocalArrayVariable('login_dialog_config', null, 0);
$_smarty_tpl->tpl_vars['login_dialog_config']->value['teacher_only'] = false;?><?php if (!isset($_smarty_tpl->tpl_vars['need_im']->value)) {?><?php $_smarty_tpl->tpl_vars['need_im'] = new Smarty_variable(true, null, 0);?><?php }?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['needIm'] = $_smarty_tpl->tpl_vars['need_im']->value;?><?php $_smarty_tpl->tpl_vars['upload_origin'] = new Smarty_variable(rtrim((($tmp = @$_smarty_tpl->tpl_vars['site_config']->value['uploadBaseUri'])===null||$tmp==='' ? $_smarty_tpl->tpl_vars['site_config']->value['baseUri'] : $tmp),'/'), null, 0);?><?php $_smarty_tpl->tpl_vars['upload_origin'] = new Smarty_variable(($_smarty_tpl->tpl_vars['upload_origin']->value).('/user/previewImage'), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['upload_origin'] = $_smarty_tpl->tpl_vars['upload_origin']->value;?><?php $_smarty_tpl->tpl_vars['flotage_config'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('flotage_config', null, 0);
$_smarty_tpl->tpl_vars['flotage_config']->value['hidden'] = 0;?><?php $_smarty_tpl->createLocalArrayVariable('flotage_config', null, 0);
$_smarty_tpl->tpl_vars['flotage_config']->value['hideChatToKF'] = false;?><?php $_smarty_tpl->tpl_vars['rave_config'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('rave_config', null, 0);
$_smarty_tpl->tpl_vars['rave_config']->value['hidden'] = 1;?><?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['cityDomain'] = $_smarty_tpl->tpl_vars['curr_city']->value['domain'];?> <?php $_smarty_tpl->tpl_vars['amd_more'] = new Smarty_variable(array('common/main/component/overview'), null, 0);?> <?php if ($_smarty_tpl->tpl_vars['user_data']->value['user_type']==0) {?> <?php $_smarty_tpl->tpl_vars['identity'] = new Smarty_variable("teacher", null, 0);?> <?php } else { ?> <?php $_smarty_tpl->tpl_vars['identity'] = new Smarty_variable("student", null, 0);?> <?php }?> <?php $_smarty_tpl->tpl_vars['page_class'] = new Smarty_variable(($_smarty_tpl->tpl_vars['identity']->value).('-center'), null, 0);?> <?php $_smarty_tpl->tpl_vars['bind_page'] = new Smarty_variable("/student_center/bindCard", null, 0);?> <?php $_smarty_tpl->tpl_vars['withdraw_page'] = new Smarty_variable("/student_center/withdraw", null, 0);?> <?php $_smarty_tpl->tpl_vars['balance_text'] = new Smarty_variable("可支付余额", null, 0);?> <?php $_smarty_tpl->tpl_vars['history_text'] = new Smarty_variable("交易记录", null, 0);?> <?php $_smarty_tpl->createLocalArrayVariable('flotage_config', null, 0);
$_smarty_tpl->tpl_vars['flotage_config']->value['hidden'] = 1;?> <?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['bank_card']['id'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['bank_card']['id']) {?> <?php $_smarty_tpl->tpl_vars['card_id'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value['bank_card']['id'], null, 0);?> <?php } else { ?> <?php $_smarty_tpl->tpl_vars['card_id'] = new Smarty_variable('', null, 0);?> <?php }?> <?php $_smarty_tpl->tpl_vars['script_path'] = new Smarty_variable("common/center/cash", null, 0);?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['bindPage'] = $_smarty_tpl->tpl_vars['bind_page']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['withdrawPage'] = $_smarty_tpl->tpl_vars['withdraw_page']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['rechargePage'] = '/pay/recharge';?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['bankCardId'] = $_smarty_tpl->tpl_vars['card_id']->value;?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['balance'] = $_smarty_tpl->tpl_vars['tpl_data']->value['account']['balance'];?> <?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['settlement'])) {?> <?php $_smarty_tpl->createLocalArrayVariable('script_data', null, 0);
$_smarty_tpl->tpl_vars['script_data']->value['settlement'] = $_smarty_tpl->tpl_vars['tpl_data']->value['settlement'];?> <?php }?> <meta charset="utf-8" /><link rel="dns-prefetch" href="http://cdn.bootcss.com" /><link rel="dns-prefetch" href="http://apps.bdimg.com" /><link rel="dns-prefetch" href="http://su.bdimg.com" /><link rel="dns-prefetch" href="http://s1.bdstatic.com" /><link rel="dns-prefetch" href="http://api.map.baidu.com" /><link rel="dns-prefetch" href="http://storage.genshuixue.com" /><?php if ($_smarty_tpl->tpl_vars['need_im']->value) {?><link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
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
钱包管理 -
跟谁学</title><?php $_smarty_tpl->tpl_vars['sku_id'] = new Smarty_variable('', null, 0);?><meta name="gsx_sku" content="<?php echo $_smarty_tpl->tpl_vars['sku_id']->value;?>
"><script src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/dep/web-analysis/0.0.5/wat.js"></script><script>(function (global) {var GSX_CONFIG = null;global['GSX_INIT'] = function (config) {global['GSX_INIT'] = null;GSX_CONFIG = config;var cb;while (cb = cbs.shift()) {cb(GSX_CONFIG);}};var cbs = [];global['gsx_ready'] = function (callback) {if (GSX_CONFIG) {callback(GSX_CONFIG);} else if ('function' == typeof callback) {cbs.push(callback);}};})(window);window.gsx_ready(function(config){var WAT = window.WAT;if (WAT) {var page_type = "<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page'];?>
<?php }?>";var page_str = "<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page_type'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page_type'];?>
<?php }?>";WAT.pgv({"user_number": config.user ? config.user.number : '',"guid": config.log[0],"params": {"page_type": page_type,"page_str": page_str,"user_role": config.user ? config.user.type : '',"session_id": config.log[1]}});WAT.initClick({"type": "pc","hot": !!config.hot_click,"service": page_type});WAT.watchClick();WAT.timing();}});(function (global) {var GA_ANALYTICS = null;var gaObjArr = [];global['GA_INIT'] = function (googleAnalytics) {global['GA_INIT'] = null;GA_ANALYTICS = googleAnalytics;var gaObj;while (gaObj = gaObjArr.shift()) {gaObj(GA_ANALYTICS);}};global['ga_ready'] = function (callback) {if('function' == typeof callback){if (GA_ANALYTICS) {callback(GA_ANALYTICS);} else{gaObjArr.push(callback);}}};global['ga_send'] = function(){var args = [];for(var i = 0, n = arguments.length; i < n; i++){args.push(arguments[i]);}global['ga_ready'](function(googleAnalytics){googleAnalytics.apply(null, args);});};})(window);</script><?php if (isset($_smarty_tpl->tpl_vars['site_config']->value['mainUri'])) {?><?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(($_smarty_tpl->tpl_vars['site_config']->value['mainUri']).("static/report"), null, 0);?><?php if ($_smarty_tpl->tpl_vars['site_config']->value['protocol']=="https") {?><?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(smarty_modifier_replace($_smarty_tpl->tpl_vars['reportUrl']->value,"http://","https://"), null, 0);?><?php }?><?php } else { ?><?php $_smarty_tpl->tpl_vars['reportUrl'] = new Smarty_variable(($_smarty_tpl->tpl_vars['root']->value).("/static/report"), null, 0);?><?php }?><script>window.gsx_ready(function (config) {var logUrl = WAT.toUrl('pb0.genshuixue.com', '/sku.gif');WAT.send(logUrl, {'terminal': 'pc','page_type': '<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page'];?>
<?php }?>','referrer': document.referrer,'user_number': config.user ? config.user.number : '','user_role': config.user ? config.user.type : '','guid': config.log[0],'city_id': config.city.id,'sku_id': '<?php echo $_smarty_tpl->tpl_vars['sku_id']->value;?>
'});});</script><script>var leaveMessPageType = "<?php if (isset($_smarty_tpl->tpl_vars['log_data']->value['page'])) {?><?php echo $_smarty_tpl->tpl_vars['log_data']->value['page'];?>
<?php }?>";var referer = document.referrer;var src = '<?php echo $_smarty_tpl->tpl_vars['reportUrl']->value;?>
'+'?referer='+referer;var script = document.createElement('script');script.src = src;script.type = 'text/javascript';script.charset = 'utf-8';document.getElementsByTagName('head')[0].appendChild(script);</script>
<meta name="renderer" content="webkit|ie-stand|ie-comp" /><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /><meta http-equiv="Cache-Control" content="no-transform" /><meta http-equiv="Cache-Control" content="no-siteapp" /><meta property="qc:admins" content="3464026660675630510556375" /><meta property="wb:webmaster" content="4658769fd343afda" /><meta name="applicable-device" content="pc" />
<link rel="shortcut icon" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/logo.ico" />
<link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/css/common/center/cash.less">
</head><?php if (isset($_smarty_tpl->tpl_vars['page_class']->value)) {?><body class="<?php echo $_smarty_tpl->tpl_vars['page_class']->value;?>
"><?php } else { ?><body><?php }?>
<?php /* Call merged included template "common/upgrade.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/upgrade.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e8299695_23350047($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/upgrade.html" */?><?php if (!$_smarty_tpl->tpl_vars['rave_config']->value['hidden']) {?><?php /* Call merged included template "rave/ravebanner.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("rave/ravebanner.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e829c347_46303403($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "rave/ravebanner.html" */?><?php }?><?php if (!$_smarty_tpl->tpl_vars['flotage_config']->value['hidden']) {?><?php /* Call merged included template "common/component/flotage.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/component/flotage.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e82a3435_86980237($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/component/flotage.html" */?><?php }?> <?php /* Call merged included template "common/siteNav.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/siteNav.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e82a7496_07303495($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/siteNav.html" */?> <?php /* Call merged included template "common/center/common/header.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/center/common/header.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e82a8be3_51797768($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/center/common/header.html" */?> <?php /* Call merged included template "common/center/common/nav.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/center/common/nav.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e82ac2b8_76591283($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/center/common/nav.html" */?> <div id="main"> <?php /* Call merged included template "student_center/common/sidebar.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("student_center/common/sidebar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('active'=>"cash"), 0, '688022240577376b7c61c24-35939865');
content_577376e82c83c6_89243097($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "student_center/common/sidebar.html" */?><div id="content" class="card"><div class="card-header"><h2>余额</h2><a href="/guide/student_layout?a=student&op=compensation" class="fund"><span class="question">资金常见问题</span><i class="text-error icon-question-circle"></i></a> </div> <div class="card-body"> <div class="balance"> <h3><?php echo $_smarty_tpl->tpl_vars['balance_text']->value;?>
</h3> <strong class="money"> ￥<?php echo number_format($_smarty_tpl->tpl_vars['tpl_data']->value['account']['balance'],2);?> </strong> <div class="action"> <b id="btn-withdraw" class="btn btn-primary"> 提现 </b> <?php if ($_smarty_tpl->tpl_vars['identity']->value==='student') {?> <b id="btn-recharge" class="btn btn-info"> 充值 </b> <?php }?> </div> </div> <?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['account']['total_prize'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['account']['total_prize']>0) {?>
<div class="prize"> 返现活动可用奖学金： <strong>￥<?php echo number_format($_smarty_tpl->tpl_vars['tpl_data']->value['account']['total_prize'],2);?>
</strong> <div class="rules"> <span class="trigger">使用规则 <div class="tip"> <?php if (!empty($_smarty_tpl->tpl_vars['tpl_data']->value['rule'])) {?> <ol> <?php $_smarty_tpl->tpl_vars['rule'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['rule']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['rule']['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['rule']->key => $_smarty_tpl->tpl_vars['rule']->value) {
$_smarty_tpl->tpl_vars['rule']->_loop = true;
?> <li><?php echo $_smarty_tpl->tpl_vars['rule']->value;?>
</li> <?php } ?> </ol> <p>如有疑问，请拨打咨询热线4000-910-910，010-60642910</p> <p>* 奖学金使用规则解释权归跟谁学所有</p> <?php }?> </div> </span> </div>
</div>
<?php }?> </div> <div class="card-header history-header"> <?php echo $_smarty_tpl->tpl_vars['history_text']->value;?> <span class="tip"> <b class="text-success">绿色</b>为余额增加， <b class="text-error">红色</b>为余额减少 </span> </div> <div class="card-body" id="cash-history"> </div> </div> </div> <?php /* Call merged included template "common/script.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/script.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e8383c65_24901449($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/script.html" */?> <?php /* Call merged included template "common/footer.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/footer.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e83a9f25_48912627($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/footer.html" */?> <?php if ($_smarty_tpl->tpl_vars['env']->value=='test'||$_smarty_tpl->tpl_vars['env']->value=='beta') {?><?php echo $_smarty_tpl->getSubTemplate ("common/component/checkImageSize.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<?php }?><?php if ($_smarty_tpl->tpl_vars['env']->value=='www') {?><?php }?><?php echo $_smarty_tpl->getSubTemplate ("common/component/loginDialog.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('onlyShowStudent'=>$_smarty_tpl->tpl_vars['login_dialog_config']->value['student_only'],'onlyShowTeacher'=>$_smarty_tpl->tpl_vars['login_dialog_config']->value['teacher_only']), 0);?>
<?php echo $_smarty_tpl->getSubTemplate ("common/center/component/enterClassroom.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<?php if ($_smarty_tpl->tpl_vars['env']->value=='www'||(isset($_GET['debug'])&&$_GET['debug']=='genshuixue')) {?><script src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/common/googleAnalytics.js"></script><?php }?></body></html><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/upgrade.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e8299695_23350047')) {function content_577376e8299695_23350047($_smarty_tpl) {?> <!--[if lt IE 8]><div class="browser-upgrade"><div class="wrapper">您的浏览器版本过低，为了保证更好的安全性和浏览体验，建议更换高级浏览器，如：<a href="http://www.baidu.com/s?wd=谷歌浏览器">谷歌浏览器</a><a href="http://www.baidu.com/s?wd=火狐浏览器">火狐浏览器</a><a href="http://www.baidu.com/s?wd=360极速浏览器">360 极速浏览器</a></div></div><style>body {padding-top: 40px;}.browser-upgrade {background-color: #DA7575;border-bottom: 1px solid #D65F39;color: #F0F0F0;padding: 10px 0;position: absolute;top: 0;left: 0;width: 100%;z-index: 10000;}.browser-upgrade .wrapper {width: 1100px;margin: 0 auto;}.browser-upgrade a {color: yellow;margin-right: 10px;text-decoration: underline;}</style><![endif]--><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/rave/ravebanner.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e829c347_46303403')) {function content_577376e829c347_46303403($_smarty_tpl) {?><div id="ravebanner" class="hiderave" data-href="<?php echo $_smarty_tpl->tpl_vars['rave_activity_host']->value;?>
" style="display:none"><span class="icon icon-close"></span><img src="http://img.gsxservice.com/0cms/d/file/content/2015/06/556fc87248270.jpg" class="banner-img" width="1100px"/><div class="main-wrapper"><a href="#excellent-course-wrapper" class="anchor excellent_course"></a><a href="#org-rave-wrapper" class="anchor get_coupon"></a><a href="#crazy-discount-wrapper" class="anchor crazy_discount"></a><a href="#sec-kill-wrapper" class="anchor sec_kill"></a><div class="rave" id="crazy-discount-wrapper"><?php /* Call merged included template "rave/round.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("rave/round.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '688022240577376b7c61c24-35939865');
content_577376e829e1f1_53501536($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "rave/round.html" */?></div></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/rave/round.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e829e1f1_53501536')) {function content_577376e829e1f1_53501536($_smarty_tpl) {?><div class="round-wrapper" id="raveRound"><div class="round-list"><div class="round-prev"><span class="icon icon-chevron-left"></span></div><div class="round-item first disabled" data-index="0" data-key="dxzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_graduate.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">大学专场</div></div><div class="round-mask"></div></div><div class="round-item second disabled" data-index="1" data-key="xcgzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_t9.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">小学中学</div></div><div class="round-mask"></div></div><div class="round-item third" data-index="2" data-key="bpsjb"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_main.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">爆品暑假班</div></div><div class="round-mask"></div></div><div class="round-item four disabled" data-index="3" data-key="lxzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_overseas.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">出国留学</div></div><div class="round-mask"></div></div><div class="round-item five disabled" data-index="4" data-key="ysxqzc"><div class="round-bg"><img src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src/img/rave/round_art.png" width="100%" height="100%"/></div><div class="round-content"><div class="round-title">艺体兴趣</div></div><div class="round-mask"></div></div><div class="round-next"><span class="icon icon-chevron-right"></span></div></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/flotage.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e82a3435_86980237')) {function content_577376e82a3435_86980237($_smarty_tpl) {?>
<div id="flotage-help"><div class="flotage-help-icon"></div><div class="flotage-buttons"><div class="flotage-btn findteacher">15分钟找老师</div><div class="flotage-btn comeon-im">在线咨询</div><div class="flotage-btn comeon-im">一对一辅导</div></div></div><div id="flotage-middle"<?php if (isset($_COOKIE['CLOSE_FLOTAGE_APP'])) {?> style="display:none"<?php }?>><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/static/app"><div class="flotage-app"></div></a></div><div id="flotage-bottom"><div class="wrapper"><ul><li id="mobile-down"><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/static/app"><i class="icon icon-mobile"></i></a><a class="tip" rel="nofollow" href="http://www.genshuixue.com/static/app">手机下载</a></li><li><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/guide/feedback?a=feedback"><i class="icon icon-edit-underline"></i></a><a class="tip" rel="nofollow" href="http://www.genshuixue.com/guide/feedback?a=feedback">意见反馈</a></li><li><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/static/windows"><i class="icon icon-customer small"></i></a><a id="flotage-top" class="tip" rel="nofollow" href="javascript:void(0)">联系客服</a></li><li><a class="tip-icon" rel="nofollow" href="http://www.genshuixue.com/static/student"><i class="icon icon-question small"></i></a><a class="tip" rel="nofollow" href="http://www.genshuixue.com/static/student">平台流程</a></li><li class="backup"><a class="tip-icon" rel="nofollow" href="javascript:void(0)"><i class="icon icon-up"></i></a><a class="tip" rel="nofollow" href="javascript:void(0)">回到顶部</a></li></ul></div></div><div id="anonymous-im"><div class="comeon-im"><i class="icon icon-chat"></i>在线咨询</div></div><div class="subsurface" style="display:none"><div class="mode"></div><div class="wrapper"><div class="hellohere"></div><div class="right-wrapper"><span class="goal">您好，告诉我您想学什么，15分钟为您匹配优质老师哦</span><span class="buttons"><span class="btn btn-primary comeon-im">马上咨询</span><span class="btn btn-info btn-seek">留言等待回呼</span></span><div class="close"></div></div></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/siteNav.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e82a7496_07303495')) {function content_577376e82a7496_07303495($_smarty_tpl) {?>
<div id="site-nav"><div class="wrapper"></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/center/common/header.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e82a8be3_51797768')) {function content_577376e82a8be3_51797768($_smarty_tpl) {?> <div id="header"><div class="wrapper"><a class="logo" href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
"></a><h1><?php if ($_smarty_tpl->tpl_vars['identity']->value=='teacher') {?><a href="<?php echo $_smarty_tpl->tpl_vars['origin_http']->value;?>
/teacher_center/index">老师个人中心</a><?php } else { ?>学生个人中心<?php }?></h1><!--div class="teacher-qr-container"><div><img style="width: 80px;" src="http://cdn.gsxservice.com/asset/img/app/pc/teacher-qr.png" /></div><div><div class="teacher-app-title">老师版APP</div><div>随时接收学生留言</div><div>随时查看主页浏览量</div></div></div--></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/center/common/nav.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e82ac2b8_76591283')) {function content_577376e82ac2b8_76591283($_smarty_tpl) {?>
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
_center/message">消息</a><?php }?></div></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/student_center/common/sidebar.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e82c83c6_89243097')) {function content_577376e82c83c6_89243097($_smarty_tpl) {?> <?php $_smarty_tpl->tpl_vars['schedule'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('schedule', null, 0);
$_smarty_tpl->tpl_vars['schedule']->value['name'] = '我的课表';?>
<?php $_smarty_tpl->createLocalArrayVariable('schedule', null, 0);
$_smarty_tpl->tpl_vars['schedule']->value['url'] = '/lesson/studentLessons';?>
<?php $_smarty_tpl->createLocalArrayVariable('schedule', null, 0);
$_smarty_tpl->tpl_vars['schedule']->value['icon'] = 'icon-file-o';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='schedule') {?> <?php $_smarty_tpl->createLocalArrayVariable('schedule', null, 0);
$_smarty_tpl->tpl_vars['schedule']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['playback'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('playback', null, 0);
$_smarty_tpl->tpl_vars['playback']->value['name'] = '我的课程回放';?>
<?php $_smarty_tpl->createLocalArrayVariable('playback', null, 0);
$_smarty_tpl->tpl_vars['playback']->value['url'] = '/lesson/lessonsPlayback';?>
<?php $_smarty_tpl->createLocalArrayVariable('playback', null, 0);
$_smarty_tpl->tpl_vars['playback']->value['icon'] = 'icon-play-oo';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='playback') {?> <?php $_smarty_tpl->createLocalArrayVariable('playback', null, 0);
$_smarty_tpl->tpl_vars['playback']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['teacher'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('teacher', null, 0);
$_smarty_tpl->tpl_vars['teacher']->value['name'] = '我的老师';?>
<?php $_smarty_tpl->createLocalArrayVariable('teacher', null, 0);
$_smarty_tpl->tpl_vars['teacher']->value['url'] = '/student_center/teacher';?>
<?php $_smarty_tpl->createLocalArrayVariable('teacher', null, 0);
$_smarty_tpl->tpl_vars['teacher']->value['icon'] = 'icon-student';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='teacher') {?> <?php $_smarty_tpl->createLocalArrayVariable('teacher', null, 0);
$_smarty_tpl->tpl_vars['teacher']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['order'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('order', null, 0);
$_smarty_tpl->tpl_vars['order']->value['name'] = '我的订单';?>
<?php $_smarty_tpl->createLocalArrayVariable('order', null, 0);
$_smarty_tpl->tpl_vars['order']->value['icon'] = 'icon-list-o';?>
<?php $_smarty_tpl->createLocalArrayVariable('order', null, 0);
$_smarty_tpl->tpl_vars['order']->value['url'] = '/order/studentOrders';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='order') {?> <?php $_smarty_tpl->createLocalArrayVariable('order', null, 0);
$_smarty_tpl->tpl_vars['order']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['videoLessons'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('videoLessons', null, 0);
$_smarty_tpl->tpl_vars['videoLessons']->value['name'] = '我的视频课';?>
<?php $_smarty_tpl->createLocalArrayVariable('videoLessons', null, 0);
$_smarty_tpl->tpl_vars['videoLessons']->value['icon'] = 'icon-camera-o';?>
<?php $_smarty_tpl->createLocalArrayVariable('videoLessons', null, 0);
$_smarty_tpl->tpl_vars['videoLessons']->value['url'] = '/student_center/videoLessons';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='videoLessons') {?> <?php $_smarty_tpl->createLocalArrayVariable('videoLessons', null, 0);
$_smarty_tpl->tpl_vars['videoLessons']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->createLocalArrayVariable('finances', null, 0);
$_smarty_tpl->tpl_vars['finances']->value['name'] = '钱包管理';?>
<?php $_smarty_tpl->createLocalArrayVariable('finances', null, 0);
$_smarty_tpl->tpl_vars['finances']->value['url'] = '/wallet/index';?>
<?php $_smarty_tpl->createLocalArrayVariable('finances', null, 0);
$_smarty_tpl->tpl_vars['finances']->value['icon'] = 'icon-money-o';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='cash'||$_smarty_tpl->tpl_vars['active']->value==='coupon'||$_smarty_tpl->tpl_vars['active']->value==='myBankCard') {?> <?php $_smarty_tpl->createLocalArrayVariable('finances', null, 0);
$_smarty_tpl->tpl_vars['finances']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['credit'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('credit', null, 0);
$_smarty_tpl->tpl_vars['credit']->value['name'] = '我的评价';?>
<?php $_smarty_tpl->createLocalArrayVariable('credit', null, 0);
$_smarty_tpl->tpl_vars['credit']->value['url'] = '/student_center/commentFromTeacher?page=1&page_size=10';?>
<?php $_smarty_tpl->createLocalArrayVariable('credit', null, 0);
$_smarty_tpl->tpl_vars['credit']->value['icon'] = 'icon-star-o';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='credit') {?> <?php $_smarty_tpl->createLocalArrayVariable('credit', null, 0);
$_smarty_tpl->tpl_vars['credit']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['favourite'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['name'] = '我的收藏';?>
<?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['url'] = '/collection/list/course';?>
<?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['icon'] = 'icon-heart-o';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='favourite') {?> <?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['active'] = true;?>
<?php }?> <?php $_smarty_tpl->tpl_vars['courseFav'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('courseFav', null, 0);
$_smarty_tpl->tpl_vars['courseFav']->value['name'] = '课程收藏';?>
<?php $_smarty_tpl->createLocalArrayVariable('courseFav', null, 0);
$_smarty_tpl->tpl_vars['courseFav']->value['url'] = '/collection/list/course';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='courseFav') {?> <?php $_smarty_tpl->createLocalArrayVariable('courseFav', null, 0);
$_smarty_tpl->tpl_vars['courseFav']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['children'][] = $_smarty_tpl->tpl_vars['courseFav']->value;?> <?php $_smarty_tpl->tpl_vars['teacherFav'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('teacherFav', null, 0);
$_smarty_tpl->tpl_vars['teacherFav']->value['name'] = '老师收藏';?>
<?php $_smarty_tpl->createLocalArrayVariable('teacherFav', null, 0);
$_smarty_tpl->tpl_vars['teacherFav']->value['url'] = '/student_center/favourite';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='teacherFav') {?> <?php $_smarty_tpl->createLocalArrayVariable('teacherFav', null, 0);
$_smarty_tpl->tpl_vars['teacherFav']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['children'][] = $_smarty_tpl->tpl_vars['teacherFav']->value;?> <?php $_smarty_tpl->tpl_vars['orgFav'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('orgFav', null, 0);
$_smarty_tpl->tpl_vars['orgFav']->value['name'] = '机构收藏';?>
<?php $_smarty_tpl->createLocalArrayVariable('orgFav', null, 0);
$_smarty_tpl->tpl_vars['orgFav']->value['url'] = '/collection/list/org';?>
<?php if ($_smarty_tpl->tpl_vars['active']->value==='orgFav') {?> <?php $_smarty_tpl->createLocalArrayVariable('orgFav', null, 0);
$_smarty_tpl->tpl_vars['orgFav']->value['active'] = true;?>
<?php }?>
<?php $_smarty_tpl->createLocalArrayVariable('favourite', null, 0);
$_smarty_tpl->tpl_vars['favourite']->value['children'][] = $_smarty_tpl->tpl_vars['orgFav']->value;?> <?php $_smarty_tpl->tpl_vars['menu'] = new Smarty_variable(array(), null, 0);?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['schedule']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['playback']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['teacher']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['order']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['videoLessons']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['finances']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['credit']->value;?>
<?php $_smarty_tpl->createLocalArrayVariable('menu', null, 0);
$_smarty_tpl->tpl_vars['menu']->value[] = $_smarty_tpl->tpl_vars['favourite']->value;?> <?php /* Call merged included template "common/center/common/sidebar.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/center/common/sidebar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('menu'=>$_smarty_tpl->tpl_vars['menu']->value), 0, '688022240577376b7c61c24-35939865');
content_577376e8304257_43023878($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); /* End of included template "common/center/common/sidebar.html" */?>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/center/common/sidebar.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e8304257_43023878')) {function content_577376e8304257_43023878($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_cn_truncate')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.cn_truncate.php';
?> <?php if (!isset($_smarty_tpl->tpl_vars['nav_active_tab']->value)) {?><?php $_smarty_tpl->tpl_vars['nav_active_tab'] = new Smarty_variable('', null, 0);?><?php }?><div id="sidebar" class="card <?php if ($_smarty_tpl->tpl_vars['identity']->value!=='teacher') {?> student-sidebar <?php } else { ?> teacher-sidebar<?php }?>"><?php if ($_smarty_tpl->tpl_vars['identity']->value!=='teacher') {?><div class="user-info<?php if ($_smarty_tpl->tpl_vars['nav_active_tab']->value=='index') {?> active<?php }?>"><?php /* Call merged included template "common/component/image.html" */
$_tpl_stack[] = $_smarty_tpl; $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("common/component/image.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('url'=>$_smarty_tpl->tpl_vars['user_data']->value['avatar'],'width'=>58,'class'=>"thumbnail small"), 0, '688022240577376b7c61c24-35939865');
content_577376e830a220_38512945($_smarty_tpl);
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
<?php if ($_smarty_tpl->tpl_vars['sub_item']->value['name']==='主页装修') {?><strong class="text-error tiny" style="font-weight: bold;">&nbsp;NEW</strong><?php }?></a></li><?php } ?></ul><?php }?></div><?php } ?></div><?php if ($_smarty_tpl->tpl_vars['identity']->value==='teacher'&&count($_smarty_tpl->tpl_vars['ext_data']->value['teacher_center_notify'])>0) {?><div class="notify"><?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['ext_data']->value['teacher_center_notify']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><a href="<?php echo $_smarty_tpl->tpl_vars['item']->value['link'];?>
" target="_blank"><i></i><?php $_smarty_tpl->tpl_vars['title'] = new Smarty_variable(smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['item']->value['title'],11), null, 0);?><span<?php if ($_smarty_tpl->tpl_vars['title']->value!=$_smarty_tpl->tpl_vars['item']->value['title']) {?> data-title="<?php echo $_smarty_tpl->tpl_vars['item']->value['title'];?>
"<?php }?>><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</span></a><?php } ?></div><?php }?></div><?php }} ?>
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/image.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e830a220_38512945')) {function content_577376e830a220_38512945($_smarty_tpl) {?>
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
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/script.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e8383c65_24901449')) {function content_577376e8383c65_24901449($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_replace')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.replace.php';
?> <script src="<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/dep/base/0.0.12/src/base.js"></script><script>require.config({baseUrl: '<?php echo $_smarty_tpl->tpl_vars['static_origin']->value;?>
/src',packages: [{name: 'cobble',location: '../dep/cobble/0.3.28/src',main: 'main'},{name: 'webIM',location: '../dep/webIM/0.0.1/src',main: 'sdk'},{name: 'moment',location: '../dep/moment/2.7.0/src',main: 'moment'},{name: 'imageCrop',location: '../dep/image-crop/0.0.2/src',main: 'imageCrop'},{name: 'underscore',location: '../dep/underscore/1.6.0/src',main: 'underscore'},{name: 'audioPlayer',location: '../dep/audioPlayer/0.0.1/src',main: 'audioPlayer'},{name: 'TextClipboard',location: '../dep/TextClipboard/0.0.3/src',main: 'TextClipboard'},{name: 'echarts',location: '../dep/echarts/2.1.10/src',main: 'echarts'},{name: 'cc',location: '../dep/cc/1.1.0/src',main: 'main'},{name: 'custom',location: '../dep/cc/1.1.0/custom'},{name: 'moment',location: '../dep/moment/2.7.0/src',main: 'moment'},{name: 'SwfStore',location: '../dep/SwfStore/0.0.1/src',main: 'SwfStore'}],urlArgs: {'hermes/dispatcher': '{edp-variable:{version}}'}});<?php $_smarty_tpl->tpl_vars['amd_modules'] = new Smarty_variable(array('common/store','common/service','common/eventEmitter','common/combine/site'), null, 0);?><?php if (isset($_smarty_tpl->tpl_vars['amd_more']->value)) {?><?php if (is_array($_smarty_tpl->tpl_vars['amd_more']->value)) {?><?php $_smarty_tpl->tpl_vars['path'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['path']->_loop = false; $_from = $_smarty_tpl->tpl_vars['amd_more']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
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
<?php /* Smarty version Smarty-3.1.19, created on 2016-06-29 15:21:12 compiled from "/Users/bjhl/workspace/web-fe/view/common/footer.html" */ ?>
<?php if ($_valid && !is_callable('content_577376e83a9f25_48912627')) {function content_577376e83a9f25_48912627($_smarty_tpl) {?> <div id="footer"><div class="wrapper"><div class="favor-links"><div class="tel"><i class="icon icon-phone"></i><h4>4000-910-910</h4><h4>010-60642910</h4><span>周一至周日&nbsp;9:00-23:00</span></div><div class="list"><h4>关注我们</h4><ul><li><span class="show-wechat">官方微信</span></li><li class="weibo"><a rel="nofollow" href="http://weibo.com/genshuixue" target="_blank">新浪微博</a></li></ul></div><div class="list"><h4>关于跟谁学</h4><ul><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/about?a=about" target="_blank">了解我们</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/business?a=business" target="_blank">联系我们</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/recruit" target="_blank">校园招聘</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/join?a=join" target="_blank">加入我们</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/clause?a=clause" target="_blank">网站条款</a></li></ul></div><div class="list"><h4>服务支持</h4><ul><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/guarantee?a=guarantee" target="_blank">消费保障</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/video?a=video" target="_blank">视频拍摄</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/pay?a=pay" target="_blank">支付问题</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/feedback?a=feedback" target="_blank">意见反馈</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/tort?a=tort" target="_blank">侵权投诉</a></li></ul></div><div class="list"><h4>帮助中心</h4><ul><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/process?a=process" target="_blank">平台流程</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/entering?a=entering" target="_blank">老师入驻</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/teacher?a=teacher" target="_blank">老师帮助</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/student?a=student" target="_blank">学生帮助</a></li><li><a rel="nofollow" href="<?php echo $_smarty_tpl->tpl_vars['root_http']->value;?>
/guide/org?a=org" target="_blank">机构帮助</a></li></ul></div></div><div class="site-map"><ul><li><a href="http://www.genshuixue.com/guide/clause?a=clause" target="_blank">网站条款</a></li><li><a href="http://www.genshuixue.com/guide/notice?a=notice" target="_blank">活动公告</a></li><li><a href="http://www.genshuixue.com/guide/news?a=news" target="_blank">新闻报道</a></li><li><a href="http://www.genshuixue.com/static/links#8" target="_blank">申请合作</a></li><li><!--首页、搜索结果页--><?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['site_map'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['site_map']) {?><a href="/static/seoWebMap" target="_blank">网站地图</a><?php } else { ?><a href="http://www.genshuixue.com/static/seoWebMap" target="_blank">网站地图</a><?php }?></li><li><a href="http://www.genshuixue.com/st/-975_1061_1066.html" target="_blank">油画培训</a></li><li><a href="http://www.genshuixue.com/bj/st--975_1061.html" target="_blank">绘画培训</a></li><li><a href="http://www.genshuixue.com/sh/st--975_1031_1034.html" target="_blank">拉丁舞培训</a></li><li><a href="http://www.genshuixue.com/i-ielts/a/4" target="_blank">雅思机经</a></li><li><a href=" http://www.genshuixue.com/so/-573_600_603.html" target="_blank">Java培训</a></li></ul></div><?php if (isset($_smarty_tpl->tpl_vars['show_friend_links']->value)&&$_smarty_tpl->tpl_vars['show_friend_links']->value) {?><div class="friend-links"><ul><li class="friend-links-label"><strong>合作伙伴：</strong></li><?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['friendLinks'])) {?><?php $_smarty_tpl->tpl_vars['fl'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['fl']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['friendLinks']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['fl']->key => $_smarty_tpl->tpl_vars['fl']->value) {
$_smarty_tpl->tpl_vars['fl']->_loop = true;
?><?php if (!$_smarty_tpl->tpl_vars['fl']->value['jsload']) {?><li><a href="<?php echo $_smarty_tpl->tpl_vars['fl']->value['link'];?>
" target="_blank"<?php if ($_smarty_tpl->tpl_vars['fl']->value['nofollow']) {?> rel="nofollow"<?php }?>><?php echo $_smarty_tpl->tpl_vars['fl']->value['title'];?>
</a></li><?php }?><?php } ?><?php }?><li class="friend-links-last"><a href="<?php echo $_smarty_tpl->tpl_vars['root']->value;?>
/static/links" target="_blank" class="more">更多</a></li></ul></div><?php }?><div class="copyright">Copyright © 2014 - 2016 北京百家互联科技有限公司版权所有. 京公网安备11010802015210号 | 京ICP备14027590号-1</div><?php if ($_smarty_tpl->tpl_vars['env']->value==='www') {?><div class="cert"><a style="display: none;" class="anquan_auth" rel="nofollow" key ="55fac474efbfb024124812c8" logo_size="124x47" logo_type="realname" href="http://www.anquan.org" ><script src="//static.anquan.org/static/outer/js/aq_auth.js"></script></a></div><?php }?></div></div>
<?php }} ?>