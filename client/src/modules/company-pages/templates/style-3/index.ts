export const style3Landing = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Premier Property Management &amp; Leasing in the City</title>
<meta name="description" content="Transparent leasing, well-maintained apartments, and 24/7 maintenance. Premier Property Management operates 250+ residential units across the metro.">
<style>
/* ============================================================
   DESIGN TOKENS — Editorial / Content-First (Editorial Minimal)
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#1c1917;
  --ink-2:#3f3a35;
  --ink-3:#57534e;
  --muted:#78716c;
  --muted-2:#a8a29e;

  --paper:#faf7f2;
  --paper-2:#f5f0e8;
  --surface:#ffffff;
  --surface-2:#fdfbf7;

  --rule:#e7e0d5;
  --rule-2:#d8cfbf;
  --rule-3:#c4b8a3;

  --accent:#8b3a2e;           /* deep rust — editorial masthead tone */
  --accent-2:#6b2c1f;
  --accent-soft:rgba(139,58,46,.08);

  --serif:Georgia,'Iowan Old Style','Palatino Linotype','Book Antiqua',Palatino,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;

  --max:1180px;
  --measure:66ch;
  --header-h:4.5rem;
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6rem}

body{
  font-family:var(--sans);
  background:var(--paper);
  color:var(--ink);
  line-height:1.7;
  font-size:17px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none;transition:color .16s ease}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{
  font-family:var(--serif);
  font-weight:400;
  letter-spacing:-.015em;
  line-height:1.18;
  color:var(--ink);
}
h1{font-size:clamp(2.5rem,5.5vw,4.5rem);letter-spacing:-.025em;line-height:1.05}
h2{font-size:clamp(1.65rem,3vw,2.35rem);letter-spacing:-.02em;line-height:1.18}
h3{font-size:1.35rem;line-height:1.3}
h4{font-size:1.05rem;line-height:1.35}

p{color:var(--ink-2);line-height:1.75}
p + p{margin-top:1.15rem}

/* Small caps / kicker */
.kicker{
  font-family:var(--sans);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--accent);
}

/* Understated links */
.link{
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.link:hover{
  color:var(--accent-2);
  border-bottom-color:var(--accent);
}

/* Drop cap */
.dropcap::first-letter{
  font-family:var(--serif);
  font-size:3.85em;
  line-height:.85;
  float:left;
  padding:.1em .12em 0 0;
  color:var(--ink);
  font-weight:400;
}

/* Marker / accent word */
.italic-accent{
  font-style:italic;
  color:var(--accent);
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:760px;margin-inline:auto;padding-inline:1.5rem}
.container-wide{width:100%;max-width:1340px;margin-inline:auto;padding-inline:1.5rem}

.section{padding:5rem 0}
.section-tight{padding:3rem 0}

.rule{
  height:1px;
  background:var(--rule);
  border:0;
}

/* Section heading — small caps lead + serif title */
.section-head{margin-bottom:2.75rem}
.section-head .kicker{display:block;margin-bottom:1rem}
.section-head h2{max-width:22ch}
.section-head.center{text-align:center;margin-inline:auto;max-width:720px}
.section-head.center h2{margin-inline:auto}

/* ============================================================
   HEADER — magazine masthead feel
   ============================================================ */
.site-header{
  background:var(--paper);
  border-bottom:1px solid var(--rule);
  position:relative;
  z-index:40;
}
.header-top{
  border-bottom:1px solid var(--rule);
  padding:.55rem 0;
  font-family:var(--sans);
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}
.header-top-inner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1.5rem;
  flex-wrap:wrap;
}
.header-top-inner span{white-space:nowrap}
.header-top-inner .dot{
  display:inline-block;
  width:.28rem;
  height:.28rem;
  background:var(--accent);
  border-radius:50%;
  margin:0 .55rem;
  vertical-align:middle;
  transform:translateY(-1px);
}

.header-main{padding:1.5rem 0 1.25rem;border-bottom:1px solid var(--rule)}
.header-main-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:2rem;
  flex-wrap:wrap;
}

.masthead{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:.15rem;
}
.masthead-name{
  font-family:var(--serif);
  font-size:1.85rem;
  letter-spacing:-.03em;
  line-height:1;
  color:var(--ink);
}
.masthead-name em{
  font-style:italic;
  color:var(--accent);
}
.masthead-tag{
  font-family:var(--sans);
  font-size:.66rem;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:var(--muted);
  margin-top:.35rem;
}

.header-contact{
  font-family:var(--sans);
  font-size:.82rem;
  color:var(--ink-2);
  text-align:right;
  line-height:1.65;
}
.header-contact a{
  border-bottom:1px solid var(--rule-2);
  padding-bottom:1px;
}
.header-contact a:hover{border-bottom-color:var(--accent);color:var(--accent)}

/* Nav row — like a newspaper section bar */
.nav-bar{
  border-bottom:1px solid var(--rule);
  background:var(--paper);
  position:sticky;
  top:0;
  z-index:50;
}
.nav-bar-inner{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1.5rem;
  padding:.85rem 0;
}

.nav{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
.nav a{
  font-family:var(--sans);
  font-size:.78rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--ink-3);
  padding:.25rem 0;
  border-bottom:1px solid transparent;
  transition:color .16s ease,border-color .16s ease;
}
.nav a:hover{color:var(--ink);border-bottom-color:var(--ink)}
.nav a[aria-current="page"]{color:var(--accent);border-bottom-color:var(--accent)}

.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;
  width:2.5rem;height:2.5rem;
  border:1px solid var(--rule-2);
  background:var(--surface);
  cursor:pointer;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:4px;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink)}

.nav-cta{
  font-family:var(--sans);
  font-size:.78rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--accent);
  padding:.25rem 0;
  border-bottom:1px solid var(--accent);
  white-space:nowrap;
}
.nav-cta:hover{color:var(--accent-2)}

/* ============================================================
   HERO — magazine cover story
   ============================================================ */
.hero{
  padding:4.5rem 0 5rem;
  border-bottom:1px solid var(--rule);
}

.hero-grid{
  display:grid;
  grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);
  gap:4rem;
  align-items:start;
}

.hero-left .kicker{
  display:block;
  margin-bottom:1.5rem;
}
.hero-left .kicker .dot{
  display:inline-block;
  width:.35rem;
  height:.35rem;
  background:var(--accent);
  border-radius:50%;
  margin-right:.6rem;
  vertical-align:middle;
  transform:translateY(-2px);
}

.hero h1{
  margin-bottom:1.75rem;
  max-width:15ch;
}

.hero-sub{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.3rem;
  line-height:1.5;
  color:var(--ink-3);
  max-width:44ch;
  margin-bottom:2rem;
  padding-bottom:2rem;
  border-bottom:1px solid var(--rule);
}

.hero-body{
  max-width:60ch;
}
.hero-body p{font-size:1.02rem}

.hero-actions{
  display:flex;
  gap:2rem;
  margin-top:2.5rem;
  flex-wrap:wrap;
  align-items:baseline;
}
.hero-actions .link-lg{
  font-family:var(--sans);
  font-size:.82rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--accent);
  border-bottom:1px solid var(--accent);
  padding-bottom:2px;
}
.hero-actions .link-lg:hover{color:var(--accent-2);border-bottom-color:var(--accent-2)}
.hero-actions .link-quiet{
  font-family:var(--sans);
  font-size:.82rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--ink-3);
  border-bottom:1px solid var(--rule-2);
  padding-bottom:2px;
}
.hero-actions .link-quiet:hover{color:var(--ink);border-bottom-color:var(--ink)}

/* Right rail — featured brief */
.hero-rail{
  border-top:3px double var(--rule-2);
  padding-top:1.75rem;
}
.hero-rail .kicker{
  display:block;
  margin-bottom:1rem;
  color:var(--muted);
}

.feature-card{
  display:flex;
  flex-direction:column;
  gap:1.25rem;
}

.feature-thumb{
  position:relative;
  aspect-ratio:4/3;
  background:linear-gradient(160deg,var(--paper-2) 0%,#ece3d3 100%);
  border:1px solid var(--rule-2);
  overflow:hidden;
}
.feature-thumb::before{
  content:"";position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(139,58,46,.06) 1px,transparent 1px),
    linear-gradient(90deg,rgba(139,58,46,.06) 1px,transparent 1px);
  background-size:24px 24px;
}
.feature-thumb span{
  position:absolute;inset:0;display:grid;place-items:center;
  font-family:var(--serif);
  font-style:italic;
  font-size:.98rem;
  color:var(--muted);
}

.feature-title{
  font-family:var(--serif);
  font-size:1.35rem;
  line-height:1.25;
  letter-spacing:-.015em;
}
.feature-meta{
  font-family:var(--sans);
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}
.feature-meta .dot{
  display:inline-block;
  width:.25rem;height:.25rem;
  background:var(--muted-2);
  border-radius:50%;
  margin:0 .5rem;
  vertical-align:middle;
  transform:translateY(-2px);
}
.feature-excerpt{
  font-size:.95rem;
  color:var(--ink-3);
  line-height:1.7;
}
.feature-price{
  font-family:var(--serif);
  font-size:1.15rem;
  color:var(--ink);
  padding-top:1.15rem;
  border-top:1px solid var(--rule);
  display:flex;
  justify-content:space-between;
  align-items:baseline;
}
.feature-price small{
  font-family:var(--sans);
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}

/* ============================================================
   TICKER — quiet stats bar
   ============================================================ */
.ticker{
  border-bottom:1px solid var(--rule);
  background:var(--paper-2);
  padding:1.35rem 0;
}
.ticker-inner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:2rem;
  flex-wrap:wrap;
  font-family:var(--sans);
  font-size:.78rem;
  letter-spacing:.13em;
  text-transform:uppercase;
  color:var(--muted);
}
.ticker-inner .item{display:flex;align-items:center;gap:.75rem}
.ticker-inner .item strong{
  font-family:var(--serif);
  font-size:1.05rem;
  font-weight:400;
  letter-spacing:0;
  text-transform:none;
  color:var(--ink);
}

/* ============================================================
   FEATURE — main story with pull quote
   ============================================================ */
.feature-story{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.story-grid{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,2.1fr);
  gap:4rem;
  align-items:start;
}

.story-aside{
  position:sticky;
  top:6rem;
}
.story-aside .kicker{display:block;margin-bottom:1rem}
.story-aside h3{
  font-size:1.05rem;
  line-height:1.4;
  color:var(--ink);
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
  margin-bottom:1.25rem;
}
.story-aside ul{display:flex;flex-direction:column;gap:.85rem}
.story-aside li{
  font-family:var(--sans);
  font-size:.83rem;
  color:var(--ink-3);
  padding-bottom:.85rem;
  border-bottom:1px solid var(--rule);
  display:flex;
  gap:.6rem;
  align-items:baseline;
  line-height:1.55;
}
.story-aside li::before{
  content:"—";
  color:var(--accent);
  flex:none;
  font-weight:400;
}
.story-aside li:last-child{border-bottom:0;padding-bottom:0}

.story-main{max-width:var(--measure)}

.story-main h2{
  margin-bottom:1.5rem;
  max-width:24ch;
}
.story-main h2 em{
  font-style:italic;
  color:var(--accent);
}

.story-main p{
  font-size:1.02rem;
  color:var(--ink-2);
}

/* Pull quote */
.pull-quote{
  margin:2.5rem 0;
  padding:1.75rem 0;
  border-top:1px solid var(--rule-2);
  border-bottom:1px solid var(--rule-2);
  text-align:center;
}
.pull-quote p{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.55rem;
  line-height:1.4;
  letter-spacing:-.015em;
  color:var(--ink);
  max-width:34ch;
  margin:0 auto;
}
.pull-quote cite{
  display:block;
  font-family:var(--sans);
  font-style:normal;
  font-size:.72rem;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
  margin-top:1.35rem;
}

.story-bylines{
  margin-top:2.25rem;
  padding-top:1.75rem;
  border-top:1px solid var(--rule);
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.75rem;
}
.byline-item .label{
  font-family:var(--sans);
  font-size:.68rem;
  letter-spacing:.15em;
  text-transform:uppercase;
  color:var(--muted);
  margin-bottom:.4rem;
}
.byline-item .value{
  font-family:var(--serif);
  font-size:1rem;
  color:var(--ink);
  line-height:1.4;
}

/* ============================================================
   LISTINGS INDEX — editorial table-like cards
   ============================================================ */
.listings{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.listings-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  gap:2rem;
  margin-bottom:3rem;
  padding-bottom:1.5rem;
  border-bottom:1px solid var(--rule);
  flex-wrap:wrap;
}
.listings-head h2{max-width:20ch}
.listings-head .link-quiet{
  font-family:var(--sans);
  font-size:.78rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--ink-3);
  border-bottom:1px solid var(--rule-2);
  padding-bottom:2px;
  white-space:nowrap;
}
.listings-head .link-quiet:hover{color:var(--accent);border-bottom-color:var(--accent)}

.listings-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  border-top:1px solid var(--rule);
  border-left:1px solid var(--rule);
}
.listing-card{
  border-right:1px solid var(--rule);
  border-bottom:1px solid var(--rule);
  padding:2rem 1.75rem 2.25rem;
  display:flex;
  flex-direction:column;
  gap:1.35rem;
  background:var(--paper);
  transition:background .18s ease;
}
.listing-card:hover{background:var(--surface-2)}

.listing-thumb{
  position:relative;
  aspect-ratio:16/11;
  background:linear-gradient(160deg,var(--paper-2) 0%,#ece3d3 100%);
  border:1px solid var(--rule-2);
  overflow:hidden;
}
.listing-thumb::before{
  content:"";position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(139,58,46,.06) 1px,transparent 1px),
    linear-gradient(90deg,rgba(139,58,46,.06) 1px,transparent 1px);
  background-size:24px 24px;
}
.listing-thumb span{
  position:absolute;inset:0;display:grid;place-items:center;
  font-family:var(--serif);
  font-style:italic;
  font-size:.92rem;
  color:var(--muted);
}

.listing-status{
  position:absolute;
  top:.85rem;
  left:.85rem;
  font-family:var(--sans);
  font-size:.62rem;
  font-weight:700;
  letter-spacing:.16em;
  text-transform:uppercase;
  background:var(--paper);
  color:var(--ink);
  padding:.32rem .6rem;
  border:1px solid var(--rule-2);
  z-index:2;
}
.listing-status.accent{
  background:var(--accent);
  color:#fff;
  border-color:var(--accent);
}

.listing-title{
  font-family:var(--serif);
  font-size:1.18rem;
  line-height:1.3;
  letter-spacing:-.015em;
}
.listing-title a:hover{color:var(--accent)}

.listing-addr{
  font-family:var(--sans);
  font-size:.82rem;
  color:var(--muted);
  margin-top:.35rem;
}

.listing-specs{
  display:flex;
  flex-wrap:wrap;
  gap:.4rem 1rem;
  font-family:var(--sans);
  font-size:.78rem;
  color:var(--ink-3);
  letter-spacing:.02em;
  padding-top:1rem;
  border-top:1px solid var(--rule);
  margin-top:auto;
}
.listing-specs span{white-space:nowrap}
.listing-specs .sep{color:var(--muted-2)}

.listing-foot{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  gap:1rem;
  padding-top:.85rem;
  border-top:1px solid var(--rule);
}
.listing-price{
  font-family:var(--serif);
  font-size:1.25rem;
  color:var(--ink);
  letter-spacing:-.01em;
}
.listing-price small{
  font-family:var(--sans);
  font-size:.72rem;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:var(--muted);
}
.listing-link{
  font-family:var(--sans);
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.5);
  padding-bottom:1px;
  white-space:nowrap;
}
.listing-link:hover{color:var(--accent-2);border-bottom-color:var(--accent-2)}

/* ============================================================
   THREE-PART ESSAY — why rent with us
   ============================================================ */
.essay{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
  background:var(--paper-2);
}
.essay-head{
  max-width:760px;
  margin:0 auto 3.5rem;
  text-align:center;
}
.essay-head .kicker{display:block;margin-bottom:1rem}
.essay-head h2{max-width:22ch;margin:0 auto}

.essay-columns{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  max-width:1080px;
  margin:0 auto;
  border-top:1px solid var(--rule-2);
  border-bottom:1px solid var(--rule-2);
}
.essay-col{
  padding:2.75rem 2rem;
  border-right:1px solid var(--rule-2);
  display:flex;
  flex-direction:column;
}
.essay-col:last-child{border-right:0}

.essay-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:2.5rem;
  color:var(--accent);
  line-height:1;
  margin-bottom:1.5rem;
  letter-spacing:-.02em;
}
.essay-col h3{
  font-family:var(--serif);
  font-size:1.28rem;
  line-height:1.3;
  margin-bottom:1rem;
  max-width:20ch;
}
.essay-col p{
  font-size:.95rem;
  color:var(--ink-3);
  line-height:1.75;
}
.essay-col .essay-detail{
  margin-top:auto;
  padding-top:1.5rem;
  font-family:var(--sans);
  font-size:.78rem;
  color:var(--muted);
  letter-spacing:.02em;
  border-top:1px solid var(--rule-2);
  margin-top:2rem;
}

/* ============================================================
   PRICING — editorial table
   ============================================================ */
.pricing{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.pricing-head{
  max-width:720px;
  margin:0 auto 3.5rem;
  text-align:center;
}
.pricing-head .kicker{display:block;margin-bottom:1rem}

.pricing-table{
  max-width:1000px;
  margin:0 auto;
  border-top:1px solid var(--rule-2);
  border-bottom:1px solid var(--rule-2);
}

.pricing-row{
  display:grid;
  grid-template-columns:minmax(0,1.35fr) minmax(0,1fr) minmax(0,1.3fr) auto;
  gap:2rem;
  padding:2rem 0;
  border-bottom:1px solid var(--rule);
  align-items:center;
}
.pricing-row:last-child{border-bottom:0}
.pricing-row.featured{
  background:var(--surface-2);
  padding-left:1.5rem;
  padding-right:1.5rem;
  margin:0 -1.5rem;
}

.plan-name{
  font-family:var(--serif);
  font-size:1.32rem;
  line-height:1.25;
  color:var(--ink);
}
.plan-name em{
  font-style:italic;
  color:var(--accent);
}
.plan-name .plan-label{
  display:block;
  font-family:var(--sans);
  font-size:.68rem;
  font-style:normal;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
  margin-bottom:.5rem;
}
.plan-name .plan-label.tag{
  color:var(--accent);
}

.plan-price{
  font-family:var(--serif);
  font-size:1.65rem;
  letter-spacing:-.02em;
  color:var(--ink);
  line-height:1;
}
.plan-price small{
  display:block;
  font-family:var(--sans);
  font-size:.7rem;
  letter-spacing:.13em;
  text-transform:uppercase;
  color:var(--muted);
  margin-top:.5rem;
}

.plan-features{
  display:flex;
  flex-direction:column;
  gap:.45rem;
  font-family:var(--sans);
  font-size:.85rem;
  color:var(--ink-3);
  line-height:1.55;
}
.plan-features li{
  display:flex;
  gap:.55rem;
  align-items:baseline;
}
.plan-features li::before{
  content:"—";
  color:var(--accent);
  flex:none;
}

.plan-cta{
  font-family:var(--sans);
  font-size:.76rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--ink);
  border-bottom:1px solid var(--ink);
  padding-bottom:2px;
  white-space:nowrap;
}
.plan-cta:hover{color:var(--accent);border-bottom-color:var(--accent)}

/* ============================================================
   SUBSCRIPTION / CTA — quiet letter
   ============================================================ */
.subscribe{
  padding:5rem 0;
  background:var(--paper);
}
.subscribe-inner{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.subscribe-inner .kicker{display:block;margin-bottom:1.25rem}
.subscribe-inner h2{max-width:22ch;margin:0 auto 1.25rem}
.subscribe-inner p{
  font-size:1.02rem;
  color:var(--ink-3);
  max-width:56ch;
  margin:0 auto 2.5rem;
}

.subscribe-form{
  display:flex;
  gap:0;
  max-width:520px;
  margin:0 auto;
  border:1px solid var(--rule-2);
  background:var(--surface);
  padding:.35rem;
}
.subscribe-form input{
  flex:1;
  padding:1rem 1.15rem;
  border:0;
  background:transparent;
  font-family:var(--sans);
  font-size:.95rem;
  color:var(--ink);
  min-width:0;
}
.subscribe-form input::placeholder{color:var(--muted-2)}
.subscribe-form input:focus{outline:none}
.subscribe-form button{
  padding:1rem 1.5rem;
  background:var(--ink);
  color:var(--paper);
  border:0;
  font-family:var(--sans);
  font-size:.76rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  cursor:pointer;
  transition:background .16s ease;
}
.subscribe-form button:hover{background:var(--accent)}
.subscribe-note{
  font-family:var(--sans);
  font-size:.78rem;
  color:var(--muted);
  margin-top:1.15rem;
  letter-spacing:.02em;
}

/* ============================================================
   FOOTER — masthead-style
   ============================================================ */
.site-footer{
  background:var(--paper);
  border-top:1px solid var(--rule);
  padding:4rem 0 2rem;
  margin-top:auto;
}
.footer-grid{
  display:grid;
  grid-template-columns:minmax(0,1.6fr) 1fr 1fr 1.3fr;
  gap:3rem;
  padding-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.footer-brand .masthead-name{font-size:1.5rem}
.footer-brand p{
  font-size:.88rem;
  color:var(--muted);
  margin-top:1.15rem;
  max-width:38ch;
  line-height:1.7;
}
.footer-col h4{
  font-family:var(--sans);
  font-size:.68rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
  margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.65rem}
.footer-col a,.footer-col span{
  font-family:var(--sans);
  font-size:.88rem;
  color:var(--ink-3);
  line-height:1.6;
}
.footer-col a{border-bottom:1px solid transparent;transition:border-color .16s ease,color .16s ease}
.footer-col a:hover{color:var(--accent);border-bottom-color:rgba(139,58,46,.4)}

.footer-bottom{
  padding-top:1.75rem;
  display:flex;
  justify-content:space-between;
  gap:1rem;
  flex-wrap:wrap;
  font-family:var(--sans);
  font-size:.78rem;
  color:var(--muted);
  letter-spacing:.02em;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .hero-grid{grid-template-columns:1fr;gap:3.5rem}
  .hero-rail{max-width:520px}
  .story-grid{grid-template-columns:1fr;gap:2.5rem}
  .story-aside{position:static}
  .story-aside ul{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem 2rem}
  .listings-grid{grid-template-columns:repeat(2,1fr)}
  .pricing-row{grid-template-columns:1fr 1fr;gap:1.5rem 2rem;padding:2rem 0}
  .plan-features{grid-column:1/-1}
  .plan-cta{justify-self:start}
  .footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem}
}

@media (max-width:900px){
  .nav-bar-inner{gap:1rem}
  .nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--surface);border:1px solid var(--rule);border-top:0;padding:0}
  .nav a{padding:1rem 1.5rem;border-bottom:1px solid var(--rule);border-bottom-color:var(--rule);font-size:.82rem}
  .nav a:last-child{border-bottom:0}
  .burger{display:flex}
  .nav-toggle:checked ~ .nav-bar-inner .nav{display:flex}
}

@media (max-width:780px){
  .hero{padding:3.5rem 0 3.5rem}
  .essay-columns{grid-template-columns:1fr}
  .essay-col{border-right:0;border-bottom:1px solid var(--rule-2);padding:2.25rem 1.5rem}
  .essay-col:last-child{border-bottom:0}
  .story-bylines{grid-template-columns:1fr;gap:1.25rem}
  .pull-quote p{font-size:1.3rem}
}

@media (max-width:680px){
  .section{padding:3.5rem 0}
  .section-tight{padding:2.25rem 0}
  .header-top{display:none}
  .header-main{padding:1.25rem 0}
  .masthead-name{font-size:1.5rem}
  .header-contact{text-align:left;width:100%}
  .listings-grid{grid-template-columns:1fr}
  .pricing-row{grid-template-columns:1fr;gap:1.25rem}
  .pricing-row.featured{padding:1.5rem 1rem;margin:0 -1rem}
  .subscribe-form{flex-direction:column;padding:.5rem;gap:.5rem}
  .subscribe-form input{text-align:center}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .footer-bottom{flex-direction:column;text-align:center}
  .ticker-inner{justify-content:flex-start;gap:1rem}
}

@media (max-width:520px){
  body{font-size:16px}
  .container,.container-narrow,.container-wide{padding-inline:1.15rem}
  .hero h1{font-size:2.15rem}
  .hero-actions{flex-direction:column;align-items:flex-start;gap:1.25rem}
  .listings-head{flex-direction:column;gap:1.25rem;align-items:flex-start}
  .plan-price{font-size:1.4rem}
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">

  <!-- Top wire bar -->
  <div class="header-top">
    <div class="container header-top-inner">
      <span>Vol. XII <span class="dot"></span> Property Management &amp; Leasing</span>
      <span>City Center <span class="dot"></span> Est. 2012</span>
      <span>Issue No. 248 <span class="dot"></span> March 2025</span>
    </div>
  </div>

  <!-- Masthead -->
  <div class="header-main">
    <div class="container header-main-inner">
      <a href="/" class="masthead">
        <span class="masthead-name">Premier <em>Property</em> Management</span>
        <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
      </a>

      <div class="header-contact">
        <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a><br>
        <a href="tel:+15550123456">(555) 012-3456</a>
      </div>
    </div>
  </div>

  <!-- Section nav -->
  <div class="nav-bar">
    <div class="container nav-bar-inner">
      <input type="checkbox" id="nav-toggle" class="nav-toggle">
      <nav class="nav" aria-label="Primary">
        <a href="/" aria-current="page">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <a href="/c/contact" class="nav-cta">Book a Tour →</a>

      <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </label>
    </div>
  </div>

</header>

<main>

  <!-- ================= HERO ================= -->
  <section class="hero">
    <div class="container">
      <div class="hero-grid">

        <!-- Left: cover story -->
        <div class="hero-left">
          <span class="kicker"><span class="dot"></span>Featured Story <span style="margin-left:.6rem;color:var(--muted);letter-spacing:.14em">· Issue 248</span></span>

          <h1>Property management that reads like a good letter, not a legal notice.</h1>

          <p class="hero-sub">
            Transparent leasing, well-maintained apartments, and a maintenance team that answers
            the phone. A quiet look at how we run 250+ residential units across the metro.
          </p>

          <div class="hero-body">
            <p class="dropcap">
              We started in 2012 with one renovated walk-up in the Downtown Core and a simple
              observation: most people do not dislike renting, they dislike being ignored. Repairs
              sat for weeks. Statements arrived without explanation. Renewals felt like ultimatums.
              We built the company around fixing exactly that — and the portfolio has grown slowly,
              building by building, ever since.
            </p>
            <p>
              Today Premier Property Management looks after more than 250 homes across four
              neighborhoods. Every unit is inspected before it is listed. Every repair has a
              written standard. Every resident has a named contact. This page is the short version
              of how that works.
            </p>
          </div>

          <div class="hero-actions">
            <a href="#listings" class="link-lg">Browse Available Units</a>
            <a href="/c/contact" class="link-quiet">Book a Tour</a>
          </div>
        </div>

        <!-- Right: featured brief -->
        <aside class="hero-rail">
          <span class="kicker">This Week's Feature</span>

          <article class="feature-card">
            <div class="feature-thumb"><span>Harbor View Lofts · Unit 14B</span></div>

            <div class="feature-meta">
              Riverside District
              <span class="dot"></span>
              Available Now
            </div>

            <h3 class="feature-title">A two-bedroom corner loft with morning light on three sides.</h3>

            <p class="feature-excerpt">
              Exposed brick, a small writing nook off the second bedroom, and a walkable block
              that puts the ferry, the market, and a very good bakery within four minutes.
            </p>

            <div class="feature-price">
              <span>$2,450</span>
              <small>per month</small>
            </div>

            <a href="/c/contact" class="link" style="align-self:flex-start;font-size:.85rem">Read the full listing →</a>
          </article>
        </aside>

      </div>
    </div>
  </section>

  <!-- ================= TICKER ================= -->
  <div class="ticker" aria-label="Portfolio at a glance">
    <div class="container ticker-inner">
      <span class="item"><strong>250+</strong> units under management</span>
      <span class="item"><strong>98%</strong> resident renewal rate</span>
      <span class="item"><strong>&lt; 4 hrs</strong> maintenance response</span>
      <span class="item"><strong>12 yrs</strong> in the metro</span>
    </div>
  </div>

  <!-- ================= FEATURE STORY WITH PULL QUOTE ================= -->
  <section class="feature-story">
    <div class="container">
      <div class="story-grid">

        <!-- Aside — quiet index -->
        <aside class="story-aside">
          <span class="kicker">In This Issue</span>
          <h3>What we mean when we say “well-managed.”</h3>
          <ul>
            <li>Every unit inspected before listing</li>
            <li>Every repair logged and time-stamped</li>
            <li>Every resident assigned a named contact</li>
            <li>Every renewal negotiated in writing</li>
            <li>Every building on a preventive upkeep schedule</li>
          </ul>
        </aside>

        <!-- Main story -->
        <div class="story-main">
          <h2>We treat property management as a form of <em>careful writing</em> — one record at a time.</h2>

          <p>
            Every apartment we manage has a file. Not a folder of scanned PDFs, but a real record
            with a history: the date it was last painted, the name of the plumber who replaced the
            water heater, the resident who reported the slow drain on a Tuesday morning and the
            technician who cleared it by Thursday afternoon. That record is what separates a
            well-run building from a building that happens not to be on fire this week.
          </p>

          <p>
            We take that idea seriously. Maintenance requests are time-stamped from the moment you
            submit them. Repairs are documented with before-and-after photographs. Notices to
            residents are written in plain English, not landlord legalese. When a resident asks a
            question, they get a real answer, in writing, from a person whose name they know.
          </p>

          <blockquote class="pull-quote">
            <p>“The best property management is the kind you never have to think about — because everything was already handled before you noticed.”</p>
            <cite>Morgan Delacroix, Managing Director</cite>
          </blockquote>

          <p>
            That is not a marketing line. It is the operating standard we hold ourselves to. Every
            vendor contract we sign includes response-time requirements. Every building in the
            portfolio has a preventive maintenance calendar. Every resident has a phone number to
            call at 2 a.m. if a pipe bursts, and a human being on the other end who has the
            authority to dispatch help without asking permission from four levels of management.
          </p>

          <p>
            It is not glamorous work. It is the work, and it is the reason our residents stay an
            average of four and a half years, and why almost every renewal we offer comes back
            signed.
          </p>

          <div class="story-bylines">
            <div class="byline-item">
              <div class="label">Written by</div>
              <div class="value">Morgan Delacroix<br>Managing Director</div>
            </div>
            <div class="byline-item">
              <div class="label">Fact-checked by</div>
              <div class="value">Leah Chen<br>Lead Leasing Agent</div>
            </div>
            <div class="byline-item">
              <div class="label">Photos &amp; records</div>
              <div class="value">James Okafor<br>Head of Maintenance</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= LISTINGS INDEX ================= -->
  <section class="listings" id="listings">
    <div class="container">
      <div class="listings-head">
        <h2>Available units, indexed and inspected.</h2>
        <a href="/c/contact" class="link-quiet">Request the full index →</a>
      </div>

      <div class="listings-grid">

        <article class="listing-card">
          <div class="listing-thumb">
            <span class="listing-status accent">Available Now</span>
            <span>Harbor View Lofts</span>
          </div>
          <div>
            <h3 class="listing-title"><a href="/c/contact">Harbor View Lofts · Unit 14B</a></h3>
            <p class="listing-addr">218 Harbor Street, Riverside District</p>
          </div>
          <div class="listing-specs">
            <span>2 Bedrooms</span>
            <span class="sep">·</span>
            <span>2 Bathrooms</span>
            <span class="sep">·</span>
            <span>1,050 sq ft</span>
            <span class="sep">·</span>
            <span>Pet Friendly</span>
          </div>
          <div class="listing-foot">
            <div class="listing-price">$2,450 <small>/ mo</small></div>
            <a href="/c/contact" class="listing-link">Arrange a viewing</a>
          </div>
        </article>

        <article class="listing-card">
          <div class="listing-thumb">
            <span>Cedar Park Townhomes</span>
          </div>
          <div>
            <h3 class="listing-title"><a href="/c/contact">Cedar Park Townhomes · No. 7</a></h3>
            <p class="listing-addr">76 Cedar Park Row, Cedar Park</p>
          </div>
          <div class="listing-specs">
            <span>3 Bedrooms</span>
            <span class="sep">·</span>
            <span>2.5 Bathrooms</span>
            <span class="sep">·</span>
            <span>1,600 sq ft</span>
            <span class="sep">·</span>
            <span>Private Entry</span>
          </div>
          <div class="listing-foot">
            <div class="listing-price">$3,200 <small>/ mo</small></div>
            <a href="/c/contact" class="listing-link">Arrange a viewing</a>
          </div>
        </article>

        <article class="listing-card">
          <div class="listing-thumb">
            <span class="listing-status">Available Now</span>
            <span>The Metropolitan</span>
          </div>
          <div>
            <h3 class="listing-title"><a href="/c/contact">The Metropolitan · Unit 902</a></h3>
            <p class="listing-addr">12 Metropolitan Plaza, Downtown Core</p>
          </div>
          <div class="listing-specs">
            <span>1 Bedroom</span>
            <span class="sep">·</span>
            <span>1 Bathroom</span>
            <span class="sep">·</span>
            <span>720 sq ft</span>
            <span class="sep">·</span>
            <span>Doorman</span>
          </div>
          <div class="listing-foot">
            <div class="listing-price">$1,850 <small>/ mo</small></div>
            <a href="/c/contact" class="listing-link">Arrange a viewing</a>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ================= ESSAY — WHY RENT WITH US ================= -->
  <section class="essay">
    <div class="container">
      <div class="essay-head">
        <span class="kicker">Three Essays on Renting Well</span>
        <h2>The three things residents complain about most — and how we address each one.</h2>
      </div>

      <div class="essay-columns">

        <div class="essay-col">
          <div class="essay-num">i.</div>
          <h3>Maintenance that is tracked, not promised.</h3>
          <p>
            When you file a maintenance request through the portal, it is time-stamped
            immediately. You receive a confirmation with the name of the coordinator assigned to
            your request, a target response window, and a log that updates as the work progresses.
            If a vendor needs to be scheduled, you see the appointment before the technician
            arrives — not after.
          </p>
          <div class="essay-detail">
            Average response: under four hours, measured across the whole portfolio.
          </div>
        </div>

        <div class="essay-col">
          <div class="essay-num">ii.</div>
          <h3>Payments you can see, line by line.</h3>
          <p>
            Rent is collected through a secure online portal. Each month you receive a statement
            showing the rent owed, any credits applied, and the exact date and method of every
            payment. Ledger history is downloadable as a PDF. If a charge is unclear, you can
            click it and see the note that generated it — no mystery fees, no phone calls to ask
            what line three of your bill actually means.
          </p>
          <div class="essay-detail">
            Payment methods: bank transfer, card, or in-office check.
          </div>
        </div>

        <div class="essay-col">
          <div class="essay-num">iii.</div>
          <h3>A named person, not a ticket number.</h3>
          <p>
            Every resident is assigned a leasing contact and a maintenance coordinator on move-in
            day. Their names, email addresses, and direct extensions are printed on the front of
            your welcome packet. You do not have to route through a call center, and you do not
            have to explain your situation twice. It is the simplest idea we have, and the one
            that makes the biggest difference.
          </p>
          <div class="essay-detail">
            Renewal rate: 98% across the current portfolio.
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= PRICING TABLE ================= -->
  <section class="pricing">
    <div class="container">
      <div class="pricing-head">
        <span class="kicker">Management Plans</span>
        <h2>A quiet, straightforward table of what we charge.</h2>
      </div>

      <div class="pricing-table">

        <div class="pricing-row">
          <div class="plan-name">
            <span class="plan-label">Plan One</span>
            Standard Rental
          </div>
          <div class="plan-price">
            $1,950
            <small>Per month · 2-bed equivalent</small>
          </div>
          <ul class="plan-features">
            <li>Tenant screening &amp; lease preparation</li>
            <li>Online rent collection &amp; monthly statements</li>
            <li>24/7 maintenance coordination</li>
            <li>Annual property inspection</li>
          </ul>
          <a href="/c/contact" class="plan-cta">Enquire →</a>
        </div>

        <div class="pricing-row featured">
          <div class="plan-name">
            <span class="plan-label tag">Plan Two · Most Chosen</span>
            Premium <em>Managed</em>
          </div>
          <div class="plan-price">
            $2,450
            <small>Per month · 2-bed equivalent</small>
          </div>
          <ul class="plan-features">
            <li>Everything in Standard Rental</li>
            <li>Quarterly property inspections</li>
            <li>Priority maintenance dispatch</li>
            <li>Dedicated account manager</li>
            <li>Lease renewal negotiation</li>
          </ul>
          <a href="/c/contact" class="plan-cta">Enquire →</a>
        </div>

        <div class="pricing-row">
          <div class="plan-name">
            <span class="plan-label">Plan Three</span>
            Corporate Leases
          </div>
          <div class="plan-price">
            $3,200
            <small>Per month · 2-bed equivalent</small>
          </div>
          <ul class="plan-features">
            <li>Everything in Premium Managed</li>
            <li>Multi-unit portfolio discounts</li>
            <li>Custom lease &amp; invoicing terms</li>
            <li>Executive occupancy reporting</li>
            <li>Relocation coordination</li>
          </ul>
          <a href="/c/contact" class="plan-cta">Enquire →</a>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= SUBSCRIBE / CTA ================= -->
  <section class="subscribe">
    <div class="container-narrow">
      <div class="subscribe-inner">
        <span class="kicker">The Resident Letter</span>
        <h2>New listings, neighborhood notes, and maintenance advice — once a month.</h2>
        <p>
          No advertisements, no urgency tactics, no “act now.” Just a short letter when we have
          something genuinely worth telling you about.
        </p>

        <form class="subscribe-form" action="/" method="post">
          <input type="email" placeholder="your@email.com" aria-label="Email address" required>
          <button type="submit">Subscribe</button>
        </form>

        <p class="subscribe-note">
          One email per month · Unsubscribe with a single click · No data sharing, ever.
        </p>
      </div>
    </div>
  </section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
  <div class="container">

    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="masthead">
          <span class="masthead-name">Premier <em>Property</em> Management</span>
          <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
        </a>
        <p>
          Property management and leasing for the modern city. We look after more than 250
          residential units with the same attention to detail you would want in your own home.
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

export const style3About = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About · Premier Property Management</title>
<meta name="description" content="Premier Property Management has looked after residential buildings in the city since 2012. A narrative account of the company, its people, and the standard it holds itself to.">
<style>
/* ============================================================
   DESIGN TOKENS — Editorial / Content-First (Editorial Minimal)
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#1c1917;
  --ink-2:#3f3a35;
  --ink-3:#57534e;
  --muted:#78716c;
  --muted-2:#a8a29e;

  --paper:#faf7f2;
  --paper-2:#f5f0e8;
  --surface:#ffffff;
  --surface-2:#fdfbf7;

  --rule:#e7e0d5;
  --rule-2:#d8cfbf;
  --rule-3:#c4b8a3;

  --accent:#8b3a2e;
  --accent-2:#6b2c1f;
  --accent-soft:rgba(139,58,46,.08);

  --serif:Georgia,'Iowan Old Style','Palatino Linotype','Book Antiqua',Palatino,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;

  --max:1180px;
  --measure:64ch;
  --header-h:4.5rem;
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6rem}

body{
  font-family:var(--sans);
  background:var(--paper);
  color:var(--ink);
  line-height:1.7;
  font-size:17px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none;transition:color .16s ease}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{
  font-family:var(--serif);
  font-weight:400;
  letter-spacing:-.015em;
  line-height:1.18;
  color:var(--ink);
}
h1{font-size:clamp(2.35rem,5vw,4.1rem);letter-spacing:-.025em;line-height:1.06}
h2{font-size:clamp(1.65rem,3vw,2.35rem);letter-spacing:-.02em;line-height:1.2}
h3{font-size:1.35rem;line-height:1.3}
h4{font-size:1.05rem;line-height:1.35}

p{color:var(--ink-2);line-height:1.78}
p + p{margin-top:1.15rem}

.kicker{
  font-family:var(--sans);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--accent);
}
.kicker.quiet{color:var(--muted)}

.link{
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.link:hover{color:var(--accent-2);border-bottom-color:var(--accent)}

.dropcap::first-letter{
  font-family:var(--serif);
  font-size:4em;
  line-height:.85;
  float:left;
  padding:.08em .12em 0 0;
  color:var(--ink);
  font-weight:400;
}

.italic-accent{
  font-style:italic;
  color:var(--accent);
}

/* Chapter marker */
.chapter{
  display:flex;
  align-items:baseline;
  gap:1rem;
  margin-bottom:1.75rem;
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
}
.chapter-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.65rem;
  color:var(--accent);
  line-height:1;
  letter-spacing:-.02em;
  flex:none;
}
.chapter-label{
  font-family:var(--sans);
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.2em;
  text-transform:uppercase;
  color:var(--muted);
}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:760px;margin-inline:auto;padding-inline:1.5rem}
.container-wide{width:100%;max-width:1340px;margin-inline:auto;padding-inline:1.5rem}

.section{padding:5rem 0}
.section-tight{padding:3rem 0}

.rule{height:1px;background:var(--rule);border:0}

.section-head{margin-bottom:2.75rem}
.section-head .kicker{display:block;margin-bottom:1rem}
.section-head.center{text-align:center;margin-inline:auto;max-width:720px}
.section-head.center h2{margin-inline:auto}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  background:var(--paper);
  border-bottom:1px solid var(--rule);
  position:relative;
  z-index:40;
}
.header-top{
  border-bottom:1px solid var(--rule);
  padding:.55rem 0;
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}
.header-top-inner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1.5rem;
  flex-wrap:wrap;
}
.header-top-inner span{white-space:nowrap}
.header-top-inner .dot{
  display:inline-block;width:.28rem;height:.28rem;
  background:var(--accent);border-radius:50%;
  margin:0 .55rem;vertical-align:middle;transform:translateY(-1px);
}

.header-main{padding:1.5rem 0 1.25rem;border-bottom:1px solid var(--rule)}
.header-main-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:2rem;flex-wrap:wrap;
}
.masthead{display:flex;flex-direction:column;align-items:flex-start;gap:.15rem}
.masthead-name{
  font-family:var(--serif);font-size:1.85rem;
  letter-spacing:-.03em;line-height:1;color:var(--ink);
}
.masthead-name em{font-style:italic;color:var(--accent)}
.masthead-tag{
  font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);margin-top:.35rem;
}
.header-contact{
  font-size:.82rem;color:var(--ink-2);text-align:right;line-height:1.65;
}
.header-contact a{border-bottom:1px solid var(--rule-2);padding-bottom:1px}
.header-contact a:hover{border-bottom-color:var(--accent);color:var(--accent)}

.nav-bar{
  border-bottom:1px solid var(--rule);
  background:var(--paper);
  position:sticky;top:0;z-index:50;
}
.nav-bar-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:1.5rem;padding:.85rem 0;
}
.nav{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
.nav a{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--ink-3);
  padding:.25rem 0;border-bottom:1px solid transparent;
  transition:color .16s ease,border-color .16s ease;
}
.nav a:hover{color:var(--ink);border-bottom-color:var(--ink)}
.nav a[aria-current="page"]{color:var(--accent);border-bottom-color:var(--accent)}
.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;
  border:1px solid var(--rule-2);background:var(--surface);
  cursor:pointer;align-items:center;justify-content:center;
  flex-direction:column;gap:4px;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink)}
.nav-cta{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);
  padding:.25rem 0;border-bottom:1px solid var(--accent);
  white-space:nowrap;
}
.nav-cta:hover{color:var(--accent-2)}

/* ============================================================
   PAGE HERO — editorial cover
   ============================================================ */
.page-hero{
  padding:4rem 0 3.5rem;
  border-bottom:1px solid var(--rule);
}
.page-hero-inner{
  display:grid;
  grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);
  gap:4rem;
  align-items:end;
}
.page-hero-left .kicker{display:block;margin-bottom:1.5rem}
.page-hero-left .kicker .dot{
  display:inline-block;width:.35rem;height:.35rem;
  background:var(--accent);border-radius:50%;
  margin-right:.6rem;vertical-align:middle;transform:translateY(-2px);
}
.page-hero h1{max-width:15ch;margin-bottom:1.5rem}
.page-hero .subhead{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.28rem;
  line-height:1.5;
  color:var(--ink-3);
  max-width:44ch;
}

.page-hero-right{
  border-left:1px solid var(--rule);
  padding-left:2.5rem;
}
.page-hero-right .kicker.quiet{display:block;margin-bottom:1.25rem}
.page-hero-right dl{display:flex;flex-direction:column;gap:1rem}
.page-hero-right dt{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:.25rem;
}
.page-hero-right dd{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.45;
}

/* ============================================================
   FOUNDER'S NOTE — letter block
   ============================================================ */
.founder-note{
  padding:4.5rem 0 5rem;
  border-bottom:1px solid var(--rule);
  background:var(--paper-2);
}
.note-inner{
  max-width:720px;
  margin:0 auto;
  padding:0 1.5rem;
}
.note-header{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  gap:1.5rem;
  flex-wrap:wrap;
  padding-bottom:1.25rem;
  margin-bottom:2rem;
  border-bottom:1px solid var(--rule-2);
}
.note-header .kicker{display:block}
.note-header .note-date{
  font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--muted);
}
.note-body p{
  font-family:var(--serif);
  font-size:1.12rem;
  line-height:1.75;
  color:var(--ink-2);
}
.note-body p + p{margin-top:1.35rem}
.note-body .salutation{font-style:italic;color:var(--ink-3);margin-bottom:1.25rem}
.note-signature{
  margin-top:2.5rem;
  padding-top:1.75rem;
  border-top:1px solid var(--rule-2);
  display:flex;
  align-items:center;
  gap:1.25rem;
}
.note-avatar{
  width:3.5rem;height:3.5rem;border-radius:50%;
  background:var(--paper);
  border:1px solid var(--rule-2);
  display:grid;place-items:center;
  font-family:var(--serif);
  font-size:1.15rem;
  font-style:italic;
  color:var(--accent);
  flex:none;
}
.note-sig-name{
  font-family:var(--serif);
  font-size:1.1rem;
  color:var(--ink);
  line-height:1.35;
}
.note-sig-role{
  font-size:.72rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-top:.25rem;
}

/* ============================================================
   ESSAY — narrative body
   ============================================================ */
.essay{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.essay-grid{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,2.1fr);
  gap:4rem;
  align-items:start;
}
.essay-aside{
  position:sticky;
  top:6rem;
}
.essay-aside .kicker.quiet{display:block;margin-bottom:1rem}
.essay-aside h3{
  font-size:1.05rem;
  line-height:1.4;
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
  margin-bottom:1.25rem;
}
.essay-aside ol{
  list-style:none;
  counter-reset:chap;
  display:flex;
  flex-direction:column;
  gap:0;
}
.essay-aside li{
  counter-increment:chap;
  font-size:.85rem;
  color:var(--ink-3);
  padding:.75rem 0;
  border-bottom:1px solid var(--rule);
  display:flex;
  gap:.85rem;
  align-items:baseline;
  line-height:1.5;
}
.essay-aside li:last-child{border-bottom:0}
.essay-aside li::before{
  content:counter(chap,upper-roman);
  font-family:var(--serif);
  font-style:italic;
  font-size:.85rem;
  color:var(--accent);
  flex:none;
  letter-spacing:.02em;
}

.essay-main{max-width:var(--measure)}
.essay-main h2{
  margin-bottom:1.5rem;
  max-width:24ch;
}
.essay-main h2 em{font-style:italic;color:var(--accent)}
.essay-main p{font-size:1.02rem}

/* Chapter separator */
.chapter-block{
  margin-top:4rem;
  padding-top:.25rem;
}
.chapter-block:first-of-type{margin-top:0;padding-top:0}

/* Pull quote */
.pull-quote{
  margin:2.75rem 0;
  padding:2rem 0;
  border-top:1px solid var(--rule-2);
  border-bottom:1px solid var(--rule-2);
  text-align:center;
}
.pull-quote p{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.55rem;
  line-height:1.4;
  letter-spacing:-.015em;
  color:var(--ink);
  max-width:34ch;
  margin:0 auto;
}
.pull-quote cite{
  display:block;
  font-family:var(--sans);
  font-style:normal;
  font-size:.72rem;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
  margin-top:1.35rem;
}

/* Sidenote */
.sidenote{
  margin:2rem 0;
  padding:1.25rem 1.5rem;
  background:var(--surface-2);
  border-left:3px solid var(--accent);
}
.sidenote .sidenote-label{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--accent);
  margin-bottom:.5rem;
}
.sidenote p{
  font-size:.92rem;
  color:var(--ink-3);
  line-height:1.65;
  font-family:var(--sans);
}

/* ============================================================
   MILESTONES — editorial timeline
   ============================================================ */
.milestones{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
  background:var(--paper-2);
}
.milestones-inner{max-width:820px;margin:0 auto}
.milestones-head{
  text-align:center;
  margin-bottom:3.5rem;
}
.milestones-head .kicker{display:block;margin-bottom:1rem}
.milestones-head h2{max-width:22ch;margin:0 auto}

.timeline{
  border-top:1px solid var(--rule-2);
}
.timeline-item{
  display:grid;
  grid-template-columns:6.5rem 1fr;
  gap:2.5rem;
  padding:2rem 0;
  border-bottom:1px solid var(--rule);
  align-items:baseline;
}
.timeline-item:last-child{border-bottom:0;padding-bottom:0}
.timeline-year{
  font-family:var(--serif);
  font-size:1.6rem;
  color:var(--ink);
  letter-spacing:-.02em;
  line-height:1;
}
.timeline-year.current{color:var(--accent)}
.timeline-year small{
  display:block;
  font-family:var(--sans);
  font-size:.65rem;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
  margin-top:.5rem;
}
.timeline-content h3{
  font-size:1.18rem;
  line-height:1.3;
  margin-bottom:.6rem;
  max-width:26ch;
}
.timeline-content p{
  font-size:.96rem;
  color:var(--ink-3);
  max-width:60ch;
}

/* ============================================================
   CONTRIBUTORS — masthead-style team
   ============================================================ */
.contributors{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.contributors-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  gap:2rem;
  margin-bottom:3rem;
  padding-bottom:1.5rem;
  border-bottom:1px solid var(--rule);
  flex-wrap:wrap;
}
.contributors-head h2{max-width:22ch}
.contributors-head .kicker.quiet{white-space:nowrap}

.contributors-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:3.5rem 4rem;
}
.contributor{
  display:flex;
  flex-direction:column;
  gap:1.25rem;
  padding-bottom:2rem;
  border-bottom:1px solid var(--rule);
}
.contributor:last-child{border-bottom:0;padding-bottom:0}

.contributor-portrait{
  width:5rem;height:5rem;
  border-radius:50%;
  background:var(--paper-2);
  border:1px solid var(--rule-2);
  display:grid;
  place-items:center;
  font-family:var(--serif);
  font-style:italic;
  font-size:1.6rem;
  color:var(--accent);
  letter-spacing:-.02em;
}

.contributor-name{
  font-family:var(--serif);
  font-size:1.5rem;
  line-height:1.2;
  letter-spacing:-.015em;
}
.contributor-role{
  font-family:var(--sans);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--accent);
  margin-top:.5rem;
  display:block;
}
.contributor-bio{
  font-size:.98rem;
  color:var(--ink-3);
  line-height:1.75;
}
.contributor-meta{
  display:flex;
  flex-wrap:wrap;
  gap:.35rem 1rem;
  font-family:var(--sans);
  font-size:.78rem;
  color:var(--muted);
  letter-spacing:.02em;
}
.contributor-meta span{
  display:inline-flex;
  align-items:center;
  gap:.5rem;
}
.contributor-meta span + span::before{
  content:"·";
  color:var(--muted-2);
}

/* ============================================================
   PRINCIPLES — editorial list
   ============================================================ */
.principles{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.principles-inner{max-width:820px;margin:0 auto}
.principles-head{
  text-align:center;
  margin-bottom:3.5rem;
}
.principles-head .kicker{display:block;margin-bottom:1rem}
.principles-head h2{max-width:24ch;margin:0 auto}

.principle{
  display:grid;
  grid-template-columns:auto 1fr;
  gap:2rem;
  padding:2.25rem 0;
  border-bottom:1px solid var(--rule);
  align-items:start;
}
.principle:first-of-type{border-top:1px solid var(--rule)}
.principle:last-child{border-bottom:0}
.principle-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:2rem;
  color:var(--accent);
  line-height:1;
  letter-spacing:-.02em;
  flex:none;
  min-width:2rem;
}
.principle-content h3{
  font-size:1.28rem;
  line-height:1.3;
  margin-bottom:.75rem;
  max-width:26ch;
}
.principle-content p{
  font-size:.98rem;
  color:var(--ink-3);
  max-width:60ch;
}

/* ============================================================
   SUBSCRIBE / CTA
   ============================================================ */
.subscribe{
  padding:5rem 0;
  background:var(--paper);
}
.subscribe-inner{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.subscribe-inner .kicker{display:block;margin-bottom:1.25rem}
.subscribe-inner h2{max-width:22ch;margin:0 auto 1.25rem}
.subscribe-inner p{
  font-size:1.02rem;
  color:var(--ink-3);
  max-width:56ch;
  margin:0 auto 2.5rem;
}
.subscribe-actions{
  display:flex;
  gap:2.5rem;
  justify-content:center;
  align-items:baseline;
  flex-wrap:wrap;
}
.subscribe-actions .link-lg{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent);
  border-bottom:1px solid var(--accent);
  padding-bottom:2px;
}
.subscribe-actions .link-lg:hover{color:var(--accent-2);border-bottom-color:var(--accent-2)}
.subscribe-actions .link-quiet{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-3);
  border-bottom:1px solid var(--rule-2);
  padding-bottom:2px;
}
.subscribe-actions .link-quiet:hover{color:var(--ink);border-bottom-color:var(--ink)}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{
  background:var(--paper);
  border-top:1px solid var(--rule);
  padding:4rem 0 2rem;
  margin-top:auto;
}
.footer-grid{
  display:grid;
  grid-template-columns:minmax(0,1.6fr) 1fr 1fr 1.3fr;
  gap:3rem;
  padding-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.footer-brand .masthead-name{font-size:1.5rem}
.footer-brand p{
  font-size:.88rem;color:var(--muted);
  margin-top:1.15rem;max-width:38ch;line-height:1.7;
}
.footer-col h4{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.65rem}
.footer-col a,.footer-col span{
  font-size:.88rem;color:var(--ink-3);line-height:1.6;
}
.footer-col a{border-bottom:1px solid transparent;transition:border-color .16s ease,color .16s ease}
.footer-col a:hover{color:var(--accent);border-bottom-color:rgba(139,58,46,.4)}
.footer-bottom{
  padding-top:1.75rem;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.78rem;color:var(--muted);letter-spacing:.02em;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .page-hero-inner{grid-template-columns:1fr;gap:2.5rem;align-items:start}
  .page-hero-right{border-left:0;padding-left:0;border-top:1px solid var(--rule);padding-top:2rem}
  .essay-grid{grid-template-columns:1fr;gap:2.5rem}
  .essay-aside{position:static}
  .essay-aside ol{display:grid;grid-template-columns:repeat(2,1fr);gap:0 2rem}
  .contributors-grid{grid-template-columns:1fr;gap:2.5rem}
  .footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem}
}

@media (max-width:900px){
  .nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--surface);border:1px solid var(--rule);border-top:0;padding:0}
  .nav a{padding:1rem 1.5rem;border-bottom:1px solid var(--rule);font-size:.82rem}
  .nav a:last-child{border-bottom:0}
  .burger{display:flex}
  .nav-toggle:checked ~ .nav-bar-inner .nav{display:flex}
}

@media (max-width:780px){
  .timeline-item{grid-template-columns:1fr;gap:.75rem;padding:1.75rem 0}
  .timeline-year{font-size:1.35rem}
  .timeline-year small{margin-top:.25rem}
  .principle{grid-template-columns:1fr;gap:.75rem;padding:1.75rem 0}
  .principle-num{font-size:1.65rem;min-width:0}
  .essay-aside ol{grid-template-columns:1fr}
  .pull-quote p{font-size:1.3rem}
}

@media (max-width:680px){
  .section{padding:3.5rem 0}
  .section-tight{padding:2.25rem 0}
  .header-top{display:none}
  .header-main{padding:1.25rem 0}
  .masthead-name{font-size:1.5rem}
  .header-contact{text-align:left;width:100%}
  .founder-note{padding:3rem 0 3.5rem}
  .note-body p{font-size:1.02rem}
  .contributors-head{flex-direction:column;gap:1rem;align-items:flex-start}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .footer-bottom{flex-direction:column;text-align:center}
}

@media (max-width:520px){
  body{font-size:16px}
  .container,.container-narrow,.container-wide{padding-inline:1.15rem}
  .page-hero h1{font-size:2rem}
  .chapter{flex-wrap:wrap}
  .subscribe-actions{flex-direction:column;gap:1.25rem}
  .essay-main h2{font-size:1.65rem}
}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">

  <div class="header-top">
    <div class="container header-top-inner">
      <span>Vol. XII <span class="dot"></span> Property Management &amp; Leasing</span>
      <span>City Center <span class="dot"></span> Est. 2012</span>
      <span>Issue No. 248 <span class="dot"></span> March 2025</span>
    </div>
  </div>

  <div class="header-main">
    <div class="container header-main-inner">
      <a href="/" class="masthead">
        <span class="masthead-name">Premier <em>Property</em> Management</span>
        <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
      </a>

      <div class="header-contact">
        <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a><br>
        <a href="tel:+15550123456">(555) 012-3456</a>
      </div>
    </div>
  </div>

  <div class="nav-bar">
    <div class="container nav-bar-inner">
      <input type="checkbox" id="nav-toggle" class="nav-toggle">
      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about" aria-current="page">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <a href="/c/contact" class="nav-cta">Book a Tour →</a>

      <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </label>
    </div>
  </div>

</header>

<main>

  <!-- ================= PAGE HERO ================= -->
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-inner">

        <div class="page-hero-left">
          <span class="kicker"><span class="dot"></span>About the Company <span style="margin-left:.6rem;color:var(--muted);letter-spacing:.14em">· Twelve Years in Print</span></span>

          <h1>We manage homes the way we would want our own managed.</h1>

          <p class="subhead">
            A narrative account of Premier Property Management — how it began with twelve units
            on a single block, and how it grew into a portfolio of 250+ homes across the metro,
            one building at a time.
          </p>
        </div>

        <aside class="page-hero-right">
          <span class="kicker quiet">The Record</span>
          <dl>
            <div>
              <dt>Founded</dt>
              <dd>2012 · Downtown Core</dd>
            </div>
            <div>
              <dt>Portfolio</dt>
              <dd>250+ residential units under active management</dd>
            </div>
            <div>
              <dt>Neighborhoods</dt>
              <dd>Downtown Core · Riverside District · Cedar Park · Northgate</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>Four partners, one office, no call center</dd>
            </div>
          </dl>
        </aside>

      </div>
    </div>
  </section>

  <!-- ================= FOUNDER'S NOTE ================= -->
  <section class="founder-note">
    <div class="note-inner">

      <div class="note-header">
        <span class="kicker">A Note from the Founder</span>
        <span class="note-date">City Center · March 2025</span>
      </div>

      <div class="note-body">
        <p class="salutation">To our residents, owners, and future tenants —</p>

        <p>
          When I signed the papers on our first building in 2012, I had one rule in mind. If a
          resident called about something broken, we would not ask them to explain it twice. It
          seems like a small thing, but it is the small things that separate a well-run building
          from a building that simply happens not to be on fire this week.
        </p>

        <p>
          Twelve years later, we manage more than 250 units across four neighborhoods, and that
          rule has not changed. Every resident has a named contact. Every repair has a written
          standard. Every renewal is negotiated in writing, with enough notice that nobody has to
          make a decision under pressure.
        </p>

        <p>
          We are not the cheapest property manager in the city, and we do not try to be. We are
          the one whose maintenance coordinator will pick up the phone at 2 a.m. and dispatch a
          plumber without asking permission from four levels of management first. That is the
          whole product.
        </p>

        <p>Thank you for reading. We are glad you are here.</p>
      </div>

      <div class="note-signature">
        <div class="note-avatar" aria-hidden="true">MD</div>
        <div>
          <div class="note-sig-name">Morgan Delacroix</div>
          <div class="note-sig-role">Founder &amp; Managing Director</div>
        </div>
      </div>

    </div>
  </section>

  <!-- ================= ESSAY — the story in chapters ================= -->
  <section class="essay">
    <div class="container">
      <div class="essay-grid">

        <!-- Aside — chapter index -->
        <aside class="essay-aside">
          <span class="kicker quiet">Contents</span>
          <h3>The story, in three chapters.</h3>
          <ol>
            <li>Twelve units and a written standard</li>
            <li>The portfolio grows, the rule stays</li>
            <li>What we mean by “well-managed” today</li>
          </ol>
        </aside>

        <!-- Main essay -->
        <div class="essay-main">

          <!-- Chapter I -->
          <div class="chapter-block">
            <div class="chapter">
              <span class="chapter-num">I.</span>
              <span class="chapter-label">Chapter One · 2012–2015</span>
            </div>

            <h2>Twelve units, one block, and a <em>single written rule</em>.</h2>

            <p class="dropcap">
              Premier Property Management opened its doors in the spring of 2012 with a single
              renovated walk-up on the eastern edge of the Downtown Core. Twelve units, one
              handyman, and a filing cabinet with a printed sheet inside that said, in bold,
              the first rule the company ever had: <em>no resident should have to explain the
              same problem twice.</em>
            </p>

            <p>
              That rule sounds simple, and it is, but it forced us to build systems early. Every
              repair request was written down the day it arrived. Every vendor was given a target
              response window in the contract. Every resident received a written confirmation when
              a job was scheduled, and a written summary when it was closed. Not because anyone
              asked for that, but because the rule did not work any other way.
            </p>

            <p>
              The first two years were slow. We took on one building at a time, mostly through
              word of mouth from owners who had heard we actually answered the phone. By 2014 we
              were managing thirty-six units — three buildings, all within a fifteen-minute walk
              of the original one. It was not scale, but it was a standard, and the standard was
              the point.
            </p>

            <blockquote class="pull-quote">
              <p>“We were not trying to grow quickly. We were trying to write down what good management actually looks like — and then refuse to break it.”</p>
              <cite>Morgan Delacroix, on the first three years</cite>
            </blockquote>

            <p>
              By 2015 the portfolio had reached seventy-five units across three neighborhoods, and
              the filing cabinet had been replaced by a real system. We built our first online
              tenant portal that year — not because it was fashionable, but because it was the
              only way to keep the rule intact as we grew. When a resident files a request through
              the portal now, it is time-stamped in the same second it arrives, and the
              coordinator assigned to it sees their name attached to it before they have finished
              reading the first sentence.
            </p>

            <div class="sidenote">
              <div class="sidenote-label">A note on the filing cabinet</div>
              <p>
                The original cabinet still sits in the office on Harrison Avenue. It holds the
                written standards for the twelve units of the first building, hand-typed in 2012,
                as a reminder of where the standard came from.
              </p>
            </div>
          </div>

          <!-- Chapter II -->
          <div class="chapter-block">
            <div class="chapter">
              <span class="chapter-num">II.</span>
              <span class="chapter-label">Chapter Two · 2015–2022</span>
            </div>

            <h2>The portfolio grew. The <em>rule</em> stayed the same.</h2>

            <p>
              Between 2015 and 2022 the portfolio crossed 150 units, then 200, then 250. We
              added mixed-use buildings in the Riverside District, townhomes in Cedar Park, and a
              second office in Northgate. We brought on our first in-house maintenance crew so
              that routine work did not have to wait on a vendor schedule. We launched a 24/7
              emergency line, staffed by a human being rather than an automated menu, because
              that was the only version of the rule that made sense at three in the morning.
            </p>

            <p>
              What did not change was the underlying commitment. New buildings were inspected
              against the same written standard as the first walk-up. New hires were trained on
              the same principle: you do not escalate a resident problem up the chain — you solve
              it, or you hand it to someone who can, and either way the resident hears back the
              same day.
            </p>

            <blockquote class="pull-quote">
              <p>“Growth is easy to perform. Consistency is the thing you actually have to earn.”</p>
              <cite>Leah Chen, Lead Leasing Agent</cite>
            </blockquote>

            <p>
              That period is also when we started measuring ourselves publicly. Response times
              became a number we published, not a promise we made. Renewal rates, inspection
              completion rates, and the average age of our maintenance requests all became part
              of the quarterly report we send to property owners. Not because anyone demanded it,
              but because once you write something down, you have to live up to it.
            </p>
          </div>

          <!-- Chapter III -->
          <div class="chapter-block">
            <div class="chapter">
              <span class="chapter-num">III.</span>
              <span class="chapter-label">Chapter Three · 2022–Present</span>
            </div>

            <h2>What “well-managed” means <em>today</em>.</h2>

            <p>
              Today Premier Property Management looks after more than 250 residential units across
              four neighborhoods. We are still small enough that every resident can name their
              coordinator, and still disciplined enough that every building runs on a preventive
              maintenance calendar rather than an emergency one.
            </p>

            <p>
              The rule from 2012 still appears, nearly word for word, at the top of our internal
              operations manual. It has survived three office moves, two leadership transitions,
              and roughly eleven thousand maintenance requests. It will keep surviving, because it
              is the one thing that has never needed updating.
            </p>

            <p>
              If you are thinking about renting with us, we would be glad to show you a unit. If
              you own a building and are thinking about a management partner, we would be glad to
              walk you through the standard we hold ourselves to. Either way, the door is open,
              and the phone gets answered.
            </p>

            <blockquote class="pull-quote">
              <p>“Every building we manage is somebody's home. The rest is just logistics.”</p>
              <cite>Sofia Ramirez, Tenant Relations Manager</cite>
            </blockquote>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- ================= MILESTONES ================= -->
  <section class="milestones">
    <div class="container">
      <div class="milestones-inner">

        <div class="milestones-head">
          <span class="kicker">The Milestones</span>
          <h2>A quiet chronology of twelve years.</h2>
        </div>

        <div class="timeline">

          <div class="timeline-item">
            <div class="timeline-year">
              2012
              <small>Spring</small>
            </div>
            <div class="timeline-content">
              <h3>Company founded with twelve units on a single block.</h3>
              <p>
                First walk-up opens in the Downtown Core. First written maintenance standard
                typed by hand and filed in a metal cabinet that still sits in the office today.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">
              2015
              <small>Autumn</small>
            </div>
            <div class="timeline-content">
              <h3>Seventy-five units and the first online tenant portal.</h3>
              <p>
                Portfolio reaches seventy-five units across three neighborhoods. Online rent
                payment and maintenance requests replace paper notices entirely, and response
                times fall by half within the first quarter.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">
              2018
              <small>Summer</small>
            </div>
            <div class="timeline-content">
              <h3>Corporate leasing and the first mixed-use buildings.</h3>
              <p>
                Expanded into corporate relocation leases and mixed-use properties, surpassing
                150 units under management. Hired our first dedicated tenant relations lead to
                keep the standard intact as the portfolio grew.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">
              2022
              <small>Winter</small>
            </div>
            <div class="timeline-content">
              <h3>250+ units and the 24/7 emergency line.</h3>
              <p>
                Crossed 250 managed units, opened a second office in Northgate, and launched
                round-the-clock emergency dispatch — staffed by a human responder rather than an
                automated menu, every hour of the year.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year current">
              2025
              <small>Current Issue</small>
            </div>
            <div class="timeline-content">
              <h3>Smart access and the preventive upkeep program.</h3>
              <p>
                Rolling out smart locks and energy monitoring across premium managed units, and
                completing the first full preventive maintenance cycle for every building in the
                portfolio. Quarterly inspections now run on a published calendar.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- ================= CONTRIBUTORS ================= -->
  <section class="contributors">
    <div class="container">

      <div class="contributors-head">
        <h2>The masthead — the four people who run the standard.</h2>
        <span class="kicker quiet">Contributing Editors &amp; Staff</span>
      </div>

      <div class="contributors-grid">

        <article class="contributor">
          <div class="contributor-portrait" aria-hidden="true">MD</div>
          <div>
            <div class="contributor-name">Morgan Delacroix</div>
            <span class="contributor-role">Founder &amp; Managing Director</span>
          </div>
          <p class="contributor-bio">
            Founded PremierPM in 2012 and still signs off on every owner statement before it goes
            out. Morgan oversees portfolio strategy, building acquisitions, and the long-term
            capital plan for every property under management. He is the author of the original
            written standard, and the person most likely to be found re-reading it.
          </p>
          <div class="contributor-meta">
            <span>18 years in property management</span>
            <span>Licensed broker</span>
            <span>Downtown Core resident</span>
          </div>
        </article>

        <article class="contributor">
          <div class="contributor-portrait" aria-hidden="true">LC</div>
          <div>
            <div class="contributor-name">Leah Chen</div>
            <span class="contributor-role">Lead Leasing Agent</span>
          </div>
          <p class="contributor-bio">
            Runs showings and applications for every available unit. Twelve years in residential
            leasing and fair-housing compliance, and the person who trains every new agent on the
            company's rental criteria. If you are applying for a home with us, Leah is the one who
            reviews your file.
          </p>
          <div class="contributor-meta">
            <span>12 years leasing</span>
            <span>Fair-housing certified</span>
          </div>
        </article>

        <article class="contributor">
          <div class="contributor-portrait" aria-hidden="true">JO</div>
          <div>
            <div class="contributor-name">James Okafor</div>
            <span class="contributor-role">Head of Maintenance</span>
          </div>
          <p class="contributor-bio">
            Manages the in-house maintenance crew and the vendor network that supports it. James
            owns the 24/7 emergency dispatch schedule personally, and he has the authority to
            authorize emergency repairs without asking anyone's permission first. That authority
            is by design.
          </p>
          <div class="contributor-meta">
            <span>15 years in facilities</span>
            <span>EPA certified</span>
          </div>
        </article>

        <article class="contributor">
          <div class="contributor-portrait" aria-hidden="true">SR</div>
          <div>
            <div class="contributor-name">Sofia Ramirez</div>
            <span class="contributor-role">Tenant Relations Manager</span>
          </div>
          <p class="contributor-bio">
            Handles move-in coordination, lease renewals, and resident concerns. Sofia is your
            first call when something needs resolving — and the person who makes sure it actually
            gets resolved. She also runs the resident appreciation events and the quarterly
            neighborhood cleanups.
          </p>
          <div class="contributor-meta">
            <span>9 years in resident services</span>
            <span>Bilingual: English / Spanish</span>
            <span>Cedar Park resident</span>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ================= PRINCIPLES ================= -->
  <section class="principles">
    <div class="container">
      <div class="principles-inner">

        <div class="principles-head">
          <span class="kicker">Operating Principles</span>
          <h2>Three commitments we do not renegotiate.</h2>
        </div>

        <div class="principle">
          <div class="principle-num">i.</div>
          <div class="principle-content">
            <h3>Documented, never improvised.</h3>
            <p>
              Inspections, repairs, and renewals follow a written standard that every resident and
              owner can see. Nothing happens on a handshake, and nothing happens off the record.
              If we say we will respond in four hours, there is a policy — and a coordinator —
              that makes the four hours real.
            </p>
          </div>
        </div>

        <div class="principle">
          <div class="principle-num">ii.</div>
          <div class="principle-content">
            <h3>Residents are people, not tickets.</h3>
            <p>
              We answer the phone, explain the charges, and schedule around your life. Fair
              housing and respectful communication are baseline requirements of every role in the
              company — not additional training, and not a service tier. The person who fixes
              your heat is the same kind of person who tells you when they are coming.
            </p>
          </div>
        </div>

        <div class="principle">
          <div class="principle-num">iii.</div>
          <div class="principle-content">
            <h3>Preventive, not reactive.</h3>
            <p>
              Scheduled upkeep costs less than emergency repairs. We invest in roofs, boilers, and
              window seals before they become somebody's 2 a.m. problem. Every building in the
              portfolio now runs on a preventive maintenance calendar — and every resident can see
              what is scheduled for their building, and when.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= SUBSCRIBE / CTA ================= -->
  <section class="subscribe">
    <div class="container-narrow">
      <div class="subscribe-inner">
        <span class="kicker">Take the Next Step</span>
        <h2>Come see a unit. Or come read the standard.</h2>
        <p>
          Tours run seven days a week, including evenings. If you own a building and want to see
          the operating manual before you decide on a management partner, we are happy to send it
          over first.
        </p>

        <div class="subscribe-actions">
          <a href="/c/contact" class="link-lg">Book a Tour →</a>
          <a href="/" class="link-quiet">Browse Available Units</a>
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
        <a href="/" class="masthead">
          <span class="masthead-name">Premier <em>Property</em> Management</span>
          <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
        </a>
        <p>
          Property management and leasing for the modern city. We look after more than 250
          residential units with the same attention to detail you would want in your own home.
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

export const style3Contact = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contact · Premier Property Management</title>
<meta name="description" content="Reach the Premier Property Management leasing office. Direct email, phone, physical address, operating hours, and 24/7 emergency maintenance line.">
<style>
/* ============================================================
   DESIGN TOKENS — Editorial / Content-First (Editorial Minimal)
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#1c1917;
  --ink-2:#3f3a35;
  --ink-3:#57534e;
  --muted:#78716c;
  --muted-2:#a8a29e;

  --paper:#faf7f2;
  --paper-2:#f5f0e8;
  --surface:#ffffff;
  --surface-2:#fdfbf7;

  --rule:#e7e0d5;
  --rule-2:#d8cfbf;
  --rule-3:#c4b8a3;

  --accent:#8b3a2e;
  --accent-2:#6b2c1f;
  --accent-soft:rgba(139,58,46,.08);

  --serif:Georgia,'Iowan Old Style','Palatino Linotype','Book Antiqua',Palatino,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;

  --max:1180px;
  --measure:64ch;
  --header-h:4.5rem;
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6rem}

body{
  font-family:var(--sans);
  background:var(--paper);
  color:var(--ink);
  line-height:1.7;
  font-size:17px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none;transition:color .16s ease}
button,input,select,textarea{font:inherit;color:inherit}
ul{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{
  font-family:var(--serif);
  font-weight:400;
  letter-spacing:-.015em;
  line-height:1.18;
  color:var(--ink);
}
h1{font-size:clamp(2.35rem,5vw,4.1rem);letter-spacing:-.025em;line-height:1.06}
h2{font-size:clamp(1.65rem,3vw,2.35rem);letter-spacing:-.02em;line-height:1.2}
h3{font-size:1.35rem;line-height:1.3}
h4{font-size:1.05rem;line-height:1.35}

p{color:var(--ink-2);line-height:1.78}
p + p{margin-top:1.15rem}

.kicker{
  font-family:var(--sans);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--accent);
}
.kicker.quiet{color:var(--muted)}

.link{
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.link:hover{color:var(--accent-2);border-bottom-color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:760px;margin-inline:auto;padding-inline:1.5rem}

.section{padding:5rem 0}
.section-tight{padding:3rem 0}

.rule{height:1px;background:var(--rule);border:0}

.section-head{margin-bottom:2.75rem}
.section-head .kicker{display:block;margin-bottom:1rem}
.section-head.center{text-align:center;margin-inline:auto;max-width:720px}
.section-head.center h2{margin-inline:auto}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  background:var(--paper);
  border-bottom:1px solid var(--rule);
  position:relative;
  z-index:40;
}
.header-top{
  border-bottom:1px solid var(--rule);
  padding:.55rem 0;
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}
.header-top-inner{
  display:flex;justify-content:space-between;align-items:center;
  gap:1.5rem;flex-wrap:wrap;
}
.header-top-inner span{white-space:nowrap}
.header-top-inner .dot{
  display:inline-block;width:.28rem;height:.28rem;
  background:var(--accent);border-radius:50%;
  margin:0 .55rem;vertical-align:middle;transform:translateY(-1px);
}

.header-main{padding:1.5rem 0 1.25rem;border-bottom:1px solid var(--rule)}
.header-main-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:2rem;flex-wrap:wrap;
}
.masthead{display:flex;flex-direction:column;align-items:flex-start;gap:.15rem}
.masthead-name{
  font-family:var(--serif);font-size:1.85rem;
  letter-spacing:-.03em;line-height:1;color:var(--ink);
}
.masthead-name em{font-style:italic;color:var(--accent)}
.masthead-tag{
  font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);margin-top:.35rem;
}
.header-contact{
  font-size:.82rem;color:var(--ink-2);text-align:right;line-height:1.65;
}
.header-contact a{border-bottom:1px solid var(--rule-2);padding-bottom:1px}
.header-contact a:hover{border-bottom-color:var(--accent);color:var(--accent)}

.nav-bar{
  border-bottom:1px solid var(--rule);
  background:var(--paper);
  position:sticky;top:0;z-index:50;
}
.nav-bar-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:1.5rem;padding:.85rem 0;
}
.nav{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
.nav a{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--ink-3);
  padding:.25rem 0;border-bottom:1px solid transparent;
  transition:color .16s ease,border-color .16s ease;
}
.nav a:hover{color:var(--ink);border-bottom-color:var(--ink)}
.nav a[aria-current="page"]{color:var(--accent);border-bottom-color:var(--accent)}
.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;
  border:1px solid var(--rule-2);background:var(--surface);
  cursor:pointer;align-items:center;justify-content:center;
  flex-direction:column;gap:4px;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink)}
.nav-cta{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);
  padding:.25rem 0;border-bottom:1px solid var(--accent);
  white-space:nowrap;
}
.nav-cta:hover{color:var(--accent-2)}

/* ============================================================
   PAGE HERO — editorial cover
   ============================================================ */
.page-hero{
  padding:4rem 0 3.5rem;
  border-bottom:1px solid var(--rule);
}
.page-hero-inner{
  display:grid;
  grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);
  gap:4rem;
  align-items:end;
}
.page-hero-left .kicker{display:block;margin-bottom:1.5rem}
.page-hero-left .kicker .dot{
  display:inline-block;width:.35rem;height:.35rem;
  background:var(--accent);border-radius:50%;
  margin-right:.6rem;vertical-align:middle;transform:translateY(-2px);
}
.page-hero h1{max-width:15ch;margin-bottom:1.5rem}
.page-hero .subhead{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.28rem;
  line-height:1.5;
  color:var(--ink-3);
  max-width:44ch;
}

.page-hero-right{
  border-left:1px solid var(--rule);
  padding-left:2.5rem;
}
.page-hero-right .kicker.quiet{display:block;margin-bottom:1.25rem}
.page-hero-right dl{display:flex;flex-direction:column;gap:1rem}
.page-hero-right dt{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:.25rem;
}
.page-hero-right dd{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.45;
}
.page-hero-right dd a{
  border-bottom:1px solid var(--rule-2);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.page-hero-right dd a:hover{color:var(--accent);border-bottom-color:var(--accent)}

/* ============================================================
   DIRECTORY — the main contact grid
   ============================================================ */
.directory{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}

.directory-head{
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  gap:2rem;
  margin-bottom:3rem;
  padding-bottom:1.5rem;
  border-bottom:1px solid var(--rule);
  flex-wrap:wrap;
}
.directory-head h2{max-width:22ch}
.directory-head .kicker.quiet{white-space:nowrap}

.directory-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  border-top:1px solid var(--rule);
  border-left:1px solid var(--rule);
}

.dir-cell{
  border-right:1px solid var(--rule);
  border-bottom:1px solid var(--rule);
  padding:2.25rem 1.85rem 2.25rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  background:var(--paper);
  transition:background .18s ease;
  min-height:230px;
}
.dir-cell:hover{background:var(--surface-2)}

.dir-label{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
}
.dir-title{
  font-family:var(--serif);
  font-size:1.28rem;
  line-height:1.25;
  letter-spacing:-.015em;
  color:var(--ink);
}
.dir-value{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.5;
  margin-top:auto;
}
.dir-value a{
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.dir-value a:hover{color:var(--accent);border-bottom-color:var(--accent)}
.dir-note{
  font-size:.86rem;
  color:var(--muted);
  line-height:1.6;
  margin-top:.85rem;
  padding-top:.85rem;
  border-top:1px solid var(--rule);
}

/* Emergency cell — subtly distinguished */
.dir-cell.emergency{
  background:var(--ink);
  color:var(--paper);
  border-right-color:var(--ink);
  border-bottom-color:var(--ink);
}
.dir-cell.emergency:hover{background:#2a2523}
.dir-cell.emergency .dir-label{color:var(--rule-3)}
.dir-cell.emergency .dir-title{color:#fff}
.dir-cell.emergency .dir-value{color:#fff}
.dir-cell.emergency .dir-value a{
  color:#fff;
  border-bottom-color:rgba(255,255,255,.35);
}
.dir-cell.emergency .dir-value a:hover{color:#fff;border-bottom-color:#fff}
.dir-cell.emergency .dir-note{
  color:var(--muted-2);
  border-top-color:rgba(255,255,255,.12);
}
.dir-cell.emergency .dir-marker{
  display:inline-block;
  font-size:.68rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--accent);
  margin-bottom:.25rem;
}

/* ============================================================
   OFFICE HOURS — clean table
   ============================================================ */
.hours-section{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
  background:var(--paper-2);
}
.hours-inner{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);
  gap:4rem;
  align-items:start;
}
.hours-intro .kicker{display:block;margin-bottom:1rem}
.hours-intro h2{max-width:18ch;margin-bottom:1rem}
.hours-intro p{font-size:1rem;color:var(--ink-3);max-width:42ch}

.hours-table{
  border-top:1px solid var(--rule-2);
}
.hours-row{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);
  gap:2rem;
  padding:1.15rem 0;
  border-bottom:1px solid var(--rule);
  align-items:baseline;
}
.hours-row:last-child{border-bottom:0}
.hours-day{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.4;
}
.hours-time{
  font-family:var(--sans);
  font-size:.9rem;
  color:var(--ink-3);
  letter-spacing:.02em;
  line-height:1.5;
}
.hours-time em{
  font-style:normal;
  color:var(--muted);
  font-size:.8rem;
  letter-spacing:.1em;
  text-transform:uppercase;
  display:block;
  margin-top:.2rem;
}

/* ============================================================
   TEAM DIRECTORY — who to reach for what
   ============================================================ */
.team-section{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.team-head{
  text-align:center;
  margin-bottom:3.5rem;
}
.team-head .kicker{display:block;margin-bottom:1rem}
.team-head h2{max-width:22ch;margin:0 auto 1rem}
.team-head p{max-width:56ch;margin:0 auto;font-size:1rem;color:var(--ink-3)}

.team-list{
  max-width:900px;
  margin:0 auto;
  border-top:1px solid var(--rule);
}
.team-row{
  display:grid;
  grid-template-columns:5rem 1fr auto;
  gap:2rem;
  padding:1.75rem 0;
  border-bottom:1px solid var(--rule);
  align-items:center;
}
.team-row:last-child{border-bottom:0}

.team-portrait{
  width:3.75rem;height:3.75rem;
  border-radius:50%;
  background:var(--paper-2);
  border:1px solid var(--rule-2);
  display:grid;
  place-items:center;
  font-family:var(--serif);
  font-style:italic;
  font-size:1.25rem;
  color:var(--accent);
}

.team-name{
  font-family:var(--serif);
  font-size:1.15rem;
  line-height:1.25;
  color:var(--ink);
}
.team-scope{
  font-size:.78rem;
  font-weight:600;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
  margin-top:.35rem;
}
.team-contact{
  font-family:var(--sans);
  font-size:.88rem;
  color:var(--ink-3);
  text-align:right;
  line-height:1.6;
}
.team-contact a{
  border-bottom:1px solid var(--rule-2);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.team-contact a:hover{color:var(--accent);border-bottom-color:var(--accent)}
.team-contact span{display:block;font-size:.76rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;margin-top:.2rem}

/* ============================================================
   OFFICE VISIT — a short editorial note
   ============================================================ */
.office-note{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
}
.office-grid{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);
  gap:4rem;
  align-items:start;
}
.office-label .kicker{display:block;margin-bottom:1rem}
.office-label h2{max-width:18ch}
.office-body p{
  font-size:1.02rem;
  color:var(--ink-2);
}
.office-body ul{
  margin-top:1.5rem;
  padding-top:1.5rem;
  border-top:1px solid var(--rule);
  display:flex;
  flex-direction:column;
  gap:.85rem;
}
.office-body li{
  display:flex;
  gap:.85rem;
  align-items:baseline;
  font-size:.96rem;
  color:var(--ink-3);
  line-height:1.6;
}
.office-body li::before{
  content:"—";
  color:var(--accent);
  flex:none;
}

/* ============================================================
   MESSAGE FORM — quiet, secondary
   ============================================================ */
.message{
  padding:5rem 0;
  border-bottom:1px solid var(--rule);
  background:var(--paper-2);
}
.message-inner{
  max-width:720px;
  margin:0 auto;
  padding:0 1.5rem;
}
.message-head{
  text-align:center;
  margin-bottom:3rem;
}
.message-head .kicker{display:block;margin-bottom:1.15rem}
.message-head h2{max-width:22ch;margin:0 auto 1.15rem}
.message-head p{
  font-size:1rem;
  color:var(--ink-3);
  max-width:52ch;
  margin:0 auto;
}

.form-field{
  display:grid;
  grid-template-columns:11rem 1fr;
  gap:1.5rem;
  align-items:baseline;
  padding:1.15rem 0;
  border-bottom:1px solid var(--rule);
}
.form-field:first-of-type{border-top:1px solid var(--rule-2)}
.form-field label{
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.15em;
  text-transform:uppercase;
  color:var(--muted);
}
.form-field input,
.form-field select,
.form-field textarea{
  width:100%;
  padding:.55rem 0;
  border:0;
  border-bottom:1px solid transparent;
  background:transparent;
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  transition:border-color .16s ease;
}
.form-field input::placeholder,
.form-field textarea::placeholder{
  color:var(--muted-2);
  font-style:italic;
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus{
  outline:none;
  border-bottom-color:var(--accent);
}
.form-field select{
  appearance:none;
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right .25rem center;
  padding-right:1.5rem;
  cursor:pointer;
}
.form-field textarea{
  resize:vertical;
  min-height:100px;
  line-height:1.65;
  font-family:var(--serif);
}

.form-actions{
  margin-top:2.25rem;
  padding-top:1.75rem;
  border-top:1px solid var(--rule-2);
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:1.5rem;
  flex-wrap:wrap;
}
.form-note{
  font-size:.82rem;
  color:var(--muted);
  line-height:1.6;
  max-width:34ch;
  letter-spacing:.02em;
}
.form-submit{
  font-family:var(--sans);
  font-size:.82rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--paper);
  background:var(--ink);
  border:0;
  padding:1.05rem 1.85rem;
  cursor:pointer;
  transition:background .18s ease;
}
.form-submit:hover{background:var(--accent)}

/* ============================================================
   SUBSCRIBE / CTA
   ============================================================ */
.subscribe{
  padding:5rem 0;
  background:var(--paper);
}
.subscribe-inner{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.subscribe-inner .kicker{display:block;margin-bottom:1.25rem}
.subscribe-inner h2{max-width:22ch;margin:0 auto 1.25rem}
.subscribe-inner p{
  font-size:1.02rem;
  color:var(--ink-3);
  max-width:56ch;
  margin:0 auto 2.5rem;
}
.subscribe-actions{
  display:flex;
  gap:2.5rem;
  justify-content:center;
  align-items:baseline;
  flex-wrap:wrap;
}
.subscribe-actions .link-lg{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent);
  border-bottom:1px solid var(--accent);
  padding-bottom:2px;
}
.subscribe-actions .link-lg:hover{color:var(--accent-2);border-bottom-color:var(--accent-2)}
.subscribe-actions .link-quiet{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-3);
  border-bottom:1px solid var(--rule-2);
  padding-bottom:2px;
}
.subscribe-actions .link-quiet:hover{color:var(--ink);border-bottom-color:var(--ink)}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{
  background:var(--paper);
  border-top:1px solid var(--rule);
  padding:4rem 0 2rem;
  margin-top:auto;
}
.footer-grid{
  display:grid;
  grid-template-columns:minmax(0,1.6fr) 1fr 1fr 1.3fr;
  gap:3rem;
  padding-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.footer-brand .masthead-name{font-size:1.5rem}
.footer-brand p{
  font-size:.88rem;color:var(--muted);
  margin-top:1.15rem;max-width:38ch;line-height:1.7;
}
.footer-col h4{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.65rem}
.footer-col a,.footer-col span{
  font-size:.88rem;color:var(--ink-3);line-height:1.6;
}
.footer-col a{border-bottom:1px solid transparent;transition:border-color .16s ease,color .16s ease}
.footer-col a:hover{color:var(--accent);border-bottom-color:rgba(139,58,46,.4)}
.footer-bottom{
  padding-top:1.75rem;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.78rem;color:var(--muted);letter-spacing:.02em;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .page-hero-inner{grid-template-columns:1fr;gap:2.5rem;align-items:start}
  .page-hero-right{border-left:0;padding-left:0;border-top:1px solid var(--rule);padding-top:2rem}
  .directory-grid{grid-template-columns:repeat(2,1fr)}
  .hours-inner{grid-template-columns:1fr;gap:2.5rem}
  .office-grid{grid-template-columns:1fr;gap:2.5rem}
  .footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem}
}

@media (max-width:900px){
  .nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--surface);border:1px solid var(--rule);border-top:0;padding:0}
  .nav a{padding:1rem 1.5rem;border-bottom:1px solid var(--rule);font-size:.82rem}
  .nav a:last-child{border-bottom:0}
  .burger{display:flex}
  .nav-toggle:checked ~ .nav-bar-inner .nav{display:flex}
}

@media (max-width:780px){
  .directory-grid{grid-template-columns:1fr}
  .team-row{grid-template-columns:4rem 1fr;gap:1.25rem;padding:1.5rem 0}
  .team-contact{grid-column:2;text-align:left;margin-top:.5rem;font-size:.85rem}
  .form-field{grid-template-columns:1fr;gap:.35rem;padding:1rem 0}
  .hours-row{grid-template-columns:1fr;gap:.35rem;padding:1rem 0}
  .hours-time em{display:inline;margin-left:.5rem}
}

@media (max-width:680px){
  .section{padding:3.5rem 0}
  .section-tight{padding:2.25rem 0}
  .header-top{display:none}
  .header-main{padding:1.25rem 0}
  .masthead-name{font-size:1.5rem}
  .header-contact{text-align:left;width:100%}
  .directory-head{flex-direction:column;gap:1rem;align-items:flex-start}
  .form-actions{flex-direction:column;align-items:stretch;gap:1.25rem}
  .form-note{max-width:none;text-align:center}
  .form-submit{width:100%;text-align:center}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .footer-bottom{flex-direction:column;text-align:center}
}

@media (max-width:520px){
  body{font-size:16px}
  .container,.container-narrow{padding-inline:1.15rem}
  .page-hero h1{font-size:2rem}
  .subscribe-actions{flex-direction:column;gap:1.25rem}
  .team-portrait{width:3.25rem;height:3.25rem;font-size:1.1rem}
}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">

  <div class="header-top">
    <div class="container header-top-inner">
      <span>Vol. XII <span class="dot"></span> Property Management &amp; Leasing</span>
      <span>City Center <span class="dot"></span> Est. 2012</span>
      <span>Issue No. 248 <span class="dot"></span> March 2025</span>
    </div>
  </div>

  <div class="header-main">
    <div class="container header-main-inner">
      <a href="/" class="masthead">
        <span class="masthead-name">Premier <em>Property</em> Management</span>
        <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
      </a>

      <div class="header-contact">
        <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a><br>
        <a href="tel:+15550123456">(555) 012-3456</a>
      </div>
    </div>
  </div>

  <div class="nav-bar">
    <div class="container nav-bar-inner">
      <input type="checkbox" id="nav-toggle" class="nav-toggle">
      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact" aria-current="page">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <a href="#message" class="nav-cta">Send a Message →</a>

      <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </label>
    </div>
  </div>

</header>

<main>

  <!-- ================= PAGE HERO ================= -->
  <section class="page-hero">
    <div class="container">
      <div class="page-hero-inner">

        <div class="page-hero-left">
          <span class="kicker"><span class="dot"></span>Contact the Office <span style="margin-left:.6rem;color:var(--muted);letter-spacing:.14em">· Open Mon–Sat</span></span>

          <h1>Every way to reach us, written plainly.</h1>

          <p class="subhead">
            We do not hide behind a form. Email and phone reach a real person, in the office,
            during business hours. Emergencies reach someone at any hour of the day.
          </p>
        </div>

        <aside class="page-hero-right">
          <span class="kicker quiet">At a Glance</span>
          <dl>
            <div>
              <dt>Office</dt>
              <dd>450 Harrison Avenue, Suite 12 · City Center</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href="tel:+15550123456">(555) 012-3456</a></dd>
            </div>
            <div>
              <dt>Emergency</dt>
              <dd><a href="tel:+15550123456">Same number, 24 hours</a></dd>
            </div>
          </dl>
        </aside>

      </div>
    </div>
  </section>

  <!-- ================= DIRECTORY ================= -->
  <section class="directory">
    <div class="container">

      <div class="directory-head">
        <h2>A directory of ways to reach us.</h2>
        <span class="kicker quiet">Six Entries · Updated March 2025</span>
      </div>

      <div class="directory-grid">

        <!-- Leasing office -->
        <div class="dir-cell">
          <span class="dir-label">The Office</span>
          <div class="dir-title">Leasing office &amp; walk-in reception</div>
          <div class="dir-value">
            450 Harrison Avenue, Suite 12<br>
            City Center, ST 10024
          </div>
          <p class="dir-note">
            Two doors south of the corner café. Visitor parking in the rear lot, entrance on
            5th Street. Step-free access at the main entrance.
          </p>
        </div>

        <!-- Leasing email -->
        <div class="dir-cell">
          <span class="dir-label">For Leasing Enquiries</span>
          <div class="dir-title">Applications, showings, and lease questions</div>
          <div class="dir-value">
            <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a>
          </div>
          <p class="dir-note">
            Reach Leah Chen and the leasing team. Reply within one business day, usually the same
            morning.
          </p>
        </div>

        <!-- Support email -->
        <div class="dir-cell">
          <span class="dir-label">For Residents</span>
          <div class="dir-title">Billing, portal access, and account support</div>
          <div class="dir-value">
            <a href="mailto:support@premierpm.example">support@premierpm.example</a>
          </div>
          <p class="dir-note">
            Handled by Sofia Ramirez. For anything to do with rent, statements, or the tenant
            portal.
          </p>
        </div>

        <!-- Office phone -->
        <div class="dir-cell">
          <span class="dir-label">Office Telephone</span>
          <div class="dir-title">Speak to someone directly during business hours</div>
          <div class="dir-value">
            <a href="tel:+15550123456">(555) 012-3456</a>
          </div>
          <p class="dir-note">
            Mon–Fri, 9:00 to 18:00. Saturdays, 10:00 to 16:00. Answered by a person, not a menu.
          </p>
        </div>

        <!-- Corporate email -->
        <div class="dir-cell">
          <span class="dir-label">Corporate &amp; Owners</span>
          <div class="dir-title">Portfolios, relocations, and management enquiries</div>
          <div class="dir-value">
            <a href="mailto:corporate@premierpm.example">corporate@premierpm.example</a>
          </div>
          <p class="dir-note">
            Multi-unit portfolios, executive leases, and long-term management agreements. Handled
            by Morgan Delacroix.
          </p>
        </div>

        <!-- Emergency — dark cell -->
        <div class="dir-cell emergency">
          <span class="dir-marker">24 / 7 · Emergency</span>
          <div class="dir-title">Active leaks, loss of heat, lockouts, safety issues</div>
          <div class="dir-value">
            <a href="tel:+15550123456">(555) 012-3456</a>
          </div>
          <p class="dir-note">
            Call this number at any hour. A human responder — not a voicemail — answers every call
            and has authority to dispatch a technician immediately.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= OFFICE HOURS ================= -->
  <section class="hours-section">
    <div class="container">
      <div class="hours-inner">

        <div class="hours-intro">
          <span class="kicker">Operating Hours</span>
          <h2>When the office is open, and when it is not.</h2>
          <p>
            Showings run outside office hours by appointment. The emergency line never closes.
            Everything else follows the schedule on the right.
          </p>
        </div>

        <div class="hours-table">
          <div class="hours-row">
            <div class="hours-day">Monday to Friday</div>
            <div class="hours-time">
              9:00 AM – 6:00 PM
              <em>Full leasing &amp; support staff available</em>
            </div>
          </div>
          <div class="hours-row">
            <div class="hours-day">Saturday</div>
            <div class="hours-time">
              10:00 AM – 4:00 PM
              <em>Leasing team on site, support by email</em>
            </div>
          </div>
          <div class="hours-row">
            <div class="hours-day">Sunday</div>
            <div class="hours-time">
              By appointment only
              <em>Showings can be scheduled in advance</em>
            </div>
          </div>
          <div class="hours-row">
            <div class="hours-day">Showings</div>
            <div class="hours-time">
              Seven days, including evenings
              <em>Weeknight showings until 8:00 PM</em>
            </div>
          </div>
          <div class="hours-row">
            <div class="hours-day">Emergency maintenance</div>
            <div class="hours-time">
              Twenty-four hours, every day
              <em>Same phone number, answered by a person</em>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= TEAM DIRECTORY ================= -->
  <section class="team-section">
    <div class="container">

      <div class="team-head">
        <span class="kicker">Who to Reach</span>
        <h2>Four people. Four kinds of question.</h2>
        <p>
          If you already know what your question is about, the fastest route is to email the
          person who handles it directly.
        </p>
      </div>

      <div class="team-list">

        <div class="team-row">
          <div class="team-portrait" aria-hidden="true">MD</div>
          <div>
            <div class="team-name">Morgan Delacroix</div>
            <div class="team-scope">Owners · Portfolios · Management agreements</div>
          </div>
          <div class="team-contact">
            <a href="mailto:corporate@premierpm.example">corporate@premierpm.example</a>
            <span>Managing Director</span>
          </div>
        </div>

        <div class="team-row">
          <div class="team-portrait" aria-hidden="true">LC</div>
          <div>
            <div class="team-name">Leah Chen</div>
            <div class="team-scope">Applications · Showings · Lease terms</div>
          </div>
          <div class="team-contact">
            <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a>
            <span>Lead Leasing Agent</span>
          </div>
        </div>

        <div class="team-row">
          <div class="team-portrait" aria-hidden="true">JO</div>
          <div>
            <div class="team-name">James Okafor</div>
            <div class="team-scope">Repairs · Vendor dispatch · Preventive upkeep</div>
          </div>
          <div class="team-contact">
            <a href="tel:+15550123456">(555) 012-3456</a>
            <span>Head of Maintenance · 24/7</span>
          </div>
        </div>

        <div class="team-row">
          <div class="team-portrait" aria-hidden="true">SR</div>
          <div>
            <div class="team-name">Sofia Ramirez</div>
            <div class="team-scope">Renewals · Portal access · Resident concerns</div>
          </div>
          <div class="team-contact">
            <a href="mailto:support@premierpm.example">support@premierpm.example</a>
            <span>Tenant Relations Manager</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= OFFICE VISIT NOTE ================= -->
  <section class="office-note">
    <div class="container">
      <div class="office-grid">

        <div class="office-label">
          <span class="kicker">Visiting in Person</span>
          <h2>The office sits in the Downtown Core.</h2>
        </div>

        <div class="office-body">
          <p>
            Walk-ins are welcome during business hours. If you want a specific person to be free
            when you arrive — a leasing agent, a coordinator, the managing director — send a note
            ahead and we will make sure the time is held.
          </p>
          <p>
            The building is on Harrison Avenue, two doors south of the corner café and a four-minute
            walk from the Harrison Avenue light rail stop. Visitor parking is in the rear lot with
            the entrance on 5th Street.
          </p>
          <ul>
            <li>Step-free access at the main Harrison Avenue entrance</li>
            <li>Accessible restroom on site</li>
            <li>Seating area with coffee, and no appointment required</li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= MESSAGE FORM ================= -->
  <section class="message" id="message">
    <div class="message-inner">

      <div class="message-head">
        <span class="kicker">If You Would Rather Write</span>
        <h2>A short note reaches the right desk.</h2>
        <p>
          For anything that does not fit neatly into an email category — or if you simply prefer
          writing — use the form below. It goes to the same inboxes as the addresses above.
        </p>
      </div>

      <form action="/c/contact" method="post" novalidate>

        <div class="form-field">
          <label for="topic">Topic</label>
          <select id="topic" name="topic" required>
            <option value="" selected disabled>Choose a topic…</option>
            <option value="leasing">General leasing enquiry</option>
            <option value="viewing">Schedule a property viewing</option>
            <option value="maintenance">Maintenance request</option>
            <option value="application">Leasing application</option>
            <option value="corporate">Corporate or owner enquiry</option>
          </select>
        </div>

        <div class="form-field">
          <label for="name">Your name</label>
          <input type="text" id="name" name="name" placeholder="Full name" autocomplete="name" required>
        </div>

        <div class="form-field">
          <label for="email">Email address</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email" required>
        </div>

        <div class="form-field">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" name="phone" placeholder="Optional" autocomplete="tel">
        </div>

        <div class="form-field">
          <label for="unit">Unit or building</label>
          <input type="text" id="unit" name="unit" placeholder="Optional — e.g. Harbor View Lofts, Unit 14B">
        </div>

        <div class="form-field">
          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="What would you like us to know? For a viewing request, include a few dates and times that work for you." required></textarea>
        </div>

        <div class="form-actions">
          <p class="form-note">
            We reply to every message within one business day. For emergencies, please call the
            24/7 line instead.
          </p>
          <button type="submit" class="form-submit">Send Message</button>
        </div>

      </form>

    </div>
  </section>

  <!-- ================= SUBSCRIBE / CTA ================= -->
  <section class="subscribe">
    <div class="container-narrow">
      <div class="subscribe-inner">
        <span class="kicker">If You Would Rather Visit</span>
        <h2>Tours run seven days a week, including evenings.</h2>
        <p>
          Pick a time that works for you and a leasing agent will meet you at the building. The
          kettle is on in the office, but the showings happen where the home actually is.
        </p>

        <div class="subscribe-actions">
          <a href="mailto:leasing@premierpm.example" class="link-lg">Email the Leasing Team →</a>
          <a href="/" class="link-quiet">Browse Available Units</a>
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
        <a href="/" class="masthead">
          <span class="masthead-name">Premier <em>Property</em> Management</span>
          <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
        </a>
        <p>
          Property management and leasing for the modern city. We look after more than 250
          residential units with the same attention to detail you would want in your own home.
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

export const style3Policy = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Privacy Policy · Premier Property Management</title>
<meta name="description" content="How Premier Property Management collects, uses, shares, and protects tenant and applicant data — including screening documents, lease logs, and rent records.">
<style>
/* ============================================================
   DESIGN TOKENS — Editorial / Content-First (Editorial Minimal)
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#1c1917;
  --ink-2:#3f3a35;
  --ink-3:#57534e;
  --muted:#78716c;
  --muted-2:#a8a29e;

  --paper:#faf7f2;
  --paper-2:#f5f0e8;
  --surface:#ffffff;
  --surface-2:#fdfbf7;

  --rule:#e7e0d5;
  --rule-2:#d8cfbf;
  --rule-3:#c4b8a3;

  --accent:#8b3a2e;
  --accent-2:#6b2c1f;
  --accent-soft:rgba(139,58,46,.08);

  --serif:Georgia,'Iowan Old Style','Palatino Linotype','Book Antiqua',Palatino,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;

  --max:1180px;
  --measure:64ch;
  --header-h:4.5rem;
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6rem}

body{
  font-family:var(--sans);
  background:var(--paper);
  color:var(--ink);
  line-height:1.7;
  font-size:17px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none;transition:color .16s ease}
button,input,select,textarea{font:inherit;color:inherit}
ul,ol{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{
  font-family:var(--serif);
  font-weight:400;
  letter-spacing:-.015em;
  line-height:1.18;
  color:var(--ink);
}
h1{font-size:clamp(2.35rem,5vw,4rem);letter-spacing:-.025em;line-height:1.06}
h2{font-size:clamp(1.5rem,2.6vw,2.05rem);letter-spacing:-.02em;line-height:1.22}
h3{font-size:1.15rem;line-height:1.3}
h4{font-size:1rem;line-height:1.35}

p{color:var(--ink-2);line-height:1.78}
p + p{margin-top:1.1rem}

.kicker{
  font-family:var(--sans);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--accent);
}
.kicker.quiet{color:var(--muted)}

.link{
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.link:hover{color:var(--accent-2);border-bottom-color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:760px;margin-inline:auto;padding-inline:1.5rem}

.section{padding:5rem 0}
.section-tight{padding:3rem 0}

.rule{height:1px;background:var(--rule);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  background:var(--paper);
  border-bottom:1px solid var(--rule);
  position:relative;
  z-index:40;
}
.header-top{
  border-bottom:1px solid var(--rule);
  padding:.55rem 0;
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}
.header-top-inner{
  display:flex;justify-content:space-between;align-items:center;
  gap:1.5rem;flex-wrap:wrap;
}
.header-top-inner span{white-space:nowrap}
.header-top-inner .dot{
  display:inline-block;width:.28rem;height:.28rem;
  background:var(--accent);border-radius:50%;
  margin:0 .55rem;vertical-align:middle;transform:translateY(-1px);
}
.header-main{padding:1.5rem 0 1.25rem;border-bottom:1px solid var(--rule)}
.header-main-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:2rem;flex-wrap:wrap;
}
.masthead{display:flex;flex-direction:column;align-items:flex-start;gap:.15rem}
.masthead-name{
  font-family:var(--serif);font-size:1.85rem;
  letter-spacing:-.03em;line-height:1;color:var(--ink);
}
.masthead-name em{font-style:italic;color:var(--accent)}
.masthead-tag{
  font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);margin-top:.35rem;
}
.header-contact{
  font-size:.82rem;color:var(--ink-2);text-align:right;line-height:1.65;
}
.header-contact a{border-bottom:1px solid var(--rule-2);padding-bottom:1px}
.header-contact a:hover{border-bottom-color:var(--accent);color:var(--accent)}

.nav-bar{
  border-bottom:1px solid var(--rule);
  background:var(--paper);
  position:sticky;top:0;z-index:50;
}
.nav-bar-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:1.5rem;padding:.85rem 0;
}
.nav{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
.nav a{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--ink-3);
  padding:.25rem 0;border-bottom:1px solid transparent;
  transition:color .16s ease,border-color .16s ease;
}
.nav a:hover{color:var(--ink);border-bottom-color:var(--ink)}
.nav a[aria-current="page"]{color:var(--accent);border-bottom-color:var(--accent)}
.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;
  border:1px solid var(--rule-2);background:var(--surface);
  cursor:pointer;align-items:center;justify-content:center;
  flex-direction:column;gap:4px;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink)}
.nav-cta{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);
  padding:.25rem 0;border-bottom:1px solid var(--accent);
  white-space:nowrap;
}
.nav-cta:hover{color:var(--accent-2)}

/* ============================================================
   DOCUMENT HERO
   ============================================================ */
.doc-hero{
  padding:4rem 0 3.5rem;
  border-bottom:1px solid var(--rule);
}
.doc-hero-inner{
  max-width:820px;
}
.doc-hero .kicker{
  display:block;
  margin-bottom:1.5rem;
}
.doc-hero .kicker .dot{
  display:inline-block;width:.35rem;height:.35rem;
  background:var(--accent);border-radius:50%;
  margin-right:.6rem;vertical-align:middle;transform:translateY(-2px);
}
.doc-hero h1{
  margin-bottom:1.5rem;
  max-width:16ch;
}
.doc-hero .subhead{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.2rem;
  line-height:1.55;
  color:var(--ink-3);
  max-width:52ch;
  margin-bottom:2rem;
}

/* Meta strip */
.doc-meta{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:2rem;
  padding-top:2rem;
  border-top:1px solid var(--rule);
  max-width:820px;
}
.doc-meta dt{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:.4rem;
}
.doc-meta dd{
  font-family:var(--serif);
  font-size:1rem;
  color:var(--ink);
  line-height:1.4;
}

/* ============================================================
   READING LAYOUT — sticky TOC + document body
   ============================================================ */
.reading{
  padding:4.5rem 0 5rem;
}

.reading-grid{
  display:grid;
  grid-template-columns:minmax(0,230px) minmax(0,1fr);
  gap:5rem;
  align-items:start;
}

/* Table of contents */
.toc{
  position:sticky;
  top:6rem;
  padding-top:.5rem;
}
.toc .kicker.quiet{
  display:block;
  margin-bottom:1.25rem;
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
}
.toc ol{
  list-style:none;
  counter-reset:none;
  display:flex;
  flex-direction:column;
}
.toc li{
  border-bottom:1px solid var(--rule);
}
.toc li:last-child{border-bottom:0}
.toc a{
  display:grid;
  grid-template-columns:2rem 1fr;
  gap:.5rem;
  padding:.7rem 0;
  font-family:var(--sans);
  font-size:.86rem;
  color:var(--ink-3);
  line-height:1.45;
  transition:color .16s ease;
  align-items:baseline;
}
.toc a:hover{color:var(--accent)}
.toc-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:.9rem;
  color:var(--accent);
  letter-spacing:.02em;
}

/* Document body */
.doc-body{
  max-width:var(--measure);
  counter-reset:sec;
}
.doc-body section{
  padding-bottom:3rem;
  margin-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.doc-body section:last-of-type{
  border-bottom:0;
  padding-bottom:0;
  margin-bottom:0;
}

/* Numbered section heading */
.doc-body h2{
  display:grid;
  grid-template-columns:3rem 1fr;
  gap:1rem;
  align-items:baseline;
  margin-bottom:1.5rem;
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
  max-width:none;
}
.sec-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.35rem;
  color:var(--accent);
  letter-spacing:.02em;
  line-height:1;
  padding-top:.15rem;
}
.sec-title{
  font-family:var(--serif);
  font-weight:400;
  font-size:inherit;
  line-height:1.22;
  letter-spacing:-.02em;
}

/* Subsection heading */
.doc-body h3{
  margin-top:2rem;
  margin-bottom:.9rem;
  display:grid;
  grid-template-columns:3rem 1fr;
  gap:1rem;
  align-items:baseline;
  font-size:1.02rem;
  letter-spacing:-.005em;
  color:var(--ink);
  font-family:var(--sans);
  font-weight:600;
}
.sub-num{
  font-family:var(--sans);
  font-weight:600;
  font-size:.82rem;
  color:var(--accent);
  letter-spacing:.08em;
}

.doc-body p{
  font-size:1.02rem;
  color:var(--ink-2);
}

/* Body lists — numbered and bulleted */
.doc-body ul,
.doc-body ol.numbered{
  margin:1.15rem 0 1.35rem;
  display:flex;
  flex-direction:column;
  gap:.85rem;
}
.doc-body ul li{
  position:relative;
  padding-left:1.5rem;
  font-size:.98rem;
  color:var(--ink-2);
  line-height:1.7;
}
.doc-body ul li::before{
  content:"—";
  position:absolute;
  left:0;
  color:var(--accent);
  font-weight:400;
}

.doc-body ol.numbered{counter-reset:item;list-style:none}
.doc-body ol.numbered li{
  counter-increment:item;
  position:relative;
  padding-left:2.75rem;
  font-size:.98rem;
  color:var(--ink-2);
  line-height:1.7;
}
.doc-body ol.numbered li::before{
  content:"(" counter(item,lower-alpha) ")";
  position:absolute;
  left:0;
  top:0;
  font-family:var(--serif);
  font-style:italic;
  color:var(--accent);
  font-size:.95rem;
  letter-spacing:.02em;
}

/* Emphasis inside paragraphs */
.doc-body strong{
  font-weight:600;
  color:var(--ink);
}
.doc-body em{
  font-style:italic;
  color:var(--ink-3);
}

/* Definition list — key terms */
.doc-terms{
  margin:1.5rem 0;
  border-top:1px solid var(--rule);
}
.doc-terms > div{
  display:grid;
  grid-template-columns:minmax(0,180px) minmax(0,1fr);
  gap:2rem;
  padding:1.35rem 0;
  border-bottom:1px solid var(--rule);
  align-items:baseline;
}
.doc-terms > div:last-child{border-bottom:0}
.doc-terms dt{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.35;
  letter-spacing:-.01em;
}
.doc-terms dd{
  font-size:.95rem;
  color:var(--ink-2);
  line-height:1.7;
}

/* Margin note — a distinct editorial element */
.margin-note{
  margin:2rem 0;
  padding:1.35rem 1.5rem;
  background:var(--surface-2);
  border-left:3px solid var(--accent);
  font-family:var(--sans);
}
.margin-note .note-label{
  font-size:.68rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--accent);
  margin-bottom:.5rem;
}
.margin-note p{
  font-size:.92rem;
  color:var(--ink-3);
  line-height:1.7;
  font-family:var(--sans);
}

/* Pull quote inside document */
.doc-pull{
  margin:2rem 0;
  padding:1.75rem 0;
  border-top:1px solid var(--rule-2);
  border-bottom:1px solid var(--rule-2);
  text-align:center;
}
.doc-pull p{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.28rem;
  line-height:1.45;
  letter-spacing:-.012em;
  color:var(--ink);
  max-width:36ch;
  margin:0 auto;
}

/* Cross-reference */
.xref{
  display:inline-block;
  font-family:var(--sans);
  font-size:.8rem;
  font-weight:600;
  letter-spacing:.04em;
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
}
.xref:hover{color:var(--accent-2);border-bottom-color:var(--accent)}

/* ============================================================
   END-OF-DOCUMENT — contact block
   ============================================================ */
.doc-contact{
  margin-top:4rem;
  padding-top:3rem;
  border-top:2px double var(--rule-2);
}
.doc-contact .kicker{display:block;margin-bottom:1rem}
.doc-contact h2{
  display:block;
  grid-template-columns:none;
  max-width:22ch;
  margin-bottom:1.25rem;
  padding-bottom:0;
  border-bottom:0;
  font-size:clamp(1.4rem,2.4vw,1.75rem);
}
.doc-contact > p{
  max-width:56ch;
  font-size:1rem;
  color:var(--ink-3);
  margin-bottom:2rem;
}

.contact-rows{
  border-top:1px solid var(--rule);
}
.contact-row{
  display:grid;
  grid-template-columns:minmax(0,180px) minmax(0,1fr);
  gap:2rem;
  padding:1.15rem 0;
  border-bottom:1px solid var(--rule);
  align-items:baseline;
}
.contact-row:last-child{border-bottom:0}
.contact-row dt{
  font-size:.68rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
}
.contact-row dd{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.5;
}
.contact-row dd a{
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.contact-row dd a:hover{color:var(--accent);border-bottom-color:var(--accent)}

/* ============================================================
   SUBSCRIBE / CTA
   ============================================================ */
.subscribe{
  padding:5rem 0;
  background:var(--paper-2);
  border-top:1px solid var(--rule);
}
.subscribe-inner{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.subscribe-inner .kicker{display:block;margin-bottom:1.25rem}
.subscribe-inner h2{max-width:22ch;margin:0 auto 1.25rem}
.subscribe-inner p{
  font-size:1.02rem;
  color:var(--ink-3);
  max-width:56ch;
  margin:0 auto 2.5rem;
}
.subscribe-actions{
  display:flex;
  gap:2.5rem;
  justify-content:center;
  align-items:baseline;
  flex-wrap:wrap;
}
.subscribe-actions .link-lg{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent);
  border-bottom:1px solid var(--accent);
  padding-bottom:2px;
}
.subscribe-actions .link-lg:hover{color:var(--accent-2);border-bottom-color:var(--accent-2)}
.subscribe-actions .link-quiet{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-3);
  border-bottom:1px solid var(--rule-2);
  padding-bottom:2px;
}
.subscribe-actions .link-quiet:hover{color:var(--ink);border-bottom-color:var(--ink)}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{
  background:var(--paper);
  border-top:1px solid var(--rule);
  padding:4rem 0 2rem;
  margin-top:auto;
}
.footer-grid{
  display:grid;
  grid-template-columns:minmax(0,1.6fr) 1fr 1fr 1.3fr;
  gap:3rem;
  padding-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.footer-brand .masthead-name{font-size:1.5rem}
.footer-brand p{
  font-size:.88rem;color:var(--muted);
  margin-top:1.15rem;max-width:38ch;line-height:1.7;
}
.footer-col h4{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.65rem}
.footer-col a,.footer-col span{
  font-size:.88rem;color:var(--ink-3);line-height:1.6;
}
.footer-col a{border-bottom:1px solid transparent;transition:border-color .16s ease,color .16s ease}
.footer-col a:hover{color:var(--accent);border-bottom-color:rgba(139,58,46,.4)}
.footer-bottom{
  padding-top:1.75rem;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.78rem;color:var(--muted);letter-spacing:.02em;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .reading-grid{grid-template-columns:1fr;gap:2.5rem}
  .toc{position:static;padding-top:0}
  .toc ol{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:0 2rem;
  }
  .footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem}
  .doc-meta{grid-template-columns:repeat(2,1fr);gap:1.5rem}
}

@media (max-width:900px){
  .nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--surface);border:1px solid var(--rule);border-top:0;padding:0}
  .nav a{padding:1rem 1.5rem;border-bottom:1px solid var(--rule);font-size:.82rem}
  .nav a:last-child{border-bottom:0}
  .burger{display:flex}
  .nav-toggle:checked ~ .nav-bar-inner .nav{display:flex}
}

@media (max-width:780px){
  .doc-meta{grid-template-columns:1fr 1fr}
  .doc-body h2{grid-template-columns:2.25rem 1fr;gap:.75rem}
  .doc-body h3{grid-template-columns:2.25rem 1fr;gap:.75rem}
  .sec-num{font-size:1.15rem}
  .doc-terms > div{grid-template-columns:1fr;gap:.35rem;padding:1.1rem 0}
  .contact-row{grid-template-columns:1fr;gap:.35rem;padding:1rem 0}
}

@media (max-width:680px){
  .section{padding:3.5rem 0}
  .section-tight{padding:2.25rem 0}
  .header-top{display:none}
  .header-main{padding:1.25rem 0}
  .masthead-name{font-size:1.5rem}
  .header-contact{text-align:left;width:100%}
  .doc-hero{padding:3rem 0 2.5rem}
  .doc-meta{grid-template-columns:1fr}
  .toc ol{grid-template-columns:1fr}
  .reading{padding:3rem 0 3.5rem}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .footer-bottom{flex-direction:column;text-align:center}
  .doc-pull p{font-size:1.1rem}
}

@media (max-width:520px){
  body{font-size:16px}
  .container,.container-narrow{padding-inline:1.15rem}
  .doc-hero h1{font-size:1.95rem}
  .doc-hero .subhead{font-size:1.08rem}
  .doc-body h2{grid-template-columns:1fr;gap:.35rem}
  .doc-body h3{grid-template-columns:1fr;gap:.35rem}
  .subscribe-actions{flex-direction:column;gap:1.25rem}
}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">

  <div class="header-top">
    <div class="container header-top-inner">
      <span>Vol. XII <span class="dot"></span> Property Management &amp; Leasing</span>
      <span>City Center <span class="dot"></span> Est. 2012</span>
      <span>Issue No. 248 <span class="dot"></span> March 2025</span>
    </div>
  </div>

  <div class="header-main">
    <div class="container header-main-inner">
      <a href="/" class="masthead">
        <span class="masthead-name">Premier <em>Property</em> Management</span>
        <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
      </a>

      <div class="header-contact">
        <a href="mailto:privacy@premierpm.example">privacy@premierpm.example</a><br>
        <a href="tel:+15550123456">(555) 012-3456</a>
      </div>
    </div>
  </div>

  <div class="nav-bar">
    <div class="container nav-bar-inner">
      <input type="checkbox" id="nav-toggle" class="nav-toggle">
      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy" aria-current="page">Privacy</a>
        <a href="/c/terms">Terms</a>
      </nav>

      <a href="/c/contact" class="nav-cta">Contact Us →</a>

      <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </label>
    </div>
  </div>

</header>

<main>

  <!-- ================= DOCUMENT HERO ================= -->
  <section class="doc-hero">
    <div class="container">
      <div class="doc-hero-inner">

        <span class="kicker"><span class="dot"></span>Legal Document <span style="margin-left:.6rem;color:var(--muted);letter-spacing:.14em">· Policy No. 01</span></span>

        <h1>Privacy Policy</h1>

        <p class="subhead">
          How Premier Property Management collects, uses, shares, and protects the personal
          information of applicants, residents, and website visitors — written in plain language
          and organised for comprehension.
        </p>

        <dl class="doc-meta">
          <div>
            <dt>Effective Date</dt>
            <dd>March 1, 2025</dd>
          </div>
          <div>
            <dt>Last Reviewed</dt>
            <dd>March 1, 2025</dd>
          </div>
          <div>
            <dt>Document Code</dt>
            <dd>PM-PRIV-01</dd>
          </div>
          <div>
            <dt>Applies To</dt>
            <dd>Website, tenant portal, and all managed properties</dd>
          </div>
        </dl>

      </div>
    </div>
  </section>

  <!-- ================= READING LAYOUT ================= -->
  <section class="reading">
    <div class="container">
      <div class="reading-grid">

        <!-- Sticky table of contents -->
        <aside class="toc" aria-label="Table of contents">
          <span class="kicker quiet">Contents</span>
          <ol>
            <li><a href="#s1"><span class="toc-num">1.</span><span>Information We Collect</span></a></li>
            <li><a href="#s2"><span class="toc-num">2.</span><span>Screening &amp; Application Data</span></a></li>
            <li><a href="#s3"><span class="toc-num">3.</span><span>Use of Tenant Data</span></a></li>
            <li><a href="#s4"><span class="toc-num">4.</span><span>Data Sharing &amp; Security</span></a></li>
            <li><a href="#s5"><span class="toc-num">5.</span><span>Retention &amp; Deletion</span></a></li>
            <li><a href="#s6"><span class="toc-num">6.</span><span>Tenant Rights</span></a></li>
            <li><a href="#s7"><span class="toc-num">7.</span><span>Cookies &amp; Site Analytics</span></a></li>
            <li><a href="#s8"><span class="toc-num">8.</span><span>Changes to This Policy</span></a></li>
          </ol>
        </aside>

        <!-- Document body -->
        <article class="doc-body">

          <!-- Preamble -->
          <section style="border-bottom:1px solid var(--rule);padding-bottom:2.5rem;margin-bottom:3rem">
            <p style="font-size:1.05rem">
              Premier Property Management ("PremierPM", "we", "us") manages residential buildings
              and processes rental applications on behalf of property owners. In doing so we handle
              personal information every day. This document explains exactly how — what we collect,
              why we collect it, who sees it, how long we keep it, and the rights you hold over your
              own information.
            </p>
            <p>
              We collect only what we need to lease, manage, and maintain a property. We keep it
              only for as long as we need it. This policy applies to our website, our tenant portal,
              our leasing office, and every building in our managed portfolio.
            </p>
          </section>

          <!-- Section 1 -->
          <section id="s1">
            <h2>
              <span class="sec-num" aria-hidden="true">1.</span>
              <span class="sec-title">Information We Collect</span>
            </h2>

            <p>
              We collect information in three ways: directly from you, automatically through our
              website and portal, and from third parties you authorize during the application
              process.
            </p>

            <h3><span class="sub-num">1.1</span><span>Personal details you provide</span></h3>
            <p>
              Your name, email address, phone number, current and previous mailing addresses, date
              of birth, and the number of occupants who will live in the unit. For corporate leases,
              we also collect the company name, billing contact, and authorized signatory.
            </p>

            <h3><span class="sub-num">1.2</span><span>Application &amp; screening documents</span></h3>
            <p>
              Government-issued photo identification, proof of income such as recent pay stubs or
              employment letters, bank statements where required, rental history and landlord
              references, and the authorization forms needed to run a credit and background check.
            </p>

            <h3><span class="sub-num">1.3</span><span>Lease &amp; account logs</span></h3>
            <p>
              Your signed lease and any addenda, move-in and move-out inspection reports, rent
              payment records, ledger balances, maintenance requests and their resolution notes, and
              written communications with our leasing and maintenance teams.
            </p>

            <h3><span class="sub-num">1.4</span><span>Website &amp; portal technical data</span></h3>
            <p>
              IP address, browser type and version, device type, pages visited, referring URL, and
              timestamps. For portal users, we also record login events and session activity.
            </p>

            <div class="margin-note">
              <div class="note-label">What we do not collect</div>
              <p>
                We do not collect biometric identifiers, precise geolocation from your mobile
                device, health information, or the contents of your private messages. We never ask
                for your Social Security number through this website.
              </p>
            </div>
          </section>

          <!-- Section 2 -->
          <section id="s2">
            <h2>
              <span class="sec-num" aria-hidden="true">2.</span>
              <span class="sec-title">Screening &amp; Application Data</span>
            </h2>

            <p>
              When you apply for a unit, you authorize us and our screening partner to verify the
              information you provided. That verification produces a consumer report containing
              credit history, eviction filings, and public record information.
            </p>

            <p>
              Screening reports are used solely to evaluate your application against our written
              rental criteria, which are applied consistently to every applicant for the same unit.
              We do not use a screening report to set different terms for applicants in a protected
              class.
            </p>

            <p>
              If your application is denied, you receive a written notice identifying the screening
              company and explaining your right to request a free copy of the report and to dispute
              inaccurate information directly with that company.
            </p>

            <div class="doc-pull">
              <p>“Every applicant for the same unit is measured against the same written criteria — nothing else.”</p>
            </div>
          </section>

          <!-- Section 3 -->
          <section id="s3">
            <h2>
              <span class="sec-num" aria-hidden="true">3.</span>
              <span class="sec-title">Use of Tenant Data</span>
            </h2>

            <p>We use the information we collect for the following purposes:</p>

            <h3><span class="sub-num">3.1</span><span>Leasing and screening</span></h3>
            <ul>
              <li>Verifying identity, income, and rental history before approving a lease.</li>
              <li>Preparing your lease, addenda, and move-in documentation.</li>
              <li>Coordinating co-signers, guarantors, or corporate signatories where applicable.</li>
            </ul>

            <h3><span class="sub-num">3.2</span><span>Rent collection and accounting</span></h3>
            <ul>
              <li>Processing monthly rent, deposits, and any lawful fees through our payment provider.</li>
              <li>Maintaining your ledger, issuing receipts, and producing year-end summaries for owners.</li>
              <li>Contacting you about a past-due balance, as required by your lease and local law.</li>
            </ul>

            <h3><span class="sub-num">3.3</span><span>Building operations and notices</span></h3>
            <ul>
              <li>Sending maintenance schedules, utility interruptions, entry notices, and building announcements.</li>
              <li>Dispatching maintenance staff or vendors to your unit and recording the outcome.</li>
              <li>Responding to emergencies that affect health, safety, or the integrity of the building.</li>
            </ul>

            <h3><span class="sub-num">3.4</span><span>Legal and compliance obligations</span></h3>
            <ul>
              <li>Complying with landlord-tenant law, fair housing requirements, and tax reporting.</li>
              <li>Responding to lawful requests from courts, regulators, or emergency services.</li>
              <li>Enforcing the terms of your lease where a breach occurs.</li>
            </ul>

            <div class="margin-note">
              <div class="note-label">Our commitment</div>
              <p>
                We do not sell your personal information, and we do not use it for advertising
                networks or unrelated marketing. Ever.
              </p>
            </div>
          </section>

          <!-- Section 4 -->
          <section id="s4">
            <h2>
              <span class="sec-num" aria-hidden="true">4.</span>
              <span class="sec-title">Data Sharing &amp; Security</span>
            </h2>

            <p>
              We share personal information only with parties who need it to perform a specific
              function for us, and only under written confidentiality obligations.
            </p>

            <dl class="doc-terms">
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

            <h3><span class="sub-num">4.1</span><span>How we protect your data</span></h3>
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
          </section>

          <!-- Section 5 -->
          <section id="s5">
            <h2>
              <span class="sec-num" aria-hidden="true">5.</span>
              <span class="sec-title">Retention &amp; Deletion</span>
            </h2>

            <p>
              We keep personal information only for as long as it serves the purpose it was
              collected for, or as long as the law requires.
            </p>

            <dl class="doc-terms">
              <div>
                <dt>Denied applications</dt>
                <dd>Retained for 12 months, then deleted or anonymized.</dd>
              </div>
              <div>
                <dt>Active tenancy records</dt>
                <dd>Retained for the duration of the lease and any renewal.</dd>
              </div>
              <div>
                <dt>Post-tenancy records</dt>
                <dd>Ledger, lease, and inspection reports retained for the period required by tax and landlord-tenant law — typically 7 years.</dd>
              </div>
              <div>
                <dt>Maintenance records</dt>
                <dd>Retained for 3 years after the work is completed.</dd>
              </div>
              <div>
                <dt>Website analytics</dt>
                <dd>Retained in aggregate form for 26 months.</dd>
              </div>
            </dl>

            <p>
              When a retention period ends, we delete the records or strip them of identifiers so
              they can no longer be linked to you.
            </p>
          </section>

          <!-- Section 6 -->
          <section id="s6">
            <h2>
              <span class="sec-num" aria-hidden="true">6.</span>
              <span class="sec-title">Tenant Rights</span>
            </h2>

            <p>
              Subject to your jurisdiction and to our lawful recordkeeping obligations, you have
              the following rights regarding the personal information we hold about you.
            </p>

            <dl class="doc-terms">
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
              <a href="mailto:privacy@premierpm.example" class="link">privacy@premierpm.example</a>
              with the subject line <em>"Privacy Request"</em>. We will verify your identity and
              respond within 30 days. There is no charge for a first request.
            </p>

            <div class="margin-note">
              <div class="note-label">Fair housing note</div>
              <p>
                We do not discriminate on the basis of race, color, religion, national origin, sex,
                familial status, disability, or any other class protected by applicable law. If you
                believe you have experienced discrimination, you may contact us directly or file a
                complaint with the appropriate fair housing authority.
              </p>
            </div>
          </section>

          <!-- Section 7 -->
          <section id="s7">
            <h2>
              <span class="sec-num" aria-hidden="true">7.</span>
              <span class="sec-title">Cookies &amp; Site Analytics</span>
            </h2>

            <p>
              Our public website uses a small number of first-party cookies to remember your search
              preferences and to measure which pages are useful. The tenant portal uses a session
              cookie that is required for you to stay logged in.
            </p>

            <h3><span class="sub-num">7.1</span><span>Types of cookies we use</span></h3>
            <ul>
              <li><strong>Essential cookies</strong> — required for the portal login and security functions. These cannot be disabled.</li>
              <li><strong>Preference cookies</strong> — remember filters such as neighborhood or bedroom count.</li>
              <li><strong>Analytics cookies</strong> — collect aggregated page-view data. These contain no personal identifiers.</li>
            </ul>

            <p>
              You can block or delete cookies in your browser settings. Blocking essential cookies
              will prevent the tenant portal from working correctly.
            </p>
          </section>

          <!-- Section 8 -->
          <section id="s8">
            <h2>
              <span class="sec-num" aria-hidden="true">8.</span>
              <span class="sec-title">Changes to This Policy</span>
            </h2>

            <p>
              We review this policy at least once a year and whenever we change how we handle
              personal information. When we make a material change, we will update the effective
              date at the top of this page and post a notice in the tenant portal and in building
              common areas.
            </p>

            <p>
              Continued use of the portal or continued tenancy after a change takes effect
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <!-- End-of-document contact block -->
          <div class="doc-contact">
            <span class="kicker">Questions &amp; Requests</span>
            <h2>Contact our privacy team.</h2>
            <p>
              If anything in this document is unclear, or if you wish to exercise a right described
              above, reach us using the details below.
            </p>

            <dl class="contact-rows">
              <div class="contact-row">
                <dt>Email</dt>
                <dd><a href="mailto:privacy@premierpm.example">privacy@premierpm.example</a></dd>
              </div>
              <div class="contact-row">
                <dt>Phone</dt>
                <dd><a href="tel:+15550123456">(555) 012-3456</a> · Mon–Fri, 9:00 – 18:00</dd>
              </div>
              <div class="contact-row">
                <dt>Postal Address</dt>
                <dd>Premier Property Management<br>Attn: Privacy Officer<br>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</dd>
              </div>
              <div class="contact-row">
                <dt>Response Time</dt>
                <dd>Within 30 days of identity verification</dd>
              </div>
              <div class="contact-row">
                <dt>Related Documents</dt>
                <dd>
                  <a href="/c/terms" class="xref">Terms of Service</a> ·
                  <a href="/c/contact" class="xref">Contact the Leasing Office</a>
                </dd>
              </div>
            </dl>
          </div>

        </article>

      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="subscribe">
    <div class="container-narrow">
      <div class="subscribe-inner">
        <span class="kicker">Related Document</span>
        <h2>The terms that govern the portal and your lease.</h2>
        <p>
          Our Terms of Service covers portal usage, application and holding fees, listing
          accuracy, and the limits of our liability for property upkeep reporting.
        </p>

        <div class="subscribe-actions">
          <a href="/c/terms" class="link-lg">Read the Terms of Service →</a>
          <a href="/c/contact" class="link-quiet">Contact Us</a>
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
        <a href="/" class="masthead">
          <span class="masthead-name">Premier <em>Property</em> Management</span>
          <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
        </a>
        <p>
          Property management and leasing for the modern city. We look after more than 250
          residential units with the same attention to detail you would want in your own home.
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
          <li><a href="mailto:privacy@premierpm.example">privacy@premierpm.example</a></li>
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

export const style3Terms = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Terms of Service · Premier Property Management</title>
<meta name="description" content="The terms governing use of the PremierPM tenant portal, rental applications, holding fees, listing accuracy, and limitation of liability for property upkeep reporting.">
<style>
/* ============================================================
   DESIGN TOKENS — Editorial / Content-First (Editorial Minimal)
   ============================================================ */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}

:root{
  --ink:#1c1917;
  --ink-2:#3f3a35;
  --ink-3:#57534e;
  --muted:#78716c;
  --muted-2:#a8a29e;

  --paper:#faf7f2;
  --paper-2:#f5f0e8;
  --surface:#ffffff;
  --surface-2:#fdfbf7;

  --rule:#e7e0d5;
  --rule-2:#d8cfbf;
  --rule-3:#c4b8a3;

  --accent:#8b3a2e;
  --accent-2:#6b2c1f;
  --accent-soft:rgba(139,58,46,.08);

  --serif:Georgia,'Iowan Old Style','Palatino Linotype','Book Antiqua',Palatino,'Times New Roman',serif;
  --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;

  --max:1180px;
  --measure:64ch;
  --header-h:4.5rem;
}

html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:6rem}

body{
  font-family:var(--sans);
  background:var(--paper);
  color:var(--ink);
  line-height:1.7;
  font-size:17px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  overflow-x:hidden;
}

img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none;transition:color .16s ease}
button,input,select,textarea{font:inherit;color:inherit}
ul,ol{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1,h2,h3,h4{
  font-family:var(--serif);
  font-weight:400;
  letter-spacing:-.015em;
  line-height:1.18;
  color:var(--ink);
}
h1{font-size:clamp(2.35rem,5vw,4rem);letter-spacing:-.025em;line-height:1.06}
h2{font-size:clamp(1.5rem,2.6vw,2.05rem);letter-spacing:-.02em;line-height:1.22}
h3{font-size:1.15rem;line-height:1.3}
h4{font-size:1rem;line-height:1.35}

p{color:var(--ink-2);line-height:1.78}
p + p{margin-top:1.1rem}

.kicker{
  font-family:var(--sans);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--accent);
}
.kicker.quiet{color:var(--muted)}

.link{
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.link:hover{color:var(--accent-2);border-bottom-color:var(--accent)}

/* ============================================================
   LAYOUT PRIMITIVES
   ============================================================ */
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:1.5rem}
.container-narrow{width:100%;max-width:760px;margin-inline:auto;padding-inline:1.5rem}

.section{padding:5rem 0}
.section-tight{padding:3rem 0}

.rule{height:1px;background:var(--rule);border:0}

/* ============================================================
   HEADER
   ============================================================ */
.site-header{
  background:var(--paper);
  border-bottom:1px solid var(--rule);
  position:relative;
  z-index:40;
}
.header-top{
  border-bottom:1px solid var(--rule);
  padding:.55rem 0;
  font-size:.72rem;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--muted);
}
.header-top-inner{
  display:flex;justify-content:space-between;align-items:center;
  gap:1.5rem;flex-wrap:wrap;
}
.header-top-inner span{white-space:nowrap}
.header-top-inner .dot{
  display:inline-block;width:.28rem;height:.28rem;
  background:var(--accent);border-radius:50%;
  margin:0 .55rem;vertical-align:middle;transform:translateY(-1px);
}
.header-main{padding:1.5rem 0 1.25rem;border-bottom:1px solid var(--rule)}
.header-main-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:2rem;flex-wrap:wrap;
}
.masthead{display:flex;flex-direction:column;align-items:flex-start;gap:.15rem}
.masthead-name{
  font-family:var(--serif);font-size:1.85rem;
  letter-spacing:-.03em;line-height:1;color:var(--ink);
}
.masthead-name em{font-style:italic;color:var(--accent)}
.masthead-tag{
  font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);margin-top:.35rem;
}
.header-contact{
  font-size:.82rem;color:var(--ink-2);text-align:right;line-height:1.65;
}
.header-contact a{border-bottom:1px solid var(--rule-2);padding-bottom:1px}
.header-contact a:hover{border-bottom-color:var(--accent);color:var(--accent)}

.nav-bar{
  border-bottom:1px solid var(--rule);
  background:var(--paper);
  position:sticky;top:0;z-index:50;
}
.nav-bar-inner{
  display:flex;align-items:center;justify-content:space-between;
  gap:1.5rem;padding:.85rem 0;
}
.nav{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
.nav a{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--ink-3);
  padding:.25rem 0;border-bottom:1px solid transparent;
  transition:color .16s ease,border-color .16s ease;
}
.nav a:hover{color:var(--ink);border-bottom-color:var(--ink)}
.nav a[aria-current="page"]{color:var(--accent);border-bottom-color:var(--accent)}
.nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.burger{
  display:none;width:2.5rem;height:2.5rem;
  border:1px solid var(--rule-2);background:var(--surface);
  cursor:pointer;align-items:center;justify-content:center;
  flex-direction:column;gap:4px;
}
.burger span{display:block;width:16px;height:1.5px;background:var(--ink)}
.nav-cta{
  font-size:.78rem;font-weight:600;letter-spacing:.14em;
  text-transform:uppercase;color:var(--accent);
  padding:.25rem 0;border-bottom:1px solid var(--accent);
  white-space:nowrap;
}
.nav-cta:hover{color:var(--accent-2)}

/* ============================================================
   DOCUMENT HERO
   ============================================================ */
.doc-hero{
  padding:4rem 0 3.5rem;
  border-bottom:1px solid var(--rule);
}
.doc-hero-inner{max-width:820px}
.doc-hero .kicker{display:block;margin-bottom:1.5rem}
.doc-hero .kicker .dot{
  display:inline-block;width:.35rem;height:.35rem;
  background:var(--accent);border-radius:50%;
  margin-right:.6rem;vertical-align:middle;transform:translateY(-2px);
}
.doc-hero h1{margin-bottom:1.5rem;max-width:16ch}
.doc-hero .subhead{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.2rem;
  line-height:1.55;
  color:var(--ink-3);
  max-width:52ch;
  margin-bottom:2rem;
}

.doc-meta{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:2rem;
  padding-top:2rem;
  border-top:1px solid var(--rule);
  max-width:820px;
}
.doc-meta dt{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:.4rem;
}
.doc-meta dd{
  font-family:var(--serif);
  font-size:1rem;
  color:var(--ink);
  line-height:1.4;
}

/* ============================================================
   READING LAYOUT — sticky TOC + document body
   ============================================================ */
.reading{padding:4.5rem 0 5rem}

.reading-grid{
  display:grid;
  grid-template-columns:minmax(0,230px) minmax(0,1fr);
  gap:5rem;
  align-items:start;
}

/* Table of contents */
.toc{
  position:sticky;
  top:6rem;
  padding-top:.5rem;
}
.toc .kicker.quiet{
  display:block;
  margin-bottom:1.25rem;
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
}
.toc ol{
  list-style:none;
  display:flex;
  flex-direction:column;
}
.toc li{border-bottom:1px solid var(--rule)}
.toc li:last-child{border-bottom:0}
.toc a{
  display:grid;
  grid-template-columns:2rem 1fr;
  gap:.5rem;
  padding:.7rem 0;
  font-family:var(--sans);
  font-size:.86rem;
  color:var(--ink-3);
  line-height:1.45;
  transition:color .16s ease;
  align-items:baseline;
}
.toc a:hover{color:var(--accent)}
.toc-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:.9rem;
  color:var(--accent);
  letter-spacing:.02em;
}

/* Document body */
.doc-body{
  max-width:var(--measure);
}
.doc-body section{
  padding-bottom:3rem;
  margin-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.doc-body section:last-of-type{
  border-bottom:0;
  padding-bottom:0;
  margin-bottom:0;
}

.doc-body h2{
  display:grid;
  grid-template-columns:3rem 1fr;
  gap:1rem;
  align-items:baseline;
  margin-bottom:1.5rem;
  padding-bottom:1rem;
  border-bottom:1px solid var(--rule);
  max-width:none;
}
.sec-num{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.35rem;
  color:var(--accent);
  letter-spacing:.02em;
  line-height:1;
  padding-top:.15rem;
}
.sec-title{
  font-family:var(--serif);
  font-weight:400;
  font-size:inherit;
  line-height:1.22;
  letter-spacing:-.02em;
}

.doc-body h3{
  margin-top:2rem;
  margin-bottom:.9rem;
  display:grid;
  grid-template-columns:3rem 1fr;
  gap:1rem;
  align-items:baseline;
  font-size:1.02rem;
  letter-spacing:-.005em;
  color:var(--ink);
  font-family:var(--sans);
  font-weight:600;
}
.sub-num{
  font-family:var(--sans);
  font-weight:600;
  font-size:.82rem;
  color:var(--accent);
  letter-spacing:.08em;
}

.doc-body p{
  font-size:1.02rem;
  color:var(--ink-2);
}

/* Body lists */
.doc-body ul,
.doc-body ol.numbered{
  margin:1.15rem 0 1.35rem;
  display:flex;
  flex-direction:column;
  gap:.85rem;
}
.doc-body ul li{
  position:relative;
  padding-left:1.5rem;
  font-size:.98rem;
  color:var(--ink-2);
  line-height:1.7;
}
.doc-body ul li::before{
  content:"—";
  position:absolute;
  left:0;
  color:var(--accent);
  font-weight:400;
}

.doc-body ol.numbered{counter-reset:item;list-style:none}
.doc-body ol.numbered li{
  counter-increment:item;
  position:relative;
  padding-left:2.75rem;
  font-size:.98rem;
  color:var(--ink-2);
  line-height:1.7;
}
.doc-body ol.numbered li::before{
  content:"(" counter(item,lower-alpha) ")";
  position:absolute;
  left:0;
  top:0;
  font-family:var(--serif);
  font-style:italic;
  color:var(--accent);
  font-size:.95rem;
  letter-spacing:.02em;
}

.doc-body strong{font-weight:600;color:var(--ink)}
.doc-body em{font-style:italic;color:var(--ink-3)}

/* Definition list */
.doc-terms{
  margin:1.5rem 0;
  border-top:1px solid var(--rule);
}
.doc-terms > div{
  display:grid;
  grid-template-columns:minmax(0,180px) minmax(0,1fr);
  gap:2rem;
  padding:1.35rem 0;
  border-bottom:1px solid var(--rule);
  align-items:baseline;
}
.doc-terms > div:last-child{border-bottom:0}
.doc-terms dt{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.35;
  letter-spacing:-.01em;
}
.doc-terms dd{
  font-size:.95rem;
  color:var(--ink-2);
  line-height:1.7;
}

/* Margin note */
.margin-note{
  margin:2rem 0;
  padding:1.35rem 1.5rem;
  background:var(--surface-2);
  border-left:3px solid var(--accent);
  font-family:var(--sans);
}
.margin-note .note-label{
  font-size:.68rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--accent);
  margin-bottom:.5rem;
}
.margin-note p{
  font-size:.92rem;
  color:var(--ink-3);
  line-height:1.7;
  font-family:var(--sans);
}

/* Pull quote */
.doc-pull{
  margin:2rem 0;
  padding:1.75rem 0;
  border-top:1px solid var(--rule-2);
  border-bottom:1px solid var(--rule-2);
  text-align:center;
}
.doc-pull p{
  font-family:var(--serif);
  font-style:italic;
  font-size:1.28rem;
  line-height:1.45;
  letter-spacing:-.012em;
  color:var(--ink);
  max-width:36ch;
  margin:0 auto;
}

/* Cross-reference link */
.xref{
  display:inline-block;
  font-family:var(--sans);
  font-size:.8rem;
  font-weight:600;
  letter-spacing:.04em;
  color:var(--accent);
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
}
.xref:hover{color:var(--accent-2);border-bottom-color:var(--accent)}

/* ============================================================
   END-OF-DOCUMENT — contact block
   ============================================================ */
.doc-contact{
  margin-top:4rem;
  padding-top:3rem;
  border-top:2px double var(--rule-2);
}
.doc-contact .kicker{display:block;margin-bottom:1rem}
.doc-contact h2{
  display:block;
  grid-template-columns:none;
  max-width:22ch;
  margin-bottom:1.25rem;
  padding-bottom:0;
  border-bottom:0;
  font-size:clamp(1.4rem,2.4vw,1.75rem);
}
.doc-contact > p{
  max-width:56ch;
  font-size:1rem;
  color:var(--ink-3);
  margin-bottom:2rem;
}

.contact-rows{border-top:1px solid var(--rule)}
.contact-row{
  display:grid;
  grid-template-columns:minmax(0,180px) minmax(0,1fr);
  gap:2rem;
  padding:1.15rem 0;
  border-bottom:1px solid var(--rule);
  align-items:baseline;
}
.contact-row:last-child{border-bottom:0}
.contact-row dt{
  font-size:.68rem;
  font-weight:600;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--muted);
}
.contact-row dd{
  font-family:var(--serif);
  font-size:1.05rem;
  color:var(--ink);
  line-height:1.5;
}
.contact-row dd a{
  border-bottom:1px solid rgba(139,58,46,.4);
  padding-bottom:1px;
  transition:border-color .16s ease,color .16s ease;
}
.contact-row dd a:hover{color:var(--accent);border-bottom-color:var(--accent)}

/* ============================================================
   SUBSCRIBE / CTA
   ============================================================ */
.subscribe{
  padding:5rem 0;
  background:var(--paper-2);
  border-top:1px solid var(--rule);
}
.subscribe-inner{
  max-width:760px;
  margin:0 auto;
  text-align:center;
}
.subscribe-inner .kicker{display:block;margin-bottom:1.25rem}
.subscribe-inner h2{max-width:22ch;margin:0 auto 1.25rem}
.subscribe-inner p{
  font-size:1.02rem;
  color:var(--ink-3);
  max-width:56ch;
  margin:0 auto 2.5rem;
}
.subscribe-actions{
  display:flex;
  gap:2.5rem;
  justify-content:center;
  align-items:baseline;
  flex-wrap:wrap;
}
.subscribe-actions .link-lg{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent);
  border-bottom:1px solid var(--accent);
  padding-bottom:2px;
}
.subscribe-actions .link-lg:hover{color:var(--accent-2);border-bottom-color:var(--accent-2)}
.subscribe-actions .link-quiet{
  font-size:.82rem;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink-3);
  border-bottom:1px solid var(--rule-2);
  padding-bottom:2px;
}
.subscribe-actions .link-quiet:hover{color:var(--ink);border-bottom-color:var(--ink)}

/* ============================================================
   FOOTER
   ============================================================ */
.site-footer{
  background:var(--paper);
  border-top:1px solid var(--rule);
  padding:4rem 0 2rem;
  margin-top:auto;
}
.footer-grid{
  display:grid;
  grid-template-columns:minmax(0,1.6fr) 1fr 1fr 1.3fr;
  gap:3rem;
  padding-bottom:3rem;
  border-bottom:1px solid var(--rule);
}
.footer-brand .masthead-name{font-size:1.5rem}
.footer-brand p{
  font-size:.88rem;color:var(--muted);
  margin-top:1.15rem;max-width:38ch;line-height:1.7;
}
.footer-col h4{
  font-size:.68rem;font-weight:600;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);
  margin-bottom:1.25rem;
}
.footer-col li + li{margin-top:.65rem}
.footer-col a,.footer-col span{
  font-size:.88rem;color:var(--ink-3);line-height:1.6;
}
.footer-col a{border-bottom:1px solid transparent;transition:border-color .16s ease,color .16s ease}
.footer-col a:hover{color:var(--accent);border-bottom-color:rgba(139,58,46,.4)}
.footer-bottom{
  padding-top:1.75rem;
  display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  font-size:.78rem;color:var(--muted);letter-spacing:.02em;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width:1080px){
  .reading-grid{grid-template-columns:1fr;gap:2.5rem}
  .toc{position:static;padding-top:0}
  .toc ol{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:0 2rem;
  }
  .footer-grid{grid-template-columns:1fr 1fr;gap:2.5rem}
  .doc-meta{grid-template-columns:repeat(2,1fr);gap:1.5rem}
}

@media (max-width:900px){
  .nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--surface);border:1px solid var(--rule);border-top:0;padding:0}
  .nav a{padding:1rem 1.5rem;border-bottom:1px solid var(--rule);font-size:.82rem}
  .nav a:last-child{border-bottom:0}
  .burger{display:flex}
  .nav-toggle:checked ~ .nav-bar-inner .nav{display:flex}
}

@media (max-width:780px){
  .doc-meta{grid-template-columns:1fr 1fr}
  .doc-body h2{grid-template-columns:2.25rem 1fr;gap:.75rem}
  .doc-body h3{grid-template-columns:2.25rem 1fr;gap:.75rem}
  .sec-num{font-size:1.15rem}
  .doc-terms > div{grid-template-columns:1fr;gap:.35rem;padding:1.1rem 0}
  .contact-row{grid-template-columns:1fr;gap:.35rem;padding:1rem 0}
}

@media (max-width:680px){
  .section{padding:3.5rem 0}
  .section-tight{padding:2.25rem 0}
  .header-top{display:none}
  .header-main{padding:1.25rem 0}
  .masthead-name{font-size:1.5rem}
  .header-contact{text-align:left;width:100%}
  .doc-hero{padding:3rem 0 2.5rem}
  .doc-meta{grid-template-columns:1fr}
  .toc ol{grid-template-columns:1fr}
  .reading{padding:3rem 0 3.5rem}
  .footer-grid{grid-template-columns:1fr;gap:2rem}
  .footer-bottom{flex-direction:column;text-align:center}
  .doc-pull p{font-size:1.1rem}
}

@media (max-width:520px){
  body{font-size:16px}
  .container,.container-narrow{padding-inline:1.15rem}
  .doc-hero h1{font-size:1.95rem}
  .doc-hero .subhead{font-size:1.08rem}
  .doc-body h2{grid-template-columns:1fr;gap:.35rem}
  .doc-body h3{grid-template-columns:1fr;gap:.35rem}
  .subscribe-actions{flex-direction:column;gap:1.25rem}
}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none !important;animation:none !important}
}
</style>
</head>
<body>

<!-- ================= HEADER ================= -->
<header class="site-header">

  <div class="header-top">
    <div class="container header-top-inner">
      <span>Vol. XII <span class="dot"></span> Property Management &amp; Leasing</span>
      <span>City Center <span class="dot"></span> Est. 2012</span>
      <span>Issue No. 248 <span class="dot"></span> March 2025</span>
    </div>
  </div>

  <div class="header-main">
    <div class="container header-main-inner">
      <a href="/" class="masthead">
        <span class="masthead-name">Premier <em>Property</em> Management</span>
        <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
      </a>

      <div class="header-contact">
        <a href="mailto:legal@premierpm.example">legal@premierpm.example</a><br>
        <a href="tel:+15550123456">(555) 012-3456</a>
      </div>
    </div>
  </div>

  <div class="nav-bar">
    <div class="container nav-bar-inner">
      <input type="checkbox" id="nav-toggle" class="nav-toggle">
      <nav class="nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/c/about">About</a>
        <a href="/c/contact">Contact</a>
        <a href="/c/policy">Privacy</a>
        <a href="/c/terms" aria-current="page">Terms</a>
      </nav>

      <a href="/c/contact" class="nav-cta">Contact Us →</a>

      <label for="nav-toggle" class="burger" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </label>
    </div>
  </div>

</header>

<main>

  <!-- ================= DOCUMENT HERO ================= -->
  <section class="doc-hero">
    <div class="container">
      <div class="doc-hero-inner">

        <span class="kicker"><span class="dot"></span>Legal Document <span style="margin-left:.6rem;color:var(--muted);letter-spacing:.14em">· Policy No. 02</span></span>

        <h1>Terms of Service</h1>

        <p class="subhead">
          The agreement that governs your use of the PremierPM website and tenant portal, the
          handling of rental applications and holding fees, the accuracy of our listings, and the
          limits of our liability for property upkeep reporting.
        </p>

        <dl class="doc-meta">
          <div>
            <dt>Effective Date</dt>
            <dd>March 1, 2025</dd>
          </div>
          <div>
            <dt>Last Reviewed</dt>
            <dd>March 1, 2025</dd>
          </div>
          <div>
            <dt>Document Code</dt>
            <dd>PM-TERMS-02</dd>
          </div>
          <div>
            <dt>Applies To</dt>
            <dd>Website, tenant portal, applications, and all managed properties</dd>
          </div>
        </dl>

      </div>
    </div>
  </section>

  <!-- ================= READING LAYOUT ================= -->
  <section class="reading">
    <div class="container">
      <div class="reading-grid">

        <!-- Sticky table of contents -->
        <aside class="toc" aria-label="Table of contents">
          <span class="kicker quiet">Contents</span>
          <ol>
            <li><a href="#s1"><span class="toc-num">1.</span><span>Acceptance of Terms</span></a></li>
            <li><a href="#s2"><span class="toc-num">2.</span><span>Portal Usage Agreement</span></a></li>
            <li><a href="#s3"><span class="toc-num">3.</span><span>Application &amp; Holding Fees</span></a></li>
            <li><a href="#s4"><span class="toc-num">4.</span><span>Listing Accuracy Disclaimer</span></a></li>
            <li><a href="#s5"><span class="toc-num">5.</span><span>Resident Conduct &amp; Property Rules</span></a></li>
            <li><a href="#s6"><span class="toc-num">6.</span><span>Limitation of Liability</span></a></li>
            <li><a href="#s7"><span class="toc-num">7.</span><span>Indemnification</span></a></li>
            <li><a href="#s8"><span class="toc-num">8.</span><span>Suspension &amp; Termination</span></a></li>
            <li><a href="#s9"><span class="toc-num">9.</span><span>Governing Law &amp; Disputes</span></a></li>
            <li><a href="#s10"><span class="toc-num">10.</span><span>Changes to These Terms</span></a></li>
          </ol>
        </aside>

        <!-- Document body -->
        <article class="doc-body">

          <!-- Preamble -->
          <section style="border-bottom:1px solid var(--rule);padding-bottom:2.5rem;margin-bottom:3rem">
            <p style="font-size:1.05rem">
              These Terms of Service ("Terms") form a binding agreement between you and Premier
              Property Management ("PremierPM", "we", "us"). They apply to anyone who visits our
              website, submits a rental application, uses the tenant portal, or occupies a unit in
              a building we manage.
            </p>
            <p>
              Please read them carefully. If you do not agree with any part of these Terms, do not
              use the portal or submit an application. Where a signed lease or a separate written
              management agreement conflicts with these Terms, the signed lease or agreement
              controls for the specific matter it addresses.
            </p>
          </section>

          <!-- Section 1 -->
          <section id="s1">
            <h2>
              <span class="sec-num" aria-hidden="true">1.</span>
              <span class="sec-title">Acceptance of Terms</span>
            </h2>

            <p>
              By accessing our website, creating a portal account, submitting an application, or
              signing a lease for a managed property, you confirm that you have read, understood,
              and agreed to be bound by these Terms.
            </p>

            <p>
              These Terms fill the gaps that a signed lease or management agreement does not
              explicitly address. Where the two documents overlap on a specific matter, the signed
              lease or agreement controls that matter, and these Terms apply to everything else.
            </p>

            <div class="margin-note">
              <div class="note-label">If you do not agree</div>
              <p>
                If you do not accept these Terms, do not create a portal account, submit an
                application, or sign a lease. You can still browse listings and contact our
                leasing office by phone or email without accepting them.
              </p>
            </div>
          </section>

          <!-- Section 2 -->
          <section id="s2">
            <h2>
              <span class="sec-num" aria-hidden="true">2.</span>
              <span class="sec-title">Portal Usage Agreement</span>
            </h2>

            <p>
              The PremierPM tenant portal lets residents pay rent, submit maintenance requests,
              view documents, and manage their lease. Access is granted to verified residents and
              authorized applicants only.
            </p>

            <h3><span class="sub-num">2.1</span><span>Your account</span></h3>
            <ul>
              <li>You must provide accurate, current information when registering.</li>
              <li>You are responsible for keeping your password confidential and for all activity under your account.</li>
              <li>You must notify us immediately if you suspect unauthorized access.</li>
              <li>Accounts are personal. Do not share your login with anyone outside your household.</li>
            </ul>

            <h3><span class="sub-num">2.2</span><span>Acceptable use</span></h3>
            <ul>
              <li>Do not attempt to access accounts, units, or records that do not belong to you.</li>
              <li>Do not scrape, crawl, or bulk-download portal content.</li>
              <li>Do not upload files containing malware or attempt to compromise portal security.</li>
              <li>Do not use the portal to harass staff, other residents, or vendors.</li>
            </ul>

            <h3><span class="sub-num">2.3</span><span>Service availability</span></h3>
            <p>
              We aim to keep the portal available at all times, but we do not guarantee
              uninterrupted access. Scheduled maintenance is announced in advance. Emergency
              maintenance may occur without notice.
            </p>
            <p>
              Rent is still due on its scheduled date even if the portal is briefly unavailable.
              If you cannot access the portal on a payment date, call the office and we will
              arrange an alternative.
            </p>
          </section>

          <!-- Section 3 -->
          <section id="s3">
            <h2>
              <span class="sec-num" aria-hidden="true">3.</span>
              <span class="sec-title">Application &amp; Holding Fee Terms</span>
            </h2>

            <p>
              Before you submit an application, review the fee terms below. They are strict and
              applied consistently to every applicant.
            </p>

            <dl class="doc-terms">
              <div>
                <dt>Application fee — non-refundable</dt>
                <dd>Every adult applicant pays a non-refundable application fee to cover the cost of credit, background, and rental history screening. This fee is not refunded whether your application is approved or denied.</dd>
              </div>
              <div>
                <dt>Holding fee — conditionally applied</dt>
                <dd>A holding fee may be required to take a unit off the market while your application is processed and your lease is prepared. If you sign the lease, the holding fee is applied to your first month's rent. If you fail to sign within the agreed window, the holding fee is forfeited, except where local law requires a refund.</dd>
              </div>
              <div>
                <dt>Security deposit — separate from fees</dt>
                <dd>A security deposit is collected at lease signing and held according to state and local law. It is not the same as the holding fee and is not applied to rent.</dd>
              </div>
              <div>
                <dt>Processing timeline</dt>
                <dd>Applications are typically reviewed within two to three business days, depending on how quickly your references and screening partners respond.</dd>
              </div>
            </dl>

            <div class="margin-note">
              <div class="note-label">Non-refundable means non-refundable</div>
              <p>
                The application fee is not returned if you are approved and change your mind, and
                it is not returned if you are denied for any reason. It pays for the screening
                work we commission before we can make any decision.
              </p>
            </div>

            <h3><span class="sub-num">3.1</span><span>What we screen for</span></h3>
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
          </section>

          <!-- Section 4 -->
          <section id="s4">
            <h2>
              <span class="sec-num" aria-hidden="true">4.</span>
              <span class="sec-title">Listing Accuracy Disclaimer</span>
            </h2>

            <p>
              We work hard to keep our listings current and accurate. Even so, listings change
              quickly and mistakes happen.
            </p>

            <h3><span class="sub-num">4.1</span><span>Availability &amp; pricing</span></h3>
            <ul>
              <li><strong>Availability</strong> — a unit shown as available may be placed under application or taken off the market at any time.</li>
              <li><strong>Pricing</strong> — advertised rent is subject to change until a lease is signed. Concessions and specials have their own terms and expiration dates.</li>
            </ul>

            <h3><span class="sub-num">4.2</span><span>Measurements &amp; amenities</span></h3>
            <ul>
              <li><strong>Measurements</strong> — square footage, room dimensions, and lot sizes are approximate and may vary from unit to unit within the same floor plan.</li>
              <li><strong>Amenities</strong> — amenities shown may be available in some buildings but not others, and building services can be temporarily unavailable for repairs or seasonal closures.</li>
              <li><strong>Images</strong> — photographs and floor plans are for illustration and may show a model unit, not the exact unit you will lease.</li>
            </ul>

            <p>
              We encourage every prospective resident to tour the specific unit they intend to rent
              and to confirm all details in writing before signing a lease. Nothing on the website
              constitutes an offer to lease.
            </p>

            <div class="doc-pull">
              <p>“A listing is an invitation to look. It is not a promise of what the unit will be.”</p>
            </div>
          </section>

          <!-- Section 5 -->
          <section id="s5">
            <h2>
              <span class="sec-num" aria-hidden="true">5.</span>
              <span class="sec-title">Resident Conduct &amp; Property Rules</span>
            </h2>

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
          </section>

          <!-- Section 6 -->
          <section id="s6">
            <h2>
              <span class="sec-num" aria-hidden="true">6.</span>
              <span class="sec-title">Limitation of Liability</span>
            </h2>

            <p>
              To the fullest extent permitted by law, PremierPM is not liable for indirect,
              incidental, special, or consequential damages arising from your use of the website,
              the portal, or our management services.
            </p>

            <h3><span class="sub-num">6.1</span><span>Property upkeep reporting</span></h3>
            <p>
              Residents are responsible for reporting maintenance issues in a timely and accurate
              manner. We are not liable for damage that results from a maintenance issue you failed
              to report, or from a delay caused by a vendor's schedule that is beyond our
              reasonable control.
            </p>

            <p>
              We are also not liable for service interruptions to utilities, internet, or building
              systems caused by third-party providers, severe weather, or other events outside our
              control.
            </p>

            <h3><span class="sub-num">6.2</span><span>Cap on liability</span></h3>
            <p>
              Where liability cannot be excluded entirely, our total liability to you for any claim
              arising out of these Terms or your tenancy is limited to the total amount of rent you
              have paid to us in the twelve months preceding the event giving rise to the claim.
            </p>

            <div class="margin-note">
              <div class="note-label">Statutory rights preserved</div>
              <p>
                Nothing in these Terms limits rights you hold under applicable landlord-tenant law,
                fair housing law, or consumer protection law that cannot be waived by contract.
              </p>
            </div>
          </section>

          <!-- Section 7 -->
          <section id="s7">
            <h2>
              <span class="sec-num" aria-hidden="true">7.</span>
              <span class="sec-title">Indemnification</span>
            </h2>

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
          </section>

          <!-- Section 8 -->
          <section id="s8">
            <h2>
              <span class="sec-num" aria-hidden="true">8.</span>
              <span class="sec-title">Suspension &amp; Termination</span>
            </h2>

            <p>
              We may suspend or terminate portal access if you breach these Terms, if your account
              shows signs of compromise, or if continuing access would create a security or legal
              risk.
            </p>

            <h3><span class="sub-num">8.1</span><span>Effect on your lease</span></h3>
            <p>
              Terminating portal access does not terminate your lease. Rent obligations,
              maintenance reporting duties, and all other lease terms remain in effect. Where
              possible, we will provide an alternative method for you to pay rent and submit
              maintenance requests.
            </p>

            <h3><span class="sub-num">8.2</span><span>Closing your own account</span></h3>
            <p>
              You may close your portal account at any time by contacting the leasing office. Some
              records are retained after closure as described in our
              <a href="/c/policy" class="link">Privacy Policy</a>.
            </p>
          </section>

          <!-- Section 9 -->
          <section id="s9">
            <h2>
              <span class="sec-num" aria-hidden="true">9.</span>
              <span class="sec-title">Governing Law &amp; Disputes</span>
            </h2>

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

            <div class="margin-note">
              <div class="note-label">Talk to us first</div>
              <p>
                Nearly every disagreement we have ever had with a resident was resolved by a phone
                call. If you are unsure how to reach the right person, our
                <a href="/c/contact" class="link">contact page</a> lists who handles what.
              </p>
            </div>
          </section>

          <!-- Section 10 -->
          <section id="s10">
            <h2>
              <span class="sec-num" aria-hidden="true">10.</span>
              <span class="sec-title">Changes to These Terms</span>
            </h2>

            <p>
              We may update these Terms from time to time to reflect changes in our services, in
              the law, or in how the portal operates.
            </p>

            <p>
              When we make a material change, we will update the effective date at the top of this
              page and post a notice in the tenant portal and in building common areas. Continued
              use of the portal or continued tenancy after the change takes effect constitutes
              acceptance of the updated Terms.
            </p>

            <p>
              If you do not agree with an update, you may stop using the portal. Your lease
              continues to be governed by its own terms, including any notice provisions it
              contains.
            </p>
          </section>

          <!-- End-of-document contact block -->
          <div class="doc-contact">
            <span class="kicker">Questions &amp; Requests</span>
            <h2>Contact our legal &amp; leasing team.</h2>
            <p>
              If anything in this document is unclear, or if you need a copy of the rental criteria
              or a sample lease before applying, reach us using the details below.
            </p>

            <dl class="contact-rows">
              <div class="contact-row">
                <dt>Email</dt>
                <dd><a href="mailto:legal@premierpm.example">legal@premierpm.example</a></dd>
              </div>
              <div class="contact-row">
                <dt>Phone</dt>
                <dd><a href="tel:+15550123456">(555) 012-3456</a> · Mon–Fri, 9:00 – 18:00</dd>
              </div>
              <div class="contact-row">
                <dt>Postal Address</dt>
                <dd>Premier Property Management<br>Attn: Legal<br>450 Harrison Avenue, Suite 12<br>City Center, ST 10024</dd>
              </div>
              <div class="contact-row">
                <dt>Rental Criteria</dt>
                <dd>Available on request · <a href="mailto:leasing@premierpm.example">leasing@premierpm.example</a></dd>
              </div>
              <div class="contact-row">
                <dt>Related Documents</dt>
                <dd>
                  <a href="/c/policy" class="xref">Privacy Policy</a> ·
                  <a href="/c/contact" class="xref">Contact the Leasing Office</a>
                </dd>
              </div>
            </dl>
          </div>

        </article>

      </div>
    </div>
  </section>

  <!-- ================= CTA ================= -->
  <section class="subscribe">
    <div class="container-narrow">
      <div class="subscribe-inner">
        <span class="kicker">Related Document</span>
        <h2>How we handle the personal data behind every application.</h2>
        <p>
          Our Privacy Policy covers screening documents, lease logs, rent records, and the rights
          you hold over your own information.
        </p>

        <div class="subscribe-actions">
          <a href="/c/policy" class="link-lg">Read the Privacy Policy →</a>
          <a href="/c/contact" class="link-quiet">Contact Us</a>
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
        <a href="/" class="masthead">
          <span class="masthead-name">Premier <em>Property</em> Management</span>
          <span class="masthead-tag">Transparent leasing · Well-kept homes · The metro since 2012</span>
        </a>
        <p>
          Property management and leasing for the modern city. We look after more than 250
          residential units with the same attention to detail you would want in your own home.
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
          <li><a href="mailto:legal@premierpm.example">legal@premierpm.example</a></li>
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