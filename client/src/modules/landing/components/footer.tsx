const columns = {
  Platform: ['Overview', 'Multi-tenancy', 'RBAC', 'Branding', 'Pricing'],
  Company: ['About', 'Customers', 'Careers', 'Contact'],
  Resources: ['Docs', 'API reference', 'Security', 'Status'],
  Legal: ['Privacy', 'Terms', 'DPA', 'SLA'],
};

export default function Footer() {
  return (
    <footer id="company" className="border-t vhx-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-[3px] vhx-bg-accent" />
              <span className="text-[15px] font-semibold tracking-tight vhx-ink">
                Vibhava
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed vhx-mute">
              The multi-tenant platform for modern property operations.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-md border vhx-line vhx-surface px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full vhx-bg-accent" />
              <span className="text-[11px] vhx-mute">All systems operational</span>
            </div>
          </div>

          {Object.entries(columns).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="mb-4 text-[11px] font-medium uppercase tracking-wider vhx-mute">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm vhx-mute transition-colors hover:vhx-ink"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t vhx-line pt-8 sm:flex-row">
          <p className="text-xs vhx-mute">
            © 2026 Vibhava Systems, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs vhx-mute">
            <a href="#" className="hover:vhx-ink">Privacy</a>
            <a href="#" className="hover:vhx-ink">Terms</a>
            <a href="#" className="hover:vhx-ink">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}