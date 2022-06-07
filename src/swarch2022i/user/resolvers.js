import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}/users`;
const URL2 = `http://${url}:${port}/${entryPoint}/auth`;

const resolvers = {
	Query: {
		allUsers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		signUp: (_, { user }) =>
			generalRequest(`${URL2}/signup`, 'POST', user),
		signIn: (_, { user }) =>
			generalRequest(`${URL2}/signin`, 'POST', user),
		
	}
};

export default resolvers;