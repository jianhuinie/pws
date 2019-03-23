import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from '../../components/Icon';

Enzyme.configure({adapter: new Adapter()});

describe('Icon 组件渲染', () => {
    it('应该包含类型和角色', () => {
        const icon = shallow(<Icon type="test" onClick={jest.fn()} />);
        const element = icon.find('i');
        expect(element.prop('className')).toBe('icon icon-test');
        expect(element.prop('role')).toBe('button');
    });

    it('在 Icon 上点击或按键时，应该调用 onClick', () => {
        const callback = jest.fn();
        const icon = shallow(<Icon type="test" onClick={callback} />);

        const element = icon.find('i');
        element.simulate('click');
        expect(callback).toBeCalledTimes(1);
        element.simulate('keypress');
        expect(callback).toBeCalledTimes(2);
    });
});
