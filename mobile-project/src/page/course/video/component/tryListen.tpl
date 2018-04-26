{{*
	@file 课程详情免费试听列表
	@author hurry
	@date 2017/1/16
*}}
{{if isset($tpl_data.can_trial_items) && count(can_trial_items) > 0}}
<div class="course-try-listen">
	<ul>
		{{foreach $tpl_data.can_trial_items as $item}}
			<li class="try-item">
				<div class="try-title">
					{{$item.title}}
				</div>
				<div class="item-listen-play analysis-habo-log" data-habo-type="{{$gsType}}" data-habo-stype="audition" data-section-id="{{$item.section_id}}">
	                <span class="character">免费试听</span>
	            </div>
			</li>
		{{/foreach}}
	</ul>
</div>
{{/if}}