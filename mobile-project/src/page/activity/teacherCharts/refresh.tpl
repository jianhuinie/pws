{{foreach renderData.items as $list}}
    <div class="item" data-url={{$list.url}}>
        <div class="number">
            <div class="ranking">{{$list.rank}}</div>
            <div class="avatar"><img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a2315c62581.png" data-src={{$list.avatar}}></div>
        </div>
        <div class="information">
            <div class="info-container">
                {{if $list.name == null}}
                    <p class="teacher">未知</p>
                {{else}}
                    <p class="teacher line-clamp">{{$list.name}}</p>
                {{/if}}
                <p class="line-clamp">{{$list.city}}·{{$list.subject_name}}</p>
            </div>
        </div>
        <div class="student-amount">{{$list.student_count}}学生</div>
        <div class="ranking-change">
            {{if $list.rank == null}}
            {{else if $list.rank_change == -1}}
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe930c6f9.png">
            {{else if $list.rank_change == 1}}
                <img data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583cfe935e33e.png">
            {{else if $list.rank_change == 0}}
                <img class="no-change" data-src="https://imgs.genshuixue.com/0cms/d/file/content/2016/11/583d15fae7c60.png">
            {{/if}}
        </div>
    </div>
{{/foreach}}