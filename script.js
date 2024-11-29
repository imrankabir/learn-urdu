const letters = ['ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ہ', 'ء', 'ی', 'ے'];
const container = document.querySelector('.container');

const get = (k, d) => JSON.parse(localStorage.getItem(`learn-urdu-${k}`)) ?? d;
const set = (k, v) => localStorage.setItem(`learn-urdu-${k}`, JSON.stringify(v));

letters.forEach(letter => {
  const box = document.createElement('div');
  box.classList.add('box');

  const el = document.createElement('div');
  el.classList.add('letter');
  el.textContent = letter;
  box.appendChild(el);

  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 120;
  box.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  
  const getCoordinates = (c, e) => {
    const rect = c.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startPosition = e => {
    isDrawing = true;
    ctx.beginPath();
    e.preventDefault();
  };

  const endPosition = e => {
    isDrawing = false;
    ctx.closePath();
    e.preventDefault();
  };

  const draw = e => {
    if (isDrawing) {
      const { x, y } = getCoordinates(canvas, e);
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    e.preventDefault();
  };

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mouseleave', endPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw);

  container.appendChild(box);
});

document.querySelector('#clear').addEventListener('click', e => {
  document.querySelectorAll('canvas').forEach(c => {
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
  });
});