require("dotenv").config();
const express = require("express");
const router = require("./routes");
const cors = require("cors");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

try {
    app.listen(PORT, () => console.log("ALL RIGHTY!" + PORT));
} catch (e) {
    console.log(e);
}
