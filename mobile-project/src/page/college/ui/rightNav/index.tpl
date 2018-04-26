<div class="right-nav-wrapper">
	<div class="wrapper">
		<div class="content">
			<section class="header">
				<img src="{{$static_origin}}/src/page/college/img/img_home_logo.png"/>
			</section>
			<section class="body">
				<ul>
					{{foreach items as $item}}
						<a href="{{$main_origin}}/tcenter/gsx_college/list?type={{$item.type}}">
				            <li class="item">
				            	<span class="title">{{$item.name}}</span>
				            	<i class="icon icon-chevron-thin-right"></i>
				            </li>
			            </a>
			        {{/foreach}}
			        <a href="{{$static_origin}}/teacher/college">
			            <li class="item">
			            	<span class="title">
			            		新手必读
			            	</span>
			            	<i class="icon icon-chevron-thin-right"></i>
			            </li>
		            </a>
		        </ul>
			</section>
			<section class="footer">
				客服电话：4000-910-910
			</section>
		</div>
	</div>
</div>