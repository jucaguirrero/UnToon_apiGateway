export const notificationTypeDef = `
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

export const notificationQueries = `
      allNotifications: [Notification]!
      notificationById(id: Int!): Notification!
  `;

export const notificationMutations = `
    createNotification(notification: NotificationInput!): Notification!
    updateNotification(id: Int!, notification: NotificationInput!): Notification!
    deleteNotification(id: Int!): Int
`;