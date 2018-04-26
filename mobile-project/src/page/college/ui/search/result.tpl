<div class="search-result">
	<ul>
		<li class="search-tips">"{{data.key}}"的搜索结果</li>
		{{foreach data.items as $item}}
			<a href="{{$item.url}}">
		        <li class="item" >
		        	{{$item.title}}
		        	<i class="icon icon-chevron-thin-right"></i>
		        </li>
	        </a>
	    {{/foreach}}
    </ul>
</div>