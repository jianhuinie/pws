<div class="personal">
    <div class="title-line">
        <div class="name">个人认证</div>
        <div class="slide-close">×</div>
    </div>
    {{foreach personalList as $item index}}
    <div class="item" {{if index == personalList.length -1}}style="border-bottom: none;"{{/if}}>
        <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584e56f9c4b6c.png">
        {{if $item === 'identity'}}
            <div class="info">
                <div class="name">身份认证</div>
                <div class="infos">在跟谁学备案完成实名验证</div>
            </div>
        {{/if}}

        {{if $item === 'teach'}}
            <div class="info">
                <div class="name">教师认证</div>
                <div class="infos">提供在职教师证认证</div>
            </div>
        {{/if}}

        {{if $item === 'education'}}
            <div class="info">
                <div class="name">学历认证</div>
                <div class="infos">提供相关毕业证</div>
            </div>
        {{/if}}

        {{if $item === 'professional'}}
            <div class="info">
                <div class="name">专业认证</div>
                <div class="infos">提供有效专业资格证书</div>
            </div>
        {{/if}}

        {{if $item === 'workplace'}}
            <div class="info">
                <div class="name">工作认证</div>
                <div class="infos">提供相关工作单位证明</div>
            </div>
        {{/if}}
    </div>
    {{/foreach}}
</div>