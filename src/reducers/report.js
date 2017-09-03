import {GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_REQUEST,
PROGRESS} from '../constants/report';

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
      return { ...state, fetching: true, reports:{} };

    case PROGRESS:
      return { ...state, percent: action.payload };

    case GET_REPORT_SUCCESS:
      return { ...state, reports:action.payload, fetching: false };

    default:
      return state;
  }
}