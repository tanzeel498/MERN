const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
// console.log(process.env);
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

app.listen(port);
