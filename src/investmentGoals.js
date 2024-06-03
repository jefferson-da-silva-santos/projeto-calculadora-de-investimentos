function convertToMontlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1/12);
}

function generateReturnsArray(
  //Passando valores padrão para o caso usuário não passa-los
  startingAmount = 0, 
  timeHorizon = 0, 
  timePeriod = 'monthly',
  monthlyContribution = 0, 
  returnRate = 0, 
  returnTimeFrame = 'monthly') {

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
      investedAmount : startingAmount,
      interestReturns: 0,
      totalInterestReturns: 0,
      month: 0,
      totalAmount: startingAmount
     }

     const returnsArray = [
      referenceInvestmentObject
     ]

     for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++) {
      const totalAmount = (startingAmount * finalReturnRate) + mon;
     }
  }