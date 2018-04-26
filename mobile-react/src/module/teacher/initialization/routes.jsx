import React, { PropTypes } from 'react';
import { Route, hashHistory } from 'react-router';
import PageController from 'common/controller/PageController';
// 所有route在这里加
import StepOne from './StepOne/index';
import StepTwo from './StepTwo/index';
import StepThree from './StepThree/index';

require('css-loader!./index.styl');
class Initialization extends PageController {
    static propTypes = {
        children: PropTypes.node
    };
    static defaultProps = {
        children: ''
    };

    render() {
        return (
            <div className="initialization">
                {this.props.children}
            </div>
        );
    }
}
// 所有route在这里加
const routes = (
    <Route
        key="init"
        path="/"
        component={Initialization}
    >
        <Route
            key="step-one"
            path="step-one"
            component={StepOne}
        />
        <Route
            key="step-two"
            path="step-two"
            component={StepTwo}
        />
        <Route
            key="step-three"
            path="step-three"
            component={StepThree}
        />
    </Route>
);

export default routes;