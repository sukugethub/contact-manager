import React from "react";
import ContactCard from "./ContactCard";

// List of contacts
const ContactList = ({ contacts }) => {
  if (!contacts.length) return <p>No contacts found.</p>;
  return (
    <div className="contact-list">
      {contacts.map((c) => <ContactCard key={c._id} contact={c} />)}
    </div>
  );
};

export default ContactList;