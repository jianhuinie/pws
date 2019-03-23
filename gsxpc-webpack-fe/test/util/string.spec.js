import {
    replaceSpace
} from '../../util/string';

describe('函数相关处理', () => {

    it('replaceSpace - null 或 undefined 时返回空字符', () => {
        expect(replaceSpace()).toBe('');
    });

    it('replaceSpace - 替换字符串中的所有空格', () => {
        expect(replaceSpace(' hello  -world   ')).toBe('hello-world');
    });
});
