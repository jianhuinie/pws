<div id="j_vasl" class="vasl">
    <div class="title">
        服务说明
    </div>
    <div class="ctn">
        <div id="j_all">
            {{foreach from=$vas key=k item=v}}
                <div class="va">
                    <img src="/src/page/course/details/component/img/ic_donesuccess.png" alt="" /><span>{{$v}}</span>
                </div>
            {{/foreach}}
        </div>
    </div>
    <div id="j_vasl_ok" class="ok">
        我知道了
    </div>
</div>
