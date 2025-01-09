const amount = document.getElementById('amount'); // variavel do valor da despesa



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



