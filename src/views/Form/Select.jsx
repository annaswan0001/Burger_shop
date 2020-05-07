import React, { Component, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { childAction } from "../../store/actions/childAction";


const options = [
  { value: 1, label: "mail" },
  { value: 2, label: "femail" },
];

const opt = [
  { value: 1, label: "passport" },
  { value: 2, label: "cv" },
  { value: 3, label: "id" },
  { value: 4, label: "doc" },
];

class Form extends Component {
  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
    selectedOption: null,
  };


  toggleClearable = () =>
    this.setState((state) => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState((state) => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState((state) => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState((state) => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState((state) => ({ isSearchable: !state.isSearchable }));

  
  handleSelectChildChange = (name) => (select, {action}) => {
   console.log(action, select)
    switch (action) {
      case "select-option":
       if (name === "documenttype"){
        const selectedArray = select.map(({value})=>value)
        this.props.childAction(name, selectedArray);
       }
      else{
        this.props.childAction(name, select.value)
      };
        break;
      case "clear":
        this.props.childAction(name, "");
        break;
      case "remove-value":
        if (!select){
          this.props.childAction(name, [])
        }
        else{
          const selected = select.map(({value})=>value)
          this.props.childAction(name, selected)
        }
        
    }
  };

  filterOptions = (candidate, input) => {
    console.log(candidate);
    // if (candidate.data.label.toLowerCase().includes(input.toLowerCase()) ) {

    //   return true
    // } else {

    //   return false;
    // }
  };

  render() {
    
    const { child } = this.props;
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;

    return (
      <Fragment>
        {child.gender}
        <div style={{ width: "30%" }}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            
            value={options.filter(
              ({ value }) =>
                Math.abs(parseInt(value)) === Math.abs(parseInt(child.gender))
            )}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}//оформление с другой стороны
            isSearchable={isSearchable}
            name="color"
            options={options}
            onChange={this.handleSelectChildChange("gender")}
            getOptionLabel={({ label }) => (
              <div>
                <span>{label}</span>{" "}
                <span style={{ color: "#999", fontSize: "12px" }}>
                  {" "}
                  Custom Label:
                </span>
                <span style={{ color: "#999" }}>{label}</span>
              </div>
            )}
            noOptionsMessage={() => "помилка серверу"}
            menuPortalTarget={document.body}
            placeholder="Оберіть функцію"
            // filterOption={this.filterOptions}
          />
        </div>

        <div style={{ width: "30%" , marginTop:"50px"}}>
          <Select
            closeMenuOnSelect={false}
            value={opt.filter(({ value }) => child.documenttype.includes(value))}
            isMulti
            onChange={this.handleSelectChildChange("documenttype")}
            options={opt}
          />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  child: state.child,
});

export default connect(mapStateToProps, { childAction })(Form);
