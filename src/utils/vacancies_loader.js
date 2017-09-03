var Promise = require('bluebird');
import BuilderFactory from './report_builder';
import VacPage from './vac_page';
import NetworkHelper from './network_helper';
import Meta from './meta';

export class VacanciesLoader {

  constructor(){
  }

  // Итератор по страницам вакансий
  loadReport(name) {
    let promiseResolver = (resolve, reject) => {
      let builder = BuilderFactory.getBuilder(name);

      this.fetchFirst().then( (response)=> { // получить первую с метаинформацией

        builder.build( response.data.vacancies );
        let meta = Meta.fromResponse(response);

        console.log('pages: ', meta)

        // обработать последовательно страницы по три (перезагрузить при ошибке)
        // функция Promise.map из bluebird перейдет к следующему промису
        // только после завершения then текущего промиса
        Promise.map( 
          meta.pages,
          onePage => {
              onePage.withRetry().then( result => 
              { 
                // meta.progress(onePage);
                return builder.build(result.data.vacancies);
              })
            }, {concurrency: 1})
          .then(res => {
            resolve( builder.result() );
          }
        );

      })
      .catch((error)=> {
        reject(error);
      })
    }

    return new Promise(promiseResolver);
  }

  fetchFirst(){
    return ( new VacPage(0) ).withRetry();     
  }

}