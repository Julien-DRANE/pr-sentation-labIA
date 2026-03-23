const slides = Array.from(document.querySelectorAll('.slide'));
const total = slides.length;
let current = 0;

const counter = document.getElementById('slide-counter');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const progWrap = document.getElementById('progress-wrap');

slides.forEach((_, i) => {
  const pip = document.createElement('div');
  pip.className = 'pip' + (i === 0 ? ' on' : '');
  pip.addEventListener('click', () => goTo(i));
  progWrap.appendChild(pip);
});

function goTo(index) {
  if (index < 0 || index >= total) return;

  slides[current].classList.remove('active');
  slides[current].classList.add('exit');
  setTimeout(() => slides[current].classList.remove('exit'), 600);

  current = index;
  slides[current].classList.add('active');

  document.querySelectorAll('.pip').forEach((pip, i) => {
    pip.classList.toggle('on', i === current);
  });

  counter.textContent = (current + 1) + ' / ' + total;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
    goTo(current + 1);
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    goTo(current - 1);
  }
});

let touchStartX = 0;

document.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchend', (event) => {
  const deltaX = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      goTo(current + 1);
    } else {
      goTo(current - 1);
    }
  }
});
