// ---------- Stars: create 90 twinkling stars ----------
const starBox = document.querySelector('#stars');
for (let i = 0; i < 90; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.width = s.style.height = size + 'px';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 4 + 's';
  s.style.animationDuration = (Math.random() * 3 + 3) + 's';
  starBox.appendChild(s);
}
const rain = document.querySelector('#rain');
const symbols = ['❤', '♥', '💗'];

function createHeart() {
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = (Math.random() * 16 + 10) + 'px';
  h.style.animationDuration = (Math.random() * 5 + 6) + 's';   // 6-11 seconds
  h.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
  h.style.setProperty('--spin', (Math.random() * 120 - 60) + 'deg');

  rain.appendChild(h);

  // remove it when it finishes falling
  h.addEventListener('animationend', () => h.remove());
}

setInterval(createHeart, 150); 

// ---------- Music button ----------
const song = document.querySelector('#song');
const musicBtn = document.querySelector('#musicBtn');
musicBtn.addEventListener('click', () => {
  if (song.paused) {
    song.play().catch(() => alert('Add your song file named in-another-life.mp3 to the folder.'));
    musicBtn.classList.add('playing');
  } else {
    song.pause();
    musicBtn.classList.remove('playing');
  }
});

// ---------- The 15 questions ----------
const questions = [
  'Do we still talk honestly with each other?',
  'Do I still feel respected by my partner?',
  'Are we both willing to change something?',
  'Do we still share good moments together?',
  'Do I still see a future with this person?',
  'Do I still think about them when I look at the night sky?',
  'When I imagine another life, is it still with them?',
  'Do I miss who we were at the beginning?',
  'Would I forgive them if they truly said sorry?',
  'Do I feel lighter when we are together than apart?',
  'Have I actually told them how much I am hurting?',
  'Do I believe they are capable of changing?',
  'Am I trying for love, and not only out of fear of being alone?',
  'Can I accept the answer if this try does not work?',
  'If we both fought for this, could it really be different?'
];
const TOTAL = questions.length;

// ---------- Build the quiz on the page ----------
const form = document.querySelector('#quizForm');
questions.forEach((q, i) => {
  const n = i + 1;
  form.insertAdjacentHTML('beforeend', `
    <fieldset>
      <legend>${n}. ${q}</legend>
      <label><input type="radio" name="q${n}" value="yes"> Yes</label>
      <label><input type="radio" name="q${n}" value="no"> No</label>
    </fieldset>
  `);
});

const resultText = document.querySelector('#result');
const savedText = document.querySelector('#savedResult');
const fill = document.querySelector('.fill');
const counter = document.querySelector('#counter');

// ---------- Start button ----------
document.querySelector('#startBtn').addEventListener('click', () => {
  document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});

// ---------- Progress bar ----------
form.addEventListener('change', () => {
  const answered = form.querySelectorAll('input:checked').length;
  fill.style.width = (answered / TOTAL * 100) + '%';
  counter.textContent = `${answered} / ${TOTAL} answered`;
});

// ---------- Scoring ----------
document.querySelector('#resultBtn').addEventListener('click', () => {
  const answered = form.querySelectorAll('input:checked').length;
  if (answered < TOTAL) {
    resultText.textContent = `Answer all ${TOTAL} questions first, even the ones that hurt.`;
    return;
  }

  const score = form.querySelectorAll('input[value="yes"]:checked').length;
  let message;

  if (score <= 5) {
    message = 'Your heart may already be walking toward another life. It is okay to protect your peace.';
  } else if (score <= 10) {
    message = 'You are caught between the moon and the morning. One honest try could show you which way to go.';
  } else {
    message = 'You still carry so much love here. One last try looks worth the courage.';
  }

  resultText.textContent = `${score} of ${TOTAL} yes. ${message}`;
  localStorage.setItem('quizResult', score);
});

// ---------- Restart ----------
document.querySelector('#restartBtn').addEventListener('click', () => {
  form.reset();
  resultText.textContent = '';
  fill.style.width = '0';
  counter.textContent = `0 / ${TOTAL} answered`;
  document.querySelector('#quiz').scrollIntoView({ behavior: 'smooth' });
});

// ---------- Show last saved result ----------
const saved = localStorage.getItem('quizResult');
if (saved !== null) {
  savedText.textContent = `Last time, your heart said ${saved} of ${TOTAL}.`;
}

// ---------- Fade in sections on scroll ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('section').forEach(s => observer.observe(s));

// ---------- Click a card to copy ----------
document.querySelectorAll('.starter').forEach(card => {
  const original = card.textContent;
  card.addEventListener('click', () => {
    navigator.clipboard.writeText(original);
    card.textContent = 'Copied!';
    setTimeout(() => { card.textContent = original; }, 1200);
  });
});