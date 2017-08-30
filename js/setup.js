'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function getUniqueRandomElement(arr) {
  if (arr.length === 1) {
    return [arr[0], []];
  }
  var randomIndex = Math.floor(Math.random() * arr.length);
  var selectedElement = arr.splice(randomIndex, 1);
  return [selectedElement, arr];
}

function describeWizards() {
  var names = WIZARD_NAMES.slice();
  var surnames = WIZARD_SURNAMES.slice();
  var coats = WIZARD_COAT_COLORS.slice();
  var eyes = WIZARD_EYES_COLORS.slice();
  var selectedName;
  var selectedSurname;
  var selectedCoat;
  var selectedEyes;
  for (var k = 0; k < 4; k++) {
    selectedName = getUniqueRandomElement(names);
    names = selectedName[1];
    selectedSurname = getUniqueRandomElement(surnames);
    surnames = selectedSurname[1];
    selectedCoat = getUniqueRandomElement(coats);
    coats = selectedCoat[1];
    selectedEyes = getUniqueRandomElement(eyes);
    eyes = selectedEyes[1];
    wizards[k] = {
      name: selectedName[0] + ' ' + selectedSurname[0],
      coatColor: selectedCoat[0],
      eyesColor: selectedEyes[0]
    };
  }
}

describeWizards();

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
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
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
var setupCoats = WIZARD_COAT_COLORS.slice();
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupEyes = WIZARD_EYES_COLORS.slice();
var wizardEyesValue = document.getElementsByName('eyes-color');

var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupFireballValue = document.getElementsByName('fireball-color');
var fireballs = WIZARD_FIREBALL_COLORS.slice();

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
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
}

function onSetupCloseKeyPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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
  var selectedCoat = getUniqueRandomElement(setupCoats);
  setupCoats = selectedCoat[1].length ? selectedCoat[1] : WIZARD_COAT_COLORS.slice();
  wizardCoat.style.fill = selectedCoat[0];
  wizardCoatValue.value = selectedCoat[0];
}

function onWizardEyesClick() {
  var selectedEyes = getUniqueRandomElement(setupEyes);
  setupEyes = selectedEyes[1].length ? selectedEyes[1] : WIZARD_EYES_COLORS.slice();
  wizardEyes.style.fill = selectedEyes[0];
  wizardEyesValue.value = selectedEyes[0];
}

function onFireballClick() {
  var selectedFireball = getUniqueRandomElement(fireballs);
  fireballs = selectedFireball[1].length ? selectedFireball[1] : WIZARD_FIREBALL_COLORS.slice();
  setupFireball.style.backgroundColor = selectedFireball[0];
  setupFireballValue.value = selectedFireball[0];
}
