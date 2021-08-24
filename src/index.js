const express = require("express");
const env = require("dotenv");
const app = express();
//const bodyParser = require("body-parser");

//Mongoose Connection
const mongoose = require("mongoose");

const cors = require("cors");

//Getting the routes
const myRoutes = require("./routes/user");
const my_admin_Routes = require("./routes/admin/admin_routes");
const product_routes = require("./routes/product");
const cart_routes = require("./routes/cart");
env.config();

//MangoDb Connecter
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@foodiesammycluster.efyc1.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

/* app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); */

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//app.use(express.json());
app.use("/api", myRoutes);
app.use("/api", my_admin_Routes);
app.use("/api", product_routes);
app.use("/api", cart_routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
