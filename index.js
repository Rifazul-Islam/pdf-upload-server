const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/files", express.static("files"));
//mongodb connection----------------------------------------------
const mongoUrl =
  "mongodb+srv://unity-spark:uebc6RYNp2FcXIvP@cluster0.vbzggtn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

//multer------------------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  res.send("Hello ");
});

//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success server side run !!!!!!");
});

app.listen(port, () => {
  console.log("Server Started");
});
