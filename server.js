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

    const sql = "SELECT recipe_name FROM recipes WHERE recipe_id = $1::int; SELECT ingredient_qty, ingredient_name FROM recipe_ingredients JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredient_id WHERE recipe_id = $1::int; SELECT direction_number, direction_text FROM recipe_directions WHERE recipe_id = $1::int; ";
    
    const params = [id, id, id];

    pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
        }
        
        console.log("Found result: " + JSON.stringify(result[0].rows));
        console.log("Found result: " + JSON.stringify(result[1].rows));
        console.log("Found result: " + JSON.stringify(result[2].rows));
        callback(null, result.rows);			
    });
}