import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    constructor(props) {
      super(props);
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.responceInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      console.log("Will unm", this.requestInterceptor, this.responceInterceptor)
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responceInterceptor);
    }

    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

// const  WithErrorHandler = (WrappedComponent, axios) => {
//   return (props)=>(
//     <React.Fragment>
//     <Modal show={true}>Hiiii</Modal>
//     <WrappedComponent {...props}/>
//     </React.Fragment>
//   )
// }

export default withErrorHandler;
