import React, {Component} from 'react';

import store from "../store";
import {connect} from 'react-redux';

import "../../sass/main.sass";

@connect ((store) => {
  return {
    data: store
  }
})


export default class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div><h1>CHECKOUT STEP 1/2</h1></div>       
      </React.Fragment>
    );
  }
}