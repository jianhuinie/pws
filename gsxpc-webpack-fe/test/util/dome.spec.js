import {
    hasClass,
    addClass,
    removeClass,
    toggleClass,
    renderLeftSider,
    postMessage,
    chatToKefuIm
} from '../../util/dom';

describe('dom - class 相关操作', () => {
    it('hasClass', () => {
        const el = document.createElement('div');
        const className = 'hello';

        expect(hasClass(el, className)).toBeFalsy();

        el.className  = className;
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

    it('postMessage - 使用模拟的对象', () => {
        const callback = jest.fn();
        const mock = {
            postMessage: callback
        };
        const message = {foo: 'bar'};

        postMessage(message, mock);

        expect(callback).toHaveBeenNthCalledWith(1, message, '*');
    });

    it('postMessage - 使用顶层 window 对象', () => {
        const callback = jest.fn();
        top.postMessage = callback;
        const message = {foo: 'bar'};

        postMessage(message);

        expect(callback).toHaveBeenNthCalledWith(1, message, '*');
    });

    it('renderLeftSider - 左侧菜单高亮状态与 URL 中 hash 指定的一致', () => {
        document.body.innerHTML = `
            <aside class="nav-page">
                <ul>
                    <li class="path-tab" data-path="foo">foo</li>
                    <li class="path-tab" data-path="bar">bar</li>
                    <li class="path-tab" data-path="foobar">foobar</li>
                </ul>
            </aside>
        `;

        const list = document.querySelectorAll('li');
        const activeClass = 'active';

        history.pushState(null, 'foo', '#foo');

        renderLeftSider();

        expect(hasClass(list[0], activeClass)).toBeTruthy();
        expect(hasClass(list[1], activeClass)).toBeFalsy();
        expect(hasClass(list[2], activeClass)).toBeFalsy();


        history.pushState(null, 'bar', '#bar');

        renderLeftSider();

        expect(hasClass(list[0], activeClass)).toBeFalsy();
        expect(hasClass(list[1], activeClass)).toBeTruthy();
        expect(hasClass(list[2], activeClass)).toBeFalsy();


        history.pushState(null, 'foobar', '#foobar');

        renderLeftSider();

        // 包含相同前缀时会同时高亮，不知是否符合预期
        expect(hasClass(list[0], activeClass)).toBeTruthy();
        expect(hasClass(list[1], activeClass)).toBeTruthy();
        expect(hasClass(list[2], activeClass)).toBeTruthy();


    });

    it('chatToKefuIm - 没有 iframe 时调用顶层窗口的 postMessage', () => {
        const callback = jest.fn();
        top.postMessage = callback;

        const message = {
            isSetIframeParam: true,
            isChatToKefu: true
        };

        chatToKefuIm();

        expect(callback).toHaveBeenNthCalledWith(1, message, '*');
    });

    it('chatToKefuIm - 模拟一个 iframe', () => {
        const callback = jest.fn();
        Object.defineProperty(window.frames, '0', {
            configurable: true,
            value: {postMessage: callback}
        });
        const message = {
            isSetIframeParam: true,
            isChatToKefu: true
        };

        chatToKefuIm();

        expect(callback).toHaveBeenNthCalledWith(1, message, '*');
    });

});
