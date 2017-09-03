import VacPage from './vac_page';
import { bindActionCreators } from 'redux';
import store from '../store/configureStore';
import {PROGRESS} from '../constants/report';

export default class Meta {
  constructor(pages){
    this.pages = pages;
  }

  static fromResponse(response) {
    let meta = response.data.metadata.resultset;
    let pagesCount = Math.floor(meta.count/meta.limit);
    let pages = []

    for (let step = 1; step < pagesCount; step++) {
      pages.unshift( new VacPage(step) );
    }

    return new Meta(pages);
  }

  progress(page) {
    store.dispatch(
    {
      type: PROGRESS,
      payload: Math.floor( 100 * page.pageStep / this.pages.length )
    });
  }
}