import React from "react";

// Single contact card
const ContactCard = ({ contact }) => (
  <div className="contact-card">
    <h3>{contact.name}</h3>
    <p>📞 {contact.phone}</p>
    {contact.email && <p>📧 {contact.email}</p>}
  </div>
);

export default ContactCard;