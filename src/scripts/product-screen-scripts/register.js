document.addEventListener('DOMContentLoaded', function () {
    const registerBtn = document.getElementById('registerProductBtn');
    const registerPopup = document.getElementById('registerPopup');
    const closeRegisterPopup = document.getElementById('closeRegisterPopup');
    const cancelBtn = document.querySelector('.cancel-btn');
    const registerForm = document.querySelector('.register-form');
    const volumeSelect = document.getElementById('productVolume');
    const unitSelect = document.getElementById('volumeUnit');

    // Volume options based on unit
    const volumeOptions = {
        ml: ['350ml', '500ml', '600ml'],
        L: ['1L', '1.5L', '2L', '2.5L']
    };

    // Function to update volume options
    function updateVolumeOptions() {
        const selectedUnit = unitSelect.value;
        const options = volumeOptions[selectedUnit];

        // Clear existing options
        volumeSelect.innerHTML = '';

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Volume';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        volumeSelect.appendChild(defaultOption);

        // Add new options
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            volumeSelect.appendChild(opt);
        });
    }

    // Initialize volume options
    updateVolumeOptions();

    // Update options when unit changes
    unitSelect.addEventListener('change', updateVolumeOptions);

    // Open register popup
    registerBtn.addEventListener('click', function () {
        registerPopup.classList.add('active');
    });

    // Close register popup
    function closeRegister() {
        registerPopup.classList.remove('active');
    }

    closeRegisterPopup.addEventListener('click', closeRegister);
    cancelBtn.addEventListener('click', closeRegister);

    function registerProduct(productData) {
        const productPayload = {
            name: productData.name, // Melhor usar dot notation
            category: productData.category,
            volumeVariations: [
                {
                    volume: parseFloat(productData.volume),
                    price: parseFloat(productData.price),
                    internalQuanty: parseInt(productData.internalStock)
                }
            ]
        };

        fetch("http://localhost:8080/products/save", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productPayload)
        })
            .then(response => {
                if (!response.ok) {
                    // Melhor tratamento de erro - tenta extrair a mensagem do servidor
                    return response.json().then(err => {
                        throw new Error(err.message || "Erro na requisição");
                    });
                }
                return response.json();
            })
            .then(data => console.log("Sucesso: ", data))
            .catch(error => console.log("Erro: ", error));
    }

    // Handle form submission
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            volume: document.getElementById('productVolume').value,
            unit: document.getElementById('volumeUnit').value,
            price: parseFloat(document.getElementById('productPrice').value),
            internalStock: parseInt(document.getElementById('internalStock').value),
            externalStock: parseInt(document.getElementById('externalStock').value) || 0,
            unitsPerPack: document.getElementById('unitsPerPack').value
        };

        console.log('Product to register:', productData);

        registerProduct(productData);

        // Close popup and reset form
        closeRegister();
        registerForm.reset();
        updateVolumeOptions(); // Reset volume options

        // Here you would typically add the new product to the table
        // For example: addProductToTable(productData);
    });
});