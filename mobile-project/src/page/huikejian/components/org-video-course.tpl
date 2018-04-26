<li> 
    <div class="org-course-style">
        <div class="left-side">
            <span class="figure_pic img-background">
                <img data-src="{{$course.photo_url}}" clip-rc="1" width="420" height="240" />
            </span>
        </div>
        <div class="right-side">
            <span class="big-font">{{$course.name|escape}}</span>
            <p class="gray-font">{{$course.video_item_cnt|escape}}课节</p>
            <p class="gray-font teacher-name">
               老师：
               {{$course.teacher.name|escape}}
            </p>
        </div>
        <div class="bottom-side">
            <div class="yi-sign">已学习{{$course.total_pay}}人</div>
            <div class="course-price">
                <span class="discount-price">
                    {{if !empty($course.limited_discount)}}
                    <span class="symbol">秒杀价:￥</span>{{$course.limited_discount.discount_price}}
                {{else}}
                    {{if $course.price gt 0}}
                        <span class="symbol">&#65509;</span>
                        {{$course.price|escape}}
                        </span>
                    {{else}}
                        <span>免费</span>
                    {{/if}}
                {{/if}}


                </span>
            </div>
        </div>
        <a href="{{$course.play_url}}" data-app="videoCourse|{{$course.number}}|"></a>
    </div>
</li>