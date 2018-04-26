<div id="wrapper">
    <div id="scroller">
        <div class="pull-to-refresh">
            <div class="refresh-wrap">
                <span class="pull-indicator">
                    <div class="arrow-body"></div>
                    <div class="triangle-down"></div>
                </span>
                <span class="pull-text">下拉刷新</span>
                <div class="pull-spinner" style="display:none"></div>
            </div>
        </div>

        <div class="list-box">
            {{*详情*}}
            {{include file="page/studentRoom/orderDetail/_part/detail.tpl"}}
            {{*报名老师*}}
            {{include file="page/studentRoom/orderDetail/_part/signTeacher.tpl"}}
        </div>
    </div>
</div>
