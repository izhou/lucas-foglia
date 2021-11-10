document.getElementById('dark-mode').checked = document.documentElement.getAttribute('data-mode') == "dark";

document.getElementById('dark-mode').addEventListener('input', (e) => {
  let mode = e.target.checked ? "dark" : "light";
  localStorage.setItem('mode', mode);
  document.documentElement.setAttribute('data-mode', mode);
});

let _hideButtons;
let _scheduled;
let buttons = document.querySelector('.buttons');

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