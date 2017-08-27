import axios from 'axios';
var Promise = require('bluebird');

export const VacanciesLoader = {

  // Итератор по страницам вакансий
  fetchVacancies: function (reducer, resultCallback) {
    let accumulator = {};

    this.axiosGet(0)
      .then( (response)=> {
        let meta = response.data.metadata.resultset;
        let pages = Math.floor(meta.count/meta.limit);
        let requests = [];

        for (let step = 1; step < pages; step++) {
          requests.push( this.axiosGet(step) );
        }

        Promise.each( requests, (result, index, length) =>
          reducer(result, accumulator)
        ).then(res => {
            console.log('готово');

            resultCallback( accumulator );
          }
        );


      })
      .catch((error)=> {
        throw 'Ошибка на одной из итераций';
      })
  },

  // Запрос к серверу
  axiosGet: function(page){
    return axios.get('https://api.zp.ru/v1/vacancies', {
        headers: {
          authorization: `token MTQxMDQzMTExOjU2NzcwN2EwNTUxOGEwNzYwNGQ3MDQ2MjFiZGUwN2Ez`
        },
        params:{
          period: 'today',
          page: page,
          limit: 100
        }
      }
    )
  }
};

export const ReportBuilder = {
  builders: {
    vacancies: (result, accumulator) => {
      result.data.vacancies.forEach((vac) => {

        vac.rubrics.forEach(r => {
          if (!accumulator[r.title]) {
            accumulator[r.title] = 0;
          }
          accumulator[r.title] += 1;
        });
      })
    },
    words: (result, accumulator) => {
      result.data.vacancies.forEach((vac) => {

        vac.header.split(' ').map( word => word.trim() ).forEach(word => {
          if (!accumulator[word]) {
            accumulator[word] = 0;
          }
          accumulator[word] += 1;
        });
      })
    }
  }
}