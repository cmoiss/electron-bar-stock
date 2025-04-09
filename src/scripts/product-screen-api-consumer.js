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

    if (product.volumeVariations[0].volume < 1000) {
        product.volumeVariations[0].volume += "mL"
    } else {
        product.volumeVariations[0].volume /= 1000
        product.volumeVariations[0].volume += "L"
    }

    tr.innerHTML = `
        <td>${product.name}</td>
        <td>${product.volumeVariations[0].volume || '0'}</td>
        <td>${product.volumeVariations[0].price.toLocaleString(
            'pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }
        ) || 'R$ 0,00'}</td>
        <td>${product.volumeVariations[0].internalQuantity || 0}</td>
        <td>${product.category}</td>
        <td class="action-buttons">
            <button><i class="bi bi-pencil"></i></button>
            <button><i class="bi bi-trash"></i></button>
        </td>
    `;

    return tr;
}