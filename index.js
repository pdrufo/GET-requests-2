'use strict';


function getUserHandle(userHandle) {
  fetch(`https://api.github.com/users/${userHandle}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong ${err.message}`);
    });

}

function displayResults(responseJson) {
  $('#results-list').empty();
  $('#js-error-message').empty();

  responseJson.forEach(user => {
      
    $('#results-list').append(
      `<li><a href='${user.url}'>${user.name}</a></li>`
    );
  });
  $('#results').removeClass('hidden');
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('#js-user-handle').val();
    getUserHandle(userHandle);
  });

}

$(watchForm);