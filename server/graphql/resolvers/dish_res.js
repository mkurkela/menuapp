const Dish = require('../../models/dish');
const Category = require('../../models/category');

const { queryCategory,
        queryDishes,
        transformDish,
        transformCategory } = require('./helpers.js')

module.exports = {     
    dishes: async() => {
        try {
            const dishes = await Dish.find()
            return dishes.map(dish => {
                return transformDish(dish);
            });
        } catch(err) {
            throw err;
        }
    },
    createDish: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const dish = new Dish({
            name: args.dishInput.name,
            number: args.dishInput.number,
            price: +args.dishInput.price,
            belongs: '5c2b7432640822135d6aa4cf'
        });
        let createdDish;
        try {
            const result = await dish.save()
            createdDish = transformDish(dish);
            const category = await Category.findById('5c2b7432640822135d6aa4cf');
            if (!category) {
                throw new Error('Catogory does not exist'); 
            }

            category.includedDishes.push(dish);
            await category.save();
            return createdDish;
        } catch(err) {
            throw err;
        } 
    }
}

