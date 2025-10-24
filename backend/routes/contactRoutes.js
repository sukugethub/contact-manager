// Contacts API routes
import express from "express";
import { getContacts, getContactById, addContact, searchContact } from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContacts).post(addContact);
router.route("/search/:name").get(searchContact);
router.route("/:id").get(getContactById);

export default router;