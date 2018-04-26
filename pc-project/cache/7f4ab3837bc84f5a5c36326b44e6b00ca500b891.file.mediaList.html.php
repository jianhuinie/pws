<?php /* Smarty version Smarty-3.1.19, created on 2017-03-18 09:23:51 compiled from "/Users/bjhl/workspace/web-fe/view/teacher/newDetail/mediaList.html" */ ?>
<?php /*%%SmartyHeaderCode:134476012758cc8c27e11e47-66436137%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '7f4ab3837bc84f5a5c36326b44e6b00ca500b891' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/teacher/newDetail/mediaList.html', 1 => 1466835415, 2 => 'file', ), ), 'nocache_hash' => '134476012758cc8c27e11e47-66436137', 'function' => array ( ), 'variables' => array ( 'tpl_data' => 0, 'counter' => 0, 'val' => 0, 'final_name' => 0, 'photo' => 0, ), 'has_nocache_code' => false, 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_58cc8c27e518f5_63847882',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_58cc8c27e518f5_63847882')) {function content_58cc8c27e518f5_63847882($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_cn_truncate')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.cn_truncate.php';
?> <?php if (!empty($_smarty_tpl->tpl_vars['tpl_data']->value['video_list'])||!empty($_smarty_tpl->tpl_vars['tpl_data']->value['photo_list'])) {?><?php $_smarty_tpl->tpl_vars['counter'] = new Smarty_variable(1, null, 0);?><ul id="media-list"><?php if (count($_smarty_tpl->tpl_vars['tpl_data']->value['video_list'])>0) {?><?php $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['video_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['val']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true; $_smarty_tpl->tpl_vars['val']->index++;
?><li class="video <?php if ($_smarty_tpl->tpl_vars['counter']->value%5==0) {?>last<?php }?>" data-type="video" data-image="<?php echo $_smarty_tpl->tpl_vars['val']->value['preface_url_prefix'];?>
/1_160_120.jpg" data-video="<?php echo $_smarty_tpl->tpl_vars['val']->value['video'];?>
" data-name="<?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
"><div class="portrait" data-video="<?php echo $_smarty_tpl->tpl_vars['val']->value['video'];?>
" data-name="<?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
" data-vid="<?php echo $_smarty_tpl->tpl_vars['val']->index+1;?>
"><img src="<?php echo $_smarty_tpl->tpl_vars['val']->value['preface_url_prefix'];?>
/1_160_120.jpg"><i class="icon icon-play-o"></i><div class="media-mask"></div></div><?php $_smarty_tpl->tpl_vars['final_name'] = new Smarty_variable(smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['val']->value['name'],11), null, 0);?><span class="caption"<?php if ($_smarty_tpl->tpl_vars['final_name']->value!=$_smarty_tpl->tpl_vars['val']->value['name']) {?> data-title="<?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
"<?php }?>><?php echo $_smarty_tpl->tpl_vars['final_name']->value;?>
</span></li><?php $_smarty_tpl->tpl_vars['counter'] = new Smarty_variable($_smarty_tpl->tpl_vars['counter']->value+1, null, 0);?><?php } ?><?php }?><?php if (count($_smarty_tpl->tpl_vars['tpl_data']->value['photo_list'])>0) {?><?php $_smarty_tpl->tpl_vars['val'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['val']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['photo_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');} $_smarty_tpl->tpl_vars['val']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['val']->key => $_smarty_tpl->tpl_vars['val']->value) {
$_smarty_tpl->tpl_vars['val']->_loop = true; $_smarty_tpl->tpl_vars['val']->index++;
?><li class="photo <?php if ($_smarty_tpl->tpl_vars['counter']->value%5==0) {?>last<?php }?>" data-type="photo" data-image="<?php echo $_smarty_tpl->tpl_vars['val']->value['img'];?>
" data-name="<?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
"><div class="portrait" data-image="<?php echo $_smarty_tpl->tpl_vars['val']->value['img'];?>
" data-name="<?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
"><?php echo $_smarty_tpl->getSubTemplate ("common/variable/photo.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('url'=>$_smarty_tpl->tpl_vars['val']->value['img'],'raw_width'=>$_smarty_tpl->tpl_vars['val']->value['width'],'raw_height'=>$_smarty_tpl->tpl_vars['val']->value['height'],'width'=>180,'height'=>134), 0);?>
<img src="<?php echo $_smarty_tpl->tpl_vars['photo']->value;?>
"><div class="media-mask"></div></div><?php $_smarty_tpl->tpl_vars['final_name'] = new Smarty_variable(smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['val']->value['name'],11), null, 0);?><span class="caption"<?php if ($_smarty_tpl->tpl_vars['final_name']->value!=$_smarty_tpl->tpl_vars['val']->value['name']) {?> data-title="<?php echo $_smarty_tpl->tpl_vars['val']->value['name'];?>
"<?php }?>><?php echo $_smarty_tpl->tpl_vars['final_name']->value;?>
</span></li><?php $_smarty_tpl->tpl_vars['counter'] = new Smarty_variable($_smarty_tpl->tpl_vars['counter']->value+1, null, 0);?><?php } ?><?php }?></ul><?php echo $_smarty_tpl->getSubTemplate ("common/component/pager.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('page'=>$_smarty_tpl->tpl_vars['tpl_data']->value['pager']['page'],'page_size'=>$_smarty_tpl->tpl_vars['tpl_data']->value['pager']['page_size'],'count'=>$_smarty_tpl->tpl_vars['tpl_data']->value['pager']['count']), 0);?>
<?php }?><?php }} ?>