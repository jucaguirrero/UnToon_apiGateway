import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allbusquedas: (_) =>
			getRequest(URL, ''),
		busquedaById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createbusqueda: (_, { busqueda }) =>
			generalRequest(`${URL}/`, 'POST', busqueda),
		deletebusqueda: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;
