{{*
    @file 星级评分
    @author chenmo
*}}
<span class="star-score">
    {{if $score == 0}}
        {{$score = 5}}
    {{/if}}
    {{for $i = 1 to 5}}
    {{if $score >= $i}}
    <i class="icon icon-star_all star-shine"></i>
    {{elseif $i-$score <= 0.5}}
    <span class="star-half">
        <i class="icon icon-star_half"></i>
        <i class="icon icon-star_all"></i>
    </span>
    {{else}}
    <i class="icon icon-star_all"></i>
    {{/if}}
    {{/for}}
</span>