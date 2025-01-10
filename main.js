const form = document.querySelector('form')
const amount = document.getElementById('amount'); // variavel do valor da despesa
const expense = document.getElementById('expense') // variavel para o tipo da despesa
const category = document.getElementById('category') // Categoria da despesa
const expenseQtd = document.querySelector('aside header p span')
const expensesTotal = document.querySelector('aside header h2')



const expenseList = document.querySelector('ul');

//CAPTURANDO O EVENTO DO INPUT PARA FORMATAR O VALOR
amount.oninput = () => { // oninput captura o valor quando é inserido algo no input (arrow function)
    
    let value = amount.value.replace(/\D/g, '') // guarda o valor do input e utiliza a funcao regex para formatar e aceitar somente numeros, substitui letras por nada.

    value = Number(value) / 100; // converte o input em numero e divide por 100, para o valor comecar a ser digitado em centavos.

    amount.value = formatCurrencyBRL(value); // valor do input recebe somente a formatacao.
}

function formatCurrencyBRL(value){
    value = value.toLocaleString('pt-BR', { // FORMATA O INPUT PARA O TIPO DE MOEDA BR
        style: 'currency',
        currency: 'BRL',
    }
    )

    return value; // RETORNA O PROPRIO VALOR
}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = { // AO submeter o formulario gera o objeto abaixo
        id: new Date().getTime(), // recebe o id do user
        expense: expense.value, // recebe o nome da despesa 
        category_id: category.value, // recebe o value do options
        category_name: category.options[category.selectedIndex].text, // recebe o value do options e transforma para texto
        amount: amount.value, // recebe o valor da despesa
        created_at: new Date(), // recebe a data em que foi criada a solicitação.
    }
    
    expenseAdd(newExpense);
} 

// funcao para adicionar item na lista
function expenseAdd(newExpense){

    try {
        const expenseItem = document.createElement('li') // cria o li
        expenseItem.classList.add('expense')


        expenseItem.innerHTML = `<img src="./img/${newExpense.category_id}.svg" alt="${newExpense.category_name}" />

                                <div class="expense-info">
                                    <strong>${newExpense.expense}</strong>
                                    <span>${newExpense.category_name}</span>
                                </div>

                                <span class="expense-amount"><small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}</span>
            
                                <img src="./img/remove.svg" alt="remover" class="remove-icon" />`

        expenseList.append(expenseItem); // adiciona tudo dentro da ul

        updateTotals();
        
    } catch (error) {
        
    }
}

// atualiza soma total de despesas
function updateTotals(){
    try {
        const items = expenseList.children // guarda na variavel a quantidade de filhos

        console.log(items)
        expenseQtd.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}` // condição ternaria para atualizar a qtd de itens.
        
    
    let total = 0

    for(let i = 0; i < items.length; i++){
        const itemAmount = items[i].querySelector('.expense-amount')

        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".") // formata e remove todo caracter de texto, deixando somente numeros e troca a virgula pelo ponto.
        
        //converte o valor para float
        value = parseFloat(value);

        //verificando se é numero valido

        // if(isNaN){
        //     return alert('ERRO')
        // }

        // soma o valor total

        total += value;
    }

    expensesTotal.textContent = total;

    } catch (error) {
        console.log(error)
    }
}




