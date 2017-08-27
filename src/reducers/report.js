import {GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_REQUEST} from '../constants/report';

const initialState = {
  reports:{}
};

const TITLES = {
  vacancies: 'Топ по рубрикам',
  words: 'Топ по словам'
}


export default function report(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_REQUEST:
      return { ...state, fetching: true }

    case GET_REPORT_SUCCESS:
      state.reports[action.payload.reportType] = {
        lines: action.payload.report,
        title: TITLES[action.payload.reportType],
        fetching: false
    };

      return { ...state, fetching: false }

    default:
      return state;
  }
}