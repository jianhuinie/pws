import React from 'react';
// import 'spa/common/polyfill';
import service from 'common/util/ajaxService';

async function getStockPriceByName() {
  const symbol = await service.post('/area/list', {});
  const stockPrice = await service.post('/article/support', {});
  return symbol + stockPrice;
}

export default class AsyncDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childDom: <span>hello</span>
        };
    }
    componentDidMount() {
        getStockPriceByName()
            .then(() => {
                this.setState({
                    childDom: <div>hello world</div>
                });
            });
    }
    render() {
        return <div>{this.state.childDom}</div>;
    }
};