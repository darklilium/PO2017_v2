
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

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/"} component={Root}>
          <IndexRoute component={Mapa}/>
          <Route path ={"home"} component={Mapa} />
          <Route path ={"statistics"} component={Statistics} />
        </Route>

      </Router>
    );
  }

}




export default App;
