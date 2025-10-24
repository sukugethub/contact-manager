import React, { useEffect, useState, useCallback, useRef } from "react";
import { getContacts, searchContact } from "../api/contactService";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";


// Main page component for managing contacts
const HomePage = () => {
  const [contacts, setContacts] = useState([]);     // Store contact list
  const [query, setQuery] = useState("");           // Search query state
  const [loading, setLoading] = useState(false);    // Loading state
  const [error, setError] = useState(null);         // Error state
  const [showList, setShowList] = useState(false);  // Controls dropdown visibility

  const searchRef = useRef(null);

  // Fetch contacts from API with optional search query
const fetchContacts = useCallback(async (q = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = q ? await searchContact(q) : await getContacts();
      setContacts(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts(query);
  }, [query, fetchContacts]);

  // Handle clicks outside search container to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="homepage">
      <div className="left-section">
        <div className="container">
          <h1>📇 Contact Manager</h1>

          <div ref={searchRef} className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search contacts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowList(true)}
            />

            <div className={`contact-list-dropdown ${showList ? "show" : "hide"}`}>
              {loading && <p>Loading...</p>}
              {error && <p style={{ color: "red" }}>Error: {error}</p>}
              <ContactList contacts={contacts} />
            </div>
          </div>

          <ContactForm onAdd={() => fetchContacts(query)} />
        </div>
      </div>

      <div className="right-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="Doctor Illustration"
          className="doctor-img"
        />
      </div>
    </div>
  );
};

export default HomePage;
