const buggerGame = function(host) {

  const bindEvents = function() {
    host.addEventListener('click', function(event) {
      event.preventDefault();
      const element = event.target;
      if (element.closest('#play') !== null) {
        renderGame().then(function() {
          // initialise header
          // kick off insects
        });
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

  const renderGame = function() {
    return new Promise(function(resolve, reject) {
      const screen = host.querySelector('#screen');
      if (screen !== null) {
        screen.innerHTML = '';
        screen.innerHTML = `
          init game...
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