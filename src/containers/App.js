import React, { Component } from 'react';
import {connect} from 'react-redux';
import Report from '../components/report';
import { bindActionCreators } from 'redux';
import * as pageActions from '../actions/page_actions';
import {VACANCIES_REPORT, WORDS_REPORT} from '../constants/report';

class App extends Component {
  componentDidMount() {
    this.props.pageActions.getReports();
  }

  getReportBtnClick() {
    this.props.pageActions.getReports(); 
  }

  render() {
    console.log('report ', this.props);
    const {getReports} = this.props.pageActions;
    const {wordsReport, vacanciesReport, fetching} = this.props;

    let loadingTemplate;

    if(fetching) {
      loadingTemplate = <div> Загрузка... </div>
    }

    return (

      <div className="container">
        <div className="loader">
          {loadingTemplate}
        </div>

        <header>
          <button className="btn" onClick={::this.getReportBtnClick}> Перезагрузить </button>
        </header>

        <Report report={wordsReport} />
        <Report report={vacanciesReport} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wordsReport: state.reportsReducer.reports[WORDS_REPORT] ,
    vacanciesReport: state.reportsReducer.reports[VACANCIES_REPORT],
    fetching: state.reportsReducer.fetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);