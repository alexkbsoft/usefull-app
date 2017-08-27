import React, { Component } from 'react';
import {connect} from 'react-redux';
import User from '../components/user';
import Page from '../components/page';
import { bindActionCreators } from 'redux';
import * as pageActions from '../actions/page_actions';

class App extends Component {
  render() {
    let {user,page} = this.props;
    const { setYear } = this.props.pageActions

    return (
      <div>
        <User name={user.name} />
        <Page photos={page.photos} year={page.year} setYear={setYear}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);