/**
 * 生成 PWA 图标（纯 Node.js PNG 编码，无外部依赖）
 * 输出：public/icons/icon-192.png / icon-512.png / apple-touch-icon.png(180x180)
 *
 * 设计：水蓝底 + 白色太阳 + 三道白色波浪（呼应盐田/泻湖/沙丘）
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');

/* ---------- PNG 编码 ---------- */
const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePng(width, height, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------- 绘制图标 ---------- */
// 水蓝 #3a7a8d -> #1a3d4a 垂直渐变；太阳 #faf8f4；波浪白色
function drawIcon(size) {
  const s = size;
  const px = Buffer.alloc(s * s * 4);
  const sunCx = 0.5 * s;
  const sunCy = 0.3 * s;
  const sunR = 0.19 * s;
  const waves = [
    { y: 0.7, amp: 0.02, thick: 0.03, wl: 0.34 },
    { y: 0.82, amp: 0.02, thick: 0.03, wl: 0.34 },
    { y: 0.94, amp: 0.02, thick: 0.03, wl: 0.34 },
  ];

  const top = { r: 58, g: 122, b: 141 }; // #3a7a8d
  const bottom = { r: 26, g: 61, b: 74 }; // #1a3d4a
  const sunColor = { r: 250, g: 248, b: 244 }; // #faf8f4

  for (let y = 0; y < s; y++) {
    const t = y / (s - 1);
    const r = Math.round(top.r + (bottom.r - top.r) * t);
    const g = Math.round(top.g + (bottom.g - top.g) * t);
    const b = Math.round(top.b + (bottom.b - top.b) * t);

    for (let x = 0; x < s; x++) {
      let cr = r;
      let cg = g;
      let cb = b;

      // 太阳
      const dx = x - sunCx;
      const dy = y - sunCy;
      if (dx * dx + dy * dy <= sunR * sunR) {
        cr = sunColor.r;
        cg = sunColor.g;
        cb = sunColor.b;
      }

      // 波浪（覆盖在太阳之后）
      for (const w of waves) {
        const center = w.y * s + Math.sin((x / s) * (2 * Math.PI) / w.wl) * w.amp * s;
        if (Math.abs(y - center) < (w.thick * s) / 2) {
          cr = 255;
          cg = 255;
          cb = 255;
        }
      }

      const i = (y * s + x) * 4;
      px[i] = cr;
      px[i + 1] = cg;
      px[i + 2] = cb;
      px[i + 3] = 255;
    }
  }
  return encodePng(s, s, px);
}

/* ---------- 输出 ---------- */
mkdirSync(outDir, { recursive: true });

const icons = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

for (const icon of icons) {
  const file = join(outDir, icon.name);
  writeFileSync(file, drawIcon(icon.size));
  console.log(`✔ ${icon.name} (${icon.size}x${icon.size}) -> ${file}`);
}
