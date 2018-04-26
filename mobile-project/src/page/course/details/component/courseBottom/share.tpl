<div class="shares" {{if $templateModel == 'super'}}style="background: #00BCD4; color: white;border-right: 1px solid #13A7BA;"{{/if}} data-click="share" data-sku="class|{{$courseInfo.number}}">
    <div class="share-reward" style="display:none;">
        <span class="title" style="display:inline;">分享有奖</span>
        <div class="triangle-down"></div>
    </div>
    {{if $templateModel == 'super'}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/09/57e26d259ba73.png">
    {{else}}
        <img src="https://img.genshuixue.com/0cms/d/file/content/2016/08/57c3c7babb157.png">
    {{/if}}
    <div>
        分享
    </div>
</div>
