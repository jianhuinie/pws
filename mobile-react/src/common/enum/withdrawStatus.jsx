/**
 * @file 提现状态
 * @author zhanghuijian
 */

export const walletStatusEnum = {
    WAITING: 1, // 提现中
    SUCCESS: 2, // 提现成功 
    FAIL: 3 // 提现失败
};
export const walletStatusMap = new Map([
    [walletStatusEnum.WAITING, '提现中'],
    [walletStatusEnum.SUCCESS, '提现成功'],
    [walletStatusEnum.FAIL, '提现失败']
]);

export const walletStatusClassMap = new Map([
    [walletStatusEnum.WAITING, 'waiting'],
    [walletStatusEnum.SUCCESS, 'success'],
    [walletStatusEnum.FAIL, 'fail']
]);