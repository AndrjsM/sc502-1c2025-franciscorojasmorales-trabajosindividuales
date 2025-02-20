document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const filterCategory = document.getElementById('filterCategory');
    let products = [];

    // Maneja el evento de envío del formulario para agregar un producto
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productCategory = document.getElementById('productCategory').value;

        const newProduct = { id: Date.now(), name: productName, price: productPrice, category: productCategory };
        products.push(newProduct);
        productForm.reset();
        renderProducts();
    });

    // Maneja el evento de cambio del filtro de categoría
    filterCategory.addEventListener('change', () => {
        renderProducts();
    });

    // Renderiza la lista de productos en el DOM
    function renderProducts() {
        const selectedCategory = filterCategory.value;
        productList.innerHTML = '';

        const filteredProducts = selectedCategory === 'Todos' ? products : products.filter(product => product.category === selectedCategory);

        filteredProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${product.name} - $${product.price} (${product.category})</span>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Eliminar</button>
            `;
            productList.appendChild(listItem);
        });
    }

    // Elimina un producto de la lista
    window.deleteProduct = function(id) {
        products = products.filter(product => product.id !== id);
        renderProducts();
    }
});
