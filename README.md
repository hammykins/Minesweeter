# Minesweeter: Kawaii Candy & Sweets Theme 💗

A web-based Minesweeper variant with a cute, candy-inspired theme and picture reveal feature.

## Features

### Main Game
- **Candy Theme**: Sweet emoji icons (🍬 🧁 🍦) instead of numbers
- **First-Click Safe**: Mines are placed after your first reveal
- **Difficulty Levels**: Beginner (9x9), Intermediate (16x16), Advanced (24x24)
- **Timer & Mine Counter**: Track your progress
- **Leaderboard**: Save your best times with 3-letter initials
- **Accessible Controls**: Keyboard support and modal dialogs

### Picture Reveal Mode
- **Toggle Feature**: Show/hide pixel art background during gameplay
- **Pixel Art**: Different designs for each difficulty level
- **Layered Display**: Game icons stay visible on top of the artwork
- **Progressive Reveal**: Pictures appear as you uncover cells

## Current Status

### Working Features ✅
- Complete Minesweeper mechanics with mine counter, timer, flags
- Picture toggle functionality ("🎨 Show Picture" / "🙈 Hide Picture")
- CSS layering (game icons on top, picture background)
- Persistent leaderboard with localStorage
- Modal dialogs for rules and leaderboard
- Confetti animations on win/lose

### Known Issues & TODOs 🚧

#### Picture Reveal Improvements Needed:
1. **Pixel Art Quality**: Current designs need to be more accurate and recognizable
   - Heart (9x9): Basic but functional
   - Cherries (16x16): Multiple attempts, still abstract
   - Ice cream cone (24x24): Detailed but needs refinement

2. **Toggle Behavior**: Currently shows entire picture when enabled
   - **NEED**: Only show picture pixels where cells are actually revealed
   - **CURRENT**: Full picture visible when toggle is on
   - **GOAL**: Picture should reveal progressively as you play, not all at once

#### Technical Implementation Notes:
- Picture background renders behind all cells
- Cover divs (`.pixel-cover`) hide unrevealed areas
- Game icons render on top layer (z-index: 3) with white text shadow for visibility
- Toggle just shows/hides without restarting game

## Development Branches

- **`main`**: Original Minesweeper without picture feature
- **`feature/picture-reveal`**: Current development branch with picture functionality

## Quick Start

1. Open `index.html` in your browser
2. Select difficulty level
3. Click "🎨 Show Picture" to enable picture reveal mode
4. Play Minesweeper normally - picture reveals as you uncover cells
5. Toggle "🙈 Hide Picture" to return to candy-only mode

## File Structure

```
├── index.html          # Main game HTML structure
├── style.css           # Styling and picture reveal CSS
├── main.js             # Game logic, rendering, and UI
├── pixel-art.js        # Pixel art data for each difficulty
└── README.md           # This documentation
```

## How to Run
Just open `index.html` in your browser.

## Contributing

Priority improvements:
1. Create better pixel art designs (more recognizable fruits/desserts)
2. Fix toggle to only reveal picture where cells are uncovered
3. Add more difficulty-specific artwork options
4. Improve pixel art creation tools/workflow

---

Enjoy your sweet Minesweeper experience!
