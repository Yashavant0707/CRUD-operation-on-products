const express = require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/database");
const productRoute = require("./router/productRouter");
const { error } = require("./middlewares/error");
const app = express();

connectDB();
app.use(express.json());
app.use("/products", productRoute);

app.use(error);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express server listening on port ${PORT}`);
});

// for operation purpose this is dummy input--
// {
//   "name":"rice",
//   "price":50,
//   "quantity":200,
//   "isAvailable":true,
//   "deliveryAddress":"rampur"
// }