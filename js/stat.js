'use strict';

// - функция roundedRect отсюда: https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/Рисование_фигур
function roundedRect(ctx, x, y, width, height, radius) {
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
  ctx.fill();
}

window.renderStatistics = function (ctx, names, times) {
  var cloudFill = 'rgba(256, 256, 256, 1.0)';
  var cloudShadow = 'rgba(0, 0, 0, 0.7)';
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudLeft = 100;
  var cloudTop = 10;
  var shadowShift = 10;
  var cloudCornerRadius = 20;
  var cloudText = '#000';
  var cloudFont = '16px PT Mono';
  ctx.fillStyle = cloudShadow;
  roundedRect(ctx, cloudLeft + shadowShift, cloudTop + shadowShift, cloudWidth, cloudHeight, cloudCornerRadius);
  ctx.fillStyle = cloudFill;
  roundedRect(ctx, cloudLeft, cloudTop, cloudWidth, cloudHeight, cloudCornerRadius);

  var topTextX = 120;
  var firstStringY = 28;
  var secondStringY = 48;
  ctx.textBaseline = 'top';
  ctx.font = cloudFont;
  ctx.fillStyle = cloudText;
  ctx.fillText('Ура вы победили!', topTextX, firstStringY);
  ctx.fillText('Список результатов:', topTextX, secondStringY);

  var max = -1;

  for (var j = 0; j < times.length; j++) {
    times[j] = times[j].toFixed(0);
    var time = times[j];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / max;

  var barWidth = 40;
  var indent = 50;
  var initialX = 140;
  var initialY = cloudHeight + cloudTop - 35;
  var timesIndent = 23;
  var namesIndent = 4;
  var barColor;
  var barOpacity;
  var barX;
  var barY;
  var barHeight;

  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    } else {
      barOpacity = Math.random();
      if (barOpacity <= 0.1) {
        barOpacity += 0.1;
      }
      barColor = 'rgba(0, 0, 255, ' + barOpacity.toString() + ')';
    }
    barX = initialX + (indent + barWidth) * i;
    barHeight = times[i] * step;
    barY = initialY - barHeight;
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = cloudText;
    ctx.fillText(times[i].toString(), barX, barY - timesIndent);
    ctx.fillText(names[i], barX, initialY + namesIndent);
  }
};
