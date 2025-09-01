import db from "../db.js";

// Admin: all products
export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Public: only published & not deleted
export const getLiveProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Products WHERE status='Published' AND is_deleted=FALSE");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create
export const createProduct = async (req, res) => {
  const { product_name, product_desc, created_by } = req.body;
  if (!product_name || !created_by) return res.status(400).json({ error: "product_name and created_by required" });
  try {
    const [result] = await db.query(
      "INSERT INTO Products (product_name, product_desc, created_by) VALUES (?, ?, ?)",
      [product_name, product_desc || null, created_by]
    );
    res.json({ message: "created", product_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, product_desc, status, updated_by } = req.body;
  try {
    await db.query(
      "UPDATE Products SET product_name=?, product_desc=?, status=?, updated_by=? WHERE product_id=?",
      [product_name, product_desc, status, updated_by, id]
    );
    res.json({ message: "updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete
export const softDeleteProduct = async (req, res) => {
  const { id } = req.params;
  const { updated_by } = req.body;
  try {
    await db.query("UPDATE Products SET is_deleted=TRUE, updated_by=? WHERE product_id=?", [updated_by, id]);
    res.json({ message: "soft deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
