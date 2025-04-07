// scripts/product-screen-scripts/edit.js
document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.action-buttons button:first-child');
    const editPopup = document.getElementById('editPopup');
    const closeEditPopup = document.getElementById('closeEditPopup');
    const cancelEdit = document.getElementById('cancelEdit');
    const editForm = document.querySelector('.edit-form');
    
    // Abrir popup de edição
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('.product-row');
            const productData = JSON.parse(row.getAttribute('data-product'));
            
            // Preencher o formulário com os dados do produto
            document.getElementById('editProductName').value = productData.nome;
            document.getElementById('editProductCategory').value = productData.categoria;
            
            // Extrair volume e unidade
            const volumeMatch = productData.volume.match(/(\d+)(\w+)/);
            if (volumeMatch) {
                document.getElementById('editProductVolume').value = volumeMatch[1];
                document.getElementById('editVolumeUnit').value = volumeMatch[2];
            }
            
            document.getElementById('editUnitsPerPack').value = productData.quantidadePack;
            
            // Extrair valores numéricos do estoque
            const internalStock = productData.estoqueInterno.match(/\d+/);
            if (internalStock) {
                document.getElementById('editInternalStock').value = internalStock[0];
            }
            
            const externalStock = productData.estoqueExterno.match(/\d+/);
            if (externalStock) {
                document.getElementById('editExternalStock').value = externalStock[0];
            }
            
            // Extrair preço (assumindo que está na célula da tabela)
            const priceCell = row.querySelector('td:nth-child(3)');
            if (priceCell) {
                const price = priceCell.textContent.replace(/[^\d,]/g, '').replace(',', '.');
                document.getElementById('editProductPrice').value = parseFloat(price);
            }
            
            // Armazenar o ID ou referência do produto para atualização
            editForm.setAttribute('data-product-id', row.getAttribute('data-product-id') || '');
            
            // Mostrar popup
            editPopup.classList.add('active');
        });
    });
    
    // Fechar popup de edição
    function closeEditPopupFunc() {
        editPopup.classList.remove('active');
    }
    
    closeEditPopup.addEventListener('click', closeEditPopupFunc);
    cancelEdit.addEventListener('click', closeEditPopupFunc);
    
    // Enviar formulário de edição
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você implementaria a lógica para atualizar o produto
        const productId = this.getAttribute('data-product-id');
        const updatedProduct = {
            nome: document.getElementById('editProductName').value,
            categoria: document.getElementById('editProductCategory').value,
            volume: document.getElementById('editProductVolume').value + document.getElementById('editVolumeUnit').value,
            quantidadePack: document.getElementById('editUnitsPerPack').value,
            estoqueInterno: document.getElementById('editInternalStock').value + ' unidades',
            estoqueExterno: document.getElementById('editExternalStock').value + ' unidades',
            preco: parseFloat(document.getElementById('editProductPrice').value).toFixed(2)
        };
        
        console.log('Produto atualizado:', updatedProduct);
        
        // Aqui você chamaria a API para atualizar o produto
        // Exemplo: updateProduct(productId, updatedProduct);
        
        // Fechar popup
        closeEditPopupFunc();
        
        // Atualizar a linha na tabela (simulação)
        const row = document.querySelector(`.product-row[data-product-id="${productId}"]`);
        if (row) {
            row.cells[0].textContent = updatedProduct.nome;
            row.cells[1].textContent = updatedProduct.volume;
            row.cells[2].textContent = `R$ ${updatedProduct.preco}`;
            row.cells[3].textContent = updatedProduct.estoqueInterno;
            row.cells[4].textContent = updatedProduct.categoria;
            
            // Atualizar os dados no atributo data-product
            row.setAttribute('data-product', JSON.stringify(updatedProduct));
        }
        
        // Mostrar mensagem de sucesso
        alert('Produto atualizado com sucesso!');
    });
});