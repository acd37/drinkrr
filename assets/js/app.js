// **********//
// FUNCTIONS //
// **********//

// constructor function for ingredients/measures
function Ingredient(ingredient, measure) {
    this.ingredient = ingredient;
    this.measure = measure;
}

function paginate(items) {

    let chunkedArray = []

    while (items.length > 0) {
        chunkedArray.push(items.splice(0, 12));
    }

    return chunkedArray;


}


const formulateDrink = (data) => {

    // empty array
    const drinks = [];

    // loop thru the data
    for (let i = 0; i < data.length; i++) {
        const newDrink = {
            drinkTitle: data[i].strDrink,
            drinkCat: data[i].strCategory,
            isAlcoholic: data[i].strAlcoholic,
            thumbnail: data[i].strDrinkThumb,
            directions: data[i].strInstructions,
            ingredients: []
        }

        // formulates ingredients array in the object
        data[i].strIngredient1 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient1, data[i].strMeasure1));
        data[i].strIngredient2 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient2, data[i].strMeasure2));
        data[i].strIngredient3 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient3, data[i].strMeasure3));
        data[i].strIngredient4 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient4, data[i].strMeasure4));
        data[i].strIngredient5 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient5, data[i].strMeasure5));
        data[i].strIngredient6 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient6, data[i].strMeasure6));
        data[i].strIngredient7 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient7, data[i].strMeasure7));
        data[i].strIngredient8 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient8, data[i].strMeasure8));
        data[i].strIngredient9 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient9, data[i].strMeasure9));
        data[i].strIngredient10 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient10, data[i].strMeasure10));
        data[i].strIngredient11 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient11, data[i].strMeasure11));
        data[i].strIngredient12 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient12, data[i].strMeasure12));
        data[i].strIngredient13 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient13, data[i].strMeasure13));
        data[i].strIngredient14 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient14, data[i].strMeasure14));
        data[i].strIngredient15 && newDrink.ingredients.push(new Ingredient(data[i].strIngredient15, data[i].strMeasure15));

        // push the object to the array
        drinks.push(newDrink);

    }

    // return the final array of objects
    return drinks;
}


const searchByName = (cocktail) => {
    $.ajax({
        method: "GET",
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    }).then((response) => {
        if (!response.drinks) {
            $("#drinks-total").empty();
            $("#drinks").text("Nothing returned from search");
            return;
        }

        const drinks = formulateDrink(response.drinks);

        $("#drinks").empty().hide();
        $("#drinks-total").empty().hide();

        for (let i = 0; i < drinks.length; i++) {
            const singleDrink = $("<div>").addClass("card").attr("style", "width: 18rem");
            const thumbnail = $("<img>").attr("src", drinks[i].thumbnail).addClass("card-img-top");

            const singleDrinkBody = $("<div>").addClass("card-body");
            const title = $("<div>").text(drinks[i].drinkTitle).addClass("card-title");
            const category = $("<div>").text(drinks[i].drinkCat).addClass("card-text");
            const isAlcoholic = $("<div>").text(drinks[i].isAlcoholic).addClass("card-text").append("<hr />");
            const directions = $("<div>").text(drinks[i].directions).addClass("card-text").append("<hr />");
            const ingredients = $("<div>");

            for (let j = 0; j < drinks[i].ingredients.length; j++) {
                const ingredient = drinks[i].ingredients[j].ingredient;
                const measure = drinks[i].ingredients[j].measure;

                if (measure) {
                    const ingredientLine = $("<div>").text(`${measure} - ${ingredient}`);
                    ingredients.append(ingredientLine);
                } else {
                    const ingredientLine = $("<div>").text(ingredient);
                    ingredients.append(ingredientLine);
                }
            }

            singleDrinkBody.append(title, category, isAlcoholic, directions, ingredients)
            singleDrink.append(thumbnail, singleDrinkBody);

            $("#drinks").append(singleDrink).fadeIn("slow")
        }

        $("#drinks-total").append("<div>").text(`Great! We found ${drinks.length} drink${drinks.length > 1 ? "s" : ""} for you.`).fadeIn("slow");

        $("html, body").animate({ scrollTop: $("#drinks-total").offset().top - 30, }, 1200);
    })
}


const searchByIngredient = (ingredient) => {
    $.ajax({
        method: "GET",
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    }).then(response => {
        if (response.length === 0) {
            $("#drinks-total").empty();
            $("#drinks").text("Nothing returned from search");
            return;
        }

        $("#drinks").empty().hide();
        $("#drinks-total").empty().hide();

        for (let i = 0; i < response.drinks.length; i++) {
            const singleDrink = $("<div>").addClass("card").attr("style", "width: 18rem");
            const thumbnail = $("<img>").attr("src", response.drinks[i].strDrinkThumb).addClass("card-img-top");

            const singleDrinkBody = $("<div>").addClass("card-body");
            const title = $("<div>").text(response.drinks[i].strDrink).addClass("card-title");
            const moreButton = $("<button>").addClass("btn btn-primary btn-sm btn-recipe").attr("data-drinkId", response.drinks[i].idDrink).text("Get recipe");

            singleDrinkBody.append(title, moreButton)
            singleDrink.append(thumbnail, singleDrinkBody);

            $("#drinks").append(singleDrink).fadeIn("slow");
        }


        $("#drinks-total").append("<div>").text(`Great! We found ${response.drinks.length} drink${response.drinks.length > 1 ? "s" : ""} for you.`).fadeIn("slow");

        $("html, body").animate({ scrollTop: $("#drinks-total").offset().top - 30, }, 1200);
    })
}

const addRecipe = data => {

    const id = $(data).attr('data-drinkid');
    $.ajax({
        method: 'GET',
        url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then(response => {
        const drinks = formulateDrink(response.drinks);
        const recipe = $("<div>");
        const category = $("<div>").text(drinks[0].drinkCat).addClass("card-text");
        const isAlcoholic = $("<div>").text(drinks[0].isAlcoholic).addClass("card-text").append("<hr />");
        const directions = $("<div>").text(drinks[0].directions).addClass("card-text").append("<hr />");
        const ingredients = $("<div>");

        for (let i = 0; i < drinks[0].ingredients.length; i++) {
            const ingredient = drinks[0].ingredients[i].ingredient;
            const measure = drinks[0].ingredients[i].measure;

            if (measure) {
                const ingredientLine = $("<div>").text(`${measure} - ${ingredient}`);
                ingredients.append(ingredientLine);
            } else {
                const ingredientLine = $("<div>").text(ingredient);
                ingredients.append(ingredientLine);
            }
        }

        recipe.append(category, isAlcoholic, directions, ingredients);

        $(data).parent().append(recipe);
        $(data).hide();
    })
}


// **********//
// LOGIC     //
// **********//

$(document).ready(() => {

    console.log("Get out the console, Terrence.")

    $("#name_submit").on('click', function (e) {
        e.preventDefault();
        const value = $("#name_search").val();
        $("#name_error").text("");
        $("#name_search").removeClass("is-invalid")
        if (value !== "") {
            $("#ingredient_error").text("");
            $("#ingredient_search").removeClass("is-invalid")
            $("#name_search").val("");
            searchByName(value);
        } else {
            $("#ingredient_error").text("");
            $("#ingredient_search").removeClass("is-invalid")
            $("#name_search").addClass('is-invalid')
            $("#name_error").text("Please enter an cocktail name").attr('style', 'color: #cc0000')
        }
    })


    $("#ingredient_submit").on('click', function (e) {
        e.preventDefault();
        const value = $("#ingredient_search").val();
        $("#ingredient_error").text("");
        $("#ingredient_search").removeClass("is-invalid")
        if (value !== "") {
            $("#name_error").text("");
            $("#name_search").removeClass("is-invalid")
            $("#ingredient_search").val("");
            searchByIngredient(value);
        } else {
            $("#name_error").text("");
            $("#name_search").removeClass("is-invalid")
            $("#ingredient_search").addClass('is-invalid')
            $("#ingredient_error").text("Please enter a ingredient.").attr('style', 'color: #cc0000')
        }
    })


    $(document).on('click', '.btn-recipe', function () {
        addRecipe(this);
    })
})
