document.getElementById('search-button').addEventListener('click', searchProducts);

function searchProducts() {
    const query = document.getElementById('search-input').value.trim();
    const selectedMarketplace = document.getElementById('marketplace-select').value;
    
    if (query === "") return;

    // Condicional para diferentes marketplaces (agora só Mercado Livre)
    if (selectedMarketplace === "mercado_livre") {
        const mercadoLivreUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}`;

        // Limpar resultados anteriores
        document.getElementById('results').innerHTML = "";

        // Busca no Mercado Livre
        fetch(mercadoLivreUrl)
            .then(response => response.json())
            .then(data => {
                const sortedProducts = data.results.sort((a, b) => a.price - b.price);
                displayProducts(sortedProducts, 'Mercado Livre');
            })
            .catch(error => console.error('Erro ao buscar no Mercado Livre:', error));
    }
}

function displayProducts(products, source) {
    const resultsContainer = document.getElementById('results');
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <a href="${product.permalink}" class="view-button" target="_blank">Ver produto</a>
            <img class="mercado-livre-badge" src="mercado_livre_logo.png" alt="Mercado Livre">
        `;

        resultsContainer.appendChild(productDiv);
    });
}