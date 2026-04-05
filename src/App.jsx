import { useState, useEffect } from "react";
import Header from "./components/Header";
import Insights from "./components/Insights";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import "./App.css";

const SAMPLE_TRANSACTIONS = [
  { id: 1, title: "Grocery Shopping", amount: 1200, category: "Food", date: "2025-03-15" },
  { id: 2, title: "Monthly Rent", amount: 8000, category: "Housing", date: "2025-03-01" },
  { id: 3, title: "Netflix Subscription", amount: 649, category: "Entertainment", date: "2025-03-10" },
  { id: 4, title: "Bus Pass", amount: 500, category: "Transport", date: "2025-03-05" },
  { id: 5, title: "Dinner Out", amount: 850, category: "Food", date: "2025-03-20" },
  { id: 6, title: "Medicine", amount: 300, category: "Hospital", date: "2025-03-15" },
];

export default function App() {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : SAMPLE_TRANSACTIONS;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleAdd = (newTransaction) => {
    const withId = { ...newTransaction, id: Date.now() };
    setTransactions([withId, ...transactions]);
    setShowForm(false);
  };

  const handleEdit = (updated) => {
    setTransactions(transactions.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTransaction(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const openEditForm = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const openAddForm = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Header
        role={role}
        setRole={setRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="main-content">
        <Insights transactions={transactions} />

        <TransactionList
          transactions={transactions}
          role={role}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onAdd={openAddForm}
        />
      </main>

      {showForm && (
        <TransactionForm
          onSubmit={editingTransaction ? handleEdit : handleAdd}
          onClose={closeForm}
          existing={editingTransaction}
        />
      )}
    </div>
  );
}