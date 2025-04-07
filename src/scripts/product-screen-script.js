// Add row selection functionality
document.querySelectorAll('#productTable tbody tr').forEach(row => {
    row.addEventListener('click', (e) => {
        // Don't select if clicking on action buttons
        if (!e.target.closest('.action-buttons')) {
            document.querySelectorAll('#productTable tbody tr').forEach(r => {
                r.classList.remove('selected');
            });
            row.classList.add('selected');
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-product input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('#productTable tbody tr').forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Get all product rows
    const productRows = document.querySelectorAll('.product-row');
    const popup = document.getElementById('productPopup');
    const closePopup = document.getElementById('closePopup');

    // Add double click event to each row
    productRows.forEach(row => {
        row.addEventListener('dblclick', function () {
            const productData = JSON.parse(this.getAttribute('data-product'));
            showProductPopup(productData);
        });
    });

    // Close popup when clicking X button
    closePopup.addEventListener('click', function () {
        popup.classList.remove('active');
    });

    // Close popup when clicking outside
    popup.addEventListener('click', function (e) {
        if (e.target === this) {
            popup.classList.remove('active');
        }
    });

    // Function to show product popup
    function showProductPopup(product) {
        // Set basic product info
        document.getElementById('popupNome').textContent = product.nome;
        document.getElementById('popupCategoria').textContent = product.categoria;
        document.getElementById('popupVolume').textContent = product.volume;
        document.getElementById('popupEstoqueInterno').textContent = product.estoqueInterno;
        document.getElementById('popupEstoqueExterno').textContent = product.estoqueExterno;

        // Create variation buttons
        const variationButtons = document.getElementById('variationButtons');
        variationButtons.innerHTML = '';

        product.variacoes.forEach(variation => {
            const button = document.createElement('button');
            button.className = 'variation-btn';
            button.textContent = variation;

            // Mark the current quantity as active
            if (variation === product.quantidadePack) {
                button.classList.add('active');
            }

            button.addEventListener('click', function () {
                // Remove active class from all buttons
                document.querySelectorAll('.variation-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked button
                this.classList.add('active');
            });

            variationButtons.appendChild(button);
        });

        // Show popup
        popup.classList.add('active');
    }
});