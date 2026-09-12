# scripts/validate_equations.py
import re
import sys
import os

def validate_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    errors = []
    warnings = []

    lines = content.split('\n')

    # 1. Check stray $ in display math
    display_maths = re.finditer(r'\$\$(.*?)\$\$', content, re.DOTALL)
    for dm in display_maths:
        inner = dm.group(1)
        if '$' in inner:
            line_no = content[:dm.start()].count('\n') + 1
            errors.append(f"Line {line_no}: Stray '$' inside display math '$$...$$'")

    # 2. Check invalid \cdot inside \text{}
    bad_cdot = re.finditer(r'\\text\{[^}]*\\cdot[^}]*\}', content)
    for bc in bad_cdot:
        line_no = content[:bc.start()].count('\n') + 1
        errors.append(f"Line {line_no}: Invalid \\cdot inside \\text{{}}: '{bc.group(0)}'")

    # 3. Check for chained calculation equals in problem step lines (exclude theory & hints)
    in_theory = False
    for idx, line in enumerate(lines, 1):
        if 'theory:' in line:
            in_theory = True
        if in_theory and 'problems:' in line:
            in_theory = False

        if in_theory:
            continue
        if 'calc-steps' in line or 'aligned' in line or '<div>$=$</div>' in line or 'hints:' in line:
            continue

        # Look for chained calculation equals on one line (e.g. $W = Fs = 500 \times 10$)
        math_blocks = re.findall(r'\$([^$]+)\$', line)
        for mb in math_blocks:
            # If line has multiple equals without comma or arrow
            if mb.count('=') > 1 and ',' not in mb and '\\rightarrow' not in mb and '\\Rightarrow' not in mb:
                errors.append(f"Line {idx}: Chained equals in problem step: '${mb}$'")

    # 4. Check for input tag actually inside '$ ... $' delimiter
    for idx, line in enumerate(lines, 1):
        clean_line = line.replace('$$', '')
        parts = clean_line.split('$')
        # Odd indices are inside inline math
        for p_idx in range(1, len(parts), 2):
            if '<input' in parts[p_idx]:
                errors.append(f"Line {idx}: <input> tag placed inside math delimiter: '${parts[p_idx]}$'")

    print(f"\n--- Validation Report: {filename} ---")
    if not errors and not warnings:
        print("  [PASSED] All equations and formatting adhere to standard 100%!")
        return True
    else:
        for err in errors:
            print(f"  [ERROR] {err}")
        for w in warnings:
            print(f"  [WARN]  {w}")
        return False

if __name__ == '__main__':
    targets = [
        r'd:\ปพ69\คะแนนเก็บ\Physics2App\data.js',
        r'd:\ปพ69\คะแนนเก็บ\Physics2App\data_ch6.js',
        r'd:\ปพ69\คะแนนเก็บ\Physics2App\data_ch7.js',
        r'd:\ปพ69\คะแนนเก็บ\Physics2App\data_ch5_challenge.js',
        r'd:\ปพ69\คะแนนเก็บ\Physics2App\data_ch6_challenge.js',
        r'd:\ปพ69\คะแนนเก็บ\Physics2App\data_ch7_challenge.js',
    ]
    all_ok = True
    for t in targets:
        if os.path.exists(t):
            ok = validate_file(t)
            if not ok:
                all_ok = False
    if all_ok:
        print("\nAll project files passed equation validation with 0 errors!")
    else:
        print("\nSome files have validation errors.")
