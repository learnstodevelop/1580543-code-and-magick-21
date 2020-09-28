'use strict';

(function () {
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const GAP = 10;
  const FONT_GAP = 15;
  const TEXT_HEIGHT = 20;
  const BAR_WIDTH = 40;
  const BAR_GAP = 50;
  const MAX_BAR_HEIGHT = 150;

  const renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const getBarHeight = function (time, maxTime) {
    const barHeight = (MAX_BAR_HEIGHT * time) / maxTime;
    return barHeight;
  };

  const getBarPosition = function (maxHeight, barHeight) {
    const barPosition = maxHeight - barHeight;
    return barPosition;
  };

  const getMaxElement = function (arr) {
    let maxElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';

    ctx.fillText('Ура вы победили!',
        CLOUD_X + GAP + FONT_GAP,
        CLOUD_Y + GAP + TEXT_HEIGHT
    );
    ctx.fillText('Список результатов: ',
        CLOUD_X + GAP + FONT_GAP,
        CLOUD_Y + GAP + TEXT_HEIGHT + FONT_GAP
    );

    const maxTime = getMaxElement(times);

    for (let i = 0; i < names.length; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + (Math.floor(Math.random() * 100) + 1) + '%, 50%)';
      }
      const barX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
      const barY = CLOUD_Y + GAP + TEXT_HEIGHT + FONT_GAP + TEXT_HEIGHT + GAP + getBarPosition(MAX_BAR_HEIGHT, getBarHeight(times[i], maxTime));

      ctx.fillRect(barX, barY, BAR_WIDTH, getBarHeight(times[i], maxTime));

      ctx.fillStyle = '#000';

      const playerPointsX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
      const playerPointsY = CLOUD_Y + GAP + TEXT_HEIGHT + FONT_GAP + TEXT_HEIGHT + getBarPosition(MAX_BAR_HEIGHT, getBarHeight(times[i], maxTime));

      ctx.fillText(Math.round(times[i]), playerPointsX, playerPointsY);

      const playerNameX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
      const playerNameY = CLOUD_Y + GAP + TEXT_HEIGHT + FONT_GAP + TEXT_HEIGHT + GAP + MAX_BAR_HEIGHT + FONT_GAP + GAP;

      ctx.fillText(names[i], playerNameX, playerNameY);
    }
  };
})();
