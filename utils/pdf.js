const PDFDocument = require('pdfkit');
const fs = require('fs');

function createPDF(text) {
    const filename = `output${Date.now()}.pdf`;           // Tên file tự động theo thời gian
    const filePath = `./uploads/${filename}`;              // Lưu file vào thư mục uploads

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));
    doc.font('font/Roboto-Regular.ttf')                    // Đảm bảo font này tồn tại
       .fontSize(14)
       .text(text, 100, 100);
    doc.end();

    return `/uploads/${filename}`;                         // Trả về đường dẫn truy cập file từ trình duyệt
}

module.exports = {
    createPDF
};
