import {GET_REPORT,
  GET_REPORT_REQUEST,
  GET_REPORT_SUCCESS,
PROGRESS} from '../constants/report';

import {VacanciesLoader, ReportBuilder} from '../utils';

export function getReports() {

  return (dispatch) => {
    dispatch({
      type: GET_REPORT_REQUEST
    });

    let loader = new VacanciesLoader();

    //получаем вакансии и обрабатываем репорт-редюсером
    loader.loadReport().then(
      ( result ) => {
        dispatch(
          {
            type: GET_REPORT_SUCCESS,
            payload: result
          })
      });
  }
}