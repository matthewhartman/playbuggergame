import '../css/index.css';
import { LEFT_HAND, RIGHT_HAND } from './hands';
import { FLY } from './fly';
import MUSIC_LEVEL from '../audio/music.mp3';
import MUSIC_GAMEOVER from '../audio/gameover.mp3';
import MUSIC_CONGRATULATIONS from '../audio/congratulations.mp3';
import SOUND_LEVEL_UP from '../audio/levelup.mp3';
import SOUND_SLAP from '../audio/slap.mp3';
import SOUND_SPLAT from '../audio/splat.mp3';
import SOUND_CLAP from '../audio/clap.mp3';
import { createAudioManager } from './audioManager';

const buggerGame = function(host) {

  let timer = null;
  let level = 1;
  let flyCount = 0;
  let availableFlies = 40;
  let currentTime = 90;
  let flySpeed = 40;
  let levelMusicSource = null;

  const audio = createAudioManager();

  // Map logical sound names to imported URLs
  const SFX = {
    slap: SOUND_SLAP,
    splat: SOUND_SPLAT,
    levelup: SOUND_LEVEL_UP,
    clap: SOUND_CLAP,
    gameoverMusic: MUSIC_GAMEOVER,
    congratsMusic: MUSIC_CONGRATULATIONS,
    levelMusic: MUSIC_LEVEL,
  };

  const bindEvents = function() {
    let soundsReady = false;
    let soundsReadyPromise = null;

    function ensureSoundsReady() {
      if (soundsReady) return Promise.resolve();
      if (soundsReadyPromise) return soundsReadyPromise;
      soundsReadyPromise = audio.unlock().then(function() {
        return audio.loadAll(SFX);
      })
      .then(function() {
        soundsReady = true;
      })
      .catch(function(err) {
        console.warn('Failed to init audio', err);
      });
      return soundsReadyPromise;
    }

    host.addEventListener("click", function(event) {
      event.preventDefault();
      const element = event.target;
      if (element.closest("#play") !== null) {
        ensureSoundsReady().then(function() {
          return renderLevelText();
        })
        .then(function() {
          audio.play('levelup');
        });
      }
      if (element.closest(".game-stage") !== null) {
        assertSwat(event.clientX, event.clientY);
      }
    });
    host.addEventListener("animationend", function(event) {
      const element = event.target;
      // callback after fly dies and vanishes
      if (element.closest('[data-alive="false"]') !== null) {
        element.remove();
        renderLevelOutcome();
      }
      // callback after .level-text-7 is the last node to appear on screen
      if (element.closest('.level-text-7') !== null) {
        const parentEl = element.closest(".level-text");
        if (!parentEl.classList.contains("stage-right")) {
          parentEl.classList.add("stage-right");
        }
      }
      // callback after last node of .level-text-1 exits the screen
      if (element.closest(".level-text-1") !== null) {
        const parentEl = element.closest(".level-text");
        if (parentEl.classList.contains("stage-right")) {
          // start the game music after level text disappears
          renderStage().then(function() {
            levelMusicSource = audio.play('levelMusic', { loop: true, volume: 0.6 });
            startTimer();
          });
        }
      }
      // callback once stage is finished hiding
      if (element.closest(".header-out") !== null) {
        const headerEl = element.closest(".header-out");
        if (headerEl.classList.contains("header-out")) {
          if (availableFlies <= 0) {
            renderLevelOutcome();
          } else {
            renderGameOverText().then(function() {
              stopLevelMusic();
              audio.play('gameoverMusic', { volume: 0.9 });
              resetAllSettings();
            });
          }
        }
      }
      // callback after congratulations animation is done
      if (element.classList.contains("congratulations-container")) {
        renderLevelText().then(function() {
          audio.play('levelup');
        });
      }
    });
  }

  const stopLevelMusic = function() {
    if (levelMusicSource) {
      try { levelMusicSource.stop(); } catch (e) {}
      levelMusicSource = null;
    }
  };

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

  const getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
  }

  const createPath = function(element) {
    var startX = Math.random() < 0.5 ? -30 : element.offsetWidth + 30;
    var startY = Math.random() < 60 ? 30 : element.offsetHeight + 30
    var points = [{ x: startX, y: startY }];

    for (var i = 0; i < 9; i++) {
      var x = getRandomInt(element.offsetWidth);
      var y = getRandomInt(element.offsetHeight);
      points.push({ x: x, y: y });
    }
    points.push({
      x: Math.random() < 0.5 ? -30 : element.offsetWidth + 30,
      y: Math.random() < 60 ? 30 : element.offsetHeight + 30
    });
    return points;
  }

  const generateFlies = function(numberOfFlies) {
    for (let i = 0; i < numberOfFlies; i++) {
      generateFly();
    }
  }

  const generateFly = function() {
    ++flyCount;
    const gameStage = host.querySelector('.game-stage');
    if (!gameStage) return;

    const path = createPath(gameStage);

    const flyEl = document.createElement('span');
    flyEl.dataset.index = String(flyCount);
    flyEl.dataset.alive = 'true';
    flyEl.className = 'fly';

    // SVG/html for the fly
    flyEl.innerHTML = FLY;

    // Set CSS variables for the path points
    path.forEach((point, i) => {
      flyEl.style.setProperty(`--x${i}`, `${point.x}px`);
      flyEl.style.setProperty(`--y${i}`, `${point.y}px`);
    });

    // Safety for end point in case path length changes
    if (path.length > 0) {
      const last = path[path.length - 1];
      flyEl.style.setProperty(`--x10`, `${last.x}px`);
      flyEl.style.setProperty(`--y10`, `${last.y}px`);
    }

    // Per-fly animation duration only (no new @keyframes)
    flyEl.style.animationDuration = `${flySpeed}s`;

    gameStage.insertAdjacentElement('afterbegin', flyEl);
  };


  const renderAvailableFliesCount = function() {
    const flyCountEl = host.querySelector('.fly-count');
    if (flyCountEl !== null) {
      flyCountEl.innerHTML = availableFlies;
    }
  }

  const assertSwat = function(x, y) {
    const allAliveFlies = host.querySelectorAll('[data-alive="true"]');
    audio.play('slap');

    allAliveFlies.forEach(function(fly) {
      const rect = fly.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (Math.abs(centerX - x) < 40 && Math.abs(centerY - y) < 40) {
        if (fly.dataset.alive === 'true') {
          --availableFlies;
          renderAvailableFliesCount();
          audio.play('splat');

          fly.style.setProperty('--x-hit', `${centerX}px`);
          fly.style.setProperty('--y-hit', `${centerY}px`);
          fly.dataset.alive = 'false';
          fly.classList.add('fly--dead');
        }
      }
    });
  };

  const startTimer = function() {
    let increment = 100 / currentTime;
    const totalFlies = availableFlies;
    timer = setInterval(() => {
      if (currentTime !== 0) {
        --currentTime
        renderTime();
        if (flyCount !== totalFlies) {
          generateFlies(1);
        }
      }
      if (currentTime === 10) {
        renderClockFace();
      }
      if (currentTime === 0) {
        clearTimer();
        unrenderStage();
      }
    }, 1000);
  }

  const renderClockFace = function() {
    const clockEl = host.querySelector('.header-clock');
    if (clockEl !== null) {
      if (currentTime <= 10) {
        clockEl.classList.add('header-clock-pressure');
      }
    }
  }

  const renderTime = function() {
    const timeEl = host.querySelector('.header-time');
    if (timeEl !== null) {
      timeEl.innerHTML = '';
      timeEl.innerHTML = `${renderTimeAsNumber()}`
    }
  }

  const renderLevelOutcome = function() {
    if (availableFlies <= 0) {
      ++level;
      clearTimer();
      setNewLevelSettings();
      renderCongratulations().then(function() {
        stopLevelMusic();
        audio.play('clap');
        audio.play('congratsMusic', {
          volume: 0.9,
        });
      });
    }
  }

  const unrenderStage = function() {
    const header = host.querySelector('.header');
    if (header !== null) {
      header.classList.add('header-out');
    }
  }

  const resetAllSettings = function() {
    clearTimer();
    level = 1;
    flyCount = 0;
    currentTime = 90;
    availableFlies = 40;
    flySpeed = 40;
  }

  const setNewLevelSettings = function() {
    flyCount = 0;
    switch(level) {
      case 2: {
        currentTime = 90;
        availableFlies = 50;
        flySpeed = 30;
        break;
      }
      case 3: {
        currentTime = 90;
        availableFlies = 60;
        flySpeed = 20;
        break;
      }
      case 4: {
        currentTime = 90;
        availableFlies = 70;
        flySpeed = 15;
        break;
      }
      default: {
        currentTime = 90;
        availableFlies = 40;
        flySpeed = 40;
        break;
      }
    }
  }

  const clearTimer = function() {
    clearInterval(timer);
  }

  const renderTimeAsNumber = function() {
    const currentTimeAsString = currentTime.toString();
    return `${currentTimeAsString.length === 1 ? '0' : currentTimeAsString.split("")[0]}${currentTimeAsString.length === 1 ? currentTimeAsString : currentTimeAsString.split("")[1]}`;
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
                <div class="fly">${FLY}</div>
                <div class="header-text text-small">Left</div>
                <div class="header-text fly-count">${availableFlies}</div>
              </div>
              <div class="header-divider"></div>
              <div class="header-clock">
                <span class="header-clock-mouth"></span>
                <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9997 9.77814C6.3635 9.77814 1.77783 14.3638 1.77783 20C1.77783 25.6362 6.3635 30.2219 11.9997 30.2219C17.6359 30.2219 22.2216 25.6362 22.2216 20C22.2216 14.3638 17.6359 9.77814 11.9997 9.77814ZM11.9997 29.3335C6.85321 29.3335 2.66624 25.147 2.66624 20C2.66624 14.853 6.85321 10.6665 11.9997 10.6665C17.1462 10.6665 21.3332 14.8535 21.3332 20C21.3332 25.1465 17.1462 29.3335 11.9997 29.3335Z" fill="#303342"/>
                <path d="M24.4439 17.7776H23.785C23.1791 14.5586 21.2909 11.7896 18.666 10.0284V2.22243C18.666 0.996966 17.6695 0 16.4435 0H7.55475C6.32881 0 5.33232 0.996492 5.33232 2.22243V10.0289C2.11956 12.184 0 15.8481 0 20C0 24.1519 2.12003 27.816 5.33327 29.9711V37.7776C5.33327 39.003 6.32976 40 7.5557 40H16.4445C17.6704 40 18.6669 39.0035 18.6669 37.7776V29.9711C21.2918 28.2099 23.18 25.4409 23.7859 22.222H24.4449C25.1801 22.222 25.7779 21.6237 25.7779 20.8889V19.1111C25.777 18.3758 25.1792 17.7776 24.4439 17.7776ZM6.22167 2.22243C6.22167 1.48715 6.81995 0.889352 7.55475 0.889352H16.4435C17.1788 0.889352 17.7766 1.48763 17.7766 2.22243V9.488C16.0619 8.54176 14.0931 8.00038 11.9996 8.00038C9.90613 8.00038 7.93733 8.54224 6.22167 9.48848V2.22243ZM17.7776 37.7776C17.7776 38.5128 17.1793 39.1106 16.4445 39.1106H7.5557C6.82042 39.1106 6.22262 38.5124 6.22262 37.7776V30.512C7.9378 31.4582 9.90661 32.0001 12.0006 32.0001C14.0945 32.0001 16.0629 31.4582 17.7785 30.512V37.7776H17.7776ZM11.9996 31.1112C5.87276 31.1112 0.888404 26.1269 0.888404 20C0.888404 13.8731 5.87276 8.88878 11.9996 8.88878C18.1265 8.88878 23.1108 13.8731 23.1108 20C23.1108 26.1269 18.1265 31.1112 11.9996 31.1112ZM24.4439 21.3331H23.9205C23.9698 20.8946 23.9992 20.4513 23.9992 20C23.9992 19.5487 23.9698 19.105 23.9205 18.6669H24.4439C24.689 18.6669 24.8886 18.8665 24.8886 19.1116V20.8893C24.8886 21.134 24.689 21.3331 24.4439 21.3331Z" fill="#303342"/>
                </svg>
                <div class="header-text text-small">Time</div>
                <div class="header-text header-time">${currentTime}</div>
              </div>
            </div>
          </div>
          <div class="game-stage">
          </div>
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
              ${LEFT_HAND}
              ${RIGHT_HAND}
            </div>
            <div class="congratulations-clap">
              ${LEFT_HAND}
              ${RIGHT_HAND}
            </div>
            <div class="congratulations-clap">
              ${LEFT_HAND}
              ${RIGHT_HAND}
            </div>
          </div>
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
