const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("BODY:", req.body);
  next();
});
app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
