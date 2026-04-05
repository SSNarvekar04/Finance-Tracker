export default function Insights({ transactions }) {
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
      : null;

  const latestDate =
    transactions.length > 0
      ? new Date(
          Math.max(...transactions.map((t) => new Date(t.date)))
        ).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : "—";

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const categoryColors = {
    Food: "#f59e0b",
    Housing: "#6366f1",
    Transport: "#10b981",
    Entertainment: "#ec4899",
    Health: "#14b8a6",
    Shopping: "#f97316",
    Other: "#94a3b8",
  };

  return (
    <section className="insights">
      <h2 className="section-title">Overview</h2>

      <div className="insights-grid">
        <div className="insight-card total">
          <div className="insight-icon">💰</div>
          <div>
            <p className="insight-label">Total Spending</p>
            <p className="insight-value">{formatINR(total)}</p>
          </div>
        </div>

        <div className="insight-card top-cat">
          <div
            className="insight-icon"
            style={{ background: topCategory ? categoryColors[topCategory[0]] || "#94a3b8" : "#e2e8f0" }}
          >
            📊
          </div>
          <div>
            <p className="insight-label">Highest Category</p>
            <p className="insight-value">
              {topCategory ? topCategory[0] : "—"}
            </p>
            {topCategory && (
              <p className="insight-sub">{formatINR(topCategory[1])}</p>
            )}
          </div>
        </div>

        <div className="insight-card count">
          <div className="insight-icon">🧾</div>
          <div>
            <p className="insight-label">Transactions</p>
            <p className="insight-value">{transactions.length}</p>
          </div>
        </div>

        <div className="insight-card last">
          <div className="insight-icon">📅</div>
          <div>
            <p className="insight-label">Latest Entry</p>
            <p className="insight-value small">{latestDate}</p>
          </div>
        </div>
      </div>

      {Object.keys(categoryTotals).length > 0 && (
        <div className="category-bar-wrap">
          <p className="insight-label" style={{ marginBottom: "8px" }}>Spending by Category</p>
          <div className="category-bar">
            {Object.entries(categoryTotals)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, amt]) => {
                const pct = ((amt / total) * 100).toFixed(1);
                return (
                  <div
                    key={cat}
                    className="category-bar-segment"
                    style={{
                      width: `${pct}%`,
                      background: categoryColors[cat] || "#94a3b8",
                    }}
                    title={`${cat}: ${formatINR(amt)} (${pct}%)`}
                  />
                );
              })}
          </div>
          <div className="category-legend">
            {Object.entries(categoryTotals).map(([cat]) => (
              <span key={cat} className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: categoryColors[cat] || "#94a3b8" }}
                />
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}