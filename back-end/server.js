const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Keys } = require("./keys");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(`public`));

app.use("/api", require("./routes/contact"));

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
  try {
    await mongoose.connect(Keys.mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
});
