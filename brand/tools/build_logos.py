"""Hair Division — logo suite generator.

Rebuilds every logo file in brand/logo/svg from two sources:
  * monogram-trace.json  — the HD monogram, traced from the original artwork
  * ../fonts/Montserrat-Regular.ttf — the wordmark typeface (set as outlines)

All text is converted to outlines, so the SVGs need no fonts installed and can go
straight to a signwriter, printer or vinyl cutter.

Run:  python brand/tools/build_logos.py
"""
import json
import os

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.dirname(HERE)
OUT = os.path.join(BRAND, "logo", "svg")
os.makedirs(OUT, exist_ok=True)

# ---- brand colours -------------------------------------------------------
INK = "#20231F"
SAGE = "#749E98"
WHITE = "#FFFFFF"
PORCELAIN = "#F7F5F0"

SCHEMES = {
    # name: (H + "HAIR" + "TAKAPUNA", D + "DIVISION", ring + divider)
    "colour": (INK, SAGE, SAGE),
    "ink": (INK, INK, INK),
    "white": (WHITE, WHITE, WHITE),
    "reversed": (WHITE, SAGE, SAGE),  # for ink / dark backgrounds
}


def num(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return s if s not in ("-0", "") else "0"


class Face:
    def __init__(self, filename):
        self.font = TTFont(os.path.join(BRAND, "fonts", filename))
        self.gs = self.font.getGlyphSet()
        self.cmap = self.font.getBestCmap()
        self.upm = self.font["head"].unitsPerEm
        self.cap = self.font["OS/2"].sCapHeight

    def glyph(self, ch):
        name = self.cmap[ord(ch)]
        g = self.gs[name]
        bp = BoundsPen(self.gs)
        g.draw(bp)
        return name, g, bp.bounds  # bounds = (xmin, ymin, xmax, ymax) or None

    def path(self, ch, x, baseline, size):
        """Outline of one glyph with its origin at (x, baseline)."""
        name, g, _ = self.glyph(ch)
        s = size / self.upm
        pen = SVGPathPen(self.gs, ntos=num)
        g.draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
        return pen.getCommands()

    def set_line(self, text, size, tracking, baseline=0.0, x0=0.0):
        """Tracked line of text. Returns (path d, ink_left, ink_right)."""
        s = size / self.upm
        x = x0
        parts, left, right = [], None, None
        for ch in text:
            if ch == " ":
                x += self.gs[self.cmap[32]].width * s + tracking * size
                continue
            _, g, b = self.glyph(ch)
            parts.append(self.path(ch, x, baseline, size))
            if left is None:
                left = x + b[0] * s
            right = x + b[2] * s
            x += g.width * s + tracking * size
        return " ".join(parts), left, right

    def set_at(self, text, size, ink_lefts, baseline):
        """Place each glyph so its ink starts at the measured x (faithful rebuild)."""
        s = size / self.upm
        parts = []
        for ch, left in zip(text.replace(" ", ""), ink_lefts):
            _, g, b = self.glyph(ch)
            parts.append(self.path(ch, left - b[0] * s, baseline, size))
        return " ".join(parts)


MONT = Face("Montserrat-Regular.ttf")
TRACE = json.load(open(os.path.join(HERE, "monogram-trace.json")))
# trace was made on a 6x upscale of the crop starting at (340, 200) in the 1254px artwork
TRACE_TF = "translate(340 200) scale(0.16666667)"

# ---- measurements taken from the original 1254 x 1254 artwork ------------
AXIS = 632.0                      # vertical centre line everything hangs from
RING_CY, RING_R, RING_W = 620.0, 579.0, 6.5
MONO_BOX = (387.0, 246.0, 916.0, 717.0)   # x0, y0, x1, y1 of H + D
WM_SIZE = 48 / 0.7                # "HAIR DIVISION": cap height 48
WM_BASE = 847.0
WM_LEFTS = [210, 288, 377, 428, 558, 641, 687, 772, 819, 895, 943, 1032]
WM_SPAN = (210, 1071)
TK_SIZE = 28 / 0.7                # "TAKAPUNA": cap height 28
TK_BASE = 1025.0
TK_LEFTS = [426, 478, 537, 590, 650, 703, 759, 815]
TK_SPAN = (426, 842)
DIV_Y, DIV_W = 927.0, 2.6
DIV_HALF, DIV_GAP, DOT_R = 311.5, 33.0, 9.5


def monogram(c_h, c_d, tf=""):
    g = f'<g transform="{tf} {TRACE_TF}">' if tf else f'<g transform="{TRACE_TF}">'
    # one-colour versions use a D with a hairline gap cut around the H, so the two
    # letters stay distinct without needing a second colour
    d = TRACE["Dk"] if c_h == c_d else TRACE["D"]
    return (f'{g}<path fill="{c_d}" fill-rule="evenodd" d="{d}"/>'
            f'<path fill="{c_h}" fill-rule="evenodd" d="{TRACE["H"]}"/></g>')


def divider(cx, y, half, gap, dot_r, w, colour):
    return (f'<path d="M{num(cx-half)} {num(y)}H{num(cx-gap)}M{num(cx+gap)} {num(y)}H{num(cx+half)}" '
            f'stroke="{colour}" stroke-width="{num(w)}" fill="none"/>'
            f'<circle cx="{num(cx)}" cy="{num(y)}" r="{num(dot_r)}" fill="{colour}"/>')


def svg(viewbox, body, title, bg=None):
    x, y, w, h = viewbox
    rect = f'<rect x="{num(x)}" y="{num(y)}" width="{num(w)}" height="{num(h)}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{num(x)} {num(y)} {num(w)} {num(h)}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{rect}{body}</svg>\n')


def write(name, content):
    with open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("  ", name, f"{len(content)/1024:.1f} kB")


# ---- 1. roundel (primary logo) -------------------------------------------
def roundel(scheme):
    a, b, c = SCHEMES[scheme]
    mono_dx = (AXIS + 12) - (MONO_BOX[0] + MONO_BOX[2]) / 2
    hair = MONT.set_at("HAIR", WM_SIZE, WM_LEFTS[:4], WM_BASE)
    division = MONT.set_at("DIVISION", WM_SIZE, WM_LEFTS[4:], WM_BASE)
    wm_dx = AXIS - sum(WM_SPAN) / 2
    tk = MONT.set_at("TAKAPUNA", TK_SIZE, TK_LEFTS, TK_BASE)
    tk_dx = AXIS - sum(TK_SPAN) / 2
    body = (
        f'<circle cx="{num(AXIS)}" cy="{num(RING_CY)}" r="{num(RING_R)}" fill="none" stroke="{c}" stroke-width="{num(RING_W)}"/>'
        + monogram(a, b, f"translate({num(mono_dx)} 0)")
        + f'<g transform="translate({num(wm_dx)} 0)"><path fill="{a}" d="{hair}"/><path fill="{b}" d="{division}"/></g>'
        + divider(AXIS, DIV_Y, DIV_HALF, DIV_GAP, DOT_R, DIV_W, c)
        + f'<path fill="{a}" transform="translate({num(tk_dx)} 0)" d="{tk}"/>'
    )
    pad = RING_R + RING_W / 2 + 14
    return svg((AXIS - pad, RING_CY - pad, 2 * pad, 2 * pad), body, "Hair Division Takapuna")


# ---- 2. monogram ---------------------------------------------------------
def mono(scheme):
    a, b, _ = SCHEMES[scheme]
    x0, y0, x1, y1 = MONO_BOX
    m = 6
    return svg((x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m), monogram(a, b), "Hair Division monogram")


# ---- 3. wordmark (stacked text only) -------------------------------------
def text_block(scheme, cap, cx, top):
    """HAIR DIVISION / divider / TAKAPUNA, centred on cx with caps starting at `top`.
    Returns (svg body, width, height)."""
    a, b, c = SCHEMES[scheme]
    size = cap / 0.7
    track = 0.36
    hair, l1, r1 = MONT.set_line("HAIR", size, track)
    gap = size * 1.02
    division, l2, r2 = MONT.set_line("DIVISION", size, track, x0=r1 + gap)
    width = r2 - l1
    dx = cx - width / 2 - l1
    base = top + cap
    tcap = cap * 0.58
    tsize = tcap / 0.7
    tk, tl, tr = MONT.set_line("TAKAPUNA", tsize, 0.62)
    div_y = base + cap * 1.25
    tk_base = div_y + cap * 1.25 + tcap
    body = (
        f'<g transform="translate({num(dx)} {num(base)})"><path fill="{a}" d="{hair}"/><path fill="{b}" d="{division}"/></g>'
        + divider(cx, div_y, width * 0.36, cap * 0.62, cap * 0.19, cap * 0.055, c)
        + f'<path fill="{a}" transform="translate({num(cx - (tr - tl) / 2 - tl)} {num(tk_base)})" d="{tk}"/>'
    )
    return body, width, tk_base - top


def wordmark(scheme):
    cap = 60
    body, w, h = text_block(scheme, cap, 0, 0)
    m = cap * 0.5
    return svg((-w / 2 - m, -m, w + 2 * m, h + 2 * m), body, "Hair Division Takapuna wordmark")


# ---- 4. horizontal lockup (monogram + text) — fascia, letterhead, web nav -
def lockup(scheme):
    a, b, c = SCHEMES[scheme]
    x0, y0, x1, y1 = MONO_BOX
    mw, mh = x1 - x0, y1 - y0
    cap = 74
    body_t, tw, th = text_block(scheme, cap, 0, 0)
    gap = 118
    tx = mw + gap + tw / 2
    ty = (mh - th) / 2 + 6
    body = (
        monogram(a, b, f"translate({num(-x0)} {num(-y0)})")
        + f'<path d="M{num(mw + gap / 2)} {num(mh * 0.16)}V{num(mh * 0.84)}" stroke="{c}" stroke-width="2.6" fill="none"/>'
        + f'<g transform="translate({num(tx)} {num(ty)})">{body_t}</g>'
    )
    m = 10
    return svg((-m, -m, mw + gap + tw + 2 * m, mh + 2 * m), body, "Hair Division Takapuna")


# ---- 5. app icon / favicon ----------------------------------------------
def icon(bg, a, b, ring=None):
    x0, y0, x1, y1 = MONO_BOX
    cx, cy = (x0 + x1) / 2 - 10, (y0 + y1) / 2
    half = 420
    body = f'<rect x="{num(cx - half)}" y="{num(cy - half)}" width="{2 * half}" height="{2 * half}" rx="{half * 0.22:.0f}" fill="{bg}"/>'
    if ring:
        body += f'<circle cx="{num(cx)}" cy="{num(cy)}" r="352" fill="none" stroke="{ring}" stroke-width="7"/>'
    body += monogram(a, b)
    return svg((cx - half, cy - half, 2 * half, 2 * half), body, "Hair Division")


if __name__ == "__main__":
    print("Writing", OUT)
    for s in SCHEMES:
        write(f"hair-division-roundel-{s}.svg", roundel(s))
        write(f"hair-division-lockup-{s}.svg", lockup(s))
        write(f"hair-division-monogram-{s}.svg", mono(s))
        write(f"hair-division-wordmark-{s}.svg", wordmark(s))
    write("hair-division-icon-porcelain.svg", icon(PORCELAIN, INK, SAGE))
    write("hair-division-icon-ink.svg", icon(INK, WHITE, SAGE))
