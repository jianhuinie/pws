{{if isset($vas) && $vas|count > 0}}
    <div id="j_vas" class="vas">
        {{foreach from=$vas key=k item=v}}
            {{if $k < 4}}
                <div class="item">
                    <img src="/src/page/course/details/component/img/ic_donesuccess.png" alt="" />
                    {{$v}}
                </div>
            {{/if}}
        {{/foreach}}
        <img class="arrow" src="/src/page/course/details/component/img/arrow.png" alt="" />
    </div>
{{/if}}
