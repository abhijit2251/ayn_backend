const router = require("express").Router();
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

//storing image by multer and grid fs
// Storage
const storage = new GridFsStorage({
  url: process.env.DB_CONNCECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage: storage
});

router.post('/img', upload.single('ayn'), (req, res) => {
  // console.log("body", req.body)
  res.send("image store successfully.");
});


module.exports = router;