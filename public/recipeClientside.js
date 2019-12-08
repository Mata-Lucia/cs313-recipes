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
            
            if ($('#resultdiv').find("#ulrecipe:contains('" + recipe[i].ingredient_name + "')").length = 0) {
            $("#ulrecipe").append("<li>" + recipe.ingredient_qty + " " + recipe.ingredient_name + "</li>");}

            $("#ulrecipesteps").append("<li>" + recipe.direction_number + " " + recipe.direction_text + "</li>");
		}
	})
}



