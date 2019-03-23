import {
    getMdDate,
    timeHandler,
    formatDate
} from '../../util/date';

describe('日期相关处理', () => {

    it('getMdDate - 格式化月日', () => {
        expect(getMdDate('2019/1/15')).toBe('1月15日');
        expect(getMdDate('2019/12/15')).toBe('12月15日');
        expect(getMdDate('2019/2/29')).toBe('3月1日');
    });

    it('timeHandler - 替换 `-` 为 `.`', () => {
        expect(timeHandler('2019-1-15')).toBe('2019.1.15');
        expect(timeHandler('2019-01-15 10:20:30')).toBe('2019.01.15');
        expect(timeHandler('2019-12-15')).toBe('2019.12.15');
        expect(timeHandler('2019-2-29')).toBe('2019.2.29');
    });

    it('formatDate - 替换 `-` 为 `/` 或指定的字符', () => {
        expect(formatDate('2019-1-15')).toBe('2019/1/15');
        expect(formatDate('2019-12-15')).toBe('2019/12/15');
        expect(formatDate('2019-2-29')).toBe('2019/2/29');
        expect(formatDate('2019-2-29', '、')).toBe('2019、2、29');
    });

});
