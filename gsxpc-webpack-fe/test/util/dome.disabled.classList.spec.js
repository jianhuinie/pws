import '../mock/disable.classList';
import {
    hasClass,
    addClass,
    removeClass,
    toggleClass
} from '../../util/dom';

describe('dom - class 相关操作', () => {
    it('hasClass', () => {
        const el = document.createElement('div');
        const className = 'hello';

        expect(hasClass(el, className)).toBeFalsy();

        el.className = className;
        expect(hasClass(el, className)).toBeTruthy();
    });

    it('addClass - 未包含才添加', () => {
        const el = document.createElement('div');
        const className = 'hello';
        addClass(el, className);

        expect(el.className).toBe(className);
    });

    it('addClass - 包含了无需添加', () => {
        const el = document.createElement('div');
        const className = 'hello';
        el.className = 'hello world';
        addClass(el, className);

        expect(el.className).toBe('hello world');
    });

    it('removeClass - 包含指定 className 时才删除', () => {
        const el = document.createElement('div');
        const className = 'hello';
        el.className = 'hello world';
        removeClass(el, className);

        expect(el.className).toBe('world');
    });

    it('removeClass -  未包含指定 className 时忽略', () => {
        const el = document.createElement('div');
        const className = 'hi';
        el.className = 'hello world';
        removeClass(el, className);

        expect(el.className).toBe('hello world');
    });

    it('toggleClass - 包含指定 className 时才会切换', () => {
        const el = document.createElement('div');
        const className = 'world';
        el.className = 'hello world';

        toggleClass(el, className);

        expect(el.className).toBe('hello');

        toggleClass(el, className);

        expect(el.className).toBe('hello world');
    });
});
