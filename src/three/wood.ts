import * as THREE from "three";

/**
 * Procedural wood-grain canvas texture — zero network weight.
 * Draws a base tone with long waviness grain lines + subtle pore speckle.
 */
export function makeWoodTexture(
  base: string,
  grain: string,
  size = 512,
  repeatX = 1,
  repeatY = 1
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // Long vertical grain streaks with wave
  const lines = Math.floor(size / 6);
  for (let i = 0; i < lines; i++) {
    const x0 = (i / lines) * size + Math.random() * 6;
    const alpha = 0.05 + Math.random() * 0.16;
    const width = 0.6 + Math.random() * 2.4;
    const amp = 2 + Math.random() * 9;
    const freq = 0.004 + Math.random() * 0.01;
    const phase = Math.random() * Math.PI * 2;

    ctx.strokeStyle = grain;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    ctx.beginPath();
    for (let y = 0; y <= size; y += 8) {
      const x = x0 + Math.sin(y * freq + phase) * amp;
      if (y === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Fine pores
  for (let i = 0; i < size * 1.2; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const len = 2 + Math.random() * 14;
    ctx.globalAlpha = 0.03 + Math.random() * 0.07;
    ctx.strokeStyle = grain;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 2, y + len);
    ctx.stroke();
  }

  // Soft sheen bands
  for (let i = 0; i < 4; i++) {
    const y = Math.random() * size;
    const h = 30 + Math.random() * 90;
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.045)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.globalAlpha = 1;
    ctx.fillStyle = g;
    ctx.fillRect(0, y, size, h);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const cache = new Map<string, THREE.CanvasTexture>();

export function woodTexture(
  base: string,
  grain: string,
  repeatX = 1,
  repeatY = 1
) {
  const key = `${base}|${grain}|${repeatX}|${repeatY}`;
  if (!cache.has(key)) {
    cache.set(key, makeWoodTexture(base, grain, 512, repeatX, repeatY));
  }
  return cache.get(key)!;
}
