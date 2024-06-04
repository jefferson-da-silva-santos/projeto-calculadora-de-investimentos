import { generateReturnsArray } from "./src/investmentGoals";

const buttonLimpar = document.getElementById('clear-form');
const form = document.getElementById('investment-form');

function renderProgression(event) {
  event.preventDefault(); //parando o envio do form

  if (document.querySelector('.error')) {
    return;
  }

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

  console.log(returnsArray);
}

function clearForm() {
  form['starting-amount'].value = '';
  form['additional-contribution'].value = '';
  form['time-amount'].value = '';
  form['time-amount-period'].value = '';
  form['evaluation-period'].value = '';
  form['return-rate'].value = '';
  form['tax-rate'].value = '';

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