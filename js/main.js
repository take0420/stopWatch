'use strict';

{
  const timer = document.getElementById('timer');
  const buttons = {
    start: document.getElementById('start'),
    stop: document.getElementById('stop'),
    reset: document.getElementById('reset'),
  };

  let startTime,
    timeoutId,
    elapsedTime = 0;

  const updateTimer = () => {
    const time = new Date(Date.now() - startTime + elapsedTime);
    timer.textContent = `${String(time.getMinutes()).padStart(2, '0')}:${String(
      time.getSeconds()
    ).padStart(2, '0')}.${String(time.getMilliseconds()).padStart(3, '0')}`;
  };

  const startCountUp = () => {
    updateTimer();
    timeoutId = setTimeout(startCountUp, 10);
  };

  const setButtonState = (state) => {
    const states = {
      initial: ['active', 'inactive', 'inactive'],
      running: ['inactive', 'active', 'inactive'],
      stopped: ['active', 'inactive', 'active'],
    };

    Object.keys(buttons).forEach((key, index) => {
      buttons[key].classList.toggle(
        'inactive',
        states[state][index] === 'inactive'
      );
    });
  };

  const handleStart = () => {
    if (buttons.start.classList.contains('inactive')) return;
    setButtonState('running');
    startTime = Date.now();
    startCountUp();
  };

  const handleStop = () => {
    if (buttons.stop.classList.contains('inactive')) return;
    setButtonState('stopped');
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  };

  const handleReset = () => {
    if (buttons.reset.classList.contains('inactive')) return;
    setButtonState('initial');
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  };

  const initialize = () => {
    setButtonState('initial');
    buttons.start.addEventListener('click', handleStart);
    buttons.stop.addEventListener('click', handleStop);
    buttons.reset.addEventListener('click', handleReset);
  };

  initialize();
}
