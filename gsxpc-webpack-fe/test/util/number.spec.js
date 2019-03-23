import {
    addZero,
    formatPrice,
    priceHander
} from '../../util/number';

describe('数值相关处理', () => {

    it('addZero - 小于 10 的数字，左边补一个 0', () => {
        expect(addZero(1)).toBe('01');
        expect(addZero(2)).toBe('02');
        expect(addZero(3)).toBe('03');
        expect(addZero('1')).toBe('01');
        expect(addZero('2')).toBe('02');
        expect(addZero('3')).toBe('03');
    });

    it('addZero - 大于 10 时只转为字符串', () => {
        expect(addZero(10)).toBe('10');
        expect(addZero(21)).toBe('21');
        expect(addZero(22)).toBe('22');
        expect(addZero('18')).toBe('18');
        expect(addZero('72')).toBe('72');
        expect(addZero('83')).toBe('83');
    });

    it('formatPrice - 将价格从分转为元', () => {
        expect(formatPrice(100)).toBe(1);
        expect(formatPrice(21)).toBe(0.21);
        expect(formatPrice(1234)).toBe(12.34);
    });

    describe('priceHander - 限时折扣价格处理', () => {
        it('确定没有折扣', () => {
            const countDownStatus = 0;
            const result = priceHander({}, '', 1111, countDownStatus);
            expect(result).toEqual({});
        });

        it('没有折扣数据时 type 应为 3， 当前价格保持不变', () => {
            const price = 1111;
            const originaPrice = 2222;
            const countDownStatus = 1;
            const result = priceHander(null, originaPrice, price, countDownStatus);

            expect(result).toEqual({type: 3, nowPrice: price, prevPrice: originaPrice});
        });

        it('没有折扣数据时 type 应为 3， 当前价格保持不变，原价判定为 false 时置为空字符', () => {
            const price = 1111;
            const originaPrice = null;
            const countDownStatus = 1;
            const result = priceHander(null, originaPrice, price, countDownStatus);

            expect(result).toEqual({type: 3, nowPrice: price, prevPrice: ''});
        });

        it('有折扣数据且折扣类型为 1， 当前价格保持不变，原价为折扣价', () => {
            const discount = {price: 1000};
            const price = 1111;
            const originaPrice = null;
            const countDownStatus = 1;
            const result = priceHander(discount, originaPrice, price, countDownStatus);

            expect(result).toEqual({type: countDownStatus, nowPrice: price, prevPrice: discount.price});
        });

        it('有折扣数据且折扣类型为 2， 当前价格为折扣价，原价保持不变', () => {
            const discount = {price: 1000};
            const price = 1111;
            const originaPrice = null;
            const countDownStatus = 2;
            const result = priceHander(discount, originaPrice, price, countDownStatus);

            expect(result).toEqual({type: countDownStatus, nowPrice: discount.price, prevPrice: price});
        });

        it('有折扣数据且折扣类型为 3， 当前价格保持不变', () => {
            const discount = {price: 1000};
            const price = 1111;
            const originaPrice = 2222;
            const countDownStatus = 3;
            const result = priceHander(discount, originaPrice, price, countDownStatus);

            expect(result).toEqual({type: countDownStatus, nowPrice: price, prevPrice: originaPrice});
        });

        it('有折扣数据且折扣类型为 3， 当前价格保持不变，原价判定为 false 时置为空字符', () => {
            const discount = {price: 1000};
            const price = 1111;
            const originaPrice = null;
            const countDownStatus = 3;
            const result = priceHander(discount, originaPrice, price, countDownStatus);

            expect(result).toEqual({type: countDownStatus, nowPrice: price, prevPrice: ''});
        });

        it('有折扣数据且折扣类型不在 [1,3] 范围， 返回空对象', () => {
            const discount = {price: 1000};
            const price = 1111;
            const originaPrice = null;
            const countDownStatus = 4;
            const result = priceHander(discount, originaPrice, price, countDownStatus);

            expect(result).toEqual({});
        });

    });
});
