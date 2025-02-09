require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env",
});
const path = require("path");
const fs = require("fs").promises; // Sử dụng fs.promises
const sharp = require("sharp");
const { createCanvas, loadImage } = require("canvas");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Cấu hình AWS SDK với timeout tăng lên
const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  requestHandler: {
    requestTimeout: 300 * 1000, // 300 giây
  },
});

// Đường dẫn thư mục tạm thời
const dirpath = path.join(__dirname, "../public/images/uploads");

// Hàm tạo watermark (giữ nguyên)
const createDiagonalWatermark = (
  text,
  width,
  height,
  color = "#488BB2",
  opacity = 0.2
) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.font = "bold 40px Arial";
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.rotate((-45 * Math.PI) / 180);

  const textWidth = ctx.measureText(text).width;
  const textHeight = 50;
  const spacing = 200;

  for (let y = -height; y < height * 2; y += spacing) {
    for (let x = -width; x < width * 2; x += spacing) {
      ctx.fillText(text, x, y);
    }
  }

  return canvas.toBuffer();
};

// Hàm chèn watermark (giữ nguyên)
const addWatermark = async (inputImagePath, outputImagePath, text) => {
  try {
    const image = await sharp(inputImagePath).toBuffer();
    const metadata = await sharp(image).metadata();
    const { width, height } = metadata;

    const watermark = await createDiagonalWatermark(text, width, height);

    await sharp(image)
      .composite([
        {
          input: watermark,
          blend: "over",
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

// Hàm upload file lên S3
const uploadSingleFile = async (fileObject) => {
  let extname = path.extname(fileObject?.name);
  let basename = path.basename(fileObject?.name, extname);
  let realname = basename + "-" + Date.now() + extname;

  // Đảm bảo thư mục tồn tại
  try {
    await fs.access(dirpath);
  } catch (error) {
    await fs.mkdir(dirpath, { recursive: true });
  }

  // Đường dẫn tạm thời để lưu ảnh gốc
  const originalImagePath = path.join(dirpath, `temp_${realname}`);

  // Đường dẫn tạm thời để lưu ảnh đã chèn watermark
  const watermarkedImagePath = path.join(dirpath, `watermarked_${realname}`);

  try {
    // Di chuyển file tải lên vào thư mục tạm thời
    await fileObject.mv(originalImagePath);

    // Chèn watermark vào ảnh
    await addWatermark(originalImagePath, watermarkedImagePath, "WeDesign");

    // Đọc ảnh gốc và ảnh đã chèn watermark
    const originalImageBuffer = await fs.readFile(originalImagePath);
    const watermarkedImageBuffer = await fs.readFile(watermarkedImagePath);

    // Kiểm tra tên bucket
    if (!process.env.AWS_BUCKET_NAME) {
      throw new Error("Bucket name is not defined in environment variables.");
    }

    // Upload ảnh gốc lên S3
    const originalUploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `BE_Graphic/Items_e_commerce/original/${realname}`,
      Body: originalImageBuffer,
      ContentType: fileObject.mimetype,
    };

    const originalCommand = new PutObjectCommand(originalUploadParams);
    await client.send(originalCommand);

    // Upload ảnh đã chèn watermark lên S3
    const watermarkedUploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `BE_Graphic/Items_e_commerce/watermarked/${realname}`,
      Body: watermarkedImageBuffer,
      ContentType: fileObject.mimetype,
    };

    const watermarkedCommand = new PutObjectCommand(watermarkedUploadParams);
    await client.send(watermarkedCommand);

    console.log("Files uploaded to S3 successfully:", realname);

    // Trả về link ảnh gốc và ảnh có watermark
    return {
      status: "success",
      paths: {
        original: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/BE_Graphic/Items_e_commerce/original/${realname}`,
        watermarked: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/BE_Graphic/Items_e_commerce/watermarked/${realname}`,
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
  } finally {
    // Xóa file tạm thời (sử dụng unlink bất đồng bộ)
    try {
      await fs.unlink(originalImagePath).catch(() => {});
      await fs.unlink(watermarkedImagePath).catch(() => {});
    } catch (error) {
      console.error("Error deleting temporary files:", error);
    }
  }
};

module.exports = {
  uploadSingleFile,
};
