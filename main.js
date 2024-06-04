import { generateReturnsArray } from "./src/investmentGoals";

const buttonCalculate = document.getElementById('calculate-results');
const form = document.getElementById('investment-form');

function renderProgression(event) {
  event.preventDefault(); //parando o envio do form
  const startingAmount = Number(form['starting-amount'].value); //name do input do form
  const additionalContribution = Number(form['additional-contribution'].value);//name do input do form
  const timeAmount = Number(form['time-amount'].value);//name do input do form
  const timeAmountPeriod = form['time-amount-period'].value;//name do input do form
  const returnRatePeriod = form['evaluation-period'].value;//name do input do form
  const returnRate = Number(form['return-rate'].value);//name do input do form
  const taxRate = Number(form['tax-rate'].value);//name do input do form

  // const startingAmount = Number(document.getElementById('starting-amount').value);
  // const additionalContribution = Number(document.getElementById('additional-contribution').value);
  // const timeAmount = Number(document.getElementById('time-amount').value);
  // const timeAmountPeriod = document.getElementById('time-amount-period').value;
  // const returnRatePeriod = document.getElementById('evaluation-period').value;
  // const returnRatePeriod = document.getElementById('evaluation-period').value;
  // const returnRate = Number(document.getElementById('return-rate').value);
  // const taxRate = Number(document.getElementById('tax-rate').value);

  const returnsArray = generateReturnsArray(
    startingAmount, 
    timeAmount, 
    timeAmountPeriod, 
    additionalContribution, 
    returnRate, 
    returnRatePeriod
  );

  console.log(returnsArray);
}

buttonCalculate.addEventListener('click', renderProgression);