import React, { useState } from "react";
import { addContact } from "../api/contactService";

// Contact form component
const ContactForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Submit new contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addContact(form);
      setForm({ name: "", phone: "", email: "" });
      if (onAdd) onAdd();
    } catch (err) {
      setError(err.message || "Failed to add contact");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" required />
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <button type="submit" disabled={submitting}>{submitting ? "Adding..." : "Add Contact"}</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </form>
  );
};

export default ContactForm;