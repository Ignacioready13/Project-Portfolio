#!/usr/bin/env python3
"""
build.py — sync markdown/ content with content.js and generate content.text.js.

Run this whenever you add/remove a project in content.js or edit a .md file:

    python build.py

It does three things, in order:
  1. Reads each project's `tab` name out of content.js (in order).
  2. Makes sure every project has a `markdown/<tab-slug>.md` file. If one is
     missing it creates it with a placeholder heading + paragraph.
  3. Converts every `markdown/*.md` into the summary structure the site renders
     (headings + paragraphs, with **bold**, *italic*, `code`, [links](url), and
     bullet/numbered lists) and writes it to content.text.js.

content.text.js is committed, so the static GitHub Pages site always ships the
latest text after you push — no server-side build step.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT_JS = os.path.join(ROOT, "content.js")
MD_DIR = os.path.join(ROOT, "markdown")
TEXT_JS = os.path.join(ROOT, "content.text.js")

PLACEHOLDER = "## Placeholder Heading\n\nContent coming soon.\n"


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.strip().lower()).strip("-")


def extract_tabs():
    with open(CONTENT_JS, encoding="utf-8") as f:
        src = f.read()
    return re.findall(r'^\s*tab\s*:\s*"([^"]*)"', src, re.MULTILINE)


# ------------------------ minimal markdown -> HTML ------------------------

def esc(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render_inline(text):
    t = esc(text)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", r'<a href="\2">\1</a>', t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", t)
    return t


def render_list(items, kind):
    tag = "ol" if kind == "ol" else "ul"
    body = "".join("<li>%s</li>" % render_inline(i) for i in items)
    return "<%s>%s</%s>" % (tag, body, tag)


_HEADING = re.compile(r"^(#{1,6})\s+(.*)$")
_UL = re.compile(r"^\s*[-*+]\s+(.*)$")
_OL = re.compile(r"^\s*(\d+)[.)]\s+(.*)$")


def parse_markdown(text):
    """Turn markdown into the site's summary blocks:
    [{heading: "...", paragraphs: ["<p>..</p>", "<ul>..</ul>"]}, ...]"""
    blocks = []
    heading = None
    paras = []
    buf = []
    buf_kind = None

    def flush_para():
        nonlocal buf, buf_kind
        if buf:
            if buf_kind:
                paras.append(render_list(buf, buf_kind))
            else:
                paras.append("<p>%s</p>" % render_inline(" ".join(buf)))
        buf = []
        buf_kind = None

    def flush_block():
        nonlocal heading, paras
        flush_para()
        if heading is not None or paras:
            blocks.append({"heading": heading or "", "paragraphs": paras})
        paras = []
        heading = None

    for raw in text.split("\n"):
        line = raw.rstrip()
        hm = _HEADING.match(line)
        if hm:
            flush_block()
            heading = render_inline(hm.group(2).strip())
            continue
        if not line.strip():
            flush_para()
            continue
        um = _UL.match(line)
        om = _OL.match(line)
        if um:
            if buf_kind != "ul":
                flush_para()
            buf_kind = "ul"
            buf.append(um.group(1))
            continue
        if om:
            if buf_kind != "ol":
                flush_para()
            buf_kind = "ol"
            buf.append(om.group(2))
            continue
        if buf_kind:
            flush_para()
        buf.append(line.strip())

    flush_block()
    return blocks


def main():
    tabs = extract_tabs()
    if not tabs:
        print("build.py: no projects found in content.js (no `tab:` fields).")
        sys.exit(1)

    slugs = [slugify(t) for t in tabs]
    os.makedirs(MD_DIR, exist_ok=True)

    # 1. ensure a markdown file exists for each project
    created = []
    for t, s in zip(tabs, slugs):
        if not s:
            print("Warning: project has an empty tab name; skipping.")
            continue
        path = os.path.join(MD_DIR, s + ".md")
        if not os.path.exists(path):
            with open(path, "w", encoding="utf-8") as f:
                f.write(PLACEHOLDER)
            created.append(s)

    # 2. warn about orphaned markdown files (no matching tab)
    existing = {f for f in os.listdir(MD_DIR) if f.endswith(".md")}
    expected = {s + ".md" for s in slugs}
    orphaned = sorted(existing - expected)
    if orphaned:
        print("Warning: markdown file(s) with no matching tab (rename or delete):")
        for o in orphaned:
            print("  - markdown/" + o)

    # 3. convert markdown -> content.text.js
    data = {}
    for t, s in zip(tabs, slugs):
        if not s:
            continue
        path = os.path.join(MD_DIR, s + ".md")
        with open(path, encoding="utf-8") as f:
            data[s] = parse_markdown(f.read())

    header = (
        "/* Generated by build.py - DO NOT EDIT BY HAND.\n"
        "   Edit markdown/*.md instead, then run:  python build.py  */\n"
    )
    with open(TEXT_JS, "w", encoding="utf-8") as f:
        f.write(header)
        f.write("const PROJECT_TEXT = ")
        f.write(json.dumps(data, indent=2, ensure_ascii=False))
        f.write(";\n")

    for t, s in zip(tabs, slugs):
        if not s:
            continue
        print("  %-22s <- markdown/%s.md" % (t, s))
    if created:
        print("Created %d placeholder file(s):" % len(created))
        for s in created:
            print("  markdown/%s.md" % s)
    print("Wrote %s" % os.path.relpath(TEXT_JS, ROOT))


if __name__ == "__main__":
    main()
