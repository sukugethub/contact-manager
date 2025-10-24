
import Contact from "../models/contactModel.js";

// Get all contacts
export const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

// Get contact by id
export const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact not found" });
  res.json(contact);
};

// Create a new contact
export const addContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const contact = await Contact.create({ name, phone, email });
  res.status(201).json(contact);
};

// Search contacts by name
export const searchContact = async (req, res) => {
  const regex = new RegExp(req.params.name, "i");
  const contacts = await Contact.find({ name: { $regex: regex } });
  res.json(contacts);
};
