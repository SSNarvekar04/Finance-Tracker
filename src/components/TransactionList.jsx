const CATEGORY_COLORS = {
  Food: { bg: "#fef3c7", text: "#92400e" },
  Housing: { bg: "#ede9fe", text: "#4c1d95" },
  Transport: { bg: "#d1fae5", text: "#065f46" },
  Entertainment: { bg: "#fce7f3", text: "#9d174d" },
  Health: { bg: "#ccfbf1", text: "#134e4a" },
  Shopping: { bg: "#8db4c4", text: "#7c2d12" },
  Medical: { bg: "#d9e2e9", text: "#25b6be" },
  Other: { bg: "#f1f5f9", text: "#475569" },
};

export default function TransactionList({ transactions, role, onEdit, onDelete, onAdd }) {
  const isAdmin = role === "admin";

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  return (
    <section className="transaction-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="section-sub">
            {transactions.length} entr{transactions.length === 1 ? "y" : "ies"}
            {isAdmin ? " · Admin mode" : " · View only"}
          </p>
        </div>

        {isAdmin && (
          <button className="btn-primary" onClick={onAdd}>
            + Add Transaction
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-title">No transactions yet</p>
          {isAdmin && (
            <p className="empty-sub">Click "Add Transaction" to get started</p>
          )}
        </div>
      ) : (
        <>
          <div className="table-wrap">
            <table className="tx-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="text-right">Amount</th>
                  {isAdmin && <th className="text-center">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => {
                  const colors = CATEGORY_COLORS[t.category] || CATEGORY_COLORS.Other;
                  return (
                    <tr key={t.id} className="tx-row">
                      <td className="tx-index">{index + 1}</td>
                      <td className="tx-title">{t.title}</td>
                      <td>
                        <span
                          className="category-pill"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td className="tx-date">{formatDate(t.date)}</td>
                      <td className="tx-amount text-right">{formatAmount(t.amount)}</td>
                      {isAdmin && (
                        <td className="text-center">
                          <div className="action-btns">
                            <button
                              className="btn-edit"
                              onClick={() => onEdit(t)}
                              title="Edit transaction"
                            >
                              ✏️
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => {
                                if (window.confirm(`Delete "${t.title}"?`)) onDelete(t.id);
                              }}
                              title="Delete transaction"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mobile-cards">
            {transactions.map((t) => {
              const colors = CATEGORY_COLORS[t.category] || CATEGORY_COLORS.Other;
              return (
                <div key={t.id} className="mobile-card">
                  <div className="mobile-card-top">
                    <span className="tx-title">{t.title}</span>
                    <span className="tx-amount">{formatAmount(t.amount)}</span>
                  </div>
                  <div className="mobile-card-bottom">
                    <span className="category-pill" style={{ background: colors.bg, color: colors.text }}>
                      {t.category}
                    </span>
                    <span className="tx-date">{formatDate(t.date)}</span>
                    {isAdmin && (
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => onEdit(t)}>✏️</button>
                        <button className="btn-delete" onClick={() => { if (window.confirm(`Delete "${t.title}"?`)) onDelete(t.id); }}>🗑️</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}