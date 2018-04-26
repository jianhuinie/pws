<?php /* Smarty version Smarty-3.1.19, created on 2016-07-01 10:40:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/progress.html" */ ?>
<?php /*%%SmartyHeaderCode:21043168525775d8266d61d6-90079449%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( 'ff2bbec703c69259681f8c64ff9bbddef392ed44' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/progress.html', 1 => 1466835415, 2 => 'file', ), ), 'nocache_hash' => '21043168525775d8266d61d6-90079449', 'function' => array ( ), 'variables' => array ( 'rate' => 0, ), 'has_nocache_code' => false, 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_5775d8266d9b52_29349463',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5775d8266d9b52_29349463')) {function content_5775d8266d9b52_29349463($_smarty_tpl) {?>
<div class="progress primary"><div class="meter" style="width: <?php echo $_smarty_tpl->tpl_vars['rate']->value*100;?>
%"></div></div><span style="margin-left: 3px"> <?php echo $_smarty_tpl->tpl_vars['rate']->value*100;?>
% </span>
<?php }} ?>