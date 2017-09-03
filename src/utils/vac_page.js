import NetworkHelper from './network_helper';
let Promise = require('bluebird');

export default class VacPage {

  constructor(pageStep){
    this.pageStep = pageStep;
    this.success = false;
    this.errorResponse;
    this.tryCount = 0;
    this.maxTryCount = 3;
  }

///
/// Загрузить страницу. Если ошибка - пометить для повторной загрузки;
///
  fetch() {
    this.tryCount += 1;
    console.log('fetching page:', this.pageStep);
    return NetworkHelper.get(this.pageStep).then(response => {
      this.success = true;
      return response;
    }).catch(error => {

      console.log('%c Ошибка на попытке %s', 'color: red', this.tryCount);
      return {error:error};
    });
  }

  retry(accept, reject) {
    if(this.tryCount < this.maxTryCount) {
      this.fetch().then(res => {
        if(res.error) {
          this.retry(accept, reject);
        } else {
          console.log('page success', this.pageStep);
          accept(res);
        }
      });
    }else {
      throw {
        fatal:'Panic!! Server is dying!!'
      };
    }
  }

  withRetry() {
    let resolver = (accept, reject)=> {
      this.retry(accept, reject);
    }

    return new Promise(resolver);
  }
}