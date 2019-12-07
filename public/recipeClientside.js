function searchRecipe() {
    console.log("Searching by id...");

    var id = $("#id").val();
    console.log("id: " + id);
    
    $.get('/getRecipes', {id:id}, function(data) {
		console.log("Back from the server with:");
        console.log(data);
        
		for (var i = 0; i < data.length; i++) {
            var recipe = data[i];
            
            $("#h1recipe").append(recipe[0].recipe_name);

			$("#ulrecipe").append("<li>" + recipe.ingredient_name + "</li>");
		}
	})
}

