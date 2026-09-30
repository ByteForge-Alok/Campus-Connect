const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/CampusConnect")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Report schema
const reportSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  location: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
});

// Report model
const Report = mongoose.model("Report", reportSchema);

// Home route
app.get("/", (req, res) => {
  res.send("CampusConnect backend is running!");
});

// Submit report
app.post("/api/reports", async (req, res) => {
  try {
    const report = new Report(req.body);

    await report.save();

    console.log("New report saved:");
    console.log(report);

    res.json({
      message: "Report saved successfully!",
      report: report,
    });
  } catch (error) {
    console.error("Error saving report:", error);

    res.status(500).json({
      message: "Error saving report",
    });
  }
});

// Get all reports
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find();

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);

    res.status(500).json({
      message: "Error fetching reports",
    });
  }
});

// Update report status
app.patch("/api/reports/:id/status", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(report);
  } catch (error) {
    console.error("Error updating report status:", error);

    res.status(500).json({
      message: "Error updating report status",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`CampusConnect server running on http://localhost:${PORT}`);
});