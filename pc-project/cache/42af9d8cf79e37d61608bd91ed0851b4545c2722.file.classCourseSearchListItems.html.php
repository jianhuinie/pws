<?php /* Smarty version Smarty-3.1.19, created on 2016-08-03 16:55:33 compiled from "/Users/bjhl/workspace/web-fe/view/teacher_center/component/classCourseSearchListItems.html" */ ?>
<?php /*%%SmartyHeaderCode:747191766578dc3ceba3224-44931030%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '42af9d8cf79e37d61608bd91ed0851b4545c2722' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/teacher_center/component/classCourseSearchListItems.html', 1 => 1470210675, 2 => 'file', ), ), 'nocache_hash' => '747191766578dc3ceba3224-44931030', 'function' => array ( ), 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_578dc3cec2bab1_55143750', 'variables' => array ( 'tpl_data' => 0, 'course' => 0, 'detail_url' => 0, 'name_width' => 0, 'show_preview' => 0, 'display_status2_map' => 0, 'status_actions_map' => 0, 'display_status_search' => 0, 'action' => 0, 'key' => 0, 'value' => 0, 'items' => 0, 'pager' => 0, ), 'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_578dc3cec2bab1_55143750')) {function content_578dc3cec2bab1_55143750($_smarty_tpl) {?><?php if (!is_callable('smarty_modifier_cn_truncate')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.cn_truncate.php';
if (!is_callable('smarty_modifier_date_format')) include '/Users/bjhl/workspace/web-fe/mock/smarty/plugins/modifier.date_format.php';
?>
<?php echo $_smarty_tpl->getSubTemplate ("teacher_center/course/variable/displayStatus2.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 1);?>
<?php echo $_smarty_tpl->getSubTemplate ("teacher_center/course/variable/statusActionsForList.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 1);?>
<div><table><?php $_smarty_tpl->tpl_vars['course'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['course']->_loop = false; $_from = $_smarty_tpl->tpl_vars['tpl_data']->value['class_course_list']['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['course']->key => $_smarty_tpl->tpl_vars['course']->value) {
$_smarty_tpl->tpl_vars['course']->_loop = true;
?><tr class="course-item" data-start-time="<?php echo $_smarty_tpl->tpl_vars['course']->value['begin_time'];?>
" data-number="<?php echo $_smarty_tpl->tpl_vars['course']->value['number'];?>
" data-display-status-search="<?php echo $_smarty_tpl->tpl_vars['course']->value['display_status_search'];?>
" data-verify-status="<?php echo $_smarty_tpl->tpl_vars['course']->value['verify_status'];?>
" data-total-pay="<?php echo $_smarty_tpl->tpl_vars['course']->value['total_pay'];?>
" data-max-student="<?php echo $_smarty_tpl->tpl_vars['course']->value['max_student'];?>
"><td class="left middle"><div class="info"><?php if (in_array($_smarty_tpl->tpl_vars['course']->value['display_status_search'],array('1','2','8','9','100'))) {?><?php $_smarty_tpl->tpl_vars['detail_url'] = new Smarty_variable(("/class_course/preview?number=").($_smarty_tpl->tpl_vars['course']->value['number']), null, 0);?><?php $_smarty_tpl->tpl_vars['show_preview'] = new Smarty_variable(true, null, 0);?><?php $_smarty_tpl->tpl_vars['name_width'] = new Smarty_variable(14, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['detail_url'] = new Smarty_variable(("/teacher/classCourseDetail?number=").($_smarty_tpl->tpl_vars['course']->value['number']), null, 0);?><?php $_smarty_tpl->tpl_vars['show_preview'] = new Smarty_variable(false, null, 0);?><?php $_smarty_tpl->tpl_vars['name_width'] = new Smarty_variable(15, null, 0);?><?php }?><?php if (!empty($_smarty_tpl->tpl_vars['course']->value['pic'])) {?><?php echo $_smarty_tpl->getSubTemplate ("common/component/avatar.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('type'=>"small",'img'=>$_smarty_tpl->tpl_vars['course']->value['pic'],'url'=>$_smarty_tpl->tpl_vars['detail_url']->value,'target'=>"_blank"), 0);?>
<?php }?><div class="name"><a class="text-info" data-title="<?php echo $_smarty_tpl->tpl_vars['course']->value['name'];?>
" data-width="210" href="<?php echo $_smarty_tpl->tpl_vars['detail_url']->value;?>
" target="_blank"><?php echo smarty_modifier_cn_truncate($_smarty_tpl->tpl_vars['course']->value['name'],$_smarty_tpl->tpl_vars['name_width']->value);?>
</a><?php if ($_smarty_tpl->tpl_vars['show_preview']->value) {?><a href="<?php echo $_smarty_tpl->tpl_vars['detail_url']->value;?>
" class="icon icon-eye" target="_blank" data-title="预览班课"></a><?php }?></div><?php echo $_smarty_tpl->getSubTemplate ("common/component/classCourseIcon.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('lesson_way'=>$_smarty_tpl->tpl_vars['course']->value['lesson_way'],'retire_flag'=>$_smarty_tpl->tpl_vars['course']->value['retire_flag'],'chaban_flag'=>$_smarty_tpl->tpl_vars['course']->value['chaban_flag']), 0);?>
</div></td><td class="middle"><span class="text-primary">￥<?php echo number_format($_smarty_tpl->tpl_vars['course']->value['price'],2);?>
</span></td><td class="middle"><div><?php if ($_smarty_tpl->tpl_vars['course']->value['total_pay']>0) {?><a href="/class_course/order_detail?number=<?php echo $_smarty_tpl->tpl_vars['course']->value['number'];?>
" target="_blank"><?php }?><span><span class="text-primary"><?php echo $_smarty_tpl->tpl_vars['course']->value['total_pay'];?>
</span>/<?php echo $_smarty_tpl->tpl_vars['course']->value['max_student'];?>
</span><?php if ($_smarty_tpl->tpl_vars['course']->value['total_pay']>0) {?></a><?php }?></div><?php if ($_smarty_tpl->tpl_vars['course']->value['total_pay']>0) {?><?php if (isset($_smarty_tpl->tpl_vars['tpl_data']->value['has_roster'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['has_roster']) {?><div class="goto-roster" data-way = "<?php echo $_smarty_tpl->tpl_vars['course']->value['lesson_way'];?>
" data-price = "<?php echo $_smarty_tpl->tpl_vars['course']->value['price'];?>
"><a href="<?php echo $_smarty_tpl->tpl_vars['course']->value['roster_url'];?>
" class="text-info" target="_blank">查看花名册</a></div><?php } elseif (isset($_smarty_tpl->tpl_vars['tpl_data']->value['shizi_login'])&&$_smarty_tpl->tpl_vars['tpl_data']->value['shizi_login']) {?><span class="text-info" data-title="师资系统无权查看花名册">查看花名册</span><?php } else { ?><span class="text-info" data-title="请通过机构后台进入老师个人<br/>中心查看花名册。">查看花名册</span><?php }?><?php }?></td><td class="middle"><?php if (!empty($_smarty_tpl->tpl_vars['course']->value['begin_time'])||!empty($_smarty_tpl->tpl_vars['course']->value['end_time'])) {?><?php if (smarty_modifier_date_format($_smarty_tpl->tpl_vars['course']->value['begin_time'],'%Y-%m-%d')==smarty_modifier_date_format($_smarty_tpl->tpl_vars['course']->value['end_time'],'%Y-%m-%d')) {?><span><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['course']->value['begin_time'],'%Y-%m-%d');?>
</span><?php } else { ?><span><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['course']->value['begin_time'],'%Y-%m-%d');?>
</br>到</br><?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['course']->value['end_time'],'%Y-%m-%d');?>
</span><?php }?><?php }?></td><td class="middle"><span><span><?php echo $_smarty_tpl->tpl_vars['display_status2_map']->value[$_smarty_tpl->tpl_vars['course']->value['display_status_search']];?>
</span><?php if ($_smarty_tpl->tpl_vars['course']->value['display_status_search']=='100') {?><i class="icon icon-question-circle text-info" data-title="你的资料设置未通过审核导致班课下线，快去检查一下个人资料吧"></i><?php }?></span></td><td class="center middle"><?php if (!empty($_smarty_tpl->tpl_vars['status_actions_map']->value[$_smarty_tpl->tpl_vars['course']->value['display_status_search']])) {?><?php if ($_smarty_tpl->tpl_vars['course']->value['display_status_search']==6&&!$_smarty_tpl->tpl_vars['course']->value['can_chaban']) {?><?php $_smarty_tpl->tpl_vars['display_status_search'] = new Smarty_variable(1, null, 0);?><?php } elseif ($_smarty_tpl->tpl_vars['course']->value['display_status_search']==12&&!$_smarty_tpl->tpl_vars['course']->value['can_chaban']) {?><?php $_smarty_tpl->tpl_vars['display_status_search'] = new Smarty_variable(1, null, 0);?><?php } else { ?><?php $_smarty_tpl->tpl_vars['display_status_search'] = new Smarty_variable($_smarty_tpl->tpl_vars['course']->value['display_status_search'], null, 0);?><?php }?><?php $_smarty_tpl->tpl_vars['action'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['action']->_loop = false; $_from = $_smarty_tpl->tpl_vars['status_actions_map']->value[$_smarty_tpl->tpl_vars['display_status_search']->value]; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['action']->key => $_smarty_tpl->tpl_vars['action']->value) {
$_smarty_tpl->tpl_vars['action']->_loop = true;
?><div class="action" data-action="<?php echo $_smarty_tpl->tpl_vars['action']->value['name'];?>
"><?php if ($_smarty_tpl->tpl_vars['action']->value['name']=="reason") {?><span data-title="<dl><?php $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false; $_smarty_tpl->tpl_vars['key'] = new Smarty_Variable; $_from = $_smarty_tpl->tpl_vars['course']->value['reason_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true; $_smarty_tpl->tpl_vars['key']->value = $_smarty_tpl->tpl_vars['value']->key;
?><dt><?php if ($_smarty_tpl->tpl_vars['key']->value=='basic'&&$_smarty_tpl->tpl_vars['value']->value) {?>课程信息：<?php } elseif ($_smarty_tpl->tpl_vars['key']->value=='photo'&&$_smarty_tpl->tpl_vars['value']->value) {?>课程照片：<?php } elseif ($_smarty_tpl->tpl_vars['key']->value=='introduction'&&$_smarty_tpl->tpl_vars['value']->value) {?>课程简介：<?php } elseif ($_smarty_tpl->tpl_vars['key']->value=='schedule'&&$_smarty_tpl->tpl_vars['value']->value) {?>教学计划：<?php }?></dt><?php $_smarty_tpl->tpl_vars['items'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['items']->_loop = false; $_from = $_smarty_tpl->tpl_vars['value']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['items']->key => $_smarty_tpl->tpl_vars['items']->value) {
$_smarty_tpl->tpl_vars['items']->_loop = true;
?><dd><?php echo $_smarty_tpl->tpl_vars['items']->value;?>
</dd><?php } ?><?php } ?></dl>" data-width="350"><?php echo $_smarty_tpl->tpl_vars['action']->value['title'];?>
</span><?php } else { ?><span><?php echo $_smarty_tpl->tpl_vars['action']->value['title'];?>
</span><?php if ($_smarty_tpl->tpl_vars['action']->value['name']=="again") {?><i class="icon icon-question-circle" data-title="什么是再开一班？<br />再开一班会依据本堂课自动填写课程信息、课程照片及课程简介，你只需要重新填写教学计划就可以快速再开一班了" data-width="20em"></i><?php }?><?php }?></div><?php } ?><?php }?></td></tr><?php } ?></table><?php $_smarty_tpl->tpl_vars['pager'] = new Smarty_variable($_smarty_tpl->tpl_vars['tpl_data']->value['class_course_list']['pager'], null, 0);?><?php echo $_smarty_tpl->getSubTemplate ("common/component/pager.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('count'=>$_smarty_tpl->tpl_vars['pager']->value['count'],'page'=>$_smarty_tpl->tpl_vars['pager']->value['page'],'page_size'=>$_smarty_tpl->tpl_vars['pager']->value['page_size'],'hide_jump'=>1), 0);?>
</div><?php }} ?>