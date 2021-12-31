const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load schema & resolver
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// Load db
const mongoDataMethods = require("./data/db");

// connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://wolfhybrid:Lqt.1605%40@tuturialgraphql.kdn73.mongodb.net/TuturialGraphQL?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
startServer();

app.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
