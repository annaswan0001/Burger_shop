import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {authLogout} from '../../../store/actions/authAction';

class Logout extends Component {
    componentDidMount () {
        this.props.authLogout();
    }

    render () {
        return <Redirect to="/"/>;
    }
}



export default connect(null, {authLogout})(Logout);