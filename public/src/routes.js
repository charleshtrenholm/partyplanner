import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Login from './Login';

export default (
    <Route exact path='/' component={Login} />
)