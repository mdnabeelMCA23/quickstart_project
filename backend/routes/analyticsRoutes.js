const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET USER ANALYTICS
router.get("/stats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Node received userId:", userId);

    // Call Python FastAPI
    const response = await axios.get(
      `http://https://python-backend-dnwl.onrender.com/analytics/stats/${userId}`
    );

    res.json(response.data);

  } catch (error) {
    console.error("Analytics Error:", error.message);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

module.exports = router;
