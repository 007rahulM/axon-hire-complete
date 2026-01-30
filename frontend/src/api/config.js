// frontend/src/api/config.js

// // This variable checks if we are on the internet (production) or on your laptop (development)
// export const API_BASE_URL = import.meta.env.MODE === "production"
//   // ? "https://axon-hire-backend.onrender.com" // We will update this real URL later if it changes
//   ?"https://axon-hire-mvp.onrender.com"
//   : "http://localhost:5000"; 

// This variable checks if we are on the internet (production) or on your laptop (development)
export const API_BASE_URL ="https://axon-hire-mvp.onrender.com"

// We export it so other files (like Profile.jsx) can use it.
export const BACKEND_URL = API_BASE_URL;