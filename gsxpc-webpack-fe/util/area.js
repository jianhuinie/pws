/**
 * @file 地区处理
 * @author dafo<huanghoujin@baijiahulian.com>
 */
/**
 * 拼接详细地址
 *
 * @param {Object} area  区域对象
 * @return {string} 拼接后的省市区字符串
 */
export const getFullArea = area => area.province.name + area.city.name + area.district.name;
