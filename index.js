const buggerGame = function(host) {

  var level = 0;

  const bindEvents = function() {
    host.addEventListener('click', function(event) {
      event.preventDefault();
      const element = event.target;
      if (element.closest('#play') !== null) {
        renderLevel(level).then(function() {
          // do something
        });
      }
    });
    host.addEventListener('animationend', function(event) {
      const element = event.target;
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

  const renderLevel = function() {
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
          <span class="level-text-6">0</span>
          <span class="level-text-7">1</span>
        </div>
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