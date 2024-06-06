function converterParaTaxaDeRetornoMensal(taxaDeRetornoAnual) {
  return taxaDeRetornoAnual ** (1 / 12);
}

function gerarArrayDeRetornos(
  // Passando valores padrão caso o usuário não os forneça
  quantiaInicialInvestimento = 0, // Quantia inicial do investimento.
  periodoDeTempoParaInvestimento = 0, // O período de tempo (em meses ou anos) para o investimento.
  mensalOuAnual = 'mensal', // O período de tempo para calcular os retornos (mensal ou anual).
  valorMensalAdicionadoInvestimento = 0, // O valor mensal adicionado ao investimento.
  taxaDeRetorno = 0, // A taxa de retorno do investimento (anual ou mensal).
  periodoDeTempoParaTaxaRetorno = 'mensal' // O período de tempo para a taxa de retorno (mensal ou anual).
) {

  if (!periodoDeTempoParaInvestimento || !quantiaInicialInvestimento) {
    throw new Error('Montante inicial e horizonte temporal devem ser preenchidos com valores positivos.');
  }

  const taxaDeRetornoFinal = periodoDeTempoParaTaxaRetorno === 'mensal'
    ? 1 + taxaDeRetorno / 100
    : converterParaTaxaDeRetornoMensal(1 + taxaDeRetorno / 100);

  const horizonteTemporalFinal = mensalOuAnual === 'mensal'
    ? periodoDeTempoParaInvestimento : periodoDeTempoParaInvestimento * 12;

  const objetoInvestimentoInicial = {
    montanteInvestido: quantiaInicialInvestimento,
    retornosDeJuros: 0,
    totalDeRetornosDeJuros: 0,
    mes: 0,
    montanteTotal: quantiaInicialInvestimento
  };

  const arrayDeRetornos = [objetoInvestimentoInicial, {}];

  for (let referenciaTemporal = 1; referenciaTemporal <= horizonteTemporalFinal; referenciaTemporal++) {
    const montanteTotal = arrayDeRetornos[referenciaTemporal - 1].montanteTotal * taxaDeRetornoFinal + valorMensalAdicionadoInvestimento;
    const retornosDeJuros = arrayDeRetornos[referenciaTemporal - 1].montanteTotal * taxaDeRetornoFinal;
    const montanteInvestido = quantiaInicialInvestimento + valorMensalAdicionadoInvestimento * referenciaTemporal;
    const totalDeRetornosDeJuros = montanteTotal - montanteInvestido;

    arrayDeRetornos.push({
      montanteInvestido: montanteInvestido,
      retornosDeJuros: retornosDeJuros,
      totalDeRetornosDeJuros: totalDeRetornosDeJuros,
      mes: referenciaTemporal,
      montanteTotal: montanteTotal
    });
  }

  return arrayDeRetornos;
}
