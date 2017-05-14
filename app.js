$(document).ready(function(){
	$('.parallax').parallax();
	$('.dropdown-button').dropdown();
	$('#search-button').click(searchClick);
	$('.search-form').submit(searchClick);

	// $('#search').keypress(function(ev){
	// 	if (ev.which === 13) {
	// 		$('#search-button').click(searchClick);
	// 	}
	// });


//SLOW SCROLL BACK TO TOP//

	$('.grey-text').click(function () {
		$('html, body').animate({scrollTop: 0}, 1500);
	});



});

var $searchUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';  //<----User Input//
var $instructionsUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';
var $imageUrl = 'https://spoonacular.com/recipeImages/';

//***PROGRAM***//


//FUNCTION TO APPEND SEARCH RESULT TITLE AND PHOTO//
function searchClick(){
	event.preventDefault();
	let $searchString = $('#search').val();
	$('.card-row').empty();
	recipeSearch($searchString);
}


function searchResult(data) {
	// console.log(data);
	let recipes = data.results;

	for (var i = 0; i < 9; i++) {
		console.log(recipes[i].id, $imageUrl + recipes[i].image);
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
					<span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
					<p>Here is some more information about this product that is only revealed once clicked on.</p>
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
		success: searchResult,
		error: function(err) { alert(err); },
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-Mashape-Authorization', 'Fj660kzp6mmshIhAIrhx43CKZ4hyp1u1BXTjsnSmeypNvfgMlj'); // Enter here your Mashape key
		}
	});
}

function ingredientSearch(recipeId){
	$.ajax({
		url: $instructionsUrl + recipeId + '/analyzedInstructions', // The URL to the API. You can get this in the API page of the API you intend to consume
		type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {
			'stepBreakdown':'true',
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
	console.log(data);
}






	// function submitDetailsForm() {
	// 	$('.search-button').submit();
	// 	var $recipeRequest = document.getElementById('email').value;
	// }
	//
	// $('#email').submit(function() {
	//     // get all the inputs into an array.
	//     var $inputs = $('#email :input');
	// 		console.log('$inputs')
	// });




// $('.card-row').append(
//
// 			'<div class="col s12 m6 l4">' +
// 				'<div class="card">' +
// 					'<div class="card-image">' +
// 						'<img src="' + response[i].recipe.image + '">' +
// 						'<span class="card-title">' + recipes[i].title +'</span>'
// 					</div>
// 					<div class="card-content">
// 						<p>I am a very simple card. I am good at containing small bits of information.
// 						I am convenient because I require little markup to use effectively.</p>
// 					</div>
// 					<div class="card-action">
// 						<a href="#">This is a link</a>
// 					</div>
// 				</div>
// 			</div>');
