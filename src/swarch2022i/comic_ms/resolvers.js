import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';



const URL = `http://${url}:${port}/${entryPoint}`;
const borrar = "dlt";
const crear ="svcmc";

const resolvers = {
	Query: {
		allComics: (_) =>
			getRequest(URL, ''),
		comicById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createComic: (_, { comic  }) =>
			generalRequest(`${URL}/${crear}`, comic,'POST'),

		deleteComic: (_, { id }) =>
			generalRequest(`${URL}/${borrar}${id}`, 'DELETE')
		
	}
};

export default resolvers;
