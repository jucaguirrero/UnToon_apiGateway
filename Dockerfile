FROM node:carbon-slim

# Create app directory
WORKDIR /untoon_ag

# Install app dependencies
COPY package.json /untoon_ag/
RUN npm install

# Bundle app source
COPY . /untoon_ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
