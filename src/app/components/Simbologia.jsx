import React from 'react';
//22:02/2017 : adding config
import env from '../services/config';

class Simbologia extends React.Component {

  render() {
    return (
        <div className="simbologia_container"><img src={env.CSSDIRECTORY+"images/symbology.png"}></img></div>
    );
  }

}

export {Simbologia};
