'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var selections = [];

function getRandomElement(arr, n) {
  var ratio = 1 / arr.length;
  var lastIndex = arr.length - 1;
  var randomValue = Math.random();
  for (var j = 0; j < lastIndex; j++) {
    if (randomValue <= (j + 1) * ratio) {
      selections[n] = j;
      return arr[j];
    }
  }
  selections[n] = lastIndex;
  return arr[lastIndex];
}

function describeWizards(names, surnames, coats, eyes) {
  for (var k = 0; k < 4; k++) {
    wizards[k] = {
      name: getRandomElement(names, 0) + ' ' + getRandomElement(surnames, 1),
      coatColor: getRandomElement(coats, 2),
      eyesColor: getRandomElement(eyes, 3)
    };
    names.splice(selections[0], 1);
    surnames.splice(selections[1], 1);
    coats.splice(selections[2], 1);
    eyes.splice(selections[3], 1);
  }
}

describeWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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
