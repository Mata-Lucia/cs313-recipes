function searchRecipe() {
    console.log("Searching by id...");

    var id = $("#id").val();
    console.log("id: " + id);
    
    $.get('/getRecipes', {id:id}, function(data) {
		console.log("Back from the server with:");
        console.log(data);

        $("#h2recipetitle").append("Your Recipe");

        if (data == null) {
            $("#h2recipe").append('Please enter Mac n Cheese');
        } else {
            $("#h2recipe").append(data[0].recipe_name);
        }

		for (var i = 0; i < 4; i++) {
            var recipe = data[i];
            $("#ulrecipe").append("<li>" + recipe.ingredient_qty + " " + recipe.ingredient_name + "</li>");
        }
        
        for (var i = 0; i < 12; i++) {
            var recipe = data[i];
            if ( i % 4 == 0) {
                $("#ulrecipesteps").append("<li>" + recipe.direction_number + ". " + recipe.direction_text + "</li>");
            }
        }
	})
}


function addItem() {
    var qty = $("#qty").val();
    var item = $("#item").val();

    $.ajax({
        "url": "/insertItem",
        "method": "POST",
        "data": {qty, item},
        "success": function(data) {
            //show content
            alert('Item added!')
        },
        "error": function(jqXHR, textStatus, err) {
            //show error message
            alert('text status '+textStatus+', err '+err)
        }
    })
}

function seeList() {
    console.log("Finding list...");
    $.get('/getList', function(data) {
        console.log("Back from the server with:");
        console.log(data);

        $("#listh2").append("Your Shopping List");

        for (var i = 0; i < data.length; i++) {
            var list = data[i];

            $("#listul").append("<li>" + list.item_qty + " " + list.item_name + "</li>");
		}

    })
}