{{$lessonMap = ['','协商地点','在线授课','','学生上门','','','','老师上门']}}
<div class="content">
    <div class="lesson-way">
        <div class="title">
            <span class="main">请选择上课方式</span>
            <span class="subtit">(可协商修改)</span>
        </div>
        <div class="cont">
            {{foreach $tpl_data.lesson_way_num_array as $item}}
                <span class="item normal" data-index="{{$item}}" data-type="lessonWay">{{$lessonMap[$item]}}</span>
            {{/foreach}}
        </div>
    </div>


    <div class="classTime">
        <div class="title">
            <div class="main">请选择上课时间</div>
        </div>
        <div class="time-table">
        </div>
    </div>

    <div class="input-content">
        <div class="title">
            <span class="main">请输入自荐理由</span>
            <span class="subtit">(必填，20字以上)</span>
        </div>
        <div class="input-texts">
            <textarea class="form-text" placeholder="很符合学生的需求，希望可以尽能力帮助到他" maxLength="200"></textarea>
        </div>
    </div>
</div>