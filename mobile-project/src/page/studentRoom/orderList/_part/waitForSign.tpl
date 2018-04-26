<div class="list">
    <div class="list-box-item no-margin" data-href="{{item.detail_url}}">
        <div class="header">
            <div class="time" data-time="{{item.create_time}}"></div>
            <div class="status">待响应</div>
        </div>

        <div class="subject-name">
            {{item.subject_name}}
        </div>

        <div class="line">
        </div>

        <div class="content">
            <div class="item">
                <i class="icon icon-ic_price"></i>
                <span class="price">￥{{item.min_price}}-{{item.max_price}}/小时</span>
            </div>

            <div class="item">
                <i class="icon icon-ic_bookclass"></i>
                <span class="lessonWay">
                    {{foreach item.lesson_way_cn_array as $it index}}
                        {{if index == 0}}
                            {{$it}}
                        {{else}}
                            | {{$it}}
                        {{/if}}
                    {{/foreach}}
                </span>
            </div>

            <div class="item">
                <i class="icon icon-shijian"></i>
                <span class="student-require-time">
                </span>
            </div>

            {{if item.class_address}}
            <div class="item">
                <i class="icon icon-ditu"></i>
                <span class="location">
                    {{item.class_address}}
                </span>
            </div>

                {{if item.distance > 0}}
                    <div class="distance-undo">
                        距离您{{item.distance}}km
                    </div>
                {{/if}}
            {{/if}}

            <div class="item remark-content">
                <span class="text">备注:</span>
                <span class="remark line-clamp line-clamp-2">
                    {{item.remark}}
                </span>
            </div>

            <div class="sing-button">
                <span class="no-replay" data-number="{{item.number}}">
                    暂不报名
                </span>

                <span class="check-detail">
                    查看详情
                </span>
            </div>

        </div>
    </div>
</div>