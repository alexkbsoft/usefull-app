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
    return NetworkHelper.get(this.pageStep).then(response => {
      this.success = true;
      return response;
    }).catch(errResponse => {
      return {errors: errResponse.response};
    });
  }

  retry(accept, reject) {
    if(this.tryCount < this.maxTryCount) {
      this.fetch().then(res => {
        if(res.errors) {

          let isFinish = this.analyzeError(res.errors);
          if(isFinish) {
            accept({isFinish})
          } else {
            console.log('%c Ошибка на попытке %s', 'color: red', this.tryCount);
            setTimeout( ()=> this.retry(accept, reject), 2000);
          }
        } else {
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

  analyzeError(response) {
    if(!response.data || !response.data.errors) {
      return false;
    }

    let error400 = response.data.errors.find(elem => elem.code === 400);

    if(error400 && error400.message === 'Offset out of bounds') {
      return true;
    } else {
      return false;
    }
  }
}