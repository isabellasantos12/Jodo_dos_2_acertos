let dinheiro = 1000.00

function rolar() {
    const valorAposta = parseFloat(document.getElementById('aposta').value)
    const numero1 = parseInt(document.getElementById('numero1').value)
    const numero2 = parseInt(document.getElementById('numero2').value)
    const numero3 = parseInt(document.getElementById('numero3').value)

    //checar se os números são inválidos
    if ([numero1, numero2, numero3].some(num => isNaN(num) || num < 1 || num > 10)) {
        alert('Por favor, preencha todos os números com valores entre 1 e 10.')
        return
    }

    //checar se o valor da aposta é inválido
    if (valorAposta <= 0 || valorAposta > dinheiro) {
        alert('Aposta inválida ou valor maior que o disponível.')
        return
    }

    //sortear 3 números
    const sorteios = []
    while (sorteios.length < 3) {
        const num = Math.floor(Math.random() * 10) + 1
        if (!sorteios.includes(num)) {
            sorteios.push(num)
        }
    }

    //verificar número de acertos
    let filtrar = []
    filtrar = sorteios.filter(num => [numero1, numero2, numero3].includes(num))
    const acertos = filtrar.length

    //checar resultado
    let resultado = ''
    if (acertos === 3) {
        dinheiro += valorAposta * 2
        resultado = `Você ganhou o triplo da aposta!<br> Seu prêmio é R$${(valorAposta * 3).toFixed(2)}`
    } else if (acertos === 2) {
        dinheiro += valorAposta
        resultado = `Você ganhou um valor adicional!<br> Seu prêmio é R$${(valorAposta * 2).toFixed(2)}`
    } else {
        dinheiro -= valorAposta
        resultado = 'Você perdeu. Tente novamente!'
    }

    //atualizar display
    document.querySelector('.box1 label').innerHTML = `Cache: <b>R$${dinheiro.toFixed(2)}</b>`
    document.getElementById('numeros-sorteados').innerHTML = `Números sorteados: ${sorteios.join(', ')}`
    document.getElementById('resultado').innerHTML = resultado

    //checar se o cache chegou a zero ou abaixo
    if (dinheiro <= 0) {
        document.getElementById('resultado').innerHTML = `Você perdeu! Zerou o  cachê :(<br> Recarregue a página e tente novamente.`
    }
}

