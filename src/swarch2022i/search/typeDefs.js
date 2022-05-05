export const busquedaTypeDef = `
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

export const busquedaQueries = `
      allbusquedas: String
      busquedaById(id: String): busqueda!
  `;

export const busquedaMutations = `
    createbusqueda(busqueda: busquedaInput!): busqueda!
    deletebusqueda(id: String): String
`;
