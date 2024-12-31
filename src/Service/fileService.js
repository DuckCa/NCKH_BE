const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { createCanvas, loadImage } = require("canvas");

const createDiagonalWatermark = (
  text,
  width,
  height,
  color = "#488BB2",
  opacity = 0.2
) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Thiết lập font và màu sắc với độ trong suốt
  ctx.font = "bold 40px Arial";
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity; // Độ trong suốt
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Xoay text 45 độ
  ctx.rotate((-45 * Math.PI) / 180);

  // Lặp lại text khắp ảnh
  const textWidth = ctx.measureText(text).width;
  const textHeight = 50; // Chiều cao của text
  const spacing = 200; // Khoảng cách giữa các text

  for (let y = -height; y < height * 2; y += spacing) {
    for (let x = -width; x < width * 2; x += spacing) {
      ctx.fillText(text, x, y);
    }
  }

  // Trả về buffer của hình ảnh watermark
  return canvas.toBuffer();
};

// Hàm chèn watermark vào ảnh gốc
const addWatermark = async (inputImagePath, outputImagePath, text) => {
  try {
    // Đọc ảnh gốc
    const image = await sharp(inputImagePath).toBuffer();

    // Lấy kích thước ảnh gốc
    const metadata = await sharp(image).metadata();
    const { width, height } = metadata;

    // Tạo watermark dạng text theo phương chéo và lặp lại
    const watermark = await createDiagonalWatermark(text, width, height);

    // Chèn watermark vào ảnh gốc
    await sharp(image)
      .composite([
        {
          input: watermark,
          blend: "over", // Chế độ blend
        },
      ])
      .toFile(outputImagePath);

    console.log("Watermark added successfully:", outputImagePath);
    return outputImagePath;
  } catch (error) {
    console.error("Error adding watermark:", error);
    throw error;
  }
};

// Hàm upload file và chèn watermark
const uploadSingleFile = async (fileObject) => {
  let extname = path.extname(fileObject?.name);
  let basename = path.basename(fileObject?.name, extname);
  let realname = basename + "-" + Date.now() + extname;
  let uploadPath = path.resolve(__dirname, "../Public/Items_e_commerce/");

  try {
    // Đường dẫn cho ảnh gốc
    const originalImagePath = path.join(uploadPath, `original_${realname}`);

    // Di chuyển file tải lên vào thư mục đích (lưu ảnh gốc)
    await fileObject.mv(originalImagePath);

    // Đường dẫn cho ảnh đã chèn watermark
    const watermarkedImagePath = path.join(
      uploadPath,
      `watermarked_${realname}`
    );

    // Chèn watermark vào ảnh
    await addWatermark(originalImagePath, watermarkedImagePath, "WeDesign");

    return {
      status: "success",
      paths: {
        original: originalImagePath, // Đường dẫn ảnh gốc
        watermarked: watermarkedImagePath, // Đường dẫn ảnh đã chèn watermark
      },
      error: null,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      status: "failed",
      paths: null,
      error: JSON.stringify(error),
    };
  }
};

// Hàm upload nhiều file (nếu cần)
const uploadMultipleFile = async (fileArray) => {
  if (!Array.isArray(fileArray) || fileArray.length === 0) {
    return {
      status: "failed",
      path: null,
      error: "fileArray is not an array or it is empty",
    };
  }

  let dirpath = path.join(__dirname, "../public/images/uploads");

  // Kiểm tra và tạo thư mục nếu không tồn tại
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }

  for (const element of fileArray) {
    let extname = path.extname(element.name);
    let basename = path.basename(element.name, extname);
    let realname = JSON.stringify(basename + "-" + Date.now() + extname);
    let uploadPath = path.join(dirpath, JSON.parse(realname));

    try {
      console.log(">>>>>> Check Success:", uploadPath);
      await element.mv(uploadPath);
      return {
        status: "success",
        path: JSON.parse(realname),
        error: JSON.stringify(error),
      };
    } catch (error) {
      console.log(">>>>>> ERROR:", uploadPath);
      return {
        status: "failed",
        path: null,
        error: JSON.stringify(error),
      };
    }
  }

  return {
    status: "success",
    path: "link-image", // Bạn có thể thay đổi đường dẫn này để phản ánh đúng đường dẫn URL
    error: null,
  };
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFile,
};
