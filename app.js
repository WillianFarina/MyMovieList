// Programação Orientada a Objetos - com ES6 Classes

// Movie Class = Representa funções relacionadas aos filmes

// Cria a classe Movie com um Constructor e os Labels relacionados
class Movie {
  constructor(title, type, streaming) {
    this.title = title;
    this.type = type;
    this.streaming = streaming;
  }
}

// UI Class = Cuida do que estiver relacionado à Interface do Usúario
// Criar a classe para mostrar os fimes em tela com Static pra não instanciar
class UI {
  static displayMovies() {
    const movies = Store.getMovie();

    // Fazemos um loop para adicionar cada filme à função addMovieToList
    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector('#movie-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.type}</td>
      <td>${movie.streaming}</td>
      <td><a href='#' class='btn delete'><i class="fas fa-trash"></i></a></td>
    `;

    list.appendChild(row);
  }

  static deleteMovie(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#type').value = '';
    document.querySelector('#streaming').value = '';
  }
}

// Store Class = Salvar dados no Local Storage
class Store {
  static getMovie() {
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  static addMovie(movie) {
    const movies = Store.getMovie();

    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static removeMovie(streaming) {
    const movies = Store.getMovie();

    movies.forEach((movie, index) => {
      if (movie.streaming === streaming) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Event = Display Movies
// Aqui vamos colocar na tela o método displayMovie
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event = Add Movie
// Vamos usar a mesma classe addMovieToLIst para adicionar filmes pelo botão submit
document.querySelector('#movie-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Pegar os valores do form
  const title = document.querySelector('#title').value;
  const type = document.querySelector('#type').value;
  const streaming = document.querySelector('#streaming').value;

  // Validação de campos
  if (title === '' || type === '' || streaming === '') {
    alert('Por favor, preencha todos os campos');
  } else {
    // Instanciar o movie
    const movie = new Movie(title, type, streaming);

    // Add Movie to UI
    UI.addMovieToList(movie);

    // Add movie to LocalStorage
    Store.addMovie(movie);

    // Limpando os campos do input
    UI.clearFields();
  }
});

// Event = Remove Movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
  // Remove Movie from UI
  UI.deleteMovie(e.target);

  // Remove Movie from LocalStorage
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);
});
