import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";



export default new GraphQLObjectType({
    name: "File",
    fields: () => ({
      id: {
        description: "Unique ID.",
        type: new GraphQLNonNull(GraphQLString),
        resolve: (storedFileName) => storedFileName,
      },
      name: {
        description: "File name.",
        type: new GraphQLNonNull(GraphQLString),
        resolve: (storedFileName) => storedFileName,
      },
     
    }),
  });


export const comicTypeDef = `
  type comic {
      idcomic: Int!
      nombre: String!
      autor: String
      fecha:String
      direccion:String
      etiquetas:[String]  
      

  }
  input ComicInput 
  {
      nombre: String!
      autor: String
      fecha: String
      etiquetas:[String]
  }
  
  `;

export const comicQueries = `
      comicById(id: Int!): comic
      allComics:[comic]
  `;

export const comicMutations = `
    createComic(comic: ComicInput!): comic
    deleteComic(id: Int!): Int
`;
