function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  //Passando valores padrão para o caso usuário não passa-los
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = 'monthly',
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = 'monthly'
) {

  if (!timeHorizon || !startingAmount) {
    throw new Error('Investimento inicial e prazo de devem ser preenchidos com valores positivos.')
  }

  const finalReturnRate = returnTimeFrame === 'monthly'
    ? 1 + returnRate / 100
    : convertToMontlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon = timePeriod === 'monthly'
    ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount
  }

  const returnsArray = [referenceInvestmentObject];

  for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++) {

    const previousTotalAmount = returnsArray[timeReference - 1].totalAmount;
    
    if (!isNaN(previousTotalAmount)) {

      const totalAmount = returnsArray[timeReference - 1].totalAmount * finalReturnRate + monthlyContribution;
      const interestReturns = returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);
      const investedAmount = startingAmount + monthlyContribution + timeReference;
      const totalInterestReturns = totalAmount - investedAmount;

      // const totalAmount = previousTotalAmount * finalReturnRate + monthlyContribution;
      // const interestReturns = totalAmount - previousTotalAmount - monthlyContribution;
      // const investedAmount = startingAmount + monthlyContribution * timeReference;
      // const totalInterestReturns = totalAmount - investedAmount;

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

  return returnsArray;
}
