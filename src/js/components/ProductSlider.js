import React, {Component} from 'react';
import Slider from 'react-slick';
class LeftNavButton extends Component {
  render() {
    return <button {...this.props}><i className="fa fa-caret-left"></i></button>
  }
}
class RightNavButton extends Component {
  render() {
    return <button {...this.props}><i className="fa fa-caret-right"></i></button>
  }
}

export default class ProductSlider extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: <LeftNavButton />,
      nextArrow: <RightNavButton />
    };
    return (
      <Slider {...settings}>
       {this.props.data.map((o,i) => {
         return ( <div key={i}><img src={o.src}  className="thumb-img" onClick={() => this.props.activateImage(i)} /></div> );
       })}        
      </Slider>
    );
  }
}