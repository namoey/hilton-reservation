import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4000/user/';
  }

  async login(userName: string, password: string) {
    const data = await this.post('login', { userName: userName, password: password })
    return data.token
  }

};
