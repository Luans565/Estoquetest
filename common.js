// common.js

// Função para adicionar um item ao estoque
function addItem() {
    const name = document.getElementById('item-name') ? document.getElementById('item-name').value : '';
    const quantity = document.getElementById('item-quantity') ? document.getElementById('item-quantity').value : '';
    
    if (name && quantity) {
        // Parse quantity to integer
        const qty = parseInt(quantity);
        
        // Verifica se a quantidade é válida
        if (isNaN(qty) || qty <= 0) {
            alert('Quantidade deve ser um número positivo.');
            return;
        }

        // Obtém o estoque do localStorage
        let stock = JSON.parse(localStorage.getItem('stock')) || [];
        
        // Encontra o item no estoque
        const existingItem = stock.find(i => i.name === name);

        if (existingItem) {
            // Atualiza a quantidade do item existente
            existingItem.quantity += qty;
        } else {
            // Adiciona um novo item ao estoque
            stock.push({ name, quantity: qty });
        }

        // Salva o estoque atualizado no localStorage
        localStorage.setItem('stock', JSON.stringify(stock));

        // Atualiza a lista de estoque na página
        updateStockList();
        
        // Limpa os campos de entrada
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = '';
    } else {
        alert('Por favor, preencha o nome e a quantidade do item.');
    }
}

// Função para remover um item do estoque
function removeItem() {
    const name = document.getElementById('remove-item-name').value;
    const quantity = document.getElementById('remove-item-quantity').value;
    
    if (name && quantity) {
        // Parse quantity to integer
        const qty = parseInt(quantity);
        
        // Verifica se a quantidade é válida
        if (isNaN(qty) || qty <= 0) {
            alert('Quantidade deve ser um número positivo.');
            return;
        }

        // Obtém o estoque do localStorage
        let stock = JSON.parse(localStorage.getItem('stock')) || [];
        
        // Encontra o item no estoque
        const item = stock.find(i => i.name === name);

        if (item) {
            // Atualiza a quantidade do item existente
            item.quantity -= qty;
            
            // Remove o item se a quantidade for menor ou igual a zero
            if (item.quantity <= 0) {
                stock = stock.filter(i => i.name !== name);
            }

            // Salva o estoque atualizado no localStorage
            localStorage.setItem('stock', JSON.stringify(stock));

            // Atualiza a lista de estoque na página
            updateStockList();
            
            // Limpa os campos de entrada
            document.getElementById('remove-item-name').value = '';
            document.getElementById('remove-item-quantity').value = '';
        }
    } else {
        alert('Por favor, selecione um item e informe a quantidade.');
    }
}
// Função para editar um item no estoque
function editItem() {
    const name = document.getElementById('edit-item-name').value;
    const newName = document.getElementById('edit-new-item-name').value;
    const quantity = document.getElementById('edit-item-quantity').value;
    
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    
    const item = stock.find(i => i.name === name);

    if (item) {
        if (newName) item.name = newName;
        if (quantity) item.quantity = parseInt(quantity);
        localStorage.setItem('stock', JSON.stringify(stock));
        updateStockList();
    }
}

// Função para atualizar a lista de estoque na página
function updateStockList() {
    const stockList = document.getElementById('stock-list');
    stockList.innerHTML = '';
    
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    
    stock.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} ${item.quantity}`;
        stockList.appendChild(listItem);
    });
}

// Função para carregar os itens nas seções de remoção e edição
function loadItems() {
    const removeSelect = document.getElementById('remove-item-name');
    const editSelect = document.getElementById('edit-item-name');
    
    let stock = JSON.parse(localStorage.getItem('stock')) || [];
    
    removeSelect.innerHTML = '<option value="">Selecione um item</option>';
    editSelect.innerHTML = '<option value="">Selecione um item</option>';
    
    stock.forEach(item => {
        const optionRemove = document.createElement('option');
        optionRemove.value = item.name;
        optionRemove.textContent = item.name;
        removeSelect.appendChild(optionRemove);
        
        const optionEdit = document.createElement('option');
        optionEdit.value = item.name;
        optionEdit.textContent = item.name;
        editSelect.appendChild(optionEdit);
    });
}

// Função para alternar seções
function toggleSection(sectionId) {
    document.querySelectorAll('.hidden-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
    updateStockList();
});