import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class ReservationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4000/reservation/';
  }

  protected willSendRequest?(request: RequestOptions): (void) {
    request.headers.set("Authorization", this.context.token);
  } 

  async getUserReservations(userId: string) {
    const param = userId === undefined ? {} : { userId: userId }
    const data = await this.get('list', param);
    return data.reservations;
  }
};
