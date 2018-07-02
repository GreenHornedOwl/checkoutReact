import React, {Component} from 'react';
import ProductListTableGroup from "./ProductListTableGroup";
import store from "../store";
import { fetchTree , markNodeOpen, openDetail } from "../actions/treeActions";

export default class Group extends Component {
  
  render() {  
    // console.log("Group", this.props) 
    let {title, id, image, children} = this.props.data;
    // console.log("LOADTABLE", children.length > 0)
    if (children.length > 0 ) {
      return (      
        <div id="group">
          <h2 className="h2">{title}</h2>
          <div className="image"><img src={image} className="img-fluid" /></div>
          <ProductListTableGroup data={children} />        
        </div>
      );
    } 

    return (      
      <div id="group">
        <h2 className="h2">{title}</h2>
        <div className="image"><img src={image} className="img-fluid" /></div>        
      </div>
    );
    
  }    
   
}