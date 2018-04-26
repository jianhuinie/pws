<?php /* Smarty version Smarty-3.1.19, created on 2016-07-01 10:40:38 compiled from "/Users/bjhl/workspace/web-fe/view/common/ui/dropdown.html" */ ?>
<?php /*%%SmartyHeaderCode:20201707085775d82673e010-48937046%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '5dba91c7aae09af6ab22ce4d4bc5b53394fc53b0' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/ui/dropdown.html', 1 => 1466836944, 2 => 'file', ), ), 'nocache_hash' => '20201707085775d82673e010-48937046', 'function' => array ( ), 'variables' => array ( 'class' => 0, 'size' => 0, 'default_text' => 0, 'required' => 0, 'data' => 0, 'item' => 0, 'key' => 0, 'value' => 0, ), 'has_nocache_code' => false, 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_5775d82675a2f6_08710720',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5775d82675a2f6_08710720')) {function content_5775d82675a2f6_08710720($_smarty_tpl) {?>
<?php if (isset($_smarty_tpl->tpl_vars['class']->value)) {?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable((" ").($_smarty_tpl->tpl_vars['class']->value), null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['class'] = new Smarty_variable('', null, 0);?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['size']->value)) {?><?php $_smarty_tpl->tpl_vars['size'] = new Smarty_variable((" ").($_smarty_tpl->tpl_vars['size']->value), null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['size'] = new Smarty_variable('', null, 0);?><?php }?><?php if (!isset($_smarty_tpl->tpl_vars['default_text']->value)) {?><?php $_smarty_tpl->tpl_vars['default_text'] = new Smarty_variable("&nbsp;", null, 0);?><?php }?><?php if (isset($_smarty_tpl->tpl_vars['required']->value)) {?><?php $_smarty_tpl->tpl_vars['required'] = new Smarty_variable(' required', null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['required'] = new Smarty_variable('', null, 0);?><?php }?><div class="dropdown<?php echo $_smarty_tpl->tpl_vars['class']->value;?>
<?php echo $_smarty_tpl->tpl_vars['size']->value;?>
"<?php echo $_smarty_tpl->tpl_vars['required']->value;?>
><button class="btn-default"><i class="caret"></i><span><?php echo $_smarty_tpl->tpl_vars['default_text']->value;?>
</span></button><ul class="dropdown-menu"><?php if (isset($_smarty_tpl->tpl_vars['data']->value)) {?><?php $_smarty_tpl->tpl_vars['item'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['item']->_loop = false; $_from = $_smarty_tpl->tpl_vars['data']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['item']->key => $_smarty_tpl->tpl_vars['item']->value) {
$_smarty_tpl->tpl_vars['item']->_loop = true;
?><li <?php $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false; $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable; $_from = $_smarty_tpl->tpl_vars['item']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true; $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['value']->key;
?> data-<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
="<?php echo $_smarty_tpl->tpl_vars['value']->value;?>
"<?php } ?> ><?php echo $_smarty_tpl->tpl_vars['item']->value['text'];?>
</li><?php } ?><?php }?></ul></div><?php }} ?>