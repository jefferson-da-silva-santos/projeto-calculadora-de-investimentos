// Função que verifica se um array não está vazio
const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0; // Verifica se é um array e se tem elementos
}

// Função que cria uma tabela HTML com base em arrays de colunas e dados
export const createTable = (columnsArray, dataArray, tableId) => {
  // Verifica se os arrays de colunas e dados não estão vazios e se o id da tabela é fornecido
  if (
    !isNonEmptyArray(columnsArray) || // Verifica o array de colunas
    !isNonEmptyArray(dataArray) || // Verifica o array de dados
    !tableId // Verifica o id da tabela
  ) {
    throw new Error('Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também do id do elemento tabela selecionado');
  }

  // Obtém a referência do elemento da tabela pelo id fornecido
  const tableElement = document.getElementById(tableId);
  // Verifica se o elemento da tabela existe e se é de fato uma tabela HTML
  if (
    !tableElement || // Verifica se o elemento existe
    tableElement.nodeName !== 'TABLE' // Verifica se é uma tabela HTML
  ) {
    throw new Error('O elemento com o id fornecido não corresponde a um elemento table');
  }

  // Chama a função para criar o cabeçalho da tabela
  createTableHeader(tableElement, columnsArray);
  // Chama a função para criar o corpo da tabela
  createTableBody(tableElement, dataArray, columnsArray);
};

// Função interna para criar o cabeçalho da tabela
function createTableHeader(tableReference, columnsArray) {
  // Função para criar o elemento thead se ainda não existir
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead'); // Cria o elemento thead
    tableReference.appendChild(thead); // Adiciona ao elemento da tabela
    return thead;
  }
  // Obtém a referência do elemento thead ou cria um novo se não existir
  const tableHeaderReference = tableReference.querySelector('thead') ?? createTheadElement(tableReference);
  // Cria uma nova linha para o cabeçalho da tabela
  const headerRow = document.createElement('tr');
  // Adiciona classes CSS à linha do cabeçalho
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-0'].forEach(cssClass => headerRow.classList.add(cssClass));
  // Itera sobre as colunas para criar os elementos do cabeçalho
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/`<th class='text-center'>${tableColumnObject.columnLabel}</th>`; // Cria o elemento do cabeçalho
    headerRow.innerHTML += headerElement; // Adiciona o elemento à linha do cabeçalho
  }

  tableHeaderReference.appendChild(headerRow); // Adiciona a linha do cabeçalho ao elemento thead
}

// Função interna para criar o corpo da tabela
function createTableBody(tableReference, tableItems, columnsArray) {
  // Função para criar o elemento tbody se ainda não existir
  function createTbodyElement(tableReference) {
    const tbody = document.createElement('tbody'); // Cria o elemento tbody
    tableReference.appendChild(tbody); // Adiciona ao elemento da tabela
    return tbody;
  }
  // Obtém a referência do elemento tbody ou cria um novo se não existir
  const tableBodyReference = tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);
  // Itera sobre os itens da tabela para criar as linhas de dados
  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr'); // Cria uma nova linha para os dados
    // Adiciona classe de cor de fundo alternada para facilitar a leitura
    if (itemIndex % 2 !== 0) {
      tableRow.classList.add('bg-blue-200');
    }
    // Itera sobre as colunas para criar os elementos de célula de dados
    for (const tableColumn of columnsArray) {
      // Obtém a função de formatação da coluna ou usa uma função de formatação padrão se não for fornecida
      const formatFn = tableColumn.format ?? ((info) => info);
      // Cria o elemento de célula de dados com o valor formatado
      tableRow.innerHTML += /*html*/ `<td class='text-center'>${formatFn(tableItem[tableColumn.accessor])}</td>`;
    }
    tableBodyReference.appendChild(tableRow); // Adiciona a linha de dados ao elemento tbody
  }
}
