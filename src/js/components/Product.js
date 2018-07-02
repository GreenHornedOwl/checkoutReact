import React, {Component} from 'react';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import Slider from 'react-slick';


import ProductImage from "./ProductImage";
import VariantsContainer from "./variants";
import RelatedProductsSlider from "./RelatedProductsSlider";
import Quantity from "./Quantity";

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      availableOptions: [],
      variantId: props.data.variantId,
      quantity: 1,
      step: 1,
      stock: props.data.stock,
      min: 1
    };
  }  
  componentWillMount() {   
    this.setState({ variantId: this.props.data.variantId.split(".")});
    this.setState({availableOptions: this.props.data.variants});
    let min = this.props.data.variants.filter(o => o.id === this.props.data.variantId)[0].min;
    let step = this.props.data.variants.filter(o => o.id === this.props.data.variantId)[0].step;
    let stock = this.props.data.variants.filter(o => o.id === this.props.data.variantId)[0].stock;    
    this.setState({min});
    this.setState({step});
    this.setState({stock});
  }   
  createMarkup(arg) {
    return {__html: arg};
  }  
  changeVariant(value) {
    this.setState({variantId: value});    
    let min = this.props.data.variants.filter(o => o.id === value.join("."))[0].min;
    let step = this.props.data.variants.filter(o => o.id === value.join("."))[0].step;
    let stock = this.props.data.variants.filter(o => o.id === value.join("."))[0].stock;    
    this.setState({min});
    this.setState({step});
    this.setState({stock});
  }
  render() {
    return (
      <div id="product" className="d-flex flex-wrap">
        <div className="image-container col-sm-6">
          <ProductImage data={this.props.data.images} />
        </div>
        <div className="product-container col-sm-6">
          <h2 className="product-title">{this.props.data.title}</h2>
          <div className="product-summary" dangerouslySetInnerHTML={this.createMarkup(this.props.data.summary)}></div>
          <p className="product-number">Part #: {this.props.data.productNumber}</p>
          <p className="product-price">{this.props.data.currency}{this.props.data.price.toFixed(2)}</p>
          <div className="options-container">
            <VariantsContainer changeVariant={(value) => this.changeVariant(value)} data={this.props.data.options} combinations={this.state.availableOptions} variantId={this.state.variantId}/>


            <div className="stock-and-quantity mt-4">
                    <div className="stock-placeholder d-flex flex-wrap">
                        {this.state.stock > 0 ?<p><i className="fa fa-check stock-info"></i>Stock </p> : <p><i className="fa fa-remove stock-info"></i>Stock </p>}
                    </div>

                    {this.props.data.isNonReturnable == true ? 

                    <div className="is-non-returnable d-flex flex-wrap">
                      <p><i className="fa fa-exclamation-triangle non-returnable"></i>This item is non-returnable</p>
                    </div> : 

                    <div className="is-non-returnable d-none"></div>
                    }


                    <div className="quantity-placeholder d-flex flex-wrap">
                        <div className="d-flex flex-wrap">
                          <p className="mr-2 quantity-text-label">Quantity </p>
                          <Quantity stock={this.state.stock} value={this.state.quantity} step={this.state.step} min={this.state.min} name="Quantity"/>
                        </div>

                        <button className="btn btn-default addToCartSubmit"><i className="fa fa-shopping-cart"></i>Add to Cart</button>
                    </div>

                    <div className="add-to-wishlist-wrapper">
                      <button className="btn btn-default p-0 mt-3"><i className="fa fa-heart-o"></i>Add to Wish list</button>
                    </div>

                    <div className="product-long-description mt-4">
                      <strong className="mt-4">Details</strong>
                      <div dangerouslySetInnerHTML={this.createMarkup(this.props.data.productLongDescription)}></div>
                    </div>

            </div>
          </div>
        </div>
        <div className="product-tabs-container col-sm-12 mt-5">
            <Tabs defaultActiveKey={0} id="product-tabs">
              {this.props.data.tabs.map((o,i) => {
                  return <Tab key={i} eventKey={i} title={o.label} dangerouslySetInnerHTML={this.createMarkup(o.content)}></Tab>
              })}
            </Tabs>
        </div>
        <div className="related-products-container col-sm-12 mt-4">
            <h1 className="pb-3 mb-5">Related Products</h1>
            <RelatedProductsSlider data={this.props.data.relatedProducts}/>
        </div> 
      </div>
    );
  }
}

