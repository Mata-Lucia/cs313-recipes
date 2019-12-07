var express = require("express");
var app = express();

/* Moved to Model 
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgress://luciamata:phantom09@localhost:5432/recipesdb"
const pool = new Pool({connectionString: connectionString}); */

const recipesController = require("./controllers/recipesController.js");

app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/getRecipes', recipesController.getRecipes);


app.listen(app.get("port"), function() {
    console.log("Now listening for connection on port: ", app.get("port"));
});