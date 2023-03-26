require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const POST = require("./models/posts");

const DB = process.env.DB.replace("<DB_USER>", process.env.DB_USER)
  .replace("<DB_PASSWORD>", process.env.DB_PASSWORD)
  .replace("<DB_NAME>", process.env.DB_NAME);
mongoose.connect(DB, { useNewUrlParser: true }).then((con) => {
  console.log("DB connection successful!");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app
  .route("/posts")
  .get(async (req, res) => {
    try {
      const posts = await POST.find();
      res.status(200).json({
        status: "success",
        data: posts,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
      });
    }
  })
  .post(async (req, res) => {
    try {
      const postData = await POST.create(req.body);
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
  })
  .delete(async (req, res) => {
    try {
      await POST.deleteMany({});
      res.status(204).json({});
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
      });
    }
  });

app.listen(3000, () => console.log("Server running at port 3000..."));
