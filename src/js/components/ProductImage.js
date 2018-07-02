import React, {Component} from 'react';
import "../../../node_modules/slick-carousel/slick/slick.scss";
// import "../../../node_modules/slick-carousel/slick/slick-theme.scss";

import ProductSlider from "./ProductSlider";

export default class ProductImage extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      "data": this.props.data
    };
  }
  componentWillMount() {  
    let imageArray = this.props.data.reduce((res,val,key)=>{
      let obj ={}
      if (key === 0) {
        obj.active = true;
      } else {
        obj.active = false;
      } 
      obj.src = val;    
      res = [...res, obj]
      return res;
    },[]);    
    // console.log(imageArray);
    this.setState({data: imageArray});
  }    

  activateImage(index) {
    let data = this.state.data.reduce((r,v,k) => {
      if (k === index) {
        v.active = true;
      } else {
        v.active = false;
      }
      r = [...r,v];
      return r;
    },[]);
    this.setState({data});
  }

  render() {    
    var activeImageSrc = this.state.data.filter(o => {return o.active == true})[0] === undefined ? "" : this.state.data.filter(o => {return o.active == true})[0].src;
    return (
      <React.Fragment>
      <div className="main-image">
        <img className="img-fluid mx-auto" src={activeImageSrc} data-big-image={activeImageSrc}  />
      </div>

      <div className="thumbs"> 
            
          <ProductSlider data={this.state.data} activateImage={(index)=>this.activateImage(index)}/>   
       
      </div>

      </React.Fragment>
    );
  }    
   
}





