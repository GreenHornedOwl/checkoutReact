import React, {Component} from 'react';
import {connect} from 'react-redux';

import store from "../store";
// import { fetchMain } from '../actions/mainActions';
import Group from "./Group";
import Product from "./Product";

// @connect ((store) => {
//   return {
//     data: store.main
//   }
// })

export default class Main extends Component {
  // componentWillMount() {
  //   store.dispatch(fetchMain());
  // }
  render() {
    let {type,content} = this.props.data;
    // console.log("MAIN DATA",this.props.data.type);
    if(type === "product") {
      // return <Product data={content} />
      return <Product data={content} />
    } 
    if(type === "group") {
      return <Group data={content} /> 
    }

    return (<div></div>);
    // return (<p>Group</p>)
   

  }
}