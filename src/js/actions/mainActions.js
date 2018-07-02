import axios from 'axios';

export function openProduct() {
  return (dispatch) => {
   axios.get("resources/productDataset.json").then(r => {
      dispatch({type: "FETCH_PRODUCT_FULFILLED", payload: r.data}); 
    }).catch((error) => {
      dispatch({type: "FETCH_PRODUCT_REJECTED", payload: error});
    })
  }

}

