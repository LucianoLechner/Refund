const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');
const expenseQtd = document.querySelector('aside header p span');
const expensesTotal = document.querySelector('aside header h2');
const expenseList = document.querySelector('ul');

function ObserveInput(){ 
    expense.addEventListener('input', function(e){
        let inputValue = e.target.value;
        if(inputValue !== ''){
            expense.style.outlineColor = "transparent";  
        }
    });

    amount.addEventListener('input', function(e){
        let inputValue = e.target.value;
        if(inputValue !== ''){
            amount.style.outlineColor = "transparent";  
        }
    });

    category.addEventListener('input', function(e){
        let inputValue = e.target.value;
        if (inputValue !== ''){
            category.style.outlineColor = "transparent";
        }
    });
}

function resetForm(){
    expense.value = '';
    category.value = '';
    amount.value = '';
    expense.focus();
}

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '');
    value = Number(value) / 100;
    amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value){
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return value;
}

form.onsubmit = (event) => {
    event.preventDefault();
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    };
    expenseAdd(newExpense);
};

function expenseAdd(newExpense){
    ObserveInput();
    if (expense.value === ''){
        expense.style.outlineColor = "red";
        return;
    } else if (category.value === ''){
        ObserveInput();
        category.style.outlineColor = "red";
        return;
    } else if (amount.value === ''){
        ObserveInput();
        amount.style.outlineColor = "red";
        return;
    } else {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense');
        expenseItem.innerHTML = `<img src="./img/${newExpense.category_id}.svg" alt="${newExpense.category_name}" />
                                <div class="expense-info">
                                    <strong>${newExpense.expense}</strong>
                                    <span>${newExpense.category_name}</span>
                                </div>
                                <span class="expense-amount"><small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}</span>
                                <img src="./img/remove.svg" alt="remover" class="remove-icon" />`;
        expenseList.append(expenseItem);
        updateTotals();
        resetForm();
    }
}

function updateTotals(){
    try {
        const items = expenseList.children;
        expenseQtd.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;
        let total = 0;
        for(let i = 0; i < items.length; i++){
            const itemAmount = items[i].querySelector('.expense-amount');
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
            value = parseFloat(value);
            total += value;
        }
        expensesTotal.textContent = formatCurrencyBRL(total);
    } catch (error) {
        alert('Erro, tente novamente mais tarde');
    }
}

expenseList.addEventListener('click', function(e){
    if(e.target.classList.contains('remove-icon')){
        const item = e.target.closest('.expense');
        item.remove();
    }
    updateTotals();
});
