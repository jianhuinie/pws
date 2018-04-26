<!-- var: allText = '全部' -->
<!-- var: waitingForPay = "待支付" -->
<!-- var: wipText = "进行中" -->
<!-- var: commentText = "待评价" -->

    <span class="nav-item active" data-status = 1 >
        ${allText}
        <i class="text-primary">
            
        </i>
    </span>

    <span class="nav-item" data-status = 2 >
            ${waitingForPay}
        <i class="text-primary">
            <!-- if: ${data.waiting_for_pay} -->
                ${data.waiting_for_pay}
            <!-- /if -->
        </i>
    </span>

    <a class="nav-item" data-status = 3 >
        ${wipText}
        <i class="text-primary">
            <!-- if: ${data.wip} -->
                ${data.wip}
            <!-- /if -->
        </i>
    </a>

    <a class="nav-item" data-status = 4 >
        ${commentText}
        <i class="text-primary">
            <!-- if: ${data.comment} -->
                ${data.comment}
            <!-- /if -->
        </i>
    </a>
