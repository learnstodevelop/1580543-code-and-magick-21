'use strict';

(function () {
  const TOTAL_WIZARDS = 4;
  const WIZARD_FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  const WIZARD_LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  const EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'];
  const COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  const FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;

  const setup = document.querySelector('.setup');
  const setupOpen = document.querySelector('.setup-open');
  const setupClose = setup.querySelector('.setup-close');
  const userNameInput = setup.querySelector('.setup-user-name');
  const wizardCoat = setup.querySelector('.wizard-coat');
  const wizardCoatInput = setup.querySelector('input[name=coat-color]');
  const wizardEyes = setup.querySelector('.wizard-eyes');
  const wizardEyesInput = setup.querySelector('input[name=eyes-color]');
  const wizardFireballWrap = setup.querySelector('.setup-fireball-wrap');
  const wizardFireballColorInput = setup.querySelector('input[name=fireball-color]');
  const setupPlayer = setup.querySelector('.setup-player');

  const onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      setup.classList.add('hidden');
    }
  };

  const openPopup = function () {
    setup.classList.remove('hidden');
    setup.querySelector('.setup-similar').classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    userNameInput.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    });
    userNameInput.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEscPress);
    });
    setupPlayer.addEventListener('click', playerSettingsHandler);
  };

  const closePopup = function () {
    setup.classList.add('hidden');
    setup.querySelector('.setup-similar').classList.remove('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    userNameInput.removeEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    });
    userNameInput.removeEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEscPress);
    });
    setupPlayer.removeEventListener('click', playerSettingsHandler);
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
    const similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    const wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  const renderWizards = function () {
    const similarListElement = document.querySelector('.setup-similar-list');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < getWizards().length; i++) {
      fragment.appendChild(renderWizard(getWizards()[i]));
    }
    similarListElement.appendChild(fragment);
  };

  const playerSettingsHandler = function (evt) {
    if (evt.target && evt.target.matches('.wizard-coat')) {
      wizardCoatInput.value = getRandomElement(COAT_COLORS);
      wizardCoat.style.fill = wizardCoatInput.value;
    } else if (evt.target && evt.target.matches('.wizard-eyes')) {
      wizardEyesInput.value = getRandomElement(EYES_COLORS);
      wizardEyes.style.fill = wizardEyesInput.value;
    } else if (evt.target && evt.target.matches('.setup-fireball')) {
      wizardFireballColorInput.value = getRandomElement(FIREBALL_COLORS);
      wizardFireballWrap.style.background = wizardFireballColorInput.value;
    }
  };

  renderWizards();

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });

  userNameInput.addEventListener('input', function () {
    const valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }
    userNameInput.reportValidity();
  });
})();

