(() => {
    const colors = ['red', 'green', 'blue', 'yellow'];
    let sequence = [];
    let userInput = [];
    let level = 0, score = 0, highScore = 0;
  
    // DOM references
    const tiles = Object.fromEntries(
      colors.map(c => [c, document.getElementById(c)])
    );
    const levelEl  = document.getElementById('level');
    const scoreEl  = document.getElementById('score');
    const highEl   = document.getElementById('highscore');
    const startBtn = document.getElementById('start');
    const themeBtn = document.getElementById('theme-toggle');
    const body     = document.body;
  
    // Message overlay
    const overlay     = document.getElementById('message-overlay');
    const messageText = document.getElementById('message-text');
    const restartBtn  = document.getElementById('restart');
  
    // Load persisted high score & theme
    highScore = parseInt(localStorage.getItem('simonHigh')) || 0;
    highEl.textContent = highScore;
    let theme = localStorage.getItem('simonTheme') || 'light';
    body.setAttribute('data-theme', theme);
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
  
    themeBtn.addEventListener('click', () => {
      theme = theme === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', theme);
      localStorage.setItem('simonTheme', theme);
      themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    });
  
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      startGame();
    });
  
    function startGame() {
      disableClicks();
      sequence = [];
      userInput = [];
      level = 0;
      score = 0;
      updateUI();
      startBtn.disabled = true;
      setTimeout(nextRound, 500);
    }
  
    function nextRound() {
      userInput = [];
      level++;
      score += level * 5;
      updateUI();
      disableClicks();
      const next = colors[Math.floor(Math.random() * colors.length)];
      sequence.push(next);
      flashTile(next);
      setTimeout(enableClicks, 700);
    }
  
    function flashTile(color) {
      const tile = tiles[color];
      const audio = new Audio(tile.dataset.sound);
      tile.classList.add('active');
      audio.play();
      setTimeout(() => tile.classList.remove('active'), 600);
    }
  
    function handleClick(e) {
      const color = e.currentTarget.id;
      userInput.push(color);
      flashTile(color);
      const idx = userInput.length - 1;
      if (userInput[idx] !== sequence[idx]) return showGameOver();
      if (userInput.length === sequence.length) {
        disableClicks();
        setTimeout(nextRound, 800);
      }
    }
  
    function showGameOver() {
      disableClicks();
      messageText.textContent = `Game Over! Level: ${level}, Score: ${score}`;
      overlay.classList.remove('hidden');
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('simonHigh', highScore);
        highEl.textContent = highScore;
      }
    }
  
    function updateUI() {
      levelEl.textContent = level;
      scoreEl.textContent = score;
    }
  
    function enableClicks() {
      Object.values(tiles).forEach(t => t.addEventListener('click', handleClick));
    }
    function disableClicks() {
      Object.values(tiles).forEach(t => t.removeEventListener('click', handleClick));
    }
  })();
  