require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const POST = require("./models/posts");

mongoose.connect(process.env.DB_URL.replace("<password>", DB_PASSWORD));
mongoose.connect(DB).then((con) => {
  console.log("DB connection successful!");
});

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/posts", async (req, res) => {
  try {
    const postData = await POST.create(data);
    res.status(200).json({
      status: "success",
      data: postData,
      message: "新增貼文成功",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.errors ? err : "欄位填寫錯誤或查無此id",
    });
  }
});

app.listen(3000, () => console.log("Server running at port 3000..."));
