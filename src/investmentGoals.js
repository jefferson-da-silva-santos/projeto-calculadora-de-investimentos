// Função que converte uma taxa de retorno anual em uma taxa de retorno mensal
function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
  //// Usando operador de exponenciação para calcular a taxa mensal
}

// Função que gera um array de retornos ao longo do tempo
export function generateReturnsArray(
  // Valores padrão caso não sejam fornecidos pelo usuário
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthly',
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = 'monthly'
) {

  // Verifica se o investimento inicial e o prazo foram fornecidos
  if (!timeHorizon || !startingAmount) {
    throw new Error('Investimento inicial e prazo de devem ser preenchidos com valores positivos.')
  }

  // Calcula a taxa de retorno final com base no período de tempo fornecido
  const finalReturnRate = returnTimeFrame === 'monthly'
    ? 1 + returnRate / 100
    : convertToMontlyReturnRate(1 + returnRate / 100);

  // Converte o prazo para meses se necessário
  const finalTimeHorizon = timePeriod === 'monthly'
    ? timeHorizon : timeHorizon * 12;

  // Objeto de investimento de referência
  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount
  }

  // Array que armazenará os retornos ao longo do tempo, começando com o investimento inicial
  const returnsArray = [referenceInvestmentObject];

  // Loop para calcular os retornos mensais
  for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++) {

    // Obtém o totalAmount do mês anterior
    const previousTotalAmount = returnsArray[timeReference - 1].totalAmount;
    
    // Verifica se o totalAmount é um número válido (não é NaN)
    if (!isNaN(previousTotalAmount)) {

      // Calcula os valores do mês atual com base nos valores do mês anterior e nas entradas do usuário
      const totalAmount = previousTotalAmount * finalReturnRate + monthlyContribution;
      const interestReturns = previousTotalAmount * (finalReturnRate - 1);
      const investedAmount = startingAmount + monthlyContribution * timeReference;
      const totalInterestReturns = totalAmount - investedAmount;

      // Adiciona os valores calculados ao array de retornos
      returnsArray.push({
        investedAmount,
        interestReturns,
        totalInterestReturns,
        month: timeReference,
        totalAmount
      });
    } else {
      // Lidar com o caso em que o totalAmount do mês anterior é NaN
      // Por exemplo, você pode definir os valores de interestReturns e totalInterestReturns como 0
    }
  }

  // Retorna o array completo de retornos ao longo do tempo
  return returnsArray;
}