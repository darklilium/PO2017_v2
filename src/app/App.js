
import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles
import Mapa from './components/Map.jsx';
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './components/Statistics.jsx';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import {Header} from "./components/Header.jsx";
import {Root} from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import {Login} from './components/Login.jsx';


class App extends React.Component {

  render() {
    return (

      <Router history={browserHistory}>
        <Route path={"/"} component={Root}>
          <IndexRoute component={Login} />
        </Route>
        <Route path={"home"} component={Home}>
          <Route path={"map"} component={Mapa}></Route>
          <Route path ={"statistics"} component={Statistics} />
        </Route>
      </Router>

    );
  }

}




export default App;
