const recipesModel = require("../models/recipesModel.js");

function getRecipes(request, response) {
    const id = Number(request.query.id);

    recipesModel.getRecipeFromDB(id, function(error, db_result) {
        if (error || db_result == null /*|| result.length != 1*/) {
			response.status(500).json({success: false, data: error});
		} else {
			//const recipe = result[0];
            //response.status(200).json(recipe);
            //response.json(result[0]);
            //response.render(result);
            var results = {
                success:true,
                list:db_results.rows
            };

        callback(null, results);
		}
    });
}

module.exports = {
	getRecipes: getRecipes
};