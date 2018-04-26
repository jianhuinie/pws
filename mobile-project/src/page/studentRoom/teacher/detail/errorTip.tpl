<div class="error-tip-wrapper">
    <div class="mask-touch-disapper"></div>
    <div class="error-tip">
        <div class="title">
           {{title}}
        </div>
        <div class="content">
        {{content}}
        </div>
        <div class="buttons">
            {{if isMember == '1'}}
            <div class="button close">
                好的
            </div>
            {{else}}
            <div class="button close">
                暂不开通
            </div>
            <div class="button open-member">
                开通会员
            </div>
            {{/if}}
        </div>
    </div>
</div>
