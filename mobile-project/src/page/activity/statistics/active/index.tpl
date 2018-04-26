{{extends file="page/_base/base.tpl"}}

{{block name="page"}}
    {{$page_title = ""}}

    {{$page_module = "page/activity/statistics/active/index"}}

    {{$enable_backTopButton = false}}

{{/block}}
{{block name="data"}}{{/block}}

{{block name="style"}}
    <link rel="stylesheet" href="{{$static_origin}}/src/page/activity/statistics/active/css/index.styl"/>
{{/block}}

{{block name="content"}}
    <div class="title">
        <img src="{{$static_origin}}/src/page/activity/statistics/active/imgs/gsx-logo.png">
        <div class="title-text">
            <p>跟谁学平台老师调研</p>
        </div>
    </div>

<div class="container">
    <div class="question">
        <div class="question_1">
            <p>1. 您入驻跟谁学的原因? (最多选三项)</p>
            <ul>
            <li class="duoxuan">
                <div class="radio-btn">
                    <i>
                        <input type="checkbox" name="question1" value="A"/>
                    </i>
                </div>
                A. 招生
            </li>
            <li class="duoxuan">
                <div class="radio-btn">
                    <i>
                        <input type="checkbox" name="question1" value="B"/>
                    </i>
                </div>
                B. 扩大个人/机构影响力
            </li>
            <li class="duoxuan">
                <div class="radio-btn">
                    <i>
                        <input type="checkbox" name="question1" value="C"/>
                    </i>
                </div>
                C. 尝试网上授课
            </li>

            <li class="duoxuan">
                <div class="radio-btn">
                    <i>
                        <input type="checkbox" name="question1" value="D"/>
                    </i>
                </div>
                D. 看好跟谁学发展前景
            </li>

            <li class="duoxuan">
                <div class="radio-btn">
                    <i>
                        <input type="checkbox" name="question1" value="E"/>
                    </i>
                </div>
                E. 受周围人影响
            </li>

            <li class="duoxuan">
                <div class="radio-btn">
                    <i>
                        <input type="checkbox" name="question1" value="F"/>
                    </i>
                </div>
                F. 其他
            </li>
            </ul>
        </div>

        <div class="question_2">
            <p>2. 您是否有意愿在跟谁学平台上招生并开课？</p>
            <ul>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question2" value="A" />
                    </i>
                </div>
                A. 非常愿意
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question2" value="B"/>
                    </i>
                </div>
                B. 很愿意
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question2" value="C"/>
                    </i>
                </div>
                C. 一般
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question2" value="D"/>
                    </i>
                </div>
                D. 不是很愿意
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question2" value="E"/>
                    </i>
                </div>
                E. 非常不愿意
            </li>
            </ul>
        </div>

        <div class="question_3">
            <p>3. 您平均每周登录跟谁学(通过电脑、手机或Pad等)的次数?</p>
            <ul>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question3" value="A" />
                    </i>
                </div>
                A. 10次以上
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question3" value="B"/>
                    </i>
                </div>
                B. 7~10次
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question3" value="C"/>
                    </i>
                </div>
                C. 3~6次
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question3" value="D"/>
                    </i>
                </div>
                D. 1~2次
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question3" value="E"/>
                    </i>
                </div>
                E. 不到1次
            </li>
            </ul>
        </div>

        <div class="question_4">
        <p>4. 您入驻跟谁学后，通过平台招到了多少学生?</p>
        <ul>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question4" value="A" />
                    </i>
                </div>
                A. 100人以上
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question4" value="B"/>
                    </i>
                </div>
                B. 51~100人
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question4" value="C"/>
                    </i>
                </div>
                C. 11~50人
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question4" value="D"/>
                    </i>
                </div>
                D. 1~10人
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question4" value="E"/>
                    </i>
                </div>
                E. 还没有招到学生
            </li>
        </ul>
        </div>

        <div class="question_5">
        <p>5. 您对自己在平台上的排名关注度如何?</p>
        <ul>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question5" value="A"/>
                    </i>
                </div>
                A. 非常关注
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question5" value="B"/>
                    </i>
                </div>
                B. 很关注
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question5" value="C"/>
                    </i>
                </div>
                C.一般
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question5" value="D"/>
                    </i>
                </div>
                D.不太关注
            </li>

            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question5" value="E"/>
                    </i>
                </div>
                E.一点也不关注
            </li>
        </ul>
        </div>

        <div class="question_6">
        <p>6. 您对跟谁学的会员权益兴趣度如何？</p>
        <ul>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question6" value="A"/>
                    </i>
                </div>
                A. 非常感兴趣
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question6" value="B"/>
                    </i>
                </div>
                B. 很感兴趣
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question6" value="C"/>
                    </i>
                </div>
                C.一般
            </li>
            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question6" value="D"/>
                    </i>
                </div>
                D.不太感兴趣
            </li>

            <li class="danxuan">
                <div class="radio-btn">
                    <i>
                        <input type="radio" name="question6" value="E"/>
                    </i>
                </div>
                E.一点也不感兴趣
            </li>
        </ul>
        </div>

        <div class="block_1">
            <p>7. 您对跟谁学平台有什么好的建议?</p>
            <div class="info">
                <textarea id="information" placeholder="您对跟谁学平台有什么建议？期待您给我们反馈！"></textarea>
            </div>
            <div class="submit">提交</div>
        </div>
    </div>
    <div class="block_2">
        <div class="adr">
            <img src="{{$static_origin}}/src/page/activity/statistics/active/imgs/wenzai.png">
        </div>
        <div class="text">感谢您的反馈，我们将竭诚为您服务！</div>
    </div>
</div>
{{/block}}
