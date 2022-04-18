
import React from "react";
import "./App.css";
import { Route, Switch } from 'react-router-dom';

import TagManager from 'react-gtm-module'
import Layout from "./components/Layout"
import ForgetPassword from "../src/components/ForgetPassword/ForgetPassword"
import Register from "../src/components/Register/Register"
import Auth from "../src/components/AuthGlobal/AuthGlobal"
import NotAccess from "../src/components/CustomerAccess/CustomerNotAccess"
import CustomerAccess from "../src/components/CustomerAccess/CustomerAccess"
import AdminPage from "../src/components/AdminPage/AdminPage"

import Screen from "../src/components/Download/Download"

import { createTheme, ThemeProvider } from "@material-ui/core";
import { DocumentProvider } from "./components/DocumentProvider";
import SendFunctions from "./components/SendFunctions/SendFunctions"


const theme = createTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: 'flex-start',
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: '12px 16px',
        fontFamily: "Orbitron"
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const App = () => {


  React.useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-TTDNRDG' });
  }, []);




  return (
    <ThemeProvider theme={theme}>
      <DocumentProvider>
        <Switch>

          <Route exact path="/">
            <Auth />
          </Route>

          <Route path="/register">
            <Layout>
              <Register />
            </Layout>
          </Route>

          <Route path="/forgetPassword">
            <Layout>
              <ForgetPassword />
            </Layout>
          </Route>

          <Route exact path="/notAccess">
            <NotAccess />
          </Route>

          <Route exact path="/adminPage">
            <AdminPage />
          </Route>

          <Route exact path="/customerAccess">
            <CustomerAccess />
          </Route>

          <Route exact path="/functions">
            <SendFunctions />
          </Route>

          <Route exact path="/screen">
            <Screen />
          </Route>

        </Switch>
      </DocumentProvider>
    </ThemeProvider>
  );
};

export default App;
