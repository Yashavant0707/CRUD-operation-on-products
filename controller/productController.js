const PRODUCT_SCHEMA = require("../models/productModel");
const asyncHandler = require("express-async-handler");

exports.addProduct = asyncHandler(async (req, res) => {
  let { name } = req.body;
  let product = await PRODUCT_SCHEMA.findOne({ name });
  if (product) {
    throw new Error("product already there........");
  }
  let addNew = await PRODUCT_SCHEMA.create(req.body);
  res.status(201).json({ message: "product added", success: true, addNew });
});

exports.fetchAll = asyncHandler(async (req, res) => {
  let products = await PRODUCT_SCHEMA.find();
  if (products.length == 0) {
    throw new Error("no products found..........");
  }
  res.status(200).json({ message: "products fetched successfully", success: true, products });
});

exports.findOne = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let product = await PRODUCT_SCHEMA.findOne({ _id: id });
  if (!product) {
    throw new Error("no such product found");
  }

  res.status(200).json({ success: true, message: "product found", foundProduct: product });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  let { id } = req.params;

  let product = await PRODUCT_SCHEMA.findOne({ _id: id });

  if (!product) {
    throw new Error("no such product");
  }

  let updateProduct = await PRODUCT_SCHEMA.updateOne(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        isAvailable: req.body.isAvailable,
        deliveryAddress: req.body.deliveryAddress,
      },
    }
  );

  res.status(200).json({ success: true, message: "product updated", updateProduct });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await PRODUCT_SCHEMA.findOne({ _id: id });

  if (!product) {
    throw new Error("no product");
  }

  let deleteProd = await PRODUCT_SCHEMA.deleteOne({ _id: id });

  res.status(200).json({ success: true, message: "prod deleted", deleteProd });
});
