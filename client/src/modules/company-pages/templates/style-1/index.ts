export const style1Landing = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Premier Property Management &amp; Leasing in the City</title>
<meta name="description" content="Transparent leasing, well-maintained apartments, and 24/7 maintenance. Premier Property Management operates 250+ residential units across the metro.">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0f172a;
  --ink-2:#334155;
  --muted:#64748b;
  --muted-2:#94a3b8;
  --accent:#3b82f6;
  --accent-dark:#2563eb;
  --accent-soft:#eff6ff;
  --accent-line:#dbeafe;
  --accent-ring:rgba(59,130,246,.18);
  --bg:#f8fafc;
  --surface:#ffffff;
  --border:#e2e8f0;
  --border-2:#cbd5e1;
  --radius:6px;
  --radius-sm:4px;
  --shadow-xs:0 1px 2px 0 rgb(15 23 42 / .04);
  --shadow-sm:0 4px 6px -1px rgb(15 23 42 / .05), 0 2px 4px -2px rgb(15 23 42 / .04);
  --shadow-md:0 12px 28px -10px rgb(15 23 42 / .14), 0 4px 10px -4px rgb(15 23 42 / .06);
  --max:1160px;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:2px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:700;letter-spacing:-.025em;line-height:1.15;color:var(--ink)}
h1{font-size:clamp(2.1rem,4.4vw,3.15rem);letter-spacing:-.035em;line-height:1.06}
h2{font-size:clamp(1.5rem,2.6vw,1.95rem)}
h3{font-size:1.0625rem;font-weight:600;letter-spacing:-.012em}
p{color:var(--ink-2)}
.lead{font-size:1.0625rem;line-height:1.7;color:var(--muted)}
.accent{color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:4.5rem 0}
.section-tight{padding:3rem 0}
.grid{display:grid;gap:1.25rem}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-2{grid-template-columns:repeat(2,1fr)}
.grid-4{grid-template-columns:repeat(4,1fr)}

.section-head{max-width:640px;margin-bottom:2.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.eyebrow{
  display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:.85rem;
}
.section-head h2{margin-bottom:.75rem}

.rule{height:1px;background:var(--border);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(248,250,252,.85);
  backdrop-filter:saturate(180%) blur(12px);
  -webkit-backdrop-filter:saturate(180%) blur(12px);
  border-bottom:1px solid var(--border);
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:4.25rem}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:1.0625rem;letter-spacing:-.03em;color:var(--ink)}
.brand-mark{position:relative;flex:none;width:1.55rem;height:1.55rem;border-radius:var(--radius-sm);background:var(--ink)}
.brand-mark::after{content:"";position:absolute;right:0;bottom:0;width:.6rem;height:.6rem;background:var(--accent);border-radius:0 0 var(--radius-sm) 0}

.nav{display:flex;align-items:center;gap:.15rem}
.nav a{
  display:inline-block;padding:.5rem .8rem;border-radius:var(--radius-sm);
  font-size:.9rem;font-weight:500;color:var(--ink-2);
  transition:background .16s ease,color .16s ease;
}
.nav a:hover{color:var(--ink);background:rgba(15,23,42,.05)}
.nav a[aria-current="page"]{color:var(--accent-dark);background:var(--accent-soft);font-weight:600}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink);border-radius:2px;transition:transform .2s ease,opacity .2s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  padding:.72rem 1.25rem;border-radius:var(--radius);
  font-size:.9rem;font-weight:600;letter-spacing:-.005em;
  border:1px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .16s ease,box-shadow .16s ease,background .16s ease,border-color .16s ease,color .16s ease;
}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 1px 2px rgb(37 99 235 / .25)}
.btn-primary:hover{background:var(--accent-dark);border-color:var(--accent-dark);transform:translateY(-1px);box-shadow:0 8px 20px -6px rgb(37 99 235 / .5)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--border-2);box-shadow:var(--shadow-xs)}
.btn-secondary:hover{border-color:var(--muted-2);transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.btn-lg{padding:.85rem 1.5rem;font-size:.95rem}
.btn-block{width:100%}

/* ============================================================
   CARDS, BADGES, THUMBS
   ============================================================ */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-xs);transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}
.card-pad{padding:1.5rem}
.card-hover:hover{border-color:var(--border-2);box-shadow:var(--shadow-md);transform:translateY(-3px)}

.badge{
  display:inline-flex;align-items:center;gap:.35rem;
  padding:.22rem .6rem;border-radius:100px;
  font-size:.68rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
  background:var(--accent-soft);color:var(--accent-dark);border:1px solid var(--accent-line);
}
.badge-neutral{background:#f1f5f9;color:var(--ink-2);border-color:var(--border)}
.badge::before{content:"";width:.35rem;height:.35rem;border-radius:50%;background:currentColor;opacity:.9}
.badge-neutral::before{background:var(--muted-2)}

.thumb{
  position:relative;aspect-ratio:16/10;border-radius:var(--radius-sm);
  border:1px solid var(--border);overflow:hidden;
  background:linear-gradient(140deg,#f1f5f9 0%,#e2e8f0 100%);
}
.thumb::before{
  content:"";position:absolute;inset:0;
  background-image:linear-gradient(rgba(148,163,184,.18) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(148,163,184,.18) 1px,transparent 1px);
  background-size:22px 22px;
}
.thumb span{
  position:absolute;inset:0;display:grid;place-items:center;
  font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);
}

/* ============================================================
   HERO
   ============================================================ */
.hero{padding:4.25rem 0 3rem}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:4rem;align-items:center}
.hero h1{margin-bottom:1.25rem}
.hero .lead{max-width:52ch;margin-bottom:2rem}
.hero-actions{display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1.75rem}
.hero-meta{display:flex;flex-wrap:wrap;gap:.6rem 1.4rem;font-size:.82rem;color:var(--muted)}
.hero-meta li{display:flex;align-items:center;gap:.5rem}
.hero-meta li::before{content:"";width:.4rem;height:.4rem;border-radius:50%;background:var(--accent)}

.showcase{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  box-shadow:var(--shadow-md);padding:1.25rem;
}
.showcase-top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:1rem}
.showcase-name{font-size:.95rem;font-weight:600}
.showcase-addr{font-size:.78rem;color:var(--muted);margin-top:.15rem}
.showcase-specs{
  display:flex;flex-wrap:wrap;gap:.4rem 1.25rem;font-size:.82rem;color:var(--muted);
  padding:.9rem 0;margin-top:.9rem;border-top:1px solid var(--border);
}
.showcase-foot{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding-top:.25rem}
.showcase-price{font-size:1.4rem;font-weight:700;letter-spacing:-.03em}
.showcase-price small{font-size:.76rem;font-weight:500;color:var(--muted);letter-spacing:0}

/* ============================================================
   SEARCH BAR
   ============================================================ */
.search-bar{
  margin-top:2.75rem;background:var(--surface);border:1px solid var(--border);
  border-radius:var(--radius);box-shadow:var(--shadow-sm);padding:1rem;
  display:grid;grid-template-columns:repeat(3,1fr) auto;gap:.75rem;align-items:end;
}
.sfield{display:flex;flex-direction:column;gap:.35rem;min-width:0}
.sfield label{font-size:.7rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--muted-2);padding-left:.15rem}
.sfield select,.sfield input{
  width:100%;padding:.62rem .8rem;border:1px solid var(--border);border-radius:var(--radius-sm);
  background-color:var(--bg);font-size:.9rem;transition:.16s ease;
  appearance:none;
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right .75rem center;padding-right:2.1rem;
}
.sfield input{background-image:none;padding-right:.8rem}
.sfield select:focus,.sfield input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring);background-color:var(--surface)}

/* ============================================================
   STATS STRIP
   ============================================================ */
.stats{
  display:grid;grid-template-columns:repeat(4,1fr);
  border:1px solid var(--border);border-radius:var(--radius);
  background:var(--surface);box-shadow:var(--shadow-xs);overflow:hidden;
}
.stat{padding:1.5rem 1.5rem;border-right:1px solid var(--border)}
.stat:last-child{border-right:0}
.stat-value{font-size:1.6rem;font-weight:700;letter-spacing:-.035em;line-height:1.1}
.stat-label{font-size:.8rem;color:var(--muted);margin-top:.3rem}

/* ============================================================
   PROPERTY CARDS
   ============================================================ */
.property{display:flex;flex-direction:column;overflow:hidden}
.property .card-pad{display:flex;flex-direction:column;flex:1;padding:1.25rem 1.35rem 1.4rem}
.property-head{display:flex;justify-content:space-between;align-items:flex-start;gap:.75rem;margin-bottom:.3rem}
.property-title{font-size:1rem;font-weight:600;letter-spacing:-.015em}
.property-addr{font-size:.82rem;color:var(--muted);margin-bottom:.9rem}
.specs{
  display:flex;flex-wrap:wrap;gap:.45rem 1rem;font-size:.82rem;color:var(--ink-2);
  padding:.85rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:1rem;
}
.specs span{display:inline-flex;align-items:center;gap:.45rem}
.specs span::before{content:"";width:5px;height:5px;border-radius:1px;background:var(--accent);opacity:.6}
.property-foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:1rem}
.price{font-size:1.3rem;font-weight:700;letter-spacing:-.03em}
.price small{font-size:.74rem;font-weight:500;color:var(--muted);letter-spacing:0}
.link-arrow{display:inline-flex;align-items:center;gap:.35rem;font-size:.84rem;font-weight:600;color:var(--accent)}
.link-arrow::after{content:"→";transition:transform .18s ease}
.link-arrow:hover::after{transform:translateX(3px)}

/* ============================================================
   FEATURE CARDS
   ============================================================ */
.feature .icon{
  width:2.5rem;height:2.5rem;border-radius:var(--radius-sm);
  background:var(--accent-soft);border:1px solid var(--accent-line);
  display:grid;place-items:center;color:var(--accent-dark);margin-bottom:1.15rem;
}
.feature h3{margin-bottom:.5rem}
.feature p{font-size:.92rem}

/* ============================================================
   PRICING
   ============================================================ */
.pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;align-items:start}
.plan{
  position:relative;display:flex;flex-direction:column;
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:1.85rem 1.75rem;box-shadow:var(--shadow-xs);
  transition:box-shadow .18s ease,transform .18s ease,border-color .18s ease;
}
.plan:hover{box-shadow:var(--shadow-md);transform:translateY(-3px)}
.plan.featured{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent),var(--shadow-md)}
.plan-tag{
  position:absolute;top:-.72rem;left:1.75rem;
  background:var(--accent);color:#fff;font-size:.64rem;font-weight:700;
  letter-spacing:.11em;text-transform:uppercase;padding:.25rem .7rem;border-radius:100px;
}
.plan-name{font-size:.95rem;font-weight:700;letter-spacing:-.01em}
.plan-desc{font-size:.85rem;color:var(--muted);margin-top:.35rem;min-height:2.7em}
.plan-price{font-size:2rem;font-weight:700;letter-spacing:-.04em;margin:1.35rem 0 .2rem;line-height:1}
.plan-price small{display:block;font-size:.76rem;font-weight:500;color:var(--muted);letter-spacing:0;margin-top:.35rem}
.plan ul{margin:1.5rem 0 1.75rem;display:grid;gap:.62rem}
.plan li{display:flex;gap:.6rem;align-items:flex-start;font-size:.875rem;color:var(--ink-2)}
.plan li::before{content:"✓";font-size:.85rem;font-weight:700;color:var(--accent);line-height:1.55}
.plan .btn{margin-top:auto}

/* ============================================================
   CTA BAND
   ============================================================ */
.cta-band{
  position:relative;overflow:hidden;
  background:var(--ink);border-radius:var(--radius);padding:3rem;
  display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap;
}
.cta-band::after{
  content:"";position:absolute;right:-90px;top:-90px;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(59,130,246,.35),transparent 68%);pointer-events:none;
}
.cta-band h2{color:#fff;max-width:22ch}
.cta-band p{color:#94a3b8;max-width:46ch;margin-top:.7rem}
.cta-band .cta-actions{position:relative;display:flex;gap:.75rem;flex-wrap:wrap}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--surface);border-top:1px solid var(--border);padding:3.5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1.2fr;gap:2.5rem}
.footer-brand p{font-size:.87rem;color:var(--muted);margin-top:1rem;max-width:34ch}
.footer-col h4{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1rem}
.footer-col li + li{margin-top:.55rem}
.footer-col a,.footer-col span{font-size:.88rem;color:var(--ink-2)}
.footer-col a:hover{color:var(--accent)}
.footer-bottom{
  margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.8rem;color:var(--muted);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px){
  .grid-4{grid-template-columns:repeat(2,1fr)}
  .grid-3{grid-template-columns:repeat(2,1fr)}
  .pricing{grid-template-columns:1fr;max-width:520px;margin-inline:auto}
  .plan.featured{transform:none}
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .hero{padding:3rem 0 2.5rem}
  .hero-grid{grid-template-columns:1fr;gap:3rem}
  .hero .lead{max-width:none}
  .stats{grid-template-columns:1fr 1fr}
  .stat:nth-child(2){border-right:0}
  .stat:nth-child(1),.stat:nth-child(2){border-bottom:1px solid var(--border)}
  .cta-band{padding:2.5rem}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.1rem;
    background:var(--surface);border-bottom:1px solid var(--border);
    padding:.6rem .75rem 1rem;box-shadow:var(--shadow-md);
  }
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
}

@media (max-width:820px){
  .search-bar{grid-template-columns:1fr 1fr}
  .search-bar .btn{grid-column:1/-1}
}

@media (max-width:680px){
  .grid-3,.grid-2,.grid-4{grid-template-columns:1fr}
  .section{padding:3rem 0}
  .section-tight{padding:2.25rem 0}
  .cta-band{padding:2rem;flex-direction:column;align-items:flex-start}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .search-bar{grid-template-columns:1fr}
  .stats{grid-template-columns:1fr}
  .stat{border-right:0;border-bottom:1px solid var(--border)}
  .stat:last-child{border-bottom:0}
  .hero-actions .btn{width:100%}
  .cta-band .cta-actions{width:100%}
  .cta-band .cta-actions .btn{width:100%}
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
        Premier<span class="accent">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/" aria-current="page">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-primary header-cta">Book a Tour</a>
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
      <div class="hero-grid">
        <div>
          <span class="eyebrow">Now leasing · 40+ units available</span>
          <h1>Premier Property Management &amp; Leasing in the City</h1>
          <p class="lead">
            Transparent leasing, well-maintained units, and a team that actually answers the phone.
            We manage 250+ residential units across the metro — and we would be glad to show you one.
          </p>

          <div class="hero-actions">
            <a href="#featured" class="btn btn-primary btn-lg">Browse Available Units</a>
            <a href="/c/contact" class="btn btn-secondary btn-lg">Book a Tour</a>
          </div>

          <ul class="hero-meta">
            <li>No hidden application fees</li>
            <li>24/7 maintenance line</li>
            <li>Pet-friendly buildings</li>
          </ul>
        </div>

        <!-- Property showcase -->
        <div class="showcase">
          <div class="showcase-top">
            <div>
              <div class="showcase-name">Harbor View Lofts · Unit 14B</div>
              <div class="showcase-addr">218 Harbor Street, Riverside District</div>
            </div>
            <span class="badge">Available Now</span>
          </div>

          <div class="thumb"><span>Harbor View Lofts</span></div>

          <div class="showcase-specs">
            <span>2 Bedrooms</span>
            <span>2 Bathrooms</span>
            <span>1,050 sq ft</span>
            <span>Pet Friendly</span>
          </div>

          <div class="showcase-foot">
            <div class="showcase-price">$2,450 <small>/ month</small></div>
            <a href="/c/contact" class="link-arrow">Schedule a viewing</a>
          </div>
        </div>
      </div>

      <!-- Quick search -->
      <form class="search-bar" action="/" method="get" role="search" aria-label="Search available units">
        <div class="sfield">
          <label for="q-neighborhood">Neighborhood</label>
          <select id="q-neighborhood" name="neighborhood">
            <option value="">All neighborhoods</option>
            <option>Downtown Core</option>
            <option>Riverside District</option>
            <option>Cedar Park</option>
            <option>Northgate</option>
          </select>
        </div>
        <div class="sfield">
          <label for="q-beds">Bedrooms</label>
          <select id="q-beds" name="beds">
            <option value="">Any size</option>
            <option>Studio</option>
            <option>1 Bedroom</option>
            <option>2 Bedrooms</option>
            <option>3+ Bedrooms</option>
          </select>
        </div>
        <div class="sfield">
          <label for="q-max">Max monthly rent</label>
          <select id="q-max" name="max_rent">
            <option value="">No maximum</option>
            <option>Under $1,800</option>
            <option>$1,800 – $2,500</option>
            <option>$2,500 – $3,500</option>
            <option>$3,500+</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Search Units</button>
      </form>
    </div>
  </section>

  <!-- ================= STATS ================= -->
  <section class="section-tight">
    <div class="container">
      <div class="stats">
        <div class="stat">
          <div class="stat-value">250+</div>
          <div class="stat-label">Residential units under management</div>
        </div>
        <div class="stat">
          <div class="stat-value">98%</div>
          <div class="stat-label">Lease renewal rate across the portfolio</div>
        </div>
        <div class="stat">
          <div class="stat-value">&lt; 4 hrs</div>
          <div class="stat-label">Average maintenance response time</div>
        </div>
        <div class="stat">
          <div class="stat-value">12 yrs</div>
          <div class="stat-label">Managing homes in the metro area</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FEATURED PROPERTIES ================= -->
  <section class="section" id="featured">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Featured listings</span>
        <h2>Available right now</h2>
        <p class="lead">
          A snapshot of our current inventory. Every unit is inspected before move-in and backed by
          our 24/7 maintenance desk.
        </p>
      </div>

      <div class="grid grid-3">

        <article class="card card-hover property">
          <div class="card-pad">
            <div class="property-head">
              <div>
                <div class="property-title">Harbor View Lofts · Unit 14B</div>
              </div>
            </div>
            <div class="property-addr">218 Harbor Street, Riverside District</div>
            <div class="thumb"><span>Harbor View Lofts</span></div>
            <div class="specs">
              <span>2 Bed</span><span>2 Bath</span><span>1,050 sq ft</span>
            </div>
            <div class="property-foot">
              <div class="price">$2,450 <small>/ mo</small></div>
              <a href="/c/contact" class="link-arrow">View details</a>
            </div>
          </div>
        </article>

        <article class="card card-hover property">
          <div class="card-pad">
            <div class="property-head">
              <div>
                <div class="property-title">Cedar Park Townhomes · Unit 7</div>
              </div>
            </div>
            <div class="property-addr">76 Cedar Park Row, Cedar Park</div>
            <div class="thumb"><span>Cedar Park Townhomes</span></div>
            <div class="specs">
              <span>3 Bed</span><span>2.5 Bath</span><span>1,600 sq ft</span>
            </div>
            <div class="property-foot">
              <div class="price">$3,200 <small>/ mo</small></div>
              <a href="/c/contact" class="link-arrow">View details</a>
            </div>
          </div>
        </article>

        <article class="card card-hover property">
          <div class="card-pad">
            <div class="property-head">
              <div>
                <div class="property-title">The Metropolitan · Unit 902</div>
              </div>
            </div>
            <div class="property-addr">12 Metropolitan Plaza, Downtown Core</div>
            <div class="thumb"><span>The Metropolitan</span></div>
            <div class="specs">
              <span>1 Bed</span><span>1 Bath</span><span>720 sq ft</span>
            </div>
            <div class="property-foot">
              <div class="price">$1,850 <small>/ mo</small></div>
              <a href="/c/contact" class="link-arrow">View details</a>
            </div>
          </div>
        </article>

      </div>

      <div style="margin-top:1.75rem;display:flex;flex-wrap:wrap;gap:.5rem">
        <span class="badge">Available Now</span>
        <span class="badge badge-neutral">Pet Friendly</span>
        <span class="badge badge-neutral">Utilities Included</span>
        <span class="badge badge-neutral">In-Unit Laundry</span>
        <span class="badge badge-neutral">Parking Available</span>
      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- ================= WHY RENT WITH US ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Why rent with us</span>
        <h2>Managed properly, from day one</h2>
        <p class="lead">
          We built our operating model around the three things residents complain about most:
          slow repairs, confusing payments, and being treated like a ticket number.
        </p>
      </div>

      <div class="grid grid-3">

        <div class="card card-pad card-hover feature">
          <div class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3>24/7 maintenance tracking</h3>
          <p>
            Submit a request from your phone and follow it end to end — who was assigned, when they
            arrived, and what was replaced. Emergency line answered by a human, every night of the year.
          </p>
        </div>

        <div class="card card-pad card-hover feature">
          <div class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h3>Secure online rent portal</h3>
          <p>
            Pay rent by card or bank transfer, download monthly statements, and renew your lease
            without printing a single page. Bank-grade encryption, no convenience-fee surprises.
          </p>
        </div>

        <div class="card card-pad card-hover feature">
          <div class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Professional tenant care</h3>
          <p>
            Every resident gets a named leasing contact and a dedicated maintenance coordinator.
            Move-in, renewals, and move-out are scheduled in writing — never improvised.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= PRICING ================= -->
  <section class="section" style="background:var(--surface);border-block:1px solid var(--border)">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Management plans</span>
        <h2>Simple, flat monthly pricing</h2>
        <p class="lead">
          Pricing shown is our management fee for a typical two-bedroom unit. No percentage games,
          no surprise line items on your statement.
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
          <a href="/c/contact" class="btn btn-secondary btn-block">Get started</a>
        </div>

        <div class="plan featured">
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
          <a href="/c/contact" class="btn btn-secondary btn-block">Talk to sales</a>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Ready to see a unit in person?</h2>
          <p>
            Tours run seven days a week, including evenings. Bring your questions — we will walk you
            through the lease line by line before you sign anything.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/contact" class="btn btn-primary btn-lg">Book a Tour</a>
          <a href="/c/about" class="btn btn-secondary btn-lg">Learn About Us</a>
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
          Premier<span class="accent">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed with
          transparent pricing and a maintenance team that shows up.
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
          <li><a href="/c/policy">Privacy Policy</a></li>
          <li><a href="/c/terms">Terms of Service</a></li>
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

export const style1About = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About PremierPM · 250+ Residential Units Managed in the City</title>
<meta name="description" content="Premier Property Management has managed 250+ residential units across the metro since 2012. Meet the team and see the milestones behind our transparent leasing model.">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0f172a;
  --ink-2:#334155;
  --muted:#64748b;
  --muted-2:#94a3b8;
  --accent:#3b82f6;
  --accent-dark:#2563eb;
  --accent-soft:#eff6ff;
  --accent-line:#dbeafe;
  --accent-ring:rgba(59,130,246,.18);
  --bg:#f8fafc;
  --surface:#ffffff;
  --border:#e2e8f0;
  --border-2:#cbd5e1;
  --radius:6px;
  --radius-sm:4px;
  --shadow-xs:0 1px 2px 0 rgb(15 23 42 / .04);
  --shadow-sm:0 4px 6px -1px rgb(15 23 42 / .05), 0 2px 4px -2px rgb(15 23 42 / .04);
  --shadow-md:0 12px 28px -10px rgb(15 23 42 / .14), 0 4px 10px -4px rgb(15 23 42 / .06);
  --max:1160px;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:2px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:700;letter-spacing:-.025em;line-height:1.15;color:var(--ink)}
h1{font-size:clamp(2.05rem,4.2vw,3rem);letter-spacing:-.035em;line-height:1.07}
h2{font-size:clamp(1.45rem,2.5vw,1.9rem)}
h3{font-size:1.0625rem;font-weight:600;letter-spacing:-.012em}
p{color:var(--ink-2)}
.lead{font-size:1.0625rem;line-height:1.7;color:var(--muted)}
.accent{color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:4.5rem 0}
.section-tight{padding:3rem 0}
.grid{display:grid;gap:1.25rem}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-2{grid-template-columns:repeat(2,1fr)}

.section-head{max-width:660px;margin-bottom:2.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.eyebrow{
  display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:.85rem;
}
.section-head h2{margin-bottom:.75rem}

.rule{height:1px;background:var(--border);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(248,250,252,.85);
  backdrop-filter:saturate(180%) blur(12px);
  -webkit-backdrop-filter:saturate(180%) blur(12px);
  border-bottom:1px solid var(--border);
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:4.25rem}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:1.0625rem;letter-spacing:-.03em;color:var(--ink)}
.brand-mark{position:relative;flex:none;width:1.55rem;height:1.55rem;border-radius:var(--radius-sm);background:var(--ink)}
.brand-mark::after{content:"";position:absolute;right:0;bottom:0;width:.6rem;height:.6rem;background:var(--accent);border-radius:0 0 var(--radius-sm) 0}

.nav{display:flex;align-items:center;gap:.15rem}
.nav a{
  display:inline-block;padding:.5rem .8rem;border-radius:var(--radius-sm);
  font-size:.9rem;font-weight:500;color:var(--ink-2);
  transition:background .16s ease,color .16s ease;
}
.nav a:hover{color:var(--ink);background:rgba(15,23,42,.05)}
.nav a[aria-current="page"]{color:var(--accent-dark);background:var(--accent-soft);font-weight:600}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink);border-radius:2px;transition:transform .2s ease,opacity .2s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  padding:.72rem 1.25rem;border-radius:var(--radius);
  font-size:.9rem;font-weight:600;letter-spacing:-.005em;
  border:1px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .16s ease,box-shadow .16s ease,background .16s ease,border-color .16s ease,color .16s ease;
}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 1px 2px rgb(37 99 235 / .25)}
.btn-primary:hover{background:var(--accent-dark);border-color:var(--accent-dark);transform:translateY(-1px);box-shadow:0 8px 20px -6px rgb(37 99 235 / .5)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--border-2);box-shadow:var(--shadow-xs)}
.btn-secondary:hover{border-color:var(--muted-2);transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.btn-lg{padding:.85rem 1.5rem;font-size:.95rem}
.btn-block{width:100%}

/* ============================================================
   CARDS & BADGES
   ============================================================ */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-xs);transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}
.card-pad{padding:1.5rem}
.card-hover:hover{border-color:var(--border-2);box-shadow:var(--shadow-md);transform:translateY(-3px)}

.badge{
  display:inline-flex;align-items:center;gap:.35rem;
  padding:.22rem .6rem;border-radius:100px;
  font-size:.68rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
  background:var(--accent-soft);color:var(--accent-dark);border:1px solid var(--accent-line);
}
.badge-neutral{background:#f1f5f9;color:var(--ink-2);border-color:var(--border)}
.badge::before{content:"";width:.35rem;height:.35rem;border-radius:50%;background:currentColor;opacity:.9}
.badge-neutral::before{background:var(--muted-2)}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:3.75rem 0 2.5rem;border-bottom:1px solid var(--border);background:var(--bg)}
.page-hero h1{max-width:22ch;margin-bottom:1.1rem}
.page-hero .lead{max-width:62ch}
.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--muted);margin-bottom:1.25rem}
.crumbs a:hover{color:var(--accent)}
.crumbs span{color:var(--muted-2)}

/* ============================================================
   SPLIT: STORY + TEAM
   ============================================================ */
.split{display:grid;grid-template-columns:1.08fr .92fr;gap:3.5rem;align-items:start}
.story p + p{margin-top:1rem}
.story .lead{margin-bottom:1.4rem}
.story h2{margin-top:2.5rem;margin-bottom:1rem}
.story h2:first-of-type{margin-top:0}

.pull{
  margin-top:2rem;padding:1.25rem 1.4rem;
  background:var(--surface);border:1px solid var(--border);border-left:2px solid var(--accent);
  border-radius:var(--radius);box-shadow:var(--shadow-xs);
}
.pull p{font-size:.95rem;color:var(--ink-2);margin:0}

/* Mini stats for portfolio scale */
.mini-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:2rem}
.mini-stat{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:1.1rem 1.15rem;box-shadow:var(--shadow-xs);
  transition:box-shadow .18s ease,transform .18s ease,border-color .18s ease;
}
.mini-stat:hover{box-shadow:var(--shadow-sm);transform:translateY(-2px);border-color:var(--border-2)}
.mini-value{font-size:1.35rem;font-weight:700;letter-spacing:-.035em;line-height:1.1}
.mini-label{font-size:.78rem;color:var(--muted);margin-top:.3rem;line-height:1.45}

/* ============================================================
   TEAM
   ============================================================ */
.team-panel{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:1.6rem;box-shadow:var(--shadow-sm);
}
.team-panel > h3{font-size:.75rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1.1rem}
.team-card{
  display:flex;gap:1rem;align-items:flex-start;
  padding:1.05rem 1.1rem;border:1px solid var(--border);border-radius:var(--radius);
  background:var(--bg);transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease,background .18s ease;
}
.team-card + .team-card{margin-top:.75rem}
.team-card:hover{border-color:var(--accent-line);background:var(--surface);box-shadow:var(--shadow-sm);transform:translateY(-2px)}
.avatar{
  flex:none;width:3.1rem;height:3.1rem;border-radius:50%;
  display:grid;place-items:center;
  background:var(--accent-soft);border:1px solid var(--accent-line);
  color:var(--accent-dark);font-weight:700;font-size:.92rem;letter-spacing:.02em;
}
.team-name{font-size:.95rem;font-weight:600;letter-spacing:-.01em}
.team-role{font-size:.78rem;font-weight:600;color:var(--accent-dark);margin-top:.12rem}
.team-bio{font-size:.82rem;color:var(--muted);margin-top:.35rem;line-height:1.5}

.team-note{
  margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--border);
  font-size:.82rem;color:var(--muted);
}
.team-note a{color:var(--accent);font-weight:600}

/* ============================================================
   VALUES
   ============================================================ */
.value .num{
  display:inline-grid;place-items:center;width:2.2rem;height:2.2rem;border-radius:var(--radius-sm);
  background:var(--bg);border:1px solid var(--border);color:var(--accent-dark);
  font-size:.8rem;font-weight:700;margin-bottom:1.05rem;
}
.value h3{margin-bottom:.5rem}
.value p{font-size:.92rem}

/* ============================================================
   TIMELINE
   ============================================================ */
.timeline-wrap{max-width:760px;margin-inline:auto}
.timeline{position:relative;margin-left:.4rem;border-left:1px solid var(--border);padding-left:2.25rem}
.timeline-item{position:relative;padding-bottom:2.4rem}
.timeline-item:last-child{padding-bottom:0}
.timeline-item::before{
  content:"";position:absolute;left:-2.25rem;top:.5rem;
  width:.7rem;height:.7rem;border-radius:50%;
  background:var(--surface);border:2px solid var(--accent);
  transform:translateX(-50%);
}
.timeline-item.is-current::before{background:var(--accent);box-shadow:0 0 0 4px var(--accent-ring)}
.timeline-year{
  display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--accent-dark);background:var(--accent-soft);border:1px solid var(--accent-line);
  padding:.18rem .55rem;border-radius:100px;margin-bottom:.6rem;
}
.timeline-item h3{margin-bottom:.35rem}
.timeline-item p{font-size:.9rem;color:var(--muted)}

/* ============================================================
   CTA BAND
   ============================================================ */
.cta-band{
  position:relative;overflow:hidden;
  background:var(--ink);border-radius:var(--radius);padding:3rem;
  display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap;
}
.cta-band::after{
  content:"";position:absolute;right:-90px;top:-90px;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(59,130,246,.35),transparent 68%);pointer-events:none;
}
.cta-band h2{color:#fff;max-width:24ch}
.cta-band p{color:#94a3b8;max-width:48ch;margin-top:.7rem}
.cta-band .cta-actions{position:relative;display:flex;gap:.75rem;flex-wrap:wrap}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--surface);border-top:1px solid var(--border);padding:3.5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1.2fr;gap:2.5rem}
.footer-brand p{font-size:.87rem;color:var(--muted);margin-top:1rem;max-width:34ch}
.footer-col h4{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1rem}
.footer-col li + li{margin-top:.55rem}
.footer-col a,.footer-col span{font-size:.88rem;color:var(--ink-2)}
.footer-col a:hover{color:var(--accent)}
.footer-bottom{
  margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.8rem;color:var(--muted);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px){
  .grid-3{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .split{grid-template-columns:1fr;gap:3rem}
  .cta-band{padding:2.5rem}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.1rem;
    background:var(--surface);border-bottom:1px solid var(--border);
    padding:.6rem .75rem 1rem;box-shadow:var(--shadow-md);
  }
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
}

@media (max-width:680px){
  .grid-3,.grid-2{grid-template-columns:1fr}
  .section{padding:3rem 0}
  .section-tight{padding:2.25rem 0}
  .page-hero{padding:2.75rem 0 2rem}
  .mini-stats{grid-template-columns:1fr 1fr}
  .cta-band{padding:2rem;flex-direction:column;align-items:flex-start}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .timeline{padding-left:1.75rem}
  .timeline-item::before{left:-1.75rem}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .mini-stats{grid-template-columns:1fr}
  .team-panel{padding:1.25rem}
  .cta-band .cta-actions{width:100%}
  .cta-band .cta-actions .btn{width:100%}
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
        Premier<span class="accent">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about" aria-current="page">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-primary header-cta">Book a Tour</a>
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
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>About</span>
      </nav>

      <span class="eyebrow">About PremierPM</span>
      <h1>We manage homes the way we would want ours managed</h1>
      <p class="lead">
        Premier Property Management has looked after residential buildings in this city since 2012.
        What began as twelve units in the downtown corridor is now a portfolio of 250+ homes,
        operated by a team of leasing agents, maintenance coordinators, and property managers who
        live in the neighborhoods they serve.
      </p>
    </div>
  </section>

  <!-- ================= STORY + TEAM ================= -->
  <section class="section">
    <div class="container">
      <div class="split">

        <!-- LEFT: origin story, mission, portfolio scale -->
        <div class="story">
          <h2>Our story</h2>
          <p>
            PremierPM started in 2012 with a single renovated walk-up and a simple observation:
            most people do not dislike renting — they dislike being ignored. Repairs sat for weeks,
            statements arrived without explanation, and lease renewals felt like ultimatums.
          </p>
          <p>
            We built the company around fixing that. Every unit we took on got an inspection before
            listing, a written maintenance standard, and a named contact for the resident. That
            approach spread by word of mouth, one building at a time.
          </p>

          <h2>Our mission</h2>
          <p>
            To provide well-maintained homes and transparent, professional service to every resident
            and property owner we work with — with clear pricing, documented processes, and a human
            answer on the other end of the line, every day of the year.
          </p>

          <div class="pull">
            <p>
              <strong>Our operating promise:</strong> no hidden fees, no improvised repairs, and no
              resident treated like a ticket number. If we miss a commitment, we tell you before you
              have to ask.
            </p>
          </div>

          <h2>Local portfolio scale</h2>
          <p>
            We operate exclusively in the metro area. That focus is deliberate — it keeps our
            maintenance crews close, our leasing agents on-site, and our knowledge of each
            neighborhood current.
          </p>

          <div class="mini-stats">
            <div class="mini-stat">
              <div class="mini-value">250+</div>
              <div class="mini-label">Residential units under active management</div>
            </div>
            <div class="mini-stat">
              <div class="mini-value">12 yrs</div>
              <div class="mini-label">Managing property in the metro area</div>
            </div>
            <div class="mini-stat">
              <div class="mini-value">4</div>
              <div class="mini-label">Neighborhoods served: Downtown, Riverside, Cedar Park, Northgate</div>
            </div>
            <div class="mini-stat">
              <div class="mini-value">98%</div>
              <div class="mini-label">Resident lease renewal rate across the portfolio</div>
            </div>
          </div>
        </div>

        <!-- RIGHT: leadership team -->
        <aside class="team-panel" aria-label="Leadership team">
          <h3>Leadership &amp; leasing team</h3>

          <div class="team-card">
            <div class="avatar" aria-hidden="true">MD</div>
            <div>
              <div class="team-name">Morgan Delacroix</div>
              <div class="team-role">Managing Director</div>
              <p class="team-bio">
                Founded PremierPM in 2012. Oversees portfolio strategy, owner reporting, and
                building acquisitions across the metro.
              </p>
            </div>
          </div>

          <div class="team-card">
            <div class="avatar" aria-hidden="true">LC</div>
            <div>
              <div class="team-name">Leah Chen</div>
              <div class="team-role">Lead Leasing Agent</div>
              <p class="team-bio">
                Runs showings and applications for every available unit. Twelve years in residential
                leasing and fair-housing compliance.
              </p>
            </div>
          </div>

          <div class="team-card">
            <div class="avatar" aria-hidden="true">JO</div>
            <div>
              <div class="team-name">James Okafor</div>
              <div class="team-role">Head of Maintenance</div>
              <p class="team-bio">
                Manages the in-house maintenance crew and vendor network. Owns our 24/7 emergency
                dispatch schedule.
              </p>
            </div>
          </div>

          <div class="team-card">
            <div class="avatar" aria-hidden="true">SR</div>
            <div>
              <div class="team-name">Sofia Ramirez</div>
              <div class="team-role">Tenant Relations Manager</div>
              <p class="team-bio">
                Handles move-in coordination, renewals, and resident concerns. Your first call when
                something needs resolving.
              </p>
            </div>
          </div>

          <p class="team-note">
            Questions for a specific team member? Reach the office at
            <a href="/c/contact">our contact page</a> and we will route you directly.
          </p>
        </aside>

      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- ================= TIMELINE ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Company milestones</span>
        <h2>How we grew, one building at a time</h2>
        <p class="lead">
          Every milestone below came from the same playbook: take on a property, inspect it
          thoroughly, document the standard, and manage it properly.
        </p>
      </div>

      <div class="timeline-wrap">
        <div class="timeline">

          <div class="timeline-item">
            <span class="timeline-year">2012</span>
            <h3>Company founded with 12 units</h3>
            <p>
              PremierPM opens with a single renovated walk-up in the Downtown Core. First written
              maintenance standard drafted for the building.
            </p>
          </div>

          <div class="timeline-item">
            <span class="timeline-year">2015</span>
            <h3>75 units and the online tenant portal</h3>
            <p>
              Portfolio reaches 75 managed units across three neighborhoods. Online rent payment
              and maintenance requests replace paper notices entirely.
            </p>
          </div>

          <div class="timeline-item">
            <span class="timeline-year">2018</span>
            <h3>Corporate leasing and mixed-use expansion</h3>
            <p>
              Added corporate relocation leases and expanded into mixed-use buildings, surpassing
              150 units under management and hiring a dedicated tenant relations lead.
            </p>
          </div>

          <div class="timeline-item">
            <span class="timeline-year">2022</span>
            <h3>250+ units and 24/7 dispatch</h3>
            <p>
              Crossed 250 managed units, opened a second office in Northgate, and launched a
              round-the-clock emergency maintenance line staffed by a human responder.
            </p>
          </div>

          <div class="timeline-item is-current">
            <span class="timeline-year">2025</span>
            <h3>Smart access and preventive upkeep</h3>
            <p>
              Rolling out smart locks and energy monitoring across premium managed units, alongside
              a scheduled preventive maintenance program for every building in the portfolio.
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ================= VALUES ================= -->
  <section class="section" style="background:var(--surface);border-block:1px solid var(--border)">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">How we operate</span>
        <h2>Three principles we do not negotiate on</h2>
      </div>

      <div class="grid grid-3">
        <div class="card card-pad card-hover value">
          <div class="num">01</div>
          <h3>Documented, not improvised</h3>
          <p>
            Inspections, repairs, and renewals follow a written standard. Every resident and owner
            can see what was done, when, and by whom.
          </p>
        </div>

        <div class="card card-pad card-hover value">
          <div class="num">02</div>
          <h3>Residents are people first</h3>
          <p>
            We answer the phone, explain the charges, and schedule around your life. Fair housing
            and respectful communication are baseline requirements, not extras.
          </p>
        </div>

        <div class="card card-pad card-hover value">
          <div class="num">03</div>
          <h3>Preventive over reactive</h3>
          <p>
            Scheduled upkeep costs less than emergency repairs. We invest in roofs, boilers, and
            seals before they become somebody's 2 a.m. problem.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Want to see how we operate up close?</h2>
          <p>
            Tour a unit, meet the leasing team, and read a sample lease before you commit.
            We are happy to answer the detailed questions.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/contact" class="btn btn-primary btn-lg">Book a Tour</a>
          <a href="/" class="btn btn-secondary btn-lg">Browse Available Units</a>
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
          Premier<span class="accent">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed with
          transparent pricing and a maintenance team that shows up.
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
          <li><a href="/c/policy">Privacy Policy</a></li>
          <li><a href="/c/terms">Terms of Service</a></li>
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

export const style1Contact = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contact PremierPM · Leasing, Maintenance &amp; Corporate Inquiries</title>
<meta name="description" content="Reach the Premier Property Management leasing office. Office address, operating hours, 24/7 emergency maintenance hotline, and a direct inquiry form.">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0f172a;
  --ink-2:#334155;
  --muted:#64748b;
  --muted-2:#94a3b8;
  --accent:#3b82f6;
  --accent-dark:#2563eb;
  --accent-soft:#eff6ff;
  --accent-line:#dbeafe;
  --accent-ring:rgba(59,130,246,.18);
  --bg:#f8fafc;
  --surface:#ffffff;
  --border:#e2e8f0;
  --border-2:#cbd5e1;
  --radius:6px;
  --radius-sm:4px;
  --shadow-xs:0 1px 2px 0 rgb(15 23 42 / .04);
  --shadow-sm:0 4px 6px -1px rgb(15 23 42 / .05), 0 2px 4px -2px rgb(15 23 42 / .04);
  --shadow-md:0 12px 28px -10px rgb(15 23 42 / .14), 0 4px 10px -4px rgb(15 23 42 / .06);
  --max:1160px;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:2px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:700;letter-spacing:-.025em;line-height:1.15;color:var(--ink)}
h1{font-size:clamp(2.05rem,4.2vw,3rem);letter-spacing:-.035em;line-height:1.07}
h2{font-size:clamp(1.45rem,2.5vw,1.9rem)}
h3{font-size:1.0625rem;font-weight:600;letter-spacing:-.012em}
p{color:var(--ink-2)}
.lead{font-size:1.0625rem;line-height:1.7;color:var(--muted)}
.accent{color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:4.5rem 0}
.section-tight{padding:3rem 0}
.grid{display:grid;gap:1.25rem}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-2{grid-template-columns:repeat(2,1fr)}

.section-head{max-width:660px;margin-bottom:2.5rem}
.section-head.center{margin-inline:auto;text-align:center}
.eyebrow{
  display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:.85rem;
}
.section-head h2{margin-bottom:.75rem}

.rule{height:1px;background:var(--border);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(248,250,252,.85);
  backdrop-filter:saturate(180%) blur(12px);
  -webkit-backdrop-filter:saturate(180%) blur(12px);
  border-bottom:1px solid var(--border);
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:4.25rem}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:1.0625rem;letter-spacing:-.03em;color:var(--ink)}
.brand-mark{position:relative;flex:none;width:1.55rem;height:1.55rem;border-radius:var(--radius-sm);background:var(--ink)}
.brand-mark::after{content:"";position:absolute;right:0;bottom:0;width:.6rem;height:.6rem;background:var(--accent);border-radius:0 0 var(--radius-sm) 0}

.nav{display:flex;align-items:center;gap:.15rem}
.nav a{
  display:inline-block;padding:.5rem .8rem;border-radius:var(--radius-sm);
  font-size:.9rem;font-weight:500;color:var(--ink-2);
  transition:background .16s ease,color .16s ease;
}
.nav a:hover{color:var(--ink);background:rgba(15,23,42,.05)}
.nav a[aria-current="page"]{color:var(--accent-dark);background:var(--accent-soft);font-weight:600}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink);border-radius:2px;transition:transform .2s ease,opacity .2s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  padding:.72rem 1.25rem;border-radius:var(--radius);
  font-size:.9rem;font-weight:600;letter-spacing:-.005em;
  border:1px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .16s ease,box-shadow .16s ease,background .16s ease,border-color .16s ease,color .16s ease;
}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 1px 2px rgb(37 99 235 / .25)}
.btn-primary:hover{background:var(--accent-dark);border-color:var(--accent-dark);transform:translateY(-1px);box-shadow:0 8px 20px -6px rgb(37 99 235 / .5)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--border-2);box-shadow:var(--shadow-xs)}
.btn-secondary:hover{border-color:var(--muted-2);transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.btn-lg{padding:.85rem 1.5rem;font-size:.95rem}
.btn-block{width:100%}

/* ============================================================
   CARDS & BADGES
   ============================================================ */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-xs);transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}
.card-pad{padding:1.5rem}
.card-hover:hover{border-color:var(--border-2);box-shadow:var(--shadow-md);transform:translateY(-3px)}

.badge{
  display:inline-flex;align-items:center;gap:.35rem;
  padding:.22rem .6rem;border-radius:100px;
  font-size:.68rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;
  background:var(--accent-soft);color:var(--accent-dark);border:1px solid var(--accent-line);
}
.badge-neutral{background:#f1f5f9;color:var(--ink-2);border-color:var(--border)}
.badge::before{content:"";width:.35rem;height:.35rem;border-radius:50%;background:currentColor;opacity:.9}
.badge-neutral::before{background:var(--muted-2)}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:3.75rem 0 2.5rem;border-bottom:1px solid var(--border);background:var(--bg)}
.page-hero h1{max-width:24ch;margin-bottom:1.1rem}
.page-hero .lead{max-width:64ch}
.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--muted);margin-bottom:1.25rem}
.crumbs a:hover{color:var(--accent)}
.crumbs span{color:var(--muted-2)}

/* ============================================================
   CONTACT SPLIT
   ============================================================ */
.contact-split{display:grid;grid-template-columns:1fr 1.05fr;gap:3.5rem;align-items:start}

/* Detail list */
.detail + .detail{margin-top:1.6rem;padding-top:1.6rem;border-top:1px solid var(--border)}
.detail-head{display:flex;align-items:center;gap:.85rem;margin-bottom:.6rem}
.detail-icon{
  flex:none;width:2.4rem;height:2.4rem;border-radius:var(--radius-sm);
  display:grid;place-items:center;
  background:var(--accent-soft);border:1px solid var(--accent-line);color:var(--accent-dark);
}
.detail-label{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2)}
.detail-value{font-size:.95rem;color:var(--ink-2);line-height:1.65}
.detail-value strong{color:var(--ink);font-weight:600}
.detail-value a{color:var(--accent-dark);font-weight:600;border-bottom:1px solid var(--accent-line)}
.detail-value a:hover{border-bottom-color:var(--accent)}
.detail-note{font-size:.82rem;color:var(--muted);margin-top:.5rem}

/* Hours table */
.hours{width:100%;border-collapse:collapse;margin-top:.35rem;font-size:.9rem}
.hours th,.hours td{padding:.5rem 0;text-align:left;border-bottom:1px solid var(--border);font-weight:400;color:var(--ink-2)}
.hours tr:last-child th,.hours tr:last-child td{border-bottom:0}
.hours th{color:var(--muted);font-weight:500;width:45%}
.hours td{text-align:right;color:var(--ink)}

/* Emergency callout */
.emergency{
  margin-top:2rem;padding:1.2rem 1.3rem;
  background:var(--surface);border:1px solid var(--border);border-left:2px solid var(--accent);
  border-radius:var(--radius);box-shadow:var(--shadow-xs);
}
.emergency .detail-label{color:var(--accent-dark)}
.emergency p{font-size:.88rem;color:var(--muted);margin-top:.35rem}
.emergency .phone{
  display:inline-block;margin-top:.5rem;font-size:1.2rem;font-weight:700;letter-spacing:-.03em;color:var(--ink);
}
.emergency .phone:hover{color:var(--accent-dark)}

/* ============================================================
   FORM
   ============================================================ */
.form-card{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  box-shadow:var(--shadow-sm);padding:2rem;
}
.form-card > h2{font-size:1.25rem;margin-bottom:.4rem}
.form-card > p{font-size:.88rem;color:var(--muted);margin-bottom:1.75rem}

.field{margin-bottom:1.2rem}
.field label{
  display:block;font-size:.8rem;font-weight:700;letter-spacing:.04em;
  text-transform:uppercase;color:var(--ink-2);margin-bottom:.45rem;
}
.field .optional{color:var(--muted-2);font-weight:500;letter-spacing:0;text-transform:none;font-size:.78rem}
.field input,
.field select,
.field textarea{
  width:100%;padding:.72rem .9rem;
  border:1px solid var(--border);border-radius:var(--radius-sm);
  background:var(--bg);font-size:.92rem;color:var(--ink);
  transition:border-color .16s ease,box-shadow .16s ease,background .16s ease;
}
.field textarea{resize:vertical;min-height:130px;line-height:1.55}
.field input::placeholder,.field textarea::placeholder{color:var(--muted-2)}

.field select{
  appearance:none;
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right .85rem center;padding-right:2.4rem;
}

.field input:focus,
.field select:focus,
.field textarea:focus{
  outline:none;border-color:var(--accent);background:var(--surface);
  box-shadow:0 0 0 3px var(--accent-ring);
}

.field-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}

.form-foot{margin-top:1.5rem}
.form-foot .btn{width:100%}
.form-note{
  display:flex;gap:.55rem;align-items:flex-start;
  margin-top:1rem;font-size:.78rem;color:var(--muted);line-height:1.55;
}
.form-note::before{
  content:"";flex:none;width:.9rem;height:.9rem;margin-top:.15rem;border-radius:50%;
  background:var(--accent-soft);border:1px solid var(--accent-line);
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:center;
}

/* ============================================================
   ROUTING CARDS
   ============================================================ */
.route .icon{
  width:2.4rem;height:2.4rem;border-radius:var(--radius-sm);
  background:var(--bg);border:1px solid var(--border);
  display:grid;place-items:center;color:var(--accent-dark);margin-bottom:1.05rem;
}
.route h3{margin-bottom:.35rem}
.route p{font-size:.9rem;color:var(--muted);margin-bottom:.9rem}
.route .line{
  display:block;font-size:.88rem;font-weight:600;color:var(--ink-2);
  padding-top:.85rem;border-top:1px solid var(--border);
}
.route .line a{color:var(--accent-dark)}
.route .line a:hover{text-decoration:underline}

/* ============================================================
   OFFICE / MAP BLOCK
   ============================================================ */
.office{display:grid;grid-template-columns:1.15fr .85fr;gap:2.5rem;align-items:center}
.map{
  position:relative;aspect-ratio:16/10;border-radius:var(--radius);
  border:1px solid var(--border);overflow:hidden;background:linear-gradient(140deg,#f1f5f9,#e2e8f0);
}
.map::before{
  content:"";position:absolute;inset:0;
  background-image:linear-gradient(rgba(148,163,184,.22) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(148,163,184,.22) 1px,transparent 1px);
  background-size:26px 26px;
}
.map::after{
  content:"";position:absolute;left:50%;top:50%;width:.85rem;height:.85rem;
  transform:translate(-50%,-50%);border-radius:50%;
  background:var(--accent);box-shadow:0 0 0 6px var(--accent-ring);
}
.map-label{
  position:absolute;left:1rem;bottom:1rem;
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);
  padding:.5rem .75rem;font-size:.8rem;font-weight:600;box-shadow:var(--shadow-xs);
}

/* ============================================================
   CTA BAND
   ============================================================ */
.cta-band{
  position:relative;overflow:hidden;
  background:var(--ink);border-radius:var(--radius);padding:3rem;
  display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap;
}
.cta-band::after{
  content:"";position:absolute;right:-90px;top:-90px;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(59,130,246,.35),transparent 68%);pointer-events:none;
}
.cta-band h2{color:#fff;max-width:24ch}
.cta-band p{color:#94a3b8;max-width:48ch;margin-top:.7rem}
.cta-band .cta-actions{position:relative;display:flex;gap:.75rem;flex-wrap:wrap}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--surface);border-top:1px solid var(--border);padding:3.5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1.2fr;gap:2.5rem}
.footer-brand p{font-size:.87rem;color:var(--muted);margin-top:1rem;max-width:34ch}
.footer-col h4{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1rem}
.footer-col li + li{margin-top:.55rem}
.footer-col a,.footer-col span{font-size:.88rem;color:var(--ink-2)}
.footer-col a:hover{color:var(--accent)}
.footer-bottom{
  margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.8rem;color:var(--muted);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px){
  .grid-3{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .contact-split{grid-template-columns:1fr;gap:3rem}
  .office{grid-template-columns:1fr;gap:2rem}
  .cta-band{padding:2.5rem}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.1rem;
    background:var(--surface);border-bottom:1px solid var(--border);
    padding:.6rem .75rem 1rem;box-shadow:var(--shadow-md);
  }
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
}

@media (max-width:680px){
  .grid-3,.grid-2{grid-template-columns:1fr}
  .section{padding:3rem 0}
  .section-tight{padding:2.25rem 0}
  .page-hero{padding:2.75rem 0 2rem}
  .field-row{grid-template-columns:1fr}
  .cta-band{padding:2rem;flex-direction:column;align-items:flex-start}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .form-card{padding:1.5rem}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .cta-band .cta-actions{width:100%}
  .cta-band .cta-actions .btn{width:100%}
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
        Premier<span class="accent">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact" aria-current="page">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-primary header-cta">Book a Tour</a>
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
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Contact</span>
      </nav>

      <span class="eyebrow">Get in touch</span>
      <h1>Talk to the people who manage your building</h1>
      <p class="lead">
        Whether you are scheduling a viewing, reporting a repair, or asking a question about your
        lease, this is the place to start. We respond to every message within one business day —
        and emergencies get a human on the phone, immediately.
      </p>
    </div>
  </section>

  <!-- ================= CONTACT SPLIT ================= -->
  <section class="section">
    <div class="container">
      <div class="contact-split">

        <!-- LEFT: direct leasing details -->
        <div>

          <div class="detail">
            <div class="detail-head">
              <div class="detail-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="detail-label">Leasing office</div>
            </div>
            <div class="detail-value">
              <strong>450 Harrison Avenue, Suite 12</strong><br>
              City Center, ST 10024
            </div>
            <p class="detail-note">
              Visitor parking is available in the rear lot. The entrance faces Harrison Avenue,
              two doors south of the corner café.
            </p>
          </div>

          <div class="detail">
            <div class="detail-head">
              <div class="detail-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="detail-label">Operating hours</div>
            </div>
            <table class="hours">
              <tr><th scope="row">Monday – Friday</th><td>9:00 AM – 6:00 PM</td></tr>
              <tr><th scope="row">Saturday</th><td>10:00 AM – 4:00 PM</td></tr>
              <tr><th scope="row">Sunday</th><td>By appointment only</td></tr>
              <tr><th scope="row">Showings</th><td>Daily, including evenings</td></tr>
            </table>
          </div>

          <div class="detail">
            <div class="detail-head">
              <div class="detail-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="detail-label">Email &amp; phone</div>
            </div>
            <div class="detail-value">
              Leasing: <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a><br>
              Support: <a href="mailto:support@premierpm.example">support@premierpm.example</a><br>
              Office: <a href="tel:+15550123456">(555) 012-3456</a>
            </div>
            <p class="detail-note">
              For leasing questions, emailing is usually fastest. For anything urgent, call the
              office line and we will pick up during business hours.
            </p>
          </div>

          <!-- Emergency callout -->
          <div class="emergency">
            <div class="detail-label">24/7 emergency maintenance</div>
            <a class="phone" href="tel:+15550123456">(555) 012-3456</a>
            <p>
              For active leaks, loss of heat or hot water, lockouts, or anything affecting safety,
              call the hotline at any hour. A human responder — not a voicemail — answers every call.
            </p>
          </div>

        </div>

        <!-- RIGHT: inquiry form -->
        <div class="form-card">
          <h2>Send us a message</h2>
          <p>
            Tell us what you need and we will route your message to the right team member.
            Fields marked with an asterisk are required.
          </p>

          <form action="/c/contact" method="post" novalidate>

            <div class="field">
              <label for="inquiry-type">Inquiry type *</label>
              <select id="inquiry-type" name="inquiry_type" required>
                <option value="" selected disabled>Select an inquiry type…</option>
                <option value="general">General Inquiry</option>
                <option value="viewing">Schedule Property Viewing</option>
                <option value="maintenance">Maintenance Request</option>
                <option value="application">Leasing Application</option>
              </select>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="name">Full name *</label>
                <input type="text" id="name" name="name" placeholder="Jordan Avery" autocomplete="name" required>
              </div>

              <div class="field">
                <label for="email">Email address *</label>
                <input type="email" id="email" name="email" placeholder="jordan@example.com" autocomplete="email" required>
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="phone">Phone <span class="optional">(optional)</span></label>
                <input type="tel" id="phone" name="phone" placeholder="(555) 000-0000" autocomplete="tel">
              </div>

              <div class="field">
                <label for="unit">Unit / building <span class="optional">(optional)</span></label>
                <input type="text" id="unit" name="unit" placeholder="e.g. Harbor View Lofts, Unit 14B">
              </div>
            </div>

            <div class="field">
              <label for="message">Message *</label>
              <textarea id="message" name="message" placeholder="Tell us what you need. For viewing requests, include a few dates and times that work for you." required></textarea>
            </div>

            <div class="form-foot">
              <button type="submit" class="btn btn-primary btn-lg btn-block">Send Message</button>
            </div>

            <p class="form-note">
              We respond to all messages within one business day. Emergency maintenance requests
              should be phoned in to the 24/7 hotline instead.
            </p>

          </form>
        </div>

      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- ================= ROUTING CARDS ================= -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Who to contact</span>
        <h2>Reach the right team, faster</h2>
        <p class="lead">
          Four departments handle most incoming questions. If you already know what you need,
          use the direct line below.
        </p>
      </div>

      <div class="grid grid-4 grid-3">

        <div class="card card-pad card-hover route">
          <div class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21h18"/>
              <path d="M5 21V7l7-4 7 4v14"/>
              <path d="M9 21v-6h6v6"/>
            </svg>
          </div>
          <h3>Leasing &amp; showings</h3>
          <p>Availability, tour scheduling, application status, and lease terms.</p>
          <span class="line"><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></span>
        </div>

        <div class="card card-pad card-hover route">
          <div class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <h3>Maintenance</h3>
          <p>Repair requests, work orders, and follow-ups on a scheduled visit.</p>
          <span class="line"><a href="tel:+15550123456">(555) 012-3456</a></span>
        </div>

        <div class="card card-pad card-hover route">
          <div class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <h3>Billing &amp; rent</h3>
          <p>Rent portal access, statements, payment issues, and ledger questions.</p>
          <span class="line"><a href="mailto:support@premierpm.example">support@premierpm.example</a></span>
        </div>

        <div class="card card-pad card-hover route">
          <div class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21h18"/>
              <path d="M6 21V9l6-4 6 4v12"/>
              <path d="M10 13h4"/>
            </svg>
          </div>
          <h3>Corporate leases</h3>
          <p>Multi-unit portfolios, relocation coordination, and custom invoicing.</p>
          <span class="line"><a href="mailto:corporate@premierpm.example">corporate@premierpm.example</a></span>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= OFFICE LOCATION ================= -->
  <section class="section" style="background:var(--surface);border-block:1px solid var(--border)">
    <div class="container">
      <div class="office">
        <div>
          <span class="eyebrow">Visit the office</span>
          <h2 style="margin-bottom:.9rem">Come by, or send someone in your place</h2>
          <p class="lead" style="margin-bottom:1.25rem">
            Our leasing office sits in the Downtown Core, a short walk from the Harrison Avenue
            transit stop. Walk-ins are welcome during business hours, though scheduling a time
            guarantees a leasing agent is free when you arrive.
          </p>
          <ul style="display:grid;gap:.7rem">
            <li style="display:flex;gap:.6rem;align-items:flex-start;font-size:.92rem;color:var(--ink-2)">
              <span class="accent" aria-hidden="true">→</span>
              <span>Two blocks from the Harrison Avenue light rail stop</span>
            </li>
            <li style="display:flex;gap:.6rem;align-items:flex-start;font-size:.92rem;color:var(--ink-2)">
              <span class="accent" aria-hidden="true">→</span>
              <span>Free visitor parking in the rear lot, entrance on 5th Street</span>
            </li>
            <li style="display:flex;gap:.6rem;align-items:flex-start;font-size:.92rem;color:var(--ink-2)">
              <span class="accent" aria-hidden="true">→</span>
              <span>Step-free access and an accessible restroom on site</span>
            </li>
          </ul>
        </div>

        <div class="map" role="img" aria-label="Simplified map placeholder showing the leasing office location in the Downtown Core">
          <span class="map-label">450 Harrison Avenue · Downtown Core</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Prefer to see a unit before you ask anything?</h2>
          <p>
            Tours run seven days a week, including evenings. Pick a time and a leasing agent will
            meet you at the building.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/" class="btn btn-primary btn-lg">Browse Available Units</a>
          <a href="/c/about" class="btn btn-secondary btn-lg">Learn About Us</a>
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
          Premier<span class="accent">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed with
          transparent pricing and a maintenance team that shows up.
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
          <li><a href="/c/policy">Privacy Policy</a></li>
          <li><a href="/c/terms">Terms of Service</a></li>
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

export const style1Policy = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy · Premier Property Management</title>
<meta name="description" content="How Premier Property Management collects, uses, shares, and protects tenant and applicant data — including screening documents, lease logs, and rent records.">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0f172a;
  --ink-2:#334155;
  --muted:#64748b;
  --muted-2:#94a3b8;
  --accent:#3b82f6;
  --accent-dark:#2563eb;
  --accent-soft:#eff6ff;
  --accent-line:#dbeafe;
  --accent-ring:rgba(59,130,246,.18);
  --bg:#f8fafc;
  --surface:#ffffff;
  --border:#e2e8f0;
  --border-2:#cbd5e1;
  --radius:6px;
  --radius-sm:4px;
  --shadow-xs:0 1px 2px 0 rgb(15 23 42 / .04);
  --shadow-sm:0 4px 6px -1px rgb(15 23 42 / .05), 0 2px 4px -2px rgb(15 23 42 / .04);
  --shadow-md:0 12px 28px -10px rgb(15 23 42 / .14), 0 4px 10px -4px rgb(15 23 42 / .06);
  --max:1160px;
  --header-h:4.25rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:2px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:700;letter-spacing:-.025em;line-height:1.15;color:var(--ink)}
h1{font-size:clamp(2.05rem,4.2vw,2.85rem);letter-spacing:-.035em;line-height:1.08}
h2{font-size:clamp(1.3rem,2.2vw,1.6rem);scroll-margin-top:6.5rem}
h3{font-size:1.0125rem;font-weight:600;letter-spacing:-.012em}
p{color:var(--ink-2)}
.lead{font-size:1.0625rem;line-height:1.7;color:var(--muted)}
.accent{color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:4.5rem 0}
.section-tight{padding:3rem 0}

.eyebrow{
  display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:.85rem;
}

.rule{height:1px;background:var(--border);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(248,250,252,.85);
  backdrop-filter:saturate(180%) blur(12px);
  -webkit-backdrop-filter:saturate(180%) blur(12px);
  border-bottom:1px solid var(--border);
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:1.0625rem;letter-spacing:-.03em;color:var(--ink)}
.brand-mark{position:relative;flex:none;width:1.55rem;height:1.55rem;border-radius:var(--radius-sm);background:var(--ink)}
.brand-mark::after{content:"";position:absolute;right:0;bottom:0;width:.6rem;height:.6rem;background:var(--accent);border-radius:0 0 var(--radius-sm) 0}

.nav{display:flex;align-items:center;gap:.15rem}
.nav a{
  display:inline-block;padding:.5rem .8rem;border-radius:var(--radius-sm);
  font-size:.9rem;font-weight:500;color:var(--ink-2);
  transition:background .16s ease,color .16s ease;
}
.nav a:hover{color:var(--ink);background:rgba(15,23,42,.05)}
.nav a[aria-current="page"]{color:var(--accent-dark);background:var(--accent-soft);font-weight:600}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink);border-radius:2px;transition:transform .2s ease,opacity .2s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  padding:.72rem 1.25rem;border-radius:var(--radius);
  font-size:.9rem;font-weight:600;letter-spacing:-.005em;
  border:1px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .16s ease,box-shadow .16s ease,background .16s ease,border-color .16s ease,color .16s ease;
}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 1px 2px rgb(37 99 235 / .25)}
.btn-primary:hover{background:var(--accent-dark);border-color:var(--accent-dark);transform:translateY(-1px);box-shadow:0 8px 20px -6px rgb(37 99 235 / .5)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--border-2);box-shadow:var(--shadow-xs)}
.btn-secondary:hover{border-color:var(--muted-2);transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.btn-lg{padding:.85rem 1.5rem;font-size:.95rem}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:3.5rem 0 2.25rem;border-bottom:1px solid var(--border);background:var(--bg)}
.page-hero h1{margin-bottom:.9rem}
.page-hero .lead{max-width:66ch}
.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--muted);margin-bottom:1.25rem}
.crumbs a:hover{color:var(--accent)}
.crumbs span{color:var(--muted-2)}

.doc-meta{
  display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;
  margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--border);
  font-size:.82rem;color:var(--muted);
}
.doc-meta li{display:flex;align-items:center;gap:.5rem}
.doc-meta li::before{content:"";width:.4rem;height:.4rem;border-radius:50%;background:var(--accent);opacity:.65}

/* ============================================================
   LEGAL LAYOUT (sticky TOC + reading column)
   ============================================================ */
.legal{display:grid;grid-template-columns:250px minmax(0,1fr);gap:3.5rem;align-items:start}

/* TOC */
.toc{position:sticky;top:calc(var(--header-h) + 1.5rem)}
.toc-title{
  font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--muted-2);margin-bottom:1rem;
}
.toc ol{list-style:none;counter-reset:toc;border-left:1px solid var(--border)}
.toc li + li{margin-top:.1rem}
.toc a{
  display:block;counter-increment:toc;
  padding:.5rem 0 .5rem 1.15rem;margin-left:-1px;
  border-left:2px solid transparent;
  font-size:.875rem;line-height:1.45;color:var(--ink-2);
  transition:color .16s ease,border-color .16s ease,background .16s ease;
}
.toc a::before{
  content:counter(toc,decimal-leading-zero) "  ";
  color:var(--muted-2);font-weight:700;font-size:.75rem;letter-spacing:.04em;
}
.toc a:hover{color:var(--accent-dark);border-left-color:var(--accent);background:var(--accent-soft)}

.toc-help{
  margin-top:1.75rem;padding-top:1.5rem;border-top:1px solid var(--border);
  font-size:.82rem;color:var(--muted);line-height:1.6;
}
.toc-help a{color:var(--accent-dark);font-weight:600}
.toc-help a:hover{text-decoration:underline}

/* Reading column */
.doc{max-width:74ch}
.doc > p{font-size:.965rem;margin-bottom:1rem}
.doc .lead{font-size:1.0125rem;margin-bottom:1.5rem}

.doc h2{
  padding-top:.25rem;
  margin-top:2.75rem;margin-bottom:.9rem;
  padding-bottom:.75rem;border-bottom:1px solid var(--border);
}
.doc h2:first-of-type{margin-top:0}
.doc h3{margin-top:1.6rem;margin-bottom:.5rem}

.doc p + p{margin-top:1rem}
.doc p{margin-bottom:0}

.doc ul{margin:1.1rem 0 1.35rem;display:grid;gap:.6rem}
.doc ul li{
  position:relative;padding-left:1.35rem;
  font-size:.94rem;color:var(--ink-2);line-height:1.65;
}
.doc ul li::before{
  content:"";position:absolute;left:.3rem;top:.62rem;
  width:5px;height:5px;border-radius:1px;background:var(--accent);opacity:.75;
}
.doc ul li strong{color:var(--ink);font-weight:600}

/* Definition blocks */
.deflist{margin:1.25rem 0;display:grid;gap:.9rem}
.deflist > div{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:1.1rem 1.25rem;box-shadow:var(--shadow-xs);
  transition:border-color .18s ease,box-shadow .18s ease;
}
.deflist > div:hover{border-color:var(--border-2);box-shadow:var(--shadow-sm)}
.deflist dt{font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:.35rem}
.deflist dd{font-size:.925rem;color:var(--ink-2);line-height:1.65}

/* Callout */
.callout{
  margin:1.75rem 0;padding:1.25rem 1.4rem;
  background:var(--surface);border:1px solid var(--border);border-left:2px solid var(--accent);
  border-radius:var(--radius);box-shadow:var(--shadow-xs);
}
.callout .callout-label{
  font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--accent-dark);margin-bottom:.45rem;
}
.callout p{font-size:.93rem;color:var(--ink-2)}

/* Contact block at end */
.doc-contact{
  margin-top:3rem;padding:1.6rem 1.5rem;
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  box-shadow:var(--shadow-sm);
}
.doc-contact h2{
  margin-top:0;padding-bottom:.75rem;border-bottom:1px solid var(--border);
}
.doc-contact p{font-size:.93rem;margin-bottom:1rem}
.doc-contact dl{display:grid;gap:.75rem;margin-top:1.25rem}
.doc-contact dt{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2)}
.doc-contact dd{font-size:.925rem;color:var(--ink-2)}
.doc-contact dd a{color:var(--accent-dark);font-weight:600}
.doc-contact dd a:hover{text-decoration:underline}

/* ============================================================
   CTA BAND
   ============================================================ */
.cta-band{
  position:relative;overflow:hidden;
  background:var(--ink);border-radius:var(--radius);padding:2.75rem;
  display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap;
}
.cta-band::after{
  content:"";position:absolute;right:-90px;top:-90px;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(59,130,246,.35),transparent 68%);pointer-events:none;
}
.cta-band h2{color:#fff;font-size:1.4rem;max-width:26ch}
.cta-band p{color:#94a3b8;max-width:50ch;margin-top:.6rem;font-size:.94rem}
.cta-band .cta-actions{position:relative;display:flex;gap:.75rem;flex-wrap:wrap}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--surface);border-top:1px solid var(--border);padding:3.5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1.2fr;gap:2.5rem}
.footer-brand p{font-size:.87rem;color:var(--muted);margin-top:1rem;max-width:34ch}
.footer-col h4{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1rem}
.footer-col li + li{margin-top:.55rem}
.footer-col a,.footer-col span{font-size:.88rem;color:var(--ink-2)}
.footer-col a:hover{color:var(--accent)}
.footer-bottom{
  margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.8rem;color:var(--muted);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px){
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .legal{grid-template-columns:1fr;gap:2.5rem}
  .toc{position:static}
  .toc ol{
    display:flex;flex-wrap:wrap;gap:.5rem;
    border-left:0;padding-bottom:.25rem;
  }
  .toc li + li{margin-top:0}
  .toc a{
    padding:.5rem .9rem;margin-left:0;
    border:1px solid var(--border);border-radius:var(--radius-sm);
    background:var(--surface);font-size:.84rem;
    display:inline-flex;align-items:center;gap:.4rem;
  }
  .toc a:hover{border-color:var(--accent-line);background:var(--accent-soft)}
  .toc-help{max-width:60ch}
  .doc{max-width:none}
  .cta-band{padding:2.25rem}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.1rem;
    background:var(--surface);border-bottom:1px solid var(--border);
    padding:.6rem .75rem 1rem;box-shadow:var(--shadow-md);
  }
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
}

@media (max-width:680px){
  .section{padding:3rem 0}
  .section-tight{padding:2.25rem 0}
  .page-hero{padding:2.75rem 0 2rem}
  .cta-band{padding:1.85rem;flex-direction:column;align-items:flex-start}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .doc h2{margin-top:2.25rem}
  .deflist > div{padding:1rem 1.1rem}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .cta-band .cta-actions{width:100%}
  .cta-band .cta-actions .btn{width:100%}
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
        Premier<span class="accent">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy" aria-current="page">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-primary header-cta">Book a Tour</a>
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
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Privacy Policy</span>
      </nav>

      <span class="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p class="lead">
        This policy explains what information Premier Property Management collects from applicants,
        residents, and website visitors, how we use it to operate our buildings, who we share it
        with, and the rights you hold over your own data.
      </p>

      <ul class="doc-meta">
        <li>Effective date: March 1, 2025</li>
        <li>Last reviewed: March 1, 2025</li>
        <li>Applies to: premierpm.example and all managed properties</li>
      </ul>
    </div>
  </section>

  <!-- ================= LEGAL LAYOUT ================= -->
  <section class="section">
    <div class="container">
      <div class="legal">

        <!-- ---------- STICKY TABLE OF CONTENTS ---------- -->
        <aside class="toc" aria-label="Table of contents">
          <div class="toc-title">On this page</div>
          <ol>
            <li><a href="#collect">Information We Collect</a></li>
            <li><a href="#screening">Screening &amp; Application Data</a></li>
            <li><a href="#use">Use of Tenant Data</a></li>
            <li><a href="#sharing">Data Sharing &amp; Security</a></li>
            <li><a href="#retention">Retention &amp; Deletion</a></li>
            <li><a href="#rights">Tenant Rights</a></li>
            <li><a href="#cookies">Cookies &amp; Site Analytics</a></li>
            <li><a href="#changes">Changes to This Policy</a></li>
          </ol>

          <p class="toc-help">
            Questions about your data? Write to
            <a href="mailto:privacy@premierpm.example">privacy@premierpm.example</a>
            or call <a href="tel:+15550123456">(555) 012-3456</a>.
          </p>
        </aside>

        <!-- ---------- READING COLUMN ---------- -->
        <article class="doc">

          <p class="lead">
            Premier Property Management ("PremierPM", "we", "us") manages residential buildings and
            processes rental applications on behalf of property owners. In doing so we handle personal
            information every day. This policy describes that handling in plain language.
          </p>

          <p>
            We collect only what we need to lease, manage, and maintain a property — and we keep it
            only as long as we need it. This policy applies to our website, our online tenant portal,
            our leasing office, and every building in our managed portfolio.
          </p>

          <!-- 1 -->
          <h2 id="collect">1. Information We Collect</h2>
          <p>
            We collect information in three ways: directly from you, automatically through our
            website and portal, and from third parties you authorize during the application process.
          </p>

          <dl class="deflist">
            <div>
              <dt>Personal details</dt>
              <dd>
                Your name, email address, phone number, current and previous mailing addresses,
                date of birth, and the number of occupants who will live in the unit. For corporate
                leases, we also collect the company name, billing contact, and authorized signatory.
              </dd>
            </div>
            <div>
              <dt>Application &amp; screening documents</dt>
              <dd>
                Government-issued photo identification, proof of income such as recent pay stubs or
                employment letters, bank statements where required, rental history and landlord
                references, and the authorization forms needed to run a credit and background check.
              </dd>
            </div>
            <div>
              <dt>Lease &amp; account logs</dt>
              <dd>
                Your signed lease and any addenda, move-in and move-out inspection reports, rent
                payment records, ledger balances, maintenance requests and their resolution notes,
                and written communications with our leasing and maintenance teams.
              </dd>
            </div>
            <div>
              <dt>Website &amp; portal technical data</dt>
              <dd>
                IP address, browser type and version, device type, pages visited, referring URL, and
                timestamps. For portal users, we also record login events and session activity.
              </dd>
            </div>
          </dl>

          <div class="callout">
            <div class="callout-label">What we do not collect</div>
            <p>
              We do not collect biometric identifiers, precise geolocation from your mobile device,
              health information, or the contents of your private messages. We do not ask for your
              Social Security number through this website.
            </p>
          </div>

          <!-- 2 -->
          <h2 id="screening">2. Screening &amp; Application Data</h2>
          <p>
            When you apply for a unit, you authorize us and our screening partner to verify the
            information you provided. That verification produces a consumer report containing credit
            history, eviction filings, and public record information.
          </p>
          <p>
            Screening reports are used solely to evaluate your application against our written rental
            criteria, which are applied consistently to every applicant for the same unit. We do not
            use a screening report to set different terms for applicants in a protected class.
          </p>
          <p>
            If your application is denied, you receive a written notice identifying the screening
            company and explaining your right to request a free copy of the report and to dispute
            inaccurate information directly with that company.
          </p>

          <!-- 3 -->
          <h2 id="use">3. Use of Tenant Data</h2>
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

          <p>
            We do not sell your personal information, and we do not use it for advertising networks
            or unrelated marketing.
          </p>

          <!-- 4 -->
          <h2 id="sharing">4. Data Sharing &amp; Security</h2>
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
            No system is perfectly secure. If a breach affects your personal information, we will
            notify you and the relevant authorities as required by applicable law.
          </p>

          <!-- 5 -->
          <h2 id="retention">5. Retention &amp; Deletion</h2>
          <p>
            We keep personal information only for as long as it serves the purpose it was collected
            for, or as long as the law requires.
          </p>
          <ul>
            <li><strong>Denied applications</strong> are retained for 12 months, then deleted or anonymized.</li>
            <li><strong>Active tenancy records</strong> are retained for the duration of the lease and any renewal.</li>
            <li><strong>Post-tenancy records</strong> — ledger, lease, and inspection reports — are retained for the period required by tax and landlord-tenant law, typically 7 years.</li>
            <li><strong>Maintenance records</strong> are retained for 3 years after the work is completed.</li>
            <li><strong>Website analytics</strong> are retained in aggregate form for 26 months.</li>
          </ul>
          <p>
            When a retention period ends, we delete the records or strip them of identifiers so they
            can no longer be linked to you.
          </p>

          <!-- 6 -->
          <h2 id="rights">6. Tenant Rights</h2>
          <p>
            Subject to your jurisdiction and to our lawful recordkeeping obligations, you have the
            following rights regarding the personal information we hold about you.
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
            <a href="mailto:privacy@premierpm.example" class="accent">privacy@premierpm.example</a>
            with the subject line "Privacy Request". We will verify your identity and respond within
            30 days. There is no charge for a first request.
          </p>

          <div class="callout">
            <div class="callout-label">Fair housing note</div>
            <p>
              We do not discriminate on the basis of race, color, religion, national origin, sex,
              familial status, disability, or any other class protected by applicable law. If you
              believe you have experienced discrimination, you may contact us directly or file a
              complaint with the appropriate fair housing authority.
            </p>
          </div>

          <!-- 7 -->
          <h2 id="cookies">7. Cookies &amp; Site Analytics</h2>
          <p>
            Our public website uses a small number of first-party cookies to remember your search
            preferences and to measure which pages are useful. The tenant portal uses a session
            cookie that is required for you to stay logged in.
          </p>
          <ul>
            <li><strong>Essential cookies</strong> — required for the portal login and security functions. These cannot be disabled.</li>
            <li><strong>Preference cookies</strong> — remember filters such as neighborhood or bedroom count.</li>
            <li><strong>Analytics cookies</strong> — collect aggregated page-view data. These contain no personal identifiers.</li>
          </ul>
          <p>
            You can block or delete cookies in your browser settings. Blocking essential cookies will
            prevent the tenant portal from working correctly.
          </p>

          <!-- 8 -->
          <h2 id="changes">8. Changes to This Policy</h2>
          <p>
            We review this policy at least once a year and whenever we change how we handle personal
            information. When we make a material change, we will update the effective date above and
            post a notice in the tenant portal and in building common areas.
          </p>
          <p>
            Continued use of the portal or continued tenancy after a change takes effect constitutes
            acceptance of the updated policy.
          </p>

          <!-- CONTACT BLOCK -->
          <div class="doc-contact">
            <h2 id="contact-privacy" style="border-bottom:1px solid var(--border)">Contact our privacy team</h2>
            <p>
              If you have a question about this policy, want to exercise a privacy right, or need to
              report a concern about how your data has been handled, reach us using the details below.
            </p>

            <dl>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:privacy@premierpm.example">privacy@premierpm.example</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:+15550123456">(555) 012-3456</a> · Mon–Fri, 9:00 AM – 6:00 PM</dd>
              </div>
              <div>
                <dt>Postal address</dt>
                <dd>Premier Property Management · Attn: Privacy Officer<br>450 Harrison Avenue, Suite 12, City Center, ST 10024</dd>
              </div>
              <div>
                <dt>Response time</dt>
                <dd>Within 30 days of identity verification</dd>
              </div>
            </dl>
          </div>

        </article>

      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Need the rules of the portal instead?</h2>
          <p>
            Our Terms of Service covers portal usage, application fees, listing accuracy, and
            liability for property upkeep reporting.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/terms" class="btn btn-primary btn-lg">Read Terms of Service</a>
          <a href="/c/contact" class="btn btn-secondary btn-lg">Contact Us</a>
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
          Premier<span class="accent">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed with
          transparent pricing and a maintenance team that shows up.
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
          <li><a href="/c/policy">Privacy Policy</a></li>
          <li><a href="/c/terms">Terms of Service</a></li>
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

export const style1Terms = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Terms of Service · Premier Property Management</title>
<meta name="description" content="The terms governing use of the PremierPM tenant portal, rental applications, holding fees, listing accuracy, and limitation of liability for property upkeep reporting.">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#0f172a;
  --ink-2:#334155;
  --muted:#64748b;
  --muted-2:#94a3b8;
  --accent:#3b82f6;
  --accent-dark:#2563eb;
  --accent-soft:#eff6ff;
  --accent-line:#dbeafe;
  --accent-ring:rgba(59,130,246,.18);
  --bg:#f8fafc;
  --surface:#ffffff;
  --border:#e2e8f0;
  --border-2:#cbd5e1;
  --radius:6px;
  --radius-sm:4px;
  --shadow-xs:0 1px 2px 0 rgb(15 23 42 / .04);
  --shadow-sm:0 4px 6px -1px rgb(15 23 42 / .05), 0 2px 4px -2px rgb(15 23 42 / .04);
  --shadow-md:0 12px 28px -10px rgb(15 23 42 / .14), 0 4px 10px -4px rgb(15 23 42 / .06);
  --max:1160px;
  --header-h:4.25rem;
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6.5rem}

body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--ink);
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:2px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{font-weight:700;letter-spacing:-.025em;line-height:1.15;color:var(--ink)}
h1{font-size:clamp(2.05rem,4.2vw,2.85rem);letter-spacing:-.035em;line-height:1.08}
h2{font-size:clamp(1.3rem,2.2vw,1.6rem);scroll-margin-top:6.5rem}
h3{font-size:1.0125rem;font-weight:600;letter-spacing:-.012em}
p{color:var(--ink-2)}
.lead{font-size:1.0625rem;line-height:1.7;color:var(--muted)}
.accent{color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.section{padding:4.5rem 0}
.section-tight{padding:3rem 0}

.eyebrow{
  display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);margin-bottom:.85rem;
}

.rule{height:1px;background:var(--border);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  position:sticky;top:0;z-index:60;
  background:rgba(248,250,252,.85);
  backdrop-filter:saturate(180%) blur(12px);
  -webkit-backdrop-filter:saturate(180%) blur(12px);
  border-bottom:1px solid var(--border);
}
.header-inner{position:relative}
.header-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;height:var(--header-h)}

.brand{display:inline-flex;align-items:center;gap:.6rem;font-weight:700;font-size:1.0625rem;letter-spacing:-.03em;color:var(--ink)}
.brand-mark{position:relative;flex:none;width:1.55rem;height:1.55rem;border-radius:var(--radius-sm);background:var(--ink)}
.brand-mark::after{content:"";position:absolute;right:0;bottom:0;width:.6rem;height:.6rem;background:var(--accent);border-radius:0 0 var(--radius-sm) 0}

.nav{display:flex;align-items:center;gap:.15rem}
.nav a{
  display:inline-block;padding:.5rem .8rem;border-radius:var(--radius-sm);
  font-size:.9rem;font-weight:500;color:var(--ink-2);
  transition:background .16s ease,color .16s ease;
}
.nav a:hover{color:var(--ink);background:rgba(15,23,42,.05)}
.nav a[aria-current="page"]{color:var(--accent-dark);background:var(--accent-soft);font-weight:600}

.header-actions{display:flex;align-items:center;gap:.75rem}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;flex-direction:column;align-items:center;justify-content:center;gap:4px;
  border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--surface);cursor:pointer;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink);border-radius:2px;transition:transform .2s ease,opacity .2s ease}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.5rem;
  padding:.72rem 1.25rem;border-radius:var(--radius);
  font-size:.9rem;font-weight:600;letter-spacing:-.005em;
  border:1px solid transparent;cursor:pointer;white-space:nowrap;
  transition:transform .16s ease,box-shadow .16s ease,background .16s ease,border-color .16s ease,color .16s ease;
}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent);box-shadow:0 1px 2px rgb(37 99 235 / .25)}
.btn-primary:hover{background:var(--accent-dark);border-color:var(--accent-dark);transform:translateY(-1px);box-shadow:0 8px 20px -6px rgb(37 99 235 / .5)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--border-2);box-shadow:var(--shadow-xs)}
.btn-secondary:hover{border-color:var(--muted-2);transform:translateY(-1px);box-shadow:var(--shadow-sm)}
.btn-lg{padding:.85rem 1.5rem;font-size:.95rem}

/* ============================================================
   PAGE HERO
   ============================================================ */
.page-hero{padding:3.5rem 0 2.25rem;border-bottom:1px solid var(--border);background:var(--bg)}
.page-hero h1{margin-bottom:.9rem}
.page-hero .lead{max-width:66ch}
.crumbs{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--muted);margin-bottom:1.25rem}
.crumbs a:hover{color:var(--accent)}
.crumbs span{color:var(--muted-2)}

.doc-meta{
  display:flex;flex-wrap:wrap;gap:.5rem 1.5rem;
  margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--border);
  font-size:.82rem;color:var(--muted);
}
.doc-meta li{display:flex;align-items:center;gap:.5rem}
.doc-meta li::before{content:"";width:.4rem;height:.4rem;border-radius:50%;background:var(--accent);opacity:.65}

/* ============================================================
   LEGAL LAYOUT (sticky TOC + reading column)
   ============================================================ */
.legal{display:grid;grid-template-columns:250px minmax(0,1fr);gap:3.5rem;align-items:start}

/* TOC */
.toc{position:sticky;top:calc(var(--header-h) + 1.5rem)}
.toc-title{
  font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--muted-2);margin-bottom:1rem;
}
.toc ol{list-style:none;counter-reset:toc;border-left:1px solid var(--border)}
.toc li + li{margin-top:.1rem}
.toc a{
  display:block;counter-increment:toc;
  padding:.5rem 0 .5rem 1.15rem;margin-left:-1px;
  border-left:2px solid transparent;
  font-size:.875rem;line-height:1.45;color:var(--ink-2);
  transition:color .16s ease,border-color .16s ease,background .16s ease;
}
.toc a::before{
  content:counter(toc,decimal-leading-zero) "  ";
  color:var(--muted-2);font-weight:700;font-size:.75rem;letter-spacing:.04em;
}
.toc a:hover{color:var(--accent-dark);border-left-color:var(--accent);background:var(--accent-soft)}

.toc-help{
  margin-top:1.75rem;padding-top:1.5rem;border-top:1px solid var(--border);
  font-size:.82rem;color:var(--muted);line-height:1.6;
}
.toc-help a{color:var(--accent-dark);font-weight:600}
.toc-help a:hover{text-decoration:underline}

/* Reading column */
.doc{max-width:74ch}
.doc > p{font-size:.965rem;margin-bottom:1rem}
.doc .lead{font-size:1.0125rem;margin-bottom:1.5rem}

.doc h2{
  padding-top:.25rem;
  margin-top:2.75rem;margin-bottom:.9rem;
  padding-bottom:.75rem;border-bottom:1px solid var(--border);
}
.doc h2:first-of-type{margin-top:0}
.doc h3{margin-top:1.6rem;margin-bottom:.5rem}

.doc p + p{margin-top:1rem}
.doc p{margin-bottom:0}

.doc ul{margin:1.1rem 0 1.35rem;display:grid;gap:.6rem}
.doc ul li{
  position:relative;padding-left:1.35rem;
  font-size:.94rem;color:var(--ink-2);line-height:1.65;
}
.doc ul li::before{
  content:"";position:absolute;left:.3rem;top:.62rem;
  width:5px;height:5px;border-radius:1px;background:var(--accent);opacity:.75;
}
.doc ul li strong{color:var(--ink);font-weight:600}

/* Definition blocks */
.deflist{margin:1.25rem 0;display:grid;gap:.9rem}
.deflist > div{
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  padding:1.1rem 1.25rem;box-shadow:var(--shadow-xs);
  transition:border-color .18s ease,box-shadow .18s ease;
}
.deflist > div:hover{border-color:var(--border-2);box-shadow:var(--shadow-sm)}
.deflist dt{font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:.35rem}
.deflist dd{font-size:.925rem;color:var(--ink-2);line-height:1.65}

/* Callout */
.callout{
  margin:1.75rem 0;padding:1.25rem 1.4rem;
  background:var(--surface);border:1px solid var(--border);border-left:2px solid var(--accent);
  border-radius:var(--radius);box-shadow:var(--shadow-xs);
}
.callout .callout-label{
  font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;
  color:var(--accent-dark);margin-bottom:.45rem;
}
.callout p{font-size:.93rem;color:var(--ink-2)}

/* Contact block at end */
.doc-contact{
  margin-top:3rem;padding:1.6rem 1.5rem;
  background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
  box-shadow:var(--shadow-sm);
}
.doc-contact h2{
  margin-top:0;padding-bottom:.75rem;border-bottom:1px solid var(--border);
}
.doc-contact p{font-size:.93rem;margin-bottom:1rem}
.doc-contact dl{display:grid;gap:.75rem;margin-top:1.25rem}
.doc-contact dt{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2)}
.doc-contact dd{font-size:.925rem;color:var(--ink-2)}
.doc-contact dd a{color:var(--accent-dark);font-weight:600}
.doc-contact dd a:hover{text-decoration:underline}

/* ============================================================
   CTA BAND
   ============================================================ */
.cta-band{
  position:relative;overflow:hidden;
  background:var(--ink);border-radius:var(--radius);padding:2.75rem;
  display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap;
}
.cta-band::after{
  content:"";position:absolute;right:-90px;top:-90px;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(59,130,246,.35),transparent 68%);pointer-events:none;
}
.cta-band h2{color:#fff;font-size:1.4rem;max-width:26ch}
.cta-band p{color:#94a3b8;max-width:50ch;margin-top:.6rem;font-size:.94rem}
.cta-band .cta-actions{position:relative;display:flex;gap:.75rem;flex-wrap:wrap}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{background:var(--surface);border-top:1px solid var(--border);padding:3.5rem 0 2rem;margin-top:auto}
.footer-grid{display:grid;grid-template-columns:1.7fr 1fr 1fr 1.2fr;gap:2.5rem}
.footer-brand p{font-size:.87rem;color:var(--muted);margin-top:1rem;max-width:34ch}
.footer-col h4{font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);margin-bottom:1rem}
.footer-col li + li{margin-top:.55rem}
.footer-col a,.footer-col span{font-size:.88rem;color:var(--ink-2)}
.footer-col a:hover{color:var(--accent)}
.footer-bottom{
  margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.8rem;color:var(--muted);
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1024px){
  .footer-grid{grid-template-columns:1fr 1fr}
}

@media (max-width:960px){
  .legal{grid-template-columns:1fr;gap:2.5rem}
  .toc{position:static}
  .toc ol{
    display:flex;flex-wrap:wrap;gap:.5rem;
    border-left:0;padding-bottom:.25rem;
  }
  .toc li + li{margin-top:0}
  .toc a{
    padding:.5rem .9rem;margin-left:0;
    border:1px solid var(--border);border-radius:var(--radius-sm);
    background:var(--surface);font-size:.84rem;
    display:inline-flex;align-items:center;gap:.4rem;
  }
  .toc a:hover{border-color:var(--accent-line);background:var(--accent-soft)}
  .toc-help{max-width:60ch}
  .doc{max-width:none}
  .cta-band{padding:2.25rem}
}

@media (max-width:900px){
  .burger{display:flex}
  .header-cta{display:none}
  .nav{
    position:absolute;top:calc(100% + 1px);left:0;right:0;
    display:none;flex-direction:column;align-items:stretch;gap:.1rem;
    background:var(--surface);border-bottom:1px solid var(--border);
    padding:.6rem .75rem 1rem;box-shadow:var(--shadow-md);
  }
  .nav-toggle:checked ~ .header-bar .nav{display:flex}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(2){opacity:0}
  .nav-toggle:checked ~ .header-bar .burger span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}
}

@media (max-width:680px){
  .section{padding:3rem 0}
  .section-tight{padding:2.25rem 0}
  .page-hero{padding:2.75rem 0 2rem}
  .cta-band{padding:1.85rem;flex-direction:column;align-items:flex-start}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .doc h2{margin-top:2.25rem}
  .deflist > div{padding:1rem 1.1rem}
}

@media (max-width:520px){
  .container{padding-inline:1.15rem}
  .cta-band .cta-actions{width:100%}
  .cta-band .cta-actions .btn{width:100%}
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
        Premier<span class="accent">PM</span>
      </a>

      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms" aria-current="page">Terms</a>
      </nav>

      <div class="header-actions">
        <a href="/c/contact" class="btn btn-primary header-cta">Book a Tour</a>
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
    <div class="container">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>Terms of Service</span>
      </nav>

      <span class="eyebrow">Legal</span>
      <h1>Terms of Service</h1>
      <p class="lead">
        These terms govern your use of the PremierPM website and tenant portal, the handling of
        rental applications and holding fees, the accuracy of our listings, and the limits of our
        liability for property upkeep reporting.
      </p>

      <ul class="doc-meta">
        <li>Effective date: March 1, 2025</li>
        <li>Last reviewed: March 1, 2025</li>
        <li>Applies to: premierpm.example, the tenant portal, and all managed properties</li>
      </ul>
    </div>
  </section>

  <!-- ================= LEGAL LAYOUT ================= -->
  <section class="section">
    <div class="container">
      <div class="legal">

        <!-- ---------- STICKY TABLE OF CONTENTS ---------- -->
        <aside class="toc" aria-label="Table of contents">
          <div class="toc-title">On this page</div>
          <ol>
            <li><a href="#acceptance">Acceptance of Terms</a></li>
            <li><a href="#portal">Portal Usage Agreement</a></li>
            <li><a href="#application">Application &amp; Holding Fees</a></li>
            <li><a href="#accuracy">Listing Accuracy Disclaimer</a></li>
            <li><a href="#conduct">Resident Conduct &amp; Property Rules</a></li>
            <li><a href="#liability">Limitation of Liability</a></li>
            <li><a href="#indemnity">Indemnification</a></li>
            <li><a href="#termination">Suspension &amp; Termination</a></li>
            <li><a href="#law">Governing Law &amp; Disputes</a></li>
            <li><a href="#changes">Changes to These Terms</a></li>
          </ol>

          <p class="toc-help">
            Need help understanding these terms? Write to
            <a href="mailto:legal@premierpm.example">legal@premierpm.example</a>
            or call <a href="tel:+15550123456">(555) 012-3456</a>.
          </p>
        </aside>

        <!-- ---------- READING COLUMN ---------- -->
        <article class="doc">

          <p class="lead">
            These Terms of Service ("Terms") form a binding agreement between you and Premier
            Property Management ("PremierPM", "we", "us"). They apply to anyone who visits our
            website, submits a rental application, uses the tenant portal, or occupies a unit in a
            building we manage.
          </p>

          <p>
            Please read them carefully. If you do not agree with any part of these Terms, do not use
            the portal or submit an application.
          </p>

          <!-- 1 -->
          <h2 id="acceptance">1. Acceptance of Terms</h2>
          <p>
            By accessing our website, creating a portal account, submitting an application, or
            signing a lease for a managed property, you confirm that you have read, understood, and
            agreed to be bound by these Terms.
          </p>
          <p>
            Where a signed lease or a separate written management agreement conflicts with these
            Terms, the signed lease or agreement controls for the specific matter it addresses.
            These Terms fill the gaps for everything else.
          </p>

          <!-- 2 -->
          <h2 id="portal">2. Portal Usage Agreement</h2>
          <p>
            The PremierPM tenant portal lets residents pay rent, submit maintenance requests, view
            documents, and manage their lease. Access is granted to verified residents and authorized
            applicants only.
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

          <div class="callout">
            <div class="callout-label">Service availability</div>
            <p>
              We aim to keep the portal available at all times, but we do not guarantee uninterrupted
              access. Scheduled maintenance is announced in advance. Emergency maintenance may occur
              without notice. Rent is still due on its scheduled date even if the portal is briefly
              unavailable — call the office if you cannot pay on time.
            </p>
          </div>

          <!-- 3 -->
          <h2 id="application">3. Application &amp; Holding Fee Terms</h2>
          <p>
            Before you submit an application, review the fee terms below. They are strict and applied
            consistently to every applicant.
          </p>

          <dl class="deflist">
            <div>
              <dt>Application fee — non-refundable</dt>
              <dd>
                Every adult applicant pays a non-refundable application fee to cover the cost of
                credit, background, and rental history screening. This fee is not refunded whether
                your application is approved or denied.
              </dd>
            </div>
            <div>
              <dt>Holding fee — conditionally applied</dt>
              <dd>
                A holding fee may be required to take a unit off the market while your application is
                processed and your lease is prepared. If you sign the lease, the holding fee is
                applied to your first month's rent. If you fail to sign within the agreed window, the
                holding fee is forfeited, except where local law requires a refund.
              </dd>
            </div>
            <div>
              <dt>Security deposit — separate from fees</dt>
              <dd>
                A security deposit is collected at lease signing and held according to state and local
                law. It is not the same as the holding fee and is not applied to rent.
              </dd>
            </div>
            <div>
              <dt>Processing timeline</dt>
              <dd>
                Applications are typically reviewed within two to three business days, depending on
                how quickly your references and screening partners respond.
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
            Rental criteria are published in writing and applied to every applicant for the same
            unit. We do not negotiate screening standards on an individual basis.
          </p>

          <!-- 4 -->
          <h2 id="accuracy">4. Listing Accuracy Disclaimer</h2>
          <p>
            We work hard to keep our listings current and accurate. Even so, listings change quickly
            and mistakes happen.
          </p>
          <ul>
            <li><strong>Availability</strong> — a unit shown as available may be placed under application or taken off the market at any time.</li>
            <li><strong>Pricing</strong> — advertised rent is subject to change until a lease is signed. Concessions and specials have their own terms and expiration dates.</li>
            <li><strong>Measurements</strong> — square footage, room dimensions, and lot sizes are approximate and may vary from unit to unit within the same floor plan.</li>
            <li><strong>Amenities</strong> — amenities shown may be available in some buildings but not others, and building services can be temporarily unavailable for repairs or seasonal closures.</li>
            <li><strong>Images</strong> — photographs and floor plans are for illustration and may show a model unit, not the exact unit you will lease.</li>
          </ul>
          <p>
            We encourage every prospective resident to tour the specific unit they intend to rent
            and to confirm all details in writing before signing a lease. Nothing on the website
            constitutes an offer to lease.
          </p>

          <!-- 5 -->
          <h2 id="conduct">5. Resident Conduct &amp; Property Rules</h2>
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

          <!-- 6 -->
          <h2 id="liability">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, PremierPM is not liable for indirect, incidental,
            special, or consequential damages arising from your use of the website, the portal, or
            our management services.
          </p>

          <h3>Property upkeep reporting</h3>
          <p>
            Residents are responsible for reporting maintenance issues in a timely and accurate
            manner. We are not liable for damage that results from a maintenance issue you failed to
            report, or from a delay caused by a vendor's schedule that is beyond our reasonable
            control.
          </p>
          <p>
            We are also not liable for service interruptions to utilities, internet, or building
            systems caused by third-party providers, severe weather, or other events outside our
            control.
          </p>

          <h3>Cap on liability</h3>
          <p>
            Where liability cannot be excluded entirely, our total liability to you for any claim
            arising out of these Terms or your tenancy is limited to the total amount of rent you
            have paid to us in the twelve months preceding the event giving rise to the claim.
          </p>

          <div class="callout">
            <div class="callout-label">Nothing here waives statutory rights</div>
            <p>
              Nothing in these Terms limits rights you hold under applicable landlord-tenant law,
              fair housing law, or consumer protection law that cannot be waived by contract.
            </p>
          </div>

          <!-- 7 -->
          <h2 id="indemnity">7. Indemnification</h2>
          <p>
            You agree to indemnify and hold PremierPM harmless from any claim, loss, or expense —
            including reasonable legal fees — arising from:
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

          <!-- 8 -->
          <h2 id="termination">8. Suspension &amp; Termination</h2>
          <p>
            We may suspend or terminate portal access if you breach these Terms, if your account
            shows signs of compromise, or if continuing access would create a security or legal risk.
          </p>
          <p>
            Terminating portal access does not terminate your lease. Rent obligations, maintenance
            reporting duties, and all other lease terms remain in effect. Where possible, we will
            provide an alternative method for you to pay rent and submit maintenance requests.
          </p>
          <p>
            You may close your portal account at any time by contacting the leasing office. Some
            records are retained after closure as described in our
            <a href="/c/policy" class="accent">Privacy Policy</a>.
          </p>

          <!-- 9 -->
          <h2 id="law">9. Governing Law &amp; Disputes</h2>
          <p>
            These Terms are governed by the laws of the state in which the managed property is
            located, without regard to conflict-of-law rules.
          </p>
          <p>
            Before pursuing formal action, we ask that you contact our office so we can attempt to
            resolve the issue directly. Most concerns — billing questions, maintenance delays,
            renewal terms — are settled at that stage.
          </p>
          <p>
            If a dispute cannot be resolved informally, it will be handled in the courts of the
            county where the property is located, unless applicable law requires a different forum
            or process.
          </p>

          <!-- 10 -->
          <h2 id="changes">10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time to reflect changes in our services, in the
            law, or in how the portal operates.
          </p>
          <p>
            When we make a material change, we will update the effective date at the top of this
            page and post a notice in the tenant portal and in building common areas. Continued use
            of the portal or continued tenancy after the change takes effect constitutes acceptance
            of the updated Terms.
          </p>
          <p>
            If you do not agree with an update, you may stop using the portal. Your lease continues
            to be governed by its own terms, including any notice provisions it contains.
          </p>

          <!-- CONTACT BLOCK -->
          <div class="doc-contact">
            <h2 id="contact-legal">Questions about these Terms</h2>
            <p>
              If anything here is unclear, or if you need a copy of the rental criteria or a sample
              lease before applying, contact our legal and leasing team using the details below.
            </p>

            <dl>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:legal@premierpm.example">legal@premierpm.example</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:+15550123456">(555) 012-3456</a> · Mon–Fri, 9:00 AM – 6:00 PM</dd>
              </div>
              <div>
                <dt>Postal address</dt>
                <dd>Premier Property Management · Attn: Legal<br>450 Harrison Avenue, Suite 12, City Center, ST 10024</dd>
              </div>
              <div>
                <dt>Related documents</dt>
                <dd>
                  <a href="/c/policy">Privacy Policy</a> ·
                  <a href="/c/contact">Contact the leasing office</a>
                </dd>
              </div>
            </dl>
          </div>

        </article>

      </div>
    </div>
  </section>

  <hr class="rule">

  <!-- ================= CTA ================= -->
  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Want to know how we handle your data too?</h2>
          <p>
            Our Privacy Policy covers screening documents, lease logs, rent records, and the rights
            you hold over your own information.
          </p>
        </div>
        <div class="cta-actions">
          <a href="/c/policy" class="btn btn-primary btn-lg">Read Privacy Policy</a>
          <a href="/c/contact" class="btn btn-secondary btn-lg">Contact Us</a>
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
          Premier<span class="accent">PM</span>
        </a>
        <p>
          Property management and leasing for the modern city. 250+ residential units managed with
          transparent pricing and a maintenance team that shows up.
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
          <li><a href="/c/policy">Privacy Policy</a></li>
          <li><a href="/c/terms">Terms of Service</a></li>
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