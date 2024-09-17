
// Inicializando o Supabase
const supabaseUrl = 'https://odmvsudzjovymggwhulg.supabase.co'; // Substitua com o seu URL do Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbXZzdWR6am92eW1nZ3dodWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NzgxMzksImV4cCI6MjA0MjE1NDEzOX0.gcnzDJWAWWwOP5Um0paDB4P3fq17hH1ZQm-N8LsBZmA'; // Substitua com a sua Public API Key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function listStock() {
    const { data, error } = await supabase
      .from('estoque')
      .select('*'); // Seleciona todos os itens da tabela 'estoque'
    
    if (error) {
      console.error("Erro ao listar estoque:", error);
    } else {
      const stockList = document.getElementById('stock-list');
      stockList.innerHTML = ''; // Limpa a lista anterior
      
      data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - Quantidade: ${item.quantidade}`;
        stockList.appendChild(listItem);
      });
    }
  }
  async function removeItem() {
    const itemName = document.getElementById('remove-item-name').value;
    const itemQuantity = parseInt(document.getElementById('remove-item-quantity').value);
  

// Inicializando o Supabase
const supabaseUrl = 'https://odmvsudzjovymggwhulg.supabase.co'; // URL do Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbXZzdWR6am92eW1nZ3dodWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NzgxMzksImV4cCI6MjA0MjE1NDEzOX0.gcnzDJWAWWwOP5Um0paDB4P3fq17hH1ZQm-N8LsBZmA'; // Public API Key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Função para verificar se um registro foi feito
async function checkRecord(itemName) {
    const { data, error } = await supabase
        .from('estoque') // Nome da tabela
        .select('*')
        .eq('nome', itemName); // Substitua 'nome' pelo nome da coluna apropriada

    if (error) {
        console.error('Erro ao buscar registros:', error);
        return;
    }

    if (data.length > 0) {
        console.log('Registro encontrado:', data);
    } else {
        console.log('Nenhum registro encontrado para o item:', itemName);
    }
}

    // Busca o item pelo nome
    const { data, error } = await supabase
      .from('estoque')
      .select('*')
      .eq('nome', itemName); // Seleciona o item com o nome correspondente
  
    if (data.length === 0 || error) {
      console.error("Erro ao buscar o item:", error);
      alert("Item não encontrado!");
      return;
    }
  
    const item = data[0]; // Pega o primeiro item encontrado
    const novaQuantidade = item.quantidade - itemQuantity;
  
    // Atualiza a quantidade no banco de dados
    const { error: updateError } = await supabase
      .from('estoque')
      .update({ quantidade: novaQuantidade })
      .eq('id', item.id);
  
    if (updateError) {
      console.error("Erro ao remover item:", updateError);
    } else {
      alert("Item removido com sucesso!");
      listStock(); // Atualiza a lista de estoque
    }
  }
  
  // Chama a função quando a página carregar
  document.addEventListener('DOMContentLoaded', listStock);

let stock = {};

function addItem() {
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('item-quantity').value);

    if (name && !isNaN(quantity) && quantity > 0) {
        if (stock[name]) {
            stock[name] += quantity;
        } else {
            stock[name] = quantity;
        }
        updateStockTable();  // Atualiza a tabela de estoque
        updateSelectOptions();  // Atualiza as opções dos selects
        document.getElementById('item-name').value = '';
        document.getElementById('item-quantity').value = '';
    } else {
        alert('Por favor, insira um nome e uma quantidade válida.');
    }
}

function removeItem() {
    const name = document.getElementById('remove-item-name').value;
    const quantity = parseInt(document.getElementById('remove-item-quantity').value);

    if (name && !isNaN(quantity) && quantity > 0) {
        if (stock[name]) {
            const confirmRemoval = confirm('Tem certeza que deseja remover ${quantity} de ${name}?');
            if (confirmRemoval) {
                stock[name] -= quantity;
                if (stock[name] <= 0) {
                    delete stock[name];
                }
                updateStockTable();  // Atualiza a tabela de estoque
                updateSelectOptions();  // Atualiza as opções dos selects
                document.getElementById('remove-item-quantity').value = '';
            }
        } else {
            alert('Item não encontrado no estoque.');
        }
    } else {
        alert('Por favor, selecione um item e insira uma quantidade válida.');
    }
}

function editItem() {
    const name = document.getElementById('edit-item-name').value;
    const newName = document.getElementById('edit-new-item-name').value.trim();
    const quantity = parseInt(document.getElementById('edit-item-quantity').value);

    if (name && (!isNaN(quantity) || newName)) {
        if (stock[name]) {
            if (newName) {
                stock[newName] = stock[name];
                delete stock[name];
            }
            if (!isNaN(quantity)) {
                stock[newName || name] = quantity;
            }
            updateStockTable();  // Atualiza a tabela de estoque
            updateSelectOptions();  // Atualiza as opções dos selects
            document.getElementById('edit-new-item-name').value = '';
            document.getElementById('edit-item-quantity').value = '';
        } else {
            alert('Item não encontrado no estoque.');
        }
    } else {
        alert('Por favor, insira um novo nome ou quantidade válida.');
    }
}
function updateStockTable() {
    const stockTable = document.getElementById('stock-list');
    stockTable.innerHTML = '';  // Limpa a tabela antes de preenchê-la novamente

    // Verifica se há itens no estoque
    if (Object.keys(stock).length === 0) {
        const row = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 2;
        emptyCell.textContent = 'Estoque vazio';
        row.appendChild(emptyCell);
        stockTable.appendChild(row);
    } else {
        for (const [name, quantity] of Object.entries(stock)) {
            const row = document.createElement('tr');

            // Cria a célula do nome do item
            const nameCell = document.createElement('td');
            nameCell.textContent = name;
            row.appendChild(nameCell);

            // Cria a célula da quantidade
            const quantityCell = document.createElement('td');
            quantityCell.textContent = quantity;
            row.appendChild(quantityCell);

            // Adiciona a linha à tabela
            stockTable.appendChild(row);
        }
    }
}

function updateSelectOptions() {
    const removeSelect = document.getElementById('remove-item-name');
    const editSelect = document.getElementById('edit-item-name');

    removeSelect.innerHTML = '<option value="">Selecione um item</option>';
    editSelect.innerHTML = '<option value="">Selecione um item</option>';

    for (const name of Object.keys(stock)) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        removeSelect.appendChild(option);
        editSelect.appendChild(option.cloneNode(true));  // Clona a opção para usar no select de edição
    }
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}

// Inicializar ocultando as seções de retirada e edição
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('remove-section').style.display = 'none';
    document.getElementById('edit-section').style.display = 'none';
});