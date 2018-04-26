<?php /* Smarty version Smarty-3.1.19, created on 2017-02-14 10:42:20 compiled from "/Users/bjhl/workspace/web-fe/view/common/variable/orderStatus.html" */ ?>
<?php /*%%SmartyHeaderCode:69008904557a5a0d1230471-24649090%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array ( 'file_dependency' => array ( '6f71bfce2c77fa0fc46f6094b74cb02116b9f8cd' => array ( 0 => '/Users/bjhl/workspace/web-fe/view/common/variable/orderStatus.html', 1 => 1486532611, 2 => 'file', ), ), 'nocache_hash' => '69008904557a5a0d1230471-24649090', 'function' => array ( ), 'version' => 'Smarty-3.1.19', 'unifunc' => 'content_57a5a0d1246622_30808303', 'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_57a5a0d1246622_30808303')) {function content_57a5a0d1246622_30808303($_smarty_tpl) {?>
<?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['wait_for_pay'] = array("wait-for-pay","待支付");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['canceled'] = array("canceled","已取消");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['closed'] = array("closed","已关闭");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['pay_failed'] = array("pay-failed","待支付");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['pay_success'] = array("pay-success","进行中");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['refunding'] = array("refunding","退款中");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['refund_success'] = array("refund-success","退款成功");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['wait_for_comment'] = array("wait-for-comment","待评价");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['appealing'] = array("appealing","申诉中");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['normal_over'] = array("normal-over","已完成");?><?php $_smarty_tpl->createLocalArrayVariable('orderStatus', null, 0);
$_smarty_tpl->tpl_vars['orderStatus']->value['appeal_over'] = array("appeal-over","申诉完成");?><?php }} ?>