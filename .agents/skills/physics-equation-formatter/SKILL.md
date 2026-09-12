---
name: physics-equation-formatter
description: >-
  Standardized procedure and reference guide for formatting multi-line physics equations,
  KaTeX alignment, and interactive answer inputs (.calc-steps) in Physics2App. Use whenever
  editing, adding, or refactoring physics problems and guides.
---

# Physics Equation Formatter Skill

Use this skill when modifying or creating problem solutions and guides in `Physics2App`.

## 1. CSS Grid Alignment Structure (`.calc-steps`)

Always structure multi-line equations into 3-column rows:
```html
<div class="step">1. [ข้อความอธิบาย หรือ สูตรหลัก]: $W = F s \cos \theta$</div>
<div class="calc-steps">
  <div>2. $W$</div><div>$=$</div><div>$20 \times 4 \times \cos 37^\circ$</div>
  <div></div><div>$=$</div><div>$20 \times 4 \times 0.8$</div>
  <div></div><div>$=$</div><div>$80 \times 0.8$</div>
  <div></div><div>$=$</div><div><input type="text" class="answer-input" placeholder="64">&nbsp;J</div>
</div>
```

### Key Formatting Rules:
1. **Never chain equals horizontally:** No `$A = B = C = [ans]$`.
2. **Column 1:** Step number and variable name (e.g., `2. $v$`), followed by empty `<div></div>` for subsequent lines.
3. **Column 2:** Operator only (e.g. `<div>$=$</div>` or `<div>$\approx$</div>`).
4. **Column 3:** Mathematical expression or answer input.
5. **Inputs:** `<input type="text" class="answer-input" placeholder="...">` followed by `&nbsp;[Unit]`.
   - NEVER put `<input>` inside `$ ... $` or `$$ ... $$` delimiters (KaTeX will escape it).

## 2. KaTeX Units Reference

Always use clean KaTeX notation:
- Momentum: `\text{kg}\cdot\text{m/s}`
- Impulse / Force: `\text{N}\cdot\text{s}`, `\text{N}`
- Work / Energy: `\text{J}`, `\text{kJ}`
- Power: `\text{W}`, `\text{kW}`
- Speed / Acceleration: `\text{m/s}`, `\text{m/s}^2`
- Angle: `37^\circ`, `60^\circ`

## 3. Automated Verification Checklist
1. Scan for horizontal chained equals: `=[^<]*=[^<]*<input`
2. Check stray `$` in display math: scan `\$\$(.*?)\$\$` for any inner `$`
3. Verify JS syntax: `node -c <file.js>`
