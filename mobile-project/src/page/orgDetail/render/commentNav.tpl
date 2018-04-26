<div class="comment-nav{{if fixStatus == 1}} comment-fix-tab{{/if}}">

    <div class="comment-tab">
        <div class="item{{if index == '0'}} active{{/if}}" data-order="0" data-index="0">全部</div>
        <div class="item{{if index == '1'}} active{{/if}}" data-order="1" data-index="1">好评</div>
        <div class="item{{if index == '2'}} active{{/if}}" data-order="2" data-index="2">中评</div>
        <div class="item{{if index == '3'}} active{{/if}}" data-order="3" data-index="3">差评</div>
        <div class="all" data-status = "0" data-index="4">
            <span>推荐评价</span>
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/5822afb39cc86.png">
        </div>
    </div>

    <div class="box">
        <div class="it{{if status == 'display_order'}} active{{/if}}" data-type="display_order" style="border-top: 1px solid #f7f7f8" data-value="推荐评价">
            <span>推荐评价</span>
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a7b2594dae.png" {{if status!='display_order'}}class="hide"{{/if}}>
        </div>
        <div class="it{{if status == 'create_time'}} active{{/if}}" data-type="create_time" data-value="最新评价">
            <span>最新评价</span>
            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/582a7b2594dae.png" {{if status!='create_time'}}class="hide"{{/if}}>
        </div>
    </div>
</div>