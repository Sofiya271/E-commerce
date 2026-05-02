const db = require("../db");

// GET all categories
exports.getAllCategories = (req, res) => {
  const sql = "SELECT categories.* , COUNT(products.id) as product_count FROM categories LEFT JOIN products on categories.id = products.category_id GROUP BY categories.id";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting categories" });
    }

    res.json(result);
  });
};

// GET category by id
exports.getCategoryById = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const sql = "SELECT * FROM categories WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting category" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(result[0]);
  });
};

// CREATE category
exports.createCategory = (req, res) => {
  const { name } = req.body;

  // validation 1: required
  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  // validation 2: min length
  if (name.length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters"
    });
  }

  const sql = "INSERT INTO categories (name) VALUES (?)";

  db.query(sql, [name], (err, result) => {
    if (err) {
        console.log(err);
      return res.status(500).json({ message: "Error creating category" });
    }

    res.status(201).json({
      message: "Category created successfully",
      categoryId: result.insertId
    });
  });
};

// UPDATE category
exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  // ✅ validation: id
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  // ✅ validation: name
  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required"
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: "Name must be at least 3 characters"
    });
  }

  const sql = "UPDATE categories SET name = ? WHERE id = ?";

  db.query(sql, [name, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating category" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category updated successfully" });
  });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const sql = "DELETE FROM categories WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting category" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  });
};