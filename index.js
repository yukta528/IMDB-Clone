// Get references to the necessary DOM elements
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('card-list');
const bgText = document.getElementById('bg-h1');
const favId = document.getElementById('fav');
let idCount;
let cardDetail;
let movies = [];

// API key for the OMDB API
const apiKey = "bb5b7133";

// Add a keypress event listener to the search input
searchInput.addEventListener('input', (e) => {

  const query = searchInput.value;
  if (query.trim() !== '') {

    searchMovies(query);
  }
  if (e.key === 'Backspace') {

    searchMovies(query);
  }
});

// Function to fetch movie data from the OMDB API
function searchMovies(query) {

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

  // Make the API request using fetch
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {

        bgText.innerHTML = '';


        movies = data.Search.slice(0, 16);

        idCount = 0;

        // Display the fetched movies by calling the display function
        display(movies);
      } else {

        bgText.innerHTML = 'No results found';
        resultsDiv.innerHTML = '';
      }
    })
    .catch(error => {
      // If there was an error while fetching data, display an error message
      console.error('Error fetching data', error);
      bgText.innerHTML = 'An error occurred while fetching data.';
    });
}

// Function to display the fetched movies as cards
function display(movies) {

  resultsDiv.innerHTML = '';


  for (const movieThis of movies) {
    // Retrieve favorite movies from local storage
    let favMovies = JSON.parse(localStorage.getItem('favMovies')) || [];

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('grid-item');


    let movieIds = favMovies.map(item => item.imdbID);
    // Check if the current movie is in the favorite movies array and add the 'fav-movie' class accordingly
    let isFav = movieIds.includes(movieThis.imdbID) ? 'fav-movie' : '';

    // Fill the cardDiv with HTML containing movie details
    cardDiv.innerHTML = `
      <div class="card">
        <div class="favorites-icon">
          <i class="fas fa-heart ${isFav}" id="${movieThis.imdbID}" data-id=${idCount}></i>
        </div>
        <img src="${movieThis.Poster}" id="${idCount}" class="card-img-top img-fluid poster-size" alt="${movieThis.Title}">
        <div class="card-body" id="${idCount}">
          <h5 class="card-title" id="${idCount}">${movieThis.Title}</h5>
          <p class="card-text" id="${idCount}">${movieThis.Year}</p>
        </div>
      </div> 
    `;


    resultsDiv.appendChild(cardDiv);

    idCount = idCount + 1;
  }


  cardDetail = Array.from(document.querySelectorAll('.card'));

  // Add a click event listener to each movie card element
  for (const detail of cardDetail) {
    detail.addEventListener('click', displayMovieDetail);
  }
}

// Function to open a new window with movie details when a movie card is clicked
function displayMovieDetail(event) {

  if (event.target.classList.contains('fa-heart')) {

    let favMovies = JSON.parse(localStorage.getItem('favMovies')) || [];

    let movieIds = favMovies.map(item => item.imdbID);


    if (!movieIds.includes(event.target.id)) {

      favMovies.unshift(movies[event.target.dataset.id]);

      event.target.classList.add('fav-movie');
      // Update the favorite movies array in local storage
      localStorage.setItem('favMovies', JSON.stringify(favMovies));
    } else {

      alert('Already added to Favorites');
    }
  } else {
    // If the click is not on a heart icon, navigate to the movie details page
    const movie = movies[event.target.id];
    localStorage.setItem('movie', JSON.stringify(movie));
    window.location.href = 'movie.html';
  }
}


