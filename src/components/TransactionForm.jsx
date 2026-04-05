// TransactionForm.jsx — Modal form for adding or editing a transaction
// Props:
//   onSubmit(data)   — called when form is saved
//   onClose()        — called when user cancels
//   existing         — if editing, the transaction object; null if adding

import { useState } from "react";

const CATEGORIES = ["Food", "Housing", "Transport", "Entertainment", "Health", "Shopping","Medical", "Other"];

export default function TransactionForm({ onSubmit, onClose, existing }) {
  const isEditing = Boolean(existing);

  // Pre-fill form if editing; default empty values if adding
  const [form, setForm] = useState({
    title: existing?.title || "",
    amount: existing?.amount || "",
    category: existing?.category || "Food",
    date: existing?.date || new Date().toISOString().split("T")[0], // today's date
  });

  // Track validation errors
  const [errors, setErrors] = useState({});

  // Update a single field in the form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for the field being edited
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      newErrors.amount = "Enter a valid amount greater than 0";
    if (!form.date) newErrors.date = "Date is required";
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // show errors
      return;
    }

    // If editing, keep the original id; otherwise onSubmit will assign a new id
    onSubmit({
      ...(isEditing ? { id: existing.id } : {}),
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });
  };

  return (
    // Clicking the backdrop closes the form
    <div className="modal-backdrop" onClick={onClose}>
      {/* Stop click from bubbling to backdrop */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{isEditing ? "Edit Transaction" : "Add Transaction"}</h3>
          <button className="icon-btn" onClick={onClose} title="Close">✕</button>
        </div>

        <div className="form-body">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className={`form-input ${errors.title ? "input-error" : ""}`}
              type="text"
              name="title"
              placeholder="e.g. Grocery Shopping"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error-msg">{errors.title}</p>}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              className={`form-input ${errors.amount ? "input-error" : ""}`}
              type="number"
              name="amount"
              placeholder="e.g. 500"
              min="1"
              value={form.amount}
              onChange={handleChange}
            />
            {errors.amount && <p className="error-msg">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input select"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              className={`form-input ${errors.date ? "input-error" : ""}`}
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-msg">{errors.date}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
