var mongoose = require('mongoose');


var foodSchema = new mongoose.Schema({
    food:{
        type: String,
        required: true,
    }
});


var recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    meal_type: {
        type: String,
        required: true
    },
    super_foods: [foodSchema],
    link: {
        type: String,
        required: true
    },
    skill_level: {
        type: Number,
        min: 1.0,
        max: 5.0,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;