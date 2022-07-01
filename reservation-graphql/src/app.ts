import { ApolloServer, gql } from 'apollo-server';
import { ReservationAPI } from './datasource/reservation-api';
import { UserAPI } from './datasource/user-api';

const typeDefs = gql`
type Reservation {
    userId: String
    tableSize: Int
    arrivalTime: String
    status: Int
}  
type Query {
    greeting: String
    login(userName: String, password: String): String
    reservations(userId: String): [Reservation]
  }
`;

var authToken: string = ""

const resolvers = {
    Query: {
      greeting: () => 'Hello Hilton Reservation world!👋',
      reservations: (root: any, args: any, { dataSources }: any) => {
        return dataSources.reservationApi.getUserReservations(args.userId);
      },
      login: (root: any, args: any, { dataSources }: any) => {
        return dataSources.userApi.login(args.userName, args.password).then( (data: string) => {
          authToken = `Bearer ${data}`
        })
      }
    },
  };

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async () => {
      const token = authToken
      return { token }
    },
    dataSources: () => ({
        reservationApi: new ReservationAPI(),
        userApi: new UserAPI()
    })
})

server
  .listen({ port: 9000 })
  .then(serverInfo => console.log(`Server running at ${serverInfo.url}`));