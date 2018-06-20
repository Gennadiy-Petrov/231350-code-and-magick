'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return Math.ceil(maxElement);
};

var getBarColor = function () {
  var random = Math.abs(Math.floor(Math.random() * (1 - 150) + 1));
  var color = 'rgba(' + random + ', ' + random + ', ' + '255, 1)';
  return color;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillText('Ура, вы победили!', 310, 30);
  ctx.fillText('Список результатов:', 310, 50);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'baseline';
  ctx.font = '16px PT Mono';
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {    
    ctx.fillStyle = '#000000';
    ctx.fillText(
        names[i],
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - GAP * 3);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getBarColor();
    }
    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        (CLOUD_Y + CLOUD_HEIGHT) - (GAP * 2 + GAP) - (times[i] * BAR_HEIGHT) / maxTime,
        BAR_WIDTH,
        (times[i] * BAR_HEIGHT) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - (GAP * 3 + GAP) - (times[i] * BAR_HEIGHT) / maxTime - GAP * 1.5);
  }
};
