// variables


// functions
const searchByIngredient = (ingredient) => {
    $.ajax({
        method: "GET",
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
    }).then(response => {
        console.log(response)
    })
}

const searchByName = (cocktail) => {
    $.ajax({
        method: "GET",
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    }).then(response => {
        console.log(response)
    })
}


// logic
$(document).ready(() => {

    $("#name_submit").on('click', function (e) {
        e.preventDefault();
        const value = $("#name_search").val();

        if (value !== "") {
            searchByName(value);
        } else {
            alert("no name");
        }
    })


    $("#ingredient_submit").on('click', function (e) {
        e.preventDefault();
        const value = $("#ingredient_search").val();
        if (value !== "") {
            searchByIngredient(value);
        } else {
            alert("no ingredient");
        }


    })
})