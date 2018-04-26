{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = "自动回复和快捷回复"}}

    {{$enable_backTopButton = false}}
{{/block}}
{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/vipResponse/css/index.styl"/>
{{/block}}

{{block name="content"}}
<h1 class="title">服务用户:</h1>
<p>非会员、普通会员、高级会员、超级会员</p>
<h1 class="title">特权介绍:</h1>
<p>有学生咨询却不在线？想自定义回复给学生的消息？想更加快捷的回复学生的常见咨询？没问题，自动回复和快捷回复功能帮您更加便捷地与学生沟通。会员可享受更多的自动回复和快捷回复特权，让您更加高效的与学生沟通。
<br>1）非会员支持最多2条的自动回复和快捷回复消息，会员支持更多哦；</p>
<table>
	<tr>
		<th>特权名称</th>
		<th>自动回复</th>
		<th>快捷回复</th>
	</tr>
	<tr>
		<td>会员</td>
		<td>5条</td>
		<td>10条</td>
	</tr>
	<tr>
		<td>高级会员</td>
		<td>5条</td>
		<td>10条</td>
	</tr>
	<tr>
		<td>超级会员</td>
		<td>5条</td>
		<td>10条</td>
	</tr>
</table>
<h1 class="title">特权规则</h1>
<p>会员开通后，实时生效；
<br>会员到期后，则不能添加多于当前有效条数的自动回复和快捷回复内容，已保存的自动回复和快捷回复内容不会被删除，仍然可以编辑。</p>
{{/block}}