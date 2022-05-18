import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	categoryMutations,
	categoryQueries,
	categoryTypeDef
} from './swarch2022i/categories/typeDefs';

import categoryResolvers from './swarch2022i/categories/resolvers';




//comic ms

import {
	comicMutations,
	comicQueries,
	comicTypeDef
} from './swarch2022i/comic_ms/typeDefs';

import comicResolvers from './swarch2022i/comic_ms/resolvers';

//Notification_ms
import {
	notificationMutations,
	notificationQueries,
	notificationTypeDef
} from './swarch2022i/notifications_ms/typeDefs';

import notificationResolvers from './swarch2022i/notifications_ms/resolvers';

//busquedas

import {
	busquedaMutations,
	busquedaQueries,
	busquedaTypeDef
} from './swarch2022i/search/typeDefs';
import busquedaResolvers from './swarch2022i/search/resolvers';


//Users
import{
	userQueries,
	userMutations,
	userTypeDef
	
}from'./swarch2022i/user/typeDefs';
import userResolvers from './swarch2022i/user/resolvers';

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		comicResolvers,
		notificationResolvers,
		busquedaResolvers,
		userResolvers
	)
});