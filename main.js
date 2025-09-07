// Minesweeter main.js
// Simple grid-based game with kawaii candy theme

let boardSize = 12;
let numMines = 24;
let boardMask = null;
let timerInterval = null;
let timerValue = 0;
let firstClick = true;
let firstClickIdx = null;
let difficulty = 'beginner';
let gameOver = false;
// Use an internal variable for leaderboard data to avoid collision with DOM id 'leaderboard'
let leaderboardData = [];

// For quick testing: when true the page will load with all safe cells revealed except one.
// Toggle this to false or remove before finalizing.
const AUTO_FILL_FOR_TESTING = false;

// Dev/test helpers removed for finalization

const DIFFICULTY_SETTINGS = {
  beginner: { size: 9, mines: 10 },
  intermediate: { size: 16, mines: 40 },
  advanced: { size: 24, mines: 99 }
};

document.getElementById('difficulty-select').addEventListener('change', (e) => {
  difficulty = e.target.value;
  restartGame();
});

// Modal instructions toggle (accessible)
function openModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');
  if (!backdrop || !modal) return;
  backdrop.style.display = 'flex';
  // focus the modal for keyboard input
  modal.focus();
  // handle Escape to close
  const esc = (e) => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', esc);
  // store for removal
  backdrop._escHandler = esc;
}
function closeModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');
  if (!backdrop || !modal) return;
  backdrop.style.display = 'none';
  if (backdrop._escHandler) document.removeEventListener('keydown', backdrop._escHandler);
}
document.getElementById('rules-btn').addEventListener('click', () => openModal());
document.getElementById('close-instructions').addEventListener('click', () => closeModal());
// allow clicking backdrop to close
document.getElementById('modal-backdrop').addEventListener('click', (e) => {
  if (e.target.id === 'modal-backdrop') closeModal();
});
// set data-title instead of title to avoid native tooltip box
document.getElementById('reset-btn').setAttribute('data-title', 'Reset');

// Leaderboard persistence and modal
function saveLeaderboard() {
  try { localStorage.setItem('minesweeter_leaderboard', JSON.stringify(leaderboardData || [])); } catch(e) {}
}
function loadLeaderboard() {
  try {
    const raw = localStorage.getItem('minesweeter_leaderboard');
    if (raw) leaderboardData = JSON.parse(raw);
    if (!Array.isArray(leaderboardData)) leaderboardData = [];
  } catch(e) { leaderboardData = []; }
}
function openLeaderboard() {
  loadLeaderboard();
  showLeaderboard();
  const bd = document.getElementById('lb-backdrop');
  const modal = document.getElementById('lb-modal');
  if (bd && modal) { bd.style.display = 'flex'; modal.focus(); }
}
function closeLeaderboard() {
  const bd = document.getElementById('lb-backdrop');
  if (bd) bd.style.display = 'none';
}
document.getElementById('leaderboard-btn').addEventListener('click', () => {
  const bd = document.getElementById('lb-backdrop');
  if (bd && bd.style.display === 'flex') closeLeaderboard(); else openLeaderboard();
});
document.getElementById('close-leaderboard').addEventListener('click', () => closeLeaderboard());
document.getElementById('lb-backdrop').addEventListener('click', (e) => { if (e.target.id === 'lb-backdrop') closeLeaderboard(); });

// Picture reveal toggle
document.getElementById('picture-toggle').addEventListener('click', () => {
  const btn = document.getElementById('picture-toggle');
  if (pictureRevealEnabled) {
    disablePictureReveal();
    btn.textContent = '🎨 Picture Mode';
    btn.style.background = '#e1f5fe';
  } else {
    enablePictureReveal();
    btn.textContent = '🎮 Normal Mode';
    btn.style.background = '#c8e6c9';
  }
  restartGame();
});

function createBoard(mineSafeIdx = null) {
  const { size, mines } = DIFFICULTY_SETTINGS[difficulty];
  boardSize = size;
  numMines = mines;
  boardMask = null;
  const board = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const idx = y * boardSize + x;
      board.push({ mine: false, revealed: false, type: null, active: true, flagged: false, adj: 0 });
    }
  }
  // Only place mines and assign types if mineSafeIdx is not null
  if (mineSafeIdx !== null) {
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const idx = Math.floor(Math.random() * board.length);
      if (!board[idx].mine && board[idx].active && idx !== mineSafeIdx) {
        board[idx].mine = true;
        minesPlaced++;
      }
    }
    // Assign candy types based on adjacent mines
    for (let i = 0; i < board.length; i++) {
      if (!board[i].mine && board[i].active) {
        const adj = countAdjacentMines(board, i);
        board[i].adj = adj;
        if (adj === 1) board[i].type = '🍬';
        else if (adj === 2) board[i].type = '🧁';
        else if (adj >= 3) board[i].type = '🍦';
        else board[i].type = '';
      }
    }
  }
  return board;
}

function countAdjacentMines(board, idx) {
  const x = idx % boardSize;
  const y = Math.floor(idx / boardSize);
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
        const nidx = ny * boardSize + nx;
        if (board[nidx].mine) count++;
      }
    }
  }
  return count;
}

document.getElementById('reset-btn').onclick = () => { restartGame(); };

function renderBoard(board) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  gameBoard.style.setProperty('--board-size', boardSize);
  board.forEach((cell, idx) => {
    const div = document.createElement('div');
    div.className = 'cell';
    
    // Picture reveal setup
    if (pictureRevealEnabled && currentPixelArt) {
      const row = Math.floor(idx / boardSize);
      const col = idx % boardSize;
      const pixelColor = getPixelColor(row, col);
      
      div.classList.add('picture-mode');
      if (pixelColor) {
        div.style.backgroundColor = pixelColor;
      } else {
        div.classList.add('no-pixel');
      }
      
      // Add cover div for picture reveal
      const cover = document.createElement('div');
      cover.className = 'pixel-cover';
      div.appendChild(cover);
    }
    
    if (!cell.active) {
      div.style.visibility = 'hidden';
      div.style.pointerEvents = 'none';
    } else {
      div.oncontextmenu = (e) => {
        e.preventDefault();
        if (!firstClick && !gameOver) {
          flagCell(board, idx);
          updateMineCounter(board);
        }
      };
      div.onclick = () => {
        if (gameOver) return;
        if (firstClick) {
          firstClick = false;
          firstClickIdx = idx;
          window.board = createBoard(idx);
          timerValue = 0;
          document.getElementById('timer').textContent = `Time: 0`;
          startTimer();
          revealCell(window.board, idx);
          renderBoard(window.board);
          return;
        }
        revealCell(board, idx);
      };
      if (cell.revealed) {
        div.classList.add('revealed');
        if (cell.mine) {
          if (!pictureRevealEnabled) {
            div.textContent = '🎁'; // pastel present
          }
        } else {
          if (!pictureRevealEnabled) {
            div.textContent = cell.type;
            if (cell.type) {
              div.title = `${cell.adj} adjacent mine${cell.adj > 1 ? 's' : ''}`;
            }
            if (cell.type === '🍬') div.classList.add('candy');
            if (cell.type === '🧁') div.classList.add('cupcake');
            if (cell.type === '🍦') div.classList.add('icecream');
          }
        }
      } else if (cell.flagged) {
        if (!pictureRevealEnabled) {
          div.textContent = '🚩';
        }
        div.classList.add('flagged');
      } else {
        if (!pictureRevealEnabled) {
          div.textContent = '';
        }
        div.classList.add('unrevealed');
      }
    }
    gameBoard.appendChild(div);
  });
  updateMineCounter(board);
}

function revealCell(board, idx) {
  if (gameOver || board[idx].revealed || !board[idx].active || board[idx].flagged) return;
  board[idx].revealed = true;
  if (!board[idx].mine && board[idx].type === '') {
    revealEmptyNeighbors(board, idx);
  }
  renderBoard(board);
  if (board[idx].mine) {
    gameOver = true;
    launchConfetti();
    showGameOver();
  } else if (checkWin(board)) {
    gameOver = true;
    showWin();
  }
}

function revealEmptyNeighbors(board, idx) {
  const x = idx % boardSize;
  const y = Math.floor(idx / boardSize);
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
        const nidx = ny * boardSize + nx;
        if (!board[nidx].revealed && board[nidx].active && !board[nidx].mine && !board[nidx].flagged) {
          board[nidx].revealed = true;
          if (board[nidx].type === '') {
            revealEmptyNeighbors(board, nidx);
          }
        }
      }
    }
  }
}

function flagCell(board, idx) {
  board[idx].flagged = !board[idx].flagged;
  renderBoard(board);
}

function updateMineCounter(board) {
  const mineCount = board.filter(cell => cell.mine).length;
  const flaggedCount = board.filter(cell => cell.flagged).length;
  document.getElementById('mine-counter').textContent = `Mines: ${mineCount - flaggedCount}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerValue++;
    document.getElementById('timer').textContent = `Time: ${timerValue}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function restartGame() {
  firstClick = true;
  firstClickIdx = null;
  timerValue = 0;
  document.getElementById('timer').textContent = `Time: 0`;
  stopTimer();
  gameOver = false;
  window.board = createBoard();
  renderBoard(window.board);
}

function showGameOver() {
  stopTimer();
  const gameOverDiv = document.getElementById('game-over');
  gameOverDiv.innerHTML = '<span style="font-family: Comic Sans MS, Comic Neue, cursive; font-size:2em; color:#ff69b4;">Game Over!<br><span style="font-size:0.5em;">🍭 Try Again! 🍭</span></span>';
  gameOverDiv.style.display = 'block';
  setTimeout(() => {
    gameOverDiv.style.display = 'none';
    restartGame();
  }, 2000);
}

function showWin() {
  stopTimer();
  launchHearts();
  const gameOverDiv = document.getElementById('game-over');
  const timeTaken = timerValue;
  let qualifies = false;
  // Ensure leaderboard is an array. If it's a JSON string or malformed, try to fix it.
  // leaderboardData is used internally; ensure it's an array
  // sanitize leaderboardData to ensure entries are valid objects with numeric time
  leaderboardData = Array.isArray(leaderboardData) ? leaderboardData : [];
  leaderboardData = leaderboardData.filter(e => e && typeof e.time === 'number');
  // sort ascending by time so the last entry is the slowest
  leaderboardData.sort((a,b) => a.time - b.time);
  if (leaderboardData.length < 10) {
    qualifies = true;
  } else {
    const last = leaderboardData[leaderboardData.length - 1];
    if (!last || typeof last.time !== 'number' || timeTaken < last.time) {
      qualifies = true;
    }
  }
  if (qualifies) setTimeout(() => showInitialsPrompt(timeTaken), 500);
  gameOverDiv.innerHTML = `<span style="font-family: Comic Sans MS, Comic Neue, cursive; font-size:2em; color:#ff69b4;">You Win!<br><span style="font-size:1.5em;">💗💗💗</span><br><span style='font-size:0.7em;color:#b2ebf2;'>Time: ${timeTaken}s</span></span>`;
  gameOverDiv.style.display = 'block';
  // If player does not qualify for leaderboard, auto-hide after a short delay.
  if (!qualifies) {
    setTimeout(() => {
      gameOverDiv.style.display = 'none';
      restartGame();
    }, 3000);
  }
}

function showInitialsPrompt(timeTaken) {
  // show initials prompt for qualifying times
  const gameOverDiv = document.getElementById('game-over');
  let letters = ['A','A','A'];
  let idx = 0;
  let keyHandler = null;
  function renderSelector() {
    // Build DOM nodes instead of using inline onclick handlers to avoid collisions
    gameOverDiv.innerHTML = '';
    const title = document.createElement('div');
    title.style.cssText = "font-family: Comic Sans MS, Comic Neue, cursive; font-size:1.3em; color:#ff69b4;";
    title.innerHTML = 'Top 10!<br>Enter your initials:';
    gameOverDiv.appendChild(title);
    const lettersRow = document.createElement('div');
    lettersRow.style.marginTop = '8px';
    for (let i = 0; i < 3; i++) {
      const btn = document.createElement('button');
      btn.textContent = letters[i];
      btn.style.fontSize = '2em';
      btn.style.margin = '0 6px';
      if (i === idx) btn.style.background = '#ffb6c1';
      // click to select
      btn.addEventListener('click', () => { idx = i; renderSelector(); });
      // wheel to change letter
      btn.addEventListener('wheel', (e) => {
        e.preventDefault();
        let code = letters[i].charCodeAt(0) + (e.deltaY < 0 ? 1 : -1);
        if (code > 90) code = 65;
        if (code < 65) code = 90;
        letters[i] = String.fromCharCode(code);
        renderSelector();
      });
      lettersRow.appendChild(btn);
    }
    gameOverDiv.appendChild(lettersRow);
    const submit = document.createElement('button');
    submit.id = 'submitInitials';
    submit.textContent = 'Submit';
    submit.style.cssText = 'margin-top:12px;font-size:1.1em;padding:6px 18px;border-radius:8px;background:#ffe4ec;color:#ff69b4;border:1px solid #ffb6c1;cursor:pointer;';
    submit.addEventListener('click', () => {
  const name = letters.join('');
  // include difficulty with the score so leaderboards are per-difficulty
  const entry = { name, time: timeTaken, difficulty: difficulty || 'beginner' };
  leaderboardData.push(entry);
  // persist and sort
  saveLeaderboard();
  leaderboardData.sort((a,b) => a.time - b.time);
  if (leaderboardData.length > 100) leaderboardData.length = 100; // keep some cap
  // remove key handler when done
  if (keyHandler) document.removeEventListener('keydown', keyHandler);
  // show leaderboard modal for current difficulty
  openLeaderboard();
  gameOverDiv.style.display = 'none';
  restartGame();
    });
    gameOverDiv.appendChild(document.createElement('br'));
    gameOverDiv.appendChild(submit);
  }
  renderSelector();
  // focus so keyboard input feels natural
  try { gameOverDiv.tabIndex = -1; gameOverDiv.focus(); } catch(e){}
  // allow typing letters, arrow navigation, and Enter to submit
  keyHandler = function(e) {
    if (!letters) return;
    if (/^[a-zA-Z]$/.test(e.key)) {
      letters[idx] = e.key.toUpperCase();
      idx = (idx + 1) % 3;
      renderSelector();
      e.preventDefault();
      return;
    }
    if (e.key === 'ArrowLeft') {
      idx = (idx + 2) % 3; renderSelector(); e.preventDefault(); return;
    }
    if (e.key === 'ArrowRight') {
      idx = (idx + 1) % 3; renderSelector(); e.preventDefault(); return;
    }
    if (e.key === 'Enter') {
      const sb = document.getElementById('submitInitials'); if (sb) sb.click(); e.preventDefault(); return;
    }
  };
  document.addEventListener('keydown', keyHandler);
}

// Dev/test helpers removed for finalization

function showLeaderboard() {
  const lbBackdrop = document.getElementById('lb-backdrop');
  const lbTitle = document.getElementById('lb-title');
  const lbTable = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
  lbTable.innerHTML = '';
  // map difficulty to display name
  const map = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Hard' };
  const display = map[difficulty] || difficulty;
  if (lbTitle) lbTitle.textContent = `Top 10 (${display})`;
  // filter by current difficulty
  const filtered = (leaderboardData || []).filter(e => (e.difficulty || 'beginner') === difficulty);
  filtered.sort((a,b) => a.time - b.time);
  if (!filtered || filtered.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="2" style="color:#6b6b6b;text-align:center;">No scores yet for ${display}.</td>`;
    lbTable.appendChild(row);
    return;
  }
  const top = filtered.slice(0, 10);
  top.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${entry.name}</td><td>${entry.time}s</td>`;
    lbTable.appendChild(row);
  });
  // ensure modal visible
  if (lbBackdrop) lbBackdrop.style.display = 'flex';
}

function launchConfetti() {
  try {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const emojis = ['🍬','🧁','🍦','🍭','💗'];
    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      span.className = 'confetti';
      span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      span.style.left = (10 + Math.random()*80) + 'vw';
      span.style.top = '-5vh';
      span.style.fontSize = (18 + Math.random()*18) + 'px';
      span.style.opacity = 1;
      container.appendChild(span);
      // animate
      setTimeout(() => {
        span.style.transition = 'transform 2.2s ease-out, opacity 2.2s ease-out';
        span.style.transform = `translateY(${80 + Math.random()*40}vh) rotate(${Math.random()*360}deg)`;
        span.style.opacity = 0;
      }, 20 + Math.random()*200);
    }
    // cleanup after animation
    setTimeout(() => { container.innerHTML = ''; }, 2600);
  } catch (e) {
    // swallow errors so confetti never blocks game flow
    console.error('confetti error', e);
  }
}

function launchHearts() {
  try {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const emojis = ['💗','💖','💝','💞'];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement('span');
      span.className = 'confetti';
      span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      span.style.left = (20 + Math.random()*60) + 'vw';
      span.style.top = '100vh';
      span.style.fontSize = (20 + Math.random()*24) + 'px';
      span.style.opacity = 1;
      container.appendChild(span);
      setTimeout(() => {
        span.style.transition = 'transform 2.4s ease-out, opacity 2.4s ease-out';
        span.style.transform = `translateY(-120vh) rotate(${(Math.random()*60)-30}deg)`;
        span.style.opacity = 0;
      }, 20 + Math.random()*200);
    }
    setTimeout(() => { container.innerHTML = ''; }, 2600);
  } catch (e) {
    console.error('hearts error', e);
  }
}

function checkWin(board) {
  // Win when every active non-mine cell is revealed
  for (let i = 0; i < board.length; i++) {
    const c = board[i];
    if (c.active && !c.mine && !c.revealed) return false;
  }
  return true;
}

// Initialize the game board on page load
window.onload = () => {
  const { size, mines } = DIFFICULTY_SETTINGS[difficulty];
  boardSize = size;
  numMines = mines;
  if (AUTO_FILL_FOR_TESTING) {
    // create a board with mines placed using a safe index near center
    window.board = createBoard(Math.floor((boardSize*boardSize)/2));
    // reveal all safe cells except one random safe cell to simulate last move
    const safeIndices = [];
    for (let i = 0; i < window.board.length; i++) {
      if (window.board[i].active && !window.board[i].mine) safeIndices.push(i);
    }
    if (safeIndices.length > 1) {
      // pick one to leave hidden
      const leave = safeIndices[Math.floor(Math.random() * safeIndices.length)];
      for (const idx of safeIndices) {
        if (idx === leave) continue;
        window.board[idx].revealed = true;
      }
      firstClick = false;
      renderBoard(window.board);
      console.log('AUTO_FILL_FOR_TESTING: left one safe cell hidden at index', leave);
      return;
    }
  }
  window.board = createBoard();
  renderBoard(window.board);
};

// Initialize the game
loadLeaderboard();
