"""Hair Division — export print-ready PDFs, PNG previews and logo PNGs.

Uses headless Chrome (or Edge) to turn each sheet in brand/signage/*.html into
  * brand/signage/pdf/<name>.pdf   — vector, exact millimetre size, fonts embedded
  * brand/previews/<name>.png      — screen preview used by the brand guidelines page
and to rasterise the logo SVGs into transparent PNGs in brand/logo/png/.

Run:  python brand/tools/export_print.py
"""
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.dirname(HERE)
SIGN = os.path.join(BRAND, "signage")
PDF = os.path.join(SIGN, "pdf")
PREV = os.path.join(BRAND, "previews")
PNG = os.path.join(BRAND, "logo", "png")
for d in (PDF, PREV, PNG):
    os.makedirs(d, exist_ok=True)

CHROME = next((p for p in (
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", "/usr/bin/chromium",
) if os.path.exists(p)), None)
if not CHROME:
    sys.exit("Chrome or Edge not found — install one, or edit CHROME in this script.")

MM = 96 / 25.4  # CSS px per millimetre


def url(path):
    return "file:///" + os.path.abspath(path).replace("\\", "/").replace(" ", "%20")


def chrome(*args):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--allow-file-access-from-files", "--virtual-time-budget=4000", *args],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def sheets():
    for f in sorted(os.listdir(SIGN)):
        if f.endswith(".html"):
            src = open(os.path.join(SIGN, f), encoding="utf-8").read()
            w, h = map(float, re.search(r"@page\{size:([\d.]+)mm ([\d.]+)mm", src).groups())
            yield f[:-5], w, h, src.count('class="page')


def export_sheets():
    for name, w, h, pages in sheets():
        src = os.path.join(SIGN, name + ".html")
        chrome("--no-pdf-header-footer", f"--print-to-pdf={os.path.join(PDF, name + '.pdf')}", url(src))
        # preview: every page stacked, ~1100 px on the long edge of one page
        gap = 6 * MM * (pages - 1)
        css_w, css_h = w * MM, h * MM * pages + gap
        scale = min(1100 / max(w * MM, h * MM), 3)
        chrome(f"--window-size={round(css_w)},{round(css_h)}", f"--force-device-scale-factor={scale:.4f}",
               f"--screenshot={os.path.join(PREV, name + '.png')}", url(src))
        print(f"  {name}: {w:g} x {h:g} mm, {pages} page(s)")


def export_logo_pngs():
    svg_dir = os.path.join(BRAND, "logo", "svg")
    for f in sorted(os.listdir(svg_dir)):
        if not f.endswith(".svg"):
            continue
        svg = open(os.path.join(svg_dir, f), encoding="utf-8").read()
        _, _, vw, vh = map(float, re.search(r'viewBox="([^"]+)"', svg).group(1).split())
        long_edge = 2400 if "lockup" in f or "wordmark" in f else 1600
        k = long_edge / max(vw, vh)
        w, h = round(vw * k), round(vh * k)
        with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as t:
            t.write(f'<!doctype html><style>html,body{{margin:0;background:transparent}}'
                    f'img{{display:block;width:{w}px;height:{h}px}}</style><img src="{url(os.path.join(svg_dir, f))}">')
        chrome(f"--window-size={w},{h}", "--default-background-color=00000000",
               f"--screenshot={os.path.join(PNG, f[:-4] + '.png')}", url(t.name))
        os.unlink(t.name)
    print(f"  logo PNGs -> {PNG}")


if __name__ == "__main__":
    print("Exporting with", CHROME)
    export_sheets()
    export_logo_pngs()
