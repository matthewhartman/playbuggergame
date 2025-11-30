// audioManager.js — ES6 version without async/await (no regeneratorRuntime required)

export function createAudioManager() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    console.warn("Web Audio API not supported");
    return {
      unlock: function () {},
      loadAll: function () { return Promise.resolve(); },
      play: function () {}
    };
  }

  const context = new AudioContextClass();
  const buffers = new Map();
  let unlocked = false;

  // Must be called inside user interaction
  function unlock() {
    if (unlocked) return Promise.resolve();

    if (context.state === "suspended") {
      return context.resume().then(function () {
        unlocked = true;
      });
    } else {
      unlocked = true;
      return Promise.resolve();
    }
  }

  // Load a single sound URL into an AudioBuffer
  function loadBuffer(name, url) {
    if (buffers.has(name)) {
      return Promise.resolve(buffers.get(name));
    }

    return fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (arrayBuffer) {
        return new Promise(function (resolve, reject) {
          context.decodeAudioData(
            arrayBuffer,
            function (decoded) {
              buffers.set(name, decoded);
              resolve(decoded);
            },
            function (err) {
              console.error("decodeAudioData failed for", url, err);
              reject(err);
            }
          );
        });
      });
  }

  // Load multiple sounds at once
  function loadAll(soundMap) {
    const promises = Object.entries(soundMap).map(function ([name, url]) {
      return loadBuffer(name, url);
    });
    return Promise.all(promises);
  }

  // Play a loaded sound
  function play(name, options) {
    options = options || {};

    const volume = options.volume !== undefined ? options.volume : 1;
    const loop = options.loop || false;
    const rate = options.rate || 1;
    const pan = options.pan || 0;

    const buffer = buffers.get(name);
    if (!buffer || !unlocked) {
      return;
    }

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.playbackRate.value = rate;

    let node = source;

    // Gain (volume)
    if (volume !== 1) {
      const gainNode = context.createGain();
      gainNode.gain.value = volume;
      node.connect(gainNode);
      node = gainNode;
    }

    // Stereo panner (if available)
    if (context.createStereoPanner && pan !== 0) {
      const panNode = context.createStereoPanner();
      panNode.pan.value = pan;
      node.connect(panNode);
      node = panNode;
    }

    node.connect(context.destination);

    try {
      source.start(0);
    } catch (e) {
      console.warn("Audio start failed", e);
    }

    return source;
  }

  return {
    context: context,
    unlock: unlock,
    loadAll: loadAll,
    play: play
  };
}
