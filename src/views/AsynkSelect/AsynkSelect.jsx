import React, { Component, useRef } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import debounce from "debounce-promise";

//Asynk without debounce 
// const filterOptions = (inputValue, arr) => {
//     const options = arr.filter(i =>
//     i.label.toLowerCase().includes(inputValue.toLowerCase())
//   );
//   console.log(options)
//   return options
// };

// export default class WithPromises extends Component {
//   promiseOptions = (inputValue) => 
//   axios
//     .get("https://burgershop-588e7.firebaseio.com/ingredients.json")
//     .then((res) => {
//       let arr = [];
//       let i = 0;
//       for (let key in res.data) {
//         arr.push({ value: 1,label: key });
//       }
//       return filterOptions(inputValue, arr)
//     })

//   render() {
//     return (
//       <div style={{ width: "30%" }}>
//         <AsyncSelect cacheOptions 
//          loadOptions={this.promiseOptions}/>
//       </div>
//     );
//   }
// }


//Asynk with debounce 
const filterOptions = (inputValue, arr) => {
  const options = arr.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  )
  return options
};

const WithPromises = React.memo(props => {
  const wait = 1000; // milliseconds
  const loadOptions = inputValue => promiseOptions (inputValue);
  const debouncedLoadOptions = debounce(loadOptions, wait, {
      leading: true
    });
  const promiseOptions = (inputValue) => 
  axios
    .get("https://burgershop-588e7.firebaseio.com/ingredients.json")
    .then((res) => {
      let arr = [];
      let i = 0;
      for (let key in res.data) {
        arr.push({ value: 1,label: key });
      }
      return filterOptions(inputValue, arr)
    })


    return (
      <div style={{ width: "30%" }}>
        <AsyncSelect  
         loadOptions={inputValue => debouncedLoadOptions(inputValue)}/>
      </div>
    );

})
export default WithPromises