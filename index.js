const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

// Root endpoint
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 CI/CD Pipeline Working!</h1>
    <p>Deployed on Kubernetes (EKS)</p>
    <p><b>Hostname:</b> ${os.hostname()}</p>
    <p><b>Timestamp:</b> ${new Date().toISOString()}</p>
  `);
});

// Health check endpoint (important for Kubernetes)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Version endpoint (useful for testing deployments)
app.get("/version", (req, res) => {
  res.json({
    version: "1.0.0",
    message: "Node App running successfully 🚀"
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});