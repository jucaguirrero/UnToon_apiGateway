import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import * as fs from 'fs';

export const comicTypeDef = `
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
  
  
  `
  
  
  ;

export const comicQueries = `
      comicById(id: Int!): comic
      allComics:[comic]
  `;

export const comicMutations = `
    createComic(comic: ComicInput! ): comic
    deleteComic(id: Int!): Int
`;
