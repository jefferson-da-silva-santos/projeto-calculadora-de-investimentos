function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

function generateReturnsArray(
  //Passando valores padrão para o caso usuário não passa-los
  startingAmount = 0, //Quantia inicial do investimento.
  timeHorizon = 0, //O período de tempo (em meses ou anos) para o investimento.
  timePeriod = 'monthly', //O período de tempo para calcular os retornos (mensal ou anual).
  monthlyContribution = 0, //O valor mensal adicionado ao investimento.
  returnRate = 0, //A taxa de retorno do investimento (anual ou mensal).
  returnTimeFrame = 'monthly' //O período de tempo para a taxa de retorno (mensal ou anual).
) {

  //Regras de negócios:
  if (!timeHorizon || !startingAmount) {
    throw new Error('Investimento inicial e prazo de devem ser preenchidos com valores positivos.')
  }

  const finalReturnRate = returnTimeFrame === 'monthly'
    ? 1 + returnRate / 100
    : convertToMontlyReturnRate(! + returnRate / 100);

  const finalTimeHorizon = timePeriod === 'monthly'
    ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount
  }

  const returnsArray = [referenceInvestmentObject, {}];

  for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++) {
    const totalAmount = returnsArray[timeReference - 1].totalAmount * finalReturnRate + monthlyContribution;
    const interestReturns = returnsArray[timeReference - 1].totalAmount * finalReturnRate;
    const investedAmount = startingAmount + monthlyContribution * timeReference;
    const totalInterestReturns = totalAmount - investedAmount;

    returnsArray.push({
      investedAmount: investedAmount,
      interestReturns: interestReturns,
      totalInterestReturns: totalInterestReturns,
      month: timeReference,
      totalAmount: totalAmount
    });
  }

  return returnsArray;
}