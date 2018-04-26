/**
 * @file 钱包明细类型
 * @author zhanghuijian
 */


 export const walletTypeEnum = {
    ALL: 0, // 全部不传，方便使用定为0
    LIVE: 1, // 直播课
    RELAY: 2, // 视频课
    SERIES: 3, // 系列课
    WITHDRAW: 4, // 提现
    FEE: 6, // 手续费
    OTHER: 5, // 其他，暂时只有创建课堂
};
export const walletTypeMap = new Map([
    [0, '全部'],
    [1, '直播课'],
    [2, '视频课'],
    [3, '系列课'],
    [4, '提现'],
    [5, '其他'],
    [6, '支付手续费']
]);