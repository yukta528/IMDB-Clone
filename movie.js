// API key for the OMDB API
const apiKey = "bb5b7133";

// Wait for the DOM content to load before executing the loadmovie function
document.addEventListener('DOMContentLoaded', loadmovie);


async function loadmovie() {

  const movieCard = document.getElementById('movie-container');


  const movie = JSON.parse(localStorage.getItem('movie'));

  // Construct the URL for the API request using the movie's imdbID
  const urlNew = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;

  try {
    // Fetch movie details using the OMDB API
    const response = await fetch(urlNew);
    const data = await response.json();

    const plot = data.Plot;
    const genre = data.Genre;
    const director = data.Director;
    const imdbRating = data.imdbRating;


    if (movie) {
      // Display the movie details in the movieCard element
      movieCard.innerHTML = `
        <div class="row" >
          <div class="col-md-4">
            <img src="${movie.Poster}" class="img-fluid movie-poster-size" alt="Movie Poster">
          </div>
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Release Year: ${movie.Year}</p>
                <p class="card-text">${plot}</p>
                <div class="row">
                  <div class="col-md-6">
                    <p>Genre: ${genre}</p>
                    <p>Director: ${director}</p>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <h3>${imdbRating}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  } catch (error) {
    // If there was an error while fetching data, display an error message in the movieCard element
    console.error('Error fetching data', error);
    movieCard.innerHTML = 'An error occurred while fetching data';
  }
}
