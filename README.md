# Frontend (development)

This frontend uses Vite. During development we proxy `/api` to the backend so you don't need to configure CORS.

Quick start (WSL):

```bash
# Option A (recommended): start both frontend and backend together from the frontend folder
cd /mnt/d/Sukumar/cvprojects/tria_assingment/frontend
npm install    # only first time (installs vite, concurrently, react, etc.)
npm run dev    # runs both backend and vite in parallel

# Option B: start backend and frontend separately (same as before)
# backend terminal:
cd /mnt/d/Sukumar/cvprojects/tria_assingment/backend
npm install
npm run dev
# frontend terminal:
cd /mnt/d/Sukumar/cvprojects/tria_assingment/frontend
npm install
npm run dev
```

Open the printed frontend URL (usually http://localhost:5173/). API calls to `/api/*` will be proxied to `http://localhost:5000`.

Notes:
- If your backend is running on a different port, edit `vite.config.js` and change the proxy `target`.
- For production, build the frontend (`npm run build`) and either serve the `/dist` with a static server or configure the backend to serve the static build.





