const express = require("express");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Bulk Certificate Backend Running!");
});

app.post("/api/generate", (req, res) => {
  const { name, course, date } = req.body;

  if (!name || !course || !date) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const folder = path.join(__dirname, "certificates");

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const safeName = name.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `${safeName}_certificate.pdf`;
  const filePath = path.join(folder, fileName);

  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 0,
  });

  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  // Certificate border
  doc
    .lineWidth(4)
    .rect(30, 30, 782, 535)
    .stroke();

  // Title
  doc
    .fontSize(30)
    .font("Helvetica-Bold")
    .text("CERTIFICATE OF ACHIEVEMENT", 0, 100, {
      align: "center",
      width: 842,
    });

  doc
    .fontSize(17)
    .font("Helvetica")
    .text("This certificate is proudly presented to", 0, 165, {
      align: "center",
      width: 842,
    });

  // Name
  doc
    .fontSize(32)
    .font("Helvetica-Bold")
    .text(name, 0, 215, {
      align: "center",
      width: 842,
    });

  doc
    .fontSize(17)
    .font("Helvetica")
    .text("for successfully completing", 0, 275, {
      align: "center",
      width: 842,
    });

  // Course
  doc
    .fontSize(25)
    .font("Helvetica-Bold")
    .text(course, 0, 315, {
      align: "center",
      width: 842,
    });

  // Date
  doc
    .fontSize(14)
    .font("Helvetica")
    .text(`Date: ${date}`, 100, 470);

  doc
    .fontSize(14)
    .text("CertiFlow", 680, 470);

  doc.end();

  stream.on("finish", () => {
    res.json({
      message: "Certificate generated successfully",
      fileName: fileName,
      downloadUrl: `http://localhost:${PORT}/certificates/${fileName}`,
    });
  });

  stream.on("error", (error) => {
    console.error(error);
    res.status(500).json({
      message: "PDF generation failed",
    });
  });
});

app.use(
  "/certificates",
  express.static(path.join(__dirname, "certificates"))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});