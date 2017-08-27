import React, { Component } from 'react';
import {connect} from 'react-redux';
import Report from '../components/report';
import { bindActionCreators } from 'redux';
import * as pageActions from '../actions/page_actions';

class App extends Component {
  componentDidMount(){
    this.props.pageActions.getReport('vacancies');
    this.props.pageActions.getReport('words');
  }

  render() {
    console.log('report ', this.props);
    const {vacanciesReport} = this.props;
    const {getReport} = this.props.pageActions;

    let loadingTemplate;

    if(this.props.vacanciesReport.fetching) {
      loadingTemplate = <div> Загрузка... </div>
    }

    return (

      <div className="container">
        <div className="loader">
          {loadingTemplate}
        </div>
        <Report vacanciesReport={vacanciesReport} getReport={getReport} type='vacancies'/>
        <Report vacanciesReport={vacanciesReport} getReport={getReport} type='words'/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    vacanciesReport: state.vacanciesReport
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);