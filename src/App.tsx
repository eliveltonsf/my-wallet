import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';

import dark from './styles/themes/dark';
import light from './styles/themes/light'

import Routes from './routes'
import { Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={dark} >
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  )
}

export default App;
