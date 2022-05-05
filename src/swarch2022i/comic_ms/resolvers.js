import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './server';
import FileType from "./typeDefs";


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
		createComic: (_, {comic}) =>
		generalRequest(`${URL}/${crear}`, 'POST',comic),


		deleteComic: (_, { id }) =>
			generalRequest(`${URL}/${borrar}${id}`, 'DELETE')
		
	}
};

export default resolvers;
