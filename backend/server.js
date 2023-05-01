const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const companyRoutes = require("./routes/companiesRoutes")

require("dotenv").config();
require("./db/conn");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes
app.use(employeeRoutes);
app.use(companyRoutes);

app.listen(PORT, () => console.log("Server running on port " + PORT));