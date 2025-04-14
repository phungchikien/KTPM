const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { image2text } = require("./utils/ocr");
const { createPDF } = require("./utils/pdf");
const { translate } = require("./utils/translate");

const app = express();

// Cấu hình lưu file upload
const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs"); // Dùng EJS để render giao diện
app.use(express.static("public")); // Thư mục chứa file tĩnh

// Trang chính
app.get("/", (req, res) => {
    res.render("index", { text: null, viText: null, pdfFile: null });
});

// Xử lý upload và xử lý OCR
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const imagePath = req.file.path;
        const text = await image2text(imagePath); // Trích xuất văn bản
        const viText = await translate(text); // Dịch sang tiếng Việt
        const pdfFile = createPDF(viText); // Tạo PDF
        
        res.render("index", { text, viText, pdfFile });
    } catch (error) {
        res.status(500).send("Lỗi xử lý: " + error.message);
    }
});

app.use("/uploads", express.static("uploads"));

// Server chạy trên port 3000
app.listen(3000, () => {
    console.log("Server đang chạy tại http://localhost:3000");
});
