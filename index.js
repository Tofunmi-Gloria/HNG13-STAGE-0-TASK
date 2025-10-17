const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/me", async (req, res) => {
  try {
    // Fetch a random cat fact
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const catFact = response.data.fact;

    // Build response object
    const data = {
      status: "success",
      user: {
        email: "youremail@example.com",
        name: "Your Full Name",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.status(200).json(data);
  } catch (error) {
    // Graceful fallback if the Cat Facts API fails
    const data = {
      status: "success",
      user: {
        email: "youremail@example.com",
        name: "Your Full Name",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "Could not fetch cat fact at the moment. Try again later.",
    };
    res.status(200).json(data);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
