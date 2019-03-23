/**
 * 联报优惠tab
 * @author xiazhiyao
 */
import {PureComponent} from 'react';
import './index.styl';

class LinkClazzTab extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            linkItems: props.linkItems,
            activeNumber: '',
        };
    }

    componentDidMount() {
        this.setActiveNumber();
    }

    onTabChange = e => {
        e.stopPropagation();
        const {activeNumber} = this.state;
        const number = +e.target.dataset.number;
        const index = +e.target.dataset.index;
        if (!isNaN(number) && number !== void 0 && number !== activeNumber) {
            this.setState({activeNumber: number});
            this.props.onLinkClazzTabChange(index);
        }
    }

    // 设置tab第一个为默认值
    setActiveNumber = () => {
        const {linkItems} = this.state;
        this.setState({activeNumber: linkItems[0].number});
    }

    showTabName = name => {
        let newName = name;
        if (newName && newName.length > 9) {
            newName = newName.slice(0, 9) + '...';
        }
        return newName;
    }

    render() {
        const {linkItems, activeNumber} = this.state;
        return (
            <div className="link-clazz-tab" role="presentation" onClick={this.onTabChange}>
                {
                    linkItems.map((item, index) => {
                        return (
                            <span
                                className={'analysis-haoke-log link-clazz-item'
                                    + (+activeNumber === +item.number
                                        ? ' active' : '')}
                                key={item.number}
                                data-number={item.number}
                                data-index={index}
                                // data-type={item.type}
                                // data-event-id={item.type === 8 ? '8802032' : '8802210'}
                            >
                                {/* {this.showTabName(item.name)} */}
                                {this.showTabName(item.tag)}
                            </span>
                        );
                    })
                }
            </div>
        );
    }
}

export default LinkClazzTab;
