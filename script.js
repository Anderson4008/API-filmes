async function buscarFilme() {

  const filme = document.getElementById("movieInput").value;

  const container = document.getElementById("movieContainer");

  const apiKey = "acd25153";

  if (filme.trim() === "") {

    container.innerHTML = `
      <p>Digite o nome de um filme</p>
    `;

    return;
  }

  const url = `https://www.omdbapi.com/?t=${filme}&apikey=${apiKey}&plot=full&language=pt-BR`;

  try {

    container.innerHTML = `
      <p>Carregando...</p>
    `;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    if (dados.Response === "False") {

      container.innerHTML = `
        <p>Filme não encontrado</p>
      `;

      return;
    }

    container.innerHTML = `
      <div class="movie-card">

        <img src="${dados.Poster}" alt="${dados.Title}">

        <h2>${dados.Title}</h2>

        <p><strong>Ano:</strong> ${dados.Year}</p>

        <p><strong>Gênero:</strong> ${dados.Genre}</p>

        <p><strong>Duração:</strong> ${dados.Runtime}</p>

        <p><strong>Nota IMDb:</strong> ${dados.imdbRating}</p>

        <p><strong>Diretor:</strong> ${dados.Director}</p>

        <p><strong>Atores:</strong> ${dados.Actors}</p>

        <p><strong>Sinopse:</strong> ${dados.Plot}</p>

      </div>
    `;

  } catch (error) {

    container.innerHTML = `
      <p>Erro ao buscar filme</p>
    `;

    console.log(error);
  }
}

document
  .getElementById("movieInput")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
      buscarFilme();
    }

});