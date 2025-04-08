document.addEventListener("DOMContentLoaded", () => {
    fetchProductsFromAPI();
});

async function fetchProductsFromAPI() {
    try {
        const response = await fetch('http://localhost:8080/products');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        
        data.forEach(product => {
            const row = createProductRow(product);
            document.querySelector("#productTable tbody").appendChild(row);
        });
        
    } catch (error) {
        console.error("Erro ao buscar produtos da API:", error);
    }
}

function createProductRow(product) {
    const tr = document.createElement("tr");
    tr.classList.add("product-row");
    tr.dataset.product = JSON.stringify(product);

    tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.volume || '0'}</td>
        <td>${product.volumeVariation[0].price.price.toLocaleString(
            'pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }
        ) || 'R$ 0,00'}</td>
        <td>${product.estoqueInterno || 0}</td>
        <td>${product.category.name}</td>
        <td class="action-buttons">
            <button><i class="bi bi-pencil"></i></button>
            <button><i class="bi bi-trash"></i></button>
        </td>
    `;

    return tr;
}