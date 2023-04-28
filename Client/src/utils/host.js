const isLocal = window.location.hostname === "localhost";
export const HOST = isLocal ? "http://localhost:3001" : "https://chick-fil-a-m0ss.onrender.com";