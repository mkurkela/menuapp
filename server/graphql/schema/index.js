const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Dish {
        _id: ID!
        name: String!
        number: Int!
        price: Float!
        belongs: Category!
    }

    input DishInput {
        name: String!
        number: Int!
        price: Float!
    }

    type Category {
        _id: ID!
        name: String!
        order: Int!
        dishes: [Dish!]
    }

    input CategoryInput {
        name: String!
        order: Int!
    }

    type User {
        _id: ID!
        name: String!
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        name: String!
        password: String!
    }

    type RootQuery {
        dishes: [Dish!]!
        categories: [Category!]!
        login(username: String!, password: String!): AuthData!
    }

    type RootMutation {
        createDish(dishInput: DishInput): Dish
        createCategory(categoryInput: CategoryInput): Category
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
