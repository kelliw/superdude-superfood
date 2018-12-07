
# Super Dude's Super Foods

---

Name: Kelli Webber

Date: November 2018

Project Topic: Super Food Recipies

URL: 

https://final-project-lx8bpd53u.now.sh/
---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     title          `Type: String`
- `Field 2`:     meal_type      `Type: String`
- `Field 2`:     super_foods    `Type: Array`
- `Field 3`:     link           `Type: String`
- `Field 4`:     skill_level    `Type: Number`
- `Field 5`:     review         `Type: String`

Recipe Schema: 
{
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
}

Super Food Schema:
 food:{
        type: String,
        required: true,
    }

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        title: 'Blueberry Muffin Smoothie',
        meal_type: 'Breakfast',
        super_foods: ['Almond', 'Blueberry', 'Spinach'],
        link: "https://www.loveandlemons.com/super-fun-summer-smoothies/",
        skill_level: 1,
        review: "Tastes like I am drinking a muffin"
    } 
};

example url:
http://localhost:4000/api/create/Blueberry%20Muffin%20Smoothie/Breakfast/Almond,Blueberry,Spinach/https:%2F%2Fwww.loveandlemons.com%2Fsuper-fun-summer-smoothies%2F/1/Tastes%20like%20I%20am%20drinking%20a%20muffin

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/view`

### 4. Search Data

Search Field: title

### 5. Navigation Pages

Navigation Filters
1. home -> `  /  `
2. about -> `  /about  `

3. meal type -> `  /meal_type  `
4. super foods -> `  /super_foods  `
5. skill level -> `  /skill_level  `
6. random -> `  /random  `


