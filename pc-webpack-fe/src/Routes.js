/**
 * @file 定义路由匹配，渲染对应的 UI 组件
 * @author  chris<wfsr@foxmail.com>
 */
/* eslint-disable react/jsx-no-bind, import/dynamic-import-chunkname */
import {Switch, Redirect, Route} from 'react-router-dom';
import loadable from 'react-loadable';

import EnhancedRoute from './component/EnhancedRoute';
import Loading from './component/Loading';
import Footer from './component/Footer/index';
import routes from './route.config';

const renderRouters = routes =>
    props => routes.map(route => {
        const {match: {path}} = props;
        const {path: subPath = '', component, exact = true, routes = []} = route;
        const Component = loadable({
            loader: () => import(`~/page/${component}`),
            loading: Loading,
            footer: Footer
        });

        const key = subPath
            ? subPath.startsWith('/') ? subPath : `${path}/${subPath}`
            : path;

        if (routes.length) {
            const render = props => {
                const Children = renderRouters(routes);
                return [
                    <Component key="parent" {...props} />,
                    <Children {...props} key="children" />
                ];
            };

            return (
                <Route
                    exac={exact}
                    key={key}
                    path={key}
                    {...props}
                    render={render}
                />
            );
        }

        return (
            <Route exac={exact} key={key} path={key} {...props} component={Component} />
        );

    });

export default function Routes() {

    return (
        <Switch>
            {routes.map(
                ({
                    path = '/',
                    layout = 'BasicLayout',
                    exact = true,
                    name,
                    routes,
                }) => {
                    const Layout = loadable({
                        loader: () => import(`~/layout/${layout}`),
                        loading: Loading,
                        footer: Footer
                    });

                    const Component = renderRouters(routes);

                    return (
                        <EnhancedRoute
                            exact={exact}
                            name={name}
                            key={path}
                            path={path}
                            component={Component}
                            layout={Layout}
                        />
                    );
                }
            )}

        </Switch>
    );
}
