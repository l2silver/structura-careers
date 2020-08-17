import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavigationTop from './features/navigation/Top';
import RoutesMain from './features/routes/Main';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import NavigationFooter from './features/navigation/Footer';
import { SWRConfig } from 'swr'
import { API_URL } from './utils/remote';


const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#495867',
      main: '#577399',
      light: '#bdd5ea'
    },
    secondary: {
      main: '#fe5f55',
    },
  },
});

function App() {
  return (
    <div className="App">
      <SWRConfig 
        value={{
          refreshInterval: 0,
          fetcher: (key, ...args) => {
            return fetch(key[0] === '/' ? API_URL + key : key, {
              method: 'GET'
            }).then(res => res.json())
            .then((res)=>res.data)
          }
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NavigationTop />
            <RoutesMain />
            <NavigationFooter />
          </BrowserRouter>
        </ThemeProvider>
      </SWRConfig>
    </div>
  );
}

export default App;
