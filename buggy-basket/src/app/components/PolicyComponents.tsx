import Link from 'next/link';

// ── PolicyLayout ──
export function PolicyLayout({ title, lastUpdated, warning, tocItems, children }: {
  title: string;
  lastUpdated: string;
  warning?: string;
  tocItems: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="policy-page">
      <div className="policy-container">

        <div className="policy-header">
          <div className="policy-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{title}</span>
          </div>
          <h1 className="policy-title">{title}</h1>
          <p className="policy-updated">Last updated: {lastUpdated}</p>
        </div>

        {warning && (
          <div className="policy-warning">
            <span className="policy-warning-label">⚠ Draft</span>
            <p>{warning}</p>
          </div>
        )}

        <div className="policy-layout">
          <aside className="policy-toc">
            <p className="policy-toc-title">On this page</p>
            <nav className="policy-toc-links">
              {tocItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="policy-toc-link"
                >
                  {item}
                </a>
              ))}
            </nav>
          </aside>

          <div className="policy-content">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

// ── PolicySection ──
export function PolicySection({ title, children }: {
  title: string;
  children: React.ReactNode;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <section id={id} className="policy-section">
      <h2 className="policy-section-title">{title}</h2>
      <div className="policy-section-content">{children}</div>
    </section>
  );
}

// ── PolicyHeading ──
export function PolicyHeading({ children }: {
  children: React.ReactNode;
}) {
  return <h3 className="policy-heading">{children}</h3>;
}

// ── PolicySubHeading ──
export function PolicySubHeading({ children }: {
  children: React.ReactNode;
}) {
  return <h4 className="policy-subheading">{children}</h4>;
}