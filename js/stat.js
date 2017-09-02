'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_LEFT = 100;
  var CLOUD_TOP = 10;
  var CLOUD_CORNER_RADIUS = 20;
  var CLOUD_TEXT_COLOR = '#000';

  var INITIAL_Y = CLOUD_HEIGHT + CLOUD_TOP - 35;
  var BAR_WIDTH = 40;

  // - функция roundedRect отсюда: https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/Рисование_фигур
  function roundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawBar(ctx, x, y, width, height, randomColor) {
    if (randomColor) {
      var opacity = Math.random();
      if (opacity <= 0.1) {
        opacity += 0.1;
      }
      ctx.fillStyle = 'rgba(0, 0, 255, ' + opacity.toString() + ')';
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(x, y, width, height);
  }

  function drawBarTitles(ctx, topText, bottomText, x, y, bottomY, color) {
    ctx.fillStyle = color;
    ctx.fillText(topText, x, y - 23);
    ctx.fillText(bottomText, x, bottomY + 4);
  }

  window.renderStatistics = function (ctx, names, times) {
    roundedRect(ctx, CLOUD_LEFT + 10, CLOUD_TOP + 10, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_CORNER_RADIUS, 'rgba(0, 0, 0, 0.7)');
    roundedRect(ctx, CLOUD_LEFT, CLOUD_TOP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_CORNER_RADIUS, 'rgba(256, 256, 256, 1.0)');

    ctx.textBaseline = 'top';
    ctx.font = '16px PT Mono';
    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText('Ура вы победили!', 120, 28);
    ctx.fillText('Список результатов:', 120, 48);

    var max = -1;

    for (var j = 0; j < times.length; j++) {
      times[j] = times[j].toFixed(0);
      var time = times[j];
      if (time > max) {
        max = time;
      }
    }

    var step = 150 / max;
    var barX;
    var barY;
    var barHeight;

    for (var i = 0; i < times.length; i++) {
      var randomColor = (names[i] !== 'Вы');

      barX = 140 + (BAR_WIDTH + 50) * i;
      barHeight = times[i] * step;
      barY = INITIAL_Y - barHeight;

      drawBar(ctx, barX, barY, BAR_WIDTH, barHeight, randomColor);
      drawBarTitles(ctx, times[i].toString(), names[i], barX, barY, INITIAL_Y, CLOUD_TEXT_COLOR);
    }
  };
})();
