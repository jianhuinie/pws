import PropTypes from 'prop-types';
import {
    Route,
    Redirect
} from 'react-router-dom';

/* eslint-disable react/jsx-no-bind, react/require-default-props */
const EnhancedRoute = props => {

    const {
        component: Component,
        layout: Layout,
        redirect,
        auth: isAuthorized,
        name,
        ...rest
    } = props;

    if (!isAuthorized && !Layout) {
        return <Route {...props} />;
    }

    const WrapperComponent = props => (
        Layout
            ? (
                <Layout name={name}>
                    <Component {...props} />
                </Layout>
            )
            : <Component {...props} />
    );

    if (Layout && !isAuthorized) {
        return <Route {...rest} component={WrapperComponent} />;
    }

    if (isAuthorized) {
        return isAuthorized() && redirect
            ? <Redirect to={{pathname: redirect}} />
            : <Route render={() => <div>Unauthorized</div>} />;
    }


    return <Route {...rest} component={WrapperComponent} />;
};

EnhancedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.bool]).isRequired,
    redirect: PropTypes.string,
    auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    layout: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    name: PropTypes.string
};

export default EnhancedRoute;
