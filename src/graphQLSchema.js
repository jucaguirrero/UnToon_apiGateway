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




// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		comicTypeDef

	],
	[
		categoryQueries,
		comicQueries
	],
	[
		categoryMutations,
		comicMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		comicResolvers
	)
});