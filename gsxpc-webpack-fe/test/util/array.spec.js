import {
    findWhere,
    getIndexForVal,
    contactMoreDataList
} from '../../util/array';

describe('数组处理', () => {

    it('findWhere - 根据属性值查找', () => {
        const tags = [
            {name: 'P', type: 'block'},
            {name: 'A', type: 'inline'},
            {name: 'FORM', type: 'inline-block'}
        ];

        expect(findWhere(tags, 'name', 'A')).toBe(tags[1]);
        expect(findWhere(tags, 'type', 'block')).toBe(tags[0]);

        expect(findWhere(tags, 'name', 'DIV')).toBeUndefined();
        expect(findWhere(tags, 'type', 'embed')).toBeUndefined();
    });

    it('getIndexForVal', () => {
        const tags = [
            {name: 'P', type: 'block'},
            {name: 'A', type: 'inline'},
            {name: 'FORM', type: 'inline-block'}
        ];

        expect(getIndexForVal(tags, 'name', 'A')).toBe(1);
        expect(getIndexForVal(tags, 'type', 'block')).toBe(0);
        expect(getIndexForVal(tags, 'name', 'DIV')).toBe(-1);

    });

    describe('contactMoreDataList', () => {
        it('isClear 为 true 时，返回 newList', () => {
            const oldList = ['whatever'];
            const newList = ['bingo'];

            const list = contactMoreDataList(oldList, newList, true);
            expect(list).toBe(newList);
        });

        it('isClear 为 true 时，返回 newList， 如果 newList 判断为 false，则返回空列表', () => {
            const oldList = ['whatever'];
            const newList =  null;

            const list = contactMoreDataList(oldList, newList, true);
            expect(list).not.toBe(newList);
            expect(list.length).toBe(0);
        });

        it('isClear 为 false 时，如果 newList 判断为 false，则返回 oldLIist', () => {
            const oldList = ['whatever'];
            const newList =  null;

            const list = contactMoreDataList(oldList, newList, false);
            expect(list).toBe(oldList);
        });

        it('isClear 为 false 时，如果 newList 和 oldList 都判断为 false，则返回空列表', () => {
            const oldList =  null;
            const newList =  false;

            const list = contactMoreDataList(oldList, newList, false);
            expect(list.length).toBe(0);
        });

        it('isClear 为 false 时，如果 newList 非空而 oldList 判断为 false 或空，则返回 newList', () => {
            const oldList =  false;
            const newList =  ['bingo'];

            const list = contactMoreDataList(oldList, newList, false);
            expect(list).toBe(newList);
        });

        it('isClear 为 false 时，如果 newList 和 oldList 皆非空，则返回它们拼接后的列表', () => {
            const oldList =  ['hello'];
            const newList =  ['world'];

            const list = contactMoreDataList(oldList, newList, false);
            expect(list).toEqual(['hello', 'world']);
        });
    });
});
