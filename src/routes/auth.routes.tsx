import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import SignIn from '../pages/SignIn'

const AuthRoutes: React.FC = () => (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Redirect from="*" to="/" />     
    </Switch>
)
export default AuthRoutes;