import React from 'react';
import { Route } from 'react-router';
import AddressContainer from './index';

const routes = (
    <Route
        key="one2one-best-address"
        path="address"
        component={AddressContainer}
    >
    </Route>
);

export default routes;