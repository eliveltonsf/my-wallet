import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'

const AppRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/list/:type" exact component={List} />
      <Redirect from="*" to="/" />  
    </Switch>
  </Layout>
)
export default AppRoutes;