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
    name: "Cupcake",
    pixels: [
      [null,null,null,null,null,null,'#fff3e6','#fff3e6','#fff3e6','#fff3e6',null,null,null,null,null,null],
      [null,null,null,null,null,'#fff3e6','#ffd6e6','#ffd6e6','#ffd6e6','#ffd6e6','#fff3e6',null,null,null,null,null],
      [null,null,null,null,'#fff3e6','#ffd6e6','#ff9fcf','#ff9fcf','#ff9fcf','#ff9fcf','#ffd6e6','#fff3e6',null,null,null,null],
      [null,null,null,'#fff3e6','#ffd6e6','#ff9fcf','#ff4da6','#ff4da6','#ff4da6','#ff4da6','#ff9fcf','#ffd6e6','#fff3e6',null,null,null],
      [null,null,'#fff3e6','#ffd6e6','#ff9fcf','#ff4da6','#cc0066','#cc0066','#cc0066','#cc0066','#ff4da6','#ff9fcf','#ffd6e6','#fff3e6',null,null],
      [null,'#fff3e6','#ffd6e6','#ff9fcf','#ff4da6','#cc0066','#990040','#990040','#990040','#990040','#cc0066','#ff4da6','#ff9fcf','#ffd6e6','#fff3e6',null],
      [null,'#fff3e6','#ffd6e6','#ff9fcf','#ff4da6','#cc0066','#990040','#990040','#990040','#990040','#cc0066','#ff4da6','#ff9fcf','#ffd6e6','#fff3e6',null],
      [null,null,'#fff3e6','#ffd6e6','#ff9fcf','#ff4da6','#cc0066','#cc0066','#cc0066','#cc0066','#ff4da6','#ff9fcf','#ffd6e6','#fff3e6',null,null],
      [null,null,null,'#fff3e6','#ffd6e6','#ff9fcf','#ff4da6','#ff4da6','#ff4da6','#ff4da6','#ff9fcf','#ffd6e6','#fff3e6',null,null,null],
      [null,null,null,null,'#fff3e6','#ffd6e6','#ff9fcf','#ff9fcf','#ff9fcf','#ff9fcf','#ffd6e6','#fff3e6',null,null,null,null],
      [null,null,null,null,null,'#b5651d','#b5651d','#b5651d','#b5651d','#b5651d','#b5651d',null,null,null,null,null],
      [null,null,null,null,'#b5651d','#8b5a2b','#8b5a2b','#8b5a2b','#8b5a2b','#8b5a2b','#8b5a2b','#b5651d',null,null,null,null],
      [null,null,null,'#b5651d','#8b5a2b','#654321','#654321','#654321','#654321','#654321','#654321','#8b5a2b','#b5651d',null,null,null],
      [null,null,'#b5651d','#8b5a2b','#654321','#4a3018','#4a3018','#4a3018','#4a3018','#4a3018','#4a3018','#654321','#8b5a2b','#b5651d',null,null],
      [null,'#b5651d','#8b5a2b','#654321','#4a3018','#2d1a0a','#2d1a0a','#2d1a0a','#2d1a0a','#2d1a0a','#2d1a0a','#4a3018','#654321','#8b5a2b','#b5651d',null],
      ['#b5651d','#8b5a2b','#654321','#4a3018','#2d1a0a','#1a0f05','#1a0f05','#1a0f05','#1a0f05','#1a0f05','#1a0f05','#2d1a0a','#4a3018','#654321','#8b5a2b','#b5651d']
    ]
  },

  advanced: {
    cols: 24,
    rows: 24,
    name: "Ice Cream",
    pixels: [
      // A simplified 24x24 ice cream cone (you can expand this)
      [null,null,null,null,null,null,null,null,null,null,'#ffe6f2','#ffe6f2','#ffe6f2','#ffe6f2',null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,'#ffe6f2','#ffb3d9','#ffb3d9','#ffb3d9','#ffb3d9','#ffe6f2',null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff80c0','#ff80c0','#ff80c0','#ffb3d9','#ffe6f2',null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff4da6','#ff4da6','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null,null,null,null,null,null,null],
      [null,null,null,null,null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#ff1a8c','#ff1a8c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null,null,null,null,null,null],
      [null,null,null,null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#e6005c','#e6005c','#e6005c','#e6005c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null,null,null,null,null],
      [null,null,null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#e6005c','#cc0052','#cc0052','#cc0052','#cc0052','#e6005c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null,null,null,null],
      [null,null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#e6005c','#cc0052','#b30047','#b30047','#b30047','#b30047','#cc0052','#e6005c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null,null,null],
      [null,null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#e6005c','#cc0052','#b30047','#99003d','#99003d','#99003d','#99003d','#b30047','#cc0052','#e6005c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null,null],
      [null,'#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#e6005c','#cc0052','#b30047','#99003d','#800033','#800033','#800033','#800033','#99003d','#b30047','#cc0052','#e6005c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2',null],
      ['#ffe6f2','#ffb3d9','#ff80c0','#ff4da6','#ff1a8c','#e6005c','#cc0052','#b30047','#99003d','#800033','#660029','#660029','#660029','#660029','#800033','#99003d','#b30047','#cc0052','#e6005c','#ff1a8c','#ff4da6','#ff80c0','#ffb3d9','#ffe6f2'],
      [null,'#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6','#fff3e6',null],
      [null,null,'#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3','#e6d1a3',null,null],
      [null,null,null,'#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366','#d9b366',null,null,null],
      [null,null,null,null,'#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933','#cc9933',null,null,null,null],
      [null,null,null,null,null,'#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400','#b37400',null,null,null,null,null],
      [null,null,null,null,null,null,'#995c00','#995c00','#995c00','#995c00','#995c00','#995c00','#995c00','#995c00','#995c00','#995c00','#995c00','#995c00',null,null,null,null,null,null],
      [null,null,null,null,null,null,null,'#804700','#804700','#804700','#804700','#804700','#804700','#804700','#804700','#804700','#804700',null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,'#663300','#663300','#663300','#663300','#663300','#663300','#663300','#663300',null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,'#4d2600','#4d2600','#4d2600','#4d2600','#4d2600','#4d2600',null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,'#331a00','#331a00','#331a00','#331a00',null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,'#1a0d00','#1a0d00',null,null,null,null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
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
