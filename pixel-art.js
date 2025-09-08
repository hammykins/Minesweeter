// Pixel art data for picture reveal feature
// Each difficulty has a corresponding pixel art grid
// null = transparent/no color, hex color = pixel color

const PIXEL_ART = {
  beginner: {
    cols: 9,
    rows: 9,
    name: "Heart",
    pixels: [
      [null, '#ffb3d9', '#ffb3d9', null, null, '#ffb3d9', '#ffb3d9', null, null],
      ['#ffb3d9', '#ff66b3', '#ff66b3', '#ff66b3', '#ff66b3', '#ff66b3', '#ff66b3', '#ffb3d9', null],
      ['#ffb3d9', '#ff66b3', '#ff1a8c', '#ff1a8c', '#ff1a8c', '#ff1a8c', '#ff66b3', '#ffb3d9', null],
      [null, '#ffb3d9', '#ff66b3', '#ff1a8c', '#ff1a8c', '#ff66b3', '#ffb3d9', null, null],
      [null, null, '#ffb3d9', '#ff66b3', '#ff66b3', '#ffb3d9', null, null, null],
      [null, null, null, '#ffb3d9', '#ff66b3', null, null, null, null],
      [null, null, null, null, '#ffb3d9', null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ]
  },
  
  intermediate: {
    cols: 16,
    rows: 16,
    name: "Cherries",
    pixels: [
      // Row 1 (y=1)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 2 (y=2)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 3 (y=3)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 4 (y=4) - Stem join and start
      [null,null,null,null,null,null,null,'#000000',null,'#000000',null,null,null,null,null,null],
      // Row 5 (y=5) - Stems
      [null,null,null,null,null,null,null,'#1E4E00','#3A8A00','#3A8A00',null,'#3A8A00',null,null,null,null],
      // Row 6 (y=6) - Cherry tops and stems
      [null,null,null,null,'#9E1B1B','#C72424',null,'#000000','#1E4E00','#3A8A00',null,null,null,null,null,null],
      // Row 7 (y=7) - Upper cherries
      [null,null,null,'#9E1B1B','#C72424','#C72424','#C72424','#9E1B1B','#000000',null,null,'#9E1B1B','#1E4E00','#9E1B1B',null,null],
      // Row 8 (y=8) - Main cherry bodies
      [null,null,'#9E1B1B','#C72424','#FFFFFF','#C72424',null,'#9E1B1B',null,'#C72424','#C72424',null,'#C72424','#9E1B1B','#9E1B1B',null],
      // Row 9 (y=9) - Lower cherries
      [null,null,null,null,null,null,null,null,null,'#C72424','#9E1B1B','#C72424',null,'#C72424','#9E1B1B',null],
      // Row 10 (y=10) - Cherry bottoms
      [null,null,null,null,null,null,null,null,null,'#9E1B1B','#FFFFFF',null,'#C72424',null,null,null],
      // Row 11 (y=11)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 12 (y=12)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 13 (y=13)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 14 (y=14)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 15 (y=15)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 16 (y=16)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    ]
  },

  advanced: {
    cols: 24,
    rows: 24,
    name: "Double Scoop Ice Cream",
    pixels: [
      // Rows 1-9: Empty (top of canvas)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 10 (index 9): Top scoop (Vanilla) - 5 pixels wide
      [null,null,null,null,null,null,null,null,null,'#fffef7','#fffef7','#fffef7','#fffef7','#fffef7',null,null,null,null,null,null,null,null,null,null],
      // Row 11 (index 10): Top scoop - 7 pixels wide
      [null,null,null,null,null,null,null,null,'#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7',null,null,null,null,null,null,null,null,null],
      // Row 12 (index 11): Top scoop - 9 pixels wide
      [null,null,null,null,null,null,null,'#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7',null,null,null,null,null,null,null,null],
      // Row 13 (index 12): Top scoop - 11 pixels wide
      [null,null,null,null,null,null,'#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7','#fffef7',null,null,null,null,null,null,null],
      // Row 14 (index 13): Top scoop bottom edge (darker) - 13 pixels wide + Strawberry scoop top - 9 pixels wide
      [null,null,null,null,null,'#f0ead6','#f0ead6','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#f0ead6','#f0ead6',null,null,null,null,null,null],
      // Row 15 (index 14): Strawberry scoop - 11 pixels wide
      [null,null,null,null,null,null,'#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1','#ffb3d1',null,null,null,null,null,null,null],
      // Row 16 (index 15): Strawberry scoop bottom (darker) + Cone top - 13 pixels wide
      [null,null,null,null,null,'#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2','#e699c2',null,null,null,null,null,null],
      // Row 17 (index 16): Cone - 13 pixels wide with texture
      [null,null,null,null,null,'#d4a574','#b8936b','#d4a574','#d4a574','#b8936b','#d4a574','#b8936b','#d4a574','#d4a574','#b8936b','#d4a574','#d4a574','#b8936b',null,null,null,null,null,null],
      // Row 18 (index 17): Cone - 11 pixels wide with texture
      [null,null,null,null,null,null,'#d4a574','#d4a574','#b8936b','#d4a574','#b8936b','#d4a574','#d4a574','#b8936b','#d4a574','#b8936b','#d4a574',null,null,null,null,null,null,null],
      // Row 19 (index 18): Cone - 9 pixels wide with texture
      [null,null,null,null,null,null,null,'#d4a574','#b8936b','#d4a574','#d4a574','#b8936b','#d4a574','#d4a574','#b8936b','#d4a574',null,null,null,null,null,null,null,null],
      // Row 20 (index 19): Cone - 7 pixels wide with texture
      [null,null,null,null,null,null,null,null,'#d4a574','#d4a574','#b8936b','#d4a574','#d4a574','#b8936b','#d4a574',null,null,null,null,null,null,null,null,null],
      // Row 21 (index 20): Cone - 5 pixels wide with texture
      [null,null,null,null,null,null,null,null,null,'#d4a574','#b8936b','#d4a574','#b8936b','#d4a574',null,null,null,null,null,null,null,null,null,null],
      // Row 22 (index 21): Cone - 3 pixels wide
      [null,null,null,null,null,null,null,null,null,null,'#d4a574','#d4a574','#d4a574',null,null,null,null,null,null,null,null,null,null,null],
      // Row 23 (index 22): Cone - 1 pixel wide (tip)
      [null,null,null,null,null,null,null,null,null,null,null,'#d4a574',null,null,null,null,null,null,null,null,null,null,null,null],
      // Row 24 (index 23): Empty (bottom of canvas)
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    ]
  }
};

// Global state for picture reveal
let pictureRevealEnabled = false;
let currentPixelArt = null;

// Enable picture reveal for current difficulty
function enablePictureReveal() {
  const artData = PIXEL_ART[difficulty];
  if (!artData) {
    currentPixelArt = null;
    pictureRevealEnabled = false;
    return;
  }
  
  currentPixelArt = artData;
  pictureRevealEnabled = true;
  
  // Update board size to match pixel art
  const { size } = DIFFICULTY_SETTINGS[difficulty];
  if (size !== artData.cols) {
    console.warn(`Board size ${size} doesn't match pixel art cols ${artData.cols}`);
  }
}

// Disable picture reveal
function disablePictureReveal() {
  pictureRevealEnabled = false;
  currentPixelArt = null;
}

// Get pixel color for a specific cell
function getPixelColor(row, col) {
  if (!pictureRevealEnabled || !currentPixelArt) return null;
  if (row < 0 || row >= currentPixelArt.rows || col < 0 || col >= currentPixelArt.cols) return null;
  return currentPixelArt.pixels[row][col];
}
