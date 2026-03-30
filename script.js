function calcular() {
    const fvInput = document.getElementById('fv');
    const pInput = document.getElementById('p');
    const iInput = document.getElementById('i');
    const nInput = document.getElementById('n');

    let fv = fvInput.value ? parseFloat(fvInput.value) : null;
    let p = pInput.value ? parseFloat(pInput.value) : null;
    let iRaw = iInput.value ? parseFloat(iInput.value) : null;
    let n = nInput.value ? parseFloat(nInput.value) : null;

    // Converte taxa (ex: 1 virá 0.01)
    let i = iRaw !== null ? (iRaw >= 1 ? iRaw / 100 : iRaw) : null;

    const memorial = document.getElementById('memorial');
    const finalDiv = document.getElementById('final');
    const container = document.getElementById('resultado-container');

    container.style.display = "block";
    container.style.backgroundColor = "#334155";

    // CALCULAR VALOR FUTURO (FV)
    if (fv === null && p !== null && i !== null && n !== null) {
        let potencia = Math.pow(1 + i, n);
        let subtraido = potencia - 1;
        let divisao = subtraido / i;
        let resultado = p * divisao;

        fvInput.value = resultado.toFixed(2);

        memorial.innerHTML = `
            FV = P * [ (1 + i)^n - 1 ] / i <br>
            FV = ${p} * [ (1 + ${i.toFixed(4)})^${n} - 1 ] / ${i.toFixed(4)} <br>
            FV = ${p} * [ ${potencia.toFixed(4)} - 1 ] / ${i.toFixed(4)} <br>
            FV = ${p} * [ ${subtraido.toFixed(4)} ] / ${i.toFixed(4)} <br>
            FV = ${p} * ${divisao.toFixed(4)}
        `;
        finalDiv.innerHTML = `Valor Futuro: <strong>R$ ${resultado.toFixed(2)}</strong>`;
    }

    // CALCULAR APORTE (P)
    else if (p === null && fv !== null && i !== null && n !== null) {
        let fator = (Math.pow(1 + i, n) - 1) / i;
        let resultado = fv / fator;
        pInput.value = resultado.toFixed(2);

        memorial.innerHTML = `
            P = FV / [ ((1 + i)^n - 1) / i ] <br>
            P = ${fv} / [ ((1 + ${i.toFixed(4)})^${n} - 1) / ${i.toFixed(4)} ] <br>
            P = ${fv} / ${fator.toFixed(6)}
        `;
        finalDiv.innerHTML = `Aporte Mensal: <strong>R$ ${resultado.toFixed(2)}</strong>`;
    }

    // CALCULAR TEMPO (n)
    else if (n === null && fv !== null && p !== null && i !== null) {
        let resN = Math.log((fv * i / p) + 1) / Math.log(1 + i);
        nInput.value = Math.round(resN);

        memorial.innerHTML = `
            n = log( (FV * i / P) + 1 ) / log( 1 + i ) <br>
            n = log( (${fv} * ${i.toFixed(4)} / ${p}) + 1 ) / log( 1 + ${i.toFixed(4)} ) <br>
            n = ${Math.log((fv * i / p) + 1).toFixed(4)} / ${Math.log(1 + i).toFixed(4)}
        `;
        finalDiv.innerHTML = `Tempo: <strong>${Math.round(resN)} meses</strong>`;
    }
    else {
        memorial.innerHTML = "Erro: Deixe apenas UM campo vazio.";
        container.style.backgroundColor = "#450a0a";
    }
}

function limparCampos() {
    document.querySelectorAll('input').forEach(input => input.value = "");
    document.getElementById('resultado-container').style.display = "none";
}
