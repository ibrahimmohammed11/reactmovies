import React, { Component, Fragment } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import ScrollToTop from "./ScrollToTop";

import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/trending" component={Trending} />
          <ProtectedRoute path="/movie/:id" component={MovieDetails} />
          <Route path="/404" component={NotFound} />
          <Redirect path="/" exact to="/register" />
          <Redirect path="*" to="/404" />
        </Switch>
      </Fragment>
    );
  }
}
