import React, {Component} from 'react';
import Quantity from './quantity';


export default class ProductOrderDetail extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="stock-and-quantity mt-4">
                    <div className="stock-placeholder d-flex flex-wrap">
                        <p>Stock : {this.props.stock}</p>
                    </div>

                    <div className="quantity-placeholder d-flex flex-wrap">
                        <p className="mr-2">Quantity </p>
                        <Quantity/>
                    </div>
                </div>
            </React.Fragment>
           
        )
    }
}