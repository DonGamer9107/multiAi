
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "system",
            content: "You are Nova AI."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
  response.data.choices?.[0]?.message?.content ||
  "No response";

res.json({
  reply
});
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "AI request failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const path = require("path");

app.use(
  express.static(
    path.join(__dirname, "../frontend/dist")
  )
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});
