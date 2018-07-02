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

export default class RelatedProductsSlider extends Component {
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
         return ( 
            <div key={i} className="slick-slide">
                <div className="related-image">
                <a href={o.link}><img className="img-fluid" src={o.image}/></a>
                </div>
                <div className="related-title"><p>{o.name}</p></div>
            </div>
        );
       })}        
      </Slider>
    );
  }
}

