{{*
    @file 切换页签
    @param {Array} nav_tabs 页签
    @param {string} default_value 默认选中值，没有选第一个
    @author hurry
*}}
{{if !isset($default_value)}}
	{{$default_value=$nav_tabs[0].id}}
{{/if}}
<ul class="nav-tab-container">
	{{foreach $nav_tabs as $tab}}
		<li
		class="nav-tab-item nav-tab-item-{{$tab.id}} 
		{{if $tab.id==$default_value}}active{{/if}} 
		{{if isset($tab.class)}}{{$tab.class}}{{/if}}"
		data-id="{{$tab.id}}" 
		{{if isset($tab.class) && $tab.class=='analysis-habo-log'}}
			data-habo-type="{{$tab.type}}"
			data-habo-stype="{{$tab.stype}}"
		{{/if}}>
			{{$tab.name}}
		</li>
	{{/foreach}}
</ul>