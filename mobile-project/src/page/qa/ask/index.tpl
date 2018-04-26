{{*

@file 问答 － 提问
@author wangyujie
@date 2016-06-21

*}}

{{extends file="page/_base/base_default.tpl"}}

{{block name="page"}}
    {{$page_title = "问答"}}
    {{$page_module = "page/qa/ask/index"}}
    {{$enable_backTopButton = false}}
{{/block}}

{{block name="data"}}
    {{$script_data = $tpl_data}}
{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/qa/ask/index.styl" />
{{/block}}

{{block name="content"}}
    {{include file="page/_common/nav_bar/nav_bar.tpl" text="问答"}}

    <!-- 隐藏掉自己实现的导航栏 -->
    <!-- <header id="page_nav_bar" class="nav-bar">
        <div class="nav-wrap-left">
            <a class="nav-button" href="javascript:history.length == 1?(window.location.href='https://m.genshuixue.com/'):history.go(-1);">
                <i class="icon icon-back"></i>
            </a>
        </div>

        <div class="nav-header h1">
            问答
        </div> -->

        <!--div class="nav-wrap-right">
            <a href="#">
                我的提问
            </a>
        </div-->
    <!-- </header> -->

    <div id="ask-content">
        <div class="ask-course">
            <div class="selected-course">
                <span class="title">提问科目</span>
                {{if $tpl_data.select_subject}}
                    <span class="selected-course-name" data-id="{{$tpl_data.select_subject.id}}">
                        {{$tpl_data.select_subject.dname}}
                    </span>
                {{else}}
                    <span class="selected-course-name" data-id="0">
                    </span>
                {{/if}}
                <i class="icon icon-back"></i>
            </div>
            <div class="subject-list">
                <ul class="outer-ul">
                    {{foreach $tpl_data.subject_list as $list}}
                        <li {{if $list@first}}class="selected"{{/if}}>
                            <div class="name">{{$list.name}}</div>
                            <ul class="inner-ul">
                                {{foreach $list.childs as $child}}
                                    <li data-id={{$child.id}} data-dname="{{$child.dname}}">
                                        {{$child.name}}
                                    </li>
                                {{/foreach}}
                            </ul>
                        </li>
                    {{/foreach}}
                </ul>

            </div>
        </div>

        <div class="ask-note">
            <textarea class="form-text" placeholder="添加文字描述，尽可能详尽，便于老师为您解答！" maxLength="70">
            </textarea>
            <span class="left-length">
                还可以输入70字
            </span>
        </div>

        <div class="ask-pics">
            <div class="hint">
                最多可上传9张照片
            </div>
            <ul class="pic-list">
                <li class="add-pic">
                    <i class="icon icon-add"></i>
                    <span>点击添加</span>
                    <input type="file" accept="image/*">
                </li>
            </ul>

            <div class="ask-submit">
                <button class="submit-question">
                    提交问题
                </button>
                <div class="overview">
                    已有
                    <span>{{$tpl_data.totalcount}}</span>
                    个问题得到解答，平均解答时间是
                    <span>{{$tpl_data.replytime}}</span>
                    分钟
                </div>
            </div>
        </div>
    </div>

    <div id="bind-phone">
        <div class="title">
            还差一步&nbsp;绑定手机号
        </div>
        <div class="form-group">
            <input id="mobile" class="form-text" type="tel" name="phone" placeholder="请输入手机号" autocomplete="off" required />
        </div>
        <div class="form-group">
            <div class="btn-sms">
                获取验证码
            </div>
            <input id="sms" class="form-text" type="number" name="verify_code" autocomplete="off" required />
        </div>
        <div class="form-action">
            <div class="btn-bind">立即绑定</div>
        </div>

    </div>


{{/block}}


