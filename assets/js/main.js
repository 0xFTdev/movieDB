// Film Datenbank
let movies = [
  [
    "The Shawshank Redemption",
    "1994",
    "Frank Darabont",
    "2h 22min",
    ["Crime", "Drama"],
    "9.3",
  ],
  [
    "The Godfather",
    "1972",
    "Francis Ford Coppola",
    "2h 55min",
    ["Crime", "Drama"],
    "9.2",
  ],
  [
    "The Godfather: Part II",
    "1974",
    "Francis Ford Coppola",
    "3h 22min",
    ["Crime", "Drama"],
    "9.0",
  ],
  [
    "The Dark Knight",
    "2008",
    "Christopher Nolan",
    "2h 32min",
    ["Action", "Crime", "Drama", "Thriller"],
    "9.0",
  ],
  [
    "12 Angry Men",
    "1957",
    "Sidney Lumet",
    "1h 36min",
    ["Crime", "Drama"],
    "8.9",
  ],
  [
    "Schindler's List",
    "1993",
    "Steven Spielberg",
    "3h 15min",
    ["Biography", "Drama", "History"],
    "8.9",
  ],
  [
    "Pulp Fiction",
    "1994",
    "Quentin Tarantino",
    "2h 34min",
    ["Crime", "Drama"],
    "8.9",
  ],
  [
    "The Lord of the Rings: The Return of the King",
    "2003",
    "Peter Jackson",
    "3h 21min",
    ["Adventure", "Drama", "Fantasy"],
    "8.9",
  ],
  [
    "Il buono, il brutto, il cattivo",
    "1966",
    "Sergio Leone",
    "3h 2min",
    ["Western"],
    "8.9",
  ],
  ["Fight Club", "1999", "David Fincher", "2h 19min", ["Drama"], "8.8"],
  [
    "The Lord of the Rings: The Fellowship of the Ring",
    "2001",
    "Peter Jackson",
    "2h 58min",
    ["Adventure", "Drama", "Fantasy"],
    "8.8",
  ],
];

// Funktion zum Anzeigen der Filme im DOM
function displayMovies(movieArray) {
  const movieList = document.getElementById("movieList");
  const notFoundMessage = document.getElementById("notFoundMessage");
  movieList.innerHTML = "";

  if (movieArray && movieArray.length > 0) {
    notFoundMessage.textContent = "";
    movieArray.forEach((movie) => {
      const [title, year, director, duration, genres, rating] = movie;

      const listItem = document.createElement("li");
      listItem.className = "movieCard";

      const cardContent = `
              <h2 class="cardContentHeadline">${title}</h2>
              <p class="yearStyle"><span>Year:</span> ${year}</p>
              <p class="directedByStyle"><span>Directed by:</span> ${director}</p>
              <p class="durationStyle"><span>Duration:</span> ${duration}</p>
              <p class="genresStyle"><span>Genres:</span> ${genres.join(
                ", "
              )}</p>
              <p class="ratingStyle"><span>Rating:</span> ${rating}</p></p>
          `;

      listItem.innerHTML = cardContent;
      movieList.appendChild(listItem);
    });
  } else {
    notFoundMessage.textContent = "No movies found. Try another input.";
  }
}

// Filter Funktion
function filterMovies() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const directorInput = document.getElementById("director").value.toLowerCase();
  const durationInput = document.getElementById("duration").value.toLowerCase();
  const genreInput = document.getElementById("genre").value.toLowerCase();
  const yearInput = document.getElementById("year").value.toLowerCase();
  const ratingInput = document.getElementById("rating").value.toLowerCase();

  const filteredMovies = movies.filter(
    (movie) =>
      movie[0].toLowerCase().includes(searchInput) &&
      movie[2].toLowerCase().includes(directorInput) &&
      movie[3].toLowerCase().includes(durationInput) &&
      movie[4].some((genre) => genre.toLowerCase().includes(genreInput)) &&
      movie[1].toLowerCase().includes(yearInput) &&
      movie[5].toLowerCase().includes(ratingInput)
  );

  // Einblenden der gefilterteten Resultate
  displayMovies(filteredMovies);
}

// Sortieren der Angezeigten Filme je nach Kriterium
function sortMovies(criteria) {
  let sortedMovies = [];

  switch (criteria) {
    case "rating":
      sortedMovies = [...movies].sort(
        (a, b) => parseFloat(b[5]) - parseFloat(a[5])
      );
      break;
    case "name":
      sortedMovies = [...movies].sort((a, b) => a[0].localeCompare(b[0]));
      break;
    case "year":
      sortedMovies = [...movies].sort(
        (a, b) => parseInt(a[1]) - parseInt(b[1])
      );
      break;
    case "director":
      sortedMovies = [...movies].sort((a, b) => a[2].localeCompare(b[2]));
      break;
    default:
      sortedMovies = movies;
  }

  // Update des Outputs in sortierter Weise
  displayMovies(sortedMovies);
}

// Funktion um einen neuen Film in die Datenbank hinzuzufügen
function addMovie() {
  const newTitle = document.getElementById("newTitle").value;
  const newYear = document.getElementById("newYear").value;
  const newDirector = document.getElementById("newDirector").value;
  const newDuration = document.getElementById("newDuration").value;
  const newGenres = document
    .getElementById("newGenres")
    .value.split(",")
    .map((genre) => genre.trim());
  const newRating = document.getElementById("newRating").value;

  // Überprüfen ob alle Felder für den neuen Film ausgefüllt sind
  if (
    !newTitle ||
    !newYear ||
    !newDirector ||
    !newDuration ||
    !newGenres.length ||
    !newRating
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Hinzufügen des neuen Films in das originale Array
  const newMovie = [
    newTitle,
    newYear,
    newDirector,
    newDuration,
    newGenres,
    newRating,
  ];
  movies.push(newMovie);

  // Löschen der Eingabefelder
  document.getElementById("newTitle").value = "";
  document.getElementById("newYear").value = "";
  document.getElementById("newDirector").value = "";
  document.getElementById("newDuration").value = "";
  document.getElementById("newGenres").value = "";
  document.getElementById("newRating").value = "";

  // Hinzufügen des neuen Films zur Liste
  displayMovies(movies);
  closeModal();
}

// Öffnen des AddMovie PopUps
function openModal() {
  document.getElementById("addMovieModal").style.display = "block";
}

// Schließen des AddMovie PopUps
function closeModal() {
  document.getElementById("addMovieModal").style.display = "none";
}

// Aufrufen der Funktion zum Anzeigen von Filmen nach dem Laden der Seite
displayMovies(movies);
