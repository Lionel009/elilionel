import React from "react";
import { Route, Switch } from 'react-router-dom';
import TagManager from 'react-gtm-module'

import Layout from "./components/Layout"
import ForgetPassword from "../src/components/ForgetPassword/ForgetPassword"
import Register from "../src/components/Register/Register"
import Auth from "../src/components/AuthGlobal/AuthGlobal"
import NotAccess from "../src/components/CustomerAccess/CustomerNotAccess"
import CustomerAccess from "../src/components/CustomerAccess/CustomerAccess"
import AdminPage from "../src/components/AdminPage/AdminPage"
import Home from "../src/components/Home/Home"



//import { DocumentProvider } from "./components/DocumentProvider";
import SendFunctions from "./components/SendFunctions/SendFunctions"

import "./App.css";


const App = () => {


  React.useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-TTDNRDG' });
  }, []);




  return (

    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/login">
        <Auth />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/forgetPassword">
        <ForgetPassword />
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
        <Layout >
          <SendFunctions />
        </Layout>
      </Route>

    </Switch>

  );
};

export default App;
