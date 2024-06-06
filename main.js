import { generateReturnsArray } from "./src/investmentGoals";
import { Chart } from "chart.js/auto";

const buttonLimpar = document.getElementById('clear-form');
const form = document.getElementById('investment-form');

const finalMoneyChart = document.getElementById('final-money-distribution');
const progressionChart = document.getElementById('progression');

let progressionChartReference = {};
let doughnutChartReference = {};

function formatCurrency(value) {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0.00';
  }
  return value.toFixed(2);
}

function renderProgression(event) {
  event.preventDefault(); //parando o envio do form

  if (document.querySelector('.error')) {
    return;
  }
  resetCharts();
  const startingAmount = Number(form['starting-amount'].value.replace(',', '.'));
  const additionalContribution = Number(form['additional-contribution'].value.replace(',', '.'));
  const timeAmount = Number(form['time-amount'].value);
  const timeAmountPeriod = form['time-amount-period'].value;
  const returnRatePeriod = form['evaluation-period'].value;
  const returnRate = Number(form['return-rate'].value.replace(',', '.'));
  const taxRate = Number(form['tax-rate'].value.replace(',', '.'));

  /**
   * No código acima estamos pegando os valores do input do form a parti do name de cada input,
   * esses 'name' estão fazendo parte uma NodeList no formulário e a sintax para acessalos é
   * é esta form['name-do-input'].value
   * 
   * form => instância da tag form
   * ['name-do-input'] => referência ao input da lista que desejamos pelo atributo name]
   * .value => para puxar o que foi digitado
   */

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: 'doughnut',
    data: {
      labels: [
        'Total investido',
        'Rendimento',
        'Imposto'
      ],
      datasets: [{
        data: [
          formatCurrency(finalInvestmentObject.investedAmount),
          formatCurrency(finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)),
          formatCurrency(finalInvestmentObject.totalInterestReturns * (taxRate / 100))
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },

  });

  progressionChartReference = new Chart(progressionChart, {
    type: 'bar',
    data: {
      labels: returnsArray.map(
        investmentObject => investmentObject.month
      ),
      datasets: [{
        label: 'Total Investido',
        data: returnsArray.map(
          (investmentObject) =>
            formatCurrency(investmentObject.investedAmount)
        ),
        backgroundColor: 'rgb(255, 99, 132)'
      }, {
        label: 'Retorno do Investimento',
        data: returnsArray.map(
          (investmentObject) => 
            formatCurrency(investmentObject.interestReturns)
        ),
        backgroundColor: 'rgb(54, 162, 235)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }

    }
  })
}

function isObjectEmpty(object) {
  return Object.keys(object).length === 0;
}

function resetCharts() {
  if (!isObjectEmpty(doughnutChartReference) && !isObjectEmpty(progressionChart)) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm() {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['time-amount-period'].value = '';
  form['evaluation-period'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

  resetCharts();

  const errorInputsContainers = document.querySelectorAll('.error');

  for (const erroInputContainer of errorInputsContainers) {
    erroInputContainer.classList.remove('error');
    erroInputContainer.parentElement.querySelector('p').remove();
  }
}

function validateInput(event) {
  if (event.target.value === '') {
    return;
  }
  const { parentElement } = event.target;
  const grandParentElement = event.target.parentElement.parentElement;
  const inputValue = event.target.value.replace(",", ".");

  if (!parentElement.classList.contains('error') && (isNaN(inputValue) || Number(inputValue) <= 0)) {

    const errorTextElement = document.createElement('p');
    errorTextElement.classList.add('text-red-500');
    errorTextElement.innerText = 'Insira um valor numérico e maior do que zero';

    parentElement.classList.add('error');
    grandParentElement.appendChild(errorTextElement);

  } else if (parentElement.classList.contains('error') && !isNaN(inputValue) && Number(inputValue) > 0) {
    parentElement.classList.remove('error');
    grandParentElement.querySelector('p').remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')) {
    formElement.addEventListener('blur', validateInput);
  }
}

form.addEventListener('submit', renderProgression);
buttonLimpar.addEventListener('click', clearForm);