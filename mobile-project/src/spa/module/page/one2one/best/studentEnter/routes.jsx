import React from 'react';
import { Route } from 'react-router';
import searchRouter from './search/routes';
import subjectRouter from './subject/routes';
import scdSubjectRouter from './scdSubject/routes';
import detailRouter from './detail/routes';
import addressRouter from './address/routes';

class StudentEnterIndex extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };
    static defaultProps = {
        children: ''
    };
    render() {
        return (
            <div className="student-enter">
                {this.props.children}
            </div>
        );
    }
};

// 所有route在这里加
const routesPromise = (function (...routes) {
    return (
        <Route
            key="one2one-best-se"
            path="se"
            component={StudentEnterIndex}
        >
            {routes};
        </Route>
    );
}(searchRouter, subjectRouter, detailRouter, addressRouter, scdSubjectRouter));

export default routesPromise;