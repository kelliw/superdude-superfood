var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
// var dataUtil = require("./data-util");
var _ = require('underscore');
var marked = require('marked');
var moment = require('moment');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Recipe = require('./public/models/Recipe');

// Load envirorment variables
dotenv.load();

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

console.log(process.env.MONGODB);

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error',function(err){
    console.log("Connection was unable to take place");
    process.exit(1);
});


// var _DATA = dataUtil.loadData().blog_posts;

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others. 
 */

 
app.get('/', function(req, res) {
    // Get all recipes
    Recipe.find({}, function(err, recipes){
        if (err) throw err;
        res.render('home',{
             data: recipes
        });
    });
});


app.get('/api/view', function(req, res) {
    Recipe.find({}, function(err, recipes){
        if (err) throw err;
        
    res.send(recipes);
    });    
});

app.get("/create", function(req, res) {
    res.render('create');
});

app.post('/create', function(req, res) {
    // Create new recipe
    var recipe = new Recipe({
        title: req.body.title,
        meal_type: req.body.meal_type,
        super_foods: [],
        link: req.body.link,
        skill_level: parseInt(req.body.skill_level),
        review: req.body.review,
        preview: req.body.review.substring(0,300),
        time: moment().format("MMMM DD YYYY, h:mm a")
    });

        foods = req.body.super_foods
        ar = foods.split(/,\s*/)

        for (i of ar)
        recipe.super_foods.push({
            food: i
        });
   
    recipe.save(function(err){
        if (err) throw err;
    });
    
    res.redirect('/');
});

app.post("/api/create/:title/:meal_type/:super_foods/:link/:skill_level/:review", function(req, res) {
    var recipe = new Recipe({
        title: req.params.title,
        meal_type: req.params.meal_type,
        super_foods: [],
        link: req.params.link,
        skill_level: parseInt(req.params.skill_level),
        review: req.params.review,
        preview: req.params.review.substring(0,300),
        time: moment().format("MMMM DD YYYY, h:mm a")
    });

        foods = req.params.super_foods
        console.log(typeof foods)
        console.log(foods)
        ar = foods.split(/,\s*/)

        for (i of ar)
        recipe.super_foods.push({
            food: i
        });
        
    recipe.save(function(err){
        if (err) throw err;
    });
    
    res.redirect('/');
});

app.get('/post/:title', function(req, res) {
    var _title = req.params.title;
    Recipe.find({title: _title},function(err, recipes){
        var sup_foods = recipes[0];
        var ar = sup_foods["super_foods"];
        var foods = []
            for (i of ar){
                foods.push(i["food"]);
            }
        if (err) throw err;
        res.render("post", {
                    blog_post: recipes[0],
                    foods: foods
                })   
    });
});


app.get("/about", function(req, res) {
    res.render('about');
});

app.get("/meal_type", function(req, res) {
    Recipe.find({meal_type: "Breakfast"},function(err, _breakfast){
        Recipe.find({meal_type: "Lunch"},function(err, _lunch){
            Recipe.find({meal_type: "Appetizer"},function(err, _appetizer){
                Recipe.find({meal_type: "Dinner"},function(err, _dinner){
                    Recipe.find({meal_type: "Dessert"},function(err, _dessert){

                        res.render('meal', {
                            breakfast: _breakfast,
                            lunch: _lunch,
                            appetizer: _appetizer,
                            dinner: _dinner,
                            dessert: _dessert
                        })
     
                    });
                });
            });
        });
    });

});

app.get("/super_foods", function(req, res) {
    var _almond = [];
    var _blueberry = [];
    var _broccoli = [];
    var _egg = [];
    var _green_tea = [];
    var _quinoa = [];
    var _salmon = [];
    var _spinach = [];
    var _sweet_potato = [];
    var _yogurt = [];


    Recipe.find({},function(err, recipes) {
        for (var i of recipes){
            var x = []
                    str = (i["super_foods"]);
                    for (k of str) {
                        x.push(k["food"]);
                    }
                        for( var j of x) {
                            if (j == "Almond"){
                                _almond.push(i)
                            }
                            if (j == "Blueberry"){
                                _blueberry.push(i)
                            }
                            if (j == "Broccoli"){
                                _broccoli.push(i)
                            }
                            if (j == "Egg"){
                                _egg.push(i)
                            }
                            if (j == "Green Tea"){
                                _green_tea.push(i)
                            }
                            if (j == "Quinoa"){
                                _quinoa.push(i)
                            }
                            if (j == "Salmon"){
                                _salmon.push(i)
                            }
                            if (j == "Spinach"){
                                _spinach.push(i)
                            }
                            if (j == "Sweet Potato"){
                                _sweet_potato.push(i)
                            }
                            if (j == "Yogurt"){
                                _yogurt.push(i)
                            }
                        }
                }
            
                res.render('super_foods', {
                    almond: _almond,
                    blueberry: _blueberry,
                    broccoli: _broccoli,
                    egg: _egg,
                    green_tea: _green_tea,
                    quinoa: _quinoa,
                    salmon: _salmon,
                    spinach: _spinach,
                    sweet_potato: _sweet_potato,
                    yogurt: _yogurt
                })
    });
});


app.get("/skill_level", function(req, res) {
    Recipe.find({skill_level: 1},function(err, _1){
        Recipe.find({skill_level: 2},function(err, _2){
            Recipe.find({skill_level: 3},function(err, _3){
                Recipe.find({skill_level: 4},function(err, _4){
                    Recipe.find({skill_level: 5},function(err, _5){

                         res.render('skill_level', {
                            one: _1,
                            two: _2,
                            three: _3,
                            four: _4,
                            five: _5
                        })
     
                    });
                });
            });
        });
    });

});

app.get("/random", function(req, res) {
    Recipe.find({}, function(err, recipes){
        if (err) throw err;
    var len = recipes.length
    var index = Math.floor(Math.random() * (len));
    var rando = recipes[index]
    var ar = rando["super_foods"];
    var foods = []
        for (i of ar){
            foods.push(i["food"]);
        }
        res.render('post', {
            blog_post: rando,
            foods: foods
        })
    }); 
});

app.delete('/post/:title', function(req, res) {
    Recipe.findOneAndRemove(req.body.title, function(err, recipe){
        if (err) throw err;
        if (!recipe) return res.send("No movie by that ID found");

        return res.send("Movie "+req.body.title+" was deleted!");
    });

});


app.listen(process.env.PORT || 4000, function() {
    console.log('Listening!');
});
