import { generalRequest, getRequest } from '../../utilities';
import { url, entryPoint } from './server';

const URL = `http://${url}/${entryPoint}`;

const resolvers = {
	Query: {
		allNotifications: (_) =>
			getRequest(URL, ''),
		notificationById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createNotification: (_, { notification }) =>
			generalRequest(`${URL}/`, 'POST', notification),
		updateNotification: (_, { id, notification }) =>
			generalRequest(`${URL}/${id}`, 'PUT', notification),
		deleteNotification: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default resolvers;