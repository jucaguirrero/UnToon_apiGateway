export const userTypeDef = `
  type user {
      id: Int!
      nickname: String
      name: String!
      lastname: String
      email: String
      password: String
      birthday: String
  }
  type UserNoId {
    nickname: String
    name: String!
    lastname: String
    email: String
    password: String
    birthday: String
  }

  input UserInput {
    nickname: String
    name: String!
    lastname: String
    email: String
    password: String
    birthday: String
  }
  input LogIn  {
    email: String
    password: String
  }`
  
  ;

export const userQueries = `
      allusers: [user]!
      userById(id: Int): user
     
  `;

export const userMutations = `
    createuser(user:UserInput ): UserNoId,
    userlogIn(Login: LogIn):String

`;
