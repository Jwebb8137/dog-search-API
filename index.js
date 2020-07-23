'use strict';

const getDogImages = (breed) => {
  //call API
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    //Handle errors
    .catch(error => alert('Something went wrong. Try again later.'));
};

const displayResults = (responseJson) => {
  // set variables
  const breedList = responseJson.message;
  let breed = $('#breed').val();

  // clear picture container
  $('.pictureDisplay').html("");

  // if search is found display images
  if (responseJson.message !== 'Breed not found (master breed does not exist)') {
    for (const element of breedList) {
      $('h2, p, span').removeClass('hidden');
      $('.pictureDisplay').append(
        `<img src="${element}" class="results-img" width="250" height="auto" style="margin: 10px; border-radius: 5px;">`
      );
    };
  // if search isn't found display not found message  
  } else {
    $('.pictureDisplay').html("Sorry no search results were found for that breed, try another!");
    $('h2, p, span').addClass('hidden');
  };
};

const watchForm = () => {
  //handle form submission
  $('form').submit(event => {
    event.preventDefault();
    //set variable
    let breed = $('#breed').val().toLowerCase();
    //pass variable to getDogImages function
    getDogImages(breed);
  });
};

$(function() {
  //on ready call watchForm function
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
