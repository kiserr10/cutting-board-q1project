//***PROGRAM***//
$(document).ready(function(){
	$('.parallax').parallax();
	$('.dropdown-button').dropdown();
	$('#search-button').click(searchClick);
	$('.search-form').submit(searchClick);

//SLOW SCROLL BACK TO TOP//
	$('.grey-text').click(function () {
		$('html, body').animate({scrollTop: 0}, 1500);
	});

//SCROLL DOWN TO BOTTOM FROM TOP//
	$('.extras-button').click(function () {
		$('html, body').animate({scrollTop: $('#bottom').height()}, 1500);

	});
});


//URL Variables//
var $searchUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';  //<----User Input//
var $instructionsUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';
var $imageUrl = 'https://spoonacular.com/recipeImages/';
//URL Variables//


//Function to have recipeSearch search for recipes that have keywords from the user string search//
function searchClick(){
	event.preventDefault(); //<--Clear defaults for forms/inputs//
	let $searchString = $('#search').val();  //<--Variable Holding User Input String//
	$('.card-row').empty();  //<--Every Re-Load Cards Refresh//
	recipeSearch($searchString);  //<--Calling the function to get recipes by inputting the query of the user input defined above//
}


function searchResult(data) {
	// console.log(data);
	let recipes = data.results;  //<--The array of recipe objects//

	for (var i = 0; i < 9; i++) {
		// console.log(recipes[i].id, $imageUrl + recipes[i].image);
		$('.card-row').append(
			`<div class="card medium col s12 m6 l4">
				<div class="card-image waves-effect waves-block waves-light">
					<img class="activator" src="${$imageUrl + recipes[i].image}">
				</div>
				<div class="card-content">
					<span class="card-title activator grey-text text-darken-4">${recipes[i].title}<i class="material-icons right">more_vert</i></span>
					<p><a href="#">This is a link</a></p>
				</div>
				<div class="card-reveal">
					<span class="card-title grey-text text-darken-4">${recipes[i].title}<i class="material-icons right">close</i></span>
					<ul class="card-steps${i}"></ul>
					<h1 class="card-title">Instructions:</h1>
					<div class="instruction-steps${i}"></div>

				</div>
			</div>`
		);
		ingredientSearch(recipes[i].id);
	}
}



// function(data) { console.log(data.results[1]); }


//FUNCTION TO SEARCH RECIPES---WITH HEADER KEY CODE//

function recipeSearch(search){
	$.ajax({
		url: $searchUrl, // The URL to the API. You can get this in the API page of the API you intend to consume
		type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {
			'query': search,
		}, // Additional parameters here
		dataType: 'json',
		success: searchResult,  //<--Callback Function to the API request for
		error: function(err) { alert(err); },
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-Mashape-Authorization', 'Fj660kzp6mmshIhAIrhx43CKZ4hyp1u1BXTjsnSmeypNvfgMlj'); // Enter here your Mashape key
		}
	});
}

function ingredientSearch(recipeId){
	$.ajax({
		url: $instructionsUrl + recipeId + '/information', // The URL to the API. You can get this in the API page of the API you intend to consume
		type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {
			'includeNutrition':'false',
		}, // Additional parameters here
		dataType: 'json',
		success: ingredientResult,
		error: function(err) { alert(err); },
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-Mashape-Authorization', 'Fj660kzp6mmshIhAIrhx43CKZ4hyp1u1BXTjsnSmeypNvfgMlj'); // Enter here your Mashape key
		}
	});
}

function ingredientResult(data){
	console.log(data.instructions);
	// var $ingredients = [];

	for (var i = 0; i < data.extendedIngredients.length; i++) {
		$('.card-steps' + i).append(
			'<li>' + data.extendedIngredients[i].originalString + '</li>'
		);
		$('.instruction-steps' + i).append(
				'<p>' + data.instructions + '</p>'
			);
	}
}


// function procedureResult(data){
// 	console.log(data.instructions);
// 	// var $ingredients = [];
// 	for (var i = 0; i < data.length; i++) {
// 		$('.instruction-steps').append(
// 			'<p>' + data.instructions + '</p>'
// 		);
// 	}
// }
