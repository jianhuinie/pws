<div class="search-suggestion">
	<ul>
		{{foreach items as $item}}
            <li class="item" data-val="{{$item}}">
            	{{$item}}
            </li>
        {{/foreach}}
    </ul>
</div>