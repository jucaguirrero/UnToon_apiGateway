'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');
require('fs');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
		
		
	};

	console.log("aklijshdfaoishdoai  "+JSON.stringify(body));

	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const categoryTypeDef = `
  type Category {
      id: Int!
      name: String!
  }
  input CategoryInput {
      name: String!
      description: String!
  }`;

const categoryQueries = `
      allCategories: [Category]!
      categoryById(id: Int!): Category!
  `;

const categoryMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;

const url = 'host.docker.internal';
const port = '4000';
const entryPoint = 'categories';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

const comicTypeDef = `
  type comic {
      idcomic: Int!
      nombre: String!
      autor: String
      fecha:String
      direccion:String
      etiquetas:[String]  
      pdf:String
      imagen: String
      descripcion:String

  }
 
  type file
  {
    filecomic: String
    algo: Int
  }

  input ComicInput 
  {
      nombre: String!
      autor: String
      fecha: String
      etiquetas: [String]
      archivo: String
      imagen: String
      descripcion: String
  }
  
  
  `;

const comicQueries = `
      comicById(id: Int!): comic
      allComics:[comic]
  `;

const comicMutations = `
    createComic(comic: ComicInput! ): comic
    deleteComic(id: Int!): Int
`;

const url$1 = '162.214.198.216';
const port$1 = '5002';
const entryPoint$1 = 'cmc';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;
const borrar = "dlt";
const crear ="svcmc";

const resolvers$1 = {
	Query: {
		allComics: (_) =>
			getRequest(URL$1, ''),
		comicById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createComic: (_, {comic}) =>
		generalRequest(`${URL$1}/${crear}`, 'POST',comic),


		deleteComic: (_, { id }) =>
			generalRequest(`${URL$1}/${borrar}${id}`, 'DELETE')
		
	}
};

const notificationTypeDef = `
  type Notification {
      id: Int!
      id_receiver: Int!
      id_sender: Int!
      id_comic: Int!
      mail_receiver: String
      content: String!
  }
  input NotificationInput {
      id_receiver: Int!
      id_sender: Int!
      id_comic: Int!
      mail_receiver: String
      content: String!
  }`;

const notificationQueries = `
      allNotifications: [Notification]!
      notificationById(id: Int!): Notification!
  `;

const notificationMutations = `
    createNotification(notification: NotificationInput!): Notification!
    updateNotification(id: Int!, notification: NotificationInput!): Notification!
    deleteNotification(id: Int!): Int
`;

const url$2 = '0.0.0.0:3000';
const port$2 = '3000';
const entryPoint$2 = 'notifications';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allNotifications: (_) =>
			getRequest(URL$2, ''),
		notificationById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
	},
	Mutation: {
		createNotification: (_, { notification }) =>
			generalRequest(`${URL$2}/`, 'POST', notification),
		updateNotification: (_, { id, notification }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', notification),
		deleteNotification: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

const busquedaTypeDef = `
  type busqueda {
      id: String!
      idUser: String!
      idComic: String
      cont: String
  }
  input busquedaInput {
    idUser: String
    idComic: String
    cont: String

  }`;

const busquedaQueries = `
      allbusquedas: String
      busquedaById(id: String): busqueda!
  `;

const busquedaMutations = `
    createbusqueda(busqueda: busquedaInput!): busqueda!
    deletebusqueda(id: String): String
`;

const url$3 = 'localhost';
const port$3 = '5001';
const entryPoint$3 = 'api/busqueda';

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$3 = {
	Query: {
		allbusquedas: (_) =>
			getRequest(URL$3, ''),
		busquedaById: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'GET'),
	},
	Mutation: {
		createbusqueda: (_, { busqueda }) =>
			generalRequest(`${URL$3}/`, 'POST', busqueda),
		deletebusqueda: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'DELETE')
	}
};

const userTypeDef = `
  type User {
      id: Int!
      username: String!
      email: String!
      password: String!
      status: String
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  input UserSignInInput {
    username: String!
    password: String!
  }
  type Token {
    token: String!
  }
  `;

const userQueries = `
      allUsers: [User]!
      userById(id: Int!): User!
  `;

const userMutations = `
    signUp(user: UserInput!): String
    signIn(user: UserSignInInput!): Token! 
`;

const url$4 = '4d8b-190-24-109-109.ngrok.io';

const entryPoint$4 = 'api';

const URL$4 = `https://${url$4}/${entryPoint$4}/users`;
const URL2 = `https://${url$4}/${entryPoint$4}/auth`;

const resolvers$4 = {
	Query: {
		allUsers: (_) =>
			getRequest(URL$4, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL$4}/${id}`, 'GET'),
	},
	Mutation: {
		signUp: (_, { user }) =>
			generalRequest(`${URL2}/signup`, 'POST', user),
		signIn: (_, { user }) =>
			generalRequest(`${URL2}/signin`, 'POST', user),
		
	}
};

//comic ms

//Notification_ms
//busquedas

//Users
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		comicTypeDef,
		notificationTypeDef,
		busquedaTypeDef,
		userTypeDef

	],
	[
		categoryQueries,
		comicQueries,
		notificationQueries,
		busquedaQueries,
		userQueries
	],
	[
		categoryMutations,
		comicMutations,
		notificationMutations,
		busquedaMutations,
		userMutations
	],
	
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3,
		resolvers$4
	)
});

//import { GraphQLUpload } from 'apollo-upload-server';
const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5005;

app.use(koaLogger());
app.use(koaCors());


// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
