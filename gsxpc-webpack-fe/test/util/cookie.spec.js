import {
    parseCookie
} from '../../util/cookie';

describe('Cookie 解释', () => {

    it('返回对应的 Cookie 值', () => {
        const cookie = 'name=dafo';

        expect(parseCookie(cookie)).toEqual({name: 'dafo'});
    });

    it('读真正的 Cookie', () => {
        const cookie = 'name=dafo';
        document.cookie = cookie;
        expect(parseCookie()).toEqual({name: 'dafo'});
    });

    it('没有 cookie 时应该返回空对象', () => {
        const cookie = '';

        expect(parseCookie(cookie)).toEqual({});
    });

    it('没有 cookie 值时应该返回空字符串', () => {
        const cookie = 'name=';

        expect(parseCookie(cookie)).toEqual({name: ''});
    });

});
