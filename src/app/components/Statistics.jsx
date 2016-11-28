import React from 'react';
import {browserHistory} from 'react-router';

class Statistics extends React.Component {

  onNavigateHome(){
    browserHistory.push("home");
  }

  render(){
    return (
        <div>
          <h1>Estadisticas</h1>
          <button onClick={this.onNavigateHome.bind(this)}>A casa!</button>
        </div>

    );
  }
}

export default Statistics;
