//***PROGRAM***//
$(document).ready(function(){
	$('#page-load').fadeIn(1500);
	$('#wrapper').fadeIn(2000);
	$('.parallax').parallax();
	$('.dropdown-button').dropdown();
	$('#search-button').click(searchClick);
	$('.search-form').submit(searchClick);

	//SIDE NAV//
	$('.button-collapse').sideNav({
		menuWidth: 100, // Default is 300
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true // Choose whether you can drag to open on touch screens
	});

//SLOW SCROLL BACK TO TOP//
	$('.grey-text').click(function () {
		$('html, body').animate({ scrollTop: 0}, 2500);
	});

//SCROLL DOWN TO BOTTOM FROM TOP//
	$('.extras-button').click(function () {
		$('html, body').animate({ scrollTop: $(document).height()-$(window).height()}, 2500);
	});
//ON CLICK AND SEARCH SCROLL TO CARDS//
	$('#search-button').click(function() {
		$('html, body').stop(true, true).delay(1700).animate({
			scrollTop: $('.search').offset().top
		}, 1500);
	});

	$('.search-form').submit(function() {
		$('html, body').stop(true, true).delay(1700).animate({
			scrollTop: $('.search').offset().top
		}, 1500);
	});

	$('.right-arrow').click(function() {
		$('html, body').stop(true, true).delay(1700).animate({
			scrollTop: $('.search').offset().top
		}, 1500);
	});
});


//URL Variables//
var $searchUrl = 'https://recipe-search.now.sh/recipes/search';  //<----User Input//
var $instructionsUrl = 'https://recipe-search.now.sh/recipes/';
var $imageUrl = 'https://spoonacular.com/recipeImages/';
var page = 0;
var perPage = 9;
var currentSearch;
//URL Variables//


//Function to have recipeSearch search for recipes that have keywords from the user string search//
function searchClick(){
	event.preventDefault(); //<--Clear defaults for forms/inputs//
	currentSearch = $('#search').val();  //<--Variable Holding User Input String//
	$('.card-row').empty();  //<--Every Re-Load Cards Refresh//
	recipeSearch();  //<--Calling the function to get recipes by inputting the query of the user input defined above//
	buttonDisable();
	setTimeout(buttonEnable,3000);
}


function searchResult(data) {
	let recipes = data.results;  //<--The array of recipe objects//
	$('.card-row').empty();
	// $offsetNumber += 9;
	// console.log(data.results);

	for (var i = 0; i < data.results.length; i++) {
		let recipeId = recipes[i].id;
		// console.log(recipes[i].id, $imageUrl + recipes[i].image);
		$('.card-row').append(
			`<div id="${recipeId}" class="card recipe-card medium col s12 m6 l4">
				<div class="card-image waves-effect waves-block waves-light">
					<img class="activator image-tag" src="${$imageUrl + recipes[i].image}">
				</div>
				<div class="card-content">
					<span class="card-title activator grey-text text-darken-4">${recipes[i].title}<i class="material-icons right">more_vert</i></span>
					<p><a href="#">This is a link</a></p>
				</div>
				<div class="card-reveal">
					<span class="card-title grey-text text-darken-4">${recipes[i].title}<i class="material-icons right">close</i></span>
					<ul class="ingredients-${recipeId}"></ul>
					<h1 class="card-title">Instructions:</h1>
					<div class="instructions-${recipeId}">
						<div class="preloader-wrapper active">
							<div class="spinner-layer spinner-red-only">
								<div class="circle-clipper left">
									<div class="circle"></div>
								</div><div class="gap-patch">
									<div class="circle"></div>
								</div><div class="circle-clipper right">
									<div class="circle"></div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>`
		);
		// ingredientSearch(recipes[i].id);
		// console.log(data.results);
	}

	$('.recipe-card').click(populateReveal);

	$('.card-row').append(`<ul class="pagination">
				<li class="waves-effect"><a class="more-arrows" href="#!"><i class="material-icons left-arrow">chevron_left</i></a></li>

				<li class="waves-effect"><a class="more-arrows" href="#!"><i class="material-icons right-arrow">chevron_right</i></a></li>
			</ul>`);

	$('.right-arrow').click(function() {
		page += 1;
		recipeSearch();
	});

	$('.left-arrow').click(function() {
		page += -1;
		recipeSearch();
	});
}


function populateReveal() {
	let recipeId = $(this).attr('id');
	let $instructions = $(`.instructions-${recipeId}`);
	if (!$instructions.hasClass('loaded')) {
		// console.log('Populated');
		ingredientSearch(recipeId);
		// showIcon();
	}
}


// function(data) { console.log(data.results[1]); }


//FUNCTION TO SEARCH RECIPES---WITH HEADER KEY CODE//

function recipeSearch(){
	$.ajax({
		url: $searchUrl, // The URL to the API. You can get this in the API page of the API you intend to consume
		// url:'recipes.json',
		type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {
			'query': currentSearch, // page * number = offset
			'number': perPage,
			'offset': perPage * page,
		}, // Additional parameters here
		dataType: 'json',
		success: searchResult,  //<--Callback Function to the API request for
		error: function(err) { alert(err); },
		beforeSend: function(xhr) {
			// xhr.setRequestHeader('X-Mashape-Authorization', 'AWSQqeJH4Umshj76kKpNlqShPjHxp17k89BjsnfcCDrDMru0b9'); // Enter here your Mashape key
		}
	});
}
let currentRecipeId = null;
function ingredientSearch(recipeId){
	currentRecipeId = recipeId;
	$.ajax({
		url: $instructionsUrl + recipeId + '/information', // The URL to the API. You can get this in the API page of the API you intend to consume
		// url: 'recipe.json',
		type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
		data: {
			'includeNutrition':'false',
		}, // Additional parameters here
		dataType: 'json',
		success: ingredientResult,
		error: function(err) { alert(err); },
		beforeSend: function(xhr) {
			// xhr.setRequestHeader('X-Mashape-Authorization', 'AWSQqeJH4Umshj76kKpNlqShPjHxp17k89BjsnfcCDrDMru0b9'); // Enter here your Mashape key
		}
	});
}

function ingredientResult(data){
	// console.log(data);
	let recipeId = data.id;
	// console.log(data.id);
	// let recipeId = currentRecipeId;
	// console.log(data.extendedIngredients);
	for (var i = 0; i < data.extendedIngredients.length; i++) {
		$(`.ingredients-${recipeId}`).append(
			'<li>' + data.extendedIngredients[i].originalString + '</li>'
		);
	}
	if (data.instructions) {
		$(`.instructions-${recipeId}`).html(
				'<p>' + data.instructions + '</p>'
		);
	} else {
		$(`.instructions-${recipeId}`).html(
				'<p>Instructions Unfortuantely Not Available.</p>'
		);
	}
	$(`.instructions-${recipeId}`).addClass('loaded');
}
function buttonDisable(){
	$('#search-button').attr('disabled','disabled');
}
function buttonEnable(){
	$('#search-button').removeAttr('disabled');
}
// function showIcon(){
// 	// console.log(this);
// 	$('.card-reveal').append();
// }

// function procedureResult(data){
// 	console.log(data.instructions);
// 	// var $ingredients = [];
// 	for (var i = 0; i < data.length; i++) {
// 		$('.instruction-steps').append(
// 			'<p>' + data.instructions + '</p>'
// 		);
// 	}
// }
