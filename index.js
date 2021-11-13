const buggerGame = function(host) {

  var level = 1;
  var timer = null;

  const bindEvents = function() {
    host.addEventListener("click", function(event) {
      event.preventDefault();
      const element = event.target;
      if (element.closest("#play") !== null) {
        renderLevelText();
      }
    });
    host.addEventListener("animationend", function(event) {
      const element = event.target;
      // LEVEL TRANSITION TEXT
      // level text 7 is the last node to appear
      if (element.closest('.level-text-7') !== null) {
        var parentEl = element.closest(".level-text");
        if (!parentEl.classList.contains("stage-right")) {
          parentEl.classList.add("stage-right");
        }
      }
      // once the last node of .level-text-1 exits the screen - start the next level
      if (element.closest(".level-text-1") !== null) {
        var parentEl = element.closest(".level-text");
        if (parentEl.classList.contains("stage-right")) {
          // renderCongratulations();
          renderStage();
        }
      }
      // CONGRATS TRANSITION TEXT
      if (element.classList.contains("congratulations-container")) {
        renderGameOverText();
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
        <audio class="levelup-sound" autoplay>
          <source src="levelup.mp3" type="audio/mpeg">
        </audio>
        `;
      }
      resolve();
    });
  }

  const renderStage = function() {
    return new Promise(function(resolve, reject) {
      const screen = host.querySelector('#screen');
      if (screen !== null) {
        screen.innerHTML = '';
        screen.innerHTML = `
        <div class="header">
        <div class="header-inner">
            <div class="header-bugs">
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="11" width="1" height="1" fill="black"/>
              <rect x="11" y="11" width="1" height="1" fill="black"/>
              <rect x="10" y="11" width="1" height="1" fill="black"/>
              <rect x="9" y="11" width="1" height="1" fill="black"/>
              <rect x="8" y="11" width="1" height="1" fill="black"/>
              <rect x="13" y="10" width="1" height="1" fill="black"/>
              <rect x="7" y="10" width="1" height="1" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 9)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 17 9)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 18 9)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 19 9)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 8)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 17 8)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 18 8)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 19 8)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 20 8)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 7)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 20 7)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 7)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 6)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 20 6)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 6)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 5)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 5)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 22 5)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 4)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 22 4)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 3)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 3)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 22 3)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 2)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 17 2)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 20 2)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 2)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 16 1)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 17 1)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 18 1)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 19 1)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 20 1)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 21 1)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 17 0)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 18 0)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 19 0)" fill="black"/>
              <rect width="1" height="1" transform="matrix(-1 0 0 1 20 0)" fill="black"/>
              <rect x="6" y="9" width="1" height="1" fill="black"/>
              <rect x="5" y="9" width="1" height="1" fill="black"/>
              <rect x="4" y="9" width="1" height="1" fill="black"/>
              <rect x="3" y="9" width="1" height="1" fill="black"/>
              <rect x="6" y="8" width="1" height="1" fill="black"/>
              <rect x="5" y="8" width="1" height="1" fill="black"/>
              <rect x="4" y="8" width="1" height="1" fill="black"/>
              <rect x="3" y="8" width="1" height="1" fill="black"/>
              <rect x="2" y="8" width="1" height="1" fill="black"/>
              <rect x="6" y="7" width="1" height="1" fill="black"/>
              <rect x="2" y="7" width="1" height="1" fill="black"/>
              <rect x="1" y="7" width="1" height="1" fill="black"/>
              <rect x="6" y="6" width="1" height="1" fill="black"/>
              <rect x="2" y="6" width="1" height="1" fill="black"/>
              <rect x="1" y="6" width="1" height="1" fill="black"/>
              <rect x="6" y="5" width="1" height="1" fill="black"/>
              <rect x="1" y="5" width="1" height="1" fill="black"/>
              <rect y="5" width="1" height="1" fill="black"/>
              <rect x="1" y="4" width="1" height="1" fill="black"/>
              <rect y="4" width="1" height="1" fill="black"/>
              <rect x="6" y="3" width="1" height="1" fill="black"/>
              <rect x="1" y="3" width="1" height="1" fill="black"/>
              <rect y="3" width="1" height="1" fill="black"/>
              <rect x="6" y="2" width="1" height="1" fill="black"/>
              <rect x="5" y="2" width="1" height="1" fill="black"/>
              <rect x="2" y="2" width="1" height="1" fill="black"/>
              <rect x="1" y="2" width="1" height="1" fill="black"/>
              <rect x="6" y="1" width="1" height="1" fill="black"/>
              <rect x="5" y="1" width="1" height="1" fill="black"/>
              <rect x="4" y="1" width="1" height="1" fill="black"/>
              <rect x="3" y="1" width="1" height="1" fill="black"/>
              <rect x="2" y="1" width="1" height="1" fill="black"/>
              <rect x="1" y="1" width="1" height="1" fill="black"/>
              <rect x="5" width="1" height="1" fill="black"/>
              <rect x="4" width="1" height="1" fill="black"/>
              <rect x="3" width="1" height="1" fill="black"/>
              <rect x="2" width="1" height="1" fill="black"/>
              <rect x="12" y="10" width="1" height="1" fill="#FF1808"/>
              <rect x="11" y="10" width="1" height="1" fill="#FF1808"/>
              <rect x="10" y="10" width="1" height="1" fill="#FF1808"/>
              <rect x="9" y="10" width="1" height="1" fill="#FF1808"/>
              <rect x="8" y="10" width="1" height="1" fill="#FF1808"/>
              <rect x="14" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="13" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="12" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="11" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="10" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="9" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="8" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="7" y="9" width="1" height="1" fill="#FF1808"/>
              <rect x="14" y="8" width="1" height="1" fill="#FF1808"/>
              <rect x="13" y="8" width="1" height="1" fill="#FF1808"/>
              <rect x="12" y="8" width="1" height="1" fill="#FF1808"/>
              <rect x="11" y="8" width="1" height="1" fill="#FF1808"/>
              <rect x="7" y="8" width="1" height="1" fill="#FF1808"/>
              <rect x="14" y="7" width="1" height="1" fill="#FF1808"/>
              <rect x="13" y="7" width="1" height="1" fill="#FF1808"/>
              <rect x="12" y="7" width="1" height="1" fill="#FF1808"/>
              <rect x="14" y="6" width="1" height="1" fill="#FF1808"/>
              <rect x="13" y="6" width="1" height="1" fill="#FF1808"/>
              <rect x="12" y="6" width="1" height="1" fill="#FF1808"/>
              <rect x="14" y="5" width="1" height="1" fill="#FF1808"/>
              <rect x="13" y="5" width="1" height="1" fill="#FF1808"/>
              <rect x="12" y="5" width="1" height="1" fill="#FF1808"/>
              <rect x="12" y="4" width="1" height="1" fill="#FF1808"/>
              <rect x="11" y="4" width="1" height="1" fill="#FF1808"/>
              <rect x="10" y="8" width="1" height="1" fill="#FF8566"/>
              <rect x="9" y="8" width="1" height="1" fill="#FF8566"/>
              <rect x="8" y="8" width="1" height="1" fill="#FF8566"/>
              <rect x="11" y="7" width="1" height="1" fill="#FF8566"/>
              <rect x="10" y="7" width="1" height="1" fill="#FF8566"/>
              <rect x="9" y="7" width="1" height="1" fill="#FF8566"/>
              <rect x="8" y="7" width="1" height="1" fill="#FF8566"/>
              <rect x="7" y="7" width="1" height="1" fill="#FF8566"/>
              <rect x="11" y="6" width="1" height="1" fill="#FF8566"/>
              <rect x="10" y="6" width="1" height="1" fill="#FF8566"/>
              <rect x="9" y="6" width="1" height="1" fill="#FF8566"/>
              <rect x="8" y="6" width="1" height="1" fill="#FF8566"/>
              <rect x="7" y="6" width="1" height="1" fill="#FF8566"/>
              <rect x="11" y="5" width="1" height="1" fill="#FF8566"/>
              <rect x="10" y="5" width="1" height="1" fill="#FF8566"/>
              <rect x="9" y="5" width="1" height="1" fill="#FF8566"/>
              <rect x="8" y="5" width="1" height="1" fill="#FF8566"/>
              <rect x="7" y="5" width="1" height="1" fill="#FF8566"/>
              <rect x="10" y="4" width="1" height="1" fill="#FF8566"/>
              <rect x="9" y="4" width="1" height="1" fill="#FF8566"/>
              <rect x="8" y="4" width="1" height="1" fill="#FF8566"/>
              <rect x="14" y="4" width="1" height="1" fill="black"/>
              <rect x="13" y="4" width="1" height="1" fill="black"/>
              <rect x="7" y="4" width="1" height="1" fill="black"/>
              <rect x="14" y="3" width="1" height="1" fill="black"/>
              <rect x="13" y="3" width="1" height="1" fill="black"/>
              <rect x="12" y="3" width="1" height="1" fill="black"/>
              <rect x="12" y="3" width="1" height="1" fill="black"/>
              <rect x="11" y="3" width="1" height="1" fill="black"/>
              <rect x="10" y="3" width="1" height="1" fill="black"/>
              <rect x="9" y="3" width="1" height="1" fill="black"/>
              <rect x="8" y="3" width="1" height="1" fill="black"/>
              <rect x="7" y="3" width="1" height="1" fill="black"/>
              </svg>
              <div class="header-text text-small">Left</div>
              <div class="header-text">120</div>
            </div>
            <div class="header-divider"></div>
            <div class="header-time">
              <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9997 9.77814C6.3635 9.77814 1.77783 14.3638 1.77783 20C1.77783 25.6362 6.3635 30.2219 11.9997 30.2219C17.6359 30.2219 22.2216 25.6362 22.2216 20C22.2216 14.3638 17.6359 9.77814 11.9997 9.77814ZM11.9997 29.3335C6.85321 29.3335 2.66624 25.147 2.66624 20C2.66624 14.853 6.85321 10.6665 11.9997 10.6665C17.1462 10.6665 21.3332 14.8535 21.3332 20C21.3332 25.1465 17.1462 29.3335 11.9997 29.3335Z" fill="#303342"/>
              <path d="M24.4439 17.7776H23.785C23.1791 14.5586 21.2909 11.7896 18.666 10.0284V2.22243C18.666 0.996966 17.6695 0 16.4435 0H7.55475C6.32881 0 5.33232 0.996492 5.33232 2.22243V10.0289C2.11956 12.184 0 15.8481 0 20C0 24.1519 2.12003 27.816 5.33327 29.9711V37.7776C5.33327 39.003 6.32976 40 7.5557 40H16.4445C17.6704 40 18.6669 39.0035 18.6669 37.7776V29.9711C21.2918 28.2099 23.18 25.4409 23.7859 22.222H24.4449C25.1801 22.222 25.7779 21.6237 25.7779 20.8889V19.1111C25.777 18.3758 25.1792 17.7776 24.4439 17.7776ZM6.22167 2.22243C6.22167 1.48715 6.81995 0.889352 7.55475 0.889352H16.4435C17.1788 0.889352 17.7766 1.48763 17.7766 2.22243V9.488C16.0619 8.54176 14.0931 8.00038 11.9996 8.00038C9.90613 8.00038 7.93733 8.54224 6.22167 9.48848V2.22243ZM17.7776 37.7776C17.7776 38.5128 17.1793 39.1106 16.4445 39.1106H7.5557C6.82042 39.1106 6.22262 38.5124 6.22262 37.7776V30.512C7.9378 31.4582 9.90661 32.0001 12.0006 32.0001C14.0945 32.0001 16.0629 31.4582 17.7785 30.512V37.7776H17.7776ZM11.9996 31.1112C5.87276 31.1112 0.888404 26.1269 0.888404 20C0.888404 13.8731 5.87276 8.88878 11.9996 8.88878C18.1265 8.88878 23.1108 13.8731 23.1108 20C23.1108 26.1269 18.1265 31.1112 11.9996 31.1112ZM24.4439 21.3331H23.9205C23.9698 20.8946 23.9992 20.4513 23.9992 20C23.9992 19.5487 23.9698 19.105 23.9205 18.6669H24.4439C24.689 18.6669 24.8886 18.8665 24.8886 19.1116V20.8893C24.8886 21.134 24.689 21.3331 24.4439 21.3331Z" fill="#303342"/>
              </svg>
              <div class="header-text text-small">Time</div>
              <div class="header-text">30</div>
            </div>
          </div>
        </div>
        <audio class="music" autoplay loop>
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
            <div class="congratulations-clap">
              <svg class="congratulations-clap-left-hand" width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9532 0.0549799C18.7044 0.0493056 18.4534 0.0848399 18.2119 0.156722C16.6668 0.616794 15.5666 2.40304 15.5666 5.17118C15.5666 7.64457 15.4611 9.01564 15.305 9.73505C15.149 10.4545 15.0979 10.4296 14.8399 10.6362C14.5819 10.8428 13.9804 11.2427 13.4591 12.1042C12.9389 12.9638 12.4496 14.2585 11.933 16.5372C10.3914 22.3725 10.073 24.8524 9.20046 25.8686C8.76381 26.3772 8.1208 26.7202 6.7877 27.1186C5.45466 27.5169 3.50957 27.9284 0.712222 28.6156C0.306322 28.7134 -0.0051151 29.1138 1.0993e-06 29.5313L0.0872556 39.1242C0.0872556 39.6112 0.530411 40.0543 1.01747 40.0544H15.3196C15.8066 40.0543 16.2498 39.6112 16.2498 39.1242V36.3044C17.2883 36.4114 18.3397 36.0595 19.1857 35.505C19.6694 35.188 19.5346 35.13 20.4648 34.3422C21.395 33.5544 21.395 31.9004 21.395 31.9004V2.96151C21.395 2.96151 21.395 1.55439 20.4648 0.636366C19.5346 -0.281659 19.5006 0.0675053 18.9532 0.0549799ZM19.2294 2.03169C19.1436 1.95594 19.0554 1.90567 18.9532 1.90088C18.8919 1.898 18.8316 1.92034 18.7497 1.94471C18.313 2.07476 17.4271 2.89005 17.4271 5.1714C17.4271 7.69586 17.3377 9.14717 17.1219 10.1423C16.906 11.1373 16.4091 11.7644 16.0027 12.0899C15.5962 12.4154 15.4143 12.4747 15.0579 13.0637C14.7015 13.6527 14.2291 14.7918 13.7353 16.9735C13.7354 16.9828 13.7354 16.9926 13.7353 17.0024C12.6891 20.9604 12.3192 23.3984 11.7004 25.1128C10.8735 28.4023 11.458 30.3714 12.369 31.6824C13.6915 33.5197 15.9113 35.0059 18.1538 33.9498C18.9718 33.4137 19.5346 32.5167 19.5346 31.9004V2.96191C19.5346 2.41715 19.3666 2.15289 19.2294 2.03169ZM10.8429 32.7434C10.0334 31.5785 9.4751 30.0186 9.46208 28.0197C8.8667 28.3731 8.16582 28.6406 7.32546 28.8918C6.31274 29.1944 5.06389 29.4922 3.47336 29.8715C2.97092 29.9913 2.43439 30.1192 1.86044 30.258L1.93313 38.194H14.3893V35.6213C13.4246 35.1526 11.9463 34.3313 10.8429 32.7434Z" fill="#303342"/>
              <path d="M9.46206 28.0197C9.47508 30.0186 10.0334 31.5785 10.8429 32.7434C11.9462 34.3313 13.4246 35.1526 14.3893 35.6213V38.194H1.93311L1.86041 30.258C2.43437 30.1192 2.9709 29.9913 3.47334 29.8715C5.06387 29.4922 6.31272 29.1944 7.32544 28.8918C8.1658 28.6406 8.86667 28.3731 9.46206 28.0197Z" fill="white"/>
              <path d="M18.9532 1.90089C19.0554 1.90568 19.1436 1.95595 19.2293 2.0317C19.3665 2.1529 19.5345 2.41716 19.5345 2.96192V31.9004C19.5345 32.5167 18.9718 33.4138 18.1538 33.9498C15.9113 35.0059 13.6915 33.5197 12.369 31.6824C11.4579 30.3714 10.8735 28.4023 11.7004 25.1128C12.3191 23.3984 12.6891 20.9605 13.7352 17.0024C13.7354 16.9926 13.7354 16.9828 13.7352 16.9735C14.229 14.7918 14.7015 13.6527 15.0579 13.0637C15.4143 12.4747 15.5961 12.4154 16.0026 12.0899C16.4091 11.7644 16.906 11.1373 17.1218 10.1423C17.3377 9.14718 17.427 7.69587 17.427 5.17141C17.427 2.89005 18.3129 2.07477 18.7497 1.94472C18.8316 1.92035 18.8919 1.898 18.9532 1.90089Z" fill="white"/>
              </svg>
              <svg class="congratulations-clap-right-hand" width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.44181 0.0549799C2.69059 0.0493056 2.94161 0.0848399 3.18305 0.156722C4.72824 0.616794 5.82836 2.40304 5.82836 5.17118C5.82836 7.64457 5.93394 9.01564 6.08998 9.73505C6.24603 10.4545 6.29709 10.4296 6.55509 10.6362C6.81313 10.8428 7.41456 11.2427 7.93586 12.1042C8.45608 12.9638 8.94538 14.2585 9.46202 16.5372C11.0036 22.3725 11.322 24.8524 12.1945 25.8686C12.6312 26.3772 13.2742 26.7202 14.6073 27.1186C15.9403 27.5169 17.8854 27.9284 20.6828 28.6156C21.0887 28.7134 21.4001 29.1138 21.395 29.5313L21.3077 39.1242C21.3077 39.6112 20.8646 40.0543 20.3775 40.0544H6.07542C5.58836 40.0543 5.14521 39.6112 5.14521 39.1242V36.3044C4.10671 36.4114 3.05533 36.0595 2.20925 35.505C1.72559 35.188 1.86042 35.13 0.930204 34.3422C-1.33514e-05 33.5544 -1.33514e-05 31.9004 -1.33514e-05 31.9004V2.96151C-1.33514e-05 2.96151 -1.33514e-05 1.55439 0.930204 0.636366C1.86042 -0.281659 1.89442 0.0675053 2.44181 0.0549799ZM2.16563 2.03169C2.25139 1.95594 2.33958 1.90567 2.44181 1.90088C2.50311 1.898 2.56334 1.92034 2.64525 1.94471C3.08203 2.07476 3.96792 2.89005 3.96792 5.1714C3.96792 7.69586 4.05732 9.14717 4.27313 10.1423C4.48898 11.1373 4.98586 11.7644 5.39232 12.0899C5.79882 12.4154 5.98068 12.4747 6.33709 13.0637C6.69351 13.6527 7.16592 14.7918 7.65972 16.9735C7.65958 16.9828 7.65958 16.9926 7.65972 17.0024C8.70584 20.9604 9.07584 23.3984 9.69457 25.1128C10.5215 28.4023 9.93703 30.3714 9.02598 31.6824C7.70349 33.5197 5.48371 35.0059 3.24119 33.9498C2.4232 33.4137 1.86042 32.5167 1.86042 31.9004V2.96191C1.86042 2.41715 2.02842 2.15289 2.16563 2.03169ZM10.5521 32.7434C11.3616 31.5785 11.9199 30.0186 11.9329 28.0197C12.5283 28.3731 13.2292 28.6406 14.0695 28.8918C15.0822 29.1944 16.3311 29.4922 17.9216 29.8715C18.4241 29.9913 18.9606 30.1192 19.5346 30.258L19.4619 38.194H7.00564V35.6213C7.97037 35.1526 9.44872 34.3313 10.5521 32.7434Z" fill="#303342"/>
              <path d="M11.9329 28.0197C11.9199 30.0186 11.3616 31.5785 10.5521 32.7434C9.44874 34.3313 7.97039 35.1526 7.00566 35.6213V38.194H19.4619L19.5346 30.258C18.9606 30.1192 18.4241 29.9913 17.9217 29.8715C16.3311 29.4922 15.0823 29.1944 14.0695 28.8918C13.2292 28.6406 12.5283 28.3731 11.9329 28.0197Z" fill="white"/>
              <path d="M2.44183 1.90089C2.3396 1.90568 2.25142 1.95595 2.16565 2.0317C2.02844 2.1529 1.86045 2.41716 1.86045 2.96192V31.9004C1.86045 32.5167 2.42323 33.4138 3.24121 33.9498C5.48373 35.0059 7.70351 33.5197 9.026 31.6824C9.93706 30.3714 10.5215 28.4023 9.6946 25.1128C9.07586 23.3984 8.70587 20.9605 7.65975 17.0024C7.65961 16.9926 7.65961 16.9828 7.65975 16.9735C7.16594 14.7918 6.69353 13.6527 6.33712 13.0637C5.9807 12.4747 5.79885 12.4154 5.39234 12.0899C4.98588 11.7644 4.48901 11.1373 4.27315 10.1423C4.05734 9.14718 3.96795 7.69587 3.96795 5.17141C3.96795 2.89005 3.08205 2.07477 2.64527 1.94472C2.56336 1.92035 2.50313 1.898 2.44183 1.90089Z" fill="white"/>
              </svg>
            </div>
            <div class="congratulations-clap">
              <svg class="congratulations-clap-left-hand" width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9532 0.0549799C18.7044 0.0493056 18.4534 0.0848399 18.2119 0.156722C16.6668 0.616794 15.5666 2.40304 15.5666 5.17118C15.5666 7.64457 15.4611 9.01564 15.305 9.73505C15.149 10.4545 15.0979 10.4296 14.8399 10.6362C14.5819 10.8428 13.9804 11.2427 13.4591 12.1042C12.9389 12.9638 12.4496 14.2585 11.933 16.5372C10.3914 22.3725 10.073 24.8524 9.20046 25.8686C8.76381 26.3772 8.1208 26.7202 6.7877 27.1186C5.45466 27.5169 3.50957 27.9284 0.712222 28.6156C0.306322 28.7134 -0.0051151 29.1138 1.0993e-06 29.5313L0.0872556 39.1242C0.0872556 39.6112 0.530411 40.0543 1.01747 40.0544H15.3196C15.8066 40.0543 16.2498 39.6112 16.2498 39.1242V36.3044C17.2883 36.4114 18.3397 36.0595 19.1857 35.505C19.6694 35.188 19.5346 35.13 20.4648 34.3422C21.395 33.5544 21.395 31.9004 21.395 31.9004V2.96151C21.395 2.96151 21.395 1.55439 20.4648 0.636366C19.5346 -0.281659 19.5006 0.0675053 18.9532 0.0549799ZM19.2294 2.03169C19.1436 1.95594 19.0554 1.90567 18.9532 1.90088C18.8919 1.898 18.8316 1.92034 18.7497 1.94471C18.313 2.07476 17.4271 2.89005 17.4271 5.1714C17.4271 7.69586 17.3377 9.14717 17.1219 10.1423C16.906 11.1373 16.4091 11.7644 16.0027 12.0899C15.5962 12.4154 15.4143 12.4747 15.0579 13.0637C14.7015 13.6527 14.2291 14.7918 13.7353 16.9735C13.7354 16.9828 13.7354 16.9926 13.7353 17.0024C12.6891 20.9604 12.3192 23.3984 11.7004 25.1128C10.8735 28.4023 11.458 30.3714 12.369 31.6824C13.6915 33.5197 15.9113 35.0059 18.1538 33.9498C18.9718 33.4137 19.5346 32.5167 19.5346 31.9004V2.96191C19.5346 2.41715 19.3666 2.15289 19.2294 2.03169ZM10.8429 32.7434C10.0334 31.5785 9.4751 30.0186 9.46208 28.0197C8.8667 28.3731 8.16582 28.6406 7.32546 28.8918C6.31274 29.1944 5.06389 29.4922 3.47336 29.8715C2.97092 29.9913 2.43439 30.1192 1.86044 30.258L1.93313 38.194H14.3893V35.6213C13.4246 35.1526 11.9463 34.3313 10.8429 32.7434Z" fill="#303342"/>
              <path d="M9.46206 28.0197C9.47508 30.0186 10.0334 31.5785 10.8429 32.7434C11.9462 34.3313 13.4246 35.1526 14.3893 35.6213V38.194H1.93311L1.86041 30.258C2.43437 30.1192 2.9709 29.9913 3.47334 29.8715C5.06387 29.4922 6.31272 29.1944 7.32544 28.8918C8.1658 28.6406 8.86667 28.3731 9.46206 28.0197Z" fill="white"/>
              <path d="M18.9532 1.90089C19.0554 1.90568 19.1436 1.95595 19.2293 2.0317C19.3665 2.1529 19.5345 2.41716 19.5345 2.96192V31.9004C19.5345 32.5167 18.9718 33.4138 18.1538 33.9498C15.9113 35.0059 13.6915 33.5197 12.369 31.6824C11.4579 30.3714 10.8735 28.4023 11.7004 25.1128C12.3191 23.3984 12.6891 20.9605 13.7352 17.0024C13.7354 16.9926 13.7354 16.9828 13.7352 16.9735C14.229 14.7918 14.7015 13.6527 15.0579 13.0637C15.4143 12.4747 15.5961 12.4154 16.0026 12.0899C16.4091 11.7644 16.906 11.1373 17.1218 10.1423C17.3377 9.14718 17.427 7.69587 17.427 5.17141C17.427 2.89005 18.3129 2.07477 18.7497 1.94472C18.8316 1.92035 18.8919 1.898 18.9532 1.90089Z" fill="white"/>
              </svg>
              <svg class="congratulations-clap-right-hand" width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.44181 0.0549799C2.69059 0.0493056 2.94161 0.0848399 3.18305 0.156722C4.72824 0.616794 5.82836 2.40304 5.82836 5.17118C5.82836 7.64457 5.93394 9.01564 6.08998 9.73505C6.24603 10.4545 6.29709 10.4296 6.55509 10.6362C6.81313 10.8428 7.41456 11.2427 7.93586 12.1042C8.45608 12.9638 8.94538 14.2585 9.46202 16.5372C11.0036 22.3725 11.322 24.8524 12.1945 25.8686C12.6312 26.3772 13.2742 26.7202 14.6073 27.1186C15.9403 27.5169 17.8854 27.9284 20.6828 28.6156C21.0887 28.7134 21.4001 29.1138 21.395 29.5313L21.3077 39.1242C21.3077 39.6112 20.8646 40.0543 20.3775 40.0544H6.07542C5.58836 40.0543 5.14521 39.6112 5.14521 39.1242V36.3044C4.10671 36.4114 3.05533 36.0595 2.20925 35.505C1.72559 35.188 1.86042 35.13 0.930204 34.3422C-1.33514e-05 33.5544 -1.33514e-05 31.9004 -1.33514e-05 31.9004V2.96151C-1.33514e-05 2.96151 -1.33514e-05 1.55439 0.930204 0.636366C1.86042 -0.281659 1.89442 0.0675053 2.44181 0.0549799ZM2.16563 2.03169C2.25139 1.95594 2.33958 1.90567 2.44181 1.90088C2.50311 1.898 2.56334 1.92034 2.64525 1.94471C3.08203 2.07476 3.96792 2.89005 3.96792 5.1714C3.96792 7.69586 4.05732 9.14717 4.27313 10.1423C4.48898 11.1373 4.98586 11.7644 5.39232 12.0899C5.79882 12.4154 5.98068 12.4747 6.33709 13.0637C6.69351 13.6527 7.16592 14.7918 7.65972 16.9735C7.65958 16.9828 7.65958 16.9926 7.65972 17.0024C8.70584 20.9604 9.07584 23.3984 9.69457 25.1128C10.5215 28.4023 9.93703 30.3714 9.02598 31.6824C7.70349 33.5197 5.48371 35.0059 3.24119 33.9498C2.4232 33.4137 1.86042 32.5167 1.86042 31.9004V2.96191C1.86042 2.41715 2.02842 2.15289 2.16563 2.03169ZM10.5521 32.7434C11.3616 31.5785 11.9199 30.0186 11.9329 28.0197C12.5283 28.3731 13.2292 28.6406 14.0695 28.8918C15.0822 29.1944 16.3311 29.4922 17.9216 29.8715C18.4241 29.9913 18.9606 30.1192 19.5346 30.258L19.4619 38.194H7.00564V35.6213C7.97037 35.1526 9.44872 34.3313 10.5521 32.7434Z" fill="#303342"/>
              <path d="M11.9329 28.0197C11.9199 30.0186 11.3616 31.5785 10.5521 32.7434C9.44874 34.3313 7.97039 35.1526 7.00566 35.6213V38.194H19.4619L19.5346 30.258C18.9606 30.1192 18.4241 29.9913 17.9217 29.8715C16.3311 29.4922 15.0823 29.1944 14.0695 28.8918C13.2292 28.6406 12.5283 28.3731 11.9329 28.0197Z" fill="white"/>
              <path d="M2.44183 1.90089C2.3396 1.90568 2.25142 1.95595 2.16565 2.0317C2.02844 2.1529 1.86045 2.41716 1.86045 2.96192V31.9004C1.86045 32.5167 2.42323 33.4138 3.24121 33.9498C5.48373 35.0059 7.70351 33.5197 9.026 31.6824C9.93706 30.3714 10.5215 28.4023 9.6946 25.1128C9.07586 23.3984 8.70587 20.9605 7.65975 17.0024C7.65961 16.9926 7.65961 16.9828 7.65975 16.9735C7.16594 14.7918 6.69353 13.6527 6.33712 13.0637C5.9807 12.4747 5.79885 12.4154 5.39234 12.0899C4.98588 11.7644 4.48901 11.1373 4.27315 10.1423C4.05734 9.14718 3.96795 7.69587 3.96795 5.17141C3.96795 2.89005 3.08205 2.07477 2.64527 1.94472C2.56336 1.92035 2.50313 1.898 2.44183 1.90089Z" fill="white"/>
              </svg>
            </div>
            <div class="congratulations-clap">
              <svg class="congratulations-clap-left-hand" width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9532 0.0549799C18.7044 0.0493056 18.4534 0.0848399 18.2119 0.156722C16.6668 0.616794 15.5666 2.40304 15.5666 5.17118C15.5666 7.64457 15.4611 9.01564 15.305 9.73505C15.149 10.4545 15.0979 10.4296 14.8399 10.6362C14.5819 10.8428 13.9804 11.2427 13.4591 12.1042C12.9389 12.9638 12.4496 14.2585 11.933 16.5372C10.3914 22.3725 10.073 24.8524 9.20046 25.8686C8.76381 26.3772 8.1208 26.7202 6.7877 27.1186C5.45466 27.5169 3.50957 27.9284 0.712222 28.6156C0.306322 28.7134 -0.0051151 29.1138 1.0993e-06 29.5313L0.0872556 39.1242C0.0872556 39.6112 0.530411 40.0543 1.01747 40.0544H15.3196C15.8066 40.0543 16.2498 39.6112 16.2498 39.1242V36.3044C17.2883 36.4114 18.3397 36.0595 19.1857 35.505C19.6694 35.188 19.5346 35.13 20.4648 34.3422C21.395 33.5544 21.395 31.9004 21.395 31.9004V2.96151C21.395 2.96151 21.395 1.55439 20.4648 0.636366C19.5346 -0.281659 19.5006 0.0675053 18.9532 0.0549799ZM19.2294 2.03169C19.1436 1.95594 19.0554 1.90567 18.9532 1.90088C18.8919 1.898 18.8316 1.92034 18.7497 1.94471C18.313 2.07476 17.4271 2.89005 17.4271 5.1714C17.4271 7.69586 17.3377 9.14717 17.1219 10.1423C16.906 11.1373 16.4091 11.7644 16.0027 12.0899C15.5962 12.4154 15.4143 12.4747 15.0579 13.0637C14.7015 13.6527 14.2291 14.7918 13.7353 16.9735C13.7354 16.9828 13.7354 16.9926 13.7353 17.0024C12.6891 20.9604 12.3192 23.3984 11.7004 25.1128C10.8735 28.4023 11.458 30.3714 12.369 31.6824C13.6915 33.5197 15.9113 35.0059 18.1538 33.9498C18.9718 33.4137 19.5346 32.5167 19.5346 31.9004V2.96191C19.5346 2.41715 19.3666 2.15289 19.2294 2.03169ZM10.8429 32.7434C10.0334 31.5785 9.4751 30.0186 9.46208 28.0197C8.8667 28.3731 8.16582 28.6406 7.32546 28.8918C6.31274 29.1944 5.06389 29.4922 3.47336 29.8715C2.97092 29.9913 2.43439 30.1192 1.86044 30.258L1.93313 38.194H14.3893V35.6213C13.4246 35.1526 11.9463 34.3313 10.8429 32.7434Z" fill="#303342"/>
              <path d="M9.46206 28.0197C9.47508 30.0186 10.0334 31.5785 10.8429 32.7434C11.9462 34.3313 13.4246 35.1526 14.3893 35.6213V38.194H1.93311L1.86041 30.258C2.43437 30.1192 2.9709 29.9913 3.47334 29.8715C5.06387 29.4922 6.31272 29.1944 7.32544 28.8918C8.1658 28.6406 8.86667 28.3731 9.46206 28.0197Z" fill="white"/>
              <path d="M18.9532 1.90089C19.0554 1.90568 19.1436 1.95595 19.2293 2.0317C19.3665 2.1529 19.5345 2.41716 19.5345 2.96192V31.9004C19.5345 32.5167 18.9718 33.4138 18.1538 33.9498C15.9113 35.0059 13.6915 33.5197 12.369 31.6824C11.4579 30.3714 10.8735 28.4023 11.7004 25.1128C12.3191 23.3984 12.6891 20.9605 13.7352 17.0024C13.7354 16.9926 13.7354 16.9828 13.7352 16.9735C14.229 14.7918 14.7015 13.6527 15.0579 13.0637C15.4143 12.4747 15.5961 12.4154 16.0026 12.0899C16.4091 11.7644 16.906 11.1373 17.1218 10.1423C17.3377 9.14718 17.427 7.69587 17.427 5.17141C17.427 2.89005 18.3129 2.07477 18.7497 1.94472C18.8316 1.92035 18.8919 1.898 18.9532 1.90089Z" fill="white"/>
              </svg>
              <svg class="congratulations-clap-right-hand" width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.44181 0.0549799C2.69059 0.0493056 2.94161 0.0848399 3.18305 0.156722C4.72824 0.616794 5.82836 2.40304 5.82836 5.17118C5.82836 7.64457 5.93394 9.01564 6.08998 9.73505C6.24603 10.4545 6.29709 10.4296 6.55509 10.6362C6.81313 10.8428 7.41456 11.2427 7.93586 12.1042C8.45608 12.9638 8.94538 14.2585 9.46202 16.5372C11.0036 22.3725 11.322 24.8524 12.1945 25.8686C12.6312 26.3772 13.2742 26.7202 14.6073 27.1186C15.9403 27.5169 17.8854 27.9284 20.6828 28.6156C21.0887 28.7134 21.4001 29.1138 21.395 29.5313L21.3077 39.1242C21.3077 39.6112 20.8646 40.0543 20.3775 40.0544H6.07542C5.58836 40.0543 5.14521 39.6112 5.14521 39.1242V36.3044C4.10671 36.4114 3.05533 36.0595 2.20925 35.505C1.72559 35.188 1.86042 35.13 0.930204 34.3422C-1.33514e-05 33.5544 -1.33514e-05 31.9004 -1.33514e-05 31.9004V2.96151C-1.33514e-05 2.96151 -1.33514e-05 1.55439 0.930204 0.636366C1.86042 -0.281659 1.89442 0.0675053 2.44181 0.0549799ZM2.16563 2.03169C2.25139 1.95594 2.33958 1.90567 2.44181 1.90088C2.50311 1.898 2.56334 1.92034 2.64525 1.94471C3.08203 2.07476 3.96792 2.89005 3.96792 5.1714C3.96792 7.69586 4.05732 9.14717 4.27313 10.1423C4.48898 11.1373 4.98586 11.7644 5.39232 12.0899C5.79882 12.4154 5.98068 12.4747 6.33709 13.0637C6.69351 13.6527 7.16592 14.7918 7.65972 16.9735C7.65958 16.9828 7.65958 16.9926 7.65972 17.0024C8.70584 20.9604 9.07584 23.3984 9.69457 25.1128C10.5215 28.4023 9.93703 30.3714 9.02598 31.6824C7.70349 33.5197 5.48371 35.0059 3.24119 33.9498C2.4232 33.4137 1.86042 32.5167 1.86042 31.9004V2.96191C1.86042 2.41715 2.02842 2.15289 2.16563 2.03169ZM10.5521 32.7434C11.3616 31.5785 11.9199 30.0186 11.9329 28.0197C12.5283 28.3731 13.2292 28.6406 14.0695 28.8918C15.0822 29.1944 16.3311 29.4922 17.9216 29.8715C18.4241 29.9913 18.9606 30.1192 19.5346 30.258L19.4619 38.194H7.00564V35.6213C7.97037 35.1526 9.44872 34.3313 10.5521 32.7434Z" fill="#303342"/>
              <path d="M11.9329 28.0197C11.9199 30.0186 11.3616 31.5785 10.5521 32.7434C9.44874 34.3313 7.97039 35.1526 7.00566 35.6213V38.194H19.4619L19.5346 30.258C18.9606 30.1192 18.4241 29.9913 17.9217 29.8715C16.3311 29.4922 15.0823 29.1944 14.0695 28.8918C13.2292 28.6406 12.5283 28.3731 11.9329 28.0197Z" fill="white"/>
              <path d="M2.44183 1.90089C2.3396 1.90568 2.25142 1.95595 2.16565 2.0317C2.02844 2.1529 1.86045 2.41716 1.86045 2.96192V31.9004C1.86045 32.5167 2.42323 33.4138 3.24121 33.9498C5.48373 35.0059 7.70351 33.5197 9.026 31.6824C9.93706 30.3714 10.5215 28.4023 9.6946 25.1128C9.07586 23.3984 8.70587 20.9605 7.65975 17.0024C7.65961 16.9926 7.65961 16.9828 7.65975 16.9735C7.16594 14.7918 6.69353 13.6527 6.33712 13.0637C5.9807 12.4747 5.79885 12.4154 5.39234 12.0899C4.98588 11.7644 4.48901 11.1373 4.27315 10.1423C4.05734 9.14718 3.96795 7.69587 3.96795 5.17141C3.96795 2.89005 3.08205 2.07477 2.64527 1.94472C2.56336 1.92035 2.50313 1.898 2.44183 1.90089Z" fill="white"/>
              </svg>
            </div>
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