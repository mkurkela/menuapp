const dishResolver = require('./dish_res');
const categoryResolver = require('./category_res');
const userResolver = require('./user_res');

const rootResolver = {
    ...dishResolver,
    ...categoryResolver,
    ...userResolver
};

module.exports = rootResolver
