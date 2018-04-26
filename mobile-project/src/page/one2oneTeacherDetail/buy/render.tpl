<div class="pay-content">    
    <div class="header-nav">
        <div class="teacher-name">
            {{baseInfo.teacherName}}
        </div>

        <div class="subject-name">
            {{baseInfo.subjectName}}
        </div>

        <span class="close">
            <i class="icon icon-close"></i>
        </span>
    </div>

    <div class="content-pays">
        <div class="category">
            <div class="item-name">
                选择分类
            </div>

            <div class="item-contents">
                {{foreach list.categories as item index}}
                    <span 
                        class="item {{if index == 0}}item-active{{else}}item-noraml{{/if}} category-item"
                        {{if item.price_online}}
                            data-online={{item.price_online}}
                        {{/if}}

                        {{if item.price_teacher}}
                            data-teacher={{item.price_teacher}}
                        {{/if}}

                        {{if item.price_student}}
                            data-student={{item.price_student}}
                        {{/if}}

                        data-course-id={{item.normal_course_id}}
                    >
                        {{item.name}}
                    </span>
                {{/foreach}}
            </div>
        </div>

        <div class="lines"></div>

        <div class="lesson-way">
            <div class="item-name">
                上课方式
            </div>

            <div class="item-contents">
                {{foreach list.lessonWay as item index}}
                    <span 
                        class="item {{if index == 0}}item-active{{else}}item-noraml{{/if}} lesson-way-item"
                        data-key="{{item.key}}"
                    >
                        {{item.text}}
                    </span>
                {{/foreach}}
            </div>
        </div>

        <div class="lesson-price-warn">
            <span class="lesson-warn-text"></span>
            <span class="lesson-warn-price"></span>
        </div>
        <div class="lines"></div>
        <div class="combo">
            <div class="item-name">
                课时包
            </div>

            <div class="item-contents">
                {{foreach list.combos as item index}}
                    <span 
                        class="item {{if index == 0}}item-active{{else}}item-noraml{{/if}} combo-item"
                        data-hours={{item.hours}}
                    >
                        {{item.hours}}个小时
                    </span>
                {{/foreach}}
                <span class="item item-noraml self-item">自定义</span>
            </div>
        </div>

        <div class="self-time hide">
            <div class="self-text">
                购买数量(小时)
            </div>

            <div class="self-buttons">
                <span class="minus">
                    <span class="minus-icon unactive"></span>
                </span>

                <span class="self-number">
                    10小时
                </span>

                <span class="increase">
                    <i class="icon-add active"></i>
                </span>
            </div>
        </div>

    </div>

    <div class="pay-button">
        <div class="total-price">
            <span class="texts">
                总价:
            </span>

            <span class="price-single"></span>
        </div>

        <div class="analysis-habo-log {{if list.payStatus.status.state!="ENROLLING"}}cant-buy{{else}}confirm-pay{{/if}}" 
        data-status={{list.payStatus.status.state}}
        data-habo-type="YouXuan_Buy_CoureseInsure" 
        data-habo-stype="YouXuan_Buy_CoureseInsure">
            确认购买
        </div>
    </div>
</div>