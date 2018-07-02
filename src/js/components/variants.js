import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const getIndex = (option, variants) => {  
  return option !== "" ? variants.filter(x=>x.id.split(".").includes(option))[0].id.split(".").indexOf(option) : null;
}
const flatten = (arr) => {
  return arr.reduce((r,v) => {
    v.split(".").map(v2=> { r = [...r,v2]});    
    return r;
  },[]);
} 
const getFilteredOptions = (variants,variantId) => {
  return variantId.filter(x=>x!==null).reduce((r,v,k)=>{ return [...r,variantId.slice(0,k+1).join(".")]  },[]).reduce((r,v,k)=>{return [...r,variants.filter(y=>y.id.includes(v)).reduce((r2,v2,k2)=>{return [...r2,v2.id.split(".")]},[])]},[]).reduce((r3,v3,k3)=>{return [...r3,v3.reduce((r4,v4,k4)=>{return [...r4,...v4]},[])]},[]).map((a,i)=> {return (([...new Set(a)]).sort()).filter(f=>{return getIndex(f, variants) == i+1})});      
}
const findFirstAvailableCombination = (arr, variants) => {
   return variants.filter(o=>o.id.includes(arr.join(".")))[0];     
}

export default class VariantsContainer extends Component {   
    constructor(props) {
      super(props);

      this.state = {
        data: this.props.data,
        variantId: this.props.variantId
      }
    }
    
    componentWillMount() {  
      let variantId = this.state.variantId;
      let variants = this.props.combinations;
      let options = this.props.data;
      
      let filteredOptionsTemp = options.reduce((r,v,k)=>{return [...r,{...v, values: v.values.filter(o => [[...([...new Set(flatten([...variants.reduce((r1,v1,k1)=>{ return [...r1,v1.id]},[])]).sort())]).filter(x=>getIndex(x,variants) === 0)], ...getFilteredOptions(variants,variantId)].reduce((r2,v2,k2)=>{return [...r2,...v2]},[]).includes(o.value))}]},[]);


      this.setState({data: filteredOptionsTemp});
    }

    handleChangeVariant(value , index) {
      let variant = this.state.variantId;
      let variantId = this.state.variantId;
      let variants = this.props.combinations;
      let options = this.props.data;

      let newVariant = variant.reduce((r,v,k)=>{
        if (k<=index) {
          let option =  k === index ? value : v;          
          r = [...r,option];
        } else {
          r = [...r,null];
        }
        return r;
      },[]).filter(v=> v !== null);

      newVariant = findFirstAvailableCombination(newVariant, variants).id.split(".");

      let filteredOptionsTemp = options.reduce((r,v,k)=>{return [...r,{...v, values: v.values.filter(o => [[...([...new Set(flatten([...variants.reduce((r1,v1,k1)=>{ return [...r1,v1.id]},[])]).sort())]).filter(x=>getIndex(x,variants) === 0)], ...getFilteredOptions(variants,newVariant)].reduce((r2,v2,k2)=>{return [...r2,...v2]},[]).includes(o.value))}]},[]);      

      this.setState({data: filteredOptionsTemp});
      this.setState({variantId: newVariant});
      this.props.changeVariant(newVariant);
    }

    render() { 
        return (
          <React.Fragment>
            {this.state.data.map((o , i) => 
            
              <div key={i} className="variantWrapper">  
                <label>{o.label}</label> 
                <select className="form-control" onChange={(e) => this.handleChangeVariant(e.currentTarget.value,i)} value={this.state.variantId[i]}>
                  
                  {o.values.map((option , indx) => <option value={option.value} key={indx}>{option.label}</option>)}
                </select>
              </div>
            )}
          </React.Fragment>
        );
      }     
     
}

