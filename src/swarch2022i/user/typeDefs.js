export const userTypeDef = `
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

export const userQueries = `
      allUsers: [User]!
      userById(id: Int!): User!
  `;

export const userMutations = `
    signUp(user: UserInput!): String
    signIn(user: UserSignInInput!): Token! 
`;