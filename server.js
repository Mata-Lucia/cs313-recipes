var express = require("express");
var app = express();

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgress://luciamata:phantom09@localhost:5432/recipesdb"
const pool = new Pool({connectionString: connectionString, multipleStatements:true});

app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRecipes', getRecipes);

app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});

function getRecipes(request, response) {
    const id = Number(request.query.id);

    getRecipeFromDB(id, function(error, result) {
        if (error || result == null /*|| result.length != 1*/) {
			response.status(500).json({success: false, data: error});
		} else {
			//const recipe = result[0];
            //response.status(200).json(recipe);
            //response.json(result[0]);
            //response.render('recipes', { data: result });
            //const recipe = result[0];
			response.status(200).json(result);
		}
    });
}

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