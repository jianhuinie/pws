<div class="course-child-tab-container" style="margin-bottom: 10px;">
    <!-- <div class="list-container">
        <div class="list">
            <div class="item course-item-tab on" data-type="0" data-stype="m_teacher_all">全部</div>
            {{if params.hasVideoCourse}}
            <div class="item course-item-tab" data-type="3" data-stype="m_teacher_vcourse">视频课</div>
            {{/if}}
            {{if params.hasOnlineCourse}}
            <div class="item course-item-tab" data-type="2" data-stype="m_teacher_live">直播课</div>
            {{/if}}
            {{if params.hasOfflineCourse}}
            <div class="item course-item-tab" data-type="4" data-stype="m_teacher_offline">线下班课</div>
            {{/if}}
            {{if params.hasOne2oneCourse}}
            <div class="item course-item-tab" data-type="1" data-stype="m_teacher_1v1">1对1</div>
            {{/if}}
        </div>
    </div> -->

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="item course-item-tab on" data-type="0" data-stype="m_teacher_all">全部</div>
            </div>
            {{if params.hasVideoCourse}}
                <div class="swiper-slide">
                    <div class="item course-item-tab" data-type="3" data-stype="m_teacher_vcourse">视频课</div>
                </div>
            {{/if}}

            {{if params.hasOnlineCourse}}
                <div class="swiper-slide">
                    <div class="item course-item-tab" data-type="2" data-stype="m_teacher_live">直播课</div>
                </div>
            {{/if}}

            {{if params.hasOfflineCourse}}
                <div class="swiper-slide">
                    <div class="item course-item-tab" data-type="4" data-stype="m_teacher_offline">线下班课</div>
                </div>
            {{/if}}

            {{if params.hasOne2oneCourse}}
                <div class="swiper-slide">
                    <div class="item course-item-tab" data-type="1,13" data-stype="m_teacher_1v1">1对1</div>
                </div>
            {{/if}}
        </div>
    </div>

    <div class="tag-container" style="display:none;"></div>
</div>