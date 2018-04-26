{{*
    @file 会员和聚惠学banner
    @author hurry
    @date 2016/12/15
*}}
{{if isset($tpl_data.course_info.vip_price)}}
    <div class="vip-wrapper">
        <div class="left-part">
            <div class="left-price">
                <div class="price">
                    <span class="vip-price">
                        会员价：￥{{$tpl_data.course_info.vip_price}}
                    </span>
                    <span class="ori-price">
                        原价:￥{{$tpl_data.course_info.price}}
                    </span>
                </div>
                <div class="enroll-num">
                    已报名
                    {{$course_info.total_pay}}
                    /
                    {{$course_info.max_student}}
                </div>
            </div>
        </div>
        <div class="right-part">
            <a href="{{$tpl_data.course_info.student_vip_url}}">
                <p class="vip-club">会员俱乐部</p>
                <p class="cheap">一百万用户的选择</p>
                <i class="next-icon icon icon-angle-right"></i>
            </a>
        </div>
    </div>
{{else}}
    {{if $is_jhx == 1}}
        <div class="jhx-price">
            <div class="left-part">
                <div class="price">
                    <span class="symbol">￥</span>
                    {{if !empty($course_info.discount)}}
                        {{$target_price = $course_info.discount.discount_price}}
                    {{elseif !empty($course_info.chaban_price)}}
                        {{$target_price = $course_info.chaban_price}}
                    {{else}}
                        {{$target_price = $course_info.price}}
                    {{/if}}
                    {{$target_price}}
                </div>
                <div class="text">
                    <div class="price-text">
                        {{if !empty($course_info.discount)}}
                            秒杀价
                        {{elseif !empty($course_info.chaban_price)}}
                            插班价格
                        {{/if}}
                    </div>
                    <div class="enroll-num">
                        已报名
                        <span class="num">{{$course_info.total_pay}}/{{$course_info.max_student}}</span>
                    </div>
                </div>

            </div>
            <div class="right-part">
                <a href="http://ju.m.genshuixue.com?zn=zn_juhuixue_zbhuiliu_msite">
                    <div class="tip">
                        <p class="line1">聚惠学</p>
                        <p class="line2">超值课程</p>
                    </div>
                    <div class="next-icon">
                        <i class="icon  icon-chevron-thin-right"></i>
                    </div>
                </a>
            </div>
        </div>
    {{/if}}
{{/if}}