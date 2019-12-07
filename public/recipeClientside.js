function searchRecipe() {
    console.log("Searching by id...");

    var id = $("#id").val();
    console.log("id: " + id);
    
    $.get('/getRecipes', {id:id}, function(data) {
		console.log("Back from the server with:");
        console.log(data);
        
        $("#ulrecipe").append("<li>" + data.ingredient_name + "</li>");

        /*
		for (var i = 0; i < data.list.length; i++) {
			var recipe = data.list[i];

			$("#ulrecipe").append("<li>" + recipe.ingredient_name + "</li>");
		}*/

	})
}

