{{* 页面底部 *}}
    <div class="bottom" data-click="org-bottom">
        <!-- 没有课程分类暂时不展示 -->
        <!-- <div class="item course-category">
            <div class="handle" style="display: none;">
                <i class="icon icon-bars-o"></i>
                <span>课程分类</span>
            </div>
        </div>-->
        {{if $tpl_data.support_student_advisory}}
        <div class="item appoint consult-appoint" id="ask-customer-service">
            {{else}}
            <div class="item" id="ask-customer-service">
                {{/if}}
            <div class="im-button handle" data-click="consult" data-sku="org|{{$base_info.number}}"
                {{if not empty($tpl_data.base_info.easemob)}}
                data-easemob="{{$tpl_data.base_info.easemob}}"
                {{/if}}
                {{if ($base_info.city_filter > 0) && (not empty($base_info.extension) )}}
                 data-tel="{{$base_info.extension}}"
                {{/if}}
                data-org_num = "{{$tpl_data.base_info.number}}"
                >
                <span class="icon icon-earphone"></span>
                <span>咨询客服</span>
            </div>
        </div>
        <div class="item org-information">
            <div class="handle">
                <i class="icon icon-org-info"></i>
                <span>机构信息</span>
            </div>
            <div class="menu-container" style="display: none;">
                <div class="menu-control">
                    <ul>
                        <a href="{{$tpl_data.page_url.summary}}">
                            <li>简介</li>
                        </a>
                        <a href="{{$tpl_data.page_url.comment}}">
                            <li>评价</li>
                        </a>
                        <a href="{{$tpl_data.page_url.photo}}">
                            <li>相册</li>
                        </a>
                        <a href="{{$tpl_data.page_url.school}}">
                            <li>校区</li>
                        </a>
                    </ul>
                    <div class="decoration-corner">
                        <div class="corner">
                            <div class="corner-handle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{if isset($tpl_data.is_focused) && $ext_data.is_app}}
            {{$is_focused = $tpl_data.is_focused}}
            <div
                class="item org-focus
                    {{if $is_focused == 1}}
                        single_focus
                    {{else}}
                        no_focus
                    {{/if}}"
                data-focused="{{$is_focused}}">
                    <span class="icon"></span>
                    <span class="fixed-bottom-txt">
                        {{if $is_focused == 1}}
                            已关注
                        {{else}}
                            关注
                        {{/if}}
                    </span>
            </div>
        {{/if}}

        {{*全部机构都加上预约留单-add @16-5.26 pm钱丽*}}
        <div class="item appoint">
            <div class="btn-stay-single" data-click="advisory" data-sku="org|{{$base_info.number}}">
                预约试听
            </div>
        </div>

        <script>
            window.gsx_ready(function (config) {
                if (config.source == "baidu_app_zhidahao" || config.source == "baidu_zhidahao" || config.source == "x360life") {
                    var hideDom = document.getElementById("ask-customer-service");
                    hideDom && (hideDom.style.display = "none");
                }
            });
        </script>
    </div>