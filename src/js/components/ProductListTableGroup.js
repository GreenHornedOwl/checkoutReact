import React, {Component} from 'react';

import store from "../store";
import { openProduct } from "../actions/mainActions";

const headerTableData = [
  {
    label: "Part #",
    value: "partId",
    filtered: false,
    filterASC: false
  },
  {
    label: "Description #",
    value: "title",
    filtered: false,
    filterASC: false
  },
  // {
  //   label: "Vendor #",
  //   value: "vendor",
  //   filtered: false,
  //   filterASC: false
  // },
  {
    label: "UOM #",
    value: "uom",
    filtered: false,
    filterASC: false
  },
  {
    label: "Current Price #",
    value: "price",
    filtered: false,
    filterASC: false
  },
  {
    label: "",
    value: null,
    filtered: null,
    filterASC: null
  }
]


export default class ProductListTable extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      initialData: this.props.data,
      filteredData: this.props.data,
      header: headerTableData
    };
  }
  componentWillReceiveProps() {
    this.setState({filteredData: this.props.data})
  }

  toggleFavorite(id) {
    // console.log("id",id);
    let newState= this.state.filteredData.reduce((result,value,key) => {
      if (value.productId == id) {
        if(value.isFavorite === true ) {
          alert("/removefromfavorites");
        } else {
          alert("/addtofavorites");
        }
        value.isFavorite = !value.isFavorite;
        
      }
      result = [...result, value];
      return result;
    },[]);

    // console.log(newState);
    this.setState({filteredData: newState});
   
  }
  addToCart(url) {
    alert(url);
  }
  filterBy(value) {
    // return filtered dataset
    let newState = [...this.state.filteredData];
    let filterValue = value;

    let newHeader = this.state.header.reduce((result,val,key) => {
      
      val.filterASC = !val.filterASC;
      if(val.value === value) {
        if(val.filtered === false) {
          val.filtered = true;
        }
      } else {
        val.filtered = false;
        val.filterASC = false;
      }

      result = [...result,val];
      return result;
    },[]);

    


    let currentFilterOrderASC = newHeader.filter((o) => {return o.filtered})[0].filterASC;

    if(currentFilterOrderASC) {
      newState.sort((a , b) => a[filterValue] > b[filterValue])
    } else {
      newState.sort((a , b) => a[filterValue] < b[filterValue])
    }

    
    this.setState({
      filteredData: newState
    });
    // this.setState({header: newHeader});
  }
  
  renderHeaderTable({label,value}, index) {
    let caretClass = value === null ? "" : "fa fa-sort";
    return (
      <th key={index}>{label} <button onClick={() => this.filterBy(value)} className="sort"><i className={caretClass} aria-hidden="true"></i></button></th>
    )
  }

  loadProduct(id) {
    store.dispatch(openProduct(id));
  }

  render() { 
    return (

      <React.Fragment>
 

      <table className="table">
        <thead>
          <tr>
            {this.state.header.map((o , i) => this.renderHeaderTable(o,i))}
          </tr>
        </thead>
        <tbody>
          {this.state.filteredData.map((o,i) => <TableElement loadProduct={(id)=> this.loadProduct(id)} toggleFavorite={(id)=>this.toggleFavorite(id)} addToCart={(url)=>this.addToCart(url)} key={i} index={i} data={o} />)}
        </tbody>
      </table>

      </React.Fragment>
    );
  }    
   
}




class TableElement extends Component { 

  render() {
    let {isFavorite, partId,title,uom,price,productId,addToCartLink} = this.props.data;
    let favoriteClass= isFavorite ? "fa fa-heart" : "fa fa-heart-o";
    return (
      <tr>
        <td>{partId}</td>
        <td><button className="link" onClick={() => this.props.loadProduct(productId)}>{title}</button></td>
        <td>{uom}</td>
        <td>{price}</td>
        <td><div className="d-flex align-items-center"><button className="favorite" onClick={()=> this.props.toggleFavorite(productId)}><i className={favoriteClass}></i></button><button className="addToCart" onClick={()=> this.props.addToCart(addToCartLink)}><i className="fa fa-shopping-cart"></i></button></div></td>
      </tr>
      
    );
  }
}
