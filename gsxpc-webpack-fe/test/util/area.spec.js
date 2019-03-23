import {
    getFullArea
} from '../../util/area';

describe('area 工具模块', () => {

    it('getFullArea 应该返回拼接的地区全称', () => {
        const city = {
            province: {
                name: '广东省'
            },
            city: {
                name: '佛山市'
            },
            district: {
                name: '禅城区'
            }
        };

        const fullNameOfCity = getFullArea(city);

        expect(fullNameOfCity).toBe('广东省佛山市禅城区');
    });
});
