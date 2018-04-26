<?php /* Smarty version Smarty-3.1.19, created on 2016-07-19 14:33:39 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/ueditor.html" */ ?>
<?php /*%%SmartyHeaderCode:2039622286578dc9c3753f08-66130907%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '8075e7cb29413b167e37980574d26cedb777e4b4' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/ueditor.html', 1 => 1466836944, 2 => 'file', ), ), 'nocache_hash' => '2039622286578dc9c3753f08-66130907', 'function' => array ( ), 'variables' => array ( 'custom_path' => 0, 'ueditor_home' => 0, ), 'has_nocache_code' => false, 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_578dc9c375b292_32469533',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_578dc9c375b292_32469533')) {function content_578dc9c375b292_32469533($_smarty_tpl) {?>
<script> <?php $_smarty_tpl->tpl_vars['custom_path'] = new Smarty_variable('/dep/ueditor/1.4.4/src/', null, 0);?> <?php $_smarty_tpl->tpl_vars['ueditor_home'] = new Smarty_variable($_smarty_tpl->tpl_vars['custom_path']->value, null, 0);?> window.UEDITOR_HOME_URL = '<?php echo $_smarty_tpl->tpl_vars['ueditor_home']->value;?>
'; </script>
<script src="<?php echo $_smarty_tpl->tpl_vars['ueditor_home']->value;?>
third-party/zeroclipboard/ZeroClipboard.js"></script>
<script src="<?php echo $_smarty_tpl->tpl_vars['ueditor_home']->value;?>
ueditor.config.js"></script>
<script src="<?php echo $_smarty_tpl->tpl_vars['ueditor_home']->value;?>
ueditor.all.js"></script><?php }} ?>