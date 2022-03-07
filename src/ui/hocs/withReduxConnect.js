import React from 'react';
import { connect } from 'react-redux';

const withReduxConnect = (Component, props) => mapStateToProps => {
    const ComponentWithRedux = connect(mapStateToProps)(Component);

    return <ComponentWithRedux {...props}/>;
};

export default withReduxConnect;