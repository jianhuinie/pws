<?php /* Smarty version Smarty-3.1.19, created on 2016-07-07 14:05:55 compiled from "/Users/bjhl/workspace/web-fe/view/common/component/avatar.html" */ ?>
<?php /*%%SmartyHeaderCode:1354595140577df1431e1407-94884788%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( 'e8351c7afead441894b7603351c7dee09ba5919e' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/component/avatar.html', 1 => 1466835415, 2 => 'file', ), ), 'nocache_hash' => '1354595140577df1431e1407-94884788', 'function' => array ( ), 'variables' => array ( 'url' => 0, 'alt' => 0, 'type' => 0, 'target' => 0, 'log' => 0, 'raw' => 0, 'img' => 0, 'width_map' => 0, ), 'has_nocache_code' => false, 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_577df143236185_46650560',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_577df143236185_46650560')) {function content_577df143236185_46650560($_smarty_tpl) {?>
<?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['tiny'] = 48;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['smaller'] = 54;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['small'] = 60;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['mediumer'] = 72;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['medium'] = 80;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['middle'] = 90;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['big'] = 98;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['large'] = 150;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['larger'] = 152;?><?php $_smarty_tpl->createLocalArrayVariable('width_map', null, 0);
$_smarty_tpl->tpl_vars['width_map']->value['huge'] = 167;?><?php if (!isset($_smarty_tpl->tpl_vars['url']->value)) {?><?php $_smarty_tpl->tpl_vars['url'] = new Smarty_variable('', null, 0);?><?php }?><?php if (empty($_smarty_tpl->tpl_vars['alt']->value)) {?><?php $_smarty_tpl->tpl_vars['alt'] = new Smarty_variable('头像', null, 0);?><?php }?><?php if ($_smarty_tpl->tpl_vars['url']->value) {?><a class="avatar-<?php echo $_smarty_tpl->tpl_vars['type']->value;?>
" href="<?php echo $_smarty_tpl->tpl_vars['url']->value;?>
"<?php if (isset($_smarty_tpl->tpl_vars['target']->value)) {?> target="<?php echo $_smarty_tpl->tpl_vars['target']->value;?>
"<?php }?> <?php if (isset($_smarty_tpl->tpl_vars['log']->value)) {?>log=<?php echo $_smarty_tpl->tpl_vars['log']->value;?>
<?php }?>><?php } else { ?><b class="avatar-<?php echo $_smarty_tpl->tpl_vars['type']->value;?>
"><?php }?><?php if (isset($_smarty_tpl->tpl_vars['raw']->value)&&$_smarty_tpl->tpl_vars['raw']->value) {?><img src="<?php echo $_smarty_tpl->tpl_vars['img']->value;?>
" alt="<?php echo $_smarty_tpl->tpl_vars['alt']->value;?>
" /><?php } else { ?><?php echo $_smarty_tpl->getSubTemplate ("common/component/image.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('url'=>$_smarty_tpl->tpl_vars['img']->value,'width'=>$_smarty_tpl->tpl_vars['width_map']->value[$_smarty_tpl->tpl_vars['type']->value],'alt'=>$_smarty_tpl->tpl_vars['alt']->value), 0);?>
<?php }?><?php if ($_smarty_tpl->tpl_vars['url']->value) {?></a><?php } else { ?></b><?php }?><?php }} ?>