const path = require("path");
const fs = require("fs");

const uploadSingleFile = async (fileObject) => {
  console.log(">>>CHECK FILE OBJECT:", fileObject);
  let extname = path.extname(fileObject.name);
  let basename = path.basename(fileObject.name, extname);
  let realname = JSON.stringify(basename + "-" + Date.now() + extname);
  console.log(">>>>>>Chech real name:", realname);
  let uploadPath = path.resolve(__dirname, "../Public/Items_e_commerce/");
  console.log(">>>>>>>>CHECK URL:", uploadPath);
  try {
    await fileObject.mv(path.join(uploadPath, JSON.parse(realname)));
    console.log(
      ">>>>>>Check Success:",
      path.join(uploadPath, JSON.parse(realname))
    );
    return {
      status: "success",
      path: path.join(uploadPath, JSON.parse(realname)),
      error: null,
    };
  } catch (error) {
    console.log(">>>>>>ERROR:", path.join(uploadPath, JSON.parse(realname)));
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(error),
    };
  }
};
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
const findOneFile = async (data) => {
  return null;
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFile,
};
