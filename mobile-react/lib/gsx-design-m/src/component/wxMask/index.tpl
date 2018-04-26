<div class="weixin-mask">
    <canvas class="canvas"></canvas>
    <div class="text-box">
        <p class="text">点击右上角</p>
        {{if flag === 'share'}}
            <p class="text">分享给小伙伴 ~</p>
        {{else if flag === 'open'}}
            <p class="text">在浏览器中打开 ~</p>
        {{/if}}
    </div>
</div>