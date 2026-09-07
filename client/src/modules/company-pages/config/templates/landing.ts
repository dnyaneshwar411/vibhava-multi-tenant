export const template1 = {
  name: 'Landing',
  component: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aura — Minimalist Multi-Tenant Infrastructure</title>
    <meta name="description" content="An elegant, subtle framework for running tenant-isolated pages at global scale." />
    
    <!-- Google Fonts: Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

    <style>
      :root {
        --bg-main: #08090a;
        --bg-surface: #0f1115;
        --bg-surface-elevated: #161920;
        --border-subtle: rgba(255, 255, 255, 0.07);
        --border-glow: rgba(255, 255, 255, 0.15);
        --text-primary: #f1f5f9;
        --text-secondary: #8d96a0;
        --text-muted: #525866;
        --accent-glow: radial-gradient(circle at 50% 0%, rgba(120, 119, 198, 0.12) 0%, rgba(8, 9, 10, 0) 70%);
      }

      * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
      body { background-color: var(--bg-main); color: var(--text-primary); line-height: 1.7; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
      .text-center { text-align: center; }

      /* Subtitle Badge */
      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-subtle);
        border-radius: 100px;
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--text-secondary);
        margin-bottom: 28px;
      }
      .eyebrow-dot { width: 6px; height: 6px; background-color: #a78bfa; border-radius: 50%; box-shadow: 0 0 10px #a78bfa; }

      /* Buttons */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 28px;
        border-radius: 10px;
        font-size: 0.925rem;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
      }
      .btn-primary {
        background: #ffffff;
        color: #000000;
      }
      .btn-primary:hover {
        background: #e2e8f0;
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -10px rgba(255, 255, 255, 0.3);
      }
      .btn-ghost {
        background: rgba(255, 255, 255, 0.03);
        color: var(--text-primary);
        border: 1px solid var(--border-subtle);
      }
      .btn-ghost:hover {
        background: rgba(255, 255, 255, 0.07);
        border-color: var(--border-glow);
        transform: translateY(-2px);
      }

      /* 1. Header Navigation */
      .nav-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(8, 9, 10, 0.7);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-subtle);
      }
      .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 84px;
      }
      .brand-logo {
        font-size: 1.15rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: #ffffff;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .brand-mark { width: 10px; height: 10px; background: #ffffff; border-radius: 2px; }
      .nav-menu { display: flex; gap: 36px; list-style: none; }
      .nav-menu a { color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; font-weight: 400; transition: color 0.2s; }
      .nav-menu a:hover { color: #ffffff; }

      /* 2. Hero Section */
      .hero {
        padding: 160px 0 120px 0;
        background: var(--accent-glow);
      }
      .hero-heading {
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.08;
        letter-spacing: -0.03em;
        margin-bottom: 24px;
        color: #ffffff;
      }
      .hero-subtext {
        font-size: 1.25rem;
        color: var(--text-secondary);
        font-weight: 300;
        max-width: 640px;
        margin: 0 auto 48px auto;
      }
      .hero-actions { display: flex; gap: 16px; justify-content: center; }

      /* 3. Social Proof / Metrics */
      .metrics-section {
        padding: 60px 0;
        border-top: 1px solid var(--border-subtle);
        border-bottom: 1px solid var(--border-subtle);
        background: var(--bg-surface);
      }
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
        text-align: center;
      }
      .metric-number { font-size: 2.5rem; font-weight: 300; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 4px; }
      .metric-label { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }

      /* 4. Architecture Section */
      .section-padding { padding: 140px 0; }
      .section-header { max-width: 600px; margin: 0 auto 80px auto; text-align: center; }
      .section-title { font-size: 2.25rem; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 16px; }
      .section-desc { color: var(--text-secondary); font-weight: 300; font-size: 1.05rem; }

      .arch-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
      .arch-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        padding: 40px;
        border-radius: 16px;
        transition: all 0.3s;
      }
      .arch-card:hover { border-color: var(--border-glow); background: var(--bg-surface-elevated); }
      .arch-number { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px; font-weight: 500; }
      .arch-card h3 { font-size: 1.25rem; font-weight: 500; margin-bottom: 12px; color: #ffffff; }
      .arch-card p { color: var(--text-secondary); font-size: 0.95rem; font-weight: 300; line-height: 1.6; }

      /* 5. Highlight Feature Showcase */
      .showcase-container {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        padding: 80px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
      }
      .showcase-content h3 { font-size: 2rem; font-weight: 500; margin-bottom: 20px; letter-spacing: -0.02em; }
      .showcase-content p { color: var(--text-secondary); font-weight: 300; margin-bottom: 32px; font-size: 1.05rem; }
      .feature-list { list-style: none; display: flex; flex-direction: column; gap: 16px; }
      .feature-item { display: flex; align-items: center; gap: 12px; color: var(--text-secondary); font-size: 0.95rem; }
      .feature-check { width: 18px; height: 18px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #a78bfa; }
      
      .code-preview {
        background: #000000;
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        padding: 28px;
        font-family: monospace;
        font-size: 0.85rem;
        color: #94a3b8;
        line-height: 1.8;
      }
      .code-keyword { color: #c084fc; }
      .code-string { color: #34d399; }

      /* 6. Minimal Pricing */
      .pricing-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 900px; margin: 0 auto; }
      .price-card {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        padding: 48px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .price-card.featured { border-color: rgba(167, 139, 250, 0.4); background: rgba(167, 139, 250, 0.02); }
      .price-title { font-size: 1.1rem; font-weight: 500; margin-bottom: 8px; }
      .price-amount { font-size: 3rem; font-weight: 300; color: #ffffff; margin-bottom: 16px; letter-spacing: -0.03em; }
      .price-desc { color: var(--text-secondary); font-size: 0.9rem; font-weight: 300; margin-bottom: 32px; }

      /* 7. Footer */
      .site-footer { border-top: 1px solid var(--border-subtle); padding: 80px 0 40px 0; background: var(--bg-main); }
      .footer-grid { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 40px; margin-bottom: 60px; }
      .footer-brand p { color: var(--text-muted); font-size: 0.9rem; margin-top: 16px; max-width: 280px; font-weight: 300; }
      .footer-col h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); margin-bottom: 20px; font-weight: 500; }
      .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
      .footer-col a { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
      .footer-col a:hover { color: var(--text-primary); }
      .footer-bottom { border-top: 1px solid var(--border-subtle); padding-top: 32px; display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.85rem; }
    </style>
  </head>
  <body>

    <!-- 1. Navigation Bar -->
    <header class="nav-header">
      <div class="container nav-container">
        <a href="#" class="brand-logo">
          <span class="brand-mark"></span>
          <span>AURA</span>
        </a>
        <ul class="nav-menu">
          <li><a href="#architecture">Architecture</a></li>
          <li><a href="#isolation">Isolation</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#docs">Documentation</a></li>
        </ul>
        <a href="#pricing" class="btn btn-ghost" style="padding: 8px 18px; font-size: 0.85rem;">Sign In</a>
      </div>
    </header>

    <!-- 2. Hero Section -->
    <section class="hero text-center">
      <div class="container">
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          <span>Next-Gen Tenant Page Engine</span>
        </div>
        <h1 class="hero-title">Subtle complexity.<br />Absolute tenant isolation.</h1>
        <p class="hero-subtitle">Architect modern 5-page tenant environments on Next.js with localized edge delivery, structural JSON state, and instant cache revalidation.</p>
        <div class="hero-actions">
          <a href="#pricing" class="btn btn-primary">Deploy Tenant Space</a>
          <a href="#architecture" class="btn btn-ghost">Explore System Architecture</a>
        </div>
      </div>
    </section>

    <!-- 3. Key Metrics / Social Proof -->
    <section class="metrics-section">
      <div class="container">
        <div class="metrics-grid">
          <div>
            <div class="metric-number">99.99%</div>
            <div class="metric-label">Uptime Isolation</div>
          </div>
          <div>
            <div class="metric-number">&lt; 12ms</div>
            <div class="metric-label">Edge Cache Latency</div>
          </div>
          <div>
            <div class="metric-number">5 Pages</div>
            <div class="metric-label">Per Tenant Blueprint</div>
          </div>
          <div>
            <div class="metric-number">0.00s</div>
            <div class="metric-label">Cold Start Overhead</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Architecture Pillars Section -->
    <section id="architecture" class="section-padding">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">Pillars of Design</div>
          <h2 class="section-title">Engineered for seamless performance</h2>
          <p class="section-desc">Every layer is stripped of excess, focusing purely on rapid execution, strict boundaries, and clean developer workflows.</p>
        </div>

        <div class="arch-cards">
          <div class="arch-card">
            <div class="arch-number">01 / ISOLATION</div>
            <h3>Structured JSON AST</h3>
            <p>Content is safely maintained as isolated JSON trees in MongoDB. Layout rules remain intact while eliminating XSS security vectors.</p>
          </div>
          <div class="arch-card">
            <div class="arch-number">02 / CACHING</div>
            <h3>On-Demand ISR</h3>
            <p>Pages are pre-rendered at the edge once. Incremental static regeneration invalidates caches only when explicit webhooks fire.</p>
          </div>
          <div class="arch-card">
            <div class="arch-number">03 / ROUTING</div>
            <h3>Dynamic Subdomains</h3>
            <p>Middleware resolves hostnames instantly, serving customized landing, about, contact, and legal pages per tenant context.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Technical Showcase Section -->
    <section id="isolation" class="section-padding" style="background: var(--bg-surface); border-top: 1px solid var(--border-subtle);">
      <div class="container">
        <div class="showcase-container">
          <div class="showcase-content">
            <div class="eyebrow">Real-Time Invalidation</div>
            <h3>Instant Sync Webhooks</h3>
            <p>When tenant employees modify their pages inside GrapesJS Studio, the backend dispatches scoped revalidation tags directly to Next.js.</p>
            <ul class="feature-list">
              <li class="feature-item"><span class="feature-check">✓</span> Scoped <code>revalidateTag</code> execution</li>
              <li class="feature-item"><span class="feature-check">✓</span> Shared-secret authentication headers</li>
              <li class="feature-item"><span class="feature-check">✓</span> Edge CDN propagation within 50ms</li>
            </ul>
          </div>
          <div class="code-preview">
            <pre><code><span class="code-keyword">export async function</span> POST(req) {
  <span class="code-keyword">const</span> secret = req.headers.get(<span class="code-string">'x-secret'</span>);
  <span class="code-keyword">if</span> (secret !== process.env.REVAL_SECRET) {
    <span class="code-keyword">return</span> Response.json({ error: <span class="code-string">'Unauthorized'</span> });
  }

  <span class="code-keyword">const</span> { tenant, slug } = <span class="code-keyword">await</span> req.json();
  revalidatePath(\`/\${tenant}/\${slug}\`);
  
  <span class="code-keyword">return</span> Response.json({ status: <span class="code-string">'Purged'</span> });
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Pricing Section -->
    <section id="pricing" class="section-padding">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">Transparent Scale</div>
          <h2 class="section-title">Designed for multi-tenant growth</h2>
          <p class="section-desc">Predictable cost structures with zero hidden usage fees.</p>
        </div>

        <div class="pricing-grid">
          <div class="price-card">
            <div>
              <div class="price-title">Standard Tenant Engine</div>
              <div class="price-amount">$49 <span style="font-size: 1rem; color: var(--text-muted);">/ mo</span></div>
              <p class="price-desc">Includes 5 full-featured company pages, shared CDN edge nodes, and standard MongoDB storage bindings.</p>
            </div>
            <a href="#" class="btn btn-ghost" style="width: 100%;">Initialize Workspace</a>
          </div>

          <div class="price-card featured">
            <div>
              <div class="price-title">Enterprise Infrastructure</div>
              <div class="price-amount">$199 <span style="font-size: 1rem; color: var(--text-muted);">/ mo</span></div>
              <p class="price-desc">Dedicated edge revalidation pipelines, custom domain mapping, and high-frequency webhook listeners.</p>
            </div>
            <a href="#" class="btn btn-primary" style="width: 100%;">Deploy Enterprise</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Minimal Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#" class="brand-logo">
              <span class="brand-mark"></span>
              <span>AURA</span>
            </a>
            <p>Minimalist architecture for high-scale multi-tenant applications.</p>
          </div>
          <div class="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><a href="#">Architecture</a></li>
              <li><a href="#">Edge Networks</a></li>
              <li><a href="#">Security AST</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Studio SDK</a></li>
              <li><a href="#">API Reference</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2026 Aura Systems Inc. All rights reserved.</div>
          <div>Designed with precision & subtlety.</div>
        </div>
      </div>
    </footer>

  </body>
</html>`
}