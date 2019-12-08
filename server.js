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
app.post('/insertItem', insertItem);

app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});

function getRecipes(request, response) {
    const id = request.query.id;

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

    const sql = "SELECT recipe_name, ingredient_qty, ingredient_name, direction_number, direction_text FROM recipes JOIN recipe_ingredients ON recipes.recipe_id = recipe_ingredients.recipe_id JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredient_id JOIN recipe_directions ON recipes.recipe_id = recipe_directions.recipe_id WHERE recipes.recipe_name =$1";
    
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

// Insert Into Shopping List

function insertItem(request, response) {
    const qty = request.query.qty;
    const item = request.query.item;

    insertItemDB(qty, item, function(error, result) {
        if (error || result == null /*|| result.length != 1*/) {
			response.status(500).json({success: false, data: error});
		} else {
			response.status(200).json(result);
		}
    })
}

function insertItemDB(qty, item, callback) {
    console.log("Inserting item into DB with qty: " + qty + " and item: " + item);

    const sql = "INSERT INTO shopping_list VALUES (DEFAULT, $1, $2);";
    const params = [qty, item];

    pool.query(sql, params, function(err, result) {
        if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
        }
        callback(null, result.rows);
    });
}

// Show Shopping List