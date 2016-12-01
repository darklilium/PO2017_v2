
import React from 'react';
// import 'react-toolbox/lib/commons.scss';           // Import common styles

import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import Statistics from './components/Statistics.jsx';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import {Header} from "./components/Header.jsx";
import {MainLayout} from "./components/MainLayout.jsx";
import HomeLayout from "./components/HomeLayout.jsx";
import {Login} from './components/Login.jsx';
import ChilquintaMap from './components/ChilquintaMap.jsx';
import LinaresMap from './components/LinaresMap.jsx';
import LitoralMap from './components/LitoralMap.jsx';
import ParralMap from './components/ParralMap.jsx';
import CasablancaMap from './components/CasablancaMap.jsx';

class App extends React.Component {

  render() {
    return (

      <Router history={browserHistory}>
        <Route component= {MainLayout}>
          <Route path ="/" component={Login}/>
          <Route component={HomeLayout}>
            <Route path={"chilquinta"} component={ChilquintaMap}></Route>
            <Route path={"casablanca"} component={CasablancaMap}></Route>
            <Route path={"litoral"} component={LitoralMap}></Route>
            <Route path={"linares"} component={LinaresMap}></Route>
            <Route path={"parral"} component={ParralMap}></Route>
            <Route path ={"statistics"} component={Statistics}></Route>
          </Route>
        </Route>
      </Router>

    );
  }

}




export default App;
