# Sử dụng base image Node.js
FROM node:16

# Cài đặt công cụ cần thiết cho native modules
RUN apt-get update && apt-get install -y python3 make g++

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép các tệp package
COPY package*.json ./

# Cài đặt dependencies (chỉ production nếu NODE_ENV=production)
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Thiết lập biến môi trường (nếu cần thiết)
ENV NODE_ENV=production

# Expose cổng ứng dụng
EXPOSE 8070


# Start application
CMD ["node", "src/server.js"]
