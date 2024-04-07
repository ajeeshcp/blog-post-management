const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/sequelize");
process.loadEnvFile();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.log("Failed to connect database " + err.message);
});

app.get("/", (req, res) => {
  res.json({ message: "**** Welcome to node application *** " });
});

require("./app/rest/posts/router")(app);
require("./app/rest/users/router")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
