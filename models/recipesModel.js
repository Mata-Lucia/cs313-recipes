const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

// console.log("DB URL: " + db_url);
const pool = new Pool({connectionString: db_url});

function getRecipeFromDB(id, callback) {
    console.log("Getting recipe from DB with id: " + id);

    const sql = "SELECT recipe_name, ingredient_qty, ingredient_name, direction_number, direction_text FROM recipes JOIN recipe_ingredients ON recipes.recipe_id = recipe_ingredients.recipe_id JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredient_id JOIN recipe_directions ON recipes.recipe_id = recipe_directions.recipe_id WHERE recipes.recipe_id = $1::int ";
    const params = [id];

    pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
        }
        
        console.log("Found result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });
}

module.exports = {
	getRecipeFromDB: getRecipeFromDB
};