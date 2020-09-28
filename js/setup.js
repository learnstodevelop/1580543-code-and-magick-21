'use strict';

(function () {
  const TOTAL_WIZARDS = 4;
  const WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор',
    'Юлия', 'Люпита', 'Вашингтон'];
  const WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко',
    'Топольницкая', 'Нионго', 'Ирвинг'];
  const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  const similarListElement = document.querySelector('.setup-similar-list');
  const similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  const fragment = document.createDocumentFragment();

  const showSettings = function () {
    const userDialog = document.querySelector('.setup');
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  const getRandomElement = function (arr) {
    const randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
  };

  const getWizardName = function (firstName, lastName) {
    const fullName = firstName + ' ' + lastName;
    return fullName;
  };

  const getWizards = function () {
    const wizards = [];
    for (let i = 0; i < TOTAL_WIZARDS; i++) {
      wizards.push({
        name: getWizardName(getRandomElement(WIZARD_FIRST_NAMES),
            getRandomElement(WIZARD_LAST_NAMES)),
        coatColor: getRandomElement(COAT_COLORS),
        eyesColor: getRandomElement(EYES_COLORS)
      });
    }
    return wizards;
  };

  const renderWizard = function (wizard) {
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  const renderWizards = function () {
    for (let i = 0; i < getWizards().length; i++) {
      fragment.appendChild(renderWizard(getWizards()[i]));
    }
    similarListElement.appendChild(fragment);
  };

  renderWizards();
  showSettings();
})();

