const express = require('express')
const app = express()
const port = 3010
const cors = require("cors")
const sequelize = require("./config/conn.js")
const bodyParser = require("body-parser")
const router = require("./routes/router")
const model = require("./models/Relationships.js");


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)
require("dotenv").config()

async function initializeDatabase() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
  
      await sequelize.sync({ force: false });
  
      console.log("Models synchronized with the database.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  initializeDatabase();

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
})