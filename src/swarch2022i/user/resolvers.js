import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const crear ="users" 
const resolvers = {
	Query: {
		allusers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	
	},
	Mutation: {
		createuser: (_, { UserNoId }) =>
			generalRequest(`${URL}/${crear}`, 'POST', UserNoId),
		userlogIn: (_, { LogIn }) =>
			generalRequest(`${URL}/login`, 'POST', LogIn)
	}
};

export default resolvers;
