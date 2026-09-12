---
name: physics-simulation-builder
description: >-
  Standard guide for developing pedagogical HTML5 Canvas simulations for physics education
  (Work, Energy, Momentum, Projectile, Circular, SHM). Use when creating or fixing physics sims.
---

# Physics Simulation Builder Skill

Use this skill when building or refining interactive simulations in `Physics2App/simulations/` or `app.js`.

## Core Philosophy
- **Clear Pedagogical Visuals > Hyper-realistic Clutter:**
  Show the concept clearly (e.g., vectors, components, friction contact surfaces, energy trade-off bars).
- **Dual Input Handling:** Every simulation MUST handle both Pointer/Mouse and Touch events seamlessly (iPad & mobile friendly).

## Boilerplate Pattern
```javascript
function initSimulation(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.clientWidth || 600;
    canvas.height = canvas.clientHeight || 300;
  }
  resize();
  
  // State
  let isDragging = false;
  let animId = null;
  
  // Touch & Mouse coordinates
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }
  
  // Events
  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onUp);
  
  // Animation Loop
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw elements
    animId = requestAnimationFrame(loop);
  }
  loop();
}
```
