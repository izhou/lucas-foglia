let buttons = document.querySelector('.buttons');
let _hideButtons;
let _scheduled;

// Hide buttons unless mousemove
document.addEventListener('mousemove', (e) => setButtonTimeout());

function setButtonTimeout(timeout = 2000) {
  if (_scheduled) return;

  _scheduled = true;
  setTimeout(() => { _scheduled = false; }, 500);
  buttons.classList.remove('is-inactive');

  window.clearTimeout(_hideButtons);
  _hideButtons = setTimeout(function () {
    buttons.classList.add('is-inactive');
  }, timeout);
}

setButtonTimeout(5000);

// Set dark mode button
let dark_mode_btn = document.getElementById('dark-mode');

if (dark_mode_btn) {
  dark_mode_btn.checked = document.documentElement.getAttribute('data-mode') == "dark";

  dark_mode_btn.addEventListener('input', (e) => {
    let mode = e.target.checked ? "dark" : "light";
    localStorage.setItem('mode', mode);
    document.documentElement.setAttribute('data-mode', mode);
  });
}

