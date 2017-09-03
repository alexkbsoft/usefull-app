const URL = 'https://api.zp.ru/v1/vacancies';
import axios from 'axios';

export default class NetworkHelper {
  static get(page) {
    return axios.get(URL, {
        headers: {
          authorization: `token MTQxMDQzMTExOjU2NzcwN2EwNTUxOGEwNzYwNGQ3MDQ2MjFiZGUwN2Ez`
        },
        params:{
          period: 'today',
          offset: (page-1)*100,
          limit: 100
        }
      }
    )
  }
}