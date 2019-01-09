const Category = require('../../models/category');
const Dish = require('../../models/dish');

const { queryCategory,
        queryDishes,
        transformDish,
        transformCategory } = require('./helpers.js')

module.exports = {
    categories: async() => {
        try {
            const categories = await Category.find()
            return categories.map(category => {
                return transformCategory(category);
            });
        } catch(err) {
            throw err;
        }
    },

    createCategory: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const category = new Category({
            name: args.categoryInput.name, 
            order: args.categoryInput.order,
        });
        try {
            const result = await category.save();
            return { ...result._doc, _id: result.id };
        } catch(err) {
            throw err;
        }
    }
}

