import json
import os
import sys
from typing import Any


MOJIBAKE_MARKERS = ("Ã", "â", "Â", "�")


def _maybe_unmojibake(text: str) -> str:
    """
    Fix common double-encoded UTF-8 mojibake (e.g. "WofÃƒÂ¼r" -> "Wofür").
    Applies a latin1->utf8 roundtrip repeatedly until it stabilizes.
    """
    if not any(marker in text for marker in MOJIBAKE_MARKERS):
        return text

    current = text
    for _ in range(4):
        if not any(marker in current for marker in MOJIBAKE_MARKERS):
            break
        try:
            # cp1252 is a better fit than latin1 for common mojibake sequences
            # because it can encode characters like “‚” that show up in â€“/â€”.
            candidate = current.encode("cp1252").decode("utf-8")
        except UnicodeError:
            break
        if candidate == current:
            break
        current = candidate
    return current


def _walk(value: Any) -> Any:
    if isinstance(value, dict):
        return {k: _walk(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_walk(v) for v in value]
    if isinstance(value, str):
        return _maybe_unmojibake(value)
    return value


def fix_file(path: str) -> bool:
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()
        data = json.loads(original)

    fixed = _walk(data)
    fixed_text = json.dumps(fixed, ensure_ascii=False, indent=2) + "\n"

    if fixed_text == original:
        return False

    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(fixed_text)
    return True


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: fix_mojibake_quizzes.py <file-or-dir> [<file-or-dir> ...]")
        return 2

    changed = 0
    scanned = 0

    for target in argv[1:]:
        if os.path.isdir(target):
            for root, _dirs, files in os.walk(target):
                for name in files:
                    if name != "quiz.json":
                        continue
                    path = os.path.join(root, name)
                    scanned += 1
                    if fix_file(path):
                        changed += 1
        else:
            scanned += 1
            if fix_file(target):
                changed += 1

    print(f"scanned={scanned} changed={changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
