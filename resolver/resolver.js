// const { books, authors } = require("../data/static");

const resolver = {
  // Query
  Query: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks(),
    book: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getBookById(args.id),
    authors: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllAuthors(),
    author: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(args.id),
  },
  Book: {
    author: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAuthorById(parent.authorId),
  },
  Author: {
    books: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.getAllBooks({ authorId: parent.id }),
  },

  // Mutation
  Mutation: {
    createAuthor: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongoDataMethods }) =>
      await mongoDataMethods.createBook(args),
  },
};

module.exports = resolver;
