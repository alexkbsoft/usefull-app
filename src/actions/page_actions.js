import {GET_REPORT,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS} from '../constants/report';

import {VacanciesLoader, ReportBuilder} from './utils';

export function getReport(reportType) {

  return (dispatch) => {
    dispatch({
      type: GET_REPORT_REQUEST,
    });

    //получаем вакансии и обрабатываем репорт-редюсером
    VacanciesLoader.fetchVacancies( ReportBuilder.builders[reportType],
      ( result ) => {

        let report = Object.keys(result)
          .map(k => Object.assign({}, { name:k, count: result[k] }) )
          .sort( (a,b) => b.count - a.count );

        dispatch(
          {
            type: GET_REPORT_SUCCESS,
            payload: {report,reportType}
          })
      });
  }
}