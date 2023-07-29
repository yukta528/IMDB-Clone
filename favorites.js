// Declare variables to store favorite movies and the ID of the item to be removed
let favs;
let removeItemId;

// Event listener to load favorite movies on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Retrieve favorite movies from local storage
  favs = JSON.parse(localStorage.getItem('favMovies'));
  
  await loadFav();
});


async function loadFav() {
 
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = '';

  for (const favMovie of favs) {
    // Create a new div element to hold the card
    const favDiv = document.createElement('div');
    favDiv.classList.add('grid-item');
    // Populate the card with movie details
    favDiv.innerHTML = `
      <div class="card">
        <div class="favorites-icon">
          <i class="fa fa-trash" data-id="${favMovie.imdbID}"></i>
        </div>
        <img src="${favMovie.Poster}" class="card-img-top img-fluid poster-size">
        <div class="card-body">
          <h5 class="card-title">${favMovie.Title}</h5>
          <p class="card-text">${favMovie.Year}</p>
        </div>
      </div>
    `;

   
    gridContainer.appendChild(favDiv);
  }
}

// Function to continuously check for clicks on delete icons
setInterval(deleteIcons, 1000);
function deleteIcons() {
  // Add event listener for clicks on delete icons
  document.addEventListener('click', deleteFromFavs);
  

  function deleteFromFavs(event) {
   
    if (event.target.classList.contains('fa-trash')) {
      
      removeItemId = event.target.dataset.id;
      
      favs = favs.filter((item) => item.imdbID !== removeItemId);
      // Update the favorites array in local storage
      localStorage.setItem('favMovies', JSON.stringify(favs));
      // Reload the favorite movies on the page
      loadFav();
    }
  }
}
