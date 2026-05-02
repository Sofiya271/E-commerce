const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", 
  upload.single('image'),
  authMiddleware, 
  roleMiddleware(['admin']), 
  productController.createProduct
);

router.put("/:id", 
  upload.single('image'),
  authMiddleware, 
  roleMiddleware(['admin']), 
  productController.updateProduct
);

router.delete("/:id", 
  authMiddleware, 
  roleMiddleware(['admin']), 
  productController.deleteProduct
);

module.exports = router;