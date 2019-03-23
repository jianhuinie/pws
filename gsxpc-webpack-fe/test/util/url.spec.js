import {
    parseUrl,
    getOriginPath,
    getCurrentEnv,
    formatRequestUrl,
    skipScheme,
    getUploadFileUrl
} from '../../util/url';

describe('URL 相关处理', () => {

    it('parseUrl - 解释 URL 中的 query 为键值对', () => {
        expect(parseUrl('http://domain.com/path/?a=b&c=1')).toEqual({a: 'b', c: '1'});
        expect(parseUrl('')).toEqual({});
    });

    it('getOriginPath - 获取不带 query  的页面访问路径', () => {
        expect(getOriginPath()).toBe('http://127.0.0.1/');
    });

    describe('getCurrentEnv', () => {

        it('根据 host 判断当前环境', () => {
            expect(getCurrentEnv()).toBe('develop');
        });

        it('子域名为 test 时，环境为 test', () => {
            jsdom.reconfigure({
                url: 'http://test.genshuixue.com/path/to/page'
            });

            expect(getCurrentEnv()).toBe('test');
        });

        it('子域名为 beta 时，环境为 beta', () => {
            jsdom.reconfigure({
                url: 'http://beta.genshuixue.com/path/to/page'
            });

            expect(getCurrentEnv()).toBe('beta');
        });
    });

    describe('formatRequestUrl', () => {
        it('formatRequestUrl - test 域名时使用 test 的 API', () => {
            jsdom.reconfigure({
                url: 'https://test.genshuixue.com/path/to/page'
            });

            const apiURL = formatRequestUrl('/foo');

            expect(apiURL).toBe('https://test-www-api.genshuixue.com/foo');
        });


        it('formatRequestUrl - beta 域名时使用 beta 的 API', () => {
            jsdom.reconfigure({
                url: 'https://beta.genshuixue.com/path/to/page'
            });

            const apiURL = formatRequestUrl('/foo');

            expect(apiURL).toBe('https://beta-www-api.genshuixue.com/foo');
        });

        it('formatRequestUrl - dev 域名时使用 dev 的 API', () => {
            jsdom.reconfigure({
                url: 'https://dev.genshuixue.com/path/to/page'
            });

            const apiURL = formatRequestUrl('/foo');

            expect(apiURL).toBe('https://dev-www-api.genshuixue.com/foo');
        });

        it('formatRequestUrl - www 域名时使用线上 API', () => {
            jsdom.reconfigure({
                url: 'http://www.genshuixue.com/path/to/page'
            });

            const apiURL = formatRequestUrl('/foo');

            expect(apiURL).toBe('https://www-api.genshuixue.com/foo');
        });

        it('formatRequestUrl - 本地直接使用，不加前缀', () => {
            jsdom.reconfigure({
                url: 'http://localhost/path/to/page'
            });

            const apiURL = formatRequestUrl('/foo');

            expect(apiURL).toBe('/foo');
        });
    });

    describe('skipScheme', () => {
        it('缺少 a 参数时什么也不干', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('', true);

            expect(callback).not.toHaveBeenCalled();
        });

        it('进入订单详情页 - 新窗口打开', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=orderDetail&orderNumber=1', true);

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/orderDetail/1/0', '_blank');
        });

        it('进入订单详情页 - 当前窗口打开', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=orderDetail&orderNumber=1', false);

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/orderDetail/1/0', '_self');
        });

        it('进入订单列表页', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=orderList', false);

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/manage/orderList', '_self');
        });

        it('进入细胞课学习中心', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=classroomCellCourseDetail&cellClazzNumber=1', false);

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/courseCenter/1', '_self');
        });

        it('进入细胞课详情页', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=classDetail&courseNumber=1&subclazzNumber=2', false);

            expect(callback).toHaveBeenCalledWith('/pcweb/#/detail/cellClass/1/2', '_self');
        });

        it('进入联报课详情页', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=linkClassDetail&linkClazzNumber=1&cellClazzNumbers=2&subclazzNumbers=3', false);

            expect(callback).toHaveBeenCalledWith('/pcweb/#/detail/comboCourse/1/2/3', '_self');
        });

        it('进入联报课订单详情页', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=goBuyLinkClazz&linkClazzNumber=1&cellSubclazzNumbers=2&cellClazzNumbers=3');

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/submitLinkOrder/1/2/3', '_self');
        });

        it('跳转订单详情页 - MULTICELLULARITY 类型课程时，最后的参数应为 0', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=goPay&courseType=15&orderNumber=2');

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/orderDetail/2/0', '_self');
        });

        it('跳转订单详情页 - SUPPLEMENT 类型课程时，最后的参数应为 1', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=goPay&courseType=17&orderNumber=2');

            expect(callback).toHaveBeenCalledWith('/pcweb/#/student/orderDetail/2/1', '_self');
        });

        it('跳转订单详情页 - 其他类型课程时', () => {
            const callback = jest.fn();
            window.open = callback;

            skipScheme('/path/to/page?a=goPay&courseType=1&orderNumber=3');

            expect(callback).not.toBeCalled();
        });
    });

    describe('getUploadFileUrl', () => {
        it('本地直接使用，不加前缀', () => {
            jsdom.reconfigure({
                url: 'http://localhost/path/to/page'
            });

            const fileURL = getUploadFileUrl('/foo');

            expect(fileURL).toBe('https://test-api.wenzaizhibo.com/web/doc/fileUpload');
        });

        it('线上环境', () => {
            jsdom.reconfigure({
                url: 'http://www.genshuixue.com/path/to/page'
            });

            const fileURL = getUploadFileUrl('/foo');

            expect(fileURL).toBe('https://api.wenzaizhibo.com/web/doc/fileUpload');
        });
    });

});
