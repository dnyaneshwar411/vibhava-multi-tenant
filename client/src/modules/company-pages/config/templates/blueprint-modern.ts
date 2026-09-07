export const BlueprintModernLanding = {
  name: 'BlueprintModernLanding',
  component: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PrimeLease — Institutional Asset & Property Operations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0F172A;
      --accent: #2563EB;
      --accent-hover: #1D4ED8;
      --bg-light: #F8FAFC;
      --bg-white: #FFFFFF;
      --border-color: #E2E8F0;
      --text-dark: #1E293B;
      --text-muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
    
    /* Utility Styles */
    .section { padding: 100px 0; border-bottom: 2px solid var(--border-color); }
    .section-dark { background: var(--primary); color: var(--bg-light); border-bottom: none; }
    .section-title { font-size: 2.25rem; font-weight: 800; color: var(--primary); letter-spacing: -0.03em; margin-bottom: 16px; text-transform: uppercase; }
    .section-title-light { color: var(--bg-white); }
    .section-desc { font-size: 1.125rem; color: var(--text-muted); max-width: 640px; margin-bottom: 60px; }
    .section-desc-light { color: #94A3B8; }
    .grid { display: grid; gap: 32px; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
    
    /* Button Styles */
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 14px 28px; background: var(--primary); color: var(--bg-white); font-weight: 600; font-size: 0.875rem; text-decoration: none; border: 2px solid var(--primary); border-radius: 4px; transition: all 0.2s ease; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; }
    .btn:hover { background: var(--text-dark); border-color: var(--text-dark); }
    .btn-accent { background: var(--accent); border-color: var(--accent); }
    .btn-accent:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
    .btn-outline { background: transparent; color: var(--primary); border: 2px solid var(--primary); }
    .btn-outline:hover { background: var(--primary); color: var(--bg-white); }
    .btn-light { background: var(--bg-white); color: var(--primary); border-color: var(--bg-white); }
    .btn-light:hover { background: var(--bg-light); }

    /* Structural Components */
    header { border-bottom: 2px solid var(--border-color); background: var(--bg-white); padding: 24px 0; position: sticky; top: 0; z-index: 1000; }
    .nav { display: flex; justify-content: space-between; align-items: center; }
    .logo-container { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .logo-box { width: 32px; height: 32px; background: var(--primary); border: 2px solid var(--accent); }
    .logo-text { font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: -0.04em; }
    .nav-links { display: flex; gap: 40px; list-style: none; }
    .nav-links a { text-decoration: none; color: var(--text-dark); font-weight: 600; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; transition: color 0.2s; }
    .nav-links a:hover { color: var(--accent); }
    
    /* Hero Section */
    .hero { padding: 140px 0 100px 0; background: var(--bg-white); border-bottom: 2px solid var(--border-color); }
    .hero-h1 { font-size: 4.5rem; font-weight: 800; color: var(--primary); line-height: 1.05; letter-spacing: -0.04em; margin-bottom: 24px; text-transform: uppercase; }
    .hero-p { font-size: 1.35rem; color: var(--text-muted); max-width: 740px; margin-bottom: 48px; }
    .hero-actions { display: flex; gap: 16px; }

    /* Client Trust / Logos */
    .logos-grid { display: flex; justify-content: space-between; align-items: center; opacity: 0.6; filter: grayscale(100%); padding: 40px 0; border-bottom: 2px solid var(--border-color); background: var(--bg-white); }
    .logo-item { font-size: 1.125rem; font-weight: 700; color: var(--text-dark); letter-spacing: 0.1em; text-transform: uppercase; }

    /* Core Mission */
    .mission-box { border-left: 6px solid var(--accent); padding-left: 40px; margin: 40px 0; }
    .mission-quote { font-size: 1.85rem; font-weight: 600; color: var(--primary); font-style: italic; }

    /* Stat Grid */
    .stat-card { border: 2px solid var(--border-color); padding: 40px; background: var(--bg-white); text-align: center; border-radius: 4px; }
    .stat-num { font-size: 3.5rem; font-weight: 800; color: var(--accent); line-height: 1; margin-bottom: 12px; }
    .stat-label { font-size: 0.875rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; }

    /* Features Grid */
    .feature-card { border: 2px solid var(--border-color); padding: 40px; background: var(--bg-white); border-radius: 4px; transition: border-color 0.2s; }
    .feature-card:hover { border-color: var(--accent); }
    .feature-icon { width: 48px; height: 48px; background: var(--bg-light); border: 2px solid var(--border-color); margin-bottom: 24px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--accent); }
    .feature-card h3 { font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-bottom: 16px; text-transform: uppercase; }

    /* Interface Mock */
    .interface-mock { border: 2px solid var(--primary); background: var(--bg-white); border-radius: 4px; overflow: hidden; box-shadow: 8px 8px 0px 0px var(--primary); }
    .mock-header { background: var(--primary); color: var(--bg-light); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
    .mock-body { padding: 32px; }
    .mock-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-color); font-size: 0.875rem; }
    .mock-row:last-child { border-bottom: none; }
    .badge-paid { background: #DCFCE7; color: #15803D; padding: 4px 8px; font-weight: 700; font-size: 0.75rem; border-radius: 4px; }

    /* Pricing Plans */
    .pricing-card { border: 2px solid var(--primary); background: var(--bg-white); padding: 48px; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; }
    .pricing-card.premium { box-shadow: 8px 8px 0px 0px var(--accent); border-color: var(--accent); }
    .pricing-tier { font-size: 1rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .pricing-price { font-size: 3.5rem; font-weight: 800; color: var(--primary); margin-bottom: 24px; }
    .pricing-features { list-style: none; margin-bottom: 40px; }
    .pricing-features li { padding: 12px 0; border-bottom: 1px solid var(--border-color); font-size: 0.875rem; font-weight: 500; display: flex; align-items: center; gap: 12px; }

    /* FAQ System */
    .faq-item { border: 2px solid var(--border-color); background: var(--bg-white); padding: 32px; border-radius: 4px; margin-bottom: 16px; }
    .faq-q { font-size: 1.125rem; font-weight: 700; color: var(--primary); margin-bottom: 12px; text-transform: uppercase; }

    /* Footer structure */
    footer { background: var(--primary); color: var(--bg-light); padding: 80px 0 40px 0; }
    .footer-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 40px; margin-bottom: 60px; }
    .footer-col h4 { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--bg-white); margin-bottom: 24px; }
    .footer-links { list-style: none; }
    .footer-links li { margin-bottom: 12px; }
    .footer-links a { color: #94A3B8; text-decoration: none; font-size: 0.875rem; transition: color 0.2s; }
    .footer-links a:hover { color: var(--bg-white); }
  </style>
</head>
<body>

  <!-- Section 1: Header/Navbar -->
  <header>
    <div class="container nav">
      <a href="#" class="logo-container">
        <div class="logo-box"></div>
        <span class="logo-text">PRIMELEASE</span>
      </a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#solutions">Solutions</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <a href="#portal" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.75rem;">Portal Login</a>
    </div>
  </header>

  <!-- Section 2: Hero Section -->
  <section class="hero">
    <div class="container">
      <h1 class="hero-h1">Institutional Grade<br>Asset Operations</h1>
      <p class="hero-p">High-contrast, robust structural workflows designed for commercial property managers, institutional developers, and complex leasing portfolios.</p>
      <div class="hero-actions">
        <a href="#pricing" class="btn btn-accent">Initialize Portfolio</a>
        <a href="#features" class="btn btn-outline">Explore Capabilities</a>
      </div>
    </div>
  </section>

  <!-- Section 3: Logos / Institutional Trust -->
  <section class="container logos-grid">
    <span class="logo-item">Apex Holdings</span>
    <span class="logo-item">Summit Group</span>
    <span class="logo-item">Vanguard Trust</span>
    <span class="logo-item">Sovereign Capital</span>
  </section>

  <!-- Section 4: Core Philosophy / Bold Quote -->
  <section class="section">
    <div class="container">
      <div class="mission-box">
        <p class="mission-quote">"Modern real estate asset management is not defined by complexity, but by the rigidity of its structural alignment and data integrity."</p>
      </div>
    </div>
  </section>

  <!-- Section 5: Structural Stat Grid -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">Performance at Scale</h2>
      <p class="section-desc">Reliable operational benchmarks across our global institutional tenant network.</p>
      <div class="grid grid-4">
        <div class="stat-card">
          <div class="stat-num">$2.4B</div>
          <div class="stat-label">Assets Managed</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">12.4M</div>
          <div class="stat-label">Sq. Footage</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">99.8%</div>
          <div class="stat-label">Collection Rate</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">&lt;24h</div>
          <div class="stat-label">Lease Turnaround</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 6: Key Operational Modules -->
  <section id="features" class="section">
    <div class="container">
      <h2 class="section-title">Operational Excellence</h2>
      <p class="section-desc">Strict, high-density modules constructed to eliminate administrative overhead.</p>
      <div class="grid grid-3">
        <div class="feature-card">
          <div class="feature-icon">01</div>
          <h3>Auto-Leasing Flow</h3>
          <p>Automate tenant application, structural screening, credit underwriting, and e-signatures in a single rigid pipeline.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">02</div>
          <h3>Ledger Invoicing</h3>
          <p>Institutional multi-ledger double entry ledger management to sync rent rolls to General Ledgers instantly.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">03</div>
          <h3>Dynamic Escrow</h3>
          <p>Strict structural separation of security deposits, interest-bearing escrows, and operating capital.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 7: Deep Dive Interface Mock -->
  <section class="section">
    <div class="container grid grid-2" style="align-items: center;">
      <div>
        <h2 class="section-title">Real-Time Rent Rolls</h2>
        <p class="section-desc">Monitor operational cashflow directly on a high-density, real-time double entry ledger designed for financial audit compliance.</p>
        <a href="#pricing" class="btn btn-accent">Deploy Ledger System</a>
      </div>
      <div class="interface-mock">
        <div class="mock-header">
          <span>Active Ledger: Vanguard Core III</span>
          <span>Settle Status</span>
        </div>
        <div class="mock-body">
          <div class="mock-row">
            <span>Tenant: Apex Retail Ltd</span>
            <span>$14,500.00</span>
            <span class="badge-paid">SETTLED</span>
          </div>
          <div class="mock-row">
            <span>Tenant: Sentinel BioTech</span>
            <span>$28,200.00</span>
            <span class="badge-paid">SETTLED</span>
          </div>
          <div class="mock-row">
            <span>Tenant: Beacon Logistics</span>
            <span>$41,000.00</span>
            <span class="badge-paid">SETTLED</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 8: Pricing Architecture -->
  <section id="pricing" class="section">
    <div class="container">
      <h2 class="section-title">Transparent Pricing</h2>
      <p class="section-desc">Predictable scale pricing designed to fit corporate property models with zero hidden usage fees.</p>
      <div class="grid grid-2">
        <div class="pricing-card">
          <div>
            <div class="pricing-tier">Professional Tier</div>
            <div class="pricing-price">$149<span style="font-size: 1rem; color: var(--text-muted);"> / mo</span></div>
            <ul class="pricing-features">
              <li>Up to 150 Active Tenant Records</li>
              <li>Dual-Entry Ledger Architecture</li>
              <li>Basic On-Demand ISR Client Pages</li>
            </ul>
          </div>
          <a href="#" class="btn btn-outline" style="width: 100%;">Deploy Standard Workspace</a>
        </div>
        <div class="pricing-card premium">
          <div>
            <div class="pricing-tier">Enterprise Infrastructure</div>
            <div class="pricing-price">$499<span style="font-size: 1rem; color: var(--text-muted);"> / mo</span></div>
            <ul class="pricing-features">
              <li>Unlimited Tenant Records</li>
              <li>Audit-Ready General Ledger Sync</li>
              <li>Dedicated CDN Host & Page Delivery</li>
            </ul>
          </div>
          <a href="#" class="btn btn-accent" style="width: 100%;">Provision Enterprise</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 9: Security Banner -->
  <section class="section section-dark">
    <div class="container text-center" style="text-align: center;">
      <h2 class="section-title section-title-light">Sovereign Audit Reliability</h2>
      <p class="section-desc section-desc-light" style="margin-left: auto; margin-right: auto;">Our systems strictly conform to SOC2, Type II specifications. Security deposits and transactional logs are cryptographically sealed and isolated at the physical layer.</p>
      <div class="btn btn-light">View Security Whitepaper</div>
    </div>
  </section>

  <!-- Section 10: FAQ -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">Operational FAQ</h2>
      <p class="section-desc">Frequently asked queries regarding institutional leasing operations.</p>
      <div class="faq-item">
        <h3 class="faq-q">Can we connect custom banking lines?</h3>
        <p>Yes. Our enterprise tier natively connects Plaid Core protocols and direct ACH settlement lines directly within GrapesJS templates.</p>
      </div>
      <div class="faq-item">
        <h3 class="faq-q">How does tenant cache invalidation work?</h3>
        <p>When tenant assets or lease details are edited, GrapesJS dispatches instant webhooks to revalidate edge CDN caches globally within 50ms.</p>
      </div>
    </div>
  </section>

  <!-- Section 11: Main Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="#" class="logo-container" style="margin-bottom: 24px;">
            <div class="logo-box" style="background: var(--bg-white);"></div>
            <span class="logo-text" style="color: var(--bg-white);">PRIMELEASE</span>
          </a>
          <p style="color: #94A3B8; font-size: 0.875rem;">Institutional property management software engineered for clarity, structural isolation, and optimal asset performance.</p>
        </div>
        <div>
          <h4>Capabilities</h4>
          <ul class="footer-links">
            <li><a href="#">Ledger Sync</a></li>
            <li><a href="#">Tenant Portals</a></li>
            <li><a href="#">ACH Invoicing</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul class="footer-links">
            <li><a href="#">SLA Assurances</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Compliance</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul class="footer-links">
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-conditions">Terms of Use</a></li>
          </ul>
        </div>
      </div>
      <div style="border-top: 1px solid #334155; padding-top: 32px; font-size: 0.75rem; color: #64748B; display: flex; justify-content: space-between;">
        <span>© 2026 PrimeLease Inc. All rights reserved.</span>
        <span>Designed with precision & institutional structure.</span>
      </div>
    </div>
  </footer>

</body>
</html>`
};

export const BlueprintModernAbout = {
  name: 'BlueprintModernAbout',
  component: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About | PrimeLease — Institutional Asset Operations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0F172A;
      --accent: #2563EB;
      --bg-light: #F8FAFC;
      --bg-white: #FFFFFF;
      --border-color: #E2E8F0;
      --text-dark: #1E293B;
      --text-muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
    header { border-bottom: 2px solid var(--border-color); background: var(--bg-white); padding: 24px 0; }
    .nav { display: flex; justify-content: space-between; align-items: center; }
    .logo-container { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .logo-box { width: 32px; height: 32px; background: var(--primary); border: 2px solid var(--accent); }
    .logo-text { font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: -0.04em; }
    
    .section { padding: 100px 0; border-bottom: 2px solid var(--border-color); }
    .section-title { font-size: 2.25rem; font-weight: 800; color: var(--primary); letter-spacing: -0.03em; margin-bottom: 24px; text-transform: uppercase; }
    .section-desc { font-size: 1.125rem; color: var(--text-muted); max-width: 800px; margin-bottom: 48px; }
    
    .grid { display: grid; gap: 32px; }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .card { border: 2px solid var(--border-color); padding: 40px; background: var(--bg-white); border-radius: 4px; }
    .card h3 { font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-bottom: 16px; text-transform: uppercase; }
    
    footer { background: var(--primary); color: var(--bg-light); padding: 80px 0 40px 0; }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <a href="/" class="logo-container">
        <div class="logo-box"></div>
        <span class="logo-text">PRIMELEASE</span>
      </a>
    </div>
  </header>

  <section class="section">
    <div class="container">
      <h1 class="section-title">Our Vision & Alignment</h1>
      <p class="section-desc">Founded with the single mission of optimizing institutional real estate portfolio operations, we eradicate friction points using precise system-wide data pipelines.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Operating Pillars</h2>
      <div class="grid grid-3">
        <div class="card">
          <h3>Uncompromising Integrity</h3>
          <p>We ensure clear ledger compliance and auditable transaction transparency across all managed assets.</p>
        </div>
        <div class="card">
          <h3>Operational Scale</h3>
          <p>Built to expand seamlessly with your portfolio from single regional properties to global institutional investments.</p>
        </div>
        <div class="card">
          <h3>Technological Rigor</h3>
          <p>High-contrast architectural layout control powered by sub-50ms edge cache invalidation pipelines.</p>
        </div>
      </div>
    </div>
  </section>
</body>
</html>`
};

export const BlueprintModernContact = {
  name: 'BlueprintModernContact',
  component: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact | PrimeLease — Institutional Asset Operations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0F172A;
      --accent: #2563EB;
      --bg-light: #F8FAFC;
      --bg-white: #FFFFFF;
      --border-color: #E2E8F0;
      --text-dark: #1E293B;
      --text-muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
    header { border-bottom: 2px solid var(--border-color); background: var(--bg-white); padding: 24px 0; }
    .nav { display: flex; justify-content: space-between; align-items: center; }
    .logo-container { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .logo-box { width: 32px; height: 32px; background: var(--primary); border: 2px solid var(--accent); }
    .logo-text { font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: -0.04em; }
    
    .section { padding: 100px 0; border-bottom: 2px solid var(--border-color); }
    .section-title { font-size: 2.25rem; font-weight: 800; color: var(--primary); letter-spacing: -0.03em; margin-bottom: 24px; text-transform: uppercase; }
    .section-desc { font-size: 1.125rem; color: var(--text-muted); max-width: 800px; margin-bottom: 48px; }
    
    .grid { display: grid; gap: 32px; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    
    form { display: flex; flex-direction: column; gap: 20px; background: var(--bg-white); padding: 48px; border: 2px solid var(--border-color); border-radius: 4px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-group label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary); }
    input, textarea { padding: 12px; border: 2px solid var(--border-color); border-radius: 4px; font-family: inherit; font-size: 0.875rem; }
    input:focus, textarea:focus { border-color: var(--accent); outline: none; }
    button { background: var(--accent); color: var(--bg-white); padding: 16px; border: none; font-weight: 700; cursor: pointer; text-transform: uppercase; border-radius: 4px; letter-spacing: 0.05em; }
    
    .contact-info { display: flex; flex-direction: column; gap: 32px; justify-content: center; }
    .info-block h3 { font-size: 1rem; font-weight: 700; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; }
    .info-block p { color: var(--text-muted); font-size: 0.95rem; }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <a href="/" class="logo-container">
        <div class="logo-box"></div>
        <span class="logo-text">PRIMELEASE</span>
      </a>
    </div>
  </header>

  <section class="section">
    <div class="container grid grid-2">
      <div class="contact-info">
        <div>
          <h1 class="section-title">Initiate Alignment</h1>
          <p class="section-desc">Reach out to our asset operations team for custom migration timelines and dedicated infrastructure setup.</p>
        </div>
        <div class="info-block">
          <h3>Institutional Support Desk</h3>
          <p>sla-support@primelease.com</p>
          <p>+1 (800) 555-0190</p>
        </div>
        <div class="info-block">
          <h3>Global Operations Center</h3>
          <p>100 Federal Street, 24th Floor</p>
          <p>Boston, MA 02110</p>
        </div>
      </div>
      <div>
        <form>
          <div class="form-group">
            <label>Institutional Name</label>
            <input type="text" placeholder="e.g. Sovereign Asset Management" required>
          </div>
          <div class="form-group">
            <label>Corporate Email</label>
            <input type="email" placeholder="e.g. operator@sovereign.com" required>
          </div>
          <div class="form-group">
            <label>Portfolio Scope (Estimated Sq. Footage)</label>
            <input type="text" placeholder="e.g. 5,000,000" required>
          </div>
          <div class="form-group">
            <label>Inquiry Scope</label>
            <textarea placeholder="Outline your migration requirements..." rows="5" required></textarea>
          </div>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  </section>
</body>
</html>`
};

export const BlueprintModernPrivacyPolicy = {
  name: 'BlueprintModernPrivacyPolicy',
  component: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy | PrimeLease — Institutional Asset Operations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0F172A;
      --accent: #2563EB;
      --bg-light: #F8FAFC;
      --bg-white: #FFFFFF;
      --border-color: #E2E8F0;
      --text-dark: #1E293B;
      --text-muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; padding: 80px 24px; }
    .content-box { background: var(--bg-white); border: 2px solid var(--border-color); padding: 60px; border-radius: 4px; }
    h1 { font-size: 2.25rem; font-weight: 800; color: var(--primary); margin-bottom: 24px; text-transform: uppercase; letter-spacing: -0.02em; }
    h2 { font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-top: 40px; margin-bottom: 16px; text-transform: uppercase; }
    p { margin-bottom: 20px; color: var(--text-dark); }
    ul { margin-bottom: 20px; padding-left: 20px; color: var(--text-muted); }
    li { margin-bottom: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content-box">
      <h1>Data Safeguard Standards</h1>
      <p>This privacy policy establishes our operational procedures under which we process, secure, and monitor all institutional portfolio, rent roll, and tenant verification records.</p>
      
      <h2>1. Physical & Architectural Separation</h2>
      <p>Data stored in PrimeLease databases is strictly separated using isolated JSON structures. Transaction logs are cryptographically sealed at rest and never combined across multiple hosting environments.</p>

      <h2>2. Financial & Routing Logs</h2>
      <p>Routing logs, escrow logs, and payment processing tokens stored in relation to Plaid ACH transactions are maintained on audit-ready files with strict operational access privileges.</p>
    </div>
  </div>
</body>
</html>`
};

export const BlueprintModernTermsConditions = {
  name: 'BlueprintModernTermsConditions',
  component: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms & Conditions | PrimeLease — Institutional Asset Operations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0F172A;
      --accent: #2563EB;
      --bg-light: #F8FAFC;
      --bg-white: #FFFFFF;
      --border-color: #E2E8F0;
      --text-dark: #1E293B;
      --text-muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; padding: 80px 24px; }
    .content-box { background: var(--bg-white); border: 2px solid var(--border-color); padding: 60px; border-radius: 4px; }
    h1 { font-size: 2.25rem; font-weight: 800; color: var(--primary); margin-bottom: 24px; text-transform: uppercase; letter-spacing: -0.02em; }
    h2 { font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-top: 40px; margin-bottom: 16px; text-transform: uppercase; }
    p { margin-bottom: 20px; color: var(--text-dark); }
  </style>
</head>
<body>
  <div class="container">
    <div class="content-box">
      <h1>Operational Governance</h1>
      <p>Please read these Terms of Service thoroughly before provisioning folders or managing dynamic subdomains on our edge infrastructure platforms.</p>
      
      <h2>1. Dynamic Subdomains & Routing</h2>
      <p>Institutional operators are assigned tenant subdomains resolved directly via middleware. Redistribution, leasing, or transferring routing structures without compliance checkups is strictly prohibited.</p>

      <h2>2. Ledger Alignment Liabilities</h2>
      <p>The operator holds full administrative liability for the accuracy of manual ledger adjustment lines entered within standard rent roll files.</p>
    </div>
  </div>
</body>
</html>`
};
