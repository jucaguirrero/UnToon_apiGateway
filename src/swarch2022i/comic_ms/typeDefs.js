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
      direccion: String
      etiquetas:[String]
  }
  
  `;

export const comicQueries = `
      comicById(id: Int!): comic
      allComics:[comic]
  `;

export const comicMutations = `
    createComic(category: CategoryInput!): Category!
    deleteComic(id: Int!): Int
`;
