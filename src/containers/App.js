import React, { Component } from 'react';
import {connect} from 'react-redux';
import Report from '../components/report';
import ProgressIndicator from '../components/progress_indicator';
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
    const {getReports} = this.props.pageActions;
    const {wordsReport, vacanciesReport, fetching, percent} = this.props;

    let loadingTemplate;

    if(fetching) {
      loadingTemplate = (<div className='loading-block'>
        <ProgressIndicator percent={percent}></ProgressIndicator>
        </div>)
    }

    return (
      <div className="container">
        <header>
          <nav>
            <button disabled={fetching} className="btn" onClick={::this.getReportBtnClick}> Перезагрузить </button>
            
            {loadingTemplate}
            
          </nav>
        </header>
        <div className="reports-container">
          <Report report={wordsReport} />
          <Report report={vacanciesReport} />
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wordsReport: state.reportsReducer.reports[WORDS_REPORT] ,
    vacanciesReport: state.reportsReducer.reports[VACANCIES_REPORT],
    fetching: state.reportsReducer.fetching,
    percent: state.reportsReducer.percent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);