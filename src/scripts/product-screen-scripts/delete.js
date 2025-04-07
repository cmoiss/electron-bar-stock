// Adicione estas variáveis no início do seu script
const deleteButtons = document.querySelectorAll('.bi-trash');
const deletePopup = document.getElementById('deletePopup');
const closeDeletePopup = document.getElementById('closeDeletePopup');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const productToDeleteName = document.getElementById('productToDeleteName');

let productToDelete = null;

// Adicione este evento para cada botão de deletar
deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const row = this.closest('tr');
        productToDelete = row;
        const productName = row.querySelector('td:first-child').textContent;
        
        productToDeleteName.textContent = productName;
        deletePopup.classList.add('active');
    });
});

// Feche o popup de confirmação
function closeDeleteConfirmation() {
    deletePopup.classList.remove('active');
    productToDelete = null;
}

closeDeletePopup.addEventListener('click', closeDeleteConfirmation);
cancelDeleteBtn.addEventListener('click', closeDeleteConfirmation);

// Confirme a exclusão
confirmDeleteBtn.addEventListener('click', function() {
    if (productToDelete) {
        // Aqui você faria a chamada para a API de exclusão
        console.log('Produto excluído:', productToDeleteName.textContent);
        
        // Simulando a exclusão (remova esta linha quando conectar com o backend)
        productToDelete.remove();
        
        closeDeleteConfirmation();
    }
});