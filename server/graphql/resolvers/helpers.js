const Dish = require('../../models/dish');
const Category = require('../../models/category');

const queryDishes = async dishIds => {
    try {
        const dishes = await Dish.find({_id: { $in: dishIds}})
        return dishes.map(dish => {
            return transformDish(dish);
        });
    } catch (err) {
        throw err;
    }
};

const queryCategory = async categoryId => {
    try {
        const category = await Category.findById(categoryId)
            return transformCategory(category);
    } catch(err) {
        throw err;
    }
};

const transformCategory = category => {
    return {
        ...category._doc,
        _id: category.id,
        dishes: queryDishes.bind(
            this,
            category._doc.dishes)
    };
}

const transformDish = dish => {
    return {
        ...dish._doc,
        _id: dish.id,
        belongs: queryCategory.bind(this, dish.belongs)
    }
}

exports.queryCategory = queryCategory;
exports.queryDishes = queryDishes;
exports.transformDish = transformDish;
exports.transformCategory = transformCategory;
