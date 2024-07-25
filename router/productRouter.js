const { Router } = require("express");
const {
  addProduct,
  fetchAll,
  findOne,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = Router();

router.post("/add", addProduct);
router.get("/all", fetchAll);
router.get("/one/:id", findOne);

router.patch("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
