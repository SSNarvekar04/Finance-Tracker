// Header.jsx — Top bar with title, role switcher, and dark mode toggle

export default function Header({ role, setRole, darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-left">
        {/* App logo / title */}
        <span className="header-logo">₹</span>
        <div>
          <h1 className="header-title">Spendwise</h1>
          <p className="header-subtitle">Personal Finance Dashboard</p>
        </div>
      </div>

      <div className="header-right">
        {/* Role badge — shows what the current role can do */}
        <div className={`role-badge ${role}`}>
          {role === "admin" ? "🛠 Admin" : "👁 Viewer"}
        </div>

        {/* Role switcher dropdown */}
        <div className="control-group">
          <label className="control-label" htmlFor="role-select">Role</label>
          <select
            id="role-select"
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Dark mode toggle */}
        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
