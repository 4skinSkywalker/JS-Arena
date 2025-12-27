function solution({dishes}) {
    // Create a dictionary to map ingredients to the list of dishes containing them
    let ingredient_map = {};

    // Iterate through the dishes to populate the ingredient map
    for (let dish of dishes) {
        let dish_name = dish[0];
        let ingredients = dish.slice(1);
        for (let ingredient of ingredients) {
            if (!(ingredient in ingredient_map)) {
                ingredient_map[ingredient] = [];
            }
            ingredient_map[ingredient].push(dish_name);
        }
    }

    // Filter out ingredients with less than 2 dishes
    let result = [];
    for (let ingredient in ingredient_map) {
        if (ingredient_map[ingredient].length >= 2) {
            result.push([ingredient].concat(ingredient_map[ingredient].sort()));
        }
    }

    // Sort the result array lexicographically by ingredient names
    result.sort((a, b) => a[0].localeCompare(b[0]));

    return result;
}

module.exports = solution;