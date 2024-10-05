import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import { ChildProcess } from "child_process";
//import productRoutes from "./routes/product.js";
//import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
//import Product from "./models/Product.js";
//import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const { exec } = {ChildProcess};
/* ROUTES */
app.use("/kpi", kpiRoutes);
//app.use("/product", productRoutes);
//app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 1337;
app.post('/api/predict', (req, res) => {
  const features = req.body.features;

  // Call the Python script for prediction
  exec(`python predict.py '${JSON.stringify(features)}'`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing script: ${error}`);
          return res.status(500).send({ error: 'Internal Server Error' });
      }
      const prediction = JSON.parse(stdout);
      res.json({ prediction: prediction });
  });
});
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));