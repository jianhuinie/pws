<!-- for: ${order_list} as ${data} -->
    <!-- if: !${data.course_type} == "3" -->
        <!-- var: isVideoCourse = 1 -->
    <!-- else -->
        <!-- var: isVideoCourse = 0 -->
    <!-- /if -->
    <div class="order-item" data-teachernum="${data.teacher_user_number}" data-teachername="${data.teacher_user_name}">
     <div class="order-header">
         <span class="order-price">
             <!-- if: ${data.fenqi_flag} && ${data.fenqi_flag} == 2 -->
                 <span class="can-stage">分期购</span>
             <!-- /if -->
             <!-- if: ${data.course_type} == "3" -->
                     价格：
             <!-- else -->
                 总价：
             <!-- /if -->
             <span class="new-price">￥
                 ${data.pay_money|number_format(2)}
             </span>
             <!-- if: ${data.pre_pay_money} >= 0 -->
                 <del class="old-price">￥
                     ${data.pre_pay_money|number_format(2)}
                 </del>
             <!-- /if -->
         </span>
         <span class="order-date">
             ${data.create_time|dataForamt}
         </span>
         <span class="order-id">
             订单号：${data.purchase_id}
         </span>
         <!-- if: ${data.course_type} == "2" || ${data.course_type} == "3" || ${data.course_type} == "4" || ${data.course_type} == "11" || ${data.course_type} == "12" -->
             <!-- if: ${data.status} == "wait_for_pay" && ${data.expired_length} && ${data.expired_length} > 0 -->
                 <span class="pay-tip text-primary">
                     请立即支付 
                     <span class="getExpiredLength" style="display:none;">${data.expired_length}</span>
                     <span class="getPurchaseId" style="display:none;">${data.purchase_id}</span>
                     <span id="count-down-${data.purchase_id}" class="count-down"  >
                         ${data.expired_length|getDeadLineTime(1)}:${data.expired_length|getDeadLineTime(2)}:${data.expired_length|getDeadLineTime(3)}
                     </span>
                     后订单将失效
                 </span>
                 
                 
                 
             <!-- /if -->
         <!-- /if -->
         <!-- if: ${data.user_name} && ${data.course_type} == "1" -->
             <!-- if: ${userType|getUserType} == 0 -->
                 <!-- if: ${data.qreserve_sign} && ${data.qreserve_sign} == 1 -->
                     <i class="icon icon-lightning-circle" data-title="${data.display_name}为你开启了闪电约课，你向该学生约课将被自动确认。
                     <!-- if: ${data.use_plat_ensure|defaultUsePlateEnsure} == 0 --> 
                         课程结束后系统会自动支付课酬。
                     <!-- /if -->
                    " data-width="20em"></i>
                 <!-- else -->
                     <i class="icon icon-lightning-o" data-title="闪电约课未开启。学生为你开启闪电约课后，你发起的约课会被系统自动确认。" data-width="21em"></i>
                 <!-- /if -->  
             <!-- elif: ${userType|getUserType} == 2 --> 
                 <!-- if: ${data.qreserve_sign} && ${data.qreserve_sign} == 1 -->
                     <i class="icon icon-lightning-circle close-qreserve" data-title="你为${data.display_name}开启了闪电约课，TA向你约课及时间修改系统将会自动确认，如需取消请点击闪电标识" data-width="20em" data-user-num="${data.teacher_user_number}"></i>
                 <!-- else -->
                     <i class="icon icon-lightning-o open-qreserve" data-title="点击开启闪电约课，${data.display_name}向你发起的约课及时间修改系统将会自动确认" data-width="20em" data-user-num="${data.teacher_user_number}"></i>
                 <!-- /if -->
             <!-- /if -->
         <!-- /if --> 
         <i class="icon icon-ic-safeguard<!-- if: ${data.use_plat_ensure|defaultUsePlateEnsure} --> use-plat-ensure"<!-- /if -->data-title="<!-- if: !(${data.use_plat_ensure|defaultUsePlateEnsure}) -->平台支付保障已关闭，不支持随时退<!-- /if -->${data|getRetireText(${userType|getUserType})}" data-width="20em"></i> 
             
     </div>

     <!-- if: ${data.course_type} == "5" -->
         <table class="order-body">
             <tbody>
                 <tr>
                     <td class="course-info">
                         <span class="course-name">
                            ${data.course_name}
                         </span>
                         <span class="user-name" data-title="${data.display_name}" data-width="20em">
                             <!-- if: ${userType|getUserType} == 2 -->
                                 <a href="/${data.private_domain}" target="_blank">${data.display_name|truncate(6)}</a>
                             <!-- else -->
                                 ${data.display_name|truncate(6)}
                             <!-- /if -->
                         </span>
                         <label class="trial-course-label">
                             试听课
                         </label>
                         <div>
                             <span class="label-default small">
                                 <!-- if: ${data.lesson_way} == "2" -->
                                     在线试听
                                 <!-- elif: ${data.lesson_way} == "4" -->
                                     线下试听
                                 <!-- /if -->
                             </span>
                         </div>
                     </td>
                     <td class="study-progress">
                         总价：￥${data.pay_money|number_format(2)}
                         <!-- if: ${data.status} -->
                            <span class="order-status">${data.status|getOrderStatus(${isVideoCourse})}</span>
                         <!-- /if -->
                         <div class="progress tiny">
                             <div class="progress-bar-info" style="width:<!-- if: ${data.hours} != "0.0" -->${data.progress|widthPercent(${data.hours})}<!-- /if -->%;">
                             </div>
                         </div>
                        <!-- if: !${data.progress} || ${data.progress} == 0 -->
                            已完成0/${data.hours}小时
                        <!-- else -->
                            已完成${data.progress|getPercent}/${data.hours}小时
                        <!-- /if -->
                     </td>
                     <td class="order-action">
                         <!-- if: ${data.order_url.reserve_lesson_url} -->
                             <!-- if: ${data.order_url.reserve_lesson_status} == 1 -->
                                 <!-- if: ${userType|getUserType} == 2 -->
                                     <a class="btn-link tiny btn-block invite-reserve" data-pid="${data.purchase_id}">
                                         请老师排课
                                     </a>
                                 <!-- else -->
                                     <a class="btn-link tiny btn-block" href="${data.order_url.reserve_lesson_url}" target="_blank">
                                         为学生排课
                                     </a>
                                 <!-- /if -->
                             <!-- /if -->
                         <!-- /if -->
                         <!-- if: ${data.order_url.confirm_pay_url} -->
                             <span class="btn-link tiny btn-block confirm-pay" data-url="${data.order_url.confirm_pay_url}"> 
                                 确认支付
                             </span>
                         <!-- /if -->
                         <!-- if: ${data.order_url.comment_url} && !(${data.hideCommentBtn}) -->
                             <a class="btn-link tiny btn-block comment-order" href="${data.order_url.comment_url}" target="_blank" >
                                 评价
                             </a>
                         <!-- /if -->
                         <!-- if: ${data.status} && ${data.status} == "appeal_over" -->
                             <a class="btn-link tiny btn-block" data-width="23em" data-title="${data.appeal_result_text}">
                                 申诉结果
                             </a>
                         <!-- /if -->
                         <!-- if: ${data.order_url.order_detail_url} -->
                             <a class="btn-link tiny btn-block" href="${data.order_url.order_detail_url}" target="_blank">
                                 查看详情
                             </a>
                         <!-- /if -->
                         <!-- if: ${data.order_url.cancel_order_url} -->
                             <span class="btn-link tiny btn-block cancel-order"data-url="${data.order_url.cancel_order_url}"data-price="${data.rest_prices}" data-status="${data.status}">
                             <!-- if: ${userType|getUserType} == 2 && ${data.status} == "pay_success" && ${data.rest_prices} != "0.0" -->
                                 申请退款
                             <!-- else -->
                                 取消订单
                             <!-- /if -->
                             </span>
                         <!-- /if -->
                         <!-- if: ${data.use_plat_ensure} && ${data.order_url.appeal_url} -->
                             <span class="btn-link tiny btn-block appeal-order" data-url="${data.order_url.appeal_url}">
                                 <!-- if: ${userType|getUserType} == 2 && ${data.price} > 0 -->
                                     申请退款
                                 <!-- else -->
                                     我要申诉
                                 <!-- /if -->
                             </span>
                         <!-- /if -->
                         <!-- if: ${userType|getUserType} == 0 && ${data.pay_status} == 0 -->
                             <span class="btn-link tiny btn-block edit-price" data-isclasscourse="2" data-purchase-id="${data.purchase_id}" data-order="" >
                                 修改价格
                             </span>
                         <!-- /if -->
                         <!-- if: ${userType|getUserType} == 2 && (${data.status} == "normal_over" || ${data.status} == "canceled" || ${data.status} == "refunded" || ${data.status} == "refund_success") -->
                             <span class="btn-link tiny btn-block delete-order" data-id="${data.purchase_id}">
                                 删除订单
                             </span>
                         <!-- /if -->
                     </td>
                 </tr>
             </tbody>
         </table>
     <!-- else --> 
         <table class="order-body">
             <tbody>
                 <tr>
                     <td class="course-info">
                         <!-- if: ${data.course_type} == "3" && ${data.title_verify_status} -->
                             <span class="course-name wrong-title">
                                 <i class="icon icon-info-circle"></i>
                                 该课程标题包含违规内容，请等待老师修改完成后，再进行查看
                             </span>
                         <!-- else -->
                             <span class="course-name"
                                 <!-- if: ${data.course_name|truncate(10)} != ${data.course_name} -->
                                     data-title="${data.course_name}"
                                 <!-- /if -->
                                      >
                                <!-- if: ${userType|getUserType} == 2 && ${data.course_type} == "2" -->
                                     <a href="/teacher/classCourseDetail/${data.course_number}" target="_blank">${data.course_name|truncate(10)}</a>
                                 <!-- elif: ${data.course_type} == "3" && ${userType|getUserType} == 2 -->
                                     <a href="/video_course/getcourseshowdetail?number=${data.course_number}&user_number=${data.teacher_user_number}" target="_blank">${data.course_name|truncate(10)}</a>
                                 <!-- else -->
                                      ${userType|getUserType}${data.course_name|truncate(10)}
                                 <!-- /if -->
                             </span>
                         <!-- /if -->
                         <!-- if: ${data.trade_info} && !(${data.course_type} == "3" && ${data.title_verify_status}) -->
                             <span class="class-info"
                                 <!-- if: ${data.trade_info|truncate(5)} != ${data.trade_info} -->
                                     data-title="${data.trade_info}"
                                 <!-- /if -->
                             >
                                ${data.trade_info|truncate(5)}
                             </span> 
                         <!-- /if -->
                         <!-- if: ${data.course_type} == "2" || ${data.course_type} == "4" || ${data.course_type} == "12" -->
                             <label class="class-course-label">
                                 班课
                             </label>
                         <!-- /if -->
                         <!-- if: ${data.course_type} == "3" && !${data.title_verify_status} -->
                             <label class="video-course-label">
                                 视频课
                             </label>
                         <!-- /if -->
                         <!-- if: !(${data.course_type} == "3" && ${data.title_verify_status}) && ${data.display_name} -->
                             <span class="user-name">
                                 <!-- if: ${userType|getUserType} == 2 -->
                                     <a href="/${data.private_domain}" target="_blank">${data.display_name}</a>
                                 <!-- else -->
                                     ${data.display_name}
                                 <!-- /if -->
                             </span>
                         <!-- /if -->
                    
                         <div>
                             <!-- if: ${data.course_type} != "3" -->
                                 <!-- if: ${data.course_type} == "2" || ${data.course_type} == "4" || ${data.course_type} == "11" || ${data.course_type} == "12" -->
                                     <!-- if: ${data.lesson_way|getLessonWay} == "在线授课" -->
                                         <strong>上课方式：</strong>在线授课
                                     <!-- else -->
                                         <strong>上课地点：</strong>
                                         <!-- if: ${data.address_area.full_address} -->
                                             <span data-title="${data.address_area.full_address}" data-width="20em">
                                                 ${data.address_area.full_address|truncate(22)}
                                             </span>
                                        <!-- else -->
                                            <span>待定</span>
                                         <!-- /if -->
                                     <!-- /if -->
                                 <!-- else -->
                                     <span class="label-default small">
                                         ${data.lesson_way|getLessonWay}
                                     </span>
                                     <span class="new-price">
                                         ￥${data.price|number_format(2)}/小时
                                     </span>
                                     <!-- if: ${data.pre_pay_money} >= 0 && ${data.hours} > 0 -->
                                     <span class="old-price">
                                         (<del>￥${data.pre_pay_money|oldPricePer(data.hours)|number_format(2)}/小时</del>)
                                     </span>
                                     <!-- /if -->
                                 <!-- /if -->
                             <!-- else -->
                                 <!-- if: ${data.hours} == 0 -->
                                     随时看
                                 <!-- else -->
                                     <span>观看有效期：${data.valid_days}天</span>
                                 <!-- /if -->
                             <!-- /if -->
                         </div>
                     </td>

                     <td class="study-progress">
                         <!-- if: ${data.course_type} == "3" -->
                             价格
                         <!-- else -->
                             总价
                         <!-- /if -->: ￥${data.pay_money|number_format(2)}
                            <!-- if: ${data.status} -->
                                <span class="order-status">${data.status|getOrderStatus(${isVideoCourse})}</span>
                            <!-- /if -->
                         <!-- if: ${data.course_type} != "4" -->
                             <div class="progress tiny">
                                <div class="progress-bar-info" style="width:<!-- if: ${data.course_type} == "3" && ${data.course_items_count} -->${data.current_index|widthPercent(${data.course_items_count}, 1)}<!-- elif: (${data.course_type} == "11" || ${data.course_type} == "12") && ${data.hours} != "0.0"-->${data.succ_confirm_count|widthPercent(${data.hours}, 1)}<!-- elif: ${data.hours} != "0.0" -->${data.progress|widthPercent(${data.hours})}<!-- /if -->%;" >
                                 </div>
                             </div>
                             <!-- if: ${data.course_type} == "3" -->
                                 已学习${data.current_index}/${data.course_items_count}课节
                             <!-- else -->
                                 <!-- if: ${data.course_type} == "2" -->
                                    <!-- if: !${data.progress} || ${data.progress} == 0 -->
                                        已完成0/${data.hours}课节
                                    <!-- else -->
                                        已完成${data.progress|getPercent}/${data.hours}课节
                                    <!-- /if -->
                                 <!-- elif: ${data.course_type} == "11" || ${data.course_type} == "12" -->
                                     已完成${data.succ_confirm_count}/${data.hours}课时
                                 <!-- else -->
                                     <!-- if: !${data.progress} || ${data.progress} == 0 -->
                                        已完成0/${data.hours}课时
                                    <!-- else -->
                                        已完成${data.progress|getPercent}/${data.hours}课时
                                    <!-- /if -->
                                 <!-- /if -->
                             <!-- /if -->
                         <!-- /if -->
                     </td>

                     <td class="order-action">
                         <!-- if: ${data.order_url.reserve_lesson_url} -->
                             <!-- if: ${data.order_url.reserve_lesson_status} == 1 -->
                                 <!-- if: ${userType|getUserType} == 2 -->
                                     <a class="btn-link tiny btn-block" href="${data.order_url.reserve_lesson_url}" target="_blank">
                                         发起约课
                                     </a>
                                     <a class="btn-link tiny btn-block invite-reserve" data-pid="${data.purchase_id}">
                                         请老师排课
                                     </a>
                                 <!-- else -->
                                     <a class="btn-link tiny btn-block" href="${data.order_url.reserve_lesson_url}" target="_blank">
                                         为学生排课
                                     </a>
                                 <!-- /if -->
                             <!-- /if -->
                         <!-- /if -->

                         <!-- if: ${data.order_url.confirm_pay_url} -->
                             <!-- if: ${data.course_type} == "4" -->
                                 <span class="btn-link tiny btn-block confirm-nosuccess-pay" data-pid="${data.purchase_id}" data-url="${data.order_url.confirm_pay_url}" 
                                     确认支付
                                 </span>
                             <!-- else -->
                                 <span class="btn-link tiny btn-block confirm-pay" data-url="${data.order_url.confirm_pay_url}" 
                                 <!-- if: ${data.course_type} == "3" -->
                                     data-video-course="true" data-lesson-type="${data.video_lesson_type}" 
                                 <!-- /if -->
                                 >确认支付
                                 </span>
                             <!-- /if -->
                         <!-- /if -->

                         <!-- if: ${data.order_url.comment_url} && !(${data.hideCommentBtn}) -->
                             <a class="btn-link tiny btn-block comment-order" href="${data.order_url.comment_url}" target="_blank" >
                                 评价
                             </a>
                         <!-- /if -->

                         <!-- if: ${data.status} && ${data.status} == "appeal_over" -->
                             <a class="btn-link tiny btn-block" data-width="23em" data-title="${data.appeal_result_text}">
                                 申诉结果
                             </a>
                         <!-- /if -->
                        
                         <!-- if: ${data.order_url.order_detail_url} -->
                             <a class="btn-link tiny btn-block" href="${data.order_url.order_detail_url}" target="_blank">
                                 查看详情
                             </a>
                         <!-- /if -->

                         <!-- if: ${userType|getUserType} == 0 && ${data.pay_status} == 0 && ${data.course_type} != "3" -->
                             <!-- if: ${data.is_prefer_normal_course} -->
                                 <span class="btn-link tiny btn-block" data-title="该类型订单暂不支持修改价格">
                                     修改价格
                                 </span>
                             <!-- else -->
                                 <span class="btn-link tiny btn-block edit-price" data-isclasscourse="2" data-purchase-id="${data.purchase_id}" data-order="${data|toJsonString}" >
                                     修改价格
                                 </span>
                             <!-- /if -->
                         <!-- /if -->
                
                         <!-- if: ${data.course_type} == "11" || ${data.course_type} == "12" -->
                             <!-- if: ${data.use_plat_ensure} && ${data.retire_flag} == 0 && ${data.order_status} == 10 && ${data.refund_status} != 1 -->
                                 <a class="btn-link tiny btn-block" href="/pay/refund?purchase_id=${data.purchase_id}">
                                     <!-- if: ${data.refund_status} == 2 || ${data.refund_status} == 3 -->
                                         申请退款
                                     <!-- elif: ${data.refund_status} == 0 -->
                                         退款中
                                     <!-- /if -->
                                 </a>
                             <!-- /if -->
                         <!-- /if -->

                         <!-- if: ${userType|getUserType} == 2 && (${data.status} == "normal_over" || ${data.status} == "canceled" || ${data.status} == "refunded" || ${data.status} == "refund_success" || (${data.course_type} == "3" && ${data.status} == "pay_success")) -->
                             <span class="btn-link tiny btn-block delete-order" data-id="${data.purchase_id}">
                                 删除订单
                             </span>
                         <!-- /if -->

                         <!-- if: ${data.order_url.cancel_order_url} -->
                             <span class="btn-link tiny btn-block cancel-order" data-url="${data.order_url.cancel_order_url}" data-price="${data.rest_prices}" data-status="${data.status}">
                                 <!-- if: ${data.parent_purchase_type} == 4 -->
                                     <!-- if: ${userType|getUserType} == 2 && ${data.status} == "wait_for_pay" -->
                                         取消订单
                                     <!-- /if -->
                                 <!-- elif: ${data.course_type} != "4" && ${data.course_type} != "11" && ${data.course_type} != "12" -->
                                     <!-- if: ${userType|getUserType} == 2 && ${data.course_type} == "2" && ${data.price} == 0 -->
                                         取消订单
                                     <!-- elif: ${userType|getUserType} == 2 && ${data.status} == "pay_success" && ${data.rest_prices} != "0.0" -->
                                         申请退款
                                     <!-- else -->
                                         取消订单
                                     <!-- /if -->
                                 <!-- else -->
                                     <!-- if: ${userType|getUserType} == 2 && ${data.status} == "wait_for_pay" -->
                                         取消订单
                                     <!-- /if -->
                                 <!-- /if -->
                             </span>
                         <!-- /if -->

                         <!-- if: ${data.use_plat_ensure} && ${data.order_url.appeal_url} -->
                             <span class="btn-link tiny btn-block appeal-order" data-url="${data.order_url.appeal_url}">
                                 <!-- if: ${userType|getUserType} == 2 && ${data.price} > 0 -->
                                     申请退款
                                 <!-- else -->
                                     我要申诉
                                 <!-- /if -->
                             </span>
                         <!-- /if -->
                     </td>
                 </tr>
             </tbody>
         </table> 
     <!-- /if -->
    </div>
     
<!-- /for -->