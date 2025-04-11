const API_KEY = '4491f7100c40400d99751055a5e485ac';
const endpoint = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=12&apiKey=${API_KEY}`;

async function carregarNoticias() {
  try {
    const resposta = await fetch(endpoint);
    const dados = await resposta.json();

    if (dados.status === "ok") {
      exibirNoticias(dados.articles);
    } else {
      console.error("Erro na API:", dados);
      alert("Erro ao carregar notícias. Verifique sua chave da API.");
    }
  } catch (erro) {
    console.error("Erro ao buscar dados da API:", erro);
  }
}

function exibirNoticias(noticias) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';

  noticias.forEach(noticia => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card h-100">
        <img src="${noticia.urlToImage || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="Imagem da notícia">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${noticia.title}</h5>
          <p class="card-text">${noticia.description || 'Sem descrição disponível.'}</p>
          <a href="${noticia.url}" target="_blank" class="btn btn-primary mt-auto">Ler mais</a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

carregarNoticias();
