<div class="class-course-tags-desc">
	<div class="header">
		<span>服务说明</span>
		<span class="icon-close"></span>
	</div>
	<div class="body">
	    {{foreach $tags as $tag}}
	    <div class="item">
	    	<div class="icon">
	    		<span class="{{$tag.icon}}"></span>
	    	</div>
	    	<div class="info">
		    	<div class="name">
		    		<span>{{$tag.name}}</span>
		    	</div>
		    	<div class="desc">{{$tag.desc}}</div>
	    	</div>
	    </div>
	    {{/foreach}}
    </div>
</div>