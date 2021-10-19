import React, { createContext, useReducer } from "react";
import NavBar from "./component/NavBar";
import Home from "./component/Home";
import { Route, Switch } from "react-router-dom";
import About from "./component/About";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ErrorPage from "./component/ErrorPage";
import Logout from "./component/Logout";

import { initialState, reducer } from "./reducer/Usereducer";

export const userContext = createContext();

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/About">
          <About />
        </Route>

        <Route path="/Contact">
          <Contact />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/Logout">
          <Logout />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <NavBar />
        <Routing />
      </userContext.Provider>
    </>
  );
};

export default App;
