// ============================================================
// PAWS & PASTURES — Irish Countryside Endless Runner
// ============================================================

// ── 1. CONFIG ────────────────────────────────────────────────
const CFG = {
  W: 480, H: 270,
  GROUND_Y: 220,       // y of top of ground strip
  PLAYER_X: 72,        // fixed horizontal position
  GRAVITY: 1400,       // px/s²
  JUMP_VEL: -520,      // px/s
  SPEED_INIT: 300,     // px/s
  SPEED_MAX: 700,
  SPEED_STEP: 10,      // added every 500 pts
  SPRITE_SCALE: 3,
  ANIM_FPS: 10,        // frames per second for sprite animation
};

// ── 2. PIXEL SPRITES ─────────────────────────────────────────
// Single-char palette keys; T = transparent
const P = {
  T: null,
  B: '#111111', // black
  W: '#f0e6d3', // white/cream fur
  G: '#3c7a1e', // grass green
  DG:'#2d5a16', // dark green
  LG:'#7ec850', // light green
  BR:'#8B4513', // brown
  LB:'#c8a46e', // light brown / tan
  TN:'#d4956a', // tan (malinois body)
  GR:'#888888', // grey
  LR:'#cccccc', // light grey
  RD:'#cc3333', // red
  YL:'#f7e96b', // yellow
  BL:'#4a76ee', // blue
  WB:'#1a1a6e', // dark blue (water)
  CY:'#aeeeff', // sky cyan
  OR:'#e07b28', // orange
  PK:'#ffaaaa', // pink (tongue)
  NB:'#5b3a29', // dark brown nose/eye
};

// 16×16 sprite rows – each row is a string of 16 palette keys
function sp(rows){ return rows.map(r=>[...r]); }

// Helper: convert row-strings using palette characters
// Each character maps to a palette key
const CHR = (s) => s.split('').map(c => P[c] || null);

// Loki - border collie: black/white
// Using a more condensed format: array of 16 strings, each 16 chars
const LOKI_FRAMES = (() => {
  // Palette mapping for Loki sprites (single char shortcuts)
  // b=black, w=white, t=tan/brown, n=nose, p=pink, T=transparent
  const lp = { T:null, b:'#111', w:'#f0e0d0', c:'#d0c0a0', n:'#2a1a0a', p:'#ffaaaa', r:'#cc3333', e:'#5b3a29' };
  const row = s => [...s].map(c=>lp[c]||null);
  // stand frame
  const stand = [
    row('TTTTTbbTTbbTTTTT'),
    row('TTTTbbwwbbwwbTTTT'),
    row('TTTbwwwwbbwwwwbTT'),
    row('TTbwwncwwwwncwwbT'),
    row('TTbwwwwwwwwwwwwbT'),
    row('TTbwwwwppwwwwwwbT'),
    row('TTTbbwwwwwwwwbbTT'),
    row('TTTbbbbbbbbbbbbTT'),
    row('TTbbbbwwwwwwbbbbT'),
    row('TTbwwbbwwwwbbwwbT'),
    row('TTbwwwbbbbbbwwwbT'),
    row('TTTbbbbwwwwbbbbTT'),
    row('TTTTbbwwwwwwbbTTT'),
    row('TTTTbwTTTTTTwbTTT'),
    row('TTTTbbTTTTTTbbTTT'),
    row('TTTTTTTTTTTTTTTTTT'),
  ];
  // run frames – offset legs each frame
  const run1 = stand.map((r,i)=>{
    if(i>=12&&i<=15) {
      const offsets = [
        row('TTTbwTTTTTwbTTTT'),
        row('TTTbbwTTTTwbbTTT'),
        row('TTTTbbTTTTbbTTTT'),
        row('TTTTTTTTTTTTTTTT'),
      ];
      return offsets[i-12];
    }
    return r;
  });
  const run2 = stand.map((r,i)=>{
    if(i>=12&&i<=15){
      const offsets=[
        row('TTTTTbwTTwbTTTTT'),
        row('TTTTbbwwwwbbTTTT'),
        row('TTTTTbbTTbbTTTTT'),
        row('TTTTTTTTTTTTTTTT'),
      ];
      return offsets[i-12];
    }
    return r;
  });
  // jump – body slightly compressed
  const jump = stand.slice(0,12).concat([
    row('TTTTbwwwwwwwbTTT'),
    row('TTTTTbwwwwwbTTTT'),
    row('TTTTTTbbbbbbTTTT'),
    row('TTTTTTTTTTTTTTTT'),
  ]);
  // duck – flatten
  const duck = [
    row('TTTTTTTTTTTTTTTT'),
    row('TTTTTTTTTTTTTTTT'),
    row('TTTTTTTTTTTTTTTT'),
    row('TTTTTTTTTTTTTTTT'),
    row('TTTbbbbbbbbbbTTT'),
    row('TTbbwwwwwwwwwbbT'),
    row('TTbwwncwwwwncwwb'),
    row('TTbwwwwwwwwwwwwb'),
    row('TTbwwwwppwwwwwwb'),
    row('TTTbbwwwwwwwwbbT'),
    row('TTTbbbbbbbbbbbbT'),
    row('TTbwTTbwwwbTTwbT'),
    row('TTbbTTbbbbbbTbbT'),
    row('TTTTTTTTTTTTTTTT'),
    row('TTTTTTTTTTTTTTTT'),
    row('TTTTTTTTTTTTTTTT'),
  ];
  return [stand, run1, run2, run1, duck, jump];
})();

// Sabbath - Belgian Malinois: tan body, black saddle/muzzle
const SABBATH_FRAMES = (() => {
  const sp = { T:null, t:'#d4956a', b:'#111', k:'#2a1a0a', d:'#8B4513', n:'#1a0a00', p:'#ffaaaa', s:'#9b7040' };
  const row = s => [...s].map(c=>sp[c]||null);
  const stand = [
    row('TTTTTbbTTbbTTTTT'),
    row('TTTTbttbbttbTTTT'),
    row('TTTbtttbbbtttbTT'),
    row('TTbtttkttttkttbT'),
    row('TTbttttttttttttb'),
    row('TTbttttdddtttttb'),
    row('TTTbbttttttttbbT'),
    row('TTTbbbbbbbbbbbbT'),
    row('TTbbbbtttttttbbbT'),
    row('TTbtdbbtttttbbtbT'),
    row('TTbttdbbbbbdbttbT'),
    row('TTTbbbbttttbbbbT'),
    row('TTTTbbtttttbbTTT'),
    row('TTTTbtTTTTTtbTTT'),
    row('TTTTbbTTTTTbbTTT'),
    row('TTTTTTTTTTTTTTTT'),
  ];
  const run1 = stand.map((r,i)=>{
    if(i>=12&&i<=15){
      const o=[row('TTTTbtTTTTtbTTTT'),row('TTTTbbtTTtbbTTTT'),row('TTTTTbbTTbbTTTTT'),row('TTTTTTTTTTTTTTTT')];
      return o[i-12];
    }return r;
  });
  const run2 = stand.map((r,i)=>{
    if(i>=12&&i<=15){
      const o=[row('TTTTTbtTtbTTTTTT'),row('TTTTbbttttbbTTTT'),row('TTTTTbbTTbbTTTTT'),row('TTTTTTTTTTTTTTTT')];
      return o[i-12];
    }return r;
  });
  const jump = stand.slice(0,12).concat([row('TTTTbtttttttbTTT'),row('TTTTTbttttttbTTT'),row('TTTTTTbbbbbbTTTT'),row('TTTTTTTTTTTTTTTT')]);
  const duck = [
    row('TTTTTTTTTTTTTTTT'),row('TTTTTTTTTTTTTTTT'),row('TTTTTTTTTTTTTTTT'),row('TTTTTTTTTTTTTTTT'),
    row('TTTbbbbbbbbbbTTT'),row('TTbbtttttttttbbT'),row('TTbttkttttttkttb'),row('TTbtttttttttttbT'),
    row('TTbtttdddtttttbT'),row('TTTbbttttttttbbT'),row('TTTbbbbbbbbbbbTT'),row('TTbtTTbttttbTTbT'),
    row('TTbbTTbbbbbbbTTT'),row('TTTTTTTTTTTTTTTT'),row('TTTTTTTTTTTTTTTT'),row('TTTTTTTTTTTTTTTT'),
  ];
  const dash = stand.map((r,i)=> i<8 ? [...r] : r);
  return [stand, run1, run2, run1, duck, jump, dash];
})();

// Stone wall obstacle 24×20
const OBS_WALL = (() => {
  const p={T:null,g:'#888',l:'#bbb',d:'#555',m:'#999'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('TTggggggggggggggggggggggTT').slice(0,24),
    r('Tggllllllgggggllllgggllllg').slice(0,24),
    r('Tgglgggggggggglggggggglggg').slice(0,24),
    r('Tggllllgggggggllllggggllll').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
    r('glllllllggggglllllllgglllg').slice(0,24),
    r('gggggggggggggggggggggggggg').slice(0,24),
    r('glllllgggggggllllllggglllg').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
    r('glllllllggggglllllllgglllg').slice(0,24),
    r('gggggggggggggggggggggggggg').slice(0,24),
    r('gllllllgggggglllllggggllll').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
    r('glllllllggggglllllllgglllg').slice(0,24),
    r('gggggggggggggggggggggggggg').slice(0,24),
    r('gllllllgggggglllllggggllll').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
    r('glllllllggggglllllllgglllg').slice(0,24),
    r('gggggggggggggggggggggggggg').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
  ];
})();

// Hay bale 18×18
const OBS_HAY = (() => {
  const p={T:null,y:'#e8c840',d:'#a88020',l:'#f5e070',b:'#8B6010'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('TTTTTyyyyyyyyTTTTT').slice(0,18),
    r('TTTyyyyyyyyyyyyyTT').slice(0,18),
    r('TTyyllllllllllyyyT').slice(0,18),
    r('Tyylllllllllllllyt').slice(0,18),
    r('Tyllllllllllllllyt').slice(0,18),
    r('bbbbbbbbbbbbbbbbbb').slice(0,18),
    r('Tyllllllllllllllyt').slice(0,18),
    r('Tyllllllllllllllyt').slice(0,18),
    r('bbbbbbbbbbbbbbbbbb').slice(0,18),
    r('Tyllllllllllllllyt').slice(0,18),
    r('Tyllllllllllllllyt').slice(0,18),
    r('bbbbbbbbbbbbbbbbbb').slice(0,18),
    r('Tyllllllllllllllyt').slice(0,18),
    r('Tyylllllllllllllyt').slice(0,18),
    r('TTyyylllllllllyyyT').slice(0,18),
    r('TTTyyyyyyyyyyyyyTT').slice(0,18),
    r('TTTTTyyyyyyyTTTTTT').slice(0,18),
    r('TTTTTTTTTTTTTTTTTT').slice(0,18),
  ];
})();

// Puddle 32×8
const OBS_PUDDLE = (() => {
  const p={T:null,b:'#1a3a6e',l:'#4a7aae',w:'#8ab8d8',d:'#0a1a3e'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('TTTTbbbbbbbbbbbbbbbbbbbbbbbbTTTT').slice(0,32),
    r('TTbbllllllllllllllllllllllllbbTT').slice(0,32),
    r('TbblwwwwwwwwwwwwwwwwwwwwwwwlbbT').slice(0,32),
    r('TbbllllllllllllllllllllllllllbbT').slice(0,32),
    r('TbblllwwwwwwwwwwwwwwwwwwlllllbT').slice(0,32),
    r('TTbbllllllllllllllllllllllllbbTT').slice(0,32),
    r('TTTbbbbbbbbbbbbbbbbbbbbbbbbbbTTT').slice(0,32),
    r('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT').slice(0,32),
  ];
})();

// Fence 24×20
const OBS_FENCE = (() => {
  const p={T:null,b:'#5c3a1a',l:'#a06030',d:'#3a2010'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('llllllllllllllllllllllllll').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('llllllllllllllllllllllllll').slice(0,24),
    r('dddddddddddddddddddddddddd').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
    r('TTbTTTTTTTTTTTTTTTTTTTbTT').slice(0,24),
  ];
})();

// Sheep 16×14 (2 frames)
const OBS_SHEEP_FRAMES = (() => {
  const p={T:null,w:'#f0ede8',l:'#d8d4cc',b:'#111',g:'#666',p:'#ffaaaa'};
  const r=s=>[...s].map(c=>p[c]||null);
  const f1=[
    r('TTTwwwwwwwwwTTTT').slice(0,16),
    r('TTwwllllllllwwTTT').slice(0,16),
    r('Twwllllllllllwwbb').slice(0,16),
    r('Twllllllllllllwbg').slice(0,16),
    r('Twllllbbgllllwbgb').slice(0,16),
    r('Twlllbwwgllllwbgb').slice(0,16),
    r('Twllllbpgllllwbgb').slice(0,16),
    r('Twwllllllllllwwbb').slice(0,16),
    r('TTwwwwwwwwwwwwTTT').slice(0,16),
    r('TTTTbTTbTbTTbTTTT').slice(0,16),
    r('TTTTbTTbTbTTbTTTT').slice(0,16),
    r('TTTTbbTbbbbTbbTTT').slice(0,16),
    r('TTTTTTTTTTTTTTTT').slice(0,16),
    r('TTTTTTTTTTTTTTTT').slice(0,16),
  ];
  const f2=f1.map((r,i)=>{
    if(i>=9&&i<=11){
      const o=[r('TTTTbTbTTTbTbTTT').slice(0,16),r('TTTbTbbTTTbbTbTT').slice(0,16),r('TTTbbbbTTTbbbbTT').slice(0,16)];
      return o[i-9];
    }
    return r;
  });
  return [f1,f2];
})();

// Crow 14×10 (2 frames - wings up/down)
const OBS_CROW_FRAMES = (() => {
  const p={T:null,b:'#111',g:'#333',y:'#e8c840'};
  const r=s=>[...s].map(c=>p[c]||null);
  const f1=[
    r('TTbbbbTTbbbbTT').slice(0,14),
    r('TbggggbTbggggb').slice(0,14),
    r('bbggggbbbbggggb').slice(0,14),
    r('TbgggbbgbbgggbT').slice(0,14),
    r('TTbbggggggggbbT').slice(0,14),
    r('TTTbggggggggbTT').slice(0,14),
    r('TTTTbbbbgbbbTTT').slice(0,14),
    r('TTTTTTbybTTTTTT').slice(0,14),
    r('TTTTTTbbTTTTTTT').slice(0,14),
    r('TTTTTTTTTTTTTT').slice(0,14),
  ];
  const f2=[
    r('TTTTTTTTTTTTTT').slice(0,14),
    r('TTTTTTTTTTTTTT').slice(0,14),
    r('TTbbbbTTbbbbTTT').slice(0,14),
    r('Tbggggbbgggggb').slice(0,14),
    r('bbgggbbgbbgggbb').slice(0,14),
    r('TbbgggggggggbbT').slice(0,14),
    r('TTTbgggggggbTTT').slice(0,14),
    r('TTTTbbbbybbbTTT').slice(0,14),
    r('TTTTTTbbTTTTTTT').slice(0,14),
    r('TTTTTTTTTTTTTT').slice(0,14),
  ];
  return [f1,f2];
})();

// Power-up sprites 12×12
const PU_BONE = (() => {
  const p={T:null,w:'#f0e6d3',g:'#ccc',b:'#111'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('bwwbTTTTbwwb').slice(0,12),
    r('wggwTTTTwggw').slice(0,12),
    r('bwwbbbbbbwwb').slice(0,12),
    r('TTbwwwwwwbTT').slice(0,12),
    r('TTbwwwwwwbTT').slice(0,12),
    r('TTbwwwwwwbTT').slice(0,12),
    r('TTbwwwwwwbTT').slice(0,12),
    r('TTbwwwwwwbTT').slice(0,12),
    r('TTbwwwwwwbTT').slice(0,12),
    r('bwwbbbbbbwwb').slice(0,12),
    r('wggwTTTTwggw').slice(0,12),
    r('bwwbTTTTbwwb').slice(0,12),
  ];
})();

const PU_BALL = (() => {
  const p={T:null,y:'#c8e830',l:'#e0f860',d:'#90b000',w:'#ffffff',b:'#111'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('TTTbbbbbbbTTT').slice(0,12),
    r('TTbyyyyyybTTT').slice(0,12),
    r('TbyllllllyybT').slice(0,12),
    r('byylllwwlllyb').slice(0,12),
    r('byyllwwwwllyb').slice(0,12),
    r('bylllwwwwlllyb').slice(0,12),
    r('byylllllllllyb').slice(0,12),
    r('byyllllllllyb').slice(0,12),
    r('TbyllllllybTT').slice(0,12),
    r('TbyyyyyyyybTT').slice(0,12),
    r('TTbbbbbbbbTTT').slice(0,12),
    r('TTTTTTTTTTTT').slice(0,12),
  ];
})();

const PU_TREAT = (() => {
  const p={T:null,b:'#5c3010',l:'#a06828',d:'#3a1a00',y:'#f7e96b'};
  const r=s=>[...s].map(c=>p[c]||null);
  return [
    r('TTbbbTTTbbbTT').slice(0,12),
    r('TblllbTblllbT').slice(0,12),
    r('TTbbbbbbbbbTT').slice(0,12),
    r('TTTblllllbTTT').slice(0,12),
    r('TTbblllllbbTT').slice(0,12),
    r('TTbblllllbbTT').slice(0,12),
    r('TTbblllllbbTT').slice(0,12),
    r('TTTblllllbTTT').slice(0,12),
    r('TTbbbbbbbbbTT').slice(0,12),
    r('TblllbTblllbT').slice(0,12),
    r('TTbbbTTTbbbTT').slice(0,12),
    r('TTTTTTTTTTTT').slice(0,12),
  ];
})();

// ── 3. RENDERER ──────────────────────────────────────────────
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

function drawSpriteRaw(targetCtx, sprite, x, y, scale) {
  for (let row = 0; row < sprite.length; row++) {
    for (let col = 0; col < sprite[row].length; col++) {
      const color = sprite[row][col];
      if (!color) continue;
      targetCtx.fillStyle = color;
      targetCtx.fillRect(
        Math.floor(x + col * scale),
        Math.floor(y + row * scale),
        scale, scale
      );
    }
  }
}

function preRender(sprite, scale) {
  const w = sprite[0].length * scale;
  const h = sprite.length * scale;
  const oc = document.createElement('canvas');
  oc.width = w; oc.height = h;
  const octx = oc.getContext('2d');
  octx.imageSmoothingEnabled = false;
  drawSpriteRaw(octx, sprite, 0, 0, scale);
  return oc;
}

// Pre-render all sprites into cache at init time
const SC = {}; // sprite cache
function buildSpriteCache() {
  const S = CFG.SPRITE_SCALE;
  SC.loki    = LOKI_FRAMES.map(f => preRender(f, S));     // [stand,run1,run2,run3,duck,jump]
  SC.sabbath = SABBATH_FRAMES.map(f => preRender(f, S));  // [stand,run1,run2,run3,duck,jump,dash]
  SC.sheep   = OBS_SHEEP_FRAMES.map(f => preRender(f, S));
  SC.crow    = OBS_CROW_FRAMES.map(f => preRender(f, S));
  SC.wall    = preRender(OBS_WALL,   S);
  SC.hay     = preRender(OBS_HAY,    S);
  SC.puddle  = preRender(OBS_PUDDLE, S);
  SC.fence   = preRender(OBS_FENCE,  S);
  SC.bone    = preRender(PU_BONE,    S);
  SC.ball    = preRender(PU_BALL,    S);
  SC.treat   = preRender(PU_TREAT,   S);
}

// Draw portrait canvases on start screen
function drawPortraits() {
  document.querySelectorAll('.portrait-canvas').forEach(pc => {
    const name = pc.dataset.sprite;
    const pctx = pc.getContext('2d');
    pctx.imageSmoothingEnabled = false;
    const frames = name === 'loki' ? LOKI_FRAMES : SABBATH_FRAMES;
    drawSpriteRaw(pctx, frames[0], 0, 0, 3);
  });
}

// ── 4. INPUT ─────────────────────────────────────────────────
const keys = { jump: false, duck: false, ability: false };
let jumpPressed = false, duckPressed = false, abilityPressed = false;

document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    if (!jumpPressed) { jumpPressed = true; keys.jump = true; }
    e.preventDefault();
  }
  if (e.code === 'ArrowDown') { duckPressed = true; keys.duck = true; e.preventDefault(); }
  if (e.code === 'ShiftLeft' || e.code === 'KeyZ') { abilityPressed = true; keys.ability = true; }
});
document.addEventListener('keyup', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') { jumpPressed = false; keys.jump = false; }
  if (e.code === 'ArrowDown') { duckPressed = false; keys.duck = false; }
  if (e.code === 'ShiftLeft' || e.code === 'KeyZ') { abilityPressed = false; keys.ability = false; }
});

let touchStartY = 0, touchStartX = 0;
canvas.addEventListener('touchstart', e => {
  if (gameState !== 'playing') return;
  e.preventDefault();
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
  keys.jump = true; jumpPressed = true;
}, { passive: false });
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const dy = e.touches[0].clientY - touchStartY;
  const dx = e.touches[0].clientX - touchStartX;
  if (dy > 30)  { keys.duck = true; duckPressed = true; }
  if (dx > 50)  { keys.ability = true; abilityPressed = true; }
}, { passive: false });
canvas.addEventListener('touchend', () => {
  keys.jump = false; jumpPressed = false;
  keys.duck = false; duckPressed = false;
  keys.ability = false; abilityPressed = false;
});

// ── 5. CANVAS SCALING ────────────────────────────────────────
function resizeCanvas() {
  const scaleX = window.innerWidth  / CFG.W;
  const scaleY = (window.innerHeight - 30) / CFG.H;
  const scale  = Math.min(scaleX, scaleY);
  const w = Math.floor(CFG.W * scale);
  const h = Math.floor(CFG.H * scale);
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';
  // Scale HUD overlay to match
  const gameScreenEl = document.getElementById('gameScreen');
  gameScreenEl.style.width  = w + 'px';
  gameScreenEl.style.height = h + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ── 6. COLOR UTILITIES ───────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
}
function rgbToHex(r,g,b) {
  return '#' + [r,g,b].map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('');
}
function lerpColor(c1, c2, t) {
  const [r1,g1,b1]=hexToRgb(c1), [r2,g2,b2]=hexToRgb(c2);
  return rgbToHex(r1+(r2-r1)*t, g1+(g2-g1)*t, b1+(b2-b1)*t);
}

// ── 7. DAY/NIGHT CYCLE ───────────────────────────────────────
const SKY_PHASES = [
  { sky:'#87CEEB', horizon:'#b8dfff', ground:'#4a9e2e', groundDark:'#2d5a16', sunColor:'#FFD700', sunY:40,  moonPhase:false },
  { sky:'#e8822a', horizon:'#f5c842', ground:'#5a8e1e', groundDark:'#3a6010', sunColor:'#ff8C00', sunY:55,  moonPhase:false },
  { sky:'#4a3060', horizon:'#9a5060', ground:'#2a4a10', groundDark:'#1a2a08', sunColor:'#e06030', sunY:70,  moonPhase:false },
  { sky:'#080818', horizon:'#141428', ground:'#1a2a0a', groundDark:'#0a1406', sunColor:null,       sunY:35,  moonPhase:true  },
];

let skyColors = { ...SKY_PHASES[0] };
let stars = [];
for (let i=0;i<60;i++) stars.push({ x:Math.random()*CFG.W, y:Math.random()*100, size:Math.random()<0.3?2:1 });

function updateSkyColors(score) {
  const cycle = score % 4000;
  const phase = Math.floor(cycle / 1000);
  const t = (cycle % 1000) / 1000;
  const a = SKY_PHASES[phase];
  const b = SKY_PHASES[(phase+1)%4];
  skyColors.sky      = lerpColor(a.sky,      b.sky,      t);
  skyColors.horizon  = lerpColor(a.horizon,  b.horizon,  t);
  skyColors.ground   = lerpColor(a.ground,   b.ground,   t);
  skyColors.groundDark = lerpColor(a.groundDark, b.groundDark, t);
  skyColors.sunY     = a.sunY + (b.sunY - a.sunY)*t;
  skyColors.starOpacity = phase===3 ? t : (phase===2 ? t*0.5 : 0);
  skyColors.moonPhase = phase===3 || (phase===2 && t>0.5);
  // sun color
  if (a.sunColor && b.sunColor) skyColors.sunColor = lerpColor(a.sunColor,b.sunColor,t);
  else if (!a.sunColor) skyColors.sunColor = null;
  else skyColors.sunColor = a.sunColor;
}

// ── 8. PARALLAX BACKGROUND ───────────────────────────────────
class ParallaxLayer {
  constructor(speedFactor, drawFn, tileW) {
    this.speedFactor = speedFactor;
    this.drawFn = drawFn;
    this.tileW = tileW;
    this.x = 0;
  }
  update(dt, gameSpeed) {
    this.x -= gameSpeed * this.speedFactor * dt;
    this.x = ((this.x % this.tileW) + this.tileW) % this.tileW;
  }
  render(ctx) {
    this.drawFn(ctx, -this.x);
    this.drawFn(ctx, -this.x + this.tileW);
  }
}

// Layer 1: distant hills
function drawHills(ctx, ox) {
  ctx.fillStyle = '#3d7a25';
  ctx.beginPath();
  ctx.moveTo(ox, CFG.GROUND_Y);
  const pts = [0,40,70,20,130,55,190,15,260,50,320,25,390,60,440,20,480,45,480,CFG.GROUND_Y];
  for(let i=0;i<pts.length;i+=2) ctx.lineTo(ox+pts[i],pts[i+1]+120);
  ctx.closePath(); ctx.fill();
}
// Layer 2: mid hedges/trees
function drawHedges(ctx, ox) {
  ctx.fillStyle = '#2a6018';
  const positions = [20,40,100,35,200,45,310,38,400,42];
  for(let i=0;i<positions.length;i+=2){
    const hx=ox+positions[i], hy=CFG.GROUND_Y-positions[i+1];
    const w=30+((i/2)*7)%20, h=positions[i+1];
    ctx.fillRect(hx,hy,w,h);
    ctx.beginPath();
    ctx.arc(hx+w/2, hy+2, w/2+4, Math.PI, 0);
    ctx.fill();
  }
}
// Layer 3: ground with fence posts
const hillLayer  = new ParallaxLayer(0.08, drawHills,  480);
const hedgeLayer = new ParallaxLayer(0.25, drawHedges, 480);

// ── 9. PARTICLE SYSTEM ───────────────────────────────────────
const particles = [];
class Particle {
  constructor(x,y,color,vx,vy,life) {
    this.x=x; this.y=y; this.color=color; this.vx=vx; this.vy=vy;
    this.life=life; this.maxLife=life; this.size=3;
  }
  update(dt) {
    this.x+=this.vx*dt; this.y+=this.vy*dt;
    this.vy+=200*dt; // gravity on particles
    this.life-=dt;
  }
  render(ctx) {
    ctx.globalAlpha = Math.max(0, this.life/this.maxLife);
    ctx.fillStyle = this.color;
    ctx.fillRect(Math.floor(this.x),Math.floor(this.y),this.size,this.size);
    ctx.globalAlpha = 1;
  }
  isDead() { return this.life <= 0; }
}

function spawnParticles(x, y, colors, count=8) {
  for(let i=0;i<count;i++){
    const angle=Math.random()*Math.PI*2;
    const speed=60+Math.random()*120;
    particles.push(new Particle(x,y,colors[i%colors.length],Math.cos(angle)*speed,Math.sin(angle)*speed-100,0.4+Math.random()*0.3));
  }
}

// ── 10. ENTITIES ─────────────────────────────────────────────
class Player {
  constructor(charType) {
    this.charType = charType; // 'loki' | 'sabbath'
    this.x = CFG.PLAYER_X;
    this.y = CFG.GROUND_Y - 48; // sprite height = 16*3
    this.vy = 0;
    this.isGrounded = true;
    this.isDucking = false;
    this.isDashing = false;
    this.dashTimer = 0;
    this.jumpCount = 0;
    this.lives = 3;
    this.shield = false;
    this.invincible = false;
    this.invincTimer = 0;
    this.activePowerUp = null;
    this.powerUpTimer = 0;
    this.hurtFlash = 0;
    this.dashCooldown = 0;

    // Animation
    this.animFrame = 0;
    this.animTimer = 0;
    this.frameSeq = [1,2,3,2]; // run cycle indices into sprite array
    this.frameIdx = 0;

    // Tint for invincibility rainbow
    this.tintHue = 0;
  }

  getSprite() {
    const frames = this.charType === 'loki' ? SC.loki : SC.sabbath;
    if (this.isDashing) return frames[6] || frames[1];
    if (this.isDucking) return frames[4];
    if (!this.isGrounded) return frames[5];
    // Run cycle
    return frames[this.frameSeq[this.frameIdx]];
  }

  getHitbox() {
    if (this.isDucking) {
      return { x: this.x+6, y: this.y+24, w: 36, h: 20 };
    }
    return { x: this.x+6, y: this.y+4, w: 34, h: 42 };
  }

  jump() {
    if (this.charType === 'loki') {
      if (this.jumpCount < 2) {
        this.vy = CFG.JUMP_VEL;
        this.isGrounded = false;
        this.jumpCount++;
        if (this.jumpCount === 2) {
          spawnParticles(this.x+24, this.y+48, ['#fff','#aef','#88f'], 6);
        }
      }
    } else {
      if (this.isGrounded) {
        this.vy = CFG.JUMP_VEL;
        this.isGrounded = false;
        this.jumpCount = 1;
      }
    }
  }

  useAbility() {
    if (this.charType === 'sabbath' && this.isGrounded && this.dashCooldown <= 0) {
      this.isDashing = true;
      this.dashTimer = 0.35;
      this.dashCooldown = 1.5;
      spawnParticles(this.x, this.y+24, ['#d4956a','#fff','#f7e96b'], 10);
    }
  }

  applyPowerUp(type) {
    this.activePowerUp = type;
    this.powerUpTimer = 5;
    if (type === 'treat') { this.shield = true; this.activePowerUp = null; this.powerUpTimer = 0; }
    if (type === 'ball')  { this.invincible = true; }
    spawnParticles(this.x+24, this.y+20, ['#f7e96b','#4a76ee','#fff'], 12);
  }

  update(dt) {
    // Power-up timers
    if (this.activePowerUp && this.powerUpTimer > 0) {
      this.powerUpTimer -= dt;
      if (this.powerUpTimer <= 0) {
        if (this.activePowerUp === 'ball') this.invincible = false;
        this.activePowerUp = null;
      }
    }
    if (this.invincTimer > 0) { this.invincTimer -= dt; if(this.invincTimer<=0) this.invincible=false; }
    if (this.dashCooldown > 0) this.dashCooldown -= dt;
    if (this.hurtFlash > 0) this.hurtFlash -= dt;

    // Dash
    if (this.isDashing) {
      this.dashTimer -= dt;
      if (this.dashTimer <= 0) this.isDashing = false;
    }

    // Duck
    this.isDucking = keys.duck && this.isGrounded;

    // Input: jump
    if (keys.jump) {
      this.jump();
      keys.jump = false;
    }
    // Input: ability
    if (keys.ability) {
      this.useAbility();
      keys.ability = false;
    }

    // Gravity
    if (!this.isGrounded) {
      this.vy += CFG.GRAVITY * dt;
      this.y += this.vy * dt;
    }

    // Ground collision
    const groundTop = CFG.GROUND_Y - 48;
    if (this.y >= groundTop) {
      this.y = groundTop;
      this.vy = 0;
      this.isGrounded = true;
      this.jumpCount = 0;
    }

    // Animation
    this.animTimer += dt;
    if (this.animTimer >= 1/CFG.ANIM_FPS) {
      this.animTimer = 0;
      if (this.isGrounded && !this.isDucking) {
        this.frameIdx = (this.frameIdx+1) % this.frameSeq.length;
      }
    }

    // Rainbow tint for invincibility
    if (this.invincible) this.tintHue = (this.tintHue+360*dt*2)%360;
  }

  render(ctx) {
    const sprite = this.getSprite();
    if (!sprite) return;

    ctx.save();
    if (this.hurtFlash > 0 && Math.floor(this.hurtFlash*10)%2===0) {
      ctx.globalAlpha = 0.4;
    }
    if (this.invincible) {
      ctx.filter = `hue-rotate(${Math.floor(this.tintHue)}deg) saturate(2)`;
    }
    ctx.drawImage(sprite, Math.floor(this.x), Math.floor(this.y));
    ctx.restore();

    // Shield indicator
    if (this.shield) {
      ctx.save();
      ctx.strokeStyle = '#4a76ee';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(this.x+24, this.y+24, 30, 32, 0, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();
    }
  }

  takeDamage() {
    if (this.invincible || this.isDashing) return false;
    if (this.shield) { this.shield = false; this.hurtFlash = 1.0; return false; }
    this.lives--;
    this.hurtFlash = 1.5;
    this.invincible = true;
    this.invincTimer = 2.0; // brief post-hit invincibility
    spawnParticles(this.x+24, this.y+24, ['#ff5555','#ff8888','#fff'], 10);
    return true; // life lost
  }
}

// ── OBSTACLE ─────────────────────────────────────────────────
class Obstacle {
  constructor(type, gameSpeed) {
    this.type = type;
    this.animFrame = 0;
    this.animTimer = 0;
    this.speed = gameSpeed;

    switch(type) {
      case 'wall':
        this.w = 24*CFG.SPRITE_SCALE; this.h = 20*CFG.SPRITE_SCALE;
        this.y = CFG.GROUND_Y - this.h;
        break;
      case 'hay':
        this.w = 18*CFG.SPRITE_SCALE; this.h = 18*CFG.SPRITE_SCALE;
        this.y = CFG.GROUND_Y - this.h;
        break;
      case 'puddle':
        this.w = 32*CFG.SPRITE_SCALE; this.h = 8*CFG.SPRITE_SCALE;
        this.y = CFG.GROUND_Y - this.h;
        break;
      case 'sheep':
        this.w = 16*CFG.SPRITE_SCALE; this.h = 14*CFG.SPRITE_SCALE;
        this.y = CFG.GROUND_Y - this.h;
        this.selfSpeed = gameSpeed * 0.4; // moves toward player
        break;
      case 'fence':
        this.w = 24*CFG.SPRITE_SCALE; this.h = 20*CFG.SPRITE_SCALE;
        this.y = CFG.GROUND_Y - this.h;
        break;
      case 'crow':
        this.w = 14*CFG.SPRITE_SCALE; this.h = 10*CFG.SPRITE_SCALE;
        this.y = CFG.GROUND_Y - 80; // mid-air
        break;
    }
    this.x = CFG.W + 20;
  }

  getHitbox() {
    return { x:this.x+3, y:this.y+3, w:this.w-6, h:this.h-6 };
  }

  update(dt, gameSpeed) {
    this.x -= gameSpeed * dt;
    if (this.type === 'sheep') this.x -= this.selfSpeed * dt * 0.3; // extra drift
    this.animTimer += dt;
    if (this.animTimer >= 0.2) { this.animTimer=0; this.animFrame^=1; }
  }

  render(ctx) {
    switch(this.type) {
      case 'wall':   ctx.drawImage(SC.wall,  Math.floor(this.x), Math.floor(this.y)); break;
      case 'hay':    ctx.drawImage(SC.hay,   Math.floor(this.x), Math.floor(this.y)); break;
      case 'puddle': ctx.drawImage(SC.puddle,Math.floor(this.x), Math.floor(this.y)); break;
      case 'sheep':  ctx.drawImage(SC.sheep[this.animFrame], Math.floor(this.x), Math.floor(this.y)); break;
      case 'fence':  ctx.drawImage(SC.fence, Math.floor(this.x), Math.floor(this.y)); break;
      case 'crow':   ctx.drawImage(SC.crow[this.animFrame],  Math.floor(this.x), Math.floor(this.y)); break;
    }
  }

  isOffScreen() { return this.x + this.w < -20; }
}

// ── POWER-UP ─────────────────────────────────────────────────
class PowerUp {
  constructor(type) {
    this.type = type;
    this.x = CFG.W + 20;
    this.y = CFG.GROUND_Y - 60;
    this.w = 12*CFG.SPRITE_SCALE; this.h = 12*CFG.SPRITE_SCALE;
    this.bobOffset = 0;
    this.bobTimer = Math.random()*Math.PI*2;
  }

  getHitbox() { return { x:this.x+2, y:this.y+2+this.bobOffset, w:this.w-4, h:this.h-4 }; }

  update(dt, gameSpeed) {
    this.x -= gameSpeed * dt;
    this.bobTimer += dt * 3;
    this.bobOffset = Math.sin(this.bobTimer) * 5;
  }

  render(ctx) {
    const sprite = this.type==='bone' ? SC.bone : this.type==='ball' ? SC.ball : SC.treat;
    ctx.drawImage(sprite, Math.floor(this.x), Math.floor(this.y + this.bobOffset));
    // Glow effect
    ctx.save();
    ctx.globalAlpha = 0.25 + 0.15*Math.sin(this.bobTimer*2);
    ctx.fillStyle = this.type==='bone'?'#fff':this.type==='ball'?'#c8e830':'#f7e96b';
    ctx.beginPath();
    ctx.ellipse(this.x+this.w/2, this.y+this.h/2+this.bobOffset, this.w/2+4, this.h/2+4, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  isOffScreen() { return this.x + this.w < -20; }
}

// ── 11. SPAWNER ──────────────────────────────────────────────
let spawnTimer = 0;
let puSpawnTimer = 0;
const obstacles = [];
const powerUps  = [];

const OBS_TYPES   = ['wall','hay','puddle','sheep','fence','crow'];
const OBS_WEIGHTS = [  0.25, 0.20, 0.15,   0.15,  0.15,  0.10 ];
const PU_TYPES    = ['bone','ball','treat'];

function weightedRandom(weights) {
  let r = Math.random(), cum = 0;
  for(let i=0;i<weights.length;i++) { cum+=weights[i]; if(r<=cum) return i; }
  return weights.length-1;
}

function spawnObstacle(gameSpeed) {
  const idx  = weightedRandom(OBS_WEIGHTS);
  const type = OBS_TYPES[idx];
  // avoid spawning crow and wall together when player must be grounded
  obstacles.push(new Obstacle(type, gameSpeed));
}

function updateSpawner(dt, gameSpeed) {
  spawnTimer -= dt;
  puSpawnTimer -= dt;

  const minGap = Math.max(0.9, 2.2 - gameSpeed*0.002);
  if (spawnTimer <= 0) {
    spawnObstacle(gameSpeed);
    spawnTimer = minGap + Math.random()*1.2;
  }
  if (puSpawnTimer <= 0) {
    const idx = Math.floor(Math.random()*PU_TYPES.length);
    powerUps.push(new PowerUp(PU_TYPES[idx]));
    puSpawnTimer = 6 + Math.random()*6;
  }
}

// ── 12. COLLISION ────────────────────────────────────────────
function aabb(a, b) {
  return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
}

// ── 13. HUD ──────────────────────────────────────────────────
const scoreValEl     = document.getElementById('scoreVal');
const highScoreValEl = document.getElementById('highScoreVal');
const livesEl        = document.getElementById('lives-display');
const powerupEl      = document.getElementById('powerup-display');
const speedupFlash   = document.getElementById('speedup-flash');

const PU_ICONS = { bone:'🦴', ball:'🎾', treat:'🍖' };

function updateHUD(player, score, highScore) {
  scoreValEl.textContent     = String(Math.floor(score)).padStart(6,'0');
  highScoreValEl.textContent = String(Math.floor(highScore)).padStart(6,'0');
  livesEl.textContent = '♥'.repeat(Math.max(0,player.lives)) + '♡'.repeat(Math.max(0,3-player.lives));
  if (player.activePowerUp) {
    powerupEl.textContent = PU_ICONS[player.activePowerUp] + ' ' + Math.ceil(player.powerUpTimer) + 's';
  } else if (player.shield) {
    powerupEl.textContent = '🛡 SHIELD';
  } else {
    powerupEl.textContent = '';
  }
}

let speedupFlashTimer = 0;
function triggerSpeedUpFlash() {
  speedupFlash.classList.remove('hidden');
  speedupFlashTimer = 0.8;
}
function updateSpeedupFlash(dt) {
  if (speedupFlashTimer > 0) {
    speedupFlashTimer -= dt;
    if (speedupFlashTimer <= 0) speedupFlash.classList.add('hidden');
  }
}

// ── 14. GAME STATE MACHINE ───────────────────────────────────
let gameState = 'start'; // 'start' | 'playing' | 'gameover'
let player = null;
let score = 0;
let highScore = 0;
let gameSpeed = CFG.SPEED_INIT;
let lastSpeedMilestone = 0;
let selectedChar = null;
let multiplier = 1;

try {
  highScore = parseInt(localStorage.getItem('pawsAndPasturesHighScore') || '0', 10);
  if (isNaN(highScore)) highScore = 0;
} catch(e) { highScore = 0; }

function saveHighScore() {
  try { localStorage.setItem('pawsAndPasturesHighScore', String(Math.floor(highScore))); } catch(e){}
}

function startGame(charType) {
  selectedChar = charType;
  player = new Player(charType);
  score = 0;
  gameSpeed = CFG.SPEED_INIT;
  lastSpeedMilestone = 0;
  multiplier = 1;
  spawnTimer = 2.0;
  puSpawnTimer = 5.0;
  obstacles.length = 0;
  powerUps.length = 0;
  particles.length = 0;
  hillLayer.x = 0; hedgeLayer.x = 0;
  gameState = 'playing';
  showScreen('gameScreen');
}

function triggerGameOver() {
  gameState = 'gameover';
  const isNew = score > highScore;
  if (isNew) { highScore = score; saveHighScore(); }
  document.getElementById('finalScore').textContent = String(Math.floor(score)).padStart(6,'0');
  document.getElementById('finalBest').textContent  = String(Math.floor(highScore)).padStart(6,'0');
  const newHighMsg = document.getElementById('newHighMsg');
  if (isNew) newHighMsg.classList.remove('hidden');
  else       newHighMsg.classList.add('hidden');
  showScreen('gameOverScreen');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── 15. RENDERING ────────────────────────────────────────────
function renderBackground(ctx, score) {
  // Sky gradient
  const grad = ctx.createLinearGradient(0,0,0,CFG.GROUND_Y);
  grad.addColorStop(0, skyColors.sky);
  grad.addColorStop(1, skyColors.horizon);
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,CFG.W,CFG.GROUND_Y);

  // Sun or Moon
  if (skyColors.sunColor) {
    ctx.save();
    ctx.fillStyle = skyColors.sunColor;
    ctx.beginPath();
    ctx.arc(CFG.W-50, skyColors.sunY, 14, 0, Math.PI*2);
    ctx.fill();
    // glow
    ctx.globalAlpha=0.25;
    ctx.beginPath();
    ctx.arc(CFG.W-50, skyColors.sunY, 22, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
  if (skyColors.moonPhase) {
    ctx.save();
    ctx.fillStyle = '#e8e0d0';
    ctx.beginPath();
    ctx.arc(CFG.W-60, 30, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = skyColors.sky;
    ctx.beginPath();
    ctx.arc(CFG.W-54, 28, 9, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  // Stars
  if (skyColors.starOpacity > 0) {
    ctx.save();
    ctx.globalAlpha = skyColors.starOpacity;
    ctx.fillStyle = '#ffffff';
    for (const star of stars) {
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    ctx.restore();
  }

  // Clouds (simple procedural)
  drawClouds(ctx);

  // Parallax layers
  hillLayer.render(ctx);
  hedgeLayer.render(ctx);

  // Ground strip
  ctx.fillStyle = skyColors.ground;
  ctx.fillRect(0, CFG.GROUND_Y, CFG.W, CFG.H - CFG.GROUND_Y);
  ctx.fillStyle = skyColors.groundDark;
  ctx.fillRect(0, CFG.GROUND_Y, CFG.W, 4);
  // Grass top dashes
  ctx.fillStyle = '#5ab82a';
  for(let gx=0;gx<CFG.W;gx+=8) {
    ctx.fillRect(gx, CFG.GROUND_Y-2, 4, 2);
  }
}

// Simple cloud system
const cloudPositions = [
  {x:80,y:25,w:55,h:18},
  {x:220,y:15,w:70,h:22},
  {x:380,y:30,w:48,h:16},
];
let cloudScroll = 0;
function drawClouds(ctx) {
  cloudScroll = (cloudScroll + 0.0) ; // updated in main loop
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  for(const c of cloudPositions){
    const cx = ((c.x - cloudScroll) % (CFG.W+100) + CFG.W+100)%(CFG.W+100) - 50;
    ctx.beginPath();
    ctx.ellipse(cx,       c.y,      c.w/2,   c.h/2,   0, 0, Math.PI*2);
    ctx.ellipse(cx+c.w*0.3, c.y-c.h*0.3, c.w*0.35, c.h*0.5, 0, 0, Math.PI*2);
    ctx.ellipse(cx-c.w*0.25,c.y-c.h*0.2, c.w*0.3,  c.h*0.4, 0, 0, Math.PI*2);
    ctx.fill();
  }
}

function renderGame(dt) {
  ctx.clearRect(0,0,CFG.W,CFG.H);
  renderBackground(ctx, score);

  // Obstacles
  for (const obs of obstacles) obs.render(ctx);
  // Power-ups
  for (const pu of powerUps) pu.render(ctx);
  // Player
  if (player) player.render(ctx);
  // Particles
  for (const p of particles) p.render(ctx);

  // Score multiplier overlay
  if (multiplier > 1) {
    ctx.save();
    ctx.font = `bold 8px 'Press Start 2P', monospace`;
    ctx.fillStyle = '#f7e96b';
    ctx.fillText('x'+multiplier, CFG.W/2-12, 16);
    ctx.restore();
  }
}

// ── 16. GAME LOOP ────────────────────────────────────────────
let lastTime = 0;

function loop(timestamp) {
  const dt = Math.min((timestamp - lastTime)/1000, 0.05);
  lastTime = timestamp;

  if (gameState === 'playing' && player) {
    // Speed ramp
    const milestone = Math.floor(score / 500);
    if (milestone > lastSpeedMilestone) {
      lastSpeedMilestone = milestone;
      gameSpeed = Math.min(CFG.SPEED_MAX, CFG.SPEED_INIT + milestone * CFG.SPEED_STEP);
      if (milestone > 0) triggerSpeedUpFlash();
    }

    // Score
    const speedBoost = player.activePowerUp==='bone' ? 1.5 : 1;
    multiplier = player.activePowerUp==='bone' ? 2 : 1;
    score += gameSpeed * dt * 0.1 * speedBoost;
    if (score > highScore) highScore = score;

    updateSkyColors(score);
    cloudScroll += gameSpeed * 0.05 * dt;

    // Background parallax
    hillLayer.update(dt, gameSpeed);
    hedgeLayer.update(dt, gameSpeed);

    // Player
    player.update(dt);

    // Obstacles
    updateSpawner(dt, gameSpeed);
    for (let i = obstacles.length-1; i>=0; i--) {
      const obs = obstacles[i];
      obs.update(dt, gameSpeed);
      if (obs.isOffScreen()) { obstacles.splice(i,1); continue; }

      // Puddle special: slow
      if (obs.type==='puddle' && aabb(player.getHitbox(), obs.getHitbox())) {
        if (!player.slowActive) {
          player.slowActive = true;
          player.slowTimer = 2.0;
        }
      }
      // Other collisions
      else if (obs.type!=='puddle' && aabb(player.getHitbox(), obs.getHitbox())) {
        if (player.takeDamage()) {
          if (player.lives <= 0) {
            renderGame(dt);
            triggerGameOver();
            requestAnimationFrame(loop);
            return;
          }
        }
        // Knock obstacle back or remove on invincible hit
        if (player.invincible || player.isDashing) {
          obstacles.splice(i,1);
        }
      }
    }

    // Puddle slow timer
    if (player.slowActive) {
      player.slowTimer -= dt;
      if (player.slowTimer <= 0) { player.slowActive=false; }
    }

    // Power-ups
    for (let i = powerUps.length-1; i>=0; i--) {
      const pu = powerUps[i];
      pu.update(dt, gameSpeed);
      if (pu.isOffScreen()) { powerUps.splice(i,1); continue; }
      if (aabb(player.getHitbox(), pu.getHitbox())) {
        player.applyPowerUp(pu.type);
        powerUps.splice(i,1);
      }
    }

    // Particles
    for (let i = particles.length-1; i>=0; i--) {
      particles[i].update(dt);
      if (particles[i].isDead()) particles.splice(i,1);
    }

    updateHUD(player, score, highScore);
    updateSpeedupFlash(dt);
  }

  if (gameState === 'playing' || gameState === 'gameover') {
    renderGame(dt);
  }

  requestAnimationFrame(loop);
}

// ── 17. UI WIRING ────────────────────────────────────────────
document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    selectedChar = card.dataset.char;
    const btn = document.getElementById('startBtn');
    btn.disabled = false;
    btn.textContent = 'START RUN!';
  });
});

document.getElementById('startBtn').addEventListener('click', () => {
  if (selectedChar) startGame(selectedChar);
});

document.getElementById('playAgainBtn').addEventListener('click', () => {
  if (selectedChar) startGame(selectedChar);
});

document.getElementById('changeCharBtn').addEventListener('click', () => {
  gameState = 'start';
  selectedChar = null;
  document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
  const btn = document.getElementById('startBtn');
  btn.disabled = true;
  btn.textContent = 'SELECT A DOG';
  showScreen('startScreen');
});

// ── 18. INIT ─────────────────────────────────────────────────
buildSpriteCache();
drawPortraits();
updateSkyColors(0);
renderBackground(ctx, 0); // Draw initial background so canvas isn't blank

requestAnimationFrame(loop);
