
import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);