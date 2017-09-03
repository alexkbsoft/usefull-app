var Promise = require('bluebird');
import BuilderFactory from './report_builder';
import VacPage from './vac_page';
import NetworkHelper from './network_helper';
import Meta from './meta';

export class VacanciesLoader {

  constructor() {
    this.builder = BuilderFactory.getBuilder();
  }

  // Итератор по страницам вакансий
  loadReport() {
    let deferred = Promise.defer();
    this.loadPage(1, deferred);

    return deferred.promise;
  }

  loadPage(num, deferred) {
    let vacPage = new VacPage(num);

    vacPage.withRetry().then( result => 
    {
      if(result.isFinish) {
        deferred.resolve( this.builder.result() );
      } else {
        Meta.progress(vacPage);
        this.builder.build(result.data.vacancies);

        this.loadPage(num+1, deferred);
      }
    });

    return deferred.promise;

  }

}