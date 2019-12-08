function searchRecipe() {
    console.log("Searching by id...");

    var id = $("#id").val();
    console.log("id: " + id);
    
    $.get('/getRecipes', {id:id}, function(data) {
		console.log("Back from the server with:");
        console.log(data);

        $("#h1recipe").append(data[0].recipe_name);

		for (var i = 0; i < data.length; i++) {
            var recipe = data[i];
            
            /* Fix repeats
            if (textingredient.ingredient_name != recipe.ingredient_name) {
            $("#ulrecipe").append("<li>" + recipe.ingredient_qty + " " + recipe.ingredient_name + "</li>");
            textingredient.ingredient_name.push(recipe.ingredient_name[i]);
        }*/

            $("#ulrecipe").append("<li>" + recipe.ingredient_qty + " " + recipe.ingredient_name + "</li>");
            $("#ulrecipesteps").append("<li>" + recipe.direction_number + " " + recipe.direction_text + "</li>");
		}
	})
}


function addRecipe() {
    var recipename = $("#recipename").val();
    var ingredients = $("#ingredients").val();
    var ingredientsqty = $("#ingredientsqty").val();
    var stepnum = $("#stepnum").val();
    var steptext = $("#steptext").val();

    $.post('/insertRecipe', {recipename:recipename, ingredients:ingredients, ingredientsqty:ingredientsqty, stepnum:stepnum, steptext:steptext}, function() {
        $("#thanks").append('<p>Thanks for adding a recipe!</p>');
    })
}