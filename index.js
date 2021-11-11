const buggerGame = function(host) {

  var level = 1;

  const bindEvents = function() {
    host.addEventListener('click', function(event) {
      event.preventDefault();
      const element = event.target;
      if (element.closest('#play') !== null) {
        // renderLevelText();
        // renderGameOverText();
        renderCongratulations();
      }
    });
    host.addEventListener('animationend', function(event) {
      const element = event.target;
      // LEVEL TRANSITION TEXT
      // level text 7 is the last node to appear
      if (element.closest('.level-text-7') !== null) {
        var parentEl = element.closest('.level-text');
        if (!parentEl.classList.contains("stage-right")) {
          parentEl.classList.add('stage-right');
        }
      }
      // by the time level text 3 ends, the rest of the nodes have exitted
      if (element.closest('.level-text-3') !== null) {
        var parentEl = element.closest('.level-text');
        if (parentEl.classList.contains("stage-right")) {
          parentEl.remove();
          const musicEl = host.querySelector('.music');
          if (musicEl !== null) {
            musicEl.currentTime = 0;
            // musicEl.play();
          }
          console.log('Start the game');
        }
      }
    });
  }

  const init = function() {
    host.innerHTML = '';
    host.innerHTML = `
      <div class="screen" id="screen">
        <h1 class="logo">
          Bugger
        </h1>
        <button type="button" class="button" id="play">
          Play Game
        </button>
      </div>
      <svg class="background" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ccc" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    `;
  }

  const renderLevelNumber = function() {
    const levelAsString = level.toString();
    return `
      <span class="level-text-6">
        ${levelAsString.length === 1 ? '0' : levelAsString.split("")[0]}
      </span>
      <span class="level-text-7">
        ${levelAsString.length === 1 ? levelAsString : levelAsString.split("")[1]}
      </span>
    `;
  }

  const renderLevelText = function() {
    return new Promise(function(resolve, reject) {
      const screen = host.querySelector('#screen');
      if (screen !== null) {
        screen.innerHTML = '';
        screen.innerHTML = `
        <div class="level-text">
          <span class="level-text-1">L</span>
          <span class="level-text-2">e</span>
          <span class="level-text-3">v</span>
          <span class="level-text-4">e</span>
          <span class="level-text-5">l</span>
          &nbsp;&nbsp;
          ${renderLevelNumber()}
        </div>
        <audio class="music" loop>
          <source src="music.mp3" type="audio/mpeg">
        </audio>
        `;
      }
      resolve();
    });
  }

  const renderGameOverText = function() {
    return new Promise(function(resolve, reject) {
      const screen = host.querySelector('#screen');
      if (screen !== null) {
        screen.innerHTML = '';
        screen.innerHTML = `
        <div class="gameover-text">
          <span class="gameover-text-1">G</span>
          <span class="gameover-text-2">a</span>
          <span class="gameover-text-3">m</span>
          <span class="gameover-text-4">e</span>
          &nbsp;&nbsp;
          <span class="gameover-text-5">O</span>
          <span class="gameover-text-6">v</span>
          <span class="gameover-text-7">e</span>
          <span class="gameover-text-8">r</span>
        </div>
        <div class="gameover-replay-container">
          <button class="button button-primary" id="play" type="button">
            Play Again
          </button>
        </div>
        <audio class="gameover-music" autoplay>
          <source src="gameover.mp3" type="audio/mpeg">
        </audio>
        `;
      }
      resolve();
    });
  }

  const renderCongratulations = function() {
    return new Promise(function(resolve, reject) {
      const screen = host.querySelector('#screen');
      if (screen !== null) {
        screen.innerHTML = '';
        screen.innerHTML = `
        <div class="congratulations-container">
          <div class="congratulations-text">
            <span class="congratulations-text-1">C</span>
            <span class="congratulations-text-2">o</span>
            <span class="congratulations-text-3">n</span>
            <span class="congratulations-text-4">g</span>
            <span class="congratulations-text-5">r</span>
            <span class="congratulations-text-6">a</span>
            <span class="congratulations-text-7">t</span>
            <span class="congratulations-text-8">s</span>
            <span class="congratulations-text-9">!</span>
          </div>
          <div class="congratulations-clap-container">
            <span class="congratulations-clap"></span>
            <span class="congratulations-clap"></span>
            <span class="congratulations-clap"></span>
          </div>
        </div>
        <audio class="congratulations-clap" autoplay>
          <source src="clap.mp3" type="audio/mpeg">
        </audio>
        <audio class="congratulations-music" autoplay>
          <source src="congratulations.mp3" type="audio/mpeg">
        </audio>
        `;
      }
      resolve();
    });
  }

  return {
    init: init,
    bindEvents: bindEvents
  }
}

const targetElement = document.querySelector('#game');

if (targetElement !== null) {
  const game = buggerGame(targetElement);
  game.init();
  game.bindEvents();
}