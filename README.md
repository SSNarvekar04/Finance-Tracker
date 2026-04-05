#  Spendwise — Transactions Dashboard

---

##  Features

| Feature | Details |
|---|---|
| **Role-Based UI** | Switch between Viewer (read-only) and Admin (full access) |
| **Transactions List** | View all transactions with title, amount, category, date |
| **Add Transaction** | Admin can add new entries via a modal form |
| **Edit Transaction** | Admin can update any existing transaction |
| **Delete Transaction** | Admin can remove transactions (with confirmation) |
| **Insights Panel** | Shows total spending, highest category, count, latest date |
| **Category Bar** | Visual breakdown of spending by category |
| **Dark Mode** | Toggle between light and dark themes |
| **localStorage** | Data persists across page refreshes |
| **Responsive** | Works on mobile and desktop |
| **Empty State** | Friendly message when no transactions exist |

---

##  Project Structure

```
src/
├── App.jsx                  # Root component — holds all state
├── App.css                  # All styles (CSS variables, layout, components)
├── main.jsx                 # React entry point
└── components/
    ├── Header.jsx           # Top bar: logo, role switcher, dark mode toggle
    ├── Insights.jsx         # Summary cards and category bar
    ├── TransactionList.jsx  # Transaction table (desktop) and cards (mobile)
    └── TransactionForm.jsx  # Add / Edit modal form
```

---

##  How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) version 18 or later

### Steps

```bash
# 1. Go into the project folder
cd spendwise-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
# Usually: http://localhost:5173
```

### Build for Production
```bash
npm run build
```

---

##  Key Concepts Used

- **`useState`** — manages transactions, role, dark mode, form visibility
- **`useEffect`** — syncs data to localStorage, toggles dark mode class
- **Props** — parent-to-child data passing (role, transactions, handlers)
- **Conditional rendering** — show/hide buttons based on role
- **Controlled inputs** — form fields tied to React state
- **Array methods** — `.map()`, `.filter()`, `.reduce()` for data manipulation

---

##  Design Choices

- **Font**: Fraunces (display headings) + DM Sans (body text)
- **Palette**: Warm off-white background, amber/gold accent color
- **No UI library** — all styles written from scratch in `App.css`
- **CSS variables** — easy dark/light mode switching

---

##  Ideas to Extend

- Add a search/filter bar
- Sort transactions by date or amount
- Export transactions as CSV
- Add a simple pie chart with `recharts`
- User authentication with a login screen
