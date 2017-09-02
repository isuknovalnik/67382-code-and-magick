'use strict';

(function () {
  var userDialog = document.querySelector('.setup');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var displayWizards = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.setup.wizards.length; i++) {
      fragment.appendChild(renderWizard(window.setup.wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  displayWizards();
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardCoatValue = document.getElementsByName('coat-color');
  var setupCoats = window.setup.WIZARD_COAT_COLORS.slice();
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupEyes = window.setup.WIZARD_EYES_COLORS.slice();
  var wizardEyesValue = document.getElementsByName('eyes-color');

  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var setupFireballValue = document.getElementsByName('fireball-color');
  var fireballs = window.setup.WIZARD_FIREBALL_COLORS.slice();

  setupOpen.addEventListener('click', openPopup);
  setupClose.addEventListener('click', closePopup);
  userNameInput.addEventListener('focus', onUserNameFocus);
  userNameInput.addEventListener('blur', onUserNameBlur);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  setupFireball.addEventListener('click', onFireballClick);

  setupOpen.addEventListener('keydown', onSetupOpenKeyPress);

  setupClose.addEventListener('keydown', onSetupCloseKeyPress);

  function onSetupOpenKeyPress(evt) {
    window.util.isEnterEvent(evt, openPopup);
  }

  function onSetupCloseKeyPress(evt) {
    window.util.isEnterEvent(evt, closePopup);
  }

  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onUserNameFocus() {
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onUserNameBlur() {
    document.addEventListener('keydown', onPopupEscPress);
  }

  function closePopup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onWizardCoatClick() {
    var selectedCoat = window.util.getUniqueRandomElement(setupCoats);
    setupCoats = selectedCoat[1].length ? selectedCoat[1] : window.setup.WIZARD_COAT_COLORS.slice();
    wizardCoat.style.fill = selectedCoat[0];
    wizardCoatValue.value = selectedCoat[0];
  }

  function onWizardEyesClick() {
    var selectedEyes = window.util.getUniqueRandomElement(setupEyes);
    setupEyes = selectedEyes[1].length ? selectedEyes[1] : window.setup.WIZARD_EYES_COLORS.slice();
    wizardEyes.style.fill = selectedEyes[0];
    wizardEyesValue.value = selectedEyes[0];
  }

  function onFireballClick() {
    var selectedFireball = window.util.getUniqueRandomElement(fireballs);
    fireballs = selectedFireball[1].length ? selectedFireball[1] : window.setup.WIZARD_FIREBALL_COLORS.slice();
    setupFireball.style.backgroundColor = selectedFireball[0];
    setupFireballValue.value = selectedFireball[0];
  }
})();
