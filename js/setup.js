'use strict';

(function () {

  window.setup = {
    WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    WIZARD_SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    WIZARD_FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    wizards: []
  };

  function describeWizards() {
    var names = window.setup.WIZARD_NAMES.slice();
    var surnames = window.setup.WIZARD_SURNAMES.slice();
    var coats = window.setup.WIZARD_COAT_COLORS.slice();
    var eyes = window.setup.WIZARD_EYES_COLORS.slice();
    var selectedName;
    var selectedSurname;
    var selectedCoat;
    var selectedEyes;
    for (var k = 0; k < 4; k++) {
      selectedName = window.util.getUniqueRandomElement(names);
      names = selectedName[1];
      selectedSurname = window.util.getUniqueRandomElement(surnames);
      surnames = selectedSurname[1];
      selectedCoat = window.util.getUniqueRandomElement(coats);
      coats = selectedCoat[1];
      selectedEyes = window.util.getUniqueRandomElement(eyes);
      eyes = selectedEyes[1];
      window.setup.wizards[k] = {
        name: selectedName[0] + ' ' + selectedSurname[0],
        coatColor: selectedCoat[0],
        eyesColor: selectedEyes[0]
      };
    }
  }

  describeWizards();
})();
