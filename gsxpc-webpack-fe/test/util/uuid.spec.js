/**
 * @file UUID 生成测试
 * @author dafo<huanghouin@baijiahulian.com>
 */
import uuid from '../../util/uuid';

test('uuid', () => {
    const uuid1 = uuid();
    const uuid2 = uuid();
    const uuid3 = uuid();

    expect(uuid1).not.toBe(uuid2);
    expect(uuid1).not.toBe(uuid3);
    expect(uuid2).not.toBe(uuid3);
    expect(uuid1.length).toBe(36);
    expect(uuid1.length).toBe(uuid2.length);
    expect(uuid1.length).toBe(uuid3.length);
});
