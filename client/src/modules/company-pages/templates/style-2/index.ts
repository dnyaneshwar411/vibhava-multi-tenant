export const style2Landing = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Premier Property Management &amp; Leasing in the City</title>
<meta name="description" content="Transparent leasing, well-maintained apartments, and 24/7 maintenance. Premier Property Management operates 250+ residential units across the metro.">
<style>
/* ============================================================
   DESIGN TOKENS — Bold & Vibrant / Creative Studio
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0d0d12;
  --ink-2:#3a3a44;
  --muted:#71717a;
  --muted-2:#a1a1aa;

  --bg:#fdf7ef;
  --surface:#ffffff;
  --surface-2:#f5ede1;

  --coral:#ff4d2e;
  --coral-dark:#e63a1e;
  --violet:#7c3aed;
  --violet-dark:#6d28d9;
  --electric:#2563ff;
  --lime:#c8ff00;
  --sun:#ffd93d;

  --border:#ebe2d5;
  --border-2:#d9cdba;

  --radius-sm:10px;
  --radius:18px;
  --radius-lg:28px;
  --radius-pill:999px;

  --shadow-sm:0 2px 6px -1px rgb(13 13 18 / .06), 0 2px 4px -2px rgb(13 13 18 / .04);
  --shadow-md:0 18px 40px -18px rgb(13 13 18 / .22), 0 6px 14px -6px rgb(13 13 18 / .08);
  --shadow-lg:0 40px 80px -30px rgb(13 13 18 / .30);

  --max:1240px;
  --header-h:4.75rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:4px}

/* ============================================================
   TYPOGRAPHY — big, confident, high contrast
   ============================================================ */
h1,h2,h3,h4{font-weight:800;letter-spacing:-.035em;line-height:1.02;color:var(--ink)}
h1{font-size:clamp(2.75rem,8.5vw,6.75rem);letter-spacing:-.045em;line-height:.96}
h2{font-size:clamp(2rem,4.6vw,3.5rem);line-height:1.02}
h3{font-size:1.15rem;font-weight:700;letter-spacing:-.02em}
p{color:var(--ink-2)}
.lead{font-size:1.125rem;line-height:1.6;color:var(--ink-2)}
.accent{color:var(--coral)}

/* Marker highlight */
.mark{
  background-image:linear-gradient(180deg,transparent 58%,var(--coral) 58%,var(--coral) 92%,transparent 92%);
  padding:0 .08em;
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:6rem 0}
.section-tight{padding:3.5rem 0}

.eyebrow-pill{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.45rem 1rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1px solid var(--border);
  font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink);box-shadow:var(--shadow-sm);
}
.eyebrow-pill::before{
  content:"";width:.5rem;height:.5rem;border-radius:50%;background:var(--coral);
  box-shadow:0 0 0 4px rgba(255,77,46,.18);
}

.section-head{max-width:720px;margin-bottom:3.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.section-head h2{margin-bottom:1rem}
.section-head .lead{max-width:56ch}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(253,247,239,.82);
  backdrop-filter:saturate(180%) blur(14px);
  -webkit-backdrop-filter:saturate(180%) blur(14px);
  border-bottom:1px solid transparent;
  transition:border-color .2s ease;
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.15rem;letter-spacing:-.04em;color:var(--ink)}
.brand-mark{
  position:relative;flex:none;width:2rem;height:2rem;border-radius:9px;
  background:var(--ink);display:grid;place-items:center;color:var(--lime);
  font-size:.9rem;font-weight:900;
}
.brand-mark::after{content:"◆";font-size:.7rem;line-height:1}

.nav{display:flex;align-items:center;gap:.25rem}
.nav a{
  display:inline-block;padding:.55rem 1rem;border-radius:var(--radius-pill);
  font-size:.92rem;font-weight:600;color:var(--ink-2);
  transition:background .18s ease,color .18s ease;
}
.nav a:hover{color:var(--ink);background:var(--surface-2)}
.nav a[aria-current="page"]{color:#fff;background:var(--ink);font-weight:700}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.75rem;height:2.75rem;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  border:1px solid var(--border);border-radius:var(--radius-pill);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:2px;background:var(--ink);border-radius:2px;transition:transform .22s ease,opacity .22s ease}

/* ============================================================
   BUTTONS — pill shaped
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.85rem 1.6rem;border-radius:var(--radius-pill);
  font-size:.95rem;font-weight:700;letter-spacing:-.005em;
  border:1.5px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease,border-color .18s ease,color .18s ease;
}
.btn-primary{background:var(--coral);color:#fff;border-color:var(--coral);box-shadow:0 6px 18px -6px rgba(255,77,46,.55)}
.btn-primary:hover{background:var(--coral-dark);border-color:var(--coral-dark);transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(255,77,46,.7)}
.btn-dark{background:var(--ink);color:#fff;border-color:var(--ink)}
.btn-dark:hover{background:#000;transform:translateY(-2px);box-shadow:var(--shadow-md)}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--border-2)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
.btn-lg{padding:1.05rem 2rem;font-size:1rem}
.btn-block{width:100%}

/* ============================================================
   HERO
   ============================================================ */
.hero{padding:4.5rem 0 5rem;position:relative;overflow:hidden}
.hero::before{
  content:"";position:absolute;top:-20%;left:50%;transform:translateX(-50%);
  width:1000px;height:1000px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,77,46,.10),transparent 62%);
  pointer-events:none;z-index:0;
}
.hero::after{
  content:"";position:absolute;bottom:-30%;right:-15%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.10),transparent 62%);
  pointer-events:none;z-index:0;
}
.hero-inner{position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center}

.hero h1{max-width:15ch;margin:1.75rem 0 1.75rem}
.hero .lead{max-width:60ch;margin-bottom:2.25rem}
.hero-actions{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center}

/* Overlapping mockups */
.hero-stage{
  position:relative;
  margin-top:5rem;
  width:100%;
  max-width:1080px;
  display:grid;
  grid-template-columns:1fr 1.25fr 1fr;
  align-items:center;
  gap:0;
}

.mockup{
  position:relative;
  border-radius:var(--radius-lg);
  border:1px solid var(--border);
  background:var(--surface);
  box-shadow:var(--shadow-md);
  overflow:hidden;
  transition:transform .3s ease,box-shadow .3s ease;
}
.mockup:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}

.mockup-thumb{
  position:relative;aspect-ratio:4/3;
  background:
    linear-gradient(140deg,#f1e9dc 0%,#e6d9c4 100%);
  overflow:hidden;
}
.mockup-thumb::before{
  content:"";position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(150,130,105,.18) 1px,transparent 1px),
    linear-gradient(90deg,rgba(150,130,105,.18) 1px,transparent 1px);
  background-size:26px 26px;
}
.mockup-thumb span{
  position:absolute;inset:0;display:grid;place-items:center;
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#8a7657;
}
.mockup-body{padding:1.25rem 1.35rem 1.4rem}
.mockup-name{font-size:.98rem;font-weight:800;letter-spacing:-.02em}
.mockup-addr{font-size:.8rem;color:var(--muted);margin-top:.2rem}
.mockup-specs{display:flex;flex-wrap:wrap;gap:.4rem 1.1rem;font-size:.8rem;color:var(--ink-2);padding-top:.85rem;margin-top:.85rem;border-top:1px solid var(--border)}
.mockup-price{font-size:1.35rem;font-weight:800;letter-spacing:-.035em;margin-top:.6rem}
.mockup-price small{font-size:.76rem;font-weight:500;color:var(--muted);letter-spacing:0}
.mockup-badge{
  position:absolute;top:1rem;left:1rem;z-index:2;
  background:var(--lime);color:var(--ink);
  font-size:.66rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
  padding:.35rem .75rem;border-radius:var(--radius-pill);
}

/* Side mockups overlap behind */
.mockup-side{transform:scale(.9);opacity:.92;z-index:1}
.mockup-side--left{transform:scale(.88) translateX(8%) rotate(-3deg)}
.mockup-side--right{transform:scale(.88) translateX(-8%) rotate(3deg)}
.mockup-side:hover{transform:scale(.9) translateY(-6px)}
.mockup-side--left:hover{transform:scale(.88) translateX(8%) rotate(-3deg) translateY(-6px)}
.mockup-side--right:hover{transform:scale(.88) translateX(-8%) rotate(3deg) translateY(-6px)}

.mockup-center{z-index:3;transform:translateY(-12px)}
.mockup-center:hover{transform:translateY(-18px)}

/* Floating chips */
.float-chip{
  position:absolute;z-index:4;
  background:var(--ink);color:#fff;
  padding:.75rem 1.1rem;border-radius:var(--radius-pill);
  font-size:.8rem;font-weight:700;letter-spacing:-.01em;
  box-shadow:var(--shadow-md);
  display:flex;align-items:center;gap:.5rem;
  animation:float 5s ease-in-out infinite;
}
.float-chip span{color:var(--lime)}
.float-chip--tl{top:6%;left:2%}
.float-chip--br{bottom:8%;right:2%;animation-delay:-2.5s}

@keyframes float{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-10px)}
}

/* ============================================================
   MARQUEE
   ============================================================ */
.marquee{
  background:var(--ink);color:#fff;
  padding:1.35rem 0;overflow:hidden;
  border-block:2px solid var(--ink);
}
.marquee-track{
  display:flex;gap:0;width:max-content;
  animation:scroll 42s linear infinite;
}
.marquee-track:hover{animation-play-state:paused}
.marquee-group{display:flex;align-items:center;gap:2.5rem;padding-right:2.5rem}
.marquee-item{
  display:inline-flex;align-items:center;gap:2.5rem;
  font-size:1.05rem;font-weight:800;letter-spacing:-.015em;
  white-space:nowrap;
}
.marquee-item::after{
  content:"◆";color:var(--coral);font-size:.65rem;
}
.marquee-item--lime::after{color:var(--lime)}
.marquee-item--violet::after{color:var(--violet)}
.marquee-item--sun::after{color:var(--sun)}

@keyframes scroll{
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}

@media (prefers-reduced-motion:reduce){
  .marquee-track{animation:none}
  .float-chip{animation:none}
}

/* ============================================================
   FEATURED PROPERTIES
   ============================================================ */
.prop-grid{
  display:grid;
  grid-template-columns:1.15fr 1fr 1fr;
  gap:1.5rem;
  align-items:start;
}
.prop-card{
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius-lg);
  overflow:hidden;
  transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;
}
.prop-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:var(--border-2)}
.prop-card--lg{grid-row:span 1}

.prop-thumb{
  position:relative;aspect-ratio:16/11;
  background:linear-gradient(140deg,#f1e9dc 0%,#e6d9c4 100%);
  overflow:hidden;
}
.prop-thumb::before{
  content:"";position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(150,130,105,.18) 1px,transparent 1px),
    linear-gradient(90deg,rgba(150,130,105,.18) 1px,transparent 1px);
  background-size:28px 28px;
}
.prop-thumb span{
  position:absolute;inset:0;display:grid;place-items:center;
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#8a7657;
}
.prop-body{padding:1.5rem 1.5rem 1.6rem}
.prop-head{display:flex;justify-content:space-between;align-items:flex-start;gap:.75rem;margin-bottom:.35rem}
.prop-title{font-size:1.05rem;font-weight:800;letter-spacing:-.02em;line-height:1.25}
.prop-addr{font-size:.84rem;color:var(--muted);margin-bottom:1rem}
.prop-specs{
  display:flex;flex-wrap:wrap;gap:.4rem 1.1rem;font-size:.84rem;color:var(--ink-2);
  padding:.9rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:1.1rem;
}
.prop-foot{display:flex;justify-content:space-between;align-items:center;gap:1rem}
.prop-price{font-size:1.45rem;font-weight:800;letter-spacing:-.04em;line-height:1}
.prop-price small{font-size:.74rem;font-weight:500;color:var(--muted);letter-spacing:0}

/* Tags */
.tag{
  display:inline-flex;align-items:center;gap:.35rem;
  padding:.3rem .7rem;border-radius:var(--radius-pill);
  font-size:.66rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;
  white-space:nowrap;
}
.tag--coral{background:rgba(255,77,46,.12);color:var(--coral-dark)}
.tag--violet{background:rgba(124,58,237,.12);color:var(--violet-dark)}
.tag--electric{background:rgba(37,99,255,.12);color:var(--electric)}
.tag--lime{background:var(--lime);color:var(--ink)}
.tag--ink{background:var(--ink);color:#fff}

/* ============================================================
   BENTO — WHY RENT WITH US
   ============================================================ */
.bento{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.25rem;
}

.tile{
  position:relative;
  border-radius:var(--radius-lg);
  padding:2rem 1.9rem 2.1rem;
  overflow:hidden;
  display:flex;flex-direction:column;
  min-height:230px;
  transition:transform .22s ease,box-shadow .22s ease;
}
.tile:hover{transform:translateY(-5px);box-shadow:var(--shadow-lg)}

.tile--coral{background:var(--coral);color:#fff;grid-column:span 2}
.tile--violet{background:var(--violet);color:#fff}
.tile--electric{background:var(--electric);color:#fff}
.tile--lime{background:var(--lime);color:var(--ink);grid-column:span 1}
.tile--ink{background:var(--ink);color:#fff;grid-column:span 3}

.tile-icon{
  width:3rem;height:3rem;border-radius:14px;
  background:rgba(255,255,255,.18);
  display:grid;place-items:center;margin-bottom:auto;
}
.tile--lime .tile-icon{background:rgba(13,13,18,.12)}

.tile h3{font-size:1.5rem;font-weight:800;letter-spacing:-.03em;margin:1.75rem 0 .6rem;line-height:1.15}
.tile p{font-size:.98rem;line-height:1.55;color:inherit;opacity:.88}

.tile--ink .tile-inner{
  display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:2rem;align-items:center;
}
.tile--ink h3{margin:0 0 .4rem;font-size:1.35rem}
.tile--ink .stat-value{font-size:2.5rem;font-weight:900;letter-spacing:-.05em;line-height:1;color:var(--lime)}
.tile--ink .stat-label{font-size:.8rem;color:#a1a1aa;margin-top:.4rem}

/* ============================================================
   PRICING
   ============================================================ */
.pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;align-items:stretch}

.plan{
  position:relative;
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius-lg);
  padding:2.25rem 2rem;
  display:flex;flex-direction:column;
  transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;
}
.plan:hover{transform:translateY(-5px);box-shadow:var(--shadow-md);border-color:var(--border-2)}

.plan--featured{
  background:var(--ink);color:#fff;border-color:var(--ink);
  box-shadow:var(--shadow-lg);
  transform:translateY(-8px);
}
.plan--featured:hover{transform:translateY(-13px)}
.plan--featured .plan-name,
.plan--featured .plan-price{color:#fff}
.plan--featured .plan-desc{color:#a1a1aa}
.plan--featured .plan li{color:#e4e4e7}
.plan--featured .plan li::before{color:var(--lime)}
.plan--featured .plan-price small{color:#a1a1aa}

.plan-tag{
  position:absolute;top:-.85rem;left:2rem;
  background:var(--lime);color:var(--ink);
  font-size:.68rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
  padding:.4rem .9rem;border-radius:var(--radius-pill);
}
.plan-name{font-size:1.15rem;font-weight:800;letter-spacing:-.025em}
.plan-desc{font-size:.9rem;color:var(--muted);margin-top:.5rem;min-height:2.8em;line-height:1.5}
.plan-price{font-size:2.75rem;font-weight:900;letter-spacing:-.05em;margin:1.5rem 0 .25rem;line-height:1}
.plan-price small{display:block;font-size:.8rem;font-weight:500;color:var(--muted);letter-spacing:0;margin-top:.45rem}
.plan ul{margin:1.75rem 0 2rem;display:grid;gap:.7rem}
.plan li{display:flex;gap:.65rem;align-items:flex-start;font-size:.92rem;color:var(--ink-2);line-height:1.5}
.plan li::before{content:"✓";font-size:.9rem;font-weight:900;color:var(--coral);line-height:1.55}
.plan .btn{margin-top:auto}

/* ============================================================
   BIG CTA
   ============================================================ */
.cta-block{
  position:relative;overflow:hidden;
  border-radius:var(--radius-lg);
  padding:4.5rem 3.5rem;
  background:linear-gradient(135deg,var(--violet) 0%,var(--coral) 100%);
  color:#fff;
  display:grid;grid-template-columns:1.4fr 1fr;gap:3rem;align-items:center;
}
.cta-block::before{
  content:"";position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 15% 20%,rgba(255,255,255,.22),transparent 42%),
    radial-gradient(circle at 85% 80%,rgba(200,255,0,.18),transparent 42%);
  pointer-events:none;
}
.cta-block > *{position:relative;z-index:1}
.cta-block h2{color:#fff;font-size:clamp(2rem,4vw,3rem);max-width:18ch}
.cta-block p{color:rgba(255,255,255,.85);max-width:48ch;margin-top:1rem;font-size:1.0625rem}
.cta-actions{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:flex-end}
.cta-block .btn-primary{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 8px 24px -8px rgba(0,0,0,.4)}
.cta-block .btn-primary:hover{background:#fff;color:var(--coral-dark);transform:translateY(-2px)}
.cta-block .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}
.cta-block .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--ink);color:#fff;padding:5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.3fr;gap:3rem}
.footer-brand .brand{color:#fff}
.footer-brand .brand-mark{background:var(--coral);color:#fff}
.footer-brand p{color:#a1a1aa;font-size:.9rem;margin-top:1.25rem;max-width:34ch;line-height:1.6}
.footer-col h4{
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  color:#71717a;margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.7rem}
.footer-col a,.footer-col span{font-size:.92rem;color:#d4d4d8}
.footer-col a:hover{color:var(--lime)}
.footer-bottom{
  margin-top:4rem;padding-top:1.75rem;border-top:1px solid #27272a;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.82rem;color:#71717a;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .prop-grid{grid-template-columns:1fr 1fr}
  .prop-card--lg{grid-column:span 2}
  .tile--coral{grid-column:span 2}
  .tile--ink{grid-column:span 3}
  .tile--ink .tile-inner{grid-template-columns:1fr 1fr;gap:1.75rem}
}

@media (max-width:960px){
  .hero-stage{grid-template-columns:1fr;max-width:520px;gap:1.5rem;margin-top:3.5rem}
  .mockup-side{transform:none;opacity:1}
  .mockup-center{transform:none}
  .mockup-side--left,
  .mockup-side--right{transform:none}
  .mockup-side:hover,
  .mockup-side--left:hover,
  .mockup-side--right:hover{transform:translateY(-6px)}
  .mockup-center:hover{transform:translateY(-6px)}
  .float-chip{display:none}

  .pricing{grid-template-columns:1fr;max-width:520px;margin-inline:auto}
  .plan--featured{transform:none}
  .plan--featured:hover{transform:translateY(-5px)}

  .cta-block{grid-template-columns:1fr;padding:3rem 2rem;gap:2rem}
  .cta-actions{justify-content:flex-start}

  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.35rem;
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    margin:0 1rem;padding:.75rem;
    box-shadow:var(--shadow-md);
  }
  .nav a{padding:.75rem 1rem;border-radius:var(--radius-sm)}
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
}

@media (max-width:780px){
  .bento{grid-template-columns:1fr}
  .tile--coral,
  .tile--violet,
  .tile--electric,
  .tile--lime,
  .tile--ink{grid-column:span 1}
  .tile--ink .tile-inner{grid-template-columns:1fr;gap:1.5rem}
}

@media (max-width:680px){
  .section{padding:4rem 0}
  .section-tight{padding:2.75rem 0}
  .hero{padding:3rem 0 3.5rem}
  .prop-grid{grid-template-columns:1fr}
  .prop-card--lg{grid-column:span 1}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .marquee-item{font-size:.92rem;gap:1.75rem}
  .marquee-group{gap:1.75rem;padding-right:1.75rem}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .hero-actions{width:100%}
  .hero-actions .btn{width:100%}
  .cta-block{padding:2.25rem 1.5rem}
  .cta-block .cta-actions{width:100%}
  .cta-block .cta-actions .btn{width:100%}
  .tile{padding:1.6rem 1.5rem 1.75rem;min-height:auto}
  .plan{padding:1.85rem 1.5rem}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">
  <div class="container header-inner">
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <div class="header-bar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        Premier<span style="color:var(--coral)">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/" aria-current="page">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/privacy-policy">Privacy</a>
        <a href="/c/terms-conditions">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-dark header-cta">Book a Tour</a>
        <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
          <span></span><span></span><span></span>
        </label>
      </div>
    </div>
  </div>
</header>

<main>

  <!-- ================= HERO ================= -->
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <span class="eyebrow-pill">Now leasing · 40+ units available</span>

        <h1>Property management that actually <span class="mark">shows up</span>.</h1>

        <p class="lead">
          Transparent leasing, well-maintained apartments, and a maintenance team that answers
          the phone. We look after 250+ residential units across the metro — and we would love
          to show you one.
        </p>

        <div class="hero-actions">
          <a href="#featured" class="btn btn-primary btn-lg">Browse Available Units</a>
          <a href="/c/contact" class="btn btn-ghost btn-lg">Book a Tour →</a>
        </div>
      </div>

      <!-- Overlapping mockups -->
      <div class="hero-stage">

        <div class="mockup mockup-side mockup-side--left" aria-hidden="true">
          <div class="mockup-thumb"><span>The Metropolitan</span></div>
          <div class="mockup-body">
            <div class="mockup-name">The Metropolitan · 902</div>
            <div class="mockup-addr">Downtown Core</div>
            <div class="mockup-specs"><span>1 Bed</span><span>1 Bath</span></div>
            <div class="mockup-price">$1,850 <small>/ mo</small></div>
          </div>
        </div>

        <div class="mockup mockup-center">
          <span class="mockup-badge">Available Now</span>
          <div class="mockup-thumb"><span>Harbor View Lofts</span></div>
          <div class="mockup-body">
            <div class="mockup-name">Harbor View Lofts · 14B</div>
            <div class="mockup-addr">218 Harbor Street, Riverside District</div>
            <div class="mockup-specs"><span>2 Bed</span><span>2 Bath</span><span>1,050 sq ft</span></div>
            <div class="mockup-price">$2,450 <small>/ mo</small></div>
          </div>
        </div>

        <div class="mockup mockup-side mockup-side--right" aria-hidden="true">
          <div class="mockup-thumb"><span>Cedar Park</span></div>
          <div class="mockup-body">
            <div class="mockup-name">Cedar Park Townhomes · 7</div>
            <div class="mockup-addr">Cedar Park</div>
            <div class="mockup-specs"><span>3 Bed</span><span>2.5 Bath</span></div>
            <div class="mockup-price">$3,200 <small>/ mo</small></div>
          </div>
        </div>

        <div class="float-chip float-chip--tl" aria-hidden="true">
          <span>●</span> 24/7 maintenance
        </div>
        <div class="float-chip float-chip--br" aria-hidden="true">
          98% renewal <span>★</span>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= MARQUEE ================= -->
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <div class="marquee-group">
        <span class="marquee-item">Downtown Core</span>
        <span class="marquee-item marquee-item--lime">250+ Units Managed</span>
        <span class="marquee-item marquee-item--violet">Riverside District</span>
        <span class="marquee-item">98% Renewal Rate</span>
        <span class="marquee-item marquee-item--sun">Cedar Park</span>
        <span class="marquee-item marquee-item--lime">24/7 Maintenance</span>
        <span class="marquee-item marquee-item--violet">Northgate</span>
        <span class="marquee-item">Pet-Friendly Buildings</span>
      </div>
      <div class="marquee-group">
        <span class="marquee-item">Downtown Core</span>
        <span class="marquee-item marquee-item--lime">250+ Units Managed</span>
        <span class="marquee-item marquee-item--violet">Riverside District</span>
        <span class="marquee-item">98% Renewal Rate</span>
        <span class="marquee-item marquee-item--sun">Cedar Park</span>
        <span class="marquee-item marquee-item--lime">24/7 Maintenance</span>
        <span class="marquee-item marquee-item--violet">Northgate</span>
        <span class="marquee-item">Pet-Friendly Buildings</span>
      </div>
    </div>
  </div>

  <!-- ================= FEATURED PROPERTIES ================= -->
  <section class="section" id="featured">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Featured listings</span>
        <h2>Available right now.</h2>
        <p class="lead">
          A snapshot of what is on the market this week. Every unit is inspected before move-in
          and backed by our 24/7 maintenance desk.
        </p>
      </div>

      <div class="prop-grid">

        <article class="prop-card prop-card--lg">
          <div class="prop-thumb">
            <span class="mockup-badge" style="position:absolute;top:1rem;left:1rem">Available Now</span>
            <span>Harbor View Lofts</span>
          </div>
          <div class="prop-body">
            <div class="prop-head">
              <div class="prop-title">Harbor View Lofts · Unit 14B</div>
            </div>
            <div class="prop-addr">218 Harbor Street, Riverside District</div>
            <div class="prop-specs">
              <span>2 Bedrooms</span><span>2 Bathrooms</span><span>1,050 sq ft</span><span>Pet Friendly</span>
            </div>
            <div class="prop-foot">
              <div class="prop-price">$2,450 <small>/ mo</small></div>
              <a href="/c/contact" class="btn btn-dark">Book a tour</a>
            </div>
          </div>
        </article>

        <article class="prop-card">
          <div class="prop-thumb">
            <span>Cedar Park</span>
          </div>
          <div class="prop-body">
            <div class="prop-head">
              <div class="prop-title">Cedar Park Townhomes · 7</div>
            </div>
            <div class="prop-addr">76 Cedar Park Row</div>
            <div class="prop-specs">
              <span>3 Bed</span><span>2.5 Bath</span><span>1,600 sq ft</span>
            </div>
            <div class="prop-foot">
              <div class="prop-price">$3,200 <small>/ mo</small></div>
              <span class="tag tag--coral">New</span>
            </div>
          </div>
        </article>

        <article class="prop-card">
          <div class="prop-thumb">
            <span>The Metropolitan</span>
          </div>
          <div class="prop-body">
            <div class="prop-head">
              <div class="prop-title">The Metropolitan · 902</div>
            </div>
            <div class="prop-addr">12 Metropolitan Plaza</div>
            <div class="prop-specs">
              <span>1 Bed</span><span>1 Bath</span><span>720 sq ft</span>
            </div>
            <div class="prop-foot">
              <div class="prop-price">$1,850 <small>/ mo</small></div>
              <span class="tag tag--lime">Pet OK</span>
            </div>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ================= BENTO: WHY RENT WITH US ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Why rent with us</span>
        <h2>Built around residents, not paperwork.</h2>
        <p class="lead">
          We rebuilt property management around the three things people complain about most:
          slow repairs, confusing payments, and being treated like a ticket number.
        </p>
      </div>

      <div class="bento">

        <div class="tile tile--coral">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3>24/7 maintenance tracking, end to end.</h3>
          <p>
            Submit a request from your phone and follow it the whole way — who was assigned,
            when they arrived, what was replaced. Our emergency line is answered by a human,
            every night of the year.
          </p>
        </div>

        <div class="tile tile--lime">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 17l6-6 4 4 8-8"/>
              <path d="M14 7h7v7"/>
            </svg>
          </div>
          <h3>4 hrs</h3>
          <p>Average maintenance response time, measured across the portfolio.</p>
        </div>

        <div class="tile tile--violet">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3>Secure online rent portal.</h3>
          <p>
            Pay by card or bank transfer, download statements, and renew your lease without
            printing a page. No convenience-fee surprises.
          </p>
        </div>

        <div class="tile tile--electric">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Real tenant care.</h3>
          <p>
            Every resident gets a named leasing contact and a maintenance coordinator. Move-in,
            renewals, and move-out are scheduled in writing — never improvised.
          </p>
        </div>

        <div class="tile tile--ink">
          <div class="tile-inner">
            <div>
              <h3>The numbers behind the promise.</h3>
              <p style="color:#a1a1aa;font-size:.9rem;margin-top:.4rem">
                Twelve years of managing homes in this city, and the data still guides every
                decision we make.
              </p>
            </div>
            <div>
              <div class="stat-value">250+</div>
              <div class="stat-label">Residential units under management</div>
            </div>
            <div>
              <div class="stat-value">98%</div>
              <div class="stat-label">Resident lease renewal rate</div>
            </div>
            <div>
              <div class="stat-value">12 yrs</div>
              <div class="stat-label">Managing property in the metro</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= PRICING ================= -->
  <section class="section" style="background:var(--surface);border-block:1.5px solid var(--border)">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Management plans</span>
        <h2>Simple, flat monthly pricing.</h2>
        <p class="lead">
          Pricing shown is our management fee for a typical two-bedroom unit. No percentage
          games, no surprise line items on your statement.
        </p>
      </div>

      <div class="pricing">

        <div class="plan">
          <div class="plan-name">Standard Rental</div>
          <p class="plan-desc">For owners with a single unit who want reliable placement and rent collection.</p>
          <div class="plan-price">$1,950 <small>per month · 2-bed equivalent</small></div>
          <ul>
            <li>Tenant screening &amp; lease preparation</li>
            <li>Online rent collection &amp; statements</li>
            <li>24/7 maintenance coordination</li>
            <li>Annual property inspection</li>
            <li>Year-end income summary</li>
          </ul>
          <a href="/c/contact" class="btn btn-ghost btn-block">Get started</a>
        </div>

        <div class="plan plan--featured">
          <span class="plan-tag">Most popular</span>
          <div class="plan-name">Premium Managed</div>
          <p class="plan-desc">Our most-chosen plan. Deeper oversight, faster response, and a named manager.</p>
          <div class="plan-price">$2,450 <small>per month · 2-bed equivalent</small></div>
          <ul>
            <li>Everything in Standard Rental</li>
            <li>Quarterly property inspections</li>
            <li>Priority maintenance dispatch</li>
            <li>Dedicated account manager</li>
            <li>Lease renewal negotiation</li>
            <li>Preventive upkeep scheduling</li>
          </ul>
          <a href="/c/contact" class="btn btn-primary btn-block">Get started</a>
        </div>

        <div class="plan">
          <div class="plan-name">Corporate Leases</div>
          <p class="plan-desc">For companies relocating staff or holding multi-unit portfolios in the city.</p>
          <div class="plan-price">$3,200 <small>per month · 2-bed equivalent</small></div>
          <ul>
            <li>Everything in Premium Managed</li>
            <li>Multi-unit portfolio discounts</li>
            <li>Custom lease &amp; invoicing terms</li>
            <li>Executive occupancy reporting</li>
            <li>Relocation &amp; onboarding coordination</li>
          </ul>
          <a href="/c/contact" class="btn btn-ghost btn-block">Talk to sales</a>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= BIG CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-block">
        <div>
          <h2>Ready to see a unit in person?</h2>
          <p>
            Tours run seven days a week, including evenings. Bring your questions — we will walk
            you through the lease line by line before you sign anything.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/contact" class="btn btn-primary btn-lg">Book a Tour</a>
          <a href="/c/about" class="btn btn-ghost btn-lg">Learn About Us</a>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true"></span>
          Premier<span style="color:var(--coral)">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed
          with transparent pricing and a maintenance team that shows up.
        </p>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/c/about">About</a></li>
          <li><a href="/c/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/c/privacy-policy">Privacy Policy</a></li>
          <li><a href="/c/terms-conditions">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+15550123456">(555) 012-3456</a></li>
          <li><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></li>
          <li><span>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</span></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 Premier Property Management. All rights reserved.</span>
      <span>Equal Housing Opportunity · Licensed Property Manager #PM-44821</span>
    </div>
  </div>
</footer>

</body>
</html>
`

export const style2About = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About PremierPM · 250+ Residential Units Managed in the City</title>
<meta name="description" content="Premier Property Management has managed 250+ residential units across the metro since 2012. Meet the team and see the milestones behind our transparent leasing model.">
<style>
/* ============================================================
   DESIGN TOKENS — Bold & Vibrant / Creative Studio
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0d0d12;
  --ink-2:#3a3a44;
  --muted:#71717a;
  --muted-2:#a1a1aa;

  --bg:#fdf7ef;
  --surface:#ffffff;
  --surface-2:#f5ede1;

  --coral:#ff4d2e;
  --coral-dark:#e63a1e;
  --violet:#7c3aed;
  --violet-dark:#6d28d9;
  --electric:#2563ff;
  --lime:#c8ff00;
  --sun:#ffd93d;

  --border:#ebe2d5;
  --border-2:#d9cdba;

  --radius-sm:10px;
  --radius:18px;
  --radius-lg:28px;
  --radius-pill:999px;

  --shadow-sm:0 2px 6px -1px rgb(13 13 18 / .06), 0 2px 4px -2px rgb(13 13 18 / .04);
  --shadow-md:0 18px 40px -18px rgb(13 13 18 / .22), 0 6px 14px -6px rgb(13 13 18 / .08);
  --shadow-lg:0 40px 80px -30px rgb(13 13 18 / .30);

  --max:1240px;
  --header-h:4.75rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:4px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:800;letter-spacing:-.035em;line-height:1.02;color:var(--ink)}
h1{font-size:clamp(2.5rem,7vw,5.25rem);letter-spacing:-.045em;line-height:.98}
h2{font-size:clamp(1.85rem,4vw,3rem);line-height:1.03}
h3{font-size:1.15rem;font-weight:700;letter-spacing:-.02em}
p{color:var(--ink-2)}
.lead{font-size:1.125rem;line-height:1.6;color:var(--ink-2)}
.accent{color:var(--coral)}

.mark{
  background-image:linear-gradient(180deg,transparent 58%,var(--lime) 58%,var(--lime) 92%,transparent 92%);
  padding:0 .08em;
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:6rem 0}
.section-tight{padding:3.5rem 0}

.eyebrow-pill{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.45rem 1rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1px solid var(--border);
  font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink);box-shadow:var(--shadow-sm);
}
.eyebrow-pill::before{
  content:"";width:.5rem;height:.5rem;border-radius:50%;background:var(--coral);
  box-shadow:0 0 0 4px rgba(255,77,46,.18);
}

.section-head{max-width:720px;margin-bottom:3.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.section-head h2{margin-bottom:1rem}
.section-head .lead{max-width:56ch}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(253,247,239,.82);
  backdrop-filter:saturate(180%) blur(14px);
  -webkit-backdrop-filter:saturate(180%) blur(14px);
  border-bottom:1px solid transparent;
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.15rem;letter-spacing:-.04em;color:var(--ink)}
.brand-mark{
  position:relative;flex:none;width:2rem;height:2rem;border-radius:9px;
  background:var(--ink);display:grid;place-items:center;color:var(--lime);
  font-size:.9rem;font-weight:900;
}
.brand-mark::after{content:"◆";font-size:.7rem;line-height:1}

.nav{display:flex;align-items:center;gap:.25rem}
.nav a{
  display:inline-block;padding:.55rem 1rem;border-radius:var(--radius-pill);
  font-size:.92rem;font-weight:600;color:var(--ink-2);
  transition:background .18s ease,color .18s ease;
}
.nav a:hover{color:var(--ink);background:var(--surface-2)}
.nav a[aria-current="page"]{color:#fff;background:var(--ink);font-weight:700}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.75rem;height:2.75rem;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  border:1px solid var(--border);border-radius:var(--radius-pill);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:2px;background:var(--ink);border-radius:2px;transition:transform .22s ease,opacity .22s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.85rem 1.6rem;border-radius:var(--radius-pill);
  font-size:.95rem;font-weight:700;letter-spacing:-.005em;
  border:1.5px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease,border-color .18s ease,color .18s ease;
}
.btn-primary{background:var(--coral);color:#fff;border-color:var(--coral);box-shadow:0 6px 18px -6px rgba(255,77,46,.55)}
.btn-primary:hover{background:var(--coral-dark);border-color:var(--coral-dark);transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(255,77,46,.7)}
.btn-dark{background:var(--ink);color:#fff;border-color:var(--ink)}
.btn-dark:hover{background:#000;transform:translateY(-2px);box-shadow:var(--shadow-md)}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--border-2)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
.btn-lg{padding:1.05rem 2rem;font-size:1rem}
.btn-block{width:100%}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:3.5rem 0 3rem;position:relative;overflow:hidden}
.page-hero::before{
  content:"";position:absolute;top:-40%;right:-20%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.10),transparent 62%);
  pointer-events:none;
}
.page-hero-inner{position:relative;z-index:1;max-width:900px}

.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:var(--muted);margin-bottom:1.5rem}
.crumbs a:hover{color:var(--coral)}
.crumbs span{color:var(--muted-2)}

.page-hero h1{margin:1.5rem 0 1.5rem;max-width:16ch}
.page-hero .lead{max-width:64ch}

.doc-meta{
  display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;
  margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border);
  font-size:.85rem;color:var(--muted);
}
.doc-meta li{display:flex;align-items:center;gap:.5rem}
.doc-meta li::before{content:"";width:.45rem;height:.45rem;border-radius:50%;background:var(--coral)}

/* ============================================================
   BENTO — MISSION, STATS, CULTURE
   ============================================================ */
.bento{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.25rem;
}

.tile{
  position:relative;
  border-radius:var(--radius-lg);
  padding:2rem 1.9rem 2.1rem;
  overflow:hidden;
  display:flex;flex-direction:column;
  min-height:240px;
  transition:transform .22s ease,box-shadow .22s ease;
}
.tile:hover{transform:translateY(-5px);box-shadow:var(--shadow-lg)}

.tile--coral{background:var(--coral);color:#fff;grid-column:span 2}
.tile--violet{background:var(--violet);color:#fff}
.tile--electric{background:var(--electric);color:#fff}
.tile--lime{background:var(--lime);color:var(--ink)}
.tile--sun{background:var(--sun);color:var(--ink)}
.tile--ink{background:var(--ink);color:#fff;grid-column:span 3}

.tile-icon{
  width:3rem;height:3rem;border-radius:14px;
  background:rgba(255,255,255,.18);
  display:grid;place-items:center;margin-bottom:auto;
}
.tile--lime .tile-icon,
.tile--sun .tile-icon{background:rgba(13,13,18,.10)}

.tile h3{font-size:1.45rem;font-weight:800;letter-spacing:-.03em;margin:1.75rem 0 .6rem;line-height:1.15}
.tile p{font-size:.98rem;line-height:1.55;color:inherit;opacity:.9}

.tile .big-num{
  font-size:clamp(3.5rem,7vw,5rem);
  font-weight:900;letter-spacing:-.055em;line-height:.9;
  margin-top:auto;
}
.tile .big-label{
  font-size:.9rem;font-weight:600;margin-top:.6rem;line-height:1.45;opacity:.85;
}

.tile--ink .tile-inner{
  display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:2rem;align-items:center;
}
.tile--ink h3{margin:0 0 .4rem;font-size:1.35rem}
.tile--ink .stat-value{font-size:2.5rem;font-weight:900;letter-spacing:-.05em;line-height:1;color:var(--lime)}
.tile--ink .stat-label{font-size:.8rem;color:#a1a1aa;margin-top:.5rem;line-height:1.45}

/* ============================================================
   TEAM — BENTO
   ============================================================ */
.team-bento{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.25rem;
}

.team-card{
  position:relative;
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius-lg);
  padding:1.9rem 1.8rem 2rem;
  display:flex;flex-direction:column;
  min-height:260px;
  transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;
  overflow:hidden;
}
.team-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-lg);border-color:var(--border-2)}

.team-card--wide{grid-column:span 2}

/* Colored top bar accent */
.team-card::before{
  content:"";position:absolute;top:0;left:0;right:0;height:6px;
}
.team-card--coral::before{background:var(--coral)}
.team-card--violet::before{background:var(--violet)}
.team-card--electric::before{background:var(--electric)}
.team-card--lime::before{background:var(--lime)}
.team-card--sun::before{background:var(--sun)}

.avatar{
  flex:none;width:4.25rem;height:4.25rem;border-radius:16px;
  display:grid;place-items:center;
  font-weight:900;font-size:1.35rem;letter-spacing:-.02em;
  margin-bottom:1.35rem;
}
.avatar--coral{background:var(--coral);color:#fff}
.avatar--violet{background:var(--violet);color:#fff}
.avatar--electric{background:var(--electric);color:#fff}
.avatar--lime{background:var(--lime);color:var(--ink)}
.avatar--sun{background:var(--sun);color:var(--ink)}

.team-name{font-size:1.2rem;font-weight:800;letter-spacing:-.025em;line-height:1.2}
.team-role{
  display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
  color:var(--coral);margin:.5rem 0 .9rem;
}
.team-card--violet .team-role{color:var(--violet-dark)}
.team-card--electric .team-role{color:var(--electric)}
.team-card--lime .team-role{color:#6b7a00}
.team-card--sun .team-role{color:#8a6d00}

.team-bio{font-size:.92rem;color:var(--ink-2);line-height:1.55;margin-top:auto}

.team-meta{
  display:flex;flex-wrap:wrap;gap:.4rem .75rem;
  margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);
  font-size:.78rem;color:var(--muted);
}

/* ============================================================
   TIMELINE
   ============================================================ */
.timeline{
  position:relative;
  max-width:820px;
  margin-inline:auto;
}

.timeline-item{
  display:grid;
  grid-template-columns:7rem 1fr;
  gap:2.25rem;
  position:relative;
  padding-bottom:2.5rem;
}
.timeline-item:last-child{padding-bottom:0}

.timeline-year{
  text-align:right;
  padding-top:.35rem;
}
.timeline-year .yr{
  display:inline-block;
  font-size:.95rem;font-weight:900;letter-spacing:-.02em;
  padding:.35rem .85rem;border-radius:var(--radius-pill);
  white-space:nowrap;
}
.timeline-year .yr--coral{background:var(--coral);color:#fff}
.timeline-year .yr--lime{background:var(--lime);color:var(--ink)}
.timeline-year .yr--violet{background:var(--violet);color:#fff}
.timeline-year .yr--electric{background:var(--electric);color:#fff}
.timeline-year .yr--sun{background:var(--sun);color:var(--ink)}

.timeline-body{
  position:relative;
  padding-left:2.25rem;
  border-left:2px solid var(--border);
  padding-bottom:.25rem;
}
.timeline-body::before{
  content:"";position:absolute;left:-9px;top:.5rem;
  width:16px;height:16px;border-radius:50%;
  background:var(--bg);border:3px solid var(--coral);
  transition:transform .2s ease;
}
.timeline-item:hover .timeline-body::before{transform:scale(1.25)}

.timeline-item:nth-child(2) .timeline-body::before{border-color:var(--lime)}
.timeline-item:nth-child(3) .timeline-body::before{border-color:var(--violet)}
.timeline-item:nth-child(4) .timeline-body::before{border-color:var(--electric)}
.timeline-item:nth-child(5) .timeline-body::before{border-color:var(--sun);background:var(--sun)}
.timeline-item:nth-child(5) .timeline-body::before{box-shadow:0 0 0 6px rgba(255,217,61,.28)}

.timeline-body h3{font-size:1.1rem;font-weight:800;letter-spacing:-.02em;margin-bottom:.5rem;line-height:1.25}
.timeline-body p{font-size:.93rem;color:var(--ink-2);line-height:1.6}

/* ============================================================
   CTA BLOCK
   ============================================================ */
.cta-block{
  position:relative;overflow:hidden;
  border-radius:var(--radius-lg);
  padding:4.5rem 3.5rem;
  background:linear-gradient(135deg,var(--violet) 0%,var(--coral) 100%);
  color:#fff;
  display:grid;grid-template-columns:1.4fr 1fr;gap:3rem;align-items:center;
}
.cta-block::before{
  content:"";position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 15% 20%,rgba(255,255,255,.22),transparent 42%),
    radial-gradient(circle at 85% 80%,rgba(200,255,0,.18),transparent 42%);
  pointer-events:none;
}
.cta-block > *{position:relative;z-index:1}
.cta-block h2{color:#fff;font-size:clamp(2rem,4vw,3rem);max-width:18ch}
.cta-block p{color:rgba(255,255,255,.88);max-width:48ch;margin-top:1rem;font-size:1.0625rem}
.cta-actions{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:flex-end}
.cta-block .btn-primary{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 8px 24px -8px rgba(0,0,0,.4)}
.cta-block .btn-primary:hover{background:#fff;color:var(--coral-dark);transform:translateY(-2px)}
.cta-block .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}
.cta-block .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--ink);color:#fff;padding:5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.3fr;gap:3rem}
.footer-brand .brand{color:#fff}
.footer-brand .brand-mark{background:var(--coral);color:#fff}
.footer-brand p{color:#a1a1aa;font-size:.9rem;margin-top:1.25rem;max-width:34ch;line-height:1.6}
.footer-col h4{
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  color:#71717a;margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.7rem}
.footer-col a,.footer-col span{font-size:.92rem;color:#d4d4d8}
.footer-col a:hover{color:var(--lime)}
.footer-bottom{
  margin-top:4rem;padding-top:1.75rem;border-top:1px solid #27272a;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.82rem;color:#71717a;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .bento{grid-template-columns:repeat(2,1fr)}
  .tile--coral{grid-column:span 2}
  .tile--ink{grid-column:span 2}
  .tile--ink .tile-inner{grid-template-columns:1fr 1fr;gap:1.5rem}

  .team-bento{grid-template-columns:repeat(2,1fr)}
  .team-card--wide{grid-column:span 2}
}

@media (max-width:960px){
  .cta-block{grid-template-columns:1fr;padding:3rem 2rem;gap:2rem}
  .cta-actions{justify-content:flex-start}
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.35rem;
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    margin:0 1rem;padding:.75rem;
    box-shadow:var(--shadow-md);
  }
  .nav a{padding:.75rem 1rem;border-radius:var(--radius-sm)}
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
}

@media (max-width:780px){
  .bento{grid-template-columns:1fr}
  .tile--coral,
  .tile--violet,
  .tile--electric,
  .tile--lime,
  .tile--sun,
  .tile--ink{grid-column:span 1}
  .tile--ink .tile-inner{grid-template-columns:1fr;gap:1.5rem}

  .team-bento{grid-template-columns:1fr}
  .team-card--wide{grid-column:span 1}
}

@media (max-width:680px){
  .section{padding:4rem 0}
  .section-tight{padding:2.75rem 0}
  .page-hero{padding:2.5rem 0 2rem}
  .footer-grid{grid-template-columns:1fr;gap:2rem}

  .timeline-item{grid-template-columns:1fr;gap:1rem;padding-bottom:2rem}
  .timeline-year{text-align:left}
  .timeline-body{padding-left:1.5rem}
  .timeline-body::before{left:-8px;width:14px;height:14px}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .tile{padding:1.6rem 1.5rem 1.75rem;min-height:auto}
  .team-card{padding:1.6rem 1.5rem 1.75rem;min-height:auto}
  .cta-block{padding:2.25rem 1.5rem}
  .cta-block .cta-actions{width:100%}
  .cta-block .cta-actions .btn{width:100%}
  .doc-meta{flex-direction:column;gap:.4rem}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">
  <div class="container header-inner">
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <div class="header-bar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        Premier<span style="color:var(--coral)">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about" aria-current="page">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/privacy-policy">Privacy</a>
        <a href="/c/terms-conditions">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-dark header-cta">Book a Tour</a>
        <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
          <span></span><span></span><span></span>
        </label>
      </div>
    </div>
  </div>
</header>

<main>

  <!-- ================= PAGE HERO ================= -->
  <section class="page-hero">
    <div class="container page-hero-inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>About</span>
      </nav>

      <span class="eyebrow-pill">About PremierPM</span>

      <h1>We manage homes the way we would want <span class="mark">ours</span> managed.</h1>

      <p class="lead">
        Premier Property Management has looked after residential buildings in this city since 2012.
        What began as twelve units in the downtown corridor is now a portfolio of 250+ homes,
        operated by leasing agents, maintenance coordinators, and property managers who live in
        the neighborhoods they serve.
      </p>

      <ul class="doc-meta">
        <li>Founded 2012 · Downtown Core</li>
        <li>250+ residential units under management</li>
        <li>4 neighborhoods served across the metro</li>
      </ul>
    </div>
  </section>

  <!-- ================= BENTO — MISSION, STATS, CULTURE ================= -->
  <section class="section" style="padding-top:2rem">
    <div class="container">
      <div class="bento">

        <!-- Story -->
        <div class="tile tile--coral">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 21h18"/>
              <path d="M5 21V7l7-4 7 4v14"/>
              <path d="M9 21v-6h6v6"/>
            </svg>
          </div>
          <h3>Twelve units on a single block. Then a whole city.</h3>
          <p>
            We started in 2012 with one renovated walk-up and a simple observation: most people do
            not dislike renting — they dislike being ignored. Repairs sat for weeks, statements
            arrived without explanation, and renewals felt like ultimatums. We built the company
            around fixing exactly that, one building at a time.
          </p>
        </div>

        <!-- Big stat -->
        <div class="tile tile--lime">
          <div class="big-num">250+</div>
          <div class="big-label">Residential units under active management across the metro.</div>
        </div>

        <!-- Mission -->
        <div class="tile tile--violet">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
          <h3>Our mission</h3>
          <p>
            Well-maintained homes and transparent, professional service to every resident and owner
            we work with — clear pricing, documented processes, and a human on the other end of the
            line.
          </p>
        </div>

        <!-- Where we work -->
        <div class="tile tile--electric">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h3>Where we work</h3>
          <p>
            Downtown Core · Riverside District · Cedar Park · Northgate. We stay deliberately local
            so our crews are close and our knowledge of each block stays current.
          </p>
        </div>

        <!-- Culture -->
        <div class="tile tile--sun">
          <div class="tile-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h3>Community-first culture</h3>
          <p>
            Resident appreciation events, neighborhood cleanups, and partnerships with local
            vendors. We hire people who care about the blocks they manage.
          </p>
        </div>

        <!-- Full-width stats strip -->
        <div class="tile tile--ink">
          <div class="tile-inner">
            <div>
              <h3>The numbers behind the promise.</h3>
              <p style="color:#a1a1aa;font-size:.9rem;margin-top:.4rem">
                Twelve years of managing homes in this city, and the data still guides every
                decision we make.
              </p>
            </div>
            <div>
              <div class="stat-value">98%</div>
              <div class="stat-label">Resident lease renewal rate across the portfolio</div>
            </div>
            <div>
              <div class="stat-value">&lt; 4 hrs</div>
              <div class="stat-label">Average maintenance response time</div>
            </div>
            <div>
              <div class="stat-value">12 yrs</div>
              <div class="stat-label">Managing property in the metro area</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= TEAM BENTO ================= -->
  <section class="section" style="background:var(--surface);border-block:1.5px solid var(--border)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Leadership team</span>
        <h2>The people you will actually talk to.</h2>
        <p class="lead">
          Four people run day-to-day operations at PremierPM. Every one of them is reachable
          through the office line — no call-center routing, no ticket queues.
        </p>
      </div>

      <div class="team-bento">

        <!-- Managing Director (wide) -->
        <div class="team-card team-card--coral team-card--wide">
          <div class="avatar avatar--coral" aria-hidden="true">MD</div>
          <div class="team-name">Morgan Delacroix</div>
          <div class="team-role">Managing Director</div>
          <p class="team-bio">
            Founded PremierPM in 2012 and still reviews every owner statement before it goes out.
            Oversees portfolio strategy, building acquisitions, and long-term capital planning for
            every property under management.
          </p>
          <div class="team-meta">
            <span>· 18 years in property management</span>
            <span>· Licensed broker</span>
            <span>· Downtown Core resident</span>
          </div>
        </div>

        <!-- Lead Leasing Agent -->
        <div class="team-card team-card--violet">
          <div class="avatar avatar--violet" aria-hidden="true">LC</div>
          <div class="team-name">Leah Chen</div>
          <div class="team-role">Lead Leasing Agent</div>
          <p class="team-bio">
            Runs showings and applications for every available unit. Twelve years in residential
            leasing and fair-housing compliance.
          </p>
          <div class="team-meta">
            <span>· 12 years leasing</span>
            <span>· Fair-housing certified</span>
          </div>
        </div>

        <!-- Head of Maintenance -->
        <div class="team-card team-card--electric">
          <div class="avatar avatar--electric" aria-hidden="true">JO</div>
          <div class="team-name">James Okafor</div>
          <div class="team-role">Head of Maintenance</div>
          <p class="team-bio">
            Manages the in-house maintenance crew and the vendor network. Owns our 24/7 emergency
            dispatch schedule, personally.
          </p>
          <div class="team-meta">
            <span>· 15 years in facilities</span>
            <span>· EPA certified</span>
          </div>
        </div>

        <!-- Tenant Relations (wide) -->
        <div class="team-card team-card--lime team-card--wide">
          <div class="avatar avatar--lime" aria-hidden="true">SR</div>
          <div class="team-name">Sofia Ramirez</div>
          <div class="team-role">Tenant Relations Manager</div>
          <p class="team-bio">
            Handles move-in coordination, lease renewals, and resident concerns. Sofia is your
            first call when something needs resolving — and the person who makes sure it actually
            gets resolved. She also runs our resident appreciation events and neighborhood
            cleanups.
          </p>
          <div class="team-meta">
            <span>· 9 years in resident services</span>
            <span>· Bilingual: English / Spanish</span>
            <span>· Cedar Park resident</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= TIMELINE ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Company milestones</span>
        <h2>How we grew, one building at a time.</h2>
        <p class="lead">
          Every milestone below came from the same playbook: take on a property, inspect it
          thoroughly, document the standard, and manage it properly.
        </p>
      </div>

      <div class="timeline">

        <div class="timeline-item">
          <div class="timeline-year"><span class="yr yr--coral">2012</span></div>
          <div class="timeline-body">
            <h3>Company founded with 12 units</h3>
            <p>
              PremierPM opens with a single renovated walk-up in the Downtown Core. First written
              maintenance standard drafted for the building — a document we still update every
              year.
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-year"><span class="yr yr--lime">2015</span></div>
          <div class="timeline-body">
            <h3>75 units and the online tenant portal</h3>
            <p>
              Portfolio reaches 75 managed units across three neighborhoods. Online rent payment
              and maintenance requests replace paper notices entirely — and our response time
              drops by half.
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-year"><span class="yr yr--violet">2018</span></div>
          <div class="timeline-body">
            <h3>Corporate leasing and mixed-use expansion</h3>
            <p>
              Added corporate relocation leases and expanded into mixed-use buildings, surpassing
              150 units under management and hiring a dedicated tenant relations lead.
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-year"><span class="yr yr--electric">2022</span></div>
          <div class="timeline-body">
            <h3>250+ units and 24/7 dispatch</h3>
            <p>
              Crossed 250 managed units, opened a second office in Northgate, and launched a
              round-the-clock emergency maintenance line staffed by a human responder.
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-year"><span class="yr yr--sun">2025</span></div>
          <div class="timeline-body">
            <h3>Smart access and preventive upkeep</h3>
            <p>
              Rolling out smart locks and energy monitoring across premium managed units,
              alongside a scheduled preventive maintenance program for every building in the
              portfolio.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-block">
        <div>
          <h2>Want to see how we operate up close?</h2>
          <p>
            Tour a unit, meet the leasing team, and read a sample lease before you commit. We are
            happy to answer the detailed questions.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/contact" class="btn btn-primary btn-lg">Book a Tour</a>
          <a href="/" class="btn btn-ghost btn-lg">Browse Available Units</a>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true"></span>
          Premier<span style="color:var(--coral)">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed
          with transparent pricing and a maintenance team that shows up.
        </p>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/c/about">About</a></li>
          <li><a href="/c/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/c/privacy-policy">Privacy Policy</a></li>
          <li><a href="/c/terms-conditions">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+15550123456">(555) 012-3456</a></li>
          <li><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></li>
          <li><span>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</span></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 Premier Property Management. All rights reserved.</span>
      <span>Equal Housing Opportunity · Licensed Property Manager #PM-44821</span>
    </div>
  </div>
</footer>

</body>
</html>
`

export const style2Contact = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contact PremierPM · Leasing, Maintenance &amp; Corporate Inquiries</title>
<meta name="description" content="Reach the Premier Property Management leasing office. Office address, operating hours, 24/7 emergency maintenance hotline, and a friendly direct inquiry form.">
<style>
/* ============================================================
   DESIGN TOKENS — Bold & Vibrant / Creative Studio
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0d0d12;
  --ink-2:#3a3a44;
  --muted:#71717a;
  --muted-2:#a1a1aa;

  --bg:#fdf7ef;
  --surface:#ffffff;
  --surface-2:#f5ede1;

  --coral:#ff4d2e;
  --coral-dark:#e63a1e;
  --violet:#7c3aed;
  --violet-dark:#6d28d9;
  --electric:#2563ff;
  --lime:#c8ff00;
  --sun:#ffd93d;

  --border:#ebe2d5;
  --border-2:#d9cdba;

  --radius-sm:10px;
  --radius:18px;
  --radius-lg:28px;
  --radius-pill:999px;

  --shadow-sm:0 2px 6px -1px rgb(13 13 18 / .06), 0 2px 4px -2px rgb(13 13 18 / .04);
  --shadow-md:0 18px 40px -18px rgb(13 13 18 / .22), 0 6px 14px -6px rgb(13 13 18 / .08);
  --shadow-lg:0 40px 80px -30px rgb(13 13 18 / .30);

  --max:1240px;
  --header-h:4.75rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:4px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:800;letter-spacing:-.035em;line-height:1.02;color:var(--ink)}
h1{font-size:clamp(2.5rem,7vw,5rem);letter-spacing:-.045em;line-height:.98}
h2{font-size:clamp(1.85rem,4vw,3rem);line-height:1.03}
h3{font-size:1.15rem;font-weight:700;letter-spacing:-.02em}
p{color:var(--ink-2)}
.lead{font-size:1.125rem;line-height:1.6;color:var(--ink-2)}
.accent{color:var(--coral)}

.mark{
  background-image:linear-gradient(180deg,transparent 58%,var(--lime) 58%,var(--lime) 92%,transparent 92%);
  padding:0 .08em;
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:820px;margin-inline:auto;padding-inline:1.5rem}
.section{padding:6rem 0}
.section-tight{padding:3.5rem 0}

.eyebrow-pill{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.45rem 1rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1px solid var(--border);
  font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink);box-shadow:var(--shadow-sm);
}
.eyebrow-pill::before{
  content:"";width:.5rem;height:.5rem;border-radius:50%;background:var(--coral);
  box-shadow:0 0 0 4px rgba(255,77,46,.18);
}

.section-head{max-width:720px;margin-bottom:3.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.section-head h2{margin-bottom:1rem}
.section-head .lead{max-width:56ch}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(253,247,239,.82);
  backdrop-filter:saturate(180%) blur(14px);
  -webkit-backdrop-filter:saturate(180%) blur(14px);
  border-bottom:1px solid transparent;
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.15rem;letter-spacing:-.04em;color:var(--ink)}
.brand-mark{
  position:relative;flex:none;width:2rem;height:2rem;border-radius:9px;
  background:var(--ink);display:grid;place-items:center;color:var(--lime);
  font-size:.9rem;font-weight:900;
}
.brand-mark::after{content:"◆";font-size:.7rem;line-height:1}

.nav{display:flex;align-items:center;gap:.25rem}
.nav a{
  display:inline-block;padding:.55rem 1rem;border-radius:var(--radius-pill);
  font-size:.92rem;font-weight:600;color:var(--ink-2);
  transition:background .18s ease,color .18s ease;
}
.nav a:hover{color:var(--ink);background:var(--surface-2)}
.nav a[aria-current="page"]{color:#fff;background:var(--ink);font-weight:700}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.75rem;height:2.75rem;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  border:1px solid var(--border);border-radius:var(--radius-pill);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:2px;background:var(--ink);border-radius:2px;transition:transform .22s ease,opacity .22s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.85rem 1.6rem;border-radius:var(--radius-pill);
  font-size:.95rem;font-weight:700;letter-spacing:-.005em;
  border:1.5px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease,border-color .18s ease,color .18s ease;
}
.btn-primary{background:var(--coral);color:#fff;border-color:var(--coral);box-shadow:0 6px 18px -6px rgba(255,77,46,.55)}
.btn-primary:hover{background:var(--coral-dark);border-color:var(--coral-dark);transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(255,77,46,.7)}
.btn-dark{background:var(--ink);color:#fff;border-color:var(--ink)}
.btn-dark:hover{background:#000;transform:translateY(-2px);box-shadow:var(--shadow-md)}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--border-2)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
.btn-lg{padding:1.05rem 2rem;font-size:1rem}
.btn-block{width:100%}

/* ============================================================
   PAGE HERO — centered, conversational
   ============================================================ */
.page-hero{
  padding:4rem 0 3rem;
  position:relative;
  overflow:hidden;
  text-align:center;
}
.page-hero::before{
  content:"";position:absolute;top:-30%;left:-10%;
  width:700px;height:700px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,77,46,.10),transparent 62%);
  pointer-events:none;
}
.page-hero::after{
  content:"";position:absolute;bottom:-40%;right:-10%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.10),transparent 62%);
  pointer-events:none;
}
.page-hero-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}

.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:var(--muted);margin-bottom:1.5rem;justify-content:center}
.crumbs a:hover{color:var(--coral)}
.crumbs span{color:var(--muted-2)}

.page-hero h1{max-width:15ch;margin:1.5rem 0 1.5rem}
.page-hero .lead{max-width:60ch;margin-bottom:2rem}

/* Quick contact chips */
.quick-chips{
  display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;margin-top:.5rem;
}
.chip{
  display:inline-flex;align-items:center;gap:.6rem;
  padding:.65rem 1.15rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1.5px solid var(--border);
  font-size:.88rem;font-weight:600;color:var(--ink);
  box-shadow:var(--shadow-sm);
  transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
}
.chip:hover{transform:translateY(-2px);border-color:var(--coral);box-shadow:var(--shadow-md)}
.chip-dot{
  width:.55rem;height:.55rem;border-radius:50%;flex:none;
}
.chip-dot--coral{background:var(--coral);box-shadow:0 0 0 4px rgba(255,77,46,.18)}
.chip-dot--lime{background:var(--lime);box-shadow:0 0 0 4px rgba(200,255,0,.28)}
.chip-dot--violet{background:var(--violet);box-shadow:0 0 0 4px rgba(124,58,237,.18)}

/* ============================================================
   FORM SECTION — centered card
   ============================================================ */
.form-section{
  padding:2rem 0 6rem;
  position:relative;
}
.form-halo{
  position:relative;
  max-width:820px;margin-inline:auto;
}
.form-halo::before{
  content:"";position:absolute;inset:-8% -8%;
  background:
    radial-gradient(circle at 20% 10%,rgba(255,77,46,.16),transparent 45%),
    radial-gradient(circle at 80% 90%,rgba(124,58,237,.16),transparent 45%);
  border-radius:50%;
  filter:blur(40px);
  z-index:0;
  pointer-events:none;
}

.form-card{
  position:relative;
  z-index:1;
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius-lg);
  padding:3rem 2.75rem 2.75rem;
  box-shadow:var(--shadow-lg);
}

.form-card-header{
  text-align:center;
  margin-bottom:2.5rem;
}
.form-card-header .eyebrow-pill{margin-bottom:1.25rem}
.form-card-header h2{font-size:clamp(1.65rem,3.2vw,2.25rem);margin-bottom:.75rem}
.form-card-header p{font-size:1rem;color:var(--muted);max-width:50ch;margin-inline:auto}

/* Inquiry type — colorful radio pills */
.inquiry-group{
  display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:2rem;
  justify-content:center;
}
.inquiry-group input[type="radio"]{
  position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;
}
.inquiry-option{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.7rem 1.2rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1.5px solid var(--border);
  font-size:.88rem;font-weight:700;letter-spacing:-.01em;
  color:var(--ink-2);cursor:pointer;
  transition:transform .16s ease,border-color .16s ease,background .16s ease,color .16s ease,box-shadow .16s ease;
}
.inquiry-option:hover{border-color:var(--border-2);transform:translateY(-2px)}
.inquiry-option::before{
  content:"";width:.6rem;height:.6rem;border-radius:50%;
  background:var(--border-2);flex:none;
  transition:background .16s ease,box-shadow .16s ease;
}

/* Selected states with brand colors */
.inquiry-group input[type="radio"]:checked + .inquiry-option{
  color:#fff;border-color:transparent;transform:translateY(-2px);
  box-shadow:0 8px 20px -8px rgba(255,77,46,.55);
}
.inquiry-group input[type="radio"]:checked + .inquiry-option::before{
  background:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.35);
}
.inquiry-group input[type="radio"]#type-general:checked + .inquiry-option{background:var(--coral)}
.inquiry-group input[type="radio"]#type-viewing:checked + .inquiry-option{background:var(--violet);box-shadow:0 8px 20px -8px rgba(124,58,237,.55)}
.inquiry-group input[type="radio"]#type-maintenance:checked + .inquiry-option{background:var(--electric);box-shadow:0 8px 20px -8px rgba(37,99,255,.55)}
.inquiry-group input[type="radio"]#type-application:checked + .inquiry-option{background:var(--ink);box-shadow:0 8px 20px -8px rgba(13,13,18,.45)}
.inquiry-group input[type="radio"]:focus-visible + .inquiry-option{outline:3px solid var(--violet);outline-offset:3px}

/* Fields with floating labels */
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.field{position:relative}

.field input,
.field select,
.field textarea{
  width:100%;
  padding:1.6rem 1.1rem .6rem;
  border:1.5px solid var(--border);
  border-radius:var(--radius);
  background:var(--bg);
  font-size:1rem;
  line-height:1.4;
  color:var(--ink);
  transition:border-color .18s ease,background .18s ease,box-shadow .18s ease;
}

.field textarea{
  resize:vertical;
  min-height:150px;
  padding-top:1.8rem;
  line-height:1.55;
}

.field select{
  appearance:none;
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right 1.1rem center;
  padding-right:2.75rem;
  cursor:pointer;
}

.field label{
  position:absolute;
  left:1.1rem;
  top:50%;
  transform:translateY(-50%);
  font-size:.95rem;
  font-weight:500;
  color:var(--muted);
  pointer-events:none;
  transition:top .18s ease,transform .18s ease,font-size .18s ease,color .18s ease,letter-spacing .18s ease;
}

.field textarea + label{
  top:1.25rem;
  transform:none;
}

/* Floating trigger */
.field input:focus + label,
.field input:not(:placeholder-shown) + label,
.field textarea:focus + label,
.field textarea:not(:placeholder-shown) + label,
.field select:focus + label,
.field select:valid + label{
  top:.65rem;
  transform:none;
  font-size:.68rem;
  font-weight:800;
  letter-spacing:.09em;
  text-transform:uppercase;
  color:var(--coral);
}

/* Focused field border */
.field input:focus,
.field select:focus,
.field textarea:focus{
  outline:none;
  border-color:var(--coral);
  background:var(--surface);
  box-shadow:0 0 0 4px rgba(255,77,46,.14);
}

.field input::placeholder,
.field textarea::placeholder{color:transparent}

/* Submit area */
.form-submit{margin-top:1.75rem}
.form-submit .btn{width:100%}

.form-microcopy{
  display:flex;align-items:flex-start;gap:.6rem;
  margin-top:1.1rem;
  font-size:.85rem;color:var(--muted);line-height:1.55;
  text-align:left;
}
.form-microcopy::before{
  content:"";flex:none;width:1.1rem;height:1.1rem;margin-top:.1rem;
  border-radius:50%;
  background:var(--lime);
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%230d0d12' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:center;
}

/* ============================================================
   COMMUNITY / SOCIAL
   ============================================================ */
.community-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1.15rem;
}

.social-card{
  position:relative;
  border-radius:var(--radius-lg);
  padding:1.9rem 1.65rem 1.75rem;
  min-height:190px;
  display:flex;flex-direction:column;
  color:#fff;
  overflow:hidden;
  transition:transform .22s ease,box-shadow .22s ease;
}
.social-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}

.social-card--coral{background:var(--coral)}
.social-card--violet{background:var(--violet)}
.social-card--electric{background:var(--electric)}
.social-card--ink{background:var(--ink)}
.social-card--lime{background:var(--lime);color:var(--ink)}

.social-card::after{
  content:"";position:absolute;right:-30px;bottom:-30px;
  width:120px;height:120px;border-radius:50%;
  background:rgba(255,255,255,.10);
  pointer-events:none;
}

.social-icon{
  width:2.75rem;height:2.75rem;border-radius:14px;
  background:rgba(255,255,255,.20);
  display:grid;place-items:center;
  margin-bottom:auto;
  color:#fff;
}
.social-card--lime .social-icon{background:rgba(13,13,18,.12);color:var(--ink)}

.social-name{
  font-size:1.05rem;font-weight:800;letter-spacing:-.02em;
  margin-top:1.5rem;
}
.social-handle{
  font-size:.82rem;opacity:.85;margin-top:.15rem;
  font-weight:500;
}
.social-cta{
  display:inline-flex;align-items:center;gap:.35rem;
  margin-top:.85rem;
  font-size:.82rem;font-weight:800;letter-spacing:.02em;
  position:relative;z-index:1;
}
.social-cta::after{content:"→";transition:transform .18s ease}
.social-card:hover .social-cta::after{transform:translateX(4px)}

/* ============================================================
   OFFICE BENTO
   ============================================================ */
.office-bento{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.25rem;
}

.office-tile{
  position:relative;
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius-lg);
  padding:1.9rem 1.8rem 2rem;
  transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;
}
.office-tile:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);border-color:var(--border-2)}

.office-tile--wide{grid-column:span 2}
.office-tile--dark{background:var(--ink);border-color:var(--ink);color:#fff}
.office-tile--dark .office-label{color:var(--lime)}
.office-tile--dark p,
.office-tile--dark address{color:#d4d4d8}
.office-tile--dark .office-value{color:#fff}

.office-icon{
  width:2.75rem;height:2.75rem;border-radius:14px;
  display:grid;place-items:center;
  margin-bottom:1.25rem;
  background:var(--bg);border:1px solid var(--border);
  color:var(--coral);
}
.office-tile--dark .office-icon{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.14);color:var(--lime)}

.office-label{
  font-size:.68rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;
  color:var(--muted-2);margin-bottom:.5rem;
}
.office-value{
  font-size:1.05rem;font-weight:800;letter-spacing:-.015em;line-height:1.3;
  color:var(--ink);
}
.office-value a{border-bottom:2px solid var(--lime);transition:color .16s ease}
.office-value a:hover{color:var(--coral)}

.office-tile p{font-size:.9rem;color:var(--ink-2);margin-top:.85rem;line-height:1.55}

.hours-list{margin-top:1rem;display:grid;gap:.55rem}
.hours-list li{
  display:flex;justify-content:space-between;gap:1rem;
  font-size:.9rem;
  padding-bottom:.55rem;
  border-bottom:1px solid var(--border);
}
.hours-list li:last-child{border-bottom:0;padding-bottom:0}
.hours-list .day{color:var(--muted);font-weight:500}
.hours-list .time{color:var(--ink);font-weight:700}
.office-tile--dark .hours-list li{border-color:rgba(255,255,255,.12)}
.office-tile--dark .hours-list .day{color:#a1a1aa}
.office-tile--dark .hours-list .time{color:#fff}

/* ============================================================
   CTA BLOCK
   ============================================================ */
.cta-block{
  position:relative;overflow:hidden;
  border-radius:var(--radius-lg);
  padding:4.5rem 3.5rem;
  background:linear-gradient(135deg,var(--violet) 0%,var(--coral) 100%);
  color:#fff;
  display:grid;grid-template-columns:1.4fr 1fr;gap:3rem;align-items:center;
}
.cta-block::before{
  content:"";position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 15% 20%,rgba(255,255,255,.22),transparent 42%),
    radial-gradient(circle at 85% 80%,rgba(200,255,0,.18),transparent 42%);
  pointer-events:none;
}
.cta-block > *{position:relative;z-index:1}
.cta-block h2{color:#fff;font-size:clamp(2rem,4vw,3rem);max-width:18ch}
.cta-block p{color:rgba(255,255,255,.88);max-width:48ch;margin-top:1rem;font-size:1.0625rem}
.cta-actions{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:flex-end}
.cta-block .btn-primary{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 8px 24px -8px rgba(0,0,0,.4)}
.cta-block .btn-primary:hover{background:#fff;color:var(--coral-dark);transform:translateY(-2px)}
.cta-block .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}
.cta-block .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--ink);color:#fff;padding:5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.3fr;gap:3rem}
.footer-brand .brand{color:#fff}
.footer-brand .brand-mark{background:var(--coral);color:#fff}
.footer-brand p{color:#a1a1aa;font-size:.9rem;margin-top:1.25rem;max-width:34ch;line-height:1.6}
.footer-col h4{
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  color:#71717a;margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.7rem}
.footer-col a,.footer-col span{font-size:.92rem;color:#d4d4d8}
.footer-col a:hover{color:var(--lime)}
.footer-bottom{
  margin-top:4rem;padding-top:1.75rem;border-top:1px solid #27272a;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.82rem;color:#71717a;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .community-grid{grid-template-columns:repeat(2,1fr)}
  .office-bento{grid-template-columns:repeat(2,1fr)}
  .office-tile--wide{grid-column:span 2}
}

@media (max-width:960px){
  .cta-block{grid-template-columns:1fr;padding:3rem 2rem;gap:2rem}
  .cta-actions{justify-content:flex-start}
  .footer-grid{grid-template-columns:1fr 1fr}
  .form-card{padding:2.5rem 2rem 2.25rem}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.35rem;
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    margin:0 1rem;padding:.75rem;
    box-shadow:var(--shadow-md);
  }
  .nav a{padding:.75rem 1rem;border-radius:var(--radius-sm)}
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
}

@media (max-width:780px){
  .office-bento{grid-template-columns:1fr}
  .office-tile--wide{grid-column:span 1}
}

@media (max-width:680px){
  .section{padding:4rem 0}
  .section-tight{padding:2.75rem 0}
  .page-hero{padding:2.5rem 0 2rem}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .field-row{grid-template-columns:1fr;gap:0;margin-bottom:0}
  .field-row .field{margin-bottom:1rem}
  .community-grid{grid-template-columns:1fr}
  .form-card{padding:2rem 1.5rem}
  .inquiry-option{flex:1 1 calc(50% - .3rem);justify-content:center}
}

@media (max-width:520px){
  .container,.container-narrow{padding-inline:1.15rem}
  .cta-block{padding:2.25rem 1.5rem}
  .cta-block .cta-actions{width:100%}
  .cta-block .cta-actions .btn{width:100%}
  .quick-chips{width:100%}
  .chip{flex:1 1 100%;justify-content:center}
  .inquiry-option{flex:1 1 100%}
  .form-card{padding:1.75rem 1.25rem 1.5rem}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">
  <div class="container header-inner">
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <div class="header-bar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        Premier<span style="color:var(--coral)">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact" aria-current="page">Contact</a>
        <a href="/c/privacy-policy">Privacy</a>
        <a href="/c/terms-conditions">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-dark header-cta">Book a Tour</a>
        <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
          <span></span><span></span><span></span>
        </label>
      </div>
    </div>
  </div>
</header>

<main>

  <!-- ================= PAGE HERO ================= -->
  <section class="page-hero">
    <div class="container page-hero-inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Contact</span>
      </nav>

      <span class="eyebrow-pill">Get in touch</span>

      <h1>Let's talk. We <span class="mark">actually answer</span>.</h1>

      <p class="lead">
        Whether you are scheduling a viewing, reporting a repair, or asking a question about your
        lease — this is the place to start. We reply to every message within one business day,
        and emergencies get a human on the phone right away.
      </p>

      <div class="quick-chips">
        <a href="mailto:leasing@premierpm.example" class="chip">
          <span class="chip-dot chip-dot--coral" aria-hidden="true"></span>
          leasing@premierpm.example
        </a>
        <a href="tel:+15550123456" class="chip">
          <span class="chip-dot chip-dot--lime" aria-hidden="true"></span>
          (555) 012-3456
        </a>
        <span class="chip">
          <span class="chip-dot chip-dot--violet" aria-hidden="true"></span>
          Mon–Fri · 9 AM – 6 PM
        </span>
      </div>
    </div>
  </section>

  <!-- ================= FORM ================= -->
  <section class="form-section">
    <div class="container-narrow">
      <div class="form-halo">
        <div class="form-card">

          <div class="form-card-header">
            <span class="eyebrow-pill">Send us a message</span>
            <h2>Tell us what you need.</h2>
            <p>
              Pick a topic, drop your details, and we will route your message to the right person
              on our team. No call-center queues.
            </p>
          </div>

          <form action="/c/contact" method="post" novalidate>

            <!-- Inquiry type as colorful radio pills -->
            <fieldset style="border:0;padding:0;margin:0 0 2rem">
              <legend style="font-size:.72rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1rem;text-align:center;display:block;width:100%">
                What is this about?
              </legend>

              <div class="inquiry-group">
                <input type="radio" name="inquiry_type" id="type-general" value="general" checked>
                <label for="type-general" class="inquiry-option">General Inquiry</label>

                <input type="radio" name="inquiry_type" id="type-viewing" value="viewing">
                <label for="type-viewing" class="inquiry-option">Schedule a Viewing</label>

                <input type="radio" name="inquiry_type" id="type-maintenance" value="maintenance">
                <label for="type-maintenance" class="inquiry-option">Maintenance</label>

                <input type="radio" name="inquiry_type" id="type-application" value="application">
                <label for="type-application" class="inquiry-option">Leasing Application</label>
              </div>
            </fieldset>

            <!-- Name / Email -->
            <div class="field-row">
              <div class="field">
                <input type="text" id="name" name="name" placeholder=" " autocomplete="name" required>
                <label for="name">Full name</label>
              </div>

              <div class="field">
                <input type="email" id="email" name="email" placeholder=" " autocomplete="email" required>
                <label for="email">Email address</label>
              </div>
            </div>

            <!-- Phone / Unit -->
            <div class="field-row">
              <div class="field">
                <input type="tel" id="phone" name="phone" placeholder=" " autocomplete="tel">
                <label for="phone">Phone (optional)</label>
              </div>

              <div class="field">
                <input type="text" id="unit" name="unit" placeholder=" ">
                <label for="unit">Unit or building (optional)</label>
              </div>
            </div>

            <!-- Message -->
            <div class="field" style="margin-bottom:0">
              <textarea id="message" name="message" placeholder=" " required></textarea>
              <label for="message">Your message</label>
            </div>

            <div class="form-submit">
              <button type="submit" class="btn btn-primary btn-lg">Send Message →</button>

              <p class="form-microcopy">
                We respond to all messages within one business day. Emergency maintenance requests
                should be phoned in to the 24/7 hotline instead.
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  </section>

  <!-- ================= COMMUNITY / SOCIAL ================= -->
  <section class="section" style="padding-top:0">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Find us elsewhere</span>
        <h2>Come hang out with us.</h2>
        <p class="lead">
          We share new listings, neighborhood guides, maintenance tips, and resident stories on
          social. Drop a comment — we read them all.
        </p>
      </div>

      <div class="community-grid">

        <a href="#" class="social-card social-card--coral" aria-label="PremierPM on Instagram">
          <div class="social-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </div>
          <div class="social-name">Instagram</div>
          <div class="social-handle">@premierpm</div>
          <span class="social-cta">Follow along</span>
        </a>

        <a href="#" class="social-card social-card--violet" aria-label="PremierPM on LinkedIn">
          <div class="social-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </div>
          <div class="social-name">LinkedIn</div>
          <div class="social-handle">Premier Property Management</div>
          <span class="social-cta">Connect with us</span>
        </a>

        <a href="#" class="social-card social-card--electric" aria-label="PremierPM on Facebook">
          <div class="social-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </div>
          <div class="social-name">Facebook</div>
          <div class="social-handle">@PremierPMCity</div>
          <span class="social-cta">Like our page</span>
        </a>

        <a href="#" class="social-card social-card--ink" aria-label="PremierPM newsletter">
          <div class="social-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="social-name">Resident Newsletter</div>
          <div class="social-handle">Monthly · no spam, ever</div>
          <span class="social-cta">Subscribe</span>
        </a>

      </div>
    </div>
  </section>

  <!-- ================= OFFICE BENTO ================= -->
  <section class="section" style="background:var(--surface);border-block:1.5px solid var(--border)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow-pill" style="margin-bottom:1.25rem">Visit or call</span>
        <h2>The details, if you want them.</h2>
        <p class="lead">
          Our leasing office sits in the Downtown Core, a short walk from the Harrison Avenue
          transit stop. Walk-ins welcome during business hours.
        </p>
      </div>

      <div class="office-bento">

        <!-- Address (wide) -->
        <div class="office-tile office-tile--wide">
          <div class="office-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="office-label">Leasing office</div>
          <div class="office-value">
            450 Harrison Avenue, Suite 12<br>
            City Center, ST 10024
          </div>
          <p>
            Two doors south of the corner café on Harrison. Free visitor parking in the rear lot —
            entrance on 5th Street. Step-free access and an accessible restroom on site.
          </p>
        </div>

        <!-- Hours -->
        <div class="office-tile">
          <div class="office-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="office-label">Operating hours</div>
          <ul class="hours-list">
            <li><span class="day">Mon – Fri</span><span class="time">9:00 – 18:00</span></li>
            <li><span class="day">Saturday</span><span class="time">10:00 – 16:00</span></li>
            <li><span class="day">Sunday</span><span class="time">By appointment</span></li>
            <li><span class="day">Showings</span><span class="time">Daily + evenings</span></li>
          </ul>
        </div>

        <!-- Email / Phone -->
        <div class="office-tile">
          <div class="office-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="office-label">Email &amp; phone</div>
          <div class="office-value" style="font-size:.95rem;line-height:1.7">
            Leasing: <a href="mailto:leasing@premierpm.example">leasing@…</a><br>
            Support: <a href="mailto:support@premierpm.example">support@…</a><br>
            Office: <a href="tel:+15550123456">(555) 012-3456</a>
          </div>
          <p>Email is fastest for leasing questions. Call for anything urgent during business hours.</p>
        </div>

        <!-- Emergency (dark, wide) -->
        <div class="office-tile office-tile--dark office-tile--wide">
          <div class="office-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div class="office-label">24/7 emergency maintenance</div>
          <div class="office-value" style="font-size:1.5rem;letter-spacing:-.03em">
            <a href="tel:+15550123456" style="border-bottom-color:var(--lime)">(555) 012-3456</a>
          </div>
          <p>
            For active leaks, loss of heat or hot water, lockouts, or anything affecting safety —
            call the hotline at any hour. A human responder, not a voicemail, answers every call.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-block">
        <div>
          <h2>Prefer to see a unit before you ask anything?</h2>
          <p>
            Tours run seven days a week, including evenings. Pick a time and a leasing agent will
            meet you at the building.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/" class="btn btn-primary btn-lg">Browse Available Units</a>
          <a href="/c/about" class="btn btn-ghost btn-lg">Learn About Us</a>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true"></span>
          Premier<span style="color:var(--coral)">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed
          with transparent pricing and a maintenance team that shows up.
        </p>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/c/about">About</a></li>
          <li><a href="/c/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/c/privacy-policy">Privacy Policy</a></li>
          <li><a href="/c/terms-conditions">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+15550123456">(555) 012-3456</a></li>
          <li><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></li>
          <li><span>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</span></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 Premier Property Management. All rights reserved.</span>
      <span>Equal Housing Opportunity · Licensed Property Manager #PM-44821</span>
    </div>
  </div>
</footer>

</body>
</html>
`

export const style2Policy = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy · Premier Property Management</title>
<meta name="description" content="How Premier Property Management collects, uses, shares, and protects tenant and applicant data — including screening documents, lease logs, and rent records.">
<style>
/* ============================================================
   DESIGN TOKENS — Bold & Vibrant / Creative Studio
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0d0d12;
  --ink-2:#3a3a44;
  --muted:#71717a;
  --muted-2:#a1a1aa;

  --bg:#fdf7ef;
  --surface:#ffffff;
  --surface-2:#f5ede1;
  --tint:#faf2e6;

  --coral:#ff4d2e;
  --coral-dark:#e63a1e;
  --violet:#7c3aed;
  --violet-dark:#6d28d9;
  --electric:#2563ff;
  --lime:#c8ff00;
  --sun:#ffd93d;

  --border:#ebe2d5;
  --border-2:#d9cdba;

  --radius-sm:10px;
  --radius:18px;
  --radius-lg:28px;
  --radius-pill:999px;

  --shadow-sm:0 2px 6px -1px rgb(13 13 18 / .06), 0 2px 4px -2px rgb(13 13 18 / .04);
  --shadow-md:0 18px 40px -18px rgb(13 13 18 / .22), 0 6px 14px -6px rgb(13 13 18 / .08);
  --shadow-lg:0 40px 80px -30px rgb(13 13 18 / .30);

  --max:1240px;
  --header-h:4.75rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:4px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:800;letter-spacing:-.035em;line-height:1.02;color:var(--ink)}
h1{font-size:clamp(2.5rem,7vw,5rem);letter-spacing:-.045em;line-height:.98}
h2{font-size:clamp(1.85rem,4vw,3rem);line-height:1.03}
h3{font-size:1.15rem;font-weight:700;letter-spacing:-.02em}
p{color:var(--ink-2)}
.lead{font-size:1.125rem;line-height:1.6;color:var(--ink-2)}
.accent{color:var(--coral)}

.mark{
  background-image:linear-gradient(180deg,transparent 58%,var(--lime) 58%,var(--lime) 92%,transparent 92%);
  padding:0 .08em;
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:920px;margin-inline:auto;padding-inline:1.5rem}
.section{padding:6rem 0}
.section-tight{padding:3.5rem 0}

.eyebrow-pill{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.45rem 1rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1px solid var(--border);
  font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink);box-shadow:var(--shadow-sm);
}
.eyebrow-pill::before{
  content:"";width:.5rem;height:.5rem;border-radius:50%;background:var(--coral);
  box-shadow:0 0 0 4px rgba(255,77,46,.18);
}

.section-head{max-width:720px;margin-bottom:3.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.section-head h2{margin-bottom:1rem}
.section-head .lead{max-width:56ch}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(253,247,239,.82);
  backdrop-filter:saturate(180%) blur(14px);
  -webkit-backdrop-filter:saturate(180%) blur(14px);
  border-bottom:1px solid transparent;
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.15rem;letter-spacing:-.04em;color:var(--ink)}
.brand-mark{
  position:relative;flex:none;width:2rem;height:2rem;border-radius:9px;
  background:var(--ink);display:grid;place-items:center;color:var(--lime);
  font-size:.9rem;font-weight:900;
}
.brand-mark::after{content:"◆";font-size:.7rem;line-height:1}

.nav{display:flex;align-items:center;gap:.25rem}
.nav a{
  display:inline-block;padding:.55rem 1rem;border-radius:var(--radius-pill);
  font-size:.92rem;font-weight:600;color:var(--ink-2);
  transition:background .18s ease,color .18s ease;
}
.nav a:hover{color:var(--ink);background:var(--surface-2)}
.nav a[aria-current="page"]{color:#fff;background:var(--ink);font-weight:700}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.75rem;height:2.75rem;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  border:1px solid var(--border);border-radius:var(--radius-pill);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:2px;background:var(--ink);border-radius:2px;transition:transform .22s ease,opacity .22s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.85rem 1.6rem;border-radius:var(--radius-pill);
  font-size:.95rem;font-weight:700;letter-spacing:-.005em;
  border:1.5px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease,border-color .18s ease,color .18s ease;
}
.btn-primary{background:var(--coral);color:#fff;border-color:var(--coral);box-shadow:0 6px 18px -6px rgba(255,77,46,.55)}
.btn-primary:hover{background:var(--coral-dark);border-color:var(--coral-dark);transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(255,77,46,.7)}
.btn-dark{background:var(--ink);color:#fff;border-color:var(--ink)}
.btn-dark:hover{background:#000;transform:translateY(-2px);box-shadow:var(--shadow-md)}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--border-2)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
.btn-lg{padding:1.05rem 2rem;font-size:1rem}
.btn-block{width:100%}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:4rem 0 3rem;position:relative;overflow:hidden}
.page-hero::before{
  content:"";position:absolute;top:-40%;left:-10%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,77,46,.10),transparent 62%);
  pointer-events:none;
}
.page-hero::after{
  content:"";position:absolute;bottom:-50%;right:-10%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.10),transparent 62%);
  pointer-events:none;
}
.page-hero-inner{position:relative;z-index:1;max-width:900px}

.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:var(--muted);margin-bottom:1.5rem}
.crumbs a:hover{color:var(--coral)}
.crumbs span{color:var(--muted-2)}

.page-hero h1{margin:1.5rem 0 1.5rem;max-width:16ch}
.page-hero .lead{max-width:64ch}

.doc-meta{
  display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;
  margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border);
  font-size:.85rem;color:var(--muted);
}
.doc-meta li{display:flex;align-items:center;gap:.5rem}
.doc-meta li::before{content:"";width:.45rem;height:.45rem;border-radius:50%;background:var(--coral)}

/* ============================================================
   INTRO — quick summary tiles
   ============================================================ */
.summary-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1rem;
  margin-bottom:3rem;
}

.summary-tile{
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius);
  padding:1.3rem 1.25rem;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.summary-tile:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:var(--border-2)}

.summary-dot{
  width:.7rem;height:.7rem;border-radius:50%;
  margin-bottom:.9rem;
}
.summary-dot--coral{background:var(--coral);box-shadow:0 0 0 4px rgba(255,77,46,.16)}
.summary-dot--lime{background:var(--lime);box-shadow:0 0 0 4px rgba(200,255,0,.24)}
.summary-dot--violet{background:var(--violet);box-shadow:0 0 0 4px rgba(124,58,237,.16)}
.summary-dot--electric{background:var(--electric);box-shadow:0 0 0 4px rgba(37,99,255,.16)}

.summary-label{
  font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--muted-2);margin-bottom:.35rem;
}
.summary-value{
  font-size:.95rem;font-weight:700;letter-spacing:-.015em;line-height:1.35;
  color:var(--ink);
}

/* ============================================================
   DOCUMENT CARD
   ============================================================ */
.doc-shell{
  background:var(--tint);
  border-radius:var(--radius-lg);
  padding:2.5rem;
  border:1.5px solid var(--border);
}

.doc-card{
  background:var(--surface);
  border-radius:var(--radius);
  box-shadow:var(--shadow-sm);
  overflow:hidden;
}

.doc-intro{
  padding:2.25rem 2.5rem 2rem;
  border-bottom:1.5px solid var(--border);
  background:linear-gradient(180deg,var(--surface) 0%,var(--surface) 100%);
}
.doc-intro h2{font-size:clamp(1.5rem,2.5vw,1.85rem);margin-bottom:.75rem}
.doc-intro p{font-size:.98rem;color:var(--ink-2);max-width:66ch}
.doc-intro p + p{margin-top:.9rem}

/* ============================================================
   ACCORDION — native <details>
   ============================================================ */
.accordion{border-top:1.5px solid var(--border)}
.accordion:first-of-type{border-top:0}

.acc-item{
  border-bottom:1.5px solid var(--border);
}
.acc-item:last-child{border-bottom:0}

.acc-item summary{
  list-style:none;
  cursor:pointer;
  padding:1.5rem 2.5rem;
  display:grid;
  grid-template-columns:auto 1fr auto;
  gap:1.25rem;
  align-items:center;
  transition:background .18s ease;
  position:relative;
}
.acc-item summary::-webkit-details-marker{display:none}
.acc-item summary:hover{background:var(--tint)}
.acc-item[open] summary{background:var(--tint)}

/* Number badge */
.acc-num{
  flex:none;
  width:2.5rem;height:2.5rem;border-radius:12px;
  display:grid;place-items:center;
  font-size:.8rem;font-weight:900;letter-spacing:.02em;
  color:#fff;
  transition:transform .2s ease;
}
.acc-item[open] .acc-num{transform:scale(1.05)}
.acc-num--coral{background:var(--coral)}
.acc-num--lime{background:var(--lime);color:var(--ink)}
.acc-num--violet{background:var(--violet)}
.acc-num--electric{background:var(--electric)}
.acc-num--sun{background:var(--sun);color:var(--ink)}
.acc-num--ink{background:var(--ink)}

/* Title */
.acc-title{
  font-size:1.1rem;font-weight:800;letter-spacing:-.025em;
  color:var(--ink);line-height:1.25;
}
.acc-sub{
  display:block;font-size:.82rem;font-weight:500;color:var(--muted);
  letter-spacing:0;margin-top:.2rem;line-height:1.4;
}

/* Toggle indicator */
.acc-toggle{
  position:relative;
  width:2.25rem;height:2.25rem;border-radius:50%;
  border:1.5px solid var(--border);
  background:var(--surface);
  display:grid;place-items:center;
  flex:none;
  transition:transform .22s ease,background .22s ease,border-color .22s ease;
}
.acc-toggle::before,
.acc-toggle::after{
  content:"";position:absolute;
  background:var(--ink);border-radius:2px;
  transition:transform .22s ease,opacity .22s ease,background .22s ease;
}
.acc-toggle::before{width:12px;height:2px}
.acc-toggle::after{width:2px;height:12px}

.acc-item summary:hover .acc-toggle{border-color:var(--ink)}
.acc-item[open] .acc-toggle{background:var(--ink);border-color:var(--ink);transform:rotate(180deg)}
.acc-item[open] .acc-toggle::before{background:#fff}
.acc-item[open] .acc-toggle::after{opacity:0;transform:rotate(90deg)}

/* Body */
.acc-body{
  padding:0 2.5rem 2.25rem 6.25rem;
  animation:accFade .28s ease;
}
@keyframes accFade{
  from{opacity:0;transform:translateY(-6px)}
  to{opacity:1;transform:translateY(0)}
}

.acc-body > p{font-size:.96rem;color:var(--ink-2);margin-bottom:1rem;line-height:1.65}
.acc-body > p:last-child{margin-bottom:0}

.acc-body h3{
  font-size:.98rem;font-weight:800;letter-spacing:-.015em;
  margin:1.5rem 0 .6rem;
}
.acc-body h3:first-child{margin-top:0}

/* Content lists */
.acc-body ul{margin:.75rem 0 1.1rem;display:grid;gap:.6rem}
.acc-body ul li{
  position:relative;padding-left:1.4rem;
  font-size:.94rem;color:var(--ink-2);line-height:1.6;
}
.acc-body ul li::before{
  content:"";position:absolute;left:.3rem;top:.62rem;
  width:6px;height:6px;border-radius:2px;background:var(--coral);
}
.acc-body ul li strong{color:var(--ink);font-weight:700}

/* Definition blocks */
.deflist{display:grid;gap:.85rem;margin:1.1rem 0}
.deflist > div{
  background:var(--tint);
  border:1px solid var(--border);
  border-radius:var(--radius-sm);
  padding:1.05rem 1.15rem;
  transition:border-color .18s ease;
}
.deflist > div:hover{border-color:var(--border-2)}
.deflist dt{
  font-size:.72rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;
  color:var(--coral-dark);margin-bottom:.4rem;
}
.deflist dd{font-size:.93rem;color:var(--ink-2);line-height:1.6}

/* Callout */
.callout{
  margin:1.25rem 0;
  padding:1.15rem 1.35rem;
  background:var(--surface);
  border:1.5px solid var(--border);
  border-left:4px solid var(--coral);
  border-radius:var(--radius-sm);
}
.callout--lime{border-left-color:var(--lime)}
.callout--violet{border-left-color:var(--violet)}
.callout--electric{border-left-color:var(--electric)}

.callout-label{
  font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--coral-dark);margin-bottom:.4rem;
}
.callout--lime .callout-label{color:#6b7a00}
.callout--violet .callout-label{color:var(--violet-dark)}
.callout--electric .callout-label{color:var(--electric)}
.callout p{font-size:.93rem;color:var(--ink-2);line-height:1.6}

/* Accent link */
.doc-link{
  color:var(--coral-dark);font-weight:700;
  border-bottom:2px solid var(--lime);
  transition:color .16s ease;
}
.doc-link:hover{color:var(--ink)}

/* ============================================================
   CONTACT BLOCK
   ============================================================ */
.doc-contact{
  margin-top:2rem;
  background:var(--ink);color:#fff;
  border-radius:var(--radius);
  padding:2.5rem;
  position:relative;overflow:hidden;
}
.doc-contact::before{
  content:"";position:absolute;right:-60px;top:-60px;
  width:240px;height:240px;border-radius:50%;
  background:radial-gradient(circle,rgba(200,255,0,.20),transparent 68%);
  pointer-events:none;
}
.doc-contact > *{position:relative;z-index:1}
.doc-contact h2{
  color:#fff;font-size:clamp(1.35rem,2.5vw,1.65rem);
  margin-bottom:.85rem;
}
.doc-contact > p{color:#a1a1aa;font-size:.95rem;max-width:56ch;margin-bottom:1.75rem;line-height:1.6}

.contact-grid{
  display:grid;grid-template-columns:repeat(2,1fr);gap:1rem 2rem;
}
.contact-item{
  padding:1rem 1.1rem;
  border:1px solid #27272a;border-radius:var(--radius-sm);
  background:rgba(255,255,255,.03);
  transition:border-color .18s ease,background .18s ease;
}
.contact-item:hover{border-color:#3f3f46;background:rgba(255,255,255,.05)}
.contact-item dt{
  font-size:.68rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;
  color:var(--lime);margin-bottom:.45rem;
}
.contact-item dd{
  font-size:.93rem;color:#e4e4e7;line-height:1.55;
}
.contact-item dd a{color:#fff;font-weight:600;border-bottom:2px solid var(--coral)}
.contact-item dd a:hover{color:var(--lime);border-color:var(--lime)}

/* ============================================================
   CTA BLOCK
   ============================================================ */
.cta-block{
  position:relative;overflow:hidden;
  border-radius:var(--radius-lg);
  padding:4.5rem 3.5rem;
  background:linear-gradient(135deg,var(--violet) 0%,var(--coral) 100%);
  color:#fff;
  display:grid;grid-template-columns:1.4fr 1fr;gap:3rem;align-items:center;
}
.cta-block::before{
  content:"";position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 15% 20%,rgba(255,255,255,.22),transparent 42%),
    radial-gradient(circle at 85% 80%,rgba(200,255,0,.18),transparent 42%);
  pointer-events:none;
}
.cta-block > *{position:relative;z-index:1}
.cta-block h2{color:#fff;font-size:clamp(2rem,4vw,3rem);max-width:18ch}
.cta-block p{color:rgba(255,255,255,.88);max-width:48ch;margin-top:1rem;font-size:1.0625rem}
.cta-actions{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:flex-end}
.cta-block .btn-primary{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 8px 24px -8px rgba(0,0,0,.4)}
.cta-block .btn-primary:hover{background:#fff;color:var(--coral-dark);transform:translateY(-2px)}
.cta-block .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}
.cta-block .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--ink);color:#fff;padding:5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.3fr;gap:3rem}
.footer-brand .brand{color:#fff}
.footer-brand .brand-mark{background:var(--coral);color:#fff}
.footer-brand p{color:#a1a1aa;font-size:.9rem;margin-top:1.25rem;max-width:34ch;line-height:1.6}
.footer-col h4{
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  color:#71717a;margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.7rem}
.footer-col a,.footer-col span{font-size:.92rem;color:#d4d4d8}
.footer-col a:hover{color:var(--lime)}
.footer-bottom{
  margin-top:4rem;padding-top:1.75rem;border-top:1px solid #27272a;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.82rem;color:#71717a;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .summary-grid{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .cta-block{grid-template-columns:1fr;padding:3rem 2rem;gap:2rem}
  .cta-actions{justify-content:flex-start}
  .doc-shell{padding:1.75rem}
  .acc-body{padding-left:2.5rem}
  .contact-grid{grid-template-columns:1fr}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.35rem;
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    margin:0 1rem;padding:.75rem;
    box-shadow:var(--shadow-md);
  }
  .nav a{padding:.75rem 1rem;border-radius:var(--radius-sm)}
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
}

@media (max-width:680px){
  .section{padding:4rem 0}
  .section-tight{padding:2.75rem 0}
  .page-hero{padding:2.5rem 0 2rem}
  .footer-grid{grid-template-columns:1fr;gap:2rem}

  .doc-shell{padding:1.25rem;border-radius:var(--radius)}
  .doc-intro{padding:1.75rem 1.5rem 1.5rem}

  .acc-item summary{padding:1.25rem 1.5rem;gap:.85rem}
  .acc-num{width:2.15rem;height:2.15rem;border-radius:10px;font-size:.75rem}
  .acc-title{font-size:1rem}
  .acc-sub{font-size:.78rem}
  .acc-toggle{width:2rem;height:2rem}
  .acc-body{padding:0 1.5rem 1.75rem 1.5rem}

  .doc-contact{padding:1.75rem 1.5rem}
}

@media (max-width:520px){
  .container,.container-narrow{padding-inline:1.15rem}
  .summary-grid{grid-template-columns:1fr}
  .cta-block{padding:2.25rem 1.5rem}
  .cta-block .cta-actions{width:100%}
  .cta-block .cta-actions .btn{width:100%}
  .doc-meta{flex-direction:column;gap:.4rem}
  .acc-item summary{grid-template-columns:auto 1fr;gap:.75rem}
  .acc-toggle{grid-column:1/-1;justify-self:start;margin-top:.25rem}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">
  <div class="container header-inner">
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <div class="header-bar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        Premier<span style="color:var(--coral)">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/privacy-policy" aria-current="page">Privacy</a>
        <a href="/c/terms-conditions">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-dark header-cta">Book a Tour</a>
        <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
          <span></span><span></span><span></span>
        </label>
      </div>
    </div>
  </div>
</header>

<main>

  <!-- ================= PAGE HERO ================= -->
  <section class="page-hero">
    <div class="container page-hero-inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Privacy Policy</span>
      </nav>

      <span class="eyebrow-pill">Legal · Privacy</span>

      <h1>Your data. <span class="mark">Plain English.</span> No fine print.</h1>

      <p class="lead">
        This page explains what information Premier Property Management collects from applicants,
        residents, and visitors, how we use it to run our buildings, who we share it with, and the
        rights you hold over your own data. Tap any section below to open it.
      </p>

      <ul class="doc-meta">
        <li>Effective date: March 1, 2025</li>
        <li>Last reviewed: March 1, 2025</li>
        <li>Applies to premierpm.example and all managed properties</li>
      </ul>
    </div>
  </section>

  <!-- ================= DOCUMENT ================= -->
  <section class="section" style="padding-top:1rem">
    <div class="container-narrow">

      <!-- Quick summary tiles -->
      <div class="summary-grid">
        <div class="summary-tile">
          <div class="summary-dot summary-dot--coral"></div>
          <div class="summary-label">We collect</div>
          <div class="summary-value">Contact details, screening documents, lease &amp; payment logs</div>
        </div>
        <div class="summary-tile">
          <div class="summary-dot summary-dot--lime"></div>
          <div class="summary-label">We use it for</div>
          <div class="summary-value">Screening, rent collection, building notices &amp; legal compliance</div>
        </div>
        <div class="summary-tile">
          <div class="summary-dot summary-dot--violet"></div>
          <div class="summary-label">We never</div>
          <div class="summary-value">Sell your data or use it for ad networks</div>
        </div>
        <div class="summary-tile">
          <div class="summary-dot summary-dot--electric"></div>
          <div class="summary-label">You can</div>
          <div class="summary-value">Access, correct, or delete your data — just ask</div>
        </div>
      </div>

      <!-- Document card with accordion -->
      <div class="doc-shell">
        <div class="doc-card">

          <div class="doc-intro">
            <h2>Privacy Policy</h2>
            <p>
              Premier Property Management ("PremierPM", "we", "us") manages residential buildings
              and processes rental applications on behalf of property owners. In doing so we handle
              personal information every day — and this page explains exactly how.
            </p>
            <p>
              We collect only what we need to lease, manage, and maintain a property. We keep it
              only as long as we need it. This policy applies to our website, our tenant portal,
              our leasing office, and every building in our managed portfolio.
            </p>
          </div>

          <!-- 01 -->
          <details class="acc-item accordion" open>
            <summary>
              <span class="acc-num acc-num--coral" aria-hidden="true">01</span>
              <span>
                <span class="acc-title">Information We Collect</span>
                <span class="acc-sub">What we gather from you, your device, and third parties</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We collect information in three ways: directly from you, automatically through our
                website and portal, and from third parties you authorize during the application
                process.
              </p>

              <dl class="deflist">
                <div>
                  <dt>Personal details</dt>
                  <dd>
                    Your name, email address, phone number, current and previous mailing addresses,
                    date of birth, and the number of occupants who will live in the unit. For
                    corporate leases, we also collect the company name, billing contact, and
                    authorized signatory.
                  </dd>
                </div>
                <div>
                  <dt>Application &amp; screening documents</dt>
                  <dd>
                    Government-issued photo identification, proof of income such as recent pay
                    stubs or employment letters, bank statements where required, rental history and
                    landlord references, and the authorization forms needed to run a credit and
                    background check.
                  </dd>
                </div>
                <div>
                  <dt>Lease &amp; account logs</dt>
                  <dd>
                    Your signed lease and any addenda, move-in and move-out inspection reports,
                    rent payment records, ledger balances, maintenance requests and their resolution
                    notes, and written communications with our leasing and maintenance teams.
                  </dd>
                </div>
                <div>
                  <dt>Website &amp; portal technical data</dt>
                  <dd>
                    IP address, browser type and version, device type, pages visited, referring URL,
                    and timestamps. For portal users, we also record login events and session
                    activity.
                  </dd>
                </div>
              </dl>

              <div class="callout callout--lime">
                <div class="callout-label">What we do not collect</div>
                <p>
                  We do not collect biometric identifiers, precise geolocation from your mobile
                  device, health information, or the contents of your private messages. We never
                  ask for your Social Security number through this website.
                </p>
              </div>
            </div>
          </details>

          <!-- 02 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--lime" aria-hidden="true">02</span>
              <span>
                <span class="acc-title">Screening &amp; Application Data</span>
                <span class="acc-sub">Credit, background, and rental-history checks</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                When you apply for a unit, you authorize us and our screening partner to verify the
                information you provided. That verification produces a consumer report containing
                credit history, eviction filings, and public record information.
              </p>
              <p>
                Screening reports are used solely to evaluate your application against our written
                rental criteria, which are applied consistently to every applicant for the same
                unit. We do not use a screening report to set different terms for applicants in a
                protected class.
              </p>
              <p>
                If your application is denied, you receive a written notice identifying the
                screening company and explaining your right to request a free copy of the report
                and to dispute inaccurate information directly with that company.
              </p>
            </div>
          </details>

          <!-- 03 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--violet" aria-hidden="true">03</span>
              <span>
                <span class="acc-title">Use of Tenant Data</span>
                <span class="acc-sub">Screening, rent collection, building notices, legal duties</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>We use the information we collect for the following purposes:</p>

              <h3>Leasing and screening</h3>
              <ul>
                <li>Verifying identity, income, and rental history before approving a lease.</li>
                <li>Preparing your lease, addenda, and move-in documentation.</li>
                <li>Coordinating co-signers, guarantors, or corporate signatories where applicable.</li>
              </ul>

              <h3>Rent collection and accounting</h3>
              <ul>
                <li>Processing monthly rent, deposits, and any lawful fees through our payment provider.</li>
                <li>Maintaining your ledger, issuing receipts, and producing year-end summaries for owners.</li>
                <li>Contacting you about a past-due balance, as required by your lease and local law.</li>
              </ul>

              <h3>Building operations and notices</h3>
              <ul>
                <li>Sending maintenance schedules, utility interruptions, entry notices, and building announcements.</li>
                <li>Dispatching maintenance staff or vendors to your unit and recording the outcome.</li>
                <li>Responding to emergencies that affect health, safety, or the integrity of the building.</li>
              </ul>

              <h3>Legal and compliance obligations</h3>
              <ul>
                <li>Complying with landlord-tenant law, fair housing requirements, and tax reporting.</li>
                <li>Responding to lawful requests from courts, regulators, or emergency services.</li>
                <li>Enforcing the terms of your lease where a breach occurs.</li>
              </ul>

              <div class="callout callout--electric">
                <div class="callout-label">Our promise</div>
                <p>
                  We do not sell your personal information, and we do not use it for advertising
                  networks or unrelated marketing. Ever.
                </p>
              </div>
            </div>
          </details>

          <!-- 04 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--electric" aria-hidden="true">04</span>
              <span>
                <span class="acc-title">Data Sharing &amp; Security</span>
                <span class="acc-sub">Who sees your data, and how we protect it</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We share personal information only with parties who need it to perform a specific
                function for us, and only under written confidentiality obligations.
              </p>

              <dl class="deflist">
                <div>
                  <dt>Screening &amp; credit partners</dt>
                  <dd>Consumer reporting agencies that produce the background and credit reports used in application review.</dd>
                </div>
                <div>
                  <dt>Payment processors</dt>
                  <dd>Regulated payment providers that handle rent and deposit transactions. We do not store full card numbers on our own systems.</dd>
                </div>
                <div>
                  <dt>Maintenance vendors</dt>
                  <dd>Licensed contractors and technicians dispatched to your unit, who receive only the address, contact details, and issue description needed to complete the work.</dd>
                </div>
                <div>
                  <dt>Property owners</dt>
                  <dd>Owners receive operational and financial reporting about their building. We provide unit-level detail and resident names only where necessary for lease administration.</dd>
                </div>
                <div>
                  <dt>Professional advisors &amp; authorities</dt>
                  <dd>Attorneys, auditors, and insurers acting on our behalf, plus courts or regulators where disclosure is legally required.</dd>
                </div>
              </dl>

              <h3>How we protect your data</h3>
              <ul>
                <li>Encryption in transit for all portal traffic and payment submissions.</li>
                <li>Role-based access controls, so staff see only the records relevant to their role.</li>
                <li>Audit logging of portal logins and access to screening documents.</li>
                <li>Written data-handling requirements in every vendor contract.</li>
                <li>Annual review of access permissions and removal of accounts when staff depart.</li>
              </ul>

              <p>
                No system is perfectly secure. If a breach affects your personal information, we
                will notify you and the relevant authorities as required by applicable law.
              </p>
            </div>
          </details>

          <!-- 05 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--sun" aria-hidden="true">05</span>
              <span>
                <span class="acc-title">Retention &amp; Deletion</span>
                <span class="acc-sub">How long we keep your information</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We keep personal information only for as long as it serves the purpose it was
                collected for, or as long as the law requires.
              </p>
              <ul>
                <li><strong>Denied applications</strong> are retained for 12 months, then deleted or anonymized.</li>
                <li><strong>Active tenancy records</strong> are retained for the duration of the lease and any renewal.</li>
                <li><strong>Post-tenancy records</strong> — ledger, lease, and inspection reports — are retained for the period required by tax and landlord-tenant law, typically 7 years.</li>
                <li><strong>Maintenance records</strong> are retained for 3 years after the work is completed.</li>
                <li><strong>Website analytics</strong> are retained in aggregate form for 26 months.</li>
              </ul>
              <p>
                When a retention period ends, we delete the records or strip them of identifiers so
                they can no longer be linked to you.
              </p>
            </div>
          </details>

          <!-- 06 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--coral" aria-hidden="true">06</span>
              <span>
                <span class="acc-title">Tenant Rights</span>
                <span class="acc-sub">Access, correction, deletion, and more</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                Subject to your jurisdiction and to our lawful recordkeeping obligations, you have
                the following rights regarding the personal information we hold about you.
              </p>

              <dl class="deflist">
                <div>
                  <dt>Right to access</dt>
                  <dd>Request a copy of the personal information we hold about you, along with a description of how it is used.</dd>
                </div>
                <div>
                  <dt>Right to correction</dt>
                  <dd>Ask us to fix information that is inaccurate or incomplete. We will correct our records and, where relevant, notify the screening company.</dd>
                </div>
                <div>
                  <dt>Right to deletion</dt>
                  <dd>Request deletion of information we no longer need. We may decline where retention is required by law or necessary to enforce a lease.</dd>
                </div>
                <div>
                  <dt>Right to restrict processing</dt>
                  <dd>Ask us to limit how we use your information while a dispute about its accuracy is being resolved.</dd>
                </div>
                <div>
                  <dt>Right to opt out of non-essential communications</dt>
                  <dd>Unsubscribe from newsletters and promotional messages. Operational notices about your tenancy will still be sent.</dd>
                </div>
              </dl>

              <p>
                To exercise any of these rights, email
                <a href="mailto:privacy@premierpm.example" class="doc-link">privacy@premierpm.example</a>
                with the subject line "Privacy Request". We will verify your identity and respond
                within 30 days. There is no charge for a first request.
              </p>

              <div class="callout callout--violet">
                <div class="callout-label">Fair housing note</div>
                <p>
                  We do not discriminate on the basis of race, color, religion, national origin,
                  sex, familial status, disability, or any other class protected by applicable law.
                  If you believe you have experienced discrimination, you may contact us directly
                  or file a complaint with the appropriate fair housing authority.
                </p>
              </div>
            </div>
          </details>

          <!-- 07 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--violet" aria-hidden="true">07</span>
              <span>
                <span class="acc-title">Cookies &amp; Site Analytics</span>
                <span class="acc-sub">Essential, preference, and analytics cookies</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                Our public website uses a small number of first-party cookies to remember your
                search preferences and to measure which pages are useful. The tenant portal uses a
                session cookie that is required for you to stay logged in.
              </p>
              <ul>
                <li><strong>Essential cookies</strong> — required for portal login and security functions. These cannot be disabled.</li>
                <li><strong>Preference cookies</strong> — remember filters such as neighborhood or bedroom count.</li>
                <li><strong>Analytics cookies</strong> — collect aggregated page-view data. These contain no personal identifiers.</li>
              </ul>
              <p>
                You can block or delete cookies in your browser settings. Blocking essential
                cookies will prevent the tenant portal from working correctly.
              </p>
            </div>
          </details>

          <!-- 08 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--ink" aria-hidden="true">08</span>
              <span>
                <span class="acc-title">Changes to This Policy</span>
                <span class="acc-sub">How we notify you of updates</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We review this policy at least once a year and whenever we change how we handle
                personal information. When we make a material change, we will update the effective
                date at the top of this page and post a notice in the tenant portal and in
                building common areas.
              </p>
              <p>
                Continued use of the portal or continued tenancy after a change takes effect
                constitutes acceptance of the updated policy.
              </p>
            </div>
          </details>

        </div>

        <!-- Contact block -->
        <div class="doc-contact">
          <h2>Contact our privacy team</h2>
          <p>
            If you have a question about this policy, want to exercise a privacy right, or need to
            report a concern about how your data has been handled, reach us using the details
            below.
          </p>

          <dl class="contact-grid">
            <div class="contact-item">
              <dt>Email</dt>
              <dd><a href="mailto:privacy@premierpm.example">privacy@premierpm.example</a></dd>
            </div>
            <div class="contact-item">
              <dt>Phone</dt>
              <dd><a href="tel:+15550123456">(555) 012-3456</a> · Mon–Fri, 9–18</dd>
            </div>
            <div class="contact-item">
              <dt>Postal address</dt>
              <dd>PremierPM · Attn: Privacy Officer<br>450 Harrison Ave, Suite 12, City Center, ST 10024</dd>
            </div>
            <div class="contact-item">
              <dt>Response time</dt>
              <dd>Within 30 days of identity verification</dd>
            </div>
          </dl>
        </div>
      </div>

    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section" style="padding-top:0">
    <div class="container">
      <div class="cta-block">
        <div>
          <h2>Need the rules of the portal instead?</h2>
          <p>
            Our Terms of Service covers portal usage, application fees, listing accuracy, and
            liability for property upkeep reporting.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/terms-conditions" class="btn btn-primary btn-lg">Read Terms of Service</a>
          <a href="/c/contact" class="btn btn-ghost btn-lg">Contact Us</a>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true"></span>
          Premier<span style="color:var(--coral)">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed
          with transparent pricing and a maintenance team that shows up.
        </p>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/c/about">About</a></li>
          <li><a href="/c/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/c/privacy-policy">Privacy Policy</a></li>
          <li><a href="/c/terms-conditions">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+15550123456">(555) 012-3456</a></li>
          <li><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></li>
          <li><span>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</span></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 Premier Property Management. All rights reserved.</span>
      <span>Equal Housing Opportunity · Licensed Property Manager #PM-44821</span>
    </div>
  </div>
</footer>

</body>
</html>
`

export const style2Terms = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Terms of Service · Premier Property Management</title>
<meta name="description" content="The terms governing use of the PremierPM tenant portal, rental applications, holding fees, listing accuracy, and limitation of liability for property upkeep reporting.">
<style>
/* ============================================================
   DESIGN TOKENS — Bold & Vibrant / Creative Studio
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0d0d12;
  --ink-2:#3a3a44;
  --muted:#71717a;
  --muted-2:#a1a1aa;

  --bg:#fdf7ef;
  --surface:#ffffff;
  --surface-2:#f5ede1;
  --tint:#faf2e6;

  --coral:#ff4d2e;
  --coral-dark:#e63a1e;
  --violet:#7c3aed;
  --violet-dark:#6d28d9;
  --electric:#2563ff;
  --lime:#c8ff00;
  --sun:#ffd93d;

  --border:#ebe2d5;
  --border-2:#d9cdba;

  --radius-sm:10px;
  --radius:18px;
  --radius-lg:28px;
  --radius-pill:999px;

  --shadow-sm:0 2px 6px -1px rgb(13 13 18 / .06), 0 2px 4px -2px rgb(13 13 18 / .04);
  --shadow-md:0 18px 40px -18px rgb(13 13 18 / .22), 0 6px 14px -6px rgb(13 13 18 / .08);
  --shadow-lg:0 40px 80px -30px rgb(13 13 18 / .30);

  --max:1240px;
  --header-h:4.75rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:3px solid var(--violet);outline-offset:3px;border-radius:4px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:800;letter-spacing:-.035em;line-height:1.02;color:var(--ink)}
h1{font-size:clamp(2.5rem,7vw,5rem);letter-spacing:-.045em;line-height:.98}
h2{font-size:clamp(1.85rem,4vw,3rem);line-height:1.03}
h3{font-size:1.15rem;font-weight:700;letter-spacing:-.02em}
p{color:var(--ink-2)}
.lead{font-size:1.125rem;line-height:1.6;color:var(--ink-2)}
.accent{color:var(--coral)}

.mark{
  background-image:linear-gradient(180deg,transparent 58%,var(--lime) 58%,var(--lime) 92%,transparent 92%);
  padding:0 .08em;
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:920px;margin-inline:auto;padding-inline:1.5rem}
.section{padding:6rem 0}
.section-tight{padding:3.5rem 0}

.eyebrow-pill{
  display:inline-flex;align-items:center;gap:.5rem;
  padding:.45rem 1rem;border-radius:var(--radius-pill);
  background:var(--surface);border:1px solid var(--border);
  font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink);box-shadow:var(--shadow-sm);
}
.eyebrow-pill::before{
  content:"";width:.5rem;height:.5rem;border-radius:50%;background:var(--coral);
  box-shadow:0 0 0 4px rgba(255,77,46,.18);
}

.section-head{max-width:720px;margin-bottom:3.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.section-head h2{margin-bottom:1rem}
.section-head .lead{max-width:56ch}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(253,247,239,.82);
  backdrop-filter:saturate(180%) blur(14px);
  -webkit-backdrop-filter:saturate(180%) blur(14px);
  border-bottom:1px solid transparent;
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:800;font-size:1.15rem;letter-spacing:-.04em;color:var(--ink)}
.brand-mark{
  position:relative;flex:none;width:2rem;height:2rem;border-radius:9px;
  background:var(--ink);display:grid;place-items:center;color:var(--lime);
  font-size:.9rem;font-weight:900;
}
.brand-mark::after{content:"◆";font-size:.7rem;line-height:1}

.nav{display:flex;align-items:center;gap:.25rem}
.nav a{
  display:inline-block;padding:.55rem 1rem;border-radius:var(--radius-pill);
  font-size:.92rem;font-weight:600;color:var(--ink-2);
  transition:background .18s ease,color .18s ease;
}
.nav a:hover{color:var(--ink);background:var(--surface-2)}
.nav a[aria-current="page"]{color:#fff;background:var(--ink);font-weight:700}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.75rem;height:2.75rem;flex-direction:column;align-items:center;justify-content:center;gap:5px;
  border:1px solid var(--border);border-radius:var(--radius-pill);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:2px;background:var(--ink);border-radius:2px;transition:transform .22s ease,opacity .22s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.85rem 1.6rem;border-radius:var(--radius-pill);
  font-size:.95rem;font-weight:700;letter-spacing:-.005em;
  border:1.5px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .18s ease,box-shadow .18s ease,background .18s ease,border-color .18s ease,color .18s ease;
}
.btn-primary{background:var(--coral);color:#fff;border-color:var(--coral);box-shadow:0 6px 18px -6px rgba(255,77,46,.55)}
.btn-primary:hover{background:var(--coral-dark);border-color:var(--coral-dark);transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(255,77,46,.7)}
.btn-dark{background:var(--ink);color:#fff;border-color:var(--ink)}
.btn-dark:hover{background:#000;transform:translateY(-2px);box-shadow:var(--shadow-md)}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--border-2)}
.btn-ghost:hover{border-color:var(--ink);transform:translateY(-2px)}
.btn-lg{padding:1.05rem 2rem;font-size:1rem}
.btn-block{width:100%}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:4rem 0 3rem;position:relative;overflow:hidden}
.page-hero::before{
  content:"";position:absolute;top:-40%;right:-10%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(124,58,237,.10),transparent 62%);
  pointer-events:none;
}
.page-hero::after{
  content:"";position:absolute;bottom:-50%;left:-10%;
  width:800px;height:800px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,77,46,.10),transparent 62%);
  pointer-events:none;
}
.page-hero-inner{position:relative;z-index:1;max-width:900px}

.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:var(--muted);margin-bottom:1.5rem}
.crumbs a:hover{color:var(--coral)}
.crumbs span{color:var(--muted-2)}

.page-hero h1{margin:1.5rem 0 1.5rem;max-width:16ch}
.page-hero .lead{max-width:64ch}

.doc-meta{
  display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;
  margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border);
  font-size:.85rem;color:var(--muted);
}
.doc-meta li{display:flex;align-items:center;gap:.5rem}
.doc-meta li::before{content:"";width:.45rem;height:.45rem;border-radius:50%;background:var(--coral)}

/* ============================================================
   SUMMARY TILES
   ============================================================ */
.summary-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1rem;
  margin-bottom:3rem;
}

.summary-tile{
  background:var(--surface);
  border:1.5px solid var(--border);
  border-radius:var(--radius);
  padding:1.3rem 1.25rem;
  transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;
}
.summary-tile:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:var(--border-2)}

.summary-dot{
  width:.7rem;height:.7rem;border-radius:50%;
  margin-bottom:.9rem;
}
.summary-dot--coral{background:var(--coral);box-shadow:0 0 0 4px rgba(255,77,46,.16)}
.summary-dot--lime{background:var(--lime);box-shadow:0 0 0 4px rgba(200,255,0,.24)}
.summary-dot--violet{background:var(--violet);box-shadow:0 0 0 4px rgba(124,58,237,.16)}
.summary-dot--electric{background:var(--electric);box-shadow:0 0 0 4px rgba(37,99,255,.16)}

.summary-label{
  font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--muted-2);margin-bottom:.35rem;
}
.summary-value{
  font-size:.95rem;font-weight:700;letter-spacing:-.015em;line-height:1.35;
  color:var(--ink);
}

/* ============================================================
   DOCUMENT CARD
   ============================================================ */
.doc-shell{
  background:var(--tint);
  border-radius:var(--radius-lg);
  padding:2.5rem;
  border:1.5px solid var(--border);
}

.doc-card{
  background:var(--surface);
  border-radius:var(--radius);
  box-shadow:var(--shadow-sm);
  overflow:hidden;
}

.doc-intro{
  padding:2.25rem 2.5rem 2rem;
  border-bottom:1.5px solid var(--border);
}
.doc-intro h2{font-size:clamp(1.5rem,2.5vw,1.85rem);margin-bottom:.75rem}
.doc-intro p{font-size:.98rem;color:var(--ink-2);max-width:66ch}
.doc-intro p + p{margin-top:.9rem}

/* ============================================================
   ACCORDION
   ============================================================ */
.accordion{border-top:1.5px solid var(--border)}
.accordion:first-of-type{border-top:0}

.acc-item{border-bottom:1.5px solid var(--border)}
.acc-item:last-child{border-bottom:0}

.acc-item summary{
  list-style:none;
  cursor:pointer;
  padding:1.5rem 2.5rem;
  display:grid;
  grid-template-columns:auto 1fr auto;
  gap:1.25rem;
  align-items:center;
  transition:background .18s ease;
}
.acc-item summary::-webkit-details-marker{display:none}
.acc-item summary:hover{background:var(--tint)}
.acc-item[open] summary{background:var(--tint)}

.acc-num{
  flex:none;
  width:2.5rem;height:2.5rem;border-radius:12px;
  display:grid;place-items:center;
  font-size:.8rem;font-weight:900;letter-spacing:.02em;
  color:#fff;
  transition:transform .2s ease;
}
.acc-item[open] .acc-num{transform:scale(1.05)}
.acc-num--coral{background:var(--coral)}
.acc-num--lime{background:var(--lime);color:var(--ink)}
.acc-num--violet{background:var(--violet)}
.acc-num--electric{background:var(--electric)}
.acc-num--sun{background:var(--sun);color:var(--ink)}
.acc-num--ink{background:var(--ink)}

.acc-title{
  font-size:1.1rem;font-weight:800;letter-spacing:-.025em;
  color:var(--ink);line-height:1.25;
}
.acc-sub{
  display:block;font-size:.82rem;font-weight:500;color:var(--muted);
  letter-spacing:0;margin-top:.2rem;line-height:1.4;
}

.acc-toggle{
  position:relative;
  width:2.25rem;height:2.25rem;border-radius:50%;
  border:1.5px solid var(--border);
  background:var(--surface);
  display:grid;place-items:center;
  flex:none;
  transition:transform .22s ease,background .22s ease,border-color .22s ease;
}
.acc-toggle::before,
.acc-toggle::after{
  content:"";position:absolute;
  background:var(--ink);border-radius:2px;
  transition:transform .22s ease,opacity .22s ease,background .22s ease;
}
.acc-toggle::before{width:12px;height:2px}
.acc-toggle::after{width:2px;height:12px}

.acc-item summary:hover .acc-toggle{border-color:var(--ink)}
.acc-item[open] .acc-toggle{background:var(--ink);border-color:var(--ink);transform:rotate(180deg)}
.acc-item[open] .acc-toggle::before{background:#fff}
.acc-item[open] .acc-toggle::after{opacity:0;transform:rotate(90deg)}

.acc-body{
  padding:0 2.5rem 2.25rem 6.25rem;
  animation:accFade .28s ease;
}
@keyframes accFade{
  from{opacity:0;transform:translateY(-6px)}
  to{opacity:1;transform:translateY(0)}
}

.acc-body > p{font-size:.96rem;color:var(--ink-2);margin-bottom:1rem;line-height:1.65}
.acc-body > p:last-child{margin-bottom:0}

.acc-body h3{
  font-size:.98rem;font-weight:800;letter-spacing:-.015em;
  margin:1.5rem 0 .6rem;
}
.acc-body h3:first-child{margin-top:0}

.acc-body ul{margin:.75rem 0 1.1rem;display:grid;gap:.6rem}
.acc-body ul li{
  position:relative;padding-left:1.4rem;
  font-size:.94rem;color:var(--ink-2);line-height:1.6;
}
.acc-body ul li::before{
  content:"";position:absolute;left:.3rem;top:.62rem;
  width:6px;height:6px;border-radius:2px;background:var(--coral);
}
.acc-body ul li strong{color:var(--ink);font-weight:700}

/* Definition blocks */
.deflist{display:grid;gap:.85rem;margin:1.1rem 0}
.deflist > div{
  background:var(--tint);
  border:1px solid var(--border);
  border-radius:var(--radius-sm);
  padding:1.05rem 1.15rem;
  transition:border-color .18s ease;
}
.deflist > div:hover{border-color:var(--border-2)}
.deflist dt{
  font-size:.72rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase;
  color:var(--coral-dark);margin-bottom:.4rem;
}
.deflist dd{font-size:.93rem;color:var(--ink-2);line-height:1.6}

/* Callout */
.callout{
  margin:1.25rem 0;
  padding:1.15rem 1.35rem;
  background:var(--surface);
  border:1.5px solid var(--border);
  border-left:4px solid var(--coral);
  border-radius:var(--radius-sm);
}
.callout--lime{border-left-color:var(--lime)}
.callout--violet{border-left-color:var(--violet)}
.callout--electric{border-left-color:var(--electric)}

.callout-label{
  font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;
  color:var(--coral-dark);margin-bottom:.4rem;
}
.callout--lime .callout-label{color:#6b7a00}
.callout--violet .callout-label{color:var(--violet-dark)}
.callout--electric .callout-label{color:var(--electric)}
.callout p{font-size:.93rem;color:var(--ink-2);line-height:1.6}

.doc-link{
  color:var(--coral-dark);font-weight:700;
  border-bottom:2px solid var(--lime);
  transition:color .16s ease;
}
.doc-link:hover{color:var(--ink)}

/* ============================================================
   CONTACT BLOCK
   ============================================================ */
.doc-contact{
  margin-top:2rem;
  background:var(--ink);color:#fff;
  border-radius:var(--radius);
  padding:2.5rem;
  position:relative;overflow:hidden;
}
.doc-contact::before{
  content:"";position:absolute;right:-60px;top:-60px;
  width:240px;height:240px;border-radius:50%;
  background:radial-gradient(circle,rgba(200,255,0,.20),transparent 68%);
  pointer-events:none;
}
.doc-contact > *{position:relative;z-index:1}
.doc-contact h2{
  color:#fff;font-size:clamp(1.35rem,2.5vw,1.65rem);
  margin-bottom:.85rem;
}
.doc-contact > p{color:#a1a1aa;font-size:.95rem;max-width:56ch;margin-bottom:1.75rem;line-height:1.6}

.contact-grid{
  display:grid;grid-template-columns:repeat(2,1fr);gap:1rem 2rem;
}
.contact-item{
  padding:1rem 1.1rem;
  border:1px solid #27272a;border-radius:var(--radius-sm);
  background:rgba(255,255,255,.03);
  transition:border-color .18s ease,background .18s ease;
}
.contact-item:hover{border-color:#3f3f46;background:rgba(255,255,255,.05)}
.contact-item dt{
  font-size:.68rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase;
  color:var(--lime);margin-bottom:.45rem;
}
.contact-item dd{
  font-size:.93rem;color:#e4e4e7;line-height:1.55;
}
.contact-item dd a{color:#fff;font-weight:600;border-bottom:2px solid var(--coral)}
.contact-item dd a:hover{color:var(--lime);border-color:var(--lime)}

/* ============================================================
   CTA BLOCK
   ============================================================ */
.cta-block{
  position:relative;overflow:hidden;
  border-radius:var(--radius-lg);
  padding:4.5rem 3.5rem;
  background:linear-gradient(135deg,var(--coral) 0%,var(--violet) 100%);
  color:#fff;
  display:grid;grid-template-columns:1.4fr 1fr;gap:3rem;align-items:center;
}
.cta-block::before{
  content:"";position:absolute;inset:0;
  background-image:
    radial-gradient(circle at 15% 20%,rgba(255,255,255,.22),transparent 42%),
    radial-gradient(circle at 85% 80%,rgba(200,255,0,.18),transparent 42%);
  pointer-events:none;
}
.cta-block > *{position:relative;z-index:1}
.cta-block h2{color:#fff;font-size:clamp(2rem,4vw,3rem);max-width:18ch}
.cta-block p{color:rgba(255,255,255,.88);max-width:48ch;margin-top:1rem;font-size:1.0625rem}
.cta-actions{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:flex-end}
.cta-block .btn-primary{background:#fff;color:var(--ink);border-color:#fff;box-shadow:0 8px 24px -8px rgba(0,0,0,.4)}
.cta-block .btn-primary:hover{background:#fff;color:var(--coral-dark);transform:translateY(-2px)}
.cta-block .btn-ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.55)}
.cta-block .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--ink);color:#fff;padding:5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr 1.3fr;gap:3rem}
.footer-brand .brand{color:#fff}
.footer-brand .brand-mark{background:var(--coral);color:#fff}
.footer-brand p{color:#a1a1aa;font-size:.9rem;margin-top:1.25rem;max-width:34ch;line-height:1.6}
.footer-col h4{
  font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;
  color:#71717a;margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.7rem}
.footer-col a,.footer-col span{font-size:.92rem;color:#d4d4d8}
.footer-col a:hover{color:var(--lime)}
.footer-bottom{
  margin-top:4rem;padding-top:1.75rem;border-top:1px solid #27272a;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.82rem;color:#71717a;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .summary-grid{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .cta-block{grid-template-columns:1fr;padding:3rem 2rem;gap:2rem}
  .cta-actions{justify-content:flex-start}
  .doc-shell{padding:1.75rem}
  .acc-body{padding-left:2.5rem}
  .contact-grid{grid-template-columns:1fr}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.35rem;
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    margin:0 1rem;padding:.75rem;
    box-shadow:var(--shadow-md);
  }
  .nav a{padding:.75rem 1rem;border-radius:var(--radius-sm)}
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
}

@media (max-width:680px){
  .section{padding:4rem 0}
  .section-tight{padding:2.75rem 0}
  .page-hero{padding:2.5rem 0 2rem}
  .footer-grid{grid-template-columns:1fr;gap:2rem}

  .doc-shell{padding:1.25rem;border-radius:var(--radius)}
  .doc-intro{padding:1.75rem 1.5rem 1.5rem}

  .acc-item summary{padding:1.25rem 1.5rem;gap:.85rem}
  .acc-num{width:2.15rem;height:2.15rem;border-radius:10px;font-size:.75rem}
  .acc-title{font-size:1rem}
  .acc-sub{font-size:.78rem}
  .acc-toggle{width:2rem;height:2rem}
  .acc-body{padding:0 1.5rem 1.75rem 1.5rem}

  .doc-contact{padding:1.75rem 1.5rem}
}

@media (max-width:520px){
  .container,.container-narrow{padding-inline:1.15rem}
  .summary-grid{grid-template-columns:1fr}
  .cta-block{padding:2.25rem 1.5rem}
  .cta-block .cta-actions{width:100%}
  .cta-block .cta-actions .btn{width:100%}
  .doc-meta{flex-direction:column;gap:.4rem}
  .acc-item summary{grid-template-columns:auto 1fr;gap:.75rem}
  .acc-toggle{grid-column:1/-1;justify-self:start;margin-top:.25rem}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">
  <div class="container header-inner">
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <div class="header-bar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        Premier<span style="color:var(--coral)">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/privacy-policy">Privacy</a>
        <a href="/c/terms-conditions" aria-current="page">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-dark header-cta">Book a Tour</a>
        <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
          <span></span><span></span><span></span>
        </label>
      </div>
    </div>
  </div>
</header>

<main>

  <!-- ================= PAGE HERO ================= -->
  <section class="page-hero">
    <div class="container page-hero-inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Terms of Service</span>
      </nav>

      <span class="eyebrow-pill">Legal · Terms</span>

      <h1>The rules of the road. <span class="mark">Written</span> to be read.</h1>

      <p class="lead">
        These terms govern your use of the PremierPM website and tenant portal, the handling of
        rental applications and holding fees, the accuracy of our listings, and the limits of our
        liability for property upkeep reporting. Tap any section to open it.
      </p>

      <ul class="doc-meta">
        <li>Effective date: March 1, 2025</li>
        <li>Last reviewed: March 1, 2025</li>
        <li>Applies to premierpm.example, the tenant portal, and all managed properties</li>
      </ul>
    </div>
  </section>

  <!-- ================= DOCUMENT ================= -->
  <section class="section" style="padding-top:1rem">
    <div class="container-narrow">

      <!-- Summary tiles -->
      <div class="summary-grid">
        <div class="summary-tile">
          <div class="summary-dot summary-dot--coral"></div>
          <div class="summary-label">App fees</div>
          <div class="summary-value">Non-refundable, applied to every adult applicant</div>
        </div>
        <div class="summary-tile">
          <div class="summary-dot summary-dot--lime"></div>
          <div class="summary-label">Holding fees</div>
          <div class="summary-value">Applied to first month's rent if you sign</div>
        </div>
        <div class="summary-tile">
          <div class="summary-dot summary-dot--violet"></div>
          <div class="summary-label">Listings</div>
          <div class="summary-value">Pricing, availability &amp; measurements may change</div>
        </div>
        <div class="summary-tile">
          <div class="summary-dot summary-dot--electric"></div>
          <div class="summary-label">Liability</div>
          <div class="summary-value">Capped at 12 months of rent, statutory rights preserved</div>
        </div>
      </div>

      <!-- Document card with accordion -->
      <div class="doc-shell">
        <div class="doc-card">

          <div class="doc-intro">
            <h2>Terms of Service</h2>
            <p>
              These Terms of Service ("Terms") form a binding agreement between you and Premier
              Property Management ("PremierPM", "we", "us"). They apply to anyone who visits our
              website, submits a rental application, uses the tenant portal, or occupies a unit in
              a building we manage.
            </p>
            <p>
              Please read them carefully. If you do not agree with any part of these Terms, do not
              use the portal or submit an application.
            </p>
          </div>

          <!-- 01 -->
          <details class="acc-item accordion" open>
            <summary>
              <span class="acc-num acc-num--coral" aria-hidden="true">01</span>
              <span>
                <span class="acc-title">Acceptance of Terms</span>
                <span class="acc-sub">When this agreement starts applying to you</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                By accessing our website, creating a portal account, submitting an application, or
                signing a lease for a managed property, you confirm that you have read,
                understood, and agreed to be bound by these Terms.
              </p>
              <p>
                Where a signed lease or a separate written management agreement conflicts with
                these Terms, the signed lease or agreement controls for the specific matter it
                addresses. These Terms fill the gaps for everything else.
              </p>
            </div>
          </details>

          <!-- 02 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--lime" aria-hidden="true">02</span>
              <span>
                <span class="acc-title">Portal Usage Agreement</span>
                <span class="acc-sub">Your account, acceptable use, and availability</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                The PremierPM tenant portal lets residents pay rent, submit maintenance requests,
                view documents, and manage their lease. Access is granted to verified residents and
                authorized applicants only.
              </p>

              <h3>Your account</h3>
              <ul>
                <li>You must provide accurate, current information when registering.</li>
                <li>You are responsible for keeping your password confidential and for all activity under your account.</li>
                <li>You must notify us immediately if you suspect unauthorized access.</li>
                <li>Accounts are personal. Do not share your login with anyone outside your household.</li>
              </ul>

              <h3>Acceptable use</h3>
              <ul>
                <li>Do not attempt to access accounts, units, or records that do not belong to you.</li>
                <li>Do not scrape, crawl, or bulk-download portal content.</li>
                <li>Do not upload files containing malware or attempt to compromise portal security.</li>
                <li>Do not use the portal to harass staff, other residents, or vendors.</li>
              </ul>

              <div class="callout callout--electric">
                <div class="callout-label">Service availability</div>
                <p>
                  We aim to keep the portal available at all times, but we do not guarantee
                  uninterrupted access. Scheduled maintenance is announced in advance; emergency
                  maintenance may occur without notice. Rent is still due on its scheduled date
                  even if the portal is briefly unavailable — call the office if you cannot pay on
                  time.
                </p>
              </div>
            </div>
          </details>

          <!-- 03 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--violet" aria-hidden="true">03</span>
              <span>
                <span class="acc-title">Application &amp; Holding Fee Terms</span>
                <span class="acc-sub">Non-refundable fees, deposits, and screening criteria</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                Before you submit an application, review the fee terms below. They are strict and
                applied consistently to every applicant.
              </p>

              <dl class="deflist">
                <div>
                  <dt>Application fee — non-refundable</dt>
                  <dd>
                    Every adult applicant pays a non-refundable application fee to cover the cost
                    of credit, background, and rental history screening. This fee is not refunded
                    whether your application is approved or denied.
                  </dd>
                </div>
                <div>
                  <dt>Holding fee — conditionally applied</dt>
                  <dd>
                    A holding fee may be required to take a unit off the market while your
                    application is processed and your lease is prepared. If you sign the lease,
                    the holding fee is applied to your first month's rent. If you fail to sign
                    within the agreed window, the holding fee is forfeited, except where local law
                    requires a refund.
                  </dd>
                </div>
                <div>
                  <dt>Security deposit — separate from fees</dt>
                  <dd>
                    A security deposit is collected at lease signing and held according to state
                    and local law. It is not the same as the holding fee and is not applied to
                    rent.
                  </dd>
                </div>
                <div>
                  <dt>Processing timeline</dt>
                  <dd>
                    Applications are typically reviewed within two to three business days,
                    depending on how quickly your references and screening partners respond.
                  </dd>
                </div>
              </dl>

              <h3>What we screen for</h3>
              <ul>
                <li>Identity verification against a government-issued photo ID.</li>
                <li>Credit history and any prior eviction filings.</li>
                <li>Verified income sufficient to meet the stated income-to-rent ratio.</li>
                <li>Landlord references for your two most recent tenancies, where available.</li>
              </ul>

              <p>
                Rental criteria are published in writing and applied to every applicant for the
                same unit. We do not negotiate screening standards on an individual basis.
              </p>
            </div>
          </details>

          <!-- 04 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--electric" aria-hidden="true">04</span>
              <span>
                <span class="acc-title">Listing Accuracy Disclaimer</span>
                <span class="acc-sub">Availability, pricing, measurements, and amenities</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We work hard to keep our listings current and accurate. Even so, listings change
                quickly and mistakes happen.
              </p>
              <ul>
                <li><strong>Availability</strong> — a unit shown as available may be placed under application or taken off the market at any time.</li>
                <li><strong>Pricing</strong> — advertised rent is subject to change until a lease is signed. Concessions and specials have their own terms and expiration dates.</li>
                <li><strong>Measurements</strong> — square footage, room dimensions, and lot sizes are approximate and may vary from unit to unit within the same floor plan.</li>
                <li><strong>Amenities</strong> — amenities shown may be available in some buildings but not others, and building services can be temporarily unavailable for repairs or seasonal closures.</li>
                <li><strong>Images</strong> — photographs and floor plans are for illustration and may show a model unit, not the exact unit you will lease.</li>
              </ul>
              <p>
                We encourage every prospective resident to tour the specific unit they intend to
                rent and to confirm all details in writing before signing a lease. Nothing on the
                website constitutes an offer to lease.
              </p>
            </div>
          </details>

          <!-- 05 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--sun" aria-hidden="true">05</span>
              <span>
                <span class="acc-title">Resident Conduct &amp; Property Rules</span>
                <span class="acc-sub">Reporting, access, and shared-space expectations</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                Your lease contains the full set of building rules. The points below summarize the
                conduct requirements that affect how we operate shared systems.
              </p>
              <ul>
                <li>Report damage, leaks, and safety hazards promptly through the maintenance portal.</li>
                <li>Provide reasonable access for scheduled inspections and repairs as required by your lease and local law.</li>
                <li>Do not interfere with building systems, common areas, or other residents' quiet enjoyment.</li>
                <li>Follow the pet policy in your lease, including registration and any applicable pet fees.</li>
                <li>Dispose of waste in the designated areas and follow building recycling rules.</li>
              </ul>
              <p>
                Failure to follow building rules may result in a written notice and, if the issue
                continues, in enforcement action under the terms of your lease.
              </p>
            </div>
          </details>

          <!-- 06 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--coral" aria-hidden="true">06</span>
              <span>
                <span class="acc-title">Limitation of Liability</span>
                <span class="acc-sub">Upkeep reporting, service interruptions, and the liability cap</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                To the fullest extent permitted by law, PremierPM is not liable for indirect,
                incidental, special, or consequential damages arising from your use of the website,
                the portal, or our management services.
              </p>

              <h3>Property upkeep reporting</h3>
              <p>
                Residents are responsible for reporting maintenance issues in a timely and accurate
                manner. We are not liable for damage that results from a maintenance issue you
                failed to report, or from a delay caused by a vendor's schedule that is beyond our
                reasonable control.
              </p>
              <p>
                We are also not liable for service interruptions to utilities, internet, or
                building systems caused by third-party providers, severe weather, or other events
                outside our control.
              </p>

              <h3>Cap on liability</h3>
              <p>
                Where liability cannot be excluded entirely, our total liability to you for any
                claim arising out of these Terms or your tenancy is limited to the total amount of
                rent you have paid to us in the twelve months preceding the event giving rise to
                the claim.
              </p>

              <div class="callout callout--violet">
                <div class="callout-label">Statutory rights preserved</div>
                <p>
                  Nothing in these Terms limits rights you hold under applicable landlord-tenant
                  law, fair housing law, or consumer protection law that cannot be waived by
                  contract.
                </p>
              </div>
            </div>
          </details>

          <!-- 07 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--violet" aria-hidden="true">07</span>
              <span>
                <span class="acc-title">Indemnification</span>
                <span class="acc-sub">Your responsibility for claims arising from your use</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                You agree to indemnify and hold PremierPM harmless from any claim, loss, or expense
                — including reasonable legal fees — arising from:
              </p>
              <ul>
                <li>Your breach of these Terms or of your lease.</li>
                <li>Your misuse of the tenant portal.</li>
                <li>Damage to property or injury to persons caused by you, your household, or your guests.</li>
                <li>Information you submit that is false, misleading, or incomplete.</li>
              </ul>
              <p>
                This obligation survives the end of your tenancy or your portal account.
              </p>
            </div>
          </details>

          <!-- 08 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--lime" aria-hidden="true">08</span>
              <span>
                <span class="acc-title">Suspension &amp; Termination</span>
                <span class="acc-sub">When we may close your portal access</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We may suspend or terminate portal access if you breach these Terms, if your
                account shows signs of compromise, or if continuing access would create a security
                or legal risk.
              </p>
              <p>
                Terminating portal access does not terminate your lease. Rent obligations,
                maintenance reporting duties, and all other lease terms remain in effect. Where
                possible, we will provide an alternative method for you to pay rent and submit
                maintenance requests.
              </p>
              <p>
                You may close your portal account at any time by contacting the leasing office.
                Some records are retained after closure as described in our
                <a href="/c/privacy-policy" class="doc-link">Privacy Policy</a>.
              </p>
            </div>
          </details>

          <!-- 09 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--electric" aria-hidden="true">09</span>
              <span>
                <span class="acc-title">Governing Law &amp; Disputes</span>
                <span class="acc-sub">Which law applies, and how we resolve disagreements</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                These Terms are governed by the laws of the state in which the managed property is
                located, without regard to conflict-of-law rules.
              </p>
              <p>
                Before pursuing formal action, we ask that you contact our office so we can attempt
                to resolve the issue directly. Most concerns — billing questions, maintenance
                delays, renewal terms — are settled at that stage.
              </p>
              <p>
                If a dispute cannot be resolved informally, it will be handled in the courts of the
                county where the property is located, unless applicable law requires a different
                forum or process.
              </p>
            </div>
          </details>

          <!-- 10 -->
          <details class="acc-item accordion">
            <summary>
              <span class="acc-num acc-num--ink" aria-hidden="true">10</span>
              <span>
                <span class="acc-title">Changes to These Terms</span>
                <span class="acc-sub">How updates take effect, and what to do if you disagree</span>
              </span>
              <span class="acc-toggle" aria-hidden="true"></span>
            </summary>
            <div class="acc-body">
              <p>
                We may update these Terms from time to time to reflect changes in our services, in
                the law, or in how the portal operates.
              </p>
              <p>
                When we make a material change, we will update the effective date at the top of
                this page and post a notice in the tenant portal and in building common areas.
                Continued use of the portal or continued tenancy after the change takes effect
                constitutes acceptance of the updated Terms.
              </p>
              <p>
                If you do not agree with an update, you may stop using the portal. Your lease
                continues to be governed by its own terms, including any notice provisions it
                contains.
              </p>
            </div>
          </details>

        </div>

        <!-- Contact block -->
        <div class="doc-contact">
          <h2>Questions about these Terms</h2>
          <p>
            If anything here is unclear, or if you need a copy of the rental criteria or a sample
            lease before applying, contact our legal and leasing team using the details below.
          </p>

          <dl class="contact-grid">
            <div class="contact-item">
              <dt>Email</dt>
              <dd><a href="mailto:legal@premierpm.example">legal@premierpm.example</a></dd>
            </div>
            <div class="contact-item">
              <dt>Phone</dt>
              <dd><a href="tel:+15550123456">(555) 012-3456</a> · Mon–Fri, 9–18</dd>
            </div>
            <div class="contact-item">
              <dt>Postal address</dt>
              <dd>PremierPM · Attn: Legal<br>450 Harrison Ave, Suite 12, City Center, ST 10024</dd>
            </div>
            <div class="contact-item">
              <dt>Related documents</dt>
              <dd>
                <a href="/c/privacy-policy">Privacy Policy</a> ·
                <a href="/c/contact">Contact the leasing office</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section" style="padding-top:0">
    <div class="container">
      <div class="cta-block">
        <div>
          <h2>Want to know how we handle your data too?</h2>
          <p>
            Our Privacy Policy covers screening documents, lease logs, rent records, and the
            rights you hold over your own information.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/privacy-policy" class="btn btn-primary btn-lg">Read Privacy Policy</a>
          <a href="/c/contact" class="btn btn-ghost btn-lg">Contact Us</a>
        </div>
      </div>
    </div>
  </section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">
          <span class="brand-mark" aria-hidden="true"></span>
          Premier<span style="color:var(--coral)">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed
          with transparent pricing and a maintenance team that shows up.
        </p>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/c/about">About</a></li>
          <li><a href="/c/contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/c/privacy-policy">Privacy Policy</a></li>
          <li><a href="/c/terms-conditions">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+15550123456">(555) 012-3456</a></li>
          <li><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></li>
          <li><span>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</span></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2025 Premier Property Management. All rights reserved.</span>
      <span>Equal Housing Opportunity · Licensed Property Manager #PM-44821</span>
    </div>
  </div>
</footer>

</body>
</html>
`