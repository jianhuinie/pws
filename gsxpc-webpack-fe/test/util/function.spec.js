import {
    debounce,
    throttle
} from '../../util/function';

describe('函数相关处理', () => {

    it('debounce - 100 毫秒内不管调用多少次，实际只会执行一次', done => {
        const callback = jest.fn();
        const delay = 100;
        const debounced = debounce(callback, delay);

        debounced();
        debounced();
        debounced();

        expect(callback).not.toBeCalled();

        setTimeout(() => {
            expect(callback).toHaveBeenCalledTimes(1);
            done();
        }, delay);
    });

    it('throttle - 100 毫秒内不管调用多少次，都不会执行，在 100 毫秒后调用才会执行一次', done => {
        const callback = jest.fn();
        const delay = 100;
        const throttled = throttle(callback, delay);

        throttled();
        throttled();
        throttled();

        expect(callback).not.toBeCalled();

        setTimeout(() => {
            throttled();
            expect(callback).toHaveBeenCalledTimes(1);

            throttled();
            expect(callback).toHaveBeenCalledTimes(1);

            done();
        }, delay);
    });
});
