/*
	server.js
	Entry point for the backend API server.
	- Sets up middleware, routes and DB connection
	- Starts the HTTP server and prints an "open" URL
*/
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import os from "os";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { logger } from "./middleware/loggerMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);

    	// Print a single, clickable LAN URL (fallback to localhost).
    	let host = null;
    	const nets = os.networkInterfaces();
    	for (const name of Object.keys(nets)) {
    		for (const net of nets[name]) {
    			if (net.family === "IPv4" && !net.internal) {
    				host = net.address;
    				break;
    			}
    		}
    		if (host) break;
    	}

    	const url = `http://${host || 'localhost'}:${PORT}/`;
    	console.log("Open in browser:");
    	console.log(`  - ${url}`);

});
