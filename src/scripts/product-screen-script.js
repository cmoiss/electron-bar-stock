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