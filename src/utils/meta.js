import VacPage from './vac_page';
import { bindActionCreators } from 'redux';
import store from '../store/configureStore';
import {PROGRESS} from '../constants/report';

export default class Meta {
  constructor(pages){
    this.pages = pages;
  }

  static progress(page) {
    store.dispatch(
    {
      type: PROGRESS,
      payload: page.pageStep
    });
  }
}