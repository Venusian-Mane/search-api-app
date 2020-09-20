import React from "react";
import "./App.css";
import Header from "./Components/Header.js";
import Favourites from "./Components/Favourites.js";
import Search from "./Components/Search.js";
import Results from "./Components/Results";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Routing modules imported for routing to other commponents

function App() {
  return (
    <Router>
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous"
        />
        <Header />
        <Switch>
          <Route path="/search" exact component={Search} />
          <Route path="/results" exact component={Results} />
          <Route path="/favourites" exact component={Favourites} />
          {/* All important components are routed and have unique links */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
