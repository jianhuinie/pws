import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Series from './index';
import SeriesList from './SeriesList/index';
import SeriesEdit from './SeriesEdit/index';
import SeriesDetail from './SeriesDetail/index';

const routes = (
    <Route
        key="series"
        path="series"
        component={Series}
    >
        <IndexRoute
            component={SeriesList}
        />
        <Route
            key="series-edit"
            path="edit"
            component={SeriesEdit}
        />
        <Route
            key="series-detail"
            path="detail"
            component={SeriesDetail}
        />
    </Route>
);

export default routes;