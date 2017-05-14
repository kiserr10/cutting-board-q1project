$(document).ready(function(){
	$('.parallax').parallax();
	$('.dropdown-button').dropdown();



//PROGRAM//


	var $searchUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';  //<----User Input//
	var $instructionsUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/jokes/random';
	var $imageUrl = 'https://spoonacular.com/recipeImages/';
	var $images = '';
	var $recipeTitles = '';

//HEADER KEY CODE//


		$.ajax({
			url: $searchUrl, // The URL to the API. You can get this in the API page of the API you intend to consume
			type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
			data: {
				'query':'chicken parm',
				'cuisine': 'italian',
			}, // Additional parameters here
			dataType: 'json',
			success: searchResult,
			error: function(err) { alert(err); },
			beforeSend: function(xhr) {
				xhr.setRequestHeader('X-Mashape-Authorization', 'Fj660kzp6mmshIhAIrhx43CKZ4hyp1u1BXTjsnSmeypNvfgMlj'); // Enter here your Mashape key
			}
		});

	function searchResult(data) {
		// console.log(data);
		let recipes = data.results;

		for (var i = 0; i < 9; i++) {
			console.log(recipes[i].id, $imageUrl + recipes[i].image);
		}

	}


// function(data) { console.log(data.results[1]); }












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
});
